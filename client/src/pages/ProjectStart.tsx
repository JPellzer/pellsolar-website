import { recordLeadSubmission } from "@/lib/leadConversion";
import { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { InvisibleTurnstile } from './QuotePage';
import { captureAttribution, deriveLeadSource } from '@shared/attribution';

type Interest = 'solar' | 'battery' | 'solar_battery';
export default function ProjectStart() {
  const search = useSearch();
  const [, navigate] = useLocation();
  const params = new URLSearchParams(search);
  const intent = params.get('interest');
  const [interest, setInterest] = useState<Interest>(intent === 'battery' || intent === 'solar' ? intent : 'solar_battery');
  const [step, setStep] = useState(1);
  const formElement = useRef<HTMLFormElement>(null);
  useEffect(()=>{if(step!==2)return; const frame=requestAnimationFrame(()=>{const first=formElement.current?.querySelector<HTMLInputElement>('input[autocomplete=given-name]'); first?.scrollIntoView({block:'center'}); first?.focus({preventScroll:true});}); return ()=>cancelAnimationFrame(frame);},[step]);
  const [form, setForm] = useState({ zip:'', ownership:'', existingSolar:'', goal:'', timeframe:'exploring',
    payment:['leasing','financing','cash'].includes(params.get('payment') || '') ? params.get('payment')! : '', bill:'', firstName:'', lastName:'', email:'', phone:'',
    smsConsent:false, automatedCallConsent:false, companyWebsite:'' });
  const started = useRef(Date.now());
  const [token, setToken] = useState('');
  const onToken = useCallback((value:string) => setToken(value), []);
  const security = trpc.security.turnstileConfig.useQuery();
  const update = (key:keyof typeof form, value:string|boolean) => setForm(f=>({...f,[key]:value}));
  const submission = trpc.leads.create.useMutation({
    onSuccess(data) {
      try { recordLeadSubmission(data, window.sessionStorage); } catch { recordLeadSubmission(data); }
      const p = new URLSearchParams({lead_id:String(data.id)});
      if (data.isDuplicate) p.set('returning','1');
      if (data.dealId) p.set('deal_id',String(data.dealId));
      if (data.suspect) p.set('suspect','1');
      navigate('/thank-you?'+p.toString());
    },
  });
  function submit(event:React.FormEvent) {
    event.preventDefault();
    if (step === 1) {
      setStep(2);
      window.gtag?.('event','quote_step',{step:2,interest});
      return;
    }
    const attribution = captureAttribution(search);
    submission.mutate({ firstName:form.firstName.trim(), lastName:form.lastName.trim(), email:form.email.trim(), phone:form.phone,
      ownershipType:form.ownership as 'homeowner'|'renter', zip:form.zip, zipCode:form.zip,
      interestType:interest, existingSolar:form.existingSolar ? form.existingSolar === 'yes' : undefined,
      monthlyBillRange:form.bill || 'unknown', paymentPreference:form.payment ? form.payment as 'leasing'|'cash'|'financing' : undefined,
      smsConsent:form.smsConsent, automatedCallConsent:form.automatedCallConsent,
      projectGoal:form.goal, projectTimeframe:form.timeframe,
      source:deriveLeadSource('quote',attribution), utmData:attribution, companyWebsite:form.companyWebsite,
      formSeconds:Math.floor((Date.now()-started.current)/1000), pageUrl:window.location.href, turnstileToken:token || undefined });
  }
  const field = 'w-full mt-2 rounded-lg border border-slate-300 px-3 py-3 bg-white text-slate-900';
  return <><Navbar/><main className="bg-slate-50 pt-32 pb-12 px-4 min-h-[70vh]">
    <div className="max-w-3xl mx-auto">
      <p className="text-sm font-bold text-sky-700 mb-3">PELL SOLAR · CALIFORNIA & IDAHO</p>
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#0B1D51]">What would you like your energy system to do?</h1>
      <p className="text-lg text-slate-600 mt-4 mb-7">Tell us what matters. We’ll review your home and explain the equipment, price and payment options that fit.</p>
      <p className="mb-5">Need a repair? <Link className="text-sky-700 underline font-semibold" href="/solar-repair">Start a service request</Link>.</p>
      <form ref={formElement} onSubmit={submit} className="scroll-mt-28 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <p className="text-sm font-semibold text-slate-500 mb-5">Step {step} of 2 · {step === 1 ? 'Your project' : 'How to reach you'}</p>
        {step === 1 ? <div className="space-y-5">
          <fieldset><legend className="font-bold mb-3">I’m interested in</legend><div className="grid sm:grid-cols-3 gap-3">
            {([['battery','Battery backup','Add storage to your home'],['solar_battery','Solar + battery','Generate and store energy'],['solar','Solar','Compare ownership and lease options']] as const).map(([value,title,detail])=>
              <label key={value} className={'cursor-pointer rounded-xl border-2 p-4 '+(interest===value?'border-sky-600 bg-sky-50':'border-slate-200')}>
                <input type="radio" name="interest" checked={interest===value} onChange={()=>setInterest(value)}/><strong className="block mt-2">{title}</strong><span className="text-sm text-slate-600">{detail}</span>
              </label>)}
          </div></fieldset>
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="font-medium">Project ZIP code<input className={field} required inputMode="numeric" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" value={form.zip} onChange={e=>update('zip',e.target.value)}/></label>
            <label className="font-medium">Do you own the property?<select className={field} required value={form.ownership} onChange={e=>update('ownership',e.target.value)}><option value="">Choose one</option><option value="homeowner">Yes</option><option value="renter">No / helping the owner</option></select></label>
            <label className="font-medium">Already have solar?<select className={field} required value={form.existingSolar} onChange={e=>update('existingSolar',e.target.value)}><option value="">Choose one</option><option value="yes">Yes</option><option value="no">No</option></select></label>
            <label className="font-medium">When are you considering this?<select className={field} value={form.timeframe} onChange={e=>update('timeframe',e.target.value)}><option value="exploring">Comparing options</option><option value="soon">Within 3 months</option><option value="later">Later this year</option></select></label>
          </div>
          <label className="block font-medium">What matters most?<select className={field} value={form.goal} onChange={e=>update('goal',e.target.value)}><option value="">Choose one (optional)</option><option value="outage_backup">Keep essential items running in an outage</option><option value="evening_usage">Use stored energy in the evening</option><option value="new_system">Replace or add a solar system</option><option value="compare_options">Understand my options and costs</option></select></label>
          <label className="block font-medium">Payment preference<select className={field} value={form.payment} onChange={e=>update('payment',e.target.value)}><option value="">Help me compare</option><option value="leasing">Lease</option><option value="financing">Financing</option><option value="cash">Cash purchase</option></select></label>
        </div> : <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="font-medium">First name<input className={field} required autoComplete="given-name" value={form.firstName} onChange={e=>update('firstName',e.target.value)}/></label>
            <label className="font-medium">Last name<input className={field} required autoComplete="family-name" value={form.lastName} onChange={e=>update('lastName',e.target.value)}/></label>
            <label className="font-medium">Email<input className={field} required type="email" autoComplete="email" value={form.email} onChange={e=>update('email',e.target.value)}/></label>
            <label className="font-medium">Phone<input className={field} required type="tel" autoComplete="tel" minLength={10} value={form.phone} onChange={e=>update('phone',e.target.value)}/></label>
          </div>
          <label className="block font-medium">Typical monthly electric bill (optional)<input className={field} inputMode="numeric" type="number" min="0" max="9999" placeholder="Dollar amount" value={form.bill} onChange={e=>update('bill',e.target.value)}/></label>
          <p className="text-sm text-slate-600">Pell Solar will contact you about this request. You can choose these optional automated updates:</p>
          <label className="flex gap-3 text-sm"><input type="checkbox" checked={form.smsConsent} onChange={e=>update('smsConsent',e.target.checked)}/><span>I agree to receive text messages from Pell Solar about my project. Reply STOP to opt out. Message and data rates may apply.</span></label>
          <label className="flex gap-3 text-sm"><input type="checkbox" checked={form.automatedCallConsent} onChange={e=>update('automatedCallConsent',e.target.checked)}/><span>I agree to receive automated or AI-assisted phone calls from Pell Solar about this request at the number above.</span></label>
          <p className="text-xs text-slate-500">Both choices are optional and are not required for a quote or purchase. <Link className="underline" href="/terms">Terms</Link> · <Link className="underline" href="/privacy-policy">Privacy policy</Link></p>
        </div>}
        <div aria-hidden="true" style={{position:'absolute',left:'-10000px'}}><label>Company website<input tabIndex={-1} autoComplete="off" value={form.companyWebsite} onChange={e=>update('companyWebsite',e.target.value)}/></label></div>
        <InvisibleTurnstile siteKey={security.data?.siteKey} onToken={onToken}/>
        {submission.error && <p role="alert" className="text-red-700 my-4">We couldn’t save your request. Please try again or call us. Your information is still here.</p>}
        <div className="flex gap-4 items-center mt-7">{step===2 && <button type="button" className="underline" onClick={()=>setStep(1)}>Back</button>}<button type="submit" disabled={submission.isPending || (step===2 && Boolean(security.data?.siteKey) && !token)} className="rounded-xl bg-[#FED44D] px-7 py-4 font-extrabold text-[#0B1D51] disabled:opacity-50">{submission.isPending?'Saving your request…':step===1?'Next: contact details':'Request my estimate'}</button></div>
        <p className="mt-4 text-xs text-slate-500">No obligation. Equipment and pricing depend on your home, utility and project scope.</p>
      </form>
    </div>
  </main><Footer/></>;
}
