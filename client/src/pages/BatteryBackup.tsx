import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_BG = "/manus-storage/battery-backup-hero_65613e04.webp";
const TESLA_INSTALL_IMG = "/manus-storage/dual-powerwall3_c88ab182.png";

const YOUTUBE_VIDEO_ID = "yzb6ols_ffE";

export default function BatteryBackup() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* HERO */}
      <section className="relative py-28 md:py-36 flex items-center justify-center" style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-[#0B1D51]/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Home Battery Backup Systems
          </h1>
          <p className="text-[#FED44D] text-lg md:text-xl font-semibold mb-6">
            Whole-Home Backup Power — Bill Savings — Tesla Certified Installation by Pell Solar
          </p>
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-8">
            A compact home battery with an integrated solar inverter that delivers seamless backup protection, energy savings, and peace of mind — installed by a company you can trust.
          </p>
          <Link href="/get-quote">
            <span className="inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold py-4 px-10 rounded-full text-base uppercase tracking-wide cursor-pointer hover:bg-[#f5c800] transition-colors">
              Get a Free Consultation
            </span>
          </Link>
        </div>
      </section>

      {/* WHAT IS TESLA POWERWALL 3? */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* LEFT: real install photo + YouTube video */}
            <div className="space-y-6">
              <img src={TESLA_INSTALL_IMG} alt="Tesla Powerwall installation" className="rounded-xl shadow-lg w-full" />
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                  title="Tesla Powerwall 3 | Whole-Home Backup Battery (Pell Solar)"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
            {/* RIGHT: text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                What is Tesla Powerwall 3?
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                The Tesla Powerwall 3 is a next-generation home battery system with a fully integrated solar inverter. It stores solar energy produced during the day and powers your home when you need it most — during peak rate hours, grid outages, or at night.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Unlike previous models, a single Powerwall 3 unit can back up your entire home thanks to the new Tesla Smart Meter, which intelligently manages your home's electrical panel for whole-home backup protection.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Powerwall 3 is designed for simple installation, maximum efficiency, and long-term durability — even in extreme weather conditions.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Already have solar? Powerwall 3 can be tied into any existing solar system for battery backup and peak-hour savings. Planning a new system? Its integrated inverter works seamlessly with new solar installations — giving you one streamlined, efficient setup.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Monitor everything from your phone. The Tesla app gives you real-time visibility into your solar production, battery storage, home energy usage, and grid status — all from the palm of your hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW POWERWALL 3 SAVES YOU MONEY */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            How Powerwall 3 Saves You Money
          </h2>
          <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            If you are on Southern California Edison's NEM 3.0 rate plan, the most expensive electricity rates hit between{" "}
            <span className="text-[#2BABE2] font-semibold">4:00 PM and 9:00 PM</span>. Here is how Powerwall changes that:
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#e8f4fd] rounded-full">
                <span className="text-4xl">🔋</span>
              </div>
              <h3 className="text-xl font-bold text-[#0B1D51] mb-3">Charge During the Day</h3>
              <p className="text-gray-600 leading-relaxed">
                Your solar panels generate energy during daylight hours. Powerwall 3 stores that excess energy instead of sending it back to the grid at low credit rates.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#e8f4fd] rounded-full">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-[#0B1D51] mb-3">Discharge 4PM — 9PM</h3>
              <p className="text-gray-600 leading-relaxed">
                We program your Powerwall 3 to discharge between 4:00 PM and 9:00 PM — the peak rate window under NEM 3.0. Your home runs off stored battery power instead of expensive grid electricity.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#e8f4fd] rounded-full">
                <span className="text-4xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold text-[#0B1D51] mb-3">Whole-Home Backup</h3>
              <p className="text-gray-600 leading-relaxed">
                With the Tesla Smart Meter, your existing electrical panel becomes a whole-home backup system. When the grid goes down, Powerwall kicks in instantly — no delay, no interruption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BATTERY FINANCING OPTIONS */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Battery Financing Options
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Add Tesla Powerwall 3 battery storage to your home — with affordable monthly financing over a 12-year lease.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Plan 1 */}
            <div className="bg-white rounded-2xl border-2 border-[#2BABE2] shadow-lg p-8">
              <h3 className="text-2xl font-extrabold text-[#0B1D51] text-center mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                1 Tesla Powerwall 3
              </h3>
              <p className="text-center text-gray-500 mb-6">Battery Only (No Solar)</p>
              <div className="text-center mb-8">
                <span className="text-6xl font-extrabold text-[#2BABE2]">$142</span>
                <span className="text-gray-500 text-lg"> per month*</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "1 Tesla Powerwall 3 Battery",
                  "Tesla Smart Meter Included",
                  "12-Year Lease Term",
                  "12-Year Warranty (2 Years Beyond Tesla Standard)",
                  "Whole-Home Backup Protection",
                  "4PM–9PM Peak Discharge Programming",
                  "Professional Installation by Pell Solar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-[#2BABE2] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-quote">
                <span className="block text-center bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors cursor-pointer">
                  Get Started
                </span>
              </Link>
              <p className="text-xs text-gray-400 mt-4 text-center">
                *Based on battery located within 20 ft of main electrical panel. Final pricing based on site visit. Additional batteries can be added.
              </p>
            </div>

            {/* Plan 2 */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
              <h3 className="text-2xl font-extrabold text-[#0B1D51] text-center mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                2 Tesla Powerwall 3
              </h3>
              <p className="text-center text-gray-500 mb-6">Battery Only (No Solar)</p>
              <div className="text-center mb-8">
                <span className="text-6xl font-extrabold text-[#2BABE2]">$208</span>
                <span className="text-gray-500 text-lg"> per month*</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "2 Tesla Powerwall 3 Batteries",
                  "Tesla Smart Meter Included",
                  "12-Year Lease Term",
                  "12-Year Warranty (2 Years Beyond Tesla Standard)",
                  "Extended Whole-Home Backup",
                  "4PM–9PM Peak Discharge Programming",
                  "Professional Installation by Pell Solar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-[#2BABE2] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-quote">
                <span className="block text-center bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors cursor-pointer">
                  Get Started
                </span>
              </Link>
              <p className="text-xs text-gray-400 mt-4 text-center">
                *Based on batteries located within 20 ft of main electrical panel. Final pricing based on site visit. Additional batteries can be added.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE TESLA POWERWALL 3? */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-12" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Why Choose Tesla Powerwall 3?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⚙️", title: "Integrated Solar Inverter", desc: "Fully integrated design means fewer components, less wiring, higher efficiency, and a cleaner installation." },
              { icon: "🏠", title: "One Unit Powers One Home", desc: "A single Powerwall 3 has the storage capacity and efficiency to provide backup power for your entire home." },
              { icon: "🌡️", title: "Built for Extreme Weather", desc: "Engineered to perform at high elevations, in extreme temperatures, high humidity, and even up to 28 inches of standing water." },
              { icon: "📊", title: "Tesla Smart Meter", desc: "Converts your existing electrical panel into a whole-home backup system with intelligent energy monitoring and management." },
              { icon: "⚡", title: "Seamless Transition", desc: "When the grid goes down, Powerwall begins powering your home instantly — while other batteries experience a 2–5 second delay." },
              { icon: "➕", title: "Easy System Expansion", desc: "Start with one unit and easily stack up to 10 Powerwalls as your household energy needs grow over time." },
              { icon: "📱", title: "Tesla App Monitoring", desc: "Monitor your solar production, battery charge level, home energy usage, and grid status in real time — all from the Tesla app." },
              { icon: "☀️", title: "Works With Any Solar System", desc: "Powerwall 3 can be added to any existing solar installation or paired with new solar panels using its built-in integrated inverter." },
            ].map((feature) => (
              <div key={feature.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-[#0B1D51] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIRTUAL POWER PLANT */}
      <section className="py-16 md:py-20 bg-[#0B1D51]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Get Paid to Power the Grid with Tesla Powerwall
              </h2>
              <h3 className="text-xl font-semibold text-[#2BABE2] mb-8">How It Works</h3>
              <div className="space-y-6 mb-8">
                {[
                  { n: 1, title: "Install a Powerwall", desc: "Pell Solar can install it with your solar system or as a standalone battery." },
                  { n: 2, title: "Enroll in the Program", desc: "After installation, sign up directly in your Tesla app." },
                  { n: 3, title: "Share Energy Automatically", desc: "From May through October, your Powerwall will discharge excess power during times of high demand." },
                  { n: 4, title: "Get Rewarded", desc: "Earn up to $350 per year for every Powerwall enrolled." },
                ].map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2BABE2] text-white font-bold flex items-center justify-center shrink-0 text-lg">{step.n}</div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{step.title}</h4>
                      <p className="text-white/80">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white/10 rounded-xl p-6 mb-8">
                <h4 className="text-white font-semibold mb-3">Eligibility</h4>
                <ul className="text-white/80 space-y-2">
                  <li>• Must be a California resident in PG&amp;E, SCE, or SDG&amp;E service territory.</li>
                  <li>• Cannot be enrolled in a conflicting demand response program.</li>
                </ul>
                <p className="text-[#2BABE2] mt-4 font-medium italic">
                  Tip: Enroll before the start of a month to maximize your summer earnings.
                </p>
              </div>
              <Link href="/get-quote">
                <span className="inline-block bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors cursor-pointer">
                  Get A Quote
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="bg-white/10 rounded-2xl p-10 text-center border border-white/10">
                <div className="text-7xl mb-4">💰</div>
                <p className="text-white text-3xl font-extrabold mb-2">Up to $350/year</p>
                <p className="text-white/60 text-lg">per Powerwall enrolled</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* READY CTA */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Power Your Home with Powerwall?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            As a Tesla Certified Installer, Pell Solar supports your project from design and permitting through installation and activation.
          </p>
          <Link href="/get-quote">
            <span className="inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold py-4 px-10 rounded-full text-base uppercase tracking-wide cursor-pointer hover:bg-[#f5c800] transition-colors">
              Get Your Free Consultation
            </span>
          </Link>
        </div>
      </section>

      {/* SERVICE LOCATIONS */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-12" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Our Service Locations
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#0B1D51] mb-3">Upland, California</h3>
              <a href="tel:8666468499" className="text-[#2BABE2] text-xl font-semibold hover:underline">(866) 646-8499</a>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#0B1D51] mb-3">Eagle, Idaho</h3>
              <a href="tel:2085031416" className="text-[#2BABE2] text-xl font-semibold hover:underline">(208) 503-1416</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
