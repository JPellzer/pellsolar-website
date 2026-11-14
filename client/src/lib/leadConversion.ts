type Store = Pick<Storage, 'getItem'|'setItem'>;
const memory = new Map<string,string>();
function read(store:Store|undefined,key:string) { try { return store?.getItem(key) || memory.get(key); } catch { return memory.get(key); } }
function write(store:Store|undefined,key:string) { memory.set(key,'1'); try { store?.setItem(key,'1'); } catch {} }
export function recordLeadSubmission(result:{id:number;isDuplicate?:boolean;suspect?:boolean}, store?:Store) {
  if (!result.id || result.isDuplicate || result.suspect) return;
  write(store,'pellsolar-submission:'+result.id);
}
export function trackLeadConversion(leadId:string|null, tags:{fbq?:(...args:unknown[])=>void;gtag?:(...args:unknown[])=>void}, store?:Store) {
  if (!leadId || !read(store,'pellsolar-submission:'+leadId)) return false;
  const eventId='website-lead-'+leadId;
  for (const platform of ['meta','google']) {
    const key='pellsolar-conversion:'+platform+':'+eventId;
    if (read(store,key)) continue;
    try {
      if (platform==='meta' && tags.fbq) tags.fbq('track','Lead',{}, {eventID:eventId});
      else if (platform==='google' && tags.gtag) tags.gtag('event','conversion',{send_to:'AW-17865947343/TI2CCLSThPQbEM_xksdC',transaction_id:eventId});
      else continue;
      write(store,key);
    } catch { /* SDK not ready: leave this platform eligible for the next attempt. */ }
  }
  return Boolean(read(store,'pellsolar-conversion:meta:'+eventId) && read(store,'pellsolar-conversion:google:'+eventId));
}
