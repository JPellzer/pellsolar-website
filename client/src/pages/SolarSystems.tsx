import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { CheckCircle, ArrowRight, Zap, Battery, Home as HomeIcon, Sun, Monitor, Wrench, Shield, Users, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const QCELLS_IMG = "/manus-storage/qcells-panel-real_2bd09da8.png";
const JINKO_IMG = "/manus-storage/jinko-panel-real_d42d5d02.png";
const HYUNDAI_IMG = "/manus-storage/hyundai-panel-real_46a998c9.png";
const TILE_ROOF_IMG = "/manus-storage/qcells-panel-real_2bd09da8.png";
const POWERWALL_IMG = "/manus-storage/powerwall3-solar-meter_c7511143.png?v=20260819";
const POWERWALL_FALLBACK_IMG = "/manus-storage/tesla-powerwall-house_f27a908c.jpeg?v=20260819";

/* ── How It Works Animation ─────────────────────────────────────────────── */
const scenarios = [
  {
    id: "solar", icon: "☀️", label: "Solar Panels", time: "7am – 4pm · Off-Peak",
    title: "Solar Panels — Generating Free Electricity", period: "OFF-PEAK · 7:00 AM – 4:00 PM",
    desc: "Your solar panels are producing clean energy from sunrise. During off-peak hours, your panels power your home directly and send excess energy to charge your Tesla Powerwall battery. Any remaining surplus goes to the grid — but under NEM 3.0, we prioritize self-consumption and battery storage over exports.",
    color: "#f59e0b",
  },
  {
    id: "charging", icon: "⚡", label: "Tesla Charging", time: "Off-Peak · Charge Smart",
    title: "Tesla EV Charging — Off-Peak Smart Charging", period: "OFF-PEAK · CHARGE SMART",
    desc: "Your Tesla Wall Connector charges your EV using free solar energy during off-peak hours. By charging during the day when your panels are producing, you avoid paying SCE's peak electricity rates. A full charge from solar costs you $0 — compared to $15–$25 from the grid.",
    color: "#3b82f6",
  },
  {
    id: "powerwall", icon: "🔋", label: "Powerwall 3", time: "4pm – 9pm · Peak Protection",
    title: "Powerwall 3 — Running Your Home Off Battery", period: "PEAK · 4:00 PM – 9:00 PM · UP TO $0.58/kWh",
    desc: "It's 4pm–9pm — the most expensive part of the day. Your Powerwall is running your entire home on stored solar energy so you're not buying a single kWh from SCE. We don't export power back to the grid — every bit goes to your home.",
    color: "#2BABE2",
  },
  {
    id: "backup", icon: "🏠", label: "Whole Home Backup", time: "Grid Down · Battery Powered",
    title: "Whole Home Backup — Grid Down Protection", period: "GRID OUTAGE · BATTERY POWERED",
    desc: "When the grid goes down, your Powerwall automatically kicks in — keeping your lights on, your fridge running, and your family comfortable. Your solar panels continue charging the battery during the day, giving you potentially unlimited backup power during extended outages.",
    color: "#ef4444",
  },
];

function HowItWorksAnimation() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % scenarios.length);
      }, 6000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing]);

  const s = scenarios[active];

  return (
    <div className="bg-[#0B1D51] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: s.color }}>{s.period}</div>
          <h3 className="text-white text-lg font-bold mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.icon} {s.title}</h3>
        </div>
        <button onClick={() => setPlaying(!playing)} className="text-white/60 hover:text-white text-sm px-3 py-1 rounded border border-white/20 transition-colors">
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>
      <div className="px-6 py-5 border-b border-white/10">
        <p className="text-white/80 text-sm leading-relaxed">{s.desc}</p>
      </div>
      <div className="px-6 py-8">
        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          {[
            { emoji: "☀️", label: "Solar", highlight: active === 0, bg: "bg-yellow-400/20" },
            { emoji: "⚡", label: "Panels", highlight: active <= 1, bg: "bg-blue-500/20" },
            { emoji: "🔋", label: "Powerwall", highlight: active === 2 || active === 3, bg: "bg-[#2BABE2/10]0/20" },
            { emoji: "🏠", label: "Home", highlight: active >= 2, bg: "bg-white/10" },
          ].map((node, i) => (
            <div key={node.label} className="flex items-center gap-4">
              <div className={`flex flex-col items-center transition-all duration-500 ${node.highlight ? "scale-110" : "opacity-60"}`}>
                <div className={`w-16 h-16 rounded-xl ${node.bg} flex items-center justify-center text-3xl`}>{node.emoji}</div>
                <span className="text-white/60 text-xs mt-2">{node.label}</span>
              </div>
              {i < 3 && <ArrowRight size={24} className={`text-white/30 ${node.highlight ? "animate-pulse" : ""}`} style={{ color: node.highlight ? s.color : undefined }} />}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
        {scenarios.map((sc, i) => (
          <button key={sc.id} onClick={() => { setActive(i); setPlaying(false); }}
            className={`px-4 py-4 text-center transition-all border-t-2 ${active === i ? "bg-white/10" : "border-transparent hover:bg-white/5"}`}
            style={{ borderTopColor: active === i ? sc.color : "transparent" }}>
            <div className="text-2xl mb-1">{sc.icon}</div>
            <div className="text-white text-xs font-bold">{sc.label}</div>
            <div className="text-white/40 text-[10px] mt-0.5">{sc.time}</div>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 bg-[#0a1640] border-t border-white/10">
        {[{ val: "$0.58/kWh", label: "SCE peak rate" }, { val: "$0.00", label: "your cost" }, { val: "13.5 kWh", label: "per battery" }, { val: "1 or 2", label: "batteries needed" }].map((stat) => (
          <div key={stat.label} className="px-4 py-4 text-center border-r border-white/5 last:border-r-0">
            <div className="text-white font-black text-lg">{stat.val}</div>
            <div className="text-white/50 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 text-center border-t border-white/10">
        <span className="text-white/40 text-xs">Built by <span className="text-white/60 font-semibold">Pell Solar</span> — Southern California's Trusted Tesla Installer</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function SolarSystems() {
  const [activeTab, setActiveTab] = useState("panels");
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D51]/45 via-[#0B1D51]/30 to-[#0B1D51]/45" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full mb-6" style={{ background: "rgba(254,212,77,0.15)", border: "1px solid #FED44D", color: "#FED44D" }}>
            Tesla Certified Installer · Family-Owned
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Solar Systems Designed to <span style={{ color: "#FED44D" }}>Eliminate Your Electric Bill</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            Every system custom-engineered for your home. Built 25% bigger than your usage for NEM 3.0. Paired with Tesla Powerwall batteries so you never pay peak rates again.
          </p>
          <Link href="/get-quote" className="inline-block bg-white text-[#0B1D51] font-bold text-lg px-10 py-4 rounded-full hover:bg-gray-100 transition-colors no-underline shadow-xl">
            GET YOUR FREE SOLAR QUOTE
          </Link>
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {[{ id: "panels", label: "Solar Panels" }, { id: "racking", label: "Racking & Mounting" }, { id: "inverters", label: "Inverters" }, { id: "howitworks", label: "How It Works" }].map((tab) => (
              <button key={tab.id} onClick={() => scrollToSection(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${activeTab === tab.id ? "bg-white text-[#0B1D51] border-white" : "bg-white/10 text-white border-white/30 hover:bg-white/20"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHY 25% BIGGER ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Why We Build Your System <span className="text-[#2BABE2]">25% Bigger</span>
          </h2>
          <div className="text-gray-700 text-lg leading-relaxed space-y-4">
            <p>Under NEM 3.0, you no longer get the 1-to-1 credit you used to receive with NEM 2.0. Exporting solar back to the grid earns you pennies on the dollar. That's why we design every system at <strong>125% of your annual consumption</strong> — so your panels produce enough to fully power your home and charge your battery, without relying on grid credits that no longer make financial sense.</p>
            <p>Paired with a Tesla Powerwall, your system stores excess solar during the day and runs your home off battery every evening from <strong>4pm to 9pm</strong> — when SCE charges up to <strong>$0.58/kWh</strong>. This is how we eliminate your bill.</p>
          </div>
        </div>
      </section>

      {/* ═══════════ PREMIUM SOLAR PANELS ═══════════ */}
      <section id="panels" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Premium Solar Panels — Built to Last</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">We use top-tier domestic and tariff-free panels so your investment is protected. Every panel comes with a 25-year manufacturer warranty.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: QCELLS_IMG, badge: "Made in USA — No Tariffs", title: "Q CELLS by Hanwha", desc: "High-efficiency panels with excellent shade performance. Manufactured in Georgia, USA — zero tariff risk. 25-year product and performance warranty. Our go-to for most residential installs." },
              { img: JINKO_IMG, badge: "Global Leader", title: "Jinko Solar", desc: "One of the world's largest panel manufacturers. Known for reliability, consistent output, and strong warranty support. Proven across millions of installations worldwide." },
              { img: HYUNDAI_IMG, badge: "Premium Quality", title: "Hyundai Energy", desc: "Backed by one of the world's largest corporations. Premium build quality with excellent low-light performance. 25-year warranty with the Hyundai name behind it." },
            ].map((panel) => (
              <div key={panel.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-56 overflow-hidden">
                  <img src={panel.img} alt={panel.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 bg-[#2BABE2/15] text-[#0B1D51]">{panel.badge}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{panel.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{panel.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ RACKING & MOUNTING ═══════════ */}
      <section id="racking" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 max-w-md">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663592920644/UzNUyTd222pkxN2KfqQwdX/ironridge-racking-kJdWNXBaNfHJQf4nBP3vi5.webp" alt="IronRidge racking system on residential roof" className="w-full rounded-2xl shadow-lg" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Professional Racking & Roof Mounting</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">Your panels are only as good as what holds them to your roof. We use <strong>IronRidge</strong> — the industry standard — engineered for strength, speed, and code compliance. Made in the USA.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Tile Roofs:</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">Specialized tile hooks mount securely beneath the tiles without damaging them. Your roof stays intact and watertight.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Comp/Shingle Roofs:</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">IronRidge FlashFoot2 mounts with integrated flashing — waterproof, code-compliant, and clean-looking from the street.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ REAL-TIME MONITORING ═══════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Real-Time Energy Monitoring</h2>
              <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                <p>Every system includes app-based monitoring. See exactly how much power your panels produce, how much your home uses, and how much your battery stores — all from your phone.</p>
                <p>With the <strong>Tesla app</strong>, you get real-time visibility into solar production, Powerwall charge level, home consumption, and grid status. With <strong>Enphase</strong>, you get per-panel monitoring so you can see every panel individually.</p>
                <p className="font-semibold text-gray-900 border-l-4 border-[#2BABE2] pl-4">Knowledge is power — literally. Watching your system produce free electricity never gets old.</p>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663592920644/UzNUyTd222pkxN2KfqQwdX/solar-monitoring-phone-i3L2znA73NFQKeLEeB5uBT.webp" alt="Solar energy monitoring app on iPhone showing production, battery, and usage data" className="w-full rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SMART INVERTERS ═══════════ */}
      <section id="inverters" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Smart Inverters — The Brain of Your System</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">The inverter converts DC power from your panels into AC power your home can use. We use the best in the industry.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap size={32} className="text-yellow-500" />, title: "Tesla Powerwall 3", desc: "Built-in solar inverter — no separate box needed. Fewer components, cleaner install, higher efficiency. Monitored through the Tesla app." },
              { icon: <Monitor size={32} className="text-blue-500" />, title: "Enphase Microinverters", desc: "Panel-level optimization — each panel works independently. If one is shaded, the rest produce at full power. Per-panel monitoring included." },
              { icon: <Shield size={32} className="text-[#2BABE2]" />, title: "App-Based Control", desc: "Both Tesla and Enphase provide smartphone apps for real-time monitoring, alerts, and system management from anywhere." },
            ].map((inv) => (
              <div key={inv.title} className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-5">{inv.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{inv.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{inv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESLA POWERWALL ═══════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Tesla Powerwall 3 — <span className="text-[#2BABE2]">Your Energy Shield</span>
              </h2>
              <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                <p>Under NEM 3.0, batteries are essential. You need to use your own solar power during peak hours (4–9pm) instead of buying from SCE at up to <strong>$0.58/kWh</strong>.</p>
                <p>Each Powerwall 3 stores <strong>13.5 kWh</strong> with a built-in inverter. One battery handles lights, plugs, and essentials through peak. Running AC and heavy appliances? You'll want two.</p>
                <p><strong>Our goal:</strong> Zero grid power from 4pm to 9pm, every single day. That's how we eliminate your bill.</p>
              </div>
              <Link href="/tesla-powerwall" className="btn-green mt-8 inline-block">LEARN MORE ABOUT POWERWALL →</Link>
            </div>
            <div className="flex-1 max-w-md">
              <img
                src={POWERWALL_IMG}
                alt="Tesla Powerwall 3"
                className="w-full rounded-2xl shadow-lg"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = POWERWALL_FALLBACK_IMG;
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GREEN CTA ═══════════ */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ready to See What Solar Can Do for Your Home?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Every system is custom-designed based on your roof, your usage, and your goals. No pressure, no gimmicks — just honest recommendations.</p>
          <Link href="/get-quote" className="inline-block bg-white text-[#0B1D51] font-bold text-lg px-10 py-4 rounded-full hover:bg-gray-100 transition-colors no-underline shadow-xl">GET A FREE QUOTE</Link>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="howitworks" className="py-20 bg-[#0B1D51] scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              How Solar + Battery <span style={{ color: "#FED44D" }}>Gets It Done</span>
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Under NEM 3.0, the winning strategy is keeping your solar energy instead of giving it to Edison. A battery makes that possible.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-3">The Old Way</div>
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Send Energy to Edison, Get a Credit</h3>
              <p className="text-white/70 leading-relaxed">Under the old programs, your panels made energy during the day and you sent the extra to the grid. Edison gave you a full credit. That worked great. Under NEM 3.0, that credit is lower — so this approach alone doesn't go as far.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-[#FED44D]/30">
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#FED44D" }}>The Smart Way</div>
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Store Your Energy, Use It When It Counts</h3>
              <p className="text-white/70 leading-relaxed">With a battery, you keep your solar energy and use it between <strong className="text-white">4 PM and 9 PM</strong> — when Edison charges the most. You're not relying on credits from the grid. You're powering your home with your own stored energy for free. <strong className="text-white">That's how you take control of your bill.</strong></p>
            </div>
          </div>
          {/* ─── Interactive Solar Home Widget ─── */}
          <div className="mb-14">
            <HowItWorksAnimation />
            <div className="text-center mt-6">
              <Link href="/solar-demo"
                className="inline-flex items-center gap-2 text-[#FED44D] hover:text-white text-sm font-semibold no-underline transition-colors border border-[#FED44D]/40 hover:border-white/40 px-5 py-2.5 rounded-full">
                <span>☀️</span> See the Full Interactive House Demo
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {[
              { num: "1", icon: "☀️", title: "Panels Make Power", desc: "Your solar panels generate energy during the day while the sun is shining." },
              { num: "2", icon: "🔋", title: "Battery Stores It", desc: "Instead of sending extra power to Edison, your battery stores it for later." },
              { num: "3", icon: "⚡", title: "Discharge 4–9 PM", desc: "During peak hours your home runs on stored battery power, not the grid." },
              { num: "4", icon: "🏠", title: "Full Backup Power", desc: "If the grid goes down, your Powerwall keeps your entire home running." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black"
                  style={{ background: "#FED44D", color: "#0B1D51" }}>
                  {step.num}
                </div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h4 className="text-white font-bold text-sm mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{step.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ready to Take Control of Your Electric Bill?</h3>
            <p className="text-white/70 mb-8">We design every system to maximize your savings under NEM 3.0. Let us show you what's possible for your home.</p>
            <Link href="/get-quote"
              className="inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all"
              style={{ background: "#FED44D", color: "#0B1D51" }}>
              GET A FREE CONSULTATION
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE PELL ═══════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>Why Homeowners Choose Pell Solar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Star size={28} className="text-[#FED44D]" />, title: "Family-Owned", desc: "A local solar company serving Southern California and Idaho." },
              { icon: <Shield size={28} className="text-red-500" />, title: "Tesla Certified Installer", desc: "Certified and trained directly by Tesla to install solar panels, Powerwall batteries, and Wall Connectors." },
              { icon: <Users size={28} className="text-[#2BABE2]" />, title: "90% Referral Rate", desc: "Most of our customers come from word of mouth. That tells you everything about how we treat people." },
              { icon: <Wrench size={28} className="text-blue-500" />, title: "Our Own Crews", desc: "We don't outsource. Our licensed electricians and installers do every job. We pull permits and handle HOA." },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">{card.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EQUIPMENT PARTNERS ═══════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Trusted Equipment Partners</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {[
              { name: "TESLA", sub: "Certified Installer", color: "text-red-600" },
              { name: "Q CELLS", sub: "Made in USA", color: "text-gray-800" },
              { name: "Enphase", sub: "Microinverters", color: "text-orange-600" },
              { name: "IronRidge", sub: "Racking Systems", color: "text-blue-600" },
              { name: "Jinko", sub: "Solar Panels", color: "text-[#2BABE2]" },
              { name: "Hyundai", sub: "Solar Panels", color: "text-blue-800" },
            ].map((p) => (
              <div key={p.name} className="text-center">
                <div className={`text-lg font-black ${p.color}`}>{p.name}</div>
                <div className="text-gray-500 text-xs">{p.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">We prioritize domestic and tariff-free products to protect your investment.</p>
        </div>
      </section>



      <Footer />
    </div>
  );
}
