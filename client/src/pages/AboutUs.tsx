import { Link } from "wouter";
import { Phone, CheckCircle, MapPin, Users, Award, Shield, Clock, Heart, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LiveReviewLinks } from "@/components/LiveReviewLinks";

// pellsolar.com About page uses plain dark navy hero (no photo background)

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* HERO — matches pellsolar.com About page: dark navy, pill badge, heading, platform icons */}
      <section className="py-24 md:py-32" style={{ background: "linear-gradient(135deg, #0B1D51 0%, #0d2460 50%, #0B1D51 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block border border-[#FED44D]/60 text-[#FED44D] text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-8">
            FAMILY-OWNED SOLAR COMPANY
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Powering Homes with <span style={{ color: "#FED44D" }}>Solar &amp; Storage.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Pell Solar is a family-owned solar company serving Southern California and Idaho. We install solar panels, Tesla Powerwall batteries, Enphase systems, and electrical panels — and we stand behind every job we do.
          </p>
          <Link href="/get-quote" className="inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all hover:opacity-90 mb-12" style={{ background: "#FED44D", color: "#0B1D51" }}>
            GET YOUR FREE QUOTE
          </Link>
          <LiveReviewLinks tone="dark" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-12 bg-[#0B1D51]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "#949122", label: "CA License" },
            { value: "Solar", label: "Panel Systems" },
            { value: "Battery", label: "Storage Options" },
            { value: "2", label: "States Served" },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-black text-[#FED44D]">{stat.value}</div>
              <div className="text-white/70 text-sm font-semibold mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Our <span className="text-[#2BABE2]">Story</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
              <p>
                Pell Solar serves homeowners across Southern California and Idaho with solar, battery storage, electrical-panel, and EV-charging solutions tailored to each property.
              </p>
              <p>
                Our process starts with your home, energy use, and goals. We provide a clear consultation and a custom system recommendation before you decide whether to move forward.
              </p>
              <p>
                We are a family-owned company with a physical Upland office and California contractor license <strong className="text-gray-900">CSLB #949122</strong>. We aim to make every step—from consultation through installation—clear and well coordinated.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { year: "01", event: "Free consultation and energy-use review" },
                { year: "02", event: "Custom solar and battery system design" },
                { year: "03", event: "Permitting, installation, and activation support" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-14 text-right flex-shrink-0">
                    <span className="font-black text-[#2BABE2] text-base tabular-nums">{item.year}</span>
                  </div>
                  <div className="w-px h-8 bg-[#2BABE2]/30 flex-shrink-0" />
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <p className="text-gray-700 text-sm">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              What We <span className="text-[#2BABE2]">Stand For</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Licensed & Insured", desc: "California Contractor License #949122. Fully licensed in CA and ID. General liability and workers' comp insurance on every job." },
              { icon: Award, title: "Tesla Certified", desc: "We meet Tesla's strict standards for Powerwall installation quality, customer service, and technical expertise." },
              { icon: Users, title: "In-House Team", desc: "Our own licensed electricians and installers do every job. We never outsource to subcontractors." },
              { icon: Heart, title: "Honest Pricing", desc: "No hidden fees, no bait-and-switch. The price we quote is the price you pay. We'll tell you if solar doesn't make sense for your home." },
              { icon: Clock, title: "Fast Response", desc: "We answer the phone. If you need service, we respond within 1 business day. No call centers, no runaround." },
              { icon: CheckCircle, title: "Quality First", desc: "We use only tier-1 equipment with 25-year warranties. Every installation is done to the highest standard — because our name is on it." },
            ].map(card => (
              <div key={card.title} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <card.icon size={28} className="text-[#2BABE2] mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Our Offices
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={24} className="text-[#FED44D]" />
                <h3 className="text-xl font-bold text-white">California Office</h3>
              </div>
              <div className="space-y-2 text-white/80 text-sm">
                <p>1326 Monte Vista Ave #7</p>
                <p>Upland, CA 91786</p>
                <p className="pt-2"><strong className="text-white">Phone:</strong> <a href="tel:8666468499" className="text-[#FED44D] no-underline">(866) 646-8499</a> — Toll-Free</p>
                <p><strong className="text-white">Local:</strong> <a href="tel:7144553401" className="text-[#FED44D] no-underline">(714) 455-3401</a></p>
                <p className="pt-2"><strong className="text-white">Hours:</strong> Mon–Sat 8:00 AM – 5:00 PM</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={24} className="text-[#FED44D]" />
                <h3 className="text-xl font-bold text-white">Idaho Office</h3>
              </div>
              <div className="space-y-2 text-white/80 text-sm">
                <p>Serving the Boise Metro Area</p>
                <p>Meridian, ID</p>
                <p className="pt-2"><strong className="text-white">Phone:</strong> <a href="tel:2085031416" className="text-[#FED44D] no-underline">(208) 503-1416</a></p>
                <p className="pt-2"><strong className="text-white">Email:</strong> <a href="mailto:info@pellsolar.com" className="text-[#FED44D] no-underline">info@pellsolar.com</a></p>
                <p className="pt-2"><strong className="text-white">Hours:</strong> Mon–Sat 8:00 AM – 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Work With a Company That Cares?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Free consultation. No pressure. No obligation. Just honest advice from a family-owned solar company.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-quote" className="btn-green text-lg px-10 py-4 inline-flex items-center gap-2">
              Get Your Free Quote <ArrowRight size={18} />
            </Link>
            <a href="tel:8666468499" className="text-[#0B1D51] font-bold text-lg flex items-center gap-2 no-underline hover:text-[#2BABE2] transition-colors">
              <Phone size={18} /> (866) 646-8499
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
