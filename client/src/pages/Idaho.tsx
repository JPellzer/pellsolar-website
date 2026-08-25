import { useState } from "react";
import { Link } from "wouter";
import { Phone, MapPin, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG = "/manus-storage/idaho-home_f4a8226d.jpg";

const ID_REGIONS = [
  {
    name: "Boise Metro",
    counties: ["Ada County"],
    cities: ["Boise", "Meridian", "Eagle", "Star", "Garden City", "Kuna"],
  },
  {
    name: "Treasure Valley West",
    counties: ["Canyon County"],
    cities: ["Nampa", "Caldwell", "Middleton", "Notus", "Parma"],
  },
];

const ID_ZIP_PREFIXES = ["836","837","838","839"];
const CA_ZIP_PREFIXES = ["900","901","902","903","904","905","906","907","908","909","910","911","912","913","914","915","916","917","918","919","920","921","922","923","924","925","926","927","928","930","931","932","933","934","935","936","937","938","939","940","941","942","943","944","945","946","947","948","949","950","951","952","953","954","955","956","957","958","959","960","961"];

function isServiceableZip(zip: string): "ca" | "id" | null {
  const prefix3 = zip.slice(0, 3);
  if (CA_ZIP_PREFIXES.includes(prefix3)) return "ca";
  if (ID_ZIP_PREFIXES.includes(prefix3)) return "id";
  return null;
}

export default function SolarPanelsinIdahoPage() {
  const [zip, setZip] = useState("");
  const [zipResult, setZipResult] = useState<"ca" | "id" | "no" | null>(null);

  const checkZip = () => {
    if (zip.length !== 5) return;
    const result = isServiceableZip(zip);
    setZipResult(result ?? "no");
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 flex items-center" style={{ backgroundImage: `linear-gradient(135deg, rgba(11,29,81,0.55), rgba(11,29,81,0.35)), url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="relative z-10 container mx-auto px-6 pt-12">
          <p className="text-[#2BABE2] font-bold text-xs tracking-widest uppercase mb-3">IDAHO SOLAR</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Solar Panels in Idaho
          </h1>
          <p className="text-lg text-gray-200 max-w-xl mb-8 leading-relaxed">Pell Solar serves the Treasure Valley — Boise, Meridian, Nampa, Eagle, Kuna, and surrounding areas. Idaho's net metering program makes solar an excellent investment.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/get-quote" className="inline-block bg-[#FED44D] text-[#0B1D51] font-bold px-8 py-3 rounded-lg no-underline hover:opacity-90 transition-opacity">Get Your Free Quote</Link>
            <a href="tel:2085031416" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors">
              <Phone size={16} className="text-yellow-400" /> (208) 503-1416
            </a>
          </div>
        </div>
      </section>

      {/* ZIP CODE CHECKER */}
      <section className="py-12 bg-[#0B1D51]">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Do We Serve Your Area?</h2>
          <p className="text-white/60 text-sm mb-5">Enter your zip code to find out instantly.</p>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={5}
              value={zip}
              onChange={e => { setZip(e.target.value.replace(/\D/g, "")); setZipResult(null); }}
              onKeyDown={e => e.key === "Enter" && checkZip()}
              placeholder="Enter zip code"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 font-semibold text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#FED44D]"
            />
            <button
              onClick={checkZip}
              className="bg-[#FED44D] text-[#0B1D51] font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Check
            </button>
          </div>
          {zipResult === "id" && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-400 font-semibold">
              <CheckCircle size={18} /> Great news — we serve your area in Idaho!
            </div>
          )}
          {zipResult === "ca" && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-400 font-semibold">
              <CheckCircle size={18} /> Great news — we also serve Southern California!
            </div>
          )}
          {zipResult === "no" && (
            <div className="mt-4 text-white/60 text-sm">
              We don't currently serve that zip code. Call us at <a href="tel:2085031416" className="text-[#FED44D] font-semibold">(208) 503-1416</a> to check if we can help.
            </div>
          )}
        </div>
      </section>

      {/* SERVICE REGIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Where We Install in the <span className="text-[#2BABE2]">Treasure Valley</span>
          </h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
            We cover the entire Boise metro area and Canyon County. If you're in the Treasure Valley, we can design and install your system.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {ID_REGIONS.map(region => (
              <div key={region.name} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-[#2BABE2] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} className="text-[#2BABE2]" />
                  <h3 className="font-extrabold text-[#0B1D51] text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>{region.name}</h3>
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{region.counties.join(" • ")}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{region.cities.join(", ")}</p>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 mb-8" style={{ height: "320px" }}>
            <iframe
              title="Pell Solar Idaho Service Area"
              src="https://www.google.com/maps?q=Boise%2C%20Idaho&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-center text-gray-400 text-xs">Idaho Office: Eagle, ID — serving the entire Treasure Valley</p>
        </div>
      </section>

      {/* WHY SOLAR IN IDAHO */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Solar in the Treasure Valley
          </h2>
          <div className="text-gray-600 text-lg leading-relaxed space-y-4 max-w-3xl mx-auto mb-12">
            <p>Idaho offers some of the best solar incentives in the region. With Idaho Power's net metering program, you receive full retail credit for excess solar energy — making solar panels an excellent investment for Treasure Valley homeowners.</p>
            <p>Boise averages 5.5 peak sun hours per day, and Idaho Power's rates continue to rise. A properly sized solar system can eliminate your electric bill and protect you from future rate increases.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Net Metering",          desc: "Idaho Power offers full retail credit for excess solar energy sent back to the grid.", icon: "⚡" },
              { title: "Federal Tax Credit",    desc: "Claim the federal solar tax credit when you purchase or finance your system.", icon: "💰" },
              { title: "Property Tax Exemption", desc: "Solar installations are exempt from property tax increases in Idaho.", icon: "🏠" },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-sm">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ready to Get Started?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Free consultation. No pressure. No obligation. Family-owned solar company.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote" className="inline-block bg-[#FED44D] text-[#0B1D51] font-bold text-lg px-10 py-4 rounded-lg no-underline hover:opacity-90 transition-opacity">Get Your Free Quote</Link>
            <a href="tel:2085031416" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white rounded-lg px-6 py-4 font-bold hover:bg-white/20 transition-colors">
              <Phone size={18} className="text-yellow-400" /> (208) 503-1416
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
