import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_BG = "/manus-storage/ev-charger-garage-hero_66105331.jpg";
const SOLAR_PAIR_BG = "/manus-storage/ev-charge-sleep_f7448f5b.jpg";

const BENEFIT_PHOTOS = [
  { img: "/manus-storage/ev-faster-charging_b8528895.jpg", title: "Up to 7x Faster Charging", desc: "A Level 2 charger delivers 25–40 miles of range per hour — a full charge overnight instead of over the weekend." },
  { img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663592920644/UzNUyTd222pkxN2KfqQwdX/ev-charge-sleep-eh6DiDw5o3E4cJEV6Wp7cH.webp", title: "Charge While You Sleep", desc: "Plug in when you get home, wake up fully charged. No trips to public charging stations, no waiting around." },
  { img: "/manus-storage/ev-solar-pairing_ae3c4f3e.jpg", title: "Pair with Solar and Save", desc: "Charge your EV with energy from your solar panels and cut your fuel costs to nearly zero." },
];

const HOW_IT_WORKS = [
  { num: 1, icon: "📞", bg: "#0B1D51", title: "Contact Us", desc: "Fill out the form below or give us a call. Tell us what charger you have or want and we will take it from there." },
  { num: 2, icon: "📋", bg: "#1a3a6b", title: "Site Evaluation", desc: "We assess your electrical panel, garage layout, and wiring to determine the best installation plan and provide a quote." },
  { num: 3, icon: "🔧", bg: "#2BABE2", title: "Professional Install", desc: "Our licensed electricians handle everything — wiring, mounting, panel upgrades if needed — done right, done to code." },
  { num: 4, icon: "⚡", bg: "#FED44D", title: "Start Charging", desc: "Plug in and go. We test everything before we leave and walk you through how your new charger works." },
];

export default function EVCharging() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* HERO */}
      <section className="relative py-28 md:py-36" style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-[#0B1D51]/45" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#2BABE2] font-semibold text-sm uppercase tracking-wider mb-3">PELL SOLAR — EV CHARGER INSTALLATION</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            We Install <span style={{color:'#FED44D'}}>Any EV Charger</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Tesla, ChargePoint, Emporia, Wallbox — you name it, we install it. Pell Solar handles everything from site evaluation to professional installation so you can charge at home with confidence.
          </p>
          <Link href="/get-quote">
            <span className="inline-block bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors cursor-pointer">
              GET A FREE SITE EVALUATION
            </span>
          </Link>
        </div>
      </section>

      {/* WHY INSTALL A HOME EV CHARGER? — 3 cards with images */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Why Install a Home EV Charger?
          </h2>
          <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12">
            Skip the public charging stations. Charge overnight in your own garage and wake up to a full battery every morning.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {BENEFIT_PHOTOS.map(card => (
              <div key={card.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={card.img} alt={card.title} className="w-full h-52 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B1D51] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS WE INSTALL */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Brands We Install
          </h2>
          <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12">
            We are brand-neutral. Whatever charger you want, we will install it professionally and to code.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Tesla Wall Connector", "ChargePoint Home Flex", "Emporia", "Wallbox Pulsar Plus",
              "Grizzl-E", "EVIQO", "Enphase (ClipperCreek)", "Electrify Home",
              "Lectron", "Blink", "JuiceBox (Enel X)", "Siemens",
              "Leviton", "Eaton", "+ Any Other Brand"
            ].map(brand => (
              <span key={brand} className="bg-white border border-gray-200 rounded-lg px-5 py-3 text-[#0B1D51] font-semibold text-sm shadow-sm">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* LEVEL 1 vs LEVEL 2 CHARGING */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Level 1 vs Level 2 Charging
          </h2>
          <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12">
            Most EV owners upgrade to Level 2 for the speed and convenience. Here is the difference.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-[#0B1D51] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>LEVEL 1</h3>
              <p className="text-gray-500 font-medium mb-1">Standard Outlet</p>
              <p className="text-2xl font-extrabold text-gray-900 mb-6">3–5 mi/hr</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-[#2BABE2] mt-0.5">✓</span> Uses a standard 120V household outlet</li>
                <li className="flex items-start gap-2"><span className="text-[#2BABE2] mt-0.5">✓</span> No installation required</li>
                <li className="flex items-start gap-2"><span className="text-[#2BABE2] mt-0.5">✓</span> Best for plug-in hybrids or low daily mileage</li>
                <li className="flex items-start gap-2"><span className="text-[#2BABE2] mt-0.5">✓</span> Full charge can take 2–3 days</li>
              </ul>
            </div>
            <div className="bg-[#0B1D51] rounded-xl p-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>LEVEL 2</h3>
                <span className="bg-[#2BABE2] text-white text-xs font-bold px-2 py-1 rounded">RECOMMENDED</span>
              </div>
              <p className="text-white/70 font-medium mb-1">Dedicated 240V Circuit</p>
              <p className="text-2xl font-extrabold mb-6">25–40 mi/hr</p>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-2"><span className="text-[#2BABE2] mt-0.5">✓</span> Uses a 240V circuit (like a dryer outlet)</li>
                <li className="flex items-start gap-2"><span className="text-[#2BABE2] mt-0.5">✓</span> Professional installation required</li>
                <li className="flex items-start gap-2"><span className="text-[#2BABE2] mt-0.5">✓</span> Full charge overnight (6–10 hours)</li>
                <li className="flex items-start gap-2"><span className="text-[#2BABE2] mt-0.5">✓</span> Smart features: scheduling, energy monitoring</li>
                <li className="flex items-start gap-2"><span className="text-[#2BABE2] mt-0.5">✓</span> Works with all EV brands</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 4 steps */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            How It Works
          </h2>
          <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12">
            From first call to first charge — we handle everything.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map(step => (
              <div key={step.num} className="text-center">
                <div className="relative mb-4">
                  <div className="w-full h-40 rounded-xl flex items-center justify-center" style={{ background: step.bg }}>
                    <span style={{ fontSize: '4rem' }}>{step.icon}</span>
                  </div>
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-[#2BABE2] text-white font-bold flex items-center justify-center text-base">{step.num}</div>
                </div>
                <h3 className="text-lg font-bold text-[#0B1D51] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALREADY HAVE SOLAR? CHARGE FOR FREE */}
      <section className="relative py-20 md:py-28" style={{ backgroundImage: `linear-gradient(rgba(26,26,46,0.3), rgba(26,26,46,0.4)), url(${SOLAR_PAIR_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Already Have Solar? Charge for Free.
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-4">
            When you pair a home EV charger with your solar panel system, the sun powers your car. No gas station, no electricity bill — just clean energy from your roof to your wheels.
          </p>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            If you do not have solar yet, ask us about bundling solar + EV charger installation for the best value.
          </p>
          <Link href="/get-quote">
            <span className="inline-block font-bold py-3 px-8 rounded-lg text-lg transition-colors cursor-pointer" style={{ background: "#FED44D", color: "#0B1D51" }}>
              Get a Free Quote
            </span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#0B1D51]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Let's Talk About Your EV Charger
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Whether you already have a charger picked out or need help choosing one, we will reach out to schedule your free site evaluation. No pressure, no jargon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote">
              <span className="inline-block bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors cursor-pointer">
                Get Your Free Quote
              </span>
            </Link>
            <a href="tel:8666468499" className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#0B1D51] font-bold py-4 px-10 rounded-lg text-lg transition-colors text-center no-underline">
              (866) 646-8499
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
