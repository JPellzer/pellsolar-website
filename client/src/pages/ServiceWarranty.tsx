import { Link } from "wouter";
import { Phone, CheckCircle, Shield, Clock, Wrench, FileText, ArrowRight, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";

export default function ServiceWarranty() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* HERO */}
      <section className="relative py-28 md:py-36" style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-[#0B1D51]/45" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Service & <span className="text-[#2BABE2]">Warranty</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Every Pell Solar installation comes with comprehensive warranty coverage. We stand behind our work for 25 years — because we plan to be here for 25 more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-quote" className="btn-green text-lg px-8 py-4">Get Your Free Quote</Link>
            <a href="tel:8666468499" className="text-white font-bold text-lg flex items-center gap-2 no-underline hover:text-[#FED44D] transition-colors">
              <Phone size={18} /> (866) 646-8499
            </a>
          </div>
        </div>
      </section>

      {/* WARRANTY COVERAGE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              What's <span className="text-[#2BABE2]">Covered</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "25-Year Panel Warranty", desc: "All panels we install come with a 25-year product warranty and a 25-year performance guarantee (minimum 80% output at year 25)." },
              { icon: Clock, title: "25-Year Inverter Warranty", desc: "Enphase microinverters include a 25-year warranty. SolarEdge and Tesla inverters carry 12–25 year coverage depending on model." },
              { icon: Wrench, title: "10-Year Workmanship", desc: "Our installation workmanship is warranted for 10 years. If anything related to our installation fails, we fix it at no cost." },
              { icon: Star, title: "25-Year Battery Warranty", desc: "Tesla Powerwall 3 comes with a 25-year warranty covering both the battery cells and the integrated inverter." },
              { icon: FileText, title: "Roof Penetration Warranty", desc: "Every roof penetration is flashed and sealed to manufacturer specifications. If a leak occurs due to our installation, we repair it — free." },
              { icon: CheckCircle, title: "Production Guarantee", desc: "Lease customers receive a 90% energy production guarantee. If your system underproduces, you're compensated for the difference." },
            ].map(card => (
              <div key={card.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <card.icon size={28} className="text-[#2BABE2] mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WARRANTY TABLE */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Warranty at a Glance</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0B1D51] text-white">
                  <th className="text-left p-4 font-bold">Component</th>
                  <th className="p-4 font-bold text-center">Warranty</th>
                  <th className="p-4 font-bold text-center">Coverage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Solar Panels", "25 years", "Product defects + performance (80% at yr 25)"],
                  ["Enphase Microinverters", "25 years", "Full replacement"],
                  ["Tesla Powerwall 3", "25 years", "Battery + integrated inverter"],
                  ["IronRidge Racking", "25 years", "Structural integrity"],
                  ["Installation Workmanship", "10 years", "Labor + materials"],
                  ["Roof Penetrations", "10 years", "Leak-free guarantee"],
                  ["Production (Lease)", "25 years", "90% output guarantee"],
                ].map(([component, warranty, coverage], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-4 font-semibold text-gray-900">{component}</td>
                    <td className="p-4 text-center text-[#2BABE2] font-bold">{warranty}</td>
                    <td className="p-4 text-center text-gray-600">{coverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SERVICE PROCESS */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Need Service?</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">If something isn't working right, here's how to get it fixed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Contact Us", desc: "Call (866) 646-8499 or fill out our service request form. Describe the issue — error codes, low production, physical damage, etc." },
              { step: "2", title: "Diagnosis", desc: "We review your monitoring data remotely first. If an on-site visit is needed, we schedule it within 1–2 business days." },
              { step: "3", title: "Resolution", desc: "Warranty repairs are completed at no cost. Out-of-warranty repairs receive a clear, upfront quote before any work begins." },
            ].map(s => (
              <div key={s.step} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10">
                <div className="w-12 h-12 rounded-full bg-[#FED44D] text-[#0B1D51] font-black text-xl flex items-center justify-center mx-auto mb-4">{s.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PELL SOLAR */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Why Our Warranty Matters</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            A warranty is only as good as the company behind it. Pell Solar is a family-owned company with a physical office and California contractor license #949122. When you need service, our team is available to help.
          </p>
          <Link href="/get-quote" className="btn-green text-lg px-10 py-4 inline-flex items-center gap-2">
            Get Your Free Quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Questions About Your Warranty?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">Call us anytime. We're happy to review your warranty coverage and answer any questions.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-quote" className="btn-gold text-lg px-10 py-4">Schedule a Service Call</Link>
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
