import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const REFERRAL_APP_URL = "https://pellsolar-crm-prod.onrender.com/app";
const APP_STORE_URL = "https://apps.apple.com/us/app/pell-solar-referral/id6760663938";
const REFERRAL_QR_IMG = "/manus-storage/pell-solar-referral-qr_b0d91c44.png";

const GREEN = "#22c55e";
const GREEN_DARK = "#16a34a";
const GREEN_GLOW = "rgba(34,197,94,0.18)";
const NAVY = "#060f2e";

export default function ReferralProgram() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: NAVY }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-20 px-6 text-white text-center overflow-hidden"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${GREEN_GLOW} 0%, transparent 70%), ${NAVY}` }}
      >
        {/* Decorative dollar signs */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
          {["$", "$", "$", "$", "$"].map((s, i) => (
            <span
              key={i}
              className="absolute font-black"
              style={{
                color: GREEN,
                opacity: 0.05,
                top: `${[10, 30, 55, 20, 70][i]}%`,
                left: `${[5, 88, 15, 75, 92][i]}%`,
                transform: `rotate(${[-15, 12, -8, 20, -5][i]}deg)`,
                fontSize: `${[80, 120, 60, 100, 70][i]}px`,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="relative max-w-3xl mx-auto">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8 border"
            style={{ color: GREEN, borderColor: `${GREEN}55`, background: `${GREEN}12` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN }} />
            Referral Program — Earn Real Cash
          </span>

          <h1 className="text-5xl md:text-6xl font-black leading-[1.05] mb-4 tracking-tight text-white">
            Know Someone<br />Who Needs Solar?
          </h1>

          <div
            className="text-7xl md:text-8xl font-black mb-6 leading-none"
            style={{ color: GREEN, textShadow: `0 0 40px ${GREEN}66, 0 0 80px ${GREEN}33` }}
          >
            Earn $2,000
          </div>

          <p className="text-white text-lg max-w-xl mx-auto mb-10">
            Sign up free, share your personal link, and get paid when your friends go solar. No selling. No hassle.
          </p>

          <a
            href={REFERRAL_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-black text-lg tracking-wider px-12 py-5 rounded-xl shadow-2xl transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)`,
              color: "#fff",
              boxShadow: `0 8px 32px ${GREEN}55`,
            }}
          >
            💰 CREATE MY FREE ACCOUNT
          </a>
          <p className="text-white text-sm mt-4">
            Already have an account?{" "}
            <a href={REFERRAL_APP_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold" style={{ color: GREEN }}>
              Log in here
            </a>
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ background: "#0a1630", borderTop: `1px solid ${GREEN}22`, borderBottom: `1px solid ${GREEN}22` }}>
        <div className="max-w-4xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "90%", label: "of our business is referrals" },
            { val: "$0", label: "to join — always free" },
            { val: "$2,000", label: "max cash reward" },
            { val: "22+", label: "years in business" },
          ].map(({ val, label }) => (
            <div key={val} className="flex flex-col items-center">
              <div className="text-3xl font-black" style={{ color: GREEN }}>{val}</div>
              <div className="text-white text-xs mt-1 leading-snug font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── REWARD TIERS ── */}
      <section className="py-20 px-6" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-3">How Much You Earn</h2>
          <p className="text-white text-center mb-12 text-base font-medium">Paid after installation is complete. No limit on referrals.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tier 1 */}
            <div
              className="rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #0d2a14 0%, #0a1f10 100%)`,
                border: `2px solid ${GREEN}55`,
                boxShadow: `0 4px 40px ${GREEN}22`,
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-8 translate-x-8" style={{ background: GREEN }} />
              <div className="text-4xl mb-1">☀️🔋</div>
              <div>
                <div className="text-white font-black text-xl">Solar + Battery System</div>
                <div className="text-white text-sm mt-1 font-medium">Friend installs solar panels + Powerwall</div>
              </div>
              <div className="text-5xl font-black mt-2" style={{ color: GREEN, textShadow: `0 0 20px ${GREEN}55` }}>
                $500–$2,000
              </div>
              <div className="text-white text-xs font-semibold">Scales with system size</div>
            </div>

            {/* Tier 2 */}
            <div
              className="rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #0a1a2e 0%, #071422 100%)`,
                border: `2px solid #2BABE255`,
                boxShadow: `0 4px 40px #2BABE222`,
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-8 translate-x-8" style={{ background: "#2BABE2" }} />
              <div className="text-4xl mb-1">🔋</div>
              <div>
                <div className="text-white font-black text-xl">Battery-Only Install</div>
                <div className="text-white text-sm mt-1 font-medium">Friend adds Powerwall to existing solar</div>
              </div>
              <div className="text-5xl font-black mt-2" style={{ color: "#2BABE2", textShadow: "0 0 20px #2BABE255" }}>
                $250–$500
              </div>
              <div className="text-white text-xs font-semibold">Paid after installation is complete</div>
            </div>
          </div>

          <p className="text-white text-xs text-center mt-6 font-medium">
            No limit on how many friends you can refer. Each qualifying installation earns a separate reward.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6" style={{ background: "#080f24" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-3">How It Works</h2>
          <p className="text-white text-center mb-14 text-base font-medium">Three steps. No selling. Just share and get paid.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Sign Up Free", desc: "Create your account in under 2 minutes. No credit card, no commitment, no catch.", icon: "🙋" },
              { step: "02", title: "Share Your Link", desc: "Get your personal referral link and share it by text, email, or social media.", icon: "🔗" },
              { step: "03", title: "Get Paid", desc: "We send your cash reward once your friend's solar system is fully installed.", icon: "💵" },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-lg"
                  style={{ background: `${GREEN}18`, border: `1.5px solid ${GREEN}44` }}
                >
                  {icon}
                </div>
                <div className="text-xs font-black tracking-widest mb-2" style={{ color: GREEN }}>STEP {step}</div>
                <h3 className="text-white font-black text-xl mb-3">{title}</h3>
                <p className="text-white text-sm leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QR + CTA ── */}
      <section
        className="py-20 px-6"
        style={{ background: `radial-gradient(ellipse 70% 80% at 50% 50%, ${GREEN_GLOW} 0%, transparent 70%), ${NAVY}` }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-3">Ready to Start Earning?</h2>
          <p className="text-white text-center mb-12 text-base font-medium">
            Create your free account now, or scan the QR code with your phone camera to open the app instantly.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* QR code */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="rounded-2xl p-4 shadow-2xl"
                style={{ background: "#fff", border: `3px solid ${GREEN}`, boxShadow: `0 0 40px ${GREEN}44` }}
              >
                <img src={REFERRAL_QR_IMG} alt="Scan to join referral program" className="w-44 h-44 object-contain" />
              </div>
              <p className="text-white text-xs text-center font-semibold">📱 Point your phone camera here</p>
            </div>

            {/* Divider */}
            <div className="hidden md:flex flex-col items-center gap-3">
              <div className="w-px h-20 bg-white/20" />
              <span className="text-white text-sm font-bold">OR</span>
              <div className="w-px h-20 bg-white/20" />
            </div>
            <div className="md:hidden flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-white/20" />
              <span className="text-white text-sm font-bold">OR</span>
              <div className="flex-1 h-px bg-white/20" />
            </div>

            {/* Button */}
            <div className="flex flex-col items-center gap-4">
              <a
                href={REFERRAL_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 font-black text-lg tracking-wider px-10 py-5 rounded-xl transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)`,
                  color: "#fff",
                  minWidth: 280,
                  boxShadow: `0 8px 32px ${GREEN}55`,
                }}
              >
                💰 CREATE MY FREE ACCOUNT
              </a>
              <p className="text-white text-sm font-medium">
                Already have an account?{" "}
                <a href={REFERRAL_APP_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold" style={{ color: GREEN }}>
                  Log in here
                </a>
              </p>

              {/* App Download Buttons */}
              <div className="mt-2 flex flex-col items-center gap-3 w-full">
                <p className="text-white text-xs font-semibold tracking-wider uppercase" style={{ color: `${GREEN}cc` }}>Download the App</p>
                {/* App Store Button */}
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "#000",
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    minWidth: 200,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-white text-xs leading-none">Download on the</span>
                    <span className="text-white font-bold text-base leading-tight">App Store</span>
                  </div>
                </a>

                {/* Google Play - Coming Soon */}
                <div
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl cursor-not-allowed"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1.5px solid rgba(255,255,255,0.12)",
                    minWidth: 200,
                    opacity: 0.6,
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" fill="white">
                    <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-7.27-2.72-2.72-10.87 9.79zm-1.9-20.7A1.97 1.97 0 0 0 1 4.5v15c0 .55.2 1.04.54 1.41l.08.07 8.4-8.4v-.2L1.28 3.06zm17.4 8.5-2.82-1.63-3.06 3.06 3.06 3.06 2.84-1.64c.81-.47.81-1.23-.02-1.85zM4.17.24C3.82.2 3.48.27 3.18.44L14.1 11.37l-2.72-2.72L4.17.24z"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-white text-xs leading-none">Coming Soon to</span>
                    <span className="text-white font-bold text-base leading-tight">Google Play</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-14 px-6" style={{ background: "#0a1630", borderTop: `1px solid ${GREEN}22` }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-5">💬</div>
          <blockquote className="text-white text-xl italic leading-relaxed mb-5 font-medium">
            "I referred my neighbor and got a check in the mail two months later. Easiest $500 I've ever made."
          </blockquote>
          <p className="font-black text-sm tracking-wider" style={{ color: GREEN }}>— Michael P., Fontana CA</p>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section
        className="py-14 px-6 text-center"
        style={{ background: `linear-gradient(135deg, ${GREEN_DARK} 0%, #14532d 100%)` }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-3">Don't Leave Money on the Table</h2>
          <p className="text-white text-lg mb-8 font-medium">
            Every person you know with a high electric bill is a potential $2,000 in your pocket.
          </p>
          <a
            href={REFERRAL_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-black text-lg tracking-wider px-12 py-5 rounded-xl transition-all hover:scale-105"
            style={{ background: "#fff", color: GREEN_DARK, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
          >
            💰 START EARNING NOW →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
