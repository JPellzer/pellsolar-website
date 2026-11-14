import {beforeAll,afterAll,describe,it,expect,vi} from 'vitest';
import {Pool} from 'pg';
const fixture=vi.hoisted(()=>({pool:null as Pool|null}));
vi.mock('./db',()=>({getPool:async()=>fixture.pool,setLeadCrmInfo:vi.fn()}));
vi.mock('./storage',()=>({storageGetSignedUrl:vi.fn(async(key:string)=>'https://storage.example.test/'+key+'?renewed=1')}));
import {enqueueCrmLead,deliverCrmLead,recoverCrmLeads} from './crmOutbox';
const enabled=process.env.WEBSITE_TEST_DB==='local';
describe.skipIf(!enabled)('durable website CRM delivery',()=>{
 let schema:string;let calls=0;let success=false;
 beforeAll(async()=>{
  schema='website_outbox_'+Math.random().toString(16).slice(2);
  const config={host:'127.0.0.1',port:55439,database:'postgres',user:process.env.USER};
  const setup=new Pool(config);await setup.query('CREATE SCHEMA '+schema);await setup.end();
  fixture.pool=new Pool({...config,options:'-c search_path='+schema});
  vi.stubEnv('CRM_WEBHOOK_URL','https://crm.example.test/api/webhooks/website-lead');
  vi.stubGlobal('fetch',vi.fn(async()=>{calls++;return new Response(JSON.stringify(success?{success:true,deal_id:77}:{success:false}),{status:200});}));
 });
 afterAll(async()=>{vi.unstubAllGlobals();vi.unstubAllEnvs();if(fixture.pool){await fixture.pool.query('DROP SCHEMA '+schema+' CASCADE');await fixture.pool.end();}});
 it('retains HTTP 200 without a CRM acknowledgment for recovery',async()=>{
  const id=await enqueueCrmLead({first_name:'Fixture',last_name:'Customer',type:'new_lead'});
  const result=await deliverCrmLead(id);expect(result.queued).toBe(true);
  const row=(await fixture.pool!.query('SELECT * FROM website_crm_outbox WHERE id=$1',[id])).rows[0];
  expect(row.status).toBe('pending');expect(row.next_attempt_at.getTime()).toBeGreaterThan(Date.now());
  success=true;await fixture.pool!.query("UPDATE website_crm_outbox SET next_attempt_at=NOW()-INTERVAL '1 minute' WHERE id=$1",[id]);
  await recoverCrmLeads();const done=(await fixture.pool!.query('SELECT * FROM website_crm_outbox WHERE id=$1',[id])).rows[0];
  expect(done.status).toBe('delivered');expect(done.attempts).toBe(2);
 });
 it('claims a submission once during simultaneous delivery attempts',async()=>{
  const id=await enqueueCrmLead({first_name:'Concurrent',last_name:'Fixture',type:'new_lead'});const prior=calls;
  await Promise.all([deliverCrmLead(id),deliverCrmLead(id)]);expect(calls-prior).toBe(1);
  await deliverCrmLead(id);expect(calls-prior).toBe(1);
 });
 it('recovers an expired process lease and refreshes bill URLs',async()=>{
  const id=await enqueueCrmLead({first_name:'Expired',last_name:'Fixture',type:'new_lead',bill_files:[{key:'bills/fixture.pdf',url:'https://expired.test/file',name:'bill.pdf',type:'bill'}]});
  await fixture.pool!.query("UPDATE website_crm_outbox SET lease_until=NOW()-INTERVAL '1 minute',lease_token='00000000-0000-0000-0000-000000000001' WHERE id=$1",[id]);
  await recoverCrmLeads();const last=vi.mocked(fetch).mock.calls.at(-1)!;const payload=JSON.parse(last[1]!.body as string);
  expect(payload.bill_file_url).toBe('https://storage.example.test/bills/fixture.pdf?renewed=1');
 });
 it('service delivery uses its dedicated endpoint and accepts a saved inquiry receipt',async()=>{
  const previous=fetch;
  vi.stubGlobal('fetch',vi.fn(async(url,options)=>{
    expect(String(url)).toBe('https://crm.example.test/api/webhooks/service-intake');
    const body=JSON.parse(options!.body as string);expect(body.website_delivery_id).toMatch(/^[0-9a-f-]{36}$/);
    return new Response(JSON.stringify({status:'inquiry_logged',pending_id:101}));
  }));
  try {
    const id=await enqueueCrmLead({first_name:'Service',last_name:'Fixture',type:'service_call',service_intake:{name:'Service Fixture',problemDescription:'Test only'}});
    expect((await deliverCrmLead(id)).queued).toBe(false);
    expect((await fixture.pool!.query('SELECT status FROM website_crm_outbox WHERE id=$1',[id])).rows[0].status).toBe('delivered');
  } finally {vi.stubGlobal('fetch',previous);}
 });

});
