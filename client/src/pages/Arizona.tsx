import { Link } from "wouter";
import { Phone, Sun, Zap, Shield, CheckCircle, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";

const arizonaCities = [
  "Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler",
  "Gilbert", "Glendale", "Peoria", "Surprise", "Goodyear",
  "Avondale", "Buckeye", "Tucson", "Flagstaff", "Prescott",
];

const arizonaStats = [
  { value: "6.5–7.5", label: "Peak Sun Hours / Day", icon: Sun },
  { value: "299", label: "Sunny Days Per Year", icon: Sun },
  { value: "30%", label: "Federal Tax Credit", icon: Shield },
  { value: "$0", label: "Down Available", icon: Zap },
];

export default function Arizona() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative py-28 md:py-36" style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-[#0B1D51]/45" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="inline-block bg-[#2BABE2/10]0/20 border border-[#2BABE2]/30 rounded-full px-4 py-2 mb-6">
            <span className="text-[#2BABE2] font-semibold text-sm uppercase tracking-wide">Arizona Solar</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 max-w-3xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Solar Panels in <span className="text-[#2BABE2]">Arizona</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mb-8">
            Arizona is one of the sunniest states in the country and offers strong solar potential for homeowners evaluating their energy options.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/get-quote" className="btn-green text-lg px-8 py-4">Get Your Free Quote</Link>
            <a href="tel:8666468499" className="text-white font-bold text-lg flex items-center gap-2 no-underline hover:text-[#FED44D] transition-colors">
              <Phone size={18} /> (866) 646-8499
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="py-12 bg-[#0B1D51]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {arizonaStats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon size={28} className="text-[#2BABE2] mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-black text-white mb-1">{s.value}</div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CITIES ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Cities We Serve in <span className="text-[#2BABE2]">Arizona</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pell Solar serves the Phoenix Metro Area, Tucson, and surrounding communities throughout Arizona.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {arizonaCities.map((city) => (
              <div key={city} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-center hover:border-green-400 hover:bg-[#2BABE2/10] transition-colors cursor-pointer">
                <MapPin size={14} className="text-[#2BABE2] mx-auto mb-1" />
                <span className="text-sm font-semibold text-gray-800">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHY AZ IS PERFECT ═══════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Why Arizona Is <span className="text-[#2BABE2]">Perfect</span> for Solar
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Arizona receives more sunlight than any other state — averaging 6.5–7.5 peak sun hours per day in the Phoenix area. That's 30–40% more solar production than the national average.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Combined with high APS and SRP electricity rates and Arizona's strong net metering policies, solar delivers exceptional returns for Arizona homeowners.
              </p>
              <ul className="space-y-3">
                {[
                  "6.5–7.5 peak sun hours per day — best in the US",
                  "APS and SRP rates rising 3–5% annually",
                  "30% federal tax credit available through 2032",
                  "Arizona property tax exemption for solar",
                  "Net metering available through APS and SRP",
                  "25-year system warranty — we stand behind our work",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle size={18} className="text-[#2BABE2] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0B1D51] rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-extrabold mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Arizona Solar Savings Example
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Typical APS Bill", value: "$280/mo", color: "text-red-400" },
                  { label: "System Size", value: "8.5 kW (20 panels)", color: "text-white" },
                  { label: "Battery Storage", value: "Tesla Powerwall 3", color: "text-white" },
                  { label: "Solar Lease Payment", value: "$234/mo", color: "text-[#2BABE2]" },
                  { label: "Estimated Monthly Savings", value: "$46/mo", color: "text-[#FED44D]" },
                  { label: "25-Year Total Savings", value: "$13,800+", color: "text-[#FED44D]" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">{row.label}</span>
                    <span className={`font-bold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-xs mt-4">* Example based on typical Phoenix-area home. Actual savings vary.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ AZ INCENTIVES ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Arizona Solar <span className="text-[#2BABE2]">Incentives</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "30% Federal Tax Credit", desc: "Deduct 30% of your total system cost from your federal taxes. Available through 2032.", icon: Shield, color: "text-blue-500", bg: "bg-blue-50" },
              { title: "Arizona Tax Credit", desc: "Arizona offers a 25% state income tax credit (up to $1,000) for residential solar installations.", icon: Sun, color: "text-orange-500", bg: "bg-orange-50" },
              { title: "Property Tax Exemption", desc: "Solar installations are excluded from Arizona property tax assessment — your home value increase doesn't raise your taxes.", icon: CheckCircle, color: "text-[#2BABE2]", bg: "bg-[#2BABE2/10]" },
              { title: "Sales Tax Exemption", desc: "Solar equipment is exempt from Arizona's 5.6% state sales tax, saving hundreds on your installation.", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-center">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon size={24} className={item.color} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PACKAGES ═══════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Arizona Solar <span className="text-[#2BABE2]">Packages</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">$0 down. Tax credit built in. Full maintenance included for 25 years.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Solar Shield",
                price: "$234/mo",
                desc: "For homes with APS bills around $280/mo",
                features: ["16 solar panels (6.8 kW)", "1 Tesla Powerwall 3 (13.5 kWh)", "Smart Meter included", "25-year full warranty", "90% production guarantee", "Full maintenance included", "$0 down — tax credit built in"],
                popular: false,
              },
              {
                name: "Solar Shield+",
                price: "$307/mo",
                desc: "For homes with APS bills around $500/mo",
                features: ["32 solar panels (13.6 kW)", "1 Tesla Powerwall 3 (13.5 kWh)", "Smart Meter included", "25-year full warranty", "90% production guarantee", "Full maintenance included", "$0 down — tax credit built in"],
                popular: true,
              },
            ].map((pkg) => (
              <div key={pkg.name} className={`rounded-3xl overflow-hidden border-2 ${pkg.popular ? "border-[#2BABE2] shadow-xl shadow-green-100" : "border-gray-200"}`}>
                {pkg.popular && (
                  <div className="bg-[#2BABE2/10]0 text-white text-center text-sm font-bold py-2">Most Popular</div>
                )}
                <div className="p-8 bg-white">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{pkg.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{pkg.desc}</p>
                  <div className="text-4xl font-black text-[#0B1D51] mb-6">{pkg.price}</div>
                  <ul className="space-y-2 mb-8">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                        <CheckCircle size={16} className="text-[#2BABE2] mt-0.5 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/get-quote" className={pkg.popular ? "btn-green w-full text-center block" : "btn-navy w-full text-center block"}>
                    Get This Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Go Solar in Arizona?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Free consultation. Custom system design. No pressure. Family-owned solar company.
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
