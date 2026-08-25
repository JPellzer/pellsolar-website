import { useState } from "react";
import { Link } from "wouter";
import { CheckCircle, XCircle, Battery, Sun, Zap, Home as HomeIcon, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG = "/manus-storage/california-home_f656624c.jpg";

const jumpLinks = [
  { id: "what-changed", label: "What Changed?" },
  { id: "solar-battery", label: "How Solar + Battery Works" },
  { id: "existing-solar", label: "Already Have Solar?" },
  { id: "true-up", label: "True-Up Over $4,000?" },
];

export default function NEM30() {
  const [activeSection, setActiveSection] = useState("what-changed");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[520px] flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-[#0B1D51]/45" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            NEM 3.0: <span style={{ color: "#FED44D" }}>Solar Still Works.</span><br />Here's How.
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed">
            California updated its solar billing program in 2023. There's been a lot of confusion about what it means for homeowners. The truth is simple: with the right system, homeowners can still offset nearly all of their electricity costs. Let us show you how.
          </p>
          <Link href="/get-quote"
            className="inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all shadow-xl"
            style={{ background: "#FED44D", color: "#0B1D51" }}>
            GET A FREE CONSULTATION
          </Link>

          {/* Jump links */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {jumpLinks.map((j) => (
              <button key={j.id} onClick={() => scrollTo(j.id)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold border transition-all"
                style={{
                  background: activeSection === j.id ? "rgba(254,212,77,0.2)" : "rgba(255,255,255,0.1)",
                  borderColor: activeSection === j.id ? "#FED44D" : "rgba(255,255,255,0.3)",
                  color: activeSection === j.id ? "#FED44D" : "white",
                }}>
                {j.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FIRST, LET'S CLEAR UP THE CONFUSION ═══════════ */}
      <section id="what-changed" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            First, Let's Clear Up the Confusion
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Net Energy Metering (NEM) is the billing program from Southern California Edison that determines how you're credited when your solar panels produce more electricity than your home uses.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            During the day, your panels make power. Whatever your home doesn't use goes back to Edison's grid, and you get a credit on your bill. That credit is what helps shrink your monthly payment.
          </p>
          <blockquote className="border-l-4 border-[#2BABE2] pl-6 py-2 my-8 bg-blue-50 rounded-r-xl">
            <p className="text-gray-800 text-lg font-medium italic">
              The question everyone asks: <em>"Is solar still worth it under NEM 3.0?"</em><br />
              The answer is <strong>yes</strong> — when your system is designed the right way.
            </p>
          </blockquote>

          <h3 className="text-2xl font-extrabold text-gray-900 mt-12 mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            How We Got Here
          </h3>
          <p className="text-gray-600 mb-8">California's solar billing has gone through three versions. Here's a quick breakdown.</p>

          <div className="relative pl-2">
            {/* Vertical progress line */}
            <div className="absolute left-[27px] top-8 bottom-8 w-1 rounded-full" style={{ background: "linear-gradient(to bottom, #22c55e, #2BABE2, #FED44D)" }} />

            {[
              {
                badge: "Original Program",
                title: "NEM 1.0",
                text: "The first net metering program. Homeowners got a full one-to-one credit for every kilowatt-hour of solar energy sent back to the grid. Solar panels alone could offset nearly all of your electric bill. Homeowners on NEM 1.0 are still grandfathered in today.",
                color: "#22c55e",
                textColor: "#fff",
                year: "2001",
                label: "Grandfathered",
              },
              {
                badge: "Updated Program",
                title: "NEM 2.0",
                text: "Very similar to NEM 1.0. Credits were still close to one-to-one, with small fees added. Solar panels alone still worked great to offset your bill. This was the program available until April 2023. Homeowners on NEM 2.0 are grandfathered in for 20 years.",
                color: "#2BABE2",
                textColor: "#fff",
                year: "2016",
                label: "Grandfathered",
              },
              {
                badge: "April 2023 — Present",
                title: "NEM 3.0 (Current Program)",
                text: "The credit for sending solar energy back to the grid was reduced. But here's the important part: by pairing solar with a battery, homeowners store their energy and use it during Edison's most expensive hours (4–9 PM) instead of sending it to the grid. The result? You can still offset nearly all of your electricity costs.",
                color: "#FED44D",
                textColor: "#0B1D51",
                year: "2023",
                label: "Current",
              },
            ].map((item) => (
              <div key={item.title} className="relative flex gap-6 mb-10 last:mb-0">
                {/* Dot + year */}
                <div className="relative z-10 flex-shrink-0 flex flex-col items-center gap-1" style={{ width: 56 }}>
                  <div
                    className="w-14 h-14 rounded-full flex flex-col items-center justify-center font-extrabold shadow-lg border-4 border-white"
                    style={{ background: item.color, color: item.textColor, fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span className="text-[11px] leading-none font-black">{item.year}</span>
                  </div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                    style={{ background: item.color + "25", color: item.color }}
                  >{item.label}</span>
                </div>
                {/* Card */}
                <div className="flex-1 bg-gray-50 rounded-2xl p-8 border-2 shadow-sm" style={{ borderColor: item.color + "40" }}>
                  <div className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
                    style={{ background: item.color + "20", color: item.color, border: `1px solid ${item.color}60` }}>
                    {item.badge}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW SOLAR + BATTERY GETS IT DONE ═══════════ */}
      <section id="solar-battery" className="py-20 bg-[#0B1D51] scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              How Solar + Battery <span style={{ color: "#FED44D" }}>Gets It Done</span>
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Under NEM 3.0, the winning strategy is keeping your solar energy instead of giving it to Edison. A battery makes that possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-3">The Old Way</div>
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Send Energy to Edison, Get a Credit
              </h3>
              <p className="text-white/70 leading-relaxed">
                Under the old programs, your panels made energy during the day and you sent the extra to the grid. Edison gave you a full credit. That worked great. Under NEM 3.0, that credit is lower — so this approach alone doesn't go as far.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-[#FED44D]/30">
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#FED44D" }}>The Smart Way</div>
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Store Your Energy, Use It When It Counts
              </h3>
              <p className="text-white/70 leading-relaxed">
                With a battery, you keep your solar energy and use it between <strong className="text-white">4 PM and 9 PM</strong> — when Edison charges the most. You're not relying on credits from the grid. You're powering your home with your own stored energy for free. <strong className="text-white">That's how you take control of your bill.</strong>
              </p>
            </div>
          </div>

          {/* 4 steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {[
              { num: "1", icon: "☀️", title: "Panels Make Power", desc: "Your solar panels generate energy during the day while the sun is shining." },
              { num: "2", icon: "🔋", title: "Battery Stores It", desc: "Instead of sending extra power to Edison, your battery stores it for later." },
              { num: "3", icon: "⚡", title: "Discharge 4–9 PM", desc: "During peak hours your home runs on stored battery power, not the grid." },
              { num: "4", icon: "🏠", title: "Full Backup Power", desc: "If the grid goes down, your Powerwall keeps your entire home running." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black"
                  style={{ background: "#FED44D", color: "#0B1D51" }}>
                  {step.num}
                </div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h4 className="text-white font-bold text-sm mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{step.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Ready to Take Control of Your Electric Bill?
            </h3>
            <p className="text-white/70 mb-8">We design every system to maximize your savings under NEM 3.0. Let us show you what's possible for your home.</p>
            <Link href="/get-quote"
              className="inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all"
              style={{ background: "#FED44D", color: "#0B1D51" }}>
              GET A FREE CONSULTATION
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ ALREADY HAVE SOLAR ═══════════ */}
      <section id="existing-solar" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Already Have Solar on Your Home?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            If you have an existing solar system — whether you installed it or it came with the house — you're likely on NEM 1.0 or NEM 2.0. That means you're grandfathered into the better credit rates for 20 years. That's great news.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            But maybe your true-up bill has gone up over the years, and you're wondering why. Here's what happened: Edison changed when peak hours are.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            When many existing solar systems were first installed, Edison's peak hours were during the daytime — when your panels were generating the most power. Your system was producing electricity during the most expensive hours, and with one-to-one credits, everything balanced out perfectly.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Then Edison shifted peak hours to <strong>4 PM to 9 PM</strong> — evening hours when the sun is going down or already gone. Your panels aren't producing during that window, but that's when Edison charges the most. So now you're buying expensive electricity in the evening that your solar system can't offset. That's where the true-up bill comes from.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            A battery fixes this. It stores your solar energy during the day and discharges it during those peak evening hours — the exact hours that are causing your true-up bill. And <strong>adding a battery does not change your NEM status.</strong>
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>A quick note:</strong> Even with the best solar and battery system, Edison will still charge a small monthly amount for service fees, taxes, and non-bypassable charges (NBCs). Every Edison customer pays these — they can't be avoided with solar. But we're talking about a minimal amount compared to what you're paying now.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {[
              {
                count: "1 Tesla Powerwall 3",
                amount: "$1,800",
                desc: "true-up bill? One battery can offset it.",
                body: "If Edison is sending you a true-up bill of around $1,800 per year, adding one Powerwall can offset that true-up. It charges from your solar during the day and discharges during peak hours (4–9 PM) — covering the exact gap that's causing your true-up.",
              },
              {
                count: "2 Tesla Powerwall 3",
                amount: "$3,500",
                desc: "true-up bill? Two batteries can offset it.",
                body: "If your true-up bill from Edison is around $3,500 per year, two Powerwalls give you enough storage capacity to cover that higher usage. Both batteries charge from your existing solar and discharge during peak hours — offsetting your true-up.",
              },
            ].map((card) => (
              <div key={card.count} className="bg-[#0B1D51] rounded-2xl p-8 text-white">
                <div className="text-sm font-bold text-white/60 uppercase tracking-wider mb-2">{card.count}</div>
                <div className="text-4xl font-black mb-1" style={{ color: "#FED44D" }}>{card.amount}</div>
                <div className="text-white font-semibold mb-4">{card.desc}</div>
                <p className="text-white/70 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>What You Can and Can't Add</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle size={22} className="text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700"><strong>Adding a battery keeps your NEM status.</strong> You can add a Tesla Powerwall to your existing system and stay on NEM 1.0 or NEM 2.0. Your grandfathered rate is not affected. This is the smartest upgrade available to you right now.</p>
              </div>
              <div className="flex items-start gap-4">
                <XCircle size={22} className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700"><strong>Adding solar panels beyond 1 kW or 10% of your system moves you to NEM 3.0.</strong> If you're thinking about expanding your panels, talk to us first so we can walk through your options and make sure you don't lose your favorable rate.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/get-quote"
              className="inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all"
              style={{ background: "#2BABE2", color: "white" }}>
              GET A FREE BATTERY ESTIMATE
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ TRUE-UP OVER $4,000 ═══════════ */}
      <section id="true-up" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            What If My True-Up Bill Is Over $4,000?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            When a true-up bill climbs above $4,000 per year, it usually means your home is using more electricity than your current solar system was designed to produce. The batteries help with the peak-hour problem, but if your existing panels simply aren't generating enough energy to keep up with your total usage, batteries alone can't close that gap — there's not enough solar energy during the day to fully charge them and cover everything your home needs.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            <strong>The good news:</strong> we can still drastically reduce your electric bill. It means we need to add solar panels along with batteries. Yes, adding panels will move your system to NEM 3.0 — but when the system is designed correctly with both solar and battery storage, NEM 3.0 still works and you can offset nearly all of your electricity costs.
          </p>

          <h3 className="text-2xl font-extrabold text-gray-900 mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Here's How We Design It Right
          </h3>
          <div className="space-y-6 mb-12">
            {[
              { num: "1", title: "We identify your existing system.", desc: "We find out exactly what solar panels and inverter you have, which tells us how much energy your current system produces in a year." },
              { num: "2", title: "We pull your SCE Green Button data.", desc: "This is the detailed usage data from your Edison account. Combined with your utility bill, it shows us exactly how much energy your home uses and when you're using the most." },
              { num: "3", title: "We calculate the gap.", desc: "By comparing what your current solar produces vs. what your home actually uses, we know exactly how much additional solar and battery storage you need." },
              { num: "4", title: "We build a system that covers 100% of your usage.", desc: "The new solar panels produce exactly what you need, the batteries charge during the day and discharge during peak hours (4–9 PM), and your electricity costs drop to just the minimum service fees and taxes that Edison charges every customer — even on NEM 3.0." },
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-6 bg-white rounded-2xl p-6 border border-gray-200">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-lg"
                  style={{ background: "#FED44D", color: "#0B1D51" }}>
                  {step.num}
                </div>
                <div>
                  <strong className="text-gray-900">{step.title}</strong>
                  <p className="text-gray-600 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Every situation is different, and that's why a proper consultation matters. We'll look at your current system, your Edison bill, and your usage data to give you a clear picture of exactly what it takes to offset your electricity costs — whether that's batteries only or a full solar + battery upgrade.
          </p>

          <div className="text-center">
            <Link href="/get-quote"
              className="inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all"
              style={{ background: "#FED44D", color: "#0B1D51" }}>
              GET MY FREE SYSTEM ESTIMATE
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ WHOLE HOME BACKUP ═══════════ */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Every System Includes <span style={{ color: "#FED44D" }}>Whole-Home Backup</span>
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
            A battery doesn't just save you money — it protects your family. When the grid goes down, your Tesla Powerwall kicks in instantly and keeps your entire home powered with no interruption.
          </p>
          <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
            With power shutoffs, extreme heat events, and wildfire season becoming the new normal in Southern California, backup power gives you one less thing to worry about.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: "⚡", text: "Instant switchover — no delay when the grid goes down" },
              { icon: "🏠", text: "Powers your entire home — lights, fridge, AC, everything" },
              { icon: "📱", text: "Monitor everything from the Tesla app on your phone" },
              { icon: "✅", text: "Tesla Certified Installation by Pell Solar" },
            ].map((item) => (
              <div key={item.text} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-3xl mb-4">{item.icon}</div>
                <p className="text-white/80 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BOTTOM CTA WITH MINI WIDGET ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Let's Talk About <em>Your</em> Home
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Whether you're going solar for the first time or adding a battery to an existing system, we'll walk you through your options. No pressure, no jargon.
          </p>
          <div className="bg-[#0B1D51] rounded-2xl p-8 shadow-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">No Cost · No Obligation</div>
            <h3 className="text-2xl font-extrabold text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              How Much Can <span style={{ color: "#FED44D" }}>You</span> Save?
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Link href="/get-quote?ownership=own"
                className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl font-bold text-sm no-underline transition-all"
                style={{ background: "#FED44D", color: "#0B1D51" }}>
                <span className="text-2xl">🏠</span>
                I OWN MY HOME
              </Link>
              <Link href="/get-quote?ownership=rent"
                className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl font-bold text-sm no-underline transition-all"
                style={{ background: "#2BABE2", color: "white" }}>
                <span className="text-2xl">🏢</span>
                I'M RENTING
              </Link>
            </div>
            <p className="text-white/50 text-sm">Or Call Us 24/7 — Free Consultation</p>
            <a href="tel:8666468499" className="text-[#2BABE2] font-bold text-lg no-underline hover:text-white transition-colors">
              (866) 646-8499
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
