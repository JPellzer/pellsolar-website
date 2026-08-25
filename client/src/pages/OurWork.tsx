import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

type Category = "all" | "solar" | "battery" | "ev-charging" | "roofing" | "other";

const FILTERS: { key: Category; label: string }[] = [
  { key: "all",         label: "All Projects" },
  { key: "solar",       label: "Solar Panels" },
  { key: "battery",     label: "Battery + Solar" },
  { key: "ev-charging", label: "EV Charging" },
  { key: "roofing",     label: "Roofing" },
  { key: "other",       label: "Other" },
];

export default function OurWork() {
  const [active, setActive] = useState<Category>("all");

  const { data: photos = [], isLoading } = trpc.photos.list.useQuery(
    { category: active === "all" ? undefined : active },
    { staleTime: 60_000 }
  );

  const filtered = photos;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* HERO */}
      <section
        className="relative py-28 md:py-36"
        style={{ backgroundImage: `url(/manus-storage/installers-on-roof_392a0eff.png)`, backgroundSize: "cover", backgroundPosition: "center top" }}
      >
        <div className="absolute inset-0 bg-[#0B1D51]/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#FED44D] font-bold text-sm tracking-widest uppercase mb-4">OUR WORK • LICENSED CALIFORNIA CONTRACTOR</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Real Installations on <span style={{ color: "#FED44D" }}>Real Homes</span>
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-10">
            Every system you see here was custom-designed, permitted, and installed by our own licensed crews. No subcontractors. No shortcuts. Browse our completed projects across Southern California and Idaho.
          </p>
          <Link href="/get-quote" className="inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all hover:opacity-90" style={{ background: "#FED44D", color: "#0B1D51" }}>
            GET YOUR FREE QUOTE →
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "Solar",  label: "PANEL SYSTEMS" },
            { num: "Battery", label: "STORAGE OPTIONS" },
            { num: "EV",     label: "CHARGING" },
            { num: "#949122", label: "CA LICENSE" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-extrabold" style={{ color: "#2BABE2", fontFamily: "'Montserrat', sans-serif" }}>{s.num}</div>
              <div className="text-xs font-bold tracking-widest text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="pt-10 pb-4 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap gap-3 justify-center">
          {FILTERS.filter(f => f.key === "all" || photos.some(p => p.category === f.key) || active === f.key).map(f => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className="px-5 py-2 rounded-full text-sm font-bold transition-all border cursor-pointer"
              style={active === f.key
                ? { background: "#2BABE2", color: "#fff", borderColor: "#2BABE2" }
                : { background: "white", color: "#0B1D51", borderColor: "#d1d5db" }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* PHOTO GALLERY — masonry grid */}
      <section className="pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          {isLoading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="break-inside-avoid rounded-xl bg-gray-100 animate-pulse" style={{ height: `${180 + (i % 3) * 60}px` }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-semibold">No photos in this category yet.</p>
              <p className="text-sm mt-2">Check back soon — we're always adding new projects.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((item) => (
                <div key={item.id} className="break-inside-avoid relative group overflow-hidden rounded-xl shadow-md">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ display: "block", minHeight: "180px" }}
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded mb-1" style={{ background: "#FED44D", color: "#0B1D51" }}>
                      {item.category === "ev-charging" ? "EV Charging" : item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    <p className="text-white text-sm font-semibold leading-tight">{item.title}</p>
                    {item.location && <p className="text-white/60 text-xs mt-0.5">📍 {item.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0B1D51] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Want Your Home to Look Like This?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Every project starts with a free consultation. We'll evaluate your roof, your usage, and design a system that eliminates your electric bill.
          </p>
          <Link href="/get-quote" className="inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all hover:opacity-90" style={{ background: "#FED44D", color: "#0B1D51" }}>
            GET YOUR FREE QUOTE
          </Link>
        </div>
      </section>

      {/* WHY PELL */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { title: "Family-Owned",   body: "A local solar company serving Southern California and Idaho." },
            { title: "Tesla Certified", body: "Factory-trained to install Powerwall, solar, and Wall Connectors." },
            { title: "Our Own Crews",  body: "Licensed electricians and installers on every job. We never outsource." },
            { title: "Personalized Service", body: "Straightforward guidance from consultation through installation and support." },
          ].map(c => (
            <div key={c.title}>
              <div className="font-extrabold text-lg mb-2" style={{ color: "#0B1D51", fontFamily: "'Montserrat', sans-serif" }}>{c.title}</div>
              <p className="text-gray-600 text-sm">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORE MORE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-extrabold text-center mb-10" style={{ color: "#0B1D51", fontFamily: "'Montserrat', sans-serif" }}>Explore More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: "/solar-panel-systems", title: "Solar Panel Systems",  body: "See how we design & build your system" },
              { href: "/tesla-powerwall",     title: "Tesla Powerwall 3",    body: "Whole-home backup & peak protection" },
              { href: "/financing",           title: "Financing Options",    body: "$0 down, flexible monthly payments" },
              { href: "/nem-3",               title: "NEM 3.0 Explained",    body: "Why batteries are essential now" },
              { href: "/reviews",             title: "Customer Reviews",     body: "Read current feedback on Google and Yelp" },
              { href: "/ev-charging",         title: "EV Charging",          body: "Tesla Wall Connector installation" },
            ].map(c => (
              <Link key={c.href} href={c.href} className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 no-underline hover:shadow-md transition-shadow">
                <div className="font-bold text-base mb-1" style={{ color: "#0B1D51" }}>{c.title}</div>
                <div className="text-gray-500 text-sm">{c.body}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-[#0B1D51] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Go Solar with People Who Care?
          </h2>
          <p className="text-white/70 mb-8">
            No pressure. No oversized systems. No outsourced crews. Just honest recommendations and professional installation you can rely on.
          </p>
          <Link href="/get-quote" className="inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all hover:opacity-90" style={{ background: "#FED44D", color: "#0B1D51" }}>
            GET YOUR FREE CONSULTATION
          </Link>
          <p className="text-white/40 text-xs mt-6">Contractor License #949122 • Serving Southern California & Idaho</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
