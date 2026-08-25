import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SolarLease() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* HERO */}
      <section
        className="relative py-20 md:py-28 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/manus-storage/solar-home-main-v2_0ad97127.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#0B1D51]/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Your Home Deserves Solar Done<br />by People Who <span className="text-[#FED44D]">Actually Care</span>
          </h1>
          <p className="text-white/90 text-lg mb-6">
            We are not a national chain. We are a family business focused on helping homeowners evaluate solar and battery options for their properties.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-white/80 text-sm">
            <span>● Tesla Certified Installer</span>
            <span>● 90% Referral Rate</span>
            <span>● $0 Down Available</span>
          </div>
          <Link href="/get-quote">
            <span className="inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold py-4 px-10 rounded-full text-base uppercase tracking-wide cursor-pointer hover:bg-[#f5c800] transition-colors">
              Get Your Free Quote
            </span>
          </Link>
        </div>
      </section>

      {/* FEDERAL TAX CREDIT */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1D51] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            The Federal Tax Credit Didn't Disappear — It Just Moved
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            The 30% residential solar tax credit (25D) expired at the end of 2025. But through our lease program with LightReach by Palmetto, the tax credit still applies. Because the finance company owns the equipment and has safe-harbored all materials under the 48E commercial ITC, the savings are passed directly to you through a lower monthly rate.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            This means you still benefit from federal incentives — without filing anything on your taxes. It is built into the price of your lease.
          </p>
          <p className="text-gray-500 text-sm italic">
            Pell Solar does not provide tax advice. Consult your tax professional for your specific situation.
          </p>
        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="inline-block bg-[#2BABE2]/10 text-[#2BABE2] font-semibold px-4 py-1 rounded-full text-sm mb-4">Choose Your Plan</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Pell Solar Shield Packages
          </h2>
          <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            Four options designed to fit your home and your goals. Solar Shield packages include panels, Tesla Powerwall 3, Smart Meter, and a 25-year warranty. NEM 3.0 Shield packages deliver peak-hour protection without solar panels.
          </p>

          {/* Solar + Battery row */}
          <div className="mb-0">
            <div className="inline-block bg-[#0B1D51] text-white text-xs font-bold px-3 py-1 rounded-t-lg">Solar + Battery</div>
          </div>
          {/* 30% Tax Credit Callout */}
          <div className="bg-[#FED44D] rounded-b-xl rounded-tr-xl px-6 py-4 mb-6 flex items-center gap-4 shadow-md">
            <div className="shrink-0 w-10 h-10 rounded-full bg-[#0B1D51] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            </div>
            <div>
              <div className="font-extrabold text-[#0B1D51] text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>30% Federal Tax Credit Still Applies</div>
              <div className="text-[#0B1D51]/80 text-sm">Because LightReach owns the equipment, the 30% ITC is built into your monthly rate — you benefit automatically, no tax filing needed.</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Solar Shield */}
            <div className="bg-white rounded-2xl border-2 border-[#2BABE2] shadow-lg p-8">
              <div className="inline-block bg-[#2BABE2]/10 text-[#2BABE2] text-xs font-bold px-3 py-1 rounded-full mb-4">Solar Shield</div>
              <h3 className="text-2xl font-extrabold text-[#0B1D51] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Solar Shield</h3>
              <p className="text-gray-500 mb-6">For homes with SCE bills around $320/mo</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-[#2BABE2]">$234</span>
                <span className="text-gray-500"> per month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "16 Solar Panels",
                  "1 Tesla Powerwall 3 (13.5 kWh)",
                  "1 Tesla Smart Meter",
                  "Peak-hour grid protection (4–9pm)",
                  "25-Year Full System Warranty",
                  "25-Year Battery Warranty",
                  "Professional Installation",
                  "Permitting and Inspections",
                  "24/7 Monitoring via Tesla App",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="text-[#2BABE2] font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-quote">
                <span className="block text-center bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors cursor-pointer">
                  Get Started
                </span>
              </Link>
              <p className="text-xs text-gray-400 mt-3 text-center">*Final system size and pricing based on site evaluation.</p>
            </div>

            {/* Solar Shield+ */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FED44D] text-[#0B1D51] text-xs font-extrabold px-4 py-1 rounded-full">Most Popular</div>
              <div className="inline-block bg-[#0B1D51]/10 text-[#0B1D51] text-xs font-bold px-3 py-1 rounded-full mb-4">Solar Shield+</div>
              <h3 className="text-2xl font-extrabold text-[#0B1D51] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Solar Shield+</h3>
              <p className="text-gray-500 mb-6">For homes with SCE bills around $580/mo</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-[#2BABE2]">$307</span>
                <span className="text-gray-500"> per month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "32 Solar Panels",
                  "1 Tesla Powerwall 3 (13.5 kWh)",
                  "1 Tesla Smart Meter",
                  "Peak-hour grid protection (4–9pm)",
                  "25-Year Full System Warranty",
                  "25-Year Battery Warranty",
                  "Professional Installation",
                  "Permitting and Inspections",
                  "24/7 Monitoring via Tesla App",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="text-[#2BABE2] font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-quote">
                <span className="block text-center bg-[#0B1D51] hover:bg-[#162d7a] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors cursor-pointer">
                  Get Started
                </span>
              </Link>
              <p className="text-xs text-gray-400 mt-3 text-center">*Final system size and pricing based on site evaluation.</p>
            </div>
          </div>

          {/* NEM 3.0 Shield row */}
          <div className="mb-4">
            <div className="inline-block bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-t-lg">NEM 3.0 Shield — Backup Power Only</div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* NEM 3.0 Shield */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
              <div className="inline-block bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full mb-4">NEM 3.0 Shield</div>
              <h3 className="text-2xl font-extrabold text-[#0B1D51] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>NEM 3.0 Shield</h3>
              <p className="text-gray-500 mb-6">1 Powerwall · avoid peak charges · 13.5 kWh</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-[#2BABE2]">$142</span>
                <span className="text-gray-500"> per month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "1 Tesla Powerwall 3 (13.5 kWh)",
                  "1 Tesla Smart Meter",
                  "Peak-hour grid protection (4–9pm)",
                  "25-Year Battery Warranty",
                  "Professional Installation",
                  "Permitting and Inspections",
                  "24/7 Monitoring via Tesla App",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="text-[#2BABE2] font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-quote">
                <span className="block text-center bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors cursor-pointer">
                  Get Started
                </span>
              </Link>
              <p className="text-xs text-gray-400 mt-3 text-center">*Final system size and pricing based on site evaluation.</p>
            </div>

            {/* NEM 3.0 Shield+ */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
              <div className="inline-block bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full mb-4">NEM 3.0 Shield+</div>
              <h3 className="text-2xl font-extrabold text-[#0B1D51] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>NEM 3.0 Shield+</h3>
              <p className="text-gray-500 mb-6">2 Powerwalls · extended coverage · 27 kWh</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-[#2BABE2]">$208</span>
                <span className="text-gray-500"> per month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "2 Tesla Powerwall 3 (27 kWh total)",
                  "1 Tesla Smart Meter",
                  "Peak-hour grid protection (4–9pm)",
                  "25-Year Battery Warranty",
                  "Professional Installation",
                  "Permitting and Inspections",
                  "24/7 Monitoring via Tesla App",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="text-[#2BABE2] font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-quote">
                <span className="block text-center bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors cursor-pointer">
                  Get Started
                </span>
              </Link>
              <p className="text-xs text-gray-400 mt-3 text-center">*Final system size and pricing based on site evaluation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GET A QUOTE CTA */}
      <section className="py-16 bg-[#2BABE2]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">Get Started</div>
          <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Get Your Free Custom Solar Quote
          </h2>
          <p className="text-white/90 text-lg mb-6">
            Answer a few quick questions and our team will build a custom solar lease package for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote">
              <span className="inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold py-4 px-10 rounded-full text-base uppercase tracking-wide cursor-pointer hover:bg-[#f5c800] transition-colors">
                No Cost • No Obligation
              </span>
            </Link>
            <a href="tel:8666468499" className="inline-block bg-white/20 text-white font-bold py-4 px-8 rounded-full text-base hover:bg-white/30 transition-colors">
              Or Call Us 24/7 — (866) 646-8499
            </a>
          </div>
        </div>
      </section>

      {/* EVERYTHING YOU NEED */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="inline-block bg-[#2BABE2]/10 text-[#2BABE2] font-semibold px-4 py-1 rounded-full text-sm">What You Get</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Everything You Need — Installed and Covered
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Every Pell Solar lease package includes premium equipment, professional installation, and a full 25-year warranty. Nothing is left out.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "☀️", title: "Solar Panels", desc: "High-efficiency panels sized to your home's energy usage and roof layout for maximum production." },
              { icon: "🔋", title: "Tesla Powerwall 3 Battery", desc: "13.5 kWh battery with integrated solar inverter for backup power and peak-hour bill savings." },
              { icon: "📊", title: "Tesla Smart Meter", desc: "Intelligent energy management that enables whole-home backup from a single Powerwall unit." },
              { icon: "📋", title: "Permitting and Inspections", desc: "We handle all permits, paperwork, utility coordination, and city inspections from start to finish." },
              { icon: "📱", title: "24/7 System Monitoring", desc: "Real-time monitoring through the Tesla app — solar production, battery levels, and home usage at your fingertips." },
              { icon: "🔧", title: "Maintenance for 25 Years", desc: "If anything breaks or underperforms, it is repaired or replaced at no cost to you for the life of the lease." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#0B1D51] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 25-YEAR WARRANTY */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="inline-block bg-green-100 text-green-700 font-semibold px-4 py-1 rounded-full text-sm">Zero Surprises</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            25 Years of Complete Protection
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Your lease covers everything for the full 25-year term. If anything goes wrong, we fix it — at no cost to you. No deductibles. No fine print surprises.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { years: "25", label: "Year", title: "System Warranty", desc: "Every component — panels, wiring, racking, inverter — is covered for the full life of the lease." },
              { years: "25", label: "Year", title: "Battery Warranty", desc: "Your Tesla Powerwall 3 is warranted for 25 years — that is 15 years beyond Tesla's standard warranty." },
              { years: "25", label: "Year", title: "Maintenance Included", desc: "Monitoring, repairs, and replacements are included at no extra cost for the entire lease term." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
                <div className="text-5xl font-extrabold text-[#2BABE2] leading-none">{item.years}</div>
                <div className="text-gray-500 text-sm mb-4">{item.label}</div>
                <h3 className="text-xl font-bold text-[#0B1D51] mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="inline-block bg-[#2BABE2]/10 text-[#2BABE2] font-semibold px-4 py-1 rounded-full text-sm">How It Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Four Simple Steps to Solar
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            From your first call to flipping the switch, we handle everything. Most systems are installed within a few weeks.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: 1, title: "Free Consultation", desc: "We review your utility bill, assess your roof, and recommend the right system size for your home." },
              { n: 2, title: "Custom System Design", desc: "Our team designs a system using Lidar-based measurements tailored to your roof and energy needs." },
              { n: 3, title: "Professional Installation", desc: "Pell Solar handles permitting, inspections, and installation for your project." },
              { n: 4, title: "Start Saving", desc: "Your system goes live and you begin saving immediately. Monitor everything from the Tesla app." },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#2BABE2] text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-4">{step.n}</div>
                <h3 className="text-lg font-bold text-[#0B1D51] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PELL SOLAR */}
      <section className="py-16 bg-[#0B1D51]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="inline-block bg-white/10 text-white font-semibold px-4 py-1 rounded-full text-sm">Why Families Choose Pell Solar</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white text-center mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            A Local Team, One Rooftop at a Time
          </h2>
          <p className="text-white/80 text-lg text-center mb-6">
            Pell Solar is a family-owned company serving Southern California and Idaho with solar and battery solutions designed for each home.
          </p>
          <p className="text-[#2BABE2] text-center font-semibold mb-6">
            Tesla Certified Installer — We are one of the select companies authorized by Tesla to install Powerwall systems.
          </p>
          <p className="text-white/70 text-center mb-8">
            No pressure, no gimmicks. We give you an honest assessment, a fair price, and a system that is built to last 25 years.
          </p>
          <div className="text-center">
            <Link href="/get-quote">
              <span className="inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold py-4 px-10 rounded-full text-base uppercase tracking-wide cursor-pointer hover:bg-[#f5c800] transition-colors">
                Get Your Free Quote
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block bg-red-100 text-red-700 font-semibold px-4 py-1 rounded-full text-sm mb-4">Limited Availability</div>
          <h2 className="text-3xl font-extrabold text-[#0B1D51] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Stop Overpaying for Electricity?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Explore solar and battery options with Pell Solar. As a Tesla Certified Installer, we support your project from design through ongoing support.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-[#0B1D51] font-semibold">
            <span>✓ $0 Down</span>
            <span>✓ 25-Year Warranty</span>
            <span>✓ Tesla Certified</span>
            <span>✓ Family-Owned Solar Company</span>
          </div>
          <Link href="/get-quote">
            <span className="inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold py-4 px-10 rounded-full text-base uppercase tracking-wide cursor-pointer hover:bg-[#f5c800] transition-colors">
              Get Your Free Quote
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
