import { Link } from "wouter";
import { Phone, Clock, MapPin, Mail, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";

export default function ScheduleCall() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* HERO */}
      <section className="relative py-28 md:py-36" style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-[#0B1D51]/45" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#FED44D] font-bold text-sm tracking-widest uppercase mb-4">TALK TO A SOLAR EXPERT</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Schedule a <span className="text-[#2BABE2]">Call</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Talk directly to a Pell Solar specialist. No call centers, no runaround — just honest answers to your solar questions from a family-owned company.
          </p>
        </div>
      </section>

      {/* CALL OPTIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Call Us <span className="text-[#2BABE2]">Anytime</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Our team is available Monday through Saturday. You can also call our toll-free number 24/7.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
            <a href="tel:8666468499" className="bg-[#2BABE2] text-white rounded-2xl p-6 text-center hover:bg-[#1e96cc] transition-colors no-underline group">
              <Phone size={28} className="mx-auto mb-3" />
              <div className="text-2xl font-black mb-1">(866) 646-8499</div>
              <div className="text-green-200 text-sm font-semibold">Toll-Free — 24/7</div>
            </a>
            <a href="tel:7148804416" className="bg-[#0B1D51] text-white rounded-2xl p-6 text-center hover:bg-[#0f2766] transition-colors no-underline">
              <MapPin size={28} className="mx-auto mb-3 text-[#FED44D]" />
              <div className="text-2xl font-black mb-1">(714) 880-4416</div>
              <div className="text-white/60 text-sm font-semibold">California Office</div>
            </a>
            <a href="tel:2085031416" className="bg-[#0B1D51] text-white rounded-2xl p-6 text-center hover:bg-[#0f2766] transition-colors no-underline">
              <MapPin size={28} className="mx-auto mb-3 text-[#FED44D]" />
              <div className="text-2xl font-black mb-1">(208) 503-1416</div>
              <div className="text-white/60 text-sm font-semibold">Idaho Office</div>
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a href="mailto:info@pellsolar.com" className="flex items-center gap-4 bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow no-underline">
              <Mail size={28} className="text-[#2BABE2] flex-shrink-0" />
              <div>
                <div className="font-bold text-gray-900 text-lg">Email Us</div>
                <div className="text-[#2BABE2]">info@pellsolar.com</div>
              </div>
            </a>
            <Link href="/get-quote" className="flex items-center gap-4 bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow no-underline">
              <ArrowRight size={28} className="text-[#2BABE2] flex-shrink-0" />
              <div>
                <div className="font-bold text-gray-900 text-lg">Get a Quote Online</div>
                <div className="text-gray-500">We respond within 1 business day</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              What to <span className="text-[#2BABE2]">Expect</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Quick Chat", desc: "Tell us about your home, your electric bill, and what you're looking for. Takes about 5 minutes." },
              { step: "2", title: "Custom Design", desc: "We'll design a system sized specifically for your home and energy usage. No cookie-cutter solutions." },
              { step: "3", title: "Clear Pricing", desc: "You'll get a detailed proposal with exact pricing — no hidden fees, no surprises, no pressure." },
              { step: "4", title: "Your Decision", desc: "Take your time. We don't use high-pressure sales tactics. If solar doesn't make sense, we'll tell you." },
            ].map(card => (
              <div key={card.step} className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#2BABE2] text-white font-black text-lg flex items-center justify-center mx-auto mb-4">{card.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Office Hours</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">California Office</h3>
              <div className="space-y-2 text-white/80 text-sm">
                <p>1326 Monte Vista Ave #7, Upland, CA 91786</p>
                <div className="flex items-center gap-2 pt-2">
                  <Clock size={14} className="text-[#FED44D]" />
                  <span>Mon–Sat: 8:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Idaho Office</h3>
              <div className="space-y-2 text-white/80 text-sm">
                <p>Serving the Boise Metro Area, Meridian, ID</p>
                <div className="flex items-center gap-2 pt-2">
                  <Clock size={14} className="text-[#FED44D]" />
                  <span>Mon–Sat: 8:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Free consultation. No pressure. No obligation. Family-owned solar company.
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
