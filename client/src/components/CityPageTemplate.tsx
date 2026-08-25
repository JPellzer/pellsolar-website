import { Link } from "wouter";
import { Phone, Check, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LiveReviewLinks } from "@/components/LiveReviewLinks";

const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const SOLAR_PANELS_IMG = "/manus-storage/california-home_f656624c.jpg";

interface CityPageProps {
  city: string;
  state: string;
  county?: string;
  utility?: string;
  avgBill?: string;
  sunHours?: string;
  intro?: string;
  extra?: string;
}

export default function CityPageTemplate({
  city, state, county,
  utility = "Southern California Edison (SCE)",
  avgBill = "$200–$400",
  sunHours = "5.5–6.5",
  intro, extra,
}: CityPageProps) {
  const defaultIntro = `${city}, ${state} is an excellent place to consider solar. With abundant sunshine year-round, rising utility rates, and strong solar incentives, homeowners in ${city} are exploring solar and battery options. Pell Solar serves ${county ? county + " and " : ""}the surrounding region with tailored solar solutions.`;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center" style={{ backgroundImage: `linear-gradient(135deg, rgba(11,29,81,0.55), rgba(11,29,81,0.35)), url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="relative z-10 container mx-auto px-6 pt-24 pb-16">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={16} className="text-[#2BABE2]" />
            <span className="text-[#2BABE2] text-sm font-semibold">{county || state}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Solar Panels in <span className="text-[#2BABE2]">{city}, {state}</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-xl mb-8 leading-relaxed">{intro || defaultIntro}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/get-quote" className="btn-green">Get Free Quote — {city}</Link>
            <a href="tel:8666468499" className="btn-navy flex items-center gap-2">
              <Phone size={16} className="text-yellow-400" /> (866) 646-8499
            </a>
            <a href="tel:7144553401" className="btn-navy flex items-center gap-2 opacity-80">
              <Phone size={16} className="text-yellow-400" /> (714) 455-3401 CA
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0B1D51] py-6">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Avg Daily Sun Hours", value: sunHours, icon: "☀️" },
            { label: "Avg Monthly Bill", value: avgBill, icon: "💡" },
            { label: "Utility Provider", value: utility.split("(")[0].trim(), icon: "⚡" },
            { label: "Pell Solar", value: "Solar & Battery", icon: "🏆" },
          ].map(({ label, value, icon }) => (
            <div key={label}>
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-yellow-400 font-extrabold text-lg">{value}</div>
              <div className="text-gray-400 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Solar */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#2BABE2] font-bold text-xs tracking-widest uppercase mb-3">Why Solar in {city}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Why {city} Homeowners Are Going Solar
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                {extra || `${city} homeowners face some of the highest electricity rates in the country. Southern California Edison's tiered rate structure means the more you use, the more you pay per kilowatt-hour — often reaching $0.50–$0.58/kWh during peak hours.`}
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                With {sunHours} average daily sun hours, {city} is an ideal location for solar. A properly sized system paired with a Tesla Powerwall can eliminate your electric bill entirely — even under California's NEM 3.0 rules.
              </p>
              <div className="space-y-3">
                {[
                  `Average ${sunHours} peak sun hours per day`,
                  `${utility} service area — NEM 3.0 applies`,
                  "Federal solar tax credit available",
                  "California Property Tax Exclusion for solar",
                  "Rising utility rates make solar ROI stronger every year",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check size={16} className="text-[#2BABE2] flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src={SOLAR_PANELS_IMG} alt={`Solar panels in ${city}`} className="w-full rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Solar Packages for <span className="text-[#2BABE2]">{city}</span> Homes
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Solar Shield", price: "$234", desc: "For homes with ~$320/mo SCE bills. 16 panels + 1 Tesla Powerwall 3.", popular: false },
              { name: "Solar Shield+", price: "$307", desc: "For homes with ~$580/mo SCE bills. 32 panels + 1 Tesla Powerwall 3.", popular: true },
            ].map((pkg) => (
              <div key={pkg.name} className={`bg-white rounded-2xl p-8 ${pkg.popular ? "border-2 border-[#2BABE2] relative" : "border border-gray-200"}`}>
                {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">Most Popular</div>}
                <h3 className="text-2xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{pkg.name}</h3>
                <div className="mb-4"><span className="text-4xl font-black text-[#2BABE2]">{pkg.price}</span><span className="text-gray-500 text-lg">/mo</span></div>
                <p className="text-gray-600 text-sm mb-4">{pkg.desc}</p>
                <p className="text-gray-400 text-xs mb-6">$0 Down &middot; 25-Year Lease &middot; Tax Credit Included</p>
                <Link href="/get-quote" className={pkg.popular ? "btn-green w-full block text-center" : "btn-navy w-full block text-center"}>Get Started — $0 Down</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>Read Current Customer Feedback</h2>
          <p className="text-center text-gray-600 mb-8">Visit independent review platforms for current customer feedback about Pell Solar.</p>
          <LiveReviewLinks />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Go Solar in {city}?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Free consultation. Custom system design. $0 down. We serve {city} and all surrounding areas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote" className="btn-gold text-lg px-10 py-4">Get Free Quote</Link>
            <a href="tel:8666468499" className="flex items-center justify-center gap-2 bg-white/10 text-white rounded-xl px-6 py-4 font-bold text-lg hover:bg-white/20 transition-colors">
              <Phone size={18} className="text-yellow-400" /> (866) 646-8499
            </a>
            <a href="tel:7144553401" className="flex items-center justify-center gap-2 bg-white/10 text-white rounded-xl px-6 py-4 font-bold hover:bg-white/20 transition-colors">
              <Phone size={18} className="text-yellow-400" /> (714) 455-3401 CA
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">Serving {city}, {county || state} and surrounding areas. Contractor License #949122.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
