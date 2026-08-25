import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import AddressAutocomplete from "@/components/AddressAutocomplete";

const HERO_BG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const PROGRAMS_BANNER = "/manus-storage/financing-solar-programs-banner_c87f58b5.webp";

/* ── Bar Chart Component ─────────────────────────────────────────────────── */
function SavingsBarChart() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[#0B1D51] font-extrabold text-xl md:text-2xl text-center mb-6 uppercase tracking-wide leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        Lower Your Monthly Bill<br />With a Solar Lease
      </p>
      <div className="relative flex items-end gap-0 w-full max-w-sm mx-auto" style={{ height: 280 }}>
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between absolute left-0 top-0 bottom-0 text-xs text-gray-400 font-semibold pr-2" style={{ width: 44 }}>
          <span>$500</span>
          <span>$400</span>
          <span>$300</span>
          <span>$200</span>
          <span>$100</span>
          <span>$0</span>
        </div>

        {/* Chart area */}
        <div className="flex items-end gap-4 ml-12 flex-1 h-full">
          {/* BEFORE SOLAR bar */}
          <div className="flex flex-col items-center flex-1">
            <div
              className="w-full rounded-t-lg flex flex-col items-center justify-start pt-3 relative"
              style={{ height: "100%", background: "linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)" }}
            >
              <span className="text-white font-extrabold text-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>$500</span>
              <span className="text-white font-bold text-base">/mo</span>
            </div>
            <div className="mt-2 text-center">
              <p className="text-[#0B1D51] font-bold text-xs uppercase tracking-wide">Before</p>
              <p className="text-[#0B1D51] font-bold text-xs uppercase tracking-wide">Solar</p>
            </div>
          </div>

          {/* SAVE badge in middle */}
          <div className="flex flex-col items-center justify-center self-center z-10 -mx-2">
            <div className="bg-[#22c55e] rounded-full p-2 mb-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="bg-[#FED44D] rounded-xl px-3 py-2 text-center shadow-lg">
              <p className="text-[#0B1D51] font-extrabold text-sm leading-tight">SAVE</p>
              <p className="text-[#0B1D51] font-extrabold text-xl leading-tight">$230</p>
              <p className="text-[#0B1D51] font-bold text-xs leading-tight">EVERY</p>
              <p className="text-[#0B1D51] font-bold text-xs leading-tight">MONTH!</p>
            </div>
            <div className="mt-1 bg-[#0B1D51] text-white text-[9px] font-bold px-2 py-1 rounded text-center leading-tight max-w-[80px]">
              FIXED MONTHLY<br />SOLAR LEASE<br />PAYMENT
            </div>
          </div>

          {/* NEW SOLAR bar */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex-1" /> {/* spacer to push bar down */}
            <div
              className="w-full rounded-t-lg flex flex-col items-center justify-start pt-3"
              style={{ height: "54%", background: "linear-gradient(180deg, #22c55e 0%, #16a34a 100%)" }}
            >
              <span className="text-white font-extrabold text-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>$270</span>
              <span className="text-white font-bold text-base">/mo</span>
            </div>
            <div className="mt-2 text-center">
              <p className="text-[#0B1D51] font-bold text-xs uppercase tracking-wide">New</p>
              <p className="text-[#0B1D51] font-bold text-xs uppercase tracking-wide">Solar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Financing() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", bill: "", address: "", city: "", state: "", zip: "" });
  const [submitted, setSubmitted] = useState(false);
  const submitToCrm = trpc.crm.submitLead.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const utmData = {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
      gclid: params.get("gclid") || "",
    };
    submitToCrm.mutate({
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
      type: "new_lead",
      source: "website-financing",
      notes: form.bill ? `Monthly bill: ${form.bill}` : "",
      utm_data: utmData,
      _hp: "", // honeypot — always empty for real users
    }, {
      onSuccess: () => setSubmitted(true),
      onError: () => {
        setSubmitted(true);
        toast.error("Note: There was an issue sending your info. Please call us at (866) 646-8499.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative py-28 md:py-40"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0B1D51]/55" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            A <span className="text-[#FED44D]">better</span> way to pay for solar.
          </h1>
        </div>
      </section>

            {/* ── HOW SOLAR CAN HELP YOU SAVE (bar chart + checklist) ─────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Bar chart */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
              <SavingsBarChart />
            </div>
            {/* Right: text + checklist */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                How solar can help you save
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A PellSolAr solar lease replaces your electric bill with a <strong>lower, predictable monthly payment</strong>. With <strong>zero down</strong> and <strong>25-year coverage on the entire system—including the battery</strong>, maintenance and repairs are included so there are no surprise costs.
              </p>
              <div className="space-y-3">
                {[
                  "Lower monthly cost vs. utility bill",
                  "Zero down",
                  "Fixed, predictable payment",
                  "25-year system warranty",
                  "25-year battery coverage (huge differentiator)",
                  "No maintenance or repair risk",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-[#22c55e] font-bold text-lg mt-0.5">✔</span>
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINANCING & CASH PURCHASE CARDS ─────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Own Your System — <span className="text-[#2BABE2]">Two Ways to Buy</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Both options put you in full ownership of your solar system from day one.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Financing Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Financing</h3>
              <p className="text-gray-500 text-sm mb-6">Flexible loan terms and rates</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                For homeowners who want to own their solar system, we offer financing with competitive fixed rates and flexible terms. You own the equipment from day one, and every payment builds equity in your home.
              </p>
              <div className="space-y-0 mb-6">
                {[
                  { label: "Upfront Cost", value: "$0 Down" },
                  { label: "APR", value: "As low as 4.99%" },
                  { label: "Terms Available", value: "12, 15, or 20 years" },
                  { label: "Min. Credit Score", value: "650" },
                  { label: "Ownership", value: "You own it" },
                  { label: "Prepayment Penalty", value: "None" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <span className="text-gray-500 text-sm">{row.label}</span>
                    <span className="font-bold text-gray-900 text-sm">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
                <span className="text-yellow-500 text-lg flex-shrink-0">⚠️</span>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Important:</strong> The 30% federal tax credit is no longer available for financed purchases as of December 30, 2025. Your total cost will be the full system price plus interest.
                </p>
              </div>
            </div>
            {/* Cash Purchase Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Cash Purchase</h3>
              <p className="text-gray-500 text-sm mb-6">Outright ownership, no monthly payments</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Paying cash means no monthly payments and no interest. You own everything outright and benefit from reduced electric bills for the life of the system. This is the simplest option if upfront cost isn't a concern.
              </p>
              <div className="space-y-0 mb-6">
                {[
                  { label: "Upfront Cost", value: "Full system price" },
                  { label: "Monthly Payment", value: "None" },
                  { label: "Ownership", value: "You own it" },
                  { label: "Warranty", value: "Manufacturer standard" },
                  { label: "Battery Warranty", value: "10 years (manufacturer)" },
                  { label: "Maintenance", value: "Homeowner responsibility" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <span className="text-gray-500 text-sm">{row.label}</span>
                    <span className="font-bold text-gray-900 text-sm">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
                <span className="text-yellow-500 text-lg flex-shrink-0">⚠️</span>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Important:</strong> The 30% federal tax credit is no longer available for cash purchases as of December 30, 2025. The price you pay is the full system cost without any federal incentive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLAR PROGRAMS ───────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-20 bg-[#0B1D51] overflow-hidden">
        {/* Custom solar-themed background graphic */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="sunGlow" cx="80%" cy="20%" r="40%">
                <stop offset="0%" stopColor="#FED44D" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#FED44D" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="blueGlow" cx="10%" cy="80%" r="50%">
                <stop offset="0%" stopColor="#2BABE2" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#2BABE2" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1200" height="600" fill="url(#sunGlow)" />
            <rect width="1200" height="600" fill="url(#blueGlow)" />
            {/* Solar panel grid lines */}
            <g opacity="0.06" stroke="#FED44D" strokeWidth="1">
              <line x1="700" y1="0" x2="700" y2="600" />
              <line x1="800" y1="0" x2="800" y2="600" />
              <line x1="900" y1="0" x2="900" y2="600" />
              <line x1="1000" y1="0" x2="1000" y2="600" />
              <line x1="1100" y1="0" x2="1100" y2="600" />
              <line x1="700" y1="0" x2="1200" y2="200" />
              <line x1="700" y1="150" x2="1200" y2="350" />
              <line x1="700" y1="300" x2="1200" y2="500" />
              <line x1="700" y1="450" x2="1200" y2="600" />
            </g>
            {/* Sun circle */}
            <circle cx="960" cy="80" r="60" fill="#FED44D" opacity="0.08" />
            <circle cx="960" cy="80" r="40" fill="#FED44D" opacity="0.10" />
            {/* Energy flow dots */}
            <circle cx="850" cy="300" r="3" fill="#FED44D" opacity="0.3" />
            <circle cx="920" cy="260" r="2" fill="#2BABE2" opacity="0.4" />
            <circle cx="990" cy="340" r="2.5" fill="#FED44D" opacity="0.25" />
            <circle cx="1060" cy="200" r="2" fill="#2BABE2" opacity="0.3" />
            <circle cx="1130" cy="380" r="3" fill="#FED44D" opacity="0.2" />
          </svg>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: text + bullets */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Solar Programs
              </h2>
              <p className="text-white/90 leading-relaxed mb-4">
                Our team will help you find the solar plan that fits just right. Pell Solar offers three great options: <strong className="text-white">cash purchase</strong>, <strong className="text-white">solar financing</strong>, and a <strong className="text-white">zero-down solar lease</strong>.
              </p>
              <p className="text-white/80 leading-relaxed mb-6">
                No matter which route you choose, your hardware comes with a <strong className="text-white">minimum 25-year manufacturer warranty</strong>, and <strong className="text-white">monitoring and maintenance are included</strong>.
              </p>
              <div className="space-y-3">
                {[
                  "PURCHASE OR LEASE OPTIONS",
                  "ZERO DOWN LEASE OPTIONS",
                  "CASH & FINANCING AVAILABLE",
                  "PREDICTABLE MONTHLY PAYMENTS",
                  "PROTECTION FROM UTILITY RATE INCREASES",
                  "25-YEAR EQUIPMENT WARRANTY",
                  "MONITORING & MAINTENANCE INCLUDED",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-[#FED44D] flex-shrink-0" />
                    <span className="text-white font-semibold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: custom 3-options graphic */}
            <div className="flex justify-center">
              <div className="w-full max-w-md space-y-4">
                {/* Cash Purchase */}
                <div className="bg-white/10 border border-white/20 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FED44D] flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B1D51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-extrabold text-lg mb-1">Cash Purchase</div>
                    <div className="text-white/80 text-sm">Pay upfront, own outright. Maximum long-term savings with no monthly payments.</div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <span className="bg-[#FED44D]/20 text-[#FED44D] text-xs font-bold px-2 py-1 rounded-full">YOU OWN IT</span>
                      <span className="bg-[#FED44D]/20 text-[#FED44D] text-xs font-bold px-2 py-1 rounded-full">$0/MO PAYMENT</span>
                    </div>
                  </div>
                </div>
                {/* Solar Financing */}
                <div className="bg-white/10 border border-white/20 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#2BABE2] flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-extrabold text-lg mb-1">Solar Financing</div>
                    <div className="text-white/80 text-sm">$0 down, fixed low rate. Own your system and build equity from day one.</div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <span className="bg-[#2BABE2]/30 text-[#2BABE2] text-xs font-bold px-2 py-1 rounded-full">AS LOW AS 4.99% APR</span>
                      <span className="bg-[#2BABE2]/30 text-[#2BABE2] text-xs font-bold px-2 py-1 rounded-full">$0 DOWN</span>
                    </div>
                  </div>
                </div>
                {/* Zero-Down Lease */}
                <div className="bg-white/10 border border-[#FED44D]/40 rounded-2xl p-5 flex items-start gap-4 relative overflow-hidden">
                  <div className="absolute top-3 right-3 bg-[#FED44D] text-[#0B1D51] text-xs font-black px-2 py-0.5 rounded-full">MOST POPULAR</div>
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-extrabold text-lg mb-1">Zero-Down Solar Lease</div>
                    <div className="text-white/80 text-sm">No money down. Fixed monthly payment lower than your current utility bill.</div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <span className="bg-green-500/30 text-green-300 text-xs font-bold px-2 py-1 rounded-full">NO MONEY DOWN</span>
                      <span className="bg-green-500/30 text-green-300 text-xs font-bold px-2 py-1 rounded-full">TAX CREDIT BUILT IN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE LOCATIONS ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] mb-10 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Our Service Locations
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="text-center bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#0B1D51] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Upland, California</h3>
              <a
                href="tel:8666468499"
                className="inline-block bg-[#0B1D51] hover:bg-[#162a6e] text-white font-bold py-3 px-8 rounded-lg transition-colors no-underline"
              >
                (866) 646-8499
              </a>
              <a
                href="tel:7144553401"
                className="inline-block bg-[#0B1D51]/70 hover:bg-[#162a6e] text-[#FED44D] font-bold py-2 px-6 rounded-lg transition-colors no-underline text-sm mt-2"
              >
                (714) 455-3401 CA Local
              </a>
            </div>
            <div className="text-center bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#0B1D51] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Eagle, Idaho</h3>
              <a
                href="tel:2085031416"
                className="inline-block bg-[#0B1D51] hover:bg-[#162a6e] text-white font-bold py-3 px-8 rounded-lg transition-colors no-underline"
              >
                (208) 503-1416
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────────────────── */}
      <section
        className="relative py-16 md:py-24"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0B1D51]/60 backdrop-blur-sm" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <p className="text-[#2BABE2] font-semibold text-sm uppercase tracking-wider text-center mb-2">Ready to make a change to renewable energy?</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Contact us today.
          </h2>

          {submitted ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-xl px-8">
              <div className="text-5xl mb-4">☀️</div>
              <h3 className="text-2xl font-bold text-[#0B1D51] mb-2">Thank you!</h3>
              <p className="text-gray-600">We'll be in touch shortly to discuss your solar options.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#0B1D51] mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2BABE2]"
                    placeholder="First"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1D51] mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2BABE2]"
                    placeholder="Last"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1D51] mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2BABE2]"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1D51] mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2BABE2]"
                  placeholder="(555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1D51] mb-1">
                  Average Monthly Electrical Bill <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">Having your bill helps us give you a more accurate quote — but you can still proceed without it.</p>
                <input
                  type="text"
                  value={form.bill}
                  onChange={e => setForm({ ...form, bill: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2BABE2]"
                  placeholder="e.g. $300/mo — leave blank if you don't have it"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1D51] mb-1">Address *</label>
                <AddressAutocomplete
                  value={form.address}
                  onChange={(address, components) => setForm({ ...form, address, city: components?.city || "", state: components?.state || "", zip: components?.zip || "" })}
                  placeholder="Start typing your address..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2BABE2]"
                />
              </div>
              <button
                type="submit"
                disabled={submitToCrm.isPending}
                className="w-full bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 rounded-lg text-lg transition-colors disabled:opacity-60"
              >
                {submitToCrm.isPending ? "Sending..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
