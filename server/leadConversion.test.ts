import {describe,it,expect,vi} from 'vitest';
import {recordLeadSubmission,trackLeadConversion} from '../client/src/lib/leadConversion';
function storage(){const values=new Map<string,string>();return {getItem:(k:string)=>values.get(k)||null,setItem:(k:string,v:string)=>{values.set(k,v);}};}
describe('lead conversion evidence',()=>{
 it('does not count an arbitrary thank-you URL',()=>{const fbq=vi.fn();trackLeadConversion('91001',{fbq},storage());expect(fbq).not.toHaveBeenCalled();});
 it('waits for SDKs and uses a shared browser/server ID exactly once per platform',()=>{
  const store=storage(),fbq=vi.fn(),gtag=vi.fn();recordLeadSubmission({id:91002},store);
  expect(trackLeadConversion('91002',{},store)).toBe(false);
  trackLeadConversion('91002',{fbq},store);trackLeadConversion('91002',{fbq,gtag},store);trackLeadConversion('91002',{fbq,gtag},store);
  expect(fbq).toHaveBeenCalledTimes(1);expect(fbq).toHaveBeenCalledWith('track','Lead',{}, {eventID:'website-lead-91002'});
  expect(gtag).toHaveBeenCalledTimes(1);expect(gtag.mock.calls[0][2].transaction_id).toBe('website-lead-91002');
 });
 it('does not create a conversion receipt for duplicate or suspect submissions',()=>{
  const store=storage(),fbq=vi.fn();recordLeadSubmission({id:91003,isDuplicate:true},store);recordLeadSubmission({id:91004,suspect:true},store);
  trackLeadConversion('91003',{fbq},store);trackLeadConversion('91004',{fbq},store);expect(fbq).not.toHaveBeenCalled();
 });
});
