import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle } from "lucide-react";
import { LiveReviewLinks } from "@/components/LiveReviewLinks";

const REFERRAL_QR_IMG = "/manus-storage/pell-solar-referral-qr_b0d91c44.png";
const REFERRAL_APP_URL = "https://pellsolar-crm-prod.onrender.com/app";

const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const SOLAR_PANELS_IMG = "/manus-storage/california-home_f656624c.jpg";
const POWERWALL_IMG = "/manus-storage/powerwall3-solar-meter_c7511143.png?v=20260819";
const EV_IMG = "/manus-storage/ev-charger_9b89efa1.jpg";
const POWERWALL_WALL_IMG = "/manus-storage/powerwall3-solar-meter_c7511143.png?v=20260819";
const POWERWALL_HOUSE_IMG = "/manus-storage/tesla-powerwall-house_f27a908c.jpeg";
const POWERWALL_FALLBACK_IMG = "/manus-storage/tesla-powerwall-house_f27a908c.jpeg?v=20260819";

/* ── Renter Popup ─────────────────────────────────────────────────────────── */
function RenterPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        <div className="text-5xl mb-4">🏢</div>
        <h3 className="text-2xl font-extrabold text-[#0B1D51] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          We Install for Homeowners
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Solar installations require homeowner approval. If you're renting, you'll need your landlord's consent to install solar.
        </p>
        <div className="bg-[#FED44D]/20 border border-[#FED44D] rounded-xl p-4 mb-6">
          <p className="text-[#0B1D51] font-bold text-sm">💰 Know a homeowner? Refer them and earn cash!</p>
          <p className="text-gray-600 text-sm mt-1">We pay referral bonuses for every installation that closes.</p>
        </div>
        <a href="tel:8666468499"
          className="block w-full bg-[#2BABE2] text-white font-bold py-3 rounded-xl hover:bg-[#1a9fd4] transition-colors text-sm no-underline mb-2">
          Call Us — (866) 646-8499
        </a>
        <a href="tel:7144553401"
          className="block w-full bg-[#0B1D51] text-[#FED44D] font-bold py-2.5 rounded-xl hover:bg-[#162a6e] transition-colors text-sm no-underline mb-3">
          CA Local — (714) 455-3401
        </a>
        <button onClick={onClose} className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
          Close
        </button>
      </div>
    </div>
  );
}

/* ── Inline Quote Widget — simple 3-button launcher ──────────────────────── */
function InlineQuoteWidget() {
  const [showRenterPopup, setShowRenterPopup] = useState(false);

  return (
    <>
      {showRenterPopup && <RenterPopup onClose={() => setShowRenterPopup(false)} />}
      <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Gradient header */}
        <div className="px-6 py-5 text-center" style={{ background: "linear-gradient(135deg, #2BABE2 0%, #1a7fc4 45%, #0f5fa0 100%)" }}>
          <p className="text-white/80 text-xs uppercase tracking-widest font-semibold">No Cost · No Obligation</p>
          <h3 className="text-white text-xl font-extrabold mt-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            How Much Can <span className="text-[#FED44D]">You</span> Save?
          </h3>
        </div>
        {/* 3 colorful buttons */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {/* I OWN MY HOME — Yellow card → /get-quote */}
            <Link href="/get-quote?ownership=own"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all text-center no-underline hover:opacity-90 active:scale-95"
              style={{ background: "#FED44D", border: "2px solid #F5A623", minHeight: "100px" }}>
              <span className="text-3xl">🏠</span>
              <span className="font-extrabold text-[#0B1D51] text-xs uppercase tracking-wide leading-tight">I OWN MY HOME</span>
            </Link>
            {/* I'M RENTING — Cyan card → renter popup */}
            <button onClick={() => setShowRenterPopup(true)}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all text-center hover:opacity-90 active:scale-95"
              style={{ background: "#2BABE2", border: "2px solid #1a9fd4", minHeight: "100px" }}>
              <span className="text-3xl">🏢</span>
              <span className="font-extrabold text-white text-xs uppercase tracking-wide leading-tight">I'M RENTING</span>
            </button>
            {/* SERVICE CALL — Green card → /solar-repair#service-form */}
            <Link href="/solar-repair#service-form"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all text-center no-underline hover:opacity-90 active:scale-95"
              style={{ background: "#22C55E", border: "2px solid #16A34A", minHeight: "100px" }}>
              <span className="text-3xl">🔧</span>
              <span className="font-extrabold text-white text-xs uppercase tracking-wide leading-tight">SERVICE CALL</span>
            </Link>
          </div>
        </div>
        {/* Phone CTA */}
        <div className="px-4 pb-5 text-center">
          <p className="text-gray-500 text-xs mb-1">Call Us 24/7 — Schedule a Consultation</p>
          <a href="tel:8666468499" className="text-[#2BABE2] font-extrabold text-xl hover:text-[#1a9fd4] transition-colors no-underline block">
            (866) 646-8499
          </a>
          <a href="tel:7144553401" className="text-[#0B1D51] font-bold text-sm hover:text-[#162a6e] transition-colors no-underline block mt-0.5">
            (714) 455-3401 <span className="text-gray-400 font-normal">CA Local</span>
          </a>
        </div>
      </div>
    </>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────────── */
const faqs = [
  { q: "How long does installation take?", a: "Most residential systems are installed in 1–2 days. The complete process — from approval and site survey through permitting, installation, and SCE activation — typically takes 6–10 weeks total. We handle every step so you don't have to.", link: { text: "Get your free quote and we'll walk you through the timeline →", href: "/get-quote" } },
  { q: "Will solar panels void my roof warranty?", a: "No — a properly installed solar system will not void your roof warranty. We use industry-standard IronRidge racking and flashing systems that are engineered specifically to maintain your roof's weatherproofing.", link: { text: "Learn more about our solar panel systems →", href: "/solar-panel-systems" } },
  { q: "What happens if I sell my house?", a: "Solar increases your home's value. Homes with solar sell for an average of 3–4% more than comparable homes without solar. If you have a solar lease, the lease can be transferred to the new homeowner.", link: { text: "Explore your ownership and financing options →", href: "/financing" } },
  { q: "Is solar still worth it under NEM 3.0?", a: "Absolutely yes — when the system is designed correctly. The solution is pairing solar with a Tesla Powerwall battery. Store your energy and use it during peak hours (4–9 PM) when Edison charges the highest rates.", link: { text: "Read our full NEM 3.0 guide →", href: "/nem-3" } },
  { q: "How much does solar cost?", a: "Solar Lease ($0 down): Monthly payments start at $234/month for a 16-panel system with Tesla Powerwall. Financing: Purchase your system with a solar loan. Cash Purchase: The lowest total cost with a typical payback period of 5–8 years.", link: { text: "View our lease packages and pricing →", href: "/financing" } },
  { q: "Do I need a battery?", a: "Under NEM 3.0, a battery is essential for maximizing your savings. With a Tesla Powerwall 3, your excess solar energy is stored and used from 4–9 PM when Edison charges the highest rates.", link: { text: "Learn more about Tesla Powerwall 3 →", href: "/tesla-powerwall" } },
];

/* ── Steps ────────────────────────────────────────────────────────────────── */
const steps = [
  { num: 1, title: "Quote & Approval", desc: "It all starts with a free consultation. We review your electricity bill, assess your roof using satellite imagery, and design a system sized specifically for your home. Once you decide to move forward, we get you approved for your preferred payment option — $0 down solar lease, financing, or cash.", timeline: "Same day to a few days for approval" },
  { num: 2, title: "Site Survey", desc: "Once approved, we schedule a professional site survey at your home. Our team verifies all roof measurements, identifies the best locations for your Tesla Powerwall battery, and evaluates your electrical panel.", timeline: "Scheduled within 1–2 weeks of approval" },
  { num: 3, title: "Engineering & Permits", desc: "After the site survey, we send you a contract to review and sign. Engineering usually takes 3–4 business days. We handle all city permitting — timelines vary from a few days to 2–6 weeks.", timeline: "2–6 weeks depending on city" },
  { num: 4, title: "Installation", desc: "Most residential systems are installed in 1–2 days. Our own licensed electricians and installers do every job — we never outsource. We pull permits and handle HOA.", timeline: "1–2 days on-site" },
  { num: 5, title: "Activation", desc: "After installation, we schedule a final building inspection. SCE typically takes 2–30 days to install the smart meter. Once installed and PTO is granted, your system is fully activated.", timeline: "2–30 days for SCE smart meter" },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center"
        style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ background: "rgba(11,29,81,0.40)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 flex flex-col items-center gap-8 w-full text-center">
          {/* Headline — centered above widget, matching pellsolar.com */}
          <div className="text-white max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-white/40 text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full mb-6">
              Tesla Certified Installer · Family-Owned
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Your Home Deserves Solar Done by People Who{" "}
              <span style={{ color: "#FED44D" }}>Actually Care</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed max-w-2xl mx-auto">
              We are not a national chain. We are a family business focused on helping homeowners evaluate solar and battery options for their properties.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#FED44D] text-[#0B1D51] font-extrabold text-sm uppercase tracking-wide px-6 py-3 rounded-full mb-2">
              $0 Down — Tax Credit Built Into Your Lease ▼
            </div>
          </div>

          {/* Widget — centered below headline, matching pellsolar.com */}
          <div className="w-full flex justify-center">
            <InlineQuoteWidget />
          </div>
        </div>
      </section>

      {/* ═══════════ TRUST BAR ═══════════ */}
      <section className="bg-[#0B1D51] py-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-white text-sm">
          <div className="flex items-center gap-2"><span className="font-semibold">Local Solar &amp; Battery Team</span></div>
          <div className="flex items-center gap-2">
            <span className="bg-[#E31937] text-white font-bold text-xs px-2 py-0.5 rounded">TESLA</span>
            <span className="font-semibold">Certified</span>
          </div>
          <div className="flex items-center gap-2"><span className="font-semibold">Southern California &amp; Idaho</span></div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg" style={{ color: "#FED44D" }}>$0</span>
            <span className="font-semibold">Down Options</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold" style={{ color: "#2BABE2" }}>#949122</span>
            <span className="font-semibold">Licensed Contractor</span>
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEW BADGES ═══════════ */}
      <section className="py-5 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-5">
          <LiveReviewLinks />
        </div>
      </section>

      {/* ═══════════ WHAT WE DO ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">What We Do</h2>
            <p className="text-gray-600 text-lg">Custom-engineered solar, battery, and EV charging systems — designed and managed by our team from start to finish.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: SOLAR_PANELS_IMG, title: "Solar Panel Systems", desc: "Every system is custom-designed for your roof, your energy usage, and NEM 3.0. Premium panels with 25-year warranties.", href: "/solar-panel-systems" },
              { img: POWERWALL_IMG, fallback: POWERWALL_FALLBACK_IMG, title: "Tesla Powerwall Battery", desc: "Store your solar energy and power your home during peak hours. Whole-home backup when the grid goes down.", href: "/tesla-powerwall" },
              { img: EV_IMG, title: "EV Charger Installation", desc: "Level 2 Tesla Wall Connector and universal charger installs. Charge your car with free solar energy from your roof.", href: "/ev-charging" },
            ].map(card => (
              <div key={card.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover">
                <div className="h-56 overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={card.fallback ? (event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = card.fallback;
                    } : undefined}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{card.desc}</p>
                  <Link href={card.href} className="flex items-center gap-1 font-bold text-sm no-underline" style={{ color: "#2BABE2" }}>
                    LEARN MORE <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TAX CREDIT ═══════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Left: text */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                The Tax Credit Didn't Disappear — It Moved Into Your Lease
              </h2>
              <div className="text-gray-700 text-base leading-relaxed space-y-4">
                <p>Even in 2026, the Federal Solar Tax Credit is still available — it just works differently depending on how you go solar. With a solar lease, the system is owned by the leasing provider, which allows them to claim the federal incentive on the hardware and installation.</p>
                <p>That savings is then built directly into your lease structure, helping reduce your overall cost without requiring you to purchase the system upfront.</p>
                <p>The result? You can go solar with <strong>$0 down</strong>, predictable monthly payments, and battery options available — while still benefiting from the federal incentive through the lease program.</p>
              </div>
              <div className="border-l-4 border-[#2BABE2] bg-[#2BABE2]/10 rounded-r-xl p-4 mt-6 mb-6">
                <p className="font-bold text-[#0B1D51] text-sm uppercase tracking-wide">YOUR TAX CREDIT SAVINGS DIDN'T DISAPPEAR, THEY JUST MOVED!</p>
              </div>
              <Link href="/solar-lease" className="btn-green inline-block">SEE OUR $0 DOWN LEASE OPTIONS →</Link>
            </div>
            {/* Right: YouTube embed */}
            <div className="flex-1 max-w-lg w-full">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/lhsDln_0Lzc"
                  title="The Solar Tax Credit Is Gone — But There's a Loophole (2026)"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ border: "none" }}
                />
              </div>
              <p className="text-gray-500 text-xs mt-2 text-center">▶ Watch & Learn How It Works</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ NEM 3.0 ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 max-w-md">
              <img
                src={POWERWALL_WALL_IMG}
                alt="Tesla Powerwall 3"
                className="w-full rounded-2xl shadow-lg"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = POWERWALL_FALLBACK_IMG;
                }}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                NEM 3.0 Changed the Game — But Solar Still Works
              </h2>
              <div className="text-gray-700 text-base leading-relaxed space-y-4">
                <p>Under California's new NEM 3.0 rules, the credits you get for sending solar energy back to the grid are much lower than before. That means <strong>solar panels alone are no longer enough</strong> to eliminate your bill.</p>
                <p>The solution? Pair your panels with a <strong>Tesla Powerwall battery</strong>. Store your energy during the day and use it from 4–9 PM when Edison charges the most.</p>
              </div>
              <div className="border-l-4 border-[#2BABE2] bg-[#2BABE2]/10 rounded-r-xl p-4 mt-4 mb-6">
                <p className="text-gray-800 text-sm"><strong>Our approach:</strong> We build every system 25% bigger than your usage and pair it with a Powerwall. The goal is <strong>zero grid power during peak hours, every single day</strong>.</p>
              </div>
              <Link href="/nem-3" className="btn-green inline-block">LEARN HOW NEM 3.0 WORKS →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">How Your Solar Home Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">A Pell Solar system works around the clock — generating power, storing it, and protecting you from peak rates and outages.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { img: "/manus-storage/how-it-works-1-panels_9b6c6456.jpg", step: "1", time: "7am – 4pm", title: "Panels Generate Power", desc: "Your solar panels produce clean electricity all day. Excess energy charges your Powerwall battery automatically.", color: "#facc15" },
              { img: "/manus-storage/how-it-works-2-battery_fcab8965.jpg", step: "2", time: "All Day", title: "Battery Charges Up", desc: "Your Tesla Powerwall 3 stores the solar energy your home doesn't use immediately — ready for when you need it most.", color: "#22c55e" },
              { img: "/manus-storage/how-it-works-3-peak_8b018b6c.jpg", step: "3", time: "4pm – 9pm", title: "Battery Beats Peak Rates", desc: "Edison charges up to 47¢/kWh during peak hours. Your Powerwall kicks in automatically so you pay $0 to the grid.", color: "#f97316" },
              { img: "/manus-storage/how-it-works-4-backup_586e5b35.jpg", step: "4", time: "Any Time", title: "Whole-Home Backup", desc: "If the grid goes down, your Powerwall keeps your entire home running — lights, AC, refrigerator — without interruption.", color: "#60a5fa" },
            ].map(card => (
              <div key={card.step} className="bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover">
                <div className="h-44 overflow-hidden relative">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-[#0B1D51]" style={{ background: card.color }}>{card.step}</span>
                    <span className="text-white text-xs font-bold bg-black/50 rounded-full px-2 py-0.5 backdrop-blur-sm">{card.time}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-gray-900 text-base mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/solar-demo" className="btn-navy inline-block mr-4">▶ WATCH INTERACTIVE DEMO</Link>
            <Link href="/get-quote?ownership=own" className="btn-green inline-block">GET MY FREE QUOTE</Link>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA BANNER — CYAN matching pellsolar.com ═══════════ */}
      <section className="py-16" style={{ background: "#2BABE2" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">See How Much You Can Save</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Every system is custom-designed based on your roof, your usage, and your goals. Get a free estimate in minutes.</p>
          <Link href="/get-quote" className="btn-gold inline-block text-lg px-10 py-4">GET YOUR FREE QUOTE</Link>
        </div>
      </section>

      {/* ═══════════ STEPS ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Your Solar Journey — Step by Step
            </h2>
            <p className="text-gray-600 text-lg">Click each step to see exactly what happens. We handle everything from start to finish.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                className="flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm transition-all"
                style={{
                  background: activeStep === i ? "#0B1D51" : "#f3f4f6",
                  color: activeStep === i ? "white" : "#374151",
                }}>
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                  style={{
                    background: activeStep === i ? "#FED44D" : "#d1d5db",
                    color: activeStep === i ? "#0B1D51" : "#6b7280",
                  }}>{s.num}</span>
                {s.title}
              </button>
            ))}
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Step {steps[activeStep].num}: {steps[activeStep].title}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">{steps[activeStep].desc}</p>
            <div className="border-l-4 border-[#2BABE2] pl-4">
              <p className="text-gray-500 text-sm"><strong>Timeline:</strong> {steps[activeStep].timeline}</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/get-quote" className="btn-green inline-block">GET STARTED — IT'S FREE</Link>
          </div>
        </div>
      </section>

      {/* ═══════════ PRICING ═══════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Solar + Battery Packages — $0 Down
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Two plans designed to fit your home and your energy bill. All include Tesla Powerwall 3, Smart Meter, full installation, and a 25-year warranty.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Solar Shield */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 card-hover">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Solar Shield</h3>
              <p className="text-gray-500 text-sm mb-4">For homes with SCE bills around $320/mo</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-gray-900">$234</span>
                <span className="text-gray-500 text-lg">/mo</span>
              </div>
              <ul className="space-y-2.5 mb-8">
                {["16 Solar Panels", "1 Tesla Powerwall 3 (13.5 kWh)", "1 Tesla Smart Meter", "Peak-hour grid protection (4–9pm)", "25-Year Full System Warranty", "25-Year Battery Warranty", "Professional Installation", "Permitting and Inspections", "24/7 Monitoring via Tesla App"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} style={{ color: "#2BABE2", marginTop: "2px", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-quote" className="btn-navy w-full block text-center">Get This Package</Link>
            </div>
            {/* Solar Shield+ */}
            <div className="bg-white rounded-2xl p-8 card-hover relative" style={{ border: "2px solid #2BABE2" }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full" style={{ background: "#2BABE2" }}>Most Popular</div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Solar Shield+</h3>
              <p className="text-gray-500 text-sm mb-4">For homes with SCE bills around $580/mo</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-gray-900">$307</span>
                <span className="text-gray-500 text-lg">/mo</span>
              </div>
              <ul className="space-y-2.5 mb-8">
                {["32 Solar Panels", "1 Tesla Powerwall 3 (13.5 kWh)", "1 Tesla Smart Meter", "Peak-hour grid protection (4–9pm)", "25-Year Full System Warranty", "25-Year Battery Warranty", "Professional Installation", "Permitting and Inspections", "24/7 Monitoring via Tesla App"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} style={{ color: "#2BABE2", marginTop: "2px", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-quote" className="btn-green w-full block text-center">Get This Package</Link>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">*Final system size and pricing based on site evaluation.</p>
          <div className="text-center mt-4">
            <Link href="/financing" className="font-bold hover:underline transition-colors" style={{ color: "#2BABE2" }}>VIEW FULL PACKAGE DETAILS →</Link>
          </div>
        </div>
      </section>

      {/* ═══════════ POWERWALL ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                Tesla Powerwall 3
              </h2>
              <div className="text-gray-700 text-base leading-relaxed space-y-4">
                <p>Keep your home powered during outages with the <strong>Tesla Powerwall 3</strong> — a compact battery with an integrated solar inverter that delivers seamless backup protection and increased energy savings.</p>
                <p>A single unit can power your entire home during a grid outage, automatically switching on without delay. It stores excess solar energy, lowers your electricity bills, and is built to withstand extreme weather.</p>
                <p>As a <strong>Tesla Certified Installer</strong>, Pell Solar handles every step — from design and permitting to professional installation.</p>
              </div>
              <Link href="/tesla-powerwall" className="btn-green mt-8 inline-block">LEARN ABOUT POWERWALL →</Link>
            </div>
            <div className="flex-1 max-w-md">
              <img src={POWERWALL_IMG} alt="Tesla Powerwall 3" className="w-full rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS ═══════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">What Our Customers Say</h2>
            <p className="text-gray-500 text-base">Read current, independently published customer feedback from Google and Yelp.</p>
          </div>
          <LiveReviewLinks className="mb-8" />
          <div className="text-center"><Link href="/reviews" className="btn-green">READ CUSTOMER FEEDBACK →</Link></div>
        </div>
      </section>

      {/* ═══════════ REFERRAL PROGRAM ═══════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1D51 0%, #0f2a6b 50%, #0B1D51 100%)" }}>
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(254,212,77,0.10) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(43,171,226,0.10) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 border text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-6" style={{ borderColor: "rgba(254,212,77,0.4)", background: "rgba(254,212,77,0.12)", color: "#FED44D" }}>
              ⚡ Referral Program
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Know Someone Who Needs Solar?<br />
              <span style={{ color: "#FED44D" }}>Earn Up to $2,000 Cash.</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Our customers are our best salespeople. Sign up free, share your personal link, and get paid when your friends go solar — no selling required.
            </p>
          </div>

          {/* Two-column grid */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* LEFT — Reward tiers + testimonial */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>How much you earn</p>

              {/* Tier 1 */}
              <div className="flex items-center gap-4 rounded-2xl p-5 mb-4 transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: "rgba(254,212,77,0.18)" }}>☀️</div>
                <div className="flex-1">
                  <div className="font-bold text-white text-base">Solar + Battery System</div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Friend installs panels + Powerwall</div>
                </div>
                <div className="font-extrabold text-xl whitespace-nowrap" style={{ fontFamily: "'Montserrat', sans-serif", color: "#FED44D" }}>$500–$2,000</div>
              </div>

              {/* Tier 2 */}
              <div className="flex items-center gap-4 rounded-2xl p-5 mb-4 transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: "rgba(43,171,226,0.18)" }}>🔋</div>
                <div className="flex-1">
                  <div className="font-bold text-white text-base">Battery-Only Install</div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Friend adds a Powerwall to existing solar</div>
                </div>
                <div className="font-extrabold text-xl whitespace-nowrap" style={{ fontFamily: "'Montserrat', sans-serif", color: "#FED44D" }}>$250–$500</div>
              </div>

              <p className="text-xs leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
                Reward scales with system size. Paid after installation is complete. No limit on how many friends you can refer.
              </p>

              {/* Customer testimonial */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(254,212,77,0.08)", border: "1px solid rgba(254,212,77,0.22)" }}>
                <p className="text-sm leading-relaxed italic mb-3" style={{ color: "rgba(255,255,255,0.80)" }}>
                  "I referred my neighbor and got a check in the mail two months later. Easiest $500 I've ever made."
                </p>
                <p className="text-sm font-bold" style={{ color: "#FED44D" }}>— Michael P., Fontana CA</p>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                {[
                  { num: "90%", label: "of our business\ncomes from referrals" },
                  { num: "$0", label: "cost to join\nthe program" },
                  { num: "$2K", label: "max reward\nper referral" },
                ].map(s => (
                  <div key={s.num}>
                    <div className="font-extrabold text-3xl" style={{ fontFamily: "'Montserrat', sans-serif", color: "#FED44D" }}>{s.num}</div>
                    <div className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — App signup card */}
            <div className="bg-white rounded-3xl p-8 text-center" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.28)" }}>
              {/* App icon */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5" style={{ background: "linear-gradient(135deg, #2BABE2 0%, #0B1D51 100%)", boxShadow: "0 8px 24px rgba(43,171,226,0.35)" }}>☀️</div>

              <h3 className="text-xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Join the Pell Solar<br />Referral Program
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Create your free account in 2 minutes. Get your personal referral link and track every referral in real time.
              </p>

              {/* Steps */}
              <div className="flex flex-col gap-3 mb-7 text-left">
                {[
                  { n: "1", text: <><strong className="text-gray-900">Sign up free</strong> — takes 2 minutes, no credit card</> },
                  { n: "2", text: <><strong className="text-gray-900">Get your link</strong> — share by text, email, or social media</> },
                  { n: "3", text: <><strong className="text-gray-900">Get paid</strong> — we send your reward when the job is done</> },
                ].map(step => (
                  <div key={step.n} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 mt-0.5" style={{ background: "#2BABE2" }}>{step.n}</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>

              {/* QR code + label */}
              <div className="flex flex-col items-center mb-6">
                <div className="rounded-2xl p-3 mb-2" style={{ background: "#f8fafc", border: "1px solid #e5e7eb" }}>
                  <img src={REFERRAL_QR_IMG} alt="Scan to join Pell Solar Referral Program" className="w-32 h-32" />
                </div>
                <p className="text-xs text-gray-400 font-medium">📱 Point your phone camera here to sign up</p>
              </div>

              {/* CTA button */}
              <a
                href={REFERRAL_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full font-extrabold text-sm text-white py-4 rounded-2xl mb-3 transition-all hover:opacity-90 no-underline"
                style={{ background: "linear-gradient(135deg, #2BABE2 0%, #1a7fc4 100%)", letterSpacing: ".04em" }}
              >
                CREATE MY FREE ACCOUNT →
              </a>

              <p className="text-xs text-gray-400">
                Already have an account?{" "}
                <a href={REFERRAL_APP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold no-underline hover:underline" style={{ color: "#2BABE2" }}>Log in here</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Common Questions</h2>
            <p className="text-gray-500 text-base">Straight answers to the questions we hear most.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-gray-900 hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <span className="text-2xl font-light ml-4" style={{ color: "#2BABE2" }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                    <p className="mt-4">{faq.a}</p>
                    {faq.link && (
                      <Link href={faq.link.href} className="mt-3 inline-block font-semibold text-sm no-underline hover:underline" style={{ color: "#2BABE2" }}>
                        {faq.link.text}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
