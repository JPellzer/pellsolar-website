import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Phone, Wrench, AlertTriangle, CheckCircle, Shield, Zap, Settings, Bug, ChevronDown, ChevronUp, Loader2, Bot, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import AddressAutocomplete from "@/components/AddressAutocomplete";

const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";

const ISSUE_OPTIONS = [
  { id: "no_power", label: "System not producing power at all", category: "solar" },
  { id: "low_production", label: "Production lower than usual", category: "solar" },
  { id: "inverter_error", label: "Inverter showing error code or red light", category: "solar" },
  { id: "battery_not_charging", label: "Battery not charging", category: "battery" },
  { id: "battery_not_discharging", label: "Battery not discharging / not backing up home", category: "battery" },
  { id: "battery_draining_fast", label: "Battery draining too fast", category: "battery" },
  { id: "backup_failed", label: "Backup power didn't work during outage", category: "battery" },
  { id: "monitoring_issue", label: "Monitoring app not updating or showing errors", category: "monitoring" },
  { id: "high_bill", label: "High electric bill despite having solar", category: "solar" },
  { id: "physical_damage", label: "Physical damage (panels, wiring, racking)", category: "damage" },
  { id: "roof_leak", label: "Roof leak near panels", category: "damage" },
  { id: "critter_damage", label: "Critter or animal damage", category: "damage" },
  { id: "other", label: "Other issue", category: "other" },
];

type Step = "system" | "issues" | "diagnosis" | "contact" | "done";

export default function SolarRepair() {
  const formRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("system");
  const [issueAccordionOpen, setIssueAccordionOpen] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [resolvedWithAI, setResolvedWithAI] = useState(false);

  // System info
  const [systemType, setSystemType] = useState("");
  const [inverterBrand, setInverterBrand] = useState("");
  const [batteryBrand, setBatteryBrand] = useState("");
  const [systemAge, setSystemAge] = useState("");

  // Issues
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  // Contact form
  const [contact, setContact] = useState({ firstName: "", lastName: "", phone: "", email: "", address: "", _hp: "" });
  const [smsConsent, setSmsConsent] = useState(false);



  const diagnose = trpc.service.diagnose.useMutation({
    onSuccess: (data) => {
      setDiagnosis(typeof data.diagnosis === "string" ? data.diagnosis : String(data.diagnosis ?? ""));
      setStep("diagnosis");
    },
    onError: () => toast.error("Could not generate diagnostic. Please describe your issue and submit the form."),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to form when hash is present
  useEffect(() => {
    if (window.location.hash === "#service-form" && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  const toggleIssue = (id: string) => {
    setSelectedIssues(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleGetDiagnosis = () => {
    if (selectedIssues.length === 0) {
      toast.error("Please select at least one issue.");
      return;
    }
    if (!duration) {
      toast.error("Please tell us how long this has been happening.");
      return;
    }
    diagnose.mutate({ systemType, inverterBrand, batteryBrand, systemAge, selectedIssues: selectedIssues.map(id => ISSUE_OPTIONS.find(o => o.id === id)?.label ?? id), duration, description });
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.firstName.trim() || !contact.lastName.trim()) {
      toast.error("Please enter your first and last name.");
      return;
    }
    if (!contact.phone.trim() && !contact.email.trim()) {
      toast.error("Please enter a phone number or email address.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Step 1 — Phone lookup to check for existing customer
      let customerExists = false;
      let customerId: string | undefined;
      const phone = contact.phone.trim();
      if (phone) {
        try {
          const lookupRes = await fetch(
            `https://pellsolar-crm-prod.onrender.com/api/ai-phone/lookup-caller?phone=${encodeURIComponent(phone)}`
          );
          if (lookupRes.ok) {
            const lookupData = await lookupRes.json();
            if (lookupData.existing_customer === true) {
              customerExists = true;
              customerId = String(lookupData.customer_id);
            }
          }
        } catch {
          // Lookup failure is non-fatal — proceed without customer match
        }
      }
      // Step 2 — Build payload
      const issueText = selectedIssues.map(id => ISSUE_OPTIONS.find(o => o.id === id)?.label ?? id).join("; ");
      const fullDescription = description
        ? `${issueText}. Duration: ${duration}. Details: ${description}`
        : `${issueText}. Duration: ${duration}.`;
      // Client-side honeypot check (belt-and-suspenders before the server check)
      if (contact._hp && contact._hp.trim().length > 0) {
        // Silently succeed — bot doesn't know it was blocked
        setStep("done");
        return;
      }
      const payload: Record<string, unknown> = {
        name: `${contact.firstName.trim()} ${contact.lastName.trim()}`,
        email: contact.email.trim() || undefined,
        phone: phone || "N/A",
        address: contact.address.trim() || undefined,
        systemType: systemType || undefined,
        inverterBrand: inverterBrand || undefined,
        batteryBrand: batteryBrand || undefined,
        systemAge: systemAge || undefined,
        selectedIssues: selectedIssues.map(id => ISSUE_OPTIONS.find(o => o.id === id)?.label ?? id),
        duration: duration || undefined,
        description: fullDescription,
        aiDiagnosis: diagnosis || undefined,
        customerExists,
        source: "website-service-form",
        submittedAt: new Date().toISOString(),
      };
      // Step 3 — POST directly to CRM webhook
      const res = await fetch(
        "https://pellsolar-crm-prod.onrender.com/api/webhooks/service-intake",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        throw new Error(`CRM webhook returned ${res.status}`);
      }
      setStep("done");
    } catch (err) {
      console.error("[ServiceForm] Submission error:", err);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = "w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] bg-white";
  const selectCls = `${inputCls} cursor-pointer`;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative py-28 md:py-36" style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-[#0B1D51]/45" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Solar Repair & <span className="text-[#FED44D]">Maintenance</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-4">
            Expert solar panel repair, inverter replacement, and system diagnostics. We service all brands — not just systems we installed.
          </p>
          <p className="text-[#2BABE2] font-bold text-lg mb-8">Licensed C-46 Solar Contractor • License #949122</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#service-form" className="btn-green text-lg px-8 py-4">Schedule a Service Call</a>
            <a href="tel:8666468499" className="text-white font-bold text-lg flex items-center gap-2 no-underline hover:text-[#FED44D] transition-colors">
              <Phone size={18} /> (866) 646-8499
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ COMMON PROBLEMS ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Is Your Solar System <span className="text-red-500">Underperforming?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              If your electric bill is climbing or your monitoring shows lower production, something may be wrong. Here are the most common issues we fix:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: AlertTriangle, title: "Inverter Failure", desc: "String inverters and microinverters can fail over time. We diagnose and replace all major brands — SolarEdge, Enphase, SMA, Fronius, and more.", color: "text-red-500", bg: "bg-red-50" },
              { icon: Zap, title: "Low Production", desc: "Panels producing less than expected? Could be shading, soiling, degradation, or wiring issues. We run full diagnostics to find the root cause.", color: "text-yellow-500", bg: "bg-yellow-50" },
              { icon: Bug, title: "Critter Damage", desc: "Squirrels, birds, and rodents chew through wiring and nest under panels. We repair the damage and install critter guards to prevent it from happening again.", color: "text-orange-500", bg: "bg-orange-50" },
              { icon: Settings, title: "Monitoring Issues", desc: "System not reporting? We troubleshoot communication issues with Enphase, SolarEdge, Tesla, and other monitoring platforms.", color: "text-blue-500", bg: "bg-blue-50" },
              { icon: Shield, title: "Roof Leaks", desc: "Bad installations cause roof leaks. We remove panels, repair the roof, reinstall properly, and waterproof every penetration point.", color: "text-purple-500", bg: "bg-purple-50" },
              { icon: Wrench, title: "Storm Damage", desc: "High winds, hail, and falling debris can crack panels or loosen racking. We assess storm damage and work with your insurance company.", color: "text-teal-500", bg: "bg-teal-50" },
            ].map(card => (
              <div key={card.title} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
                  <card.icon size={24} className={card.color} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WE SERVICE ALL BRANDS ═══════════ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              We Service <span className="text-[#2BABE2]">All Brands</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">It doesn't matter who installed your system. We repair and maintain solar systems from every manufacturer.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
            {["SolarEdge", "Enphase", "Tesla", "SMA", "Fronius", "LG", "Panasonic", "REC", "Q Cells", "Canadian Solar", "Silfab", "SunPower"].map(brand => (
              <div key={brand} className="bg-white rounded-xl border border-gray-200 px-3 py-3 text-center hover:border-[#2BABE2] transition-colors">
                <span className="text-sm font-semibold text-gray-800">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Repair Process</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Call Us", desc: "Tell us what's happening — low production, error codes, physical damage, or anything else." },
              { step: "2", title: "Diagnostics", desc: "We run a full system diagnostic — checking inverters, panels, wiring, monitoring, and roof penetrations." },
              { step: "3", title: "Quote & Repair", desc: "We provide a clear, upfront quote. Once approved, we order parts and schedule the repair — usually within 1–2 weeks." },
              { step: "4", title: "Verification", desc: "After the repair, we verify the system is producing at full capacity and all monitoring is reporting correctly." },
            ].map(s => (
              <div key={s.step} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                <div className="w-12 h-12 rounded-full bg-[#FED44D] text-[#0B1D51] font-black text-xl flex items-center justify-center mx-auto mb-4">{s.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CRITTER GUARD ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Critter Guard <span className="text-[#2BABE2]">Installation</span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Birds, squirrels, and rodents love to nest under solar panels. They chew through wiring, build nests that block airflow, and cause thousands of dollars in damage.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Our critter guard is a heavy-duty mesh barrier that clips around the perimeter of your panels — keeping animals out while maintaining proper ventilation.
              </p>
              <ul className="space-y-2 mb-8">
                {["Heavy-duty galvanized mesh", "Clips directly to panels — no drilling", "Maintains proper airflow", "10+ year lifespan", "Available for all panel types"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle size={16} className="text-[#2BABE2] mt-1 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-quote" className="btn-green">Get a Critter Guard Quote</Link>
            </div>
            <div className="flex-1 bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Common Signs of Critter Damage</h3>
              <ul className="space-y-3">
                {["Scratching or scurrying sounds on the roof", "Droppings on or around panels", "Visible nesting material under panels", "Sudden drop in solar production", "Error codes on your inverter or monitoring app", "Chewed or exposed wiring visible from the ground"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <AlertTriangle size={16} className="text-orange-500 mt-1 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE AREAS ═══════════ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Service Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">California</h3>
              <p className="text-gray-600 text-sm mb-2">Inland Empire, LA County, Orange County, San Diego</p>
              <a href="tel:8666468499" className="text-[#2BABE2] font-bold text-sm no-underline">(866) 646-8499</a>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">Idaho</h3>
              <p className="text-gray-600 text-sm mb-2">Boise, Meridian, Nampa, Eagle, Caldwell</p>
              <a href="tel:2085031416" className="text-[#2BABE2] font-bold text-sm no-underline">(208) 503-1416</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SMART SERVICE FORM ═══════════ */}
      <section id="service-form" ref={formRef} className="py-20 bg-[#0B1D51]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Schedule a <span className="text-[#FED44D]">Service Call</span>
            </h2>
            <p className="text-white/70 text-lg">Tell us about your system and we'll help diagnose the issue — or connect you with our team.</p>
            <a href="tel:8666468499" className="text-[#2BABE2] font-bold text-xl mt-2 inline-block no-underline hover:text-[#FED44D] transition-colors">
              <Phone size={18} className="inline mr-2" />(866) 646-8499
            </a>
          </div>

          {/* ── STEP: DONE ── */}
          {step === "done" && (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Service Request Received!</h3>
              <p className="text-white/70">Our team will contact you within 1 business day to schedule your diagnostic visit.</p>
            </div>
          )}

          {step !== "done" && (
            <div className="space-y-6">

              {/* ── STEP 1: SYSTEM INFO ── */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <button
                  onClick={() => setStep(step === "system" ? "issues" : "system")}
                  className="w-full flex items-center justify-between px-8 py-5 bg-[#0B1D51] text-white font-bold text-lg"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#FED44D] text-[#0B1D51] font-black text-sm flex items-center justify-center">1</span>
                    About Your System
                  </span>
                  {step === "system" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {step === "system" && (
                  <div className="p-8 space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">What type of system do you have? <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {["Solar Only", "Solar + Battery", "Battery Only", "Not Sure"].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSystemType(opt)}
                            className={`px-3 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${systemType === opt ? "border-[#2BABE2] bg-[#2BABE2]/10 text-[#2BABE2]" : "border-gray-200 text-gray-600 hover:border-[#2BABE2]"}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Inverter / System Brand</label>
                        <select value={inverterBrand} onChange={e => setInverterBrand(e.target.value)} className={selectCls}>
                          <option value="">Select or unknown</option>
                          <option>SolarEdge</option>
                          <option>Enphase</option>
                          <option>Tesla / SolarCity</option>
                          <option>SMA</option>
                          <option>Fronius</option>
                          <option>LG</option>
                          <option>Panasonic</option>
                          <option>SunPower</option>
                          <option>Other</option>
                          <option>Don't Know</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Battery Brand</label>
                        <select value={batteryBrand} onChange={e => setBatteryBrand(e.target.value)} className={selectCls}>
                          <option value="">No battery / unknown</option>
                          <option>Tesla Powerwall</option>
                          <option>Enphase IQ Battery</option>
                          <option>SolarEdge Energy Bank</option>
                          <option>LG RESU</option>
                          <option>Franklin WH</option>
                          <option>Generac PWRcell</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">How old is your system?</label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {["< 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSystemAge(opt)}
                            className={`px-3 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${systemAge === opt ? "border-[#2BABE2] bg-[#2BABE2]/10 text-[#2BABE2]" : "border-gray-200 text-gray-600 hover:border-[#2BABE2]"}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => { if (!systemType) { toast.error("Please select your system type."); return; } setStep("issues"); setIssueAccordionOpen(true); }}
                      className="w-full btn-green py-4 text-lg flex items-center justify-center gap-2"
                    >
                      Next: Describe the Issue <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* ── STEP 2: ISSUES ── */}
              {(step === "issues" || step === "diagnosis" || step === "contact") && (
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                  <button
                    onClick={() => setIssueAccordionOpen(o => !o)}
                    className="w-full flex items-center justify-between px-8 py-5 bg-[#0B1D51] text-white font-bold text-lg"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#FED44D] text-[#0B1D51] font-black text-sm flex items-center justify-center">2</span>
                      What's the Problem?
                      {selectedIssues.length > 0 && <span className="bg-[#2BABE2] text-white text-xs font-bold px-2 py-0.5 rounded-full">{selectedIssues.length} selected</span>}
                    </span>
                    {issueAccordionOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {issueAccordionOpen && (
                    <div className="p-8 space-y-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">Select all that apply: <span className="text-red-500">*</span></p>
                        <div className="space-y-2">
                          {ISSUE_OPTIONS.map(opt => (
                            <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedIssues.includes(opt.id) ? "border-[#2BABE2] bg-[#2BABE2]/5" : "border-gray-200 hover:border-gray-300"}`}>
                              <input
                                type="checkbox"
                                checked={selectedIssues.includes(opt.id)}
                                onChange={() => toggleIssue(opt.id)}
                                className="w-4 h-4 accent-[#2BABE2]"
                              />
                              <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                              {opt.category === "battery" && <span className="ml-auto text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">Battery</span>}
                              {opt.category === "damage" && <span className="ml-auto text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full">Damage</span>}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">How long has this been happening? <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {["Just started", "A few days", "A week or more", "A month or more"].map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setDuration(opt)}
                              className={`px-3 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${duration === opt ? "border-[#2BABE2] bg-[#2BABE2]/10 text-[#2BABE2]" : "border-gray-200 text-gray-600 hover:border-[#2BABE2]"}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Describe the issue in your own words (optional)</label>
                        <textarea
                          rows={3}
                          placeholder="e.g. My inverter is showing a red light and production dropped by 50% last week..."
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] resize-none"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <button
                          type="button"
                          onClick={handleGetDiagnosis}
                          disabled={diagnose.isPending}
                          className="w-full btn-green py-4 text-base flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                          {diagnose.isPending ? <><Loader2 size={18} className="animate-spin" /> Analyzing your system…</> : <><Bot size={18} /> Get My AI Diagnostic</>}
                        </button>
                        <p className="text-center text-gray-500 text-xs">Our AI will analyze your system and issues — then you can schedule a service call if needed.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP 3: AI DIAGNOSIS ── */}
              {step === "diagnosis" && diagnosis && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="px-8 py-5 bg-gradient-to-r from-[#2BABE2] to-[#0B1D51] flex items-center gap-3">
                    <Bot size={24} className="text-white" />
                    <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>AI Diagnostic Results</h3>
                    <span className="ml-auto text-xs bg-white/20 text-white px-2 py-1 rounded-full">Based on your system info</span>
                  </div>
                  <div className="p-8">
                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">
                      {diagnosis}
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      <p className="text-sm font-semibold text-gray-700 mb-4">Did this help resolve your issue?</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={() => setResolvedWithAI(true)}
                          className="flex-1 py-3 rounded-xl border-2 border-green-500 text-green-700 font-bold hover:bg-green-50 transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle size={18} /> Yes, that helped — thanks!
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep("contact")}
                          className="flex-1 btn-green py-3 flex items-center justify-center gap-2"
                        >
                          I still need help — contact my team <ArrowRight size={18} />
                        </button>
                      </div>
                      {resolvedWithAI && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                          <p className="text-green-700 font-semibold">Great! If the issue comes back, don't hesitate to call us at <a href="tel:8666468499" className="underline">(866) 646-8499</a> or <a href="tel:7144553401" className="underline">(714) 455-3401</a> (CA).</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 4: CONTACT FORM ── */}
              {step === "contact" && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="px-8 py-5 bg-[#0B1D51] flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#FED44D] text-[#0B1D51] font-black text-sm flex items-center justify-center">3</span>
                    <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Contact Information</h3>
                  </div>
                  <form onSubmit={handleSubmitContact} className="p-8 space-y-5">
                    {/* Honeypot — hidden from real users, bots fill it in */}
                    <input
                      type="text"
                      name="_hp"
                      value={contact._hp}
                      onChange={e => setContact(c => ({ ...c, _hp: e.target.value }))}
                      tabIndex={-1}
                      aria-hidden="true"
                      autoComplete="off"
                      style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }}
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="John" value={contact.firstName} onChange={e => setContact(c => ({ ...c, firstName: e.target.value }))} className={inputCls} required />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Smith" value={contact.lastName} onChange={e => setContact(c => ({ ...c, lastName: e.target.value }))} className={inputCls} required />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" placeholder="(714) 555-0100" value={contact.phone} onChange={e => setContact(c => ({ ...c, phone: e.target.value }))} className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <input type="email" placeholder="john@example.com" value={contact.email} onChange={e => setContact(c => ({ ...c, email: e.target.value }))} className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Property Address</label>
                      <AddressAutocomplete
                        value={contact.address}
                        onChange={(full) => setContact(c => ({ ...c, address: full }))}
                        placeholder="Start typing your address…"
                        className={inputCls}
                      />
                    </div>

                    {/* Summary of what they selected */}
                    {selectedIssues.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Your Service Request Summary</p>
                        <p className="text-sm text-gray-700"><strong>System:</strong> {systemType || "Not specified"} — {inverterBrand || "Brand unknown"}{batteryBrand ? ` + ${batteryBrand}` : ""}</p>
                        <p className="text-sm text-gray-700 mt-1"><strong>Issues:</strong> {selectedIssues.map(id => ISSUE_OPTIONS.find(o => o.id === id)?.label).join(", ")}</p>
                        {duration && <p className="text-sm text-gray-700 mt-1"><strong>Duration:</strong> {duration}</p>}
                      </div>
                    )}

                    {/* SMS Opt-in Consent — required for Twilio A2P 10DLC compliance */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <input
                        type="checkbox"
                        id="service-sms-consent"
                        checked={smsConsent}
                        onChange={e => setSmsConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#2BABE2] cursor-pointer"
                      />
                      <label htmlFor="service-sms-consent" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                        I agree to receive SMS text messages from Pell Solar about my service request (appointment confirmations, technician updates, status notifications). Reply <strong>STOP</strong> to opt out at any time. Msg &amp; data rates may apply.{" "}
                        <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[#2BABE2] font-semibold">Terms</a>{" & "}
                        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#2BABE2] font-semibold">Privacy Policy</a>.
                        <span className="block mt-1 text-gray-400 text-[11px]">Consent is not required to request service.</span>
                      </label>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full btn-green text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Submitting…</> : "SUBMIT SERVICE REQUEST"}
                    </button>
                    <p className="text-center text-gray-500 text-sm">We'll respond within 1 business day • No obligation</p>
                  </form>
                </div>
              )}

            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
