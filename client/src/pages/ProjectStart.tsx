import { recordLeadSubmission } from "@/lib/leadConversion";
import { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { InvisibleTurnstile } from './QuotePage';
import { captureAttribution, deriveLeadSource } from '@shared/attribution';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import { isUsPhone, PHONE_REQUIRED_MESSAGE } from '@shared/contactValidation';

type Interest = 'solar' | 'battery' | 'solar_battery';
export default function ProjectStart() {
  const search = useSearch();
  const [, navigate] = useLocation();
  const params = new URLSearchParams(search);
  const intent = params.get('interest');
  const [interest, setInterest] = useState<Interest|''>(intent === 'battery' || intent === 'solar' || intent === 'solar_battery' ? intent : '');
  const [step, setStep] = useState(1);
  const formElement = useRef<HTMLFormElement>(null);
  useEffect(()=>{if(step!==2)return; const frame=requestAnimationFrame(()=>{const first=formElement.current?.querySelector<HTMLInputElement>('input[autocomplete=given-name]'); first?.scrollIntoView({block:'center'}); first?.focus({preventScroll:true});}); return ()=>cancelAnimationFrame(frame);},[step]);
  const [form, setForm] = useState({ zip:'', address:'', city:'', state:'', ownership:'', existingSolar:'', goal:'', timeframe:'',
    payment:['leasing','financing','cash'].includes(params.get('payment') || '') ? params.get('payment')! : '', bill:'', firstName:'', lastName:'', email:'', phone:'',
    smsConsent:false, automatedCallConsent:false, companyWebsite:'' });
  const started = useRef(Date.now());
  const [token, setToken] = useState('');
  const onToken = useCallback((value:string) => setToken(value), []);
  const security = trpc.security.turnstileConfig.useQuery();
  const update = (key:keyof typeof form, value:string|boolean) => setForm(f=>({...f,[key]:value}));
  const submission = trpc.leads.createProject.useMutation({
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
    if (!interest) return;
    if (step === 1) {
      setStep(2);
      window.gtag?.('event','quote_step',{step:2,interest});
      return;
    }
    const phoneInput = formElement.current?.querySelector<HTMLInputElement>('input[type=tel]');
    if (phoneInput && !isUsPhone(form.phone)) {
      phoneInput.setCustomValidity(PHONE_REQUIRED_MESSAGE);
      phoneInput.reportValidity();
      return;
    }
    const attribution = captureAttribution(search);
    submission.mutate({ firstName:form.firstName.trim(), lastName:form.lastName.trim(), email:form.email.trim(), phone:form.phone,
      address:form.address.trim(), city:form.city.trim(), state:form.state.trim().toUpperCase(),
      ownershipType:form.ownership as 'homeowner'|'renter', zip:form.zip, zipCode:form.zip,
      interestType:interest, existingSolar:form.existingSolar === 'yes',
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
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#0B1D51]">Tell us about your project</h1>
      <p className="text-lg text-slate-600 mt-4 mb-7">Tell us what matters. We’ll review your home and explain the equipment, price and payment options that fit.</p>
      <p className="mb-5">Need a repair? <Link className="text-sky-700 underline font-semibold" href="/solar-repair">Start a service request</Link>.</p>
      <form ref={formElement} onSubmit={submit} className="scroll-mt-28 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <p className="text-sm font-semibold text-slate-500 mb-2">Step {step} of 2 · {step === 1 ? 'Your project' : 'Your property & contact details'}</p>
        <p className="text-sm text-slate-500 mb-5"><span className="text-red-700 font-bold">*</span> Required so we can review your project and reach you.</p>
        {step === 1 ? <div className="space-y-5">
          <fieldset><legend className="font-bold mb-3">What would you like installed? <span aria-hidden="true" className="text-red-700">*</span></legend><div className="grid sm:grid-cols-3 gap-3">
            {([['battery','Battery storage','A battery system without new panels'],['solar_battery','Solar + battery','New panels and battery storage'],['solar','Solar panels','New panels without a battery']] as const).map(([value,title,detail])=>
              <label key={value} className={'cursor-pointer rounded-xl border-2 p-4 '+(interest===value?'border-sky-600 bg-sky-50':'border-slate-200')}>
                <input type="radio" name="interest" required checked={interest===value} onChange={()=>setInterest(value)}/><strong className="block mt-2">{title}</strong><span className="text-sm text-slate-600">{detail}</span>
              </label>)}
          </div></fieldset>
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className="font-medium">Project ZIP code <span aria-hidden="true" className="text-red-700">*</span><input className={field} required inputMode="numeric" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" aria-describedby="project-zip-help" value={form.zip} onChange={e=>update('zip',e.target.value)}/></label><p id="project-zip-help" className="text-xs text-slate-500 mt-2">We’ll ask for the full property address next.</p></div>
            <label className="font-medium">Do you own the property? <span aria-hidden="true" className="text-red-700">*</span><select className={field} required value={form.ownership} onChange={e=>update('ownership',e.target.value)}><option value="">Choose one</option><option value="homeowner">Yes</option><option value="renter">No / helping the owner</option></select></label>
            <label className="font-medium">Already have solar? <span aria-hidden="true" className="text-red-700">*</span><select className={field} required value={form.existingSolar} onChange={e=>update('existingSolar',e.target.value)}><option value="">Choose one</option><option value="yes">Yes</option><option value="no">No</option></select></label>
            <label className="font-medium">When are you considering this?<select className={field} value={form.timeframe} onChange={e=>update('timeframe',e.target.value)}><option value="">Choose one (optional)</option><option value="now">Right now / as soon as possible</option><option value="within_month">Within a month</option><option value="soon">1–3 months</option><option value="three_to_six_months">3–6 months</option><option value="six_plus_months">More than 6 months</option><option value="exploring">Just exploring</option></select></label>
          </div>
          <label className="block font-medium">What matters most?<select className={field} value={form.goal} onChange={e=>update('goal',e.target.value)}><option value="">Choose one (optional)</option><option value="outage_backup">Keep essential items running in an outage</option><option value="evening_usage">Use stored energy in the evening</option><option value="new_system">Replace or add a solar system</option><option value="compare_options">Understand my options and costs</option></select></label>
          <div><label className="block font-medium">How would you like to pay for {interest==='battery'?'your battery system':interest==='solar_battery'?'your solar + battery system':interest==='solar'?'your solar panel system':'your system'}?<select className={field} value={form.payment} onChange={e=>update('payment',e.target.value)}><option value="">Help me compare</option><option value="leasing">Explore a lease</option><option value="financing">Finance a purchase</option><option value="cash">Pay in cash</option></select></label><p className="text-sm text-slate-500 mt-2">Tell us your preference. We’ll confirm which payment options are available for your project.</p></div>
        </div> : <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="font-medium">First name <span aria-hidden="true" className="text-red-700">*</span><input className={field} required pattern=".*\S.*" title="Enter your first name." autoComplete="given-name" value={form.firstName} onChange={e=>update('firstName',e.target.value)}/></label>
            <label className="font-medium">Last name <span aria-hidden="true" className="text-red-700">*</span><input className={field} required pattern=".*\S.*" title="Enter your last name." autoComplete="family-name" value={form.lastName} onChange={e=>update('lastName',e.target.value)}/></label>
            <label className="font-medium">Email <span aria-hidden="true" className="text-red-700">*</span><input className={field} required type="email" autoComplete="email" value={form.email} onChange={e=>update('email',e.target.value)}/></label>
            <label className="font-medium">Phone <span aria-hidden="true" className="text-red-700">*</span><input className={field} required type="tel" autoComplete="tel" maxLength={24} value={form.phone} onChange={e=>{e.target.setCustomValidity(!e.target.value || isUsPhone(e.target.value)?'':PHONE_REQUIRED_MESSAGE);update('phone',e.target.value);}}/></label>
          </div>
          <fieldset className="rounded-xl border border-sky-200 bg-sky-50 p-4 space-y-4">
            <legend className="px-1 font-bold text-[#0B1D51]">Where is the project?</legend>
            <p className="text-sm text-slate-600">Use the property where the work will be done. This helps us review the roof, equipment location and service area.</p>
            <div><label htmlFor="project-address" className="font-medium">Property street address <span aria-hidden="true" className="text-red-700">*</span></label>
              <AddressAutocomplete id="project-address" required minLength={5} value={form.address} className={field} placeholder="Start typing the property address…"
                onChange={(address,parts)=>setForm(f=>({...f,address,city:parts.city,state:parts.state,zip:parts.zip || f.zip}))}/>
              <p className="text-xs text-slate-500 mt-2">Choose an address suggestion, or enter the full details below.</p>
            </div>
            <div className="grid sm:grid-cols-[2fr_1fr_1fr] gap-4">
              <label className="font-medium">City <span aria-hidden="true" className="text-red-700">*</span><input className={field} required minLength={2} pattern=".*\S.*" autoComplete="address-level2" value={form.city} onChange={e=>update('city',e.target.value)}/></label>
              <label className="font-medium">State <span aria-hidden="true" className="text-red-700">*</span><input className={field} required pattern="[A-Za-z]{2}" title="Enter the two-letter state code, such as CA or ID." maxLength={2} placeholder="CA or ID" autoComplete="address-level1" value={form.state} onChange={e=>update('state',e.target.value.toUpperCase())}/></label>
              <label className="font-medium">ZIP code <span aria-hidden="true" className="text-red-700">*</span><input className={field} required inputMode="numeric" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" value={form.zip} onChange={e=>update('zip',e.target.value)}/></label>
            </div>
          </fieldset>
          <label className="block font-medium">Typical monthly electric bill (optional)<input className={field} inputMode="numeric" type="number" min="0" max="9999" placeholder="Dollar amount" value={form.bill} onChange={e=>update('bill',e.target.value)}/></label>
          <p className="text-sm text-slate-600">Pell Solar will contact you about this request. You can choose these optional automated updates:</p>
          <label className="flex gap-3 text-sm"><input type="checkbox" checked={form.smsConsent} onChange={e=>update('smsConsent',e.target.checked)}/><span>I agree to receive text messages from Pell Solar about my project. Reply STOP to opt out. Message and data rates may apply.</span></label>
          <label className="flex gap-3 text-sm"><input type="checkbox" checked={form.automatedCallConsent} onChange={e=>update('automatedCallConsent',e.target.checked)}/><span>I agree to receive automated or AI-assisted phone calls from Pell Solar about this request at the number above.</span></label>
          <p className="text-xs text-slate-500">Both choices are optional and are not required for a quote or purchase. <Link className="underline" href="/terms">Terms</Link> · <Link className="underline" href="/privacy-policy">Privacy policy</Link></p>
        </div>}
        <div aria-hidden="true" style={{position:'absolute',left:'-10000px'}}><label>Company website<input tabIndex={-1} autoComplete="off" value={form.companyWebsite} onChange={e=>update('companyWebsite',e.target.value)}/></label></div>
        <InvisibleTurnstile siteKey={security.data?.siteKey} onToken={onToken}/>
        {submission.error && <p role="alert" className="text-red-700 my-4">We couldn’t save your request. Please try again or call us. Your information is still here.</p>}
        <div className="flex gap-4 items-center mt-7">{step===2 && <button type="button" className="underline" onClick={()=>setStep(1)}>Back</button>}<button type="submit" disabled={submission.isPending || (step===2 && Boolean(security.data?.siteKey) && !token)} className="rounded-xl bg-[#FED44D] px-7 py-4 font-extrabold text-[#0B1D51] disabled:opacity-50">{submission.isPending?'Saving your request…':step===1?'Next: address & contact':'Request my estimate'}</button></div>
        <p className="mt-4 text-xs text-slate-500">No obligation. Equipment and pricing depend on your home, utility and project scope.</p>
      </form>
    </div>
  </main><Footer/></>;
}
