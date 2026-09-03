import { Link } from "wouter";
import { Phone, CheckCircle, Battery, Zap, Shield, Sun, Home, Clock, ArrowRight, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG = "/manus-storage/battery-backup_9b911c85.jpg";
const POWERWALL_PRODUCT_IMG = "/manus-storage/powerwall3-solar-meter_c7511143.png?v=20260819";
const POWERWALL_FALLBACK_IMG = "/manus-storage/tesla-powerwall-house_f27a908c.jpeg?v=20260819";
const REAL_INSTALLATION_PHOTOS = [
  {
    src: "/manus-storage/powerwall-exterior-finished_5ef809f3.webp",
    alt: "Finished Tesla Powerwall installation on the exterior wall of a residence",
    label: "Finished exterior installation",
  },
  {
    src: "/manus-storage/powerwall-exterior-side_13ec911c.webp",
    alt: "Tesla Powerwall and electrical equipment installed along the side of a residence",
    label: "Exterior equipment installation",
  },
  {
    src: "/manus-storage/powerwall-garage-finished_f3ce548a.webp",
    alt: "Finished Tesla Powerwall installation in a residential garage",
    label: "Finished garage installation",
  },
  {
    src: "/manus-storage/powerwall-garage-detail_61b5ec4b.webp",
    alt: "Tesla Powerwall residential garage installation detail",
    label: "Garage installation detail",
  },
  {
    src: "/manus-storage/powerwall-garage-dual_f641f620.webp",
    alt: "Two Tesla Powerwall units installed in a residential garage",
    label: "Dual battery garage installation",
  },
];

export default function TeslaPowerwall() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative py-28 md:py-36" style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-[#0B1D51]/45" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#FED44D] font-bold text-sm tracking-widest uppercase mb-4">TESLA CERTIFIED INSTALLER</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Tesla Powerwall 3
          </h1>
          <p className="text-xl font-semibold mb-3" style={{ color: "#FED44D" }}>
            Whole-Home Backup Power &mdash; Bill Savings &mdash; Tesla Certified Installation by Pell Solar
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-10">
            A compact home battery with an integrated solar inverter that delivers seamless backup protection, energy savings, and peace of mind &mdash; installed by a company you can trust.
          </p>
          <Link href="/get-quote"
            className="inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all"
            style={{ background: "#FED44D", color: "#0B1D51" }}>
            GET A FREE CONSULTATION
          </Link>
        </div>
      </section>

      {/* ═══════════ WHAT IS TESLA POWERWALL 3 ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                What is Tesla Powerwall 3?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Tesla Powerwall 3 is a next-generation home battery system with a{" "}
                <a href="https://www.tesla.com/powerwall" target="_blank" rel="noopener noreferrer" className="text-[#2BABE2] font-semibold hover:underline">fully integrated solar inverter</a>.
                {" "}It stores solar energy produced during the day and powers your home when you need it most — during peak rate hours, grid outages, or at night.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unlike previous models,{" "}
                <a href="https://www.tesla.com/powerwall" target="_blank" rel="noopener noreferrer" className="text-[#2BABE2] font-semibold hover:underline">a single Powerwall 3 unit can back up your entire home</a>{" "}
                thanks to the new Tesla Smart Meter, which intelligently manages your home's electrical panel for whole-home backup protection.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Powerwall 3 is designed for simple installation, maximum efficiency, and long-term durability — even in extreme weather conditions.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <span className="text-[#2BABE2] font-semibold">Already have solar?</span> Powerwall 3 can be tied into any existing solar system for battery backup and peak-hour savings. Planning a new system? Its integrated inverter works seamlessly with new solar installations — giving you one streamlined, efficient setup.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <span className="text-[#2BABE2] font-semibold">Monitor everything from your phone.</span> The Tesla app gives you real-time visibility into your solar production, battery storage, home energy usage, and grid status — all from the palm of your hand.
              </p>
            </div>
            {/* Right: product image + YouTube video */}
            <div className="space-y-6">
              <img
                src={POWERWALL_PRODUCT_IMG}
                alt="Tesla Powerwall 3 with Smart Meter"
                className="w-full rounded-2xl shadow-lg"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = POWERWALL_FALLBACK_IMG;
                }}
              />
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/yzb6ols_ffE"
                  title="Tesla Powerwall 3 | Whole-Home Backup Battery (Pell Solar)"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ REAL PELL SOLAR INSTALLATIONS ═══════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[#2BABE2] font-bold text-sm tracking-widest uppercase mb-4">Authentic Pell Solar work</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Real Tesla Powerwall Installations
            </h2>
            <p className="text-gray-600 leading-relaxed">
              A look at completed residential battery installations by the Pell Solar team, from clean exterior equipment layouts to finished garage systems.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REAL_INSTALLATION_PHOTOS.map((photo, index) => (
              <figure
                key={photo.src}
                className={`group overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-200 ${index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}
                  loading="lazy"
                />
                <figcaption className="px-4 py-3 text-sm font-semibold text-gray-700">{photo.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ KEY FEATURES ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Why <span className="text-[#2BABE2]">Tesla Powerwall 3</span>?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Home, title: "Whole-Home Backup", desc: "A single Powerwall 3 can back up your entire home — lights, fridge, AC, Wi-Fi, garage door, and EV charger. Automatic switchover in milliseconds." },
              { icon: Zap, title: "Built-In Solar Inverter", desc: "The Powerwall 3 includes an integrated solar inverter, eliminating the need for a separate string inverter. Simpler installation, fewer components, lower cost." },
              { icon: Battery, title: "13.5 kWh Storage", desc: "Each Powerwall 3 stores 13.5 kWh of usable energy. Stack up to 4 units for 54 kWh of total storage — enough to power most homes for 24+ hours." },
              { icon: Sun, title: "Peak Hour Savings", desc: "Store solar energy during the day and discharge during expensive peak hours (4–9 PM). Essential for maximizing savings under NEM 3.0 and time-of-use rates." },
              { icon: Shield, title: "Storm Watch", desc: "When the National Weather Service issues a severe weather alert, Powerwall automatically charges to 100% from the grid to prepare for potential outages." },
              { icon: Clock, title: "25-Year Warranty", desc: "Tesla backs the Powerwall 3 with a 25-year warranty — one of the longest in the industry. That's decades of reliable backup protection." },
            ].map(card => (
              <div key={card.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#2BABE2/15] flex items-center justify-center mb-4">
                  <card.icon size={24} className="text-[#2BABE2]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SPECS TABLE ═══════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Technical Specifications
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <tbody>
                {[
                  ["Energy Capacity", "13.5 kWh usable per unit"],
                  ["Continuous Power", "11.5 kW (on-grid and off-grid)"],
                  ["Peak Power (Off-Grid)", "Up to 185 amps"],
                  ["Integrated Inverter", "Yes — no separate inverter needed"],
                  ["Stackable", "Up to 4 units (54 kWh total)"],
                  ["Dimensions", "43.25\" × 24\" × 7.6\""],
                  ["Weight", "287 lbs"],
                  ["Operating Temperature", "-4°F to 122°F"],
                  ["Mounting", "Floor or wall mount, indoor or outdoor"],
                  ["Connectivity", "Wi-Fi, Ethernet, cellular backup"],
                  ["Monitoring", "Tesla app — real-time energy flow"],
                  ["Warranty", "25 years"],
                ].map(([label, value], i) => (
                  <tr key={label} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-sm w-1/3">{label}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════ PRICING ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              NEM 3.0 Shield — Battery-Only Lease
            </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Already have solar? Add a Tesla Powerwall 3 with $0 down. Avoid peak-hour charges from 4–9 PM and get 25-year battery warranty coverage.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>NEM 3.0 Shield</h3>
              <p className="text-gray-500 text-sm mb-4">1 Powerwall · avoid peak charges · 13.5 kWh</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-[#2BABE2]">$142</span>
                <span className="text-gray-500 text-lg">/mo</span>
              </div>
              <ul className="text-left space-y-2 mb-8">
                {["1 Tesla Powerwall 3 (13.5 kWh)", "1 Tesla Smart Meter", "Peak-hour grid protection (4–9pm)", "25-Year Battery Warranty", "Professional Installation", "Permitting and Inspections", "24/7 Monitoring via Tesla App"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-[#2BABE2] mt-0.5 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-quote" className="w-full block text-center font-bold py-3 rounded-full no-underline transition-all" style={{ background: "#2BABE2", color: "white" }}>Get Started</Link>
            </div>
            <div className="bg-white rounded-2xl border-2 border-[#2BABE2] p-8 text-center hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2BABE2] text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">Best Value</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>NEM 3.0 Shield+</h3>
              <p className="text-gray-500 text-sm mb-4">2 Powerwalls · extended coverage · 27 kWh</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-[#2BABE2]">$208</span>
                <span className="text-gray-500 text-lg">/mo</span>
              </div>
              <ul className="text-left space-y-2 mb-8">
                {["2 Tesla Powerwall 3 (27 kWh total)", "1 Tesla Smart Meter", "Peak-hour grid protection (4–9pm)", "25-Year Battery Warranty", "Professional Installation", "Permitting and Inspections", "24/7 Monitoring via Tesla App"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-[#2BABE2] mt-0.5 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-quote" className="w-full block text-center font-bold py-3 rounded-full no-underline transition-all" style={{ background: "#2BABE2", color: "white" }}>Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW POWERWALL WORKS ═══════════ */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              How Powerwall Works With Solar
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { time: "Daytime", icon: Sun, desc: "Solar panels generate electricity. Powerwall charges first, then your home uses the rest. Any surplus goes to the grid.", color: "text-yellow-400" },
              { time: "Peak Hours (4–9 PM)", icon: Battery, desc: "Powerwall discharges stored energy to power your home during the most expensive rate period. You avoid paying Edison's peak prices.", color: "text-[#2BABE2]" },
              { time: "Outage", icon: AlertCircle, desc: "Grid goes down? Powerwall instantly takes over. Your lights stay on, your fridge keeps running, and your Wi-Fi stays connected.", color: "text-red-400" },
            ].map(card => (
              <div key={card.time} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10">
                <card.icon size={36} className={`${card.color} mx-auto mb-4`} />
                <h3 className="text-lg font-bold text-white mb-2">{card.time}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Can I add a Powerwall to my existing solar system?", a: "Yes. We install Powerwalls on both new and existing solar systems. If your system uses string inverters, the Powerwall 3's built-in inverter can replace it." },
              { q: "How long can a Powerwall power my home?", a: "A single Powerwall 3 (13.5 kWh) can power most homes for 8–12 hours depending on usage. Two Powerwalls can last 24+ hours. With solar recharging during the day, you can potentially stay off-grid indefinitely." },
              { q: "Does the Powerwall work during a power outage?", a: "Yes — that's one of its primary functions. When the grid goes down, Powerwall automatically disconnects from the grid and powers your home within milliseconds." },
              { q: "What's the warranty?", a: "Tesla offers a 25-year warranty on the Powerwall 3, covering both the battery and the integrated inverter." },
              { q: "Can I monitor my Powerwall remotely?", a: "Yes. The Tesla app shows real-time energy flow — solar production, battery charge level, home consumption, and grid import/export. You can also control backup reserve levels and Storm Watch settings." },
            ].map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200">
                <summary className="cursor-pointer px-6 py-4 font-semibold text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Add a Tesla Powerwall?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Free consultation. We'll assess your home, design the right battery setup, and show you exactly how much you'll save.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-quote" className="btn-gold text-lg px-10 py-4">Get Your Free Quote</Link>
            <a href="tel:8666468499" className="text-white font-bold text-lg flex items-center gap-2 no-underline hover:text-[#FED44D] transition-colors">
              <Phone size={18} className="text-[#FED44D]" /> (866) 646-8499
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
