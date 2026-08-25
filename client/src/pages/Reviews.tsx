import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LiveReviewLinks } from "@/components/LiveReviewLinks";
import { Link } from "wouter";

const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";

export default function Reviews() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />
      <section className="relative py-28 md:py-36" style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center top" }}>
        <div className="absolute inset-0 bg-[#0B1D51]/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="inline-block bg-[#0B1D51]/70 border border-white/20 text-white/80 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6">PELL SOLAR — CUSTOMER FEEDBACK</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Read Current Customer <span className="text-[#FED44D]">Reviews</span></h1>
          <p className="text-white/80 text-lg leading-relaxed mb-10">For current, independently published customer feedback, visit Pell Solar’s Google and Yelp profiles directly.</p>
          <LiveReviewLinks tone="dark" />
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Independent Review Sources</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-10">Review scores and counts can change. We show the current Google summary when it is available and link directly to both platforms so you can read the latest feedback in context.</p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <a href="https://www.google.com/search?q=Pell+Solar+reviews" target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-gray-200 p-7 no-underline hover:shadow-md transition-shadow"><h3 className="font-extrabold text-xl text-[#0B1D51] mb-2">Google Reviews</h3><p className="text-gray-600">View the current rating, review count, and recent customer feedback on Google.</p></a>
            <a href="https://www.yelp.com/biz/pell-solar-ontario" target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-gray-200 p-7 no-underline hover:shadow-md transition-shadow"><h3 className="font-extrabold text-xl text-[#0B1D51] mb-2">Yelp Reviews</h3><p className="text-gray-600">Read current Yelp feedback directly on Yelp’s business profile.</p></a>
          </div>
          <div className="mt-12"><Link href="/get-quote" className="btn-green">GET YOUR FREE QUOTE</Link></div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
