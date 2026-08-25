import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";

const articles = [
  {
    slug: "how-solar-panels-work",
    title: "How Solar Panels Work: A Simple Guide for Homeowners",
    excerpt: "Ever wonder what actually happens when sunlight hits your roof? Here's a clear, jargon-free explanation of how solar panels convert sunlight into electricity — and how that electricity powers your home.",
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Solar Basics",
    categoryColor: "bg-blue-100 text-blue-700",
  },
  {
    slug: "nem-3-explained",
    title: "NEM 3.0 Explained: What California Homeowners Need to Know",
    excerpt: "California's new net metering rules changed the solar math. Here's what NEM 3.0 means for your savings, why battery storage is now essential, and how to maximize your return under the new rules.",
    date: "February 28, 2024",
    readTime: "8 min read",
    category: "California Solar",
    categoryColor: "bg-yellow-100 text-yellow-700",
  },
  {
    slug: "tesla-powerwall-vs-other-batteries",
    title: "Tesla Powerwall vs. Other Home Batteries: Which Is Best?",
    excerpt: "The Tesla Powerwall 3 is the most popular home battery — but is it the best choice for your home? We compare it to the Franklin iBX2, Enphase IQ Battery, and LG RESU to help you decide.",
    date: "February 10, 2024",
    readTime: "7 min read",
    category: "Battery Storage",
    categoryColor: "bg-purple-100 text-purple-700",
  },
  {
    slug: "solar-cost-california",
    title: "How Much Do Solar Panels Cost in California? (2024 Guide)",
    excerpt: "Solar prices have dropped dramatically. Here's what a typical California homeowner pays for a solar system in 2024, what affects the cost, and how to evaluate quotes from different installers.",
    date: "January 22, 2024",
    readTime: "9 min read",
    category: "Pricing",
    categoryColor: "bg-[#2BABE2/15] text-[#0B1D51]",
  },
  {
    slug: "solar-tax-credit-guide",
    title: "The 30% Federal Solar Tax Credit: Complete 2024 Guide",
    excerpt: "The federal solar investment tax credit (ITC) lets you deduct 30% of your solar system cost from your federal taxes. Here's exactly how it works, who qualifies, and how to claim it.",
    date: "January 8, 2024",
    readTime: "7 min read",
    category: "Incentives",
    categoryColor: "bg-orange-100 text-orange-700",
  },
  {
    slug: "best-solar-panels-california",
    title: "Best Solar Panels for California Homes in 2024",
    excerpt: "Not all solar panels are created equal. We break down the top panel brands — REC, Panasonic, Q Cells, Canadian Solar, and Silfab — and explain which performs best in California's climate.",
    date: "December 18, 2023",
    readTime: "8 min read",
    category: "Equipment",
    categoryColor: "bg-teal-100 text-teal-700",
  },
  {
    slug: "solar-lease-vs-buy",
    title: "Solar Lease vs. Buy: Which Option Is Right for You?",
    excerpt: "Should you lease your solar system or buy it outright? The answer depends on your goals, credit, and how long you plan to stay in your home. Here's a clear comparison to help you decide.",
    date: "December 5, 2023",
    readTime: "6 min read",
    category: "Financing",
    categoryColor: "bg-indigo-100 text-indigo-700",
  },
  {
    slug: "how-to-read-sce-bill",
    title: "How to Read Your SCE Electric Bill (And Why It Matters for Solar)",
    excerpt: "Your Southern California Edison bill contains everything you need to know about whether solar makes sense for your home. Here's how to decode it — and what to look for before getting a solar quote.",
    date: "November 20, 2023",
    readTime: "5 min read",
    category: "California Solar",
    categoryColor: "bg-yellow-100 text-yellow-700",
  },
  {
    slug: "ev-charger-installation-guide",
    title: "Home EV Charger Installation: Everything You Need to Know",
    excerpt: "Thinking about installing a Level 2 EV charger at home? Here's what the installation involves, how much it costs, and why pairing it with solar is the smartest move you can make.",
    date: "November 5, 2023",
    readTime: "6 min read",
    category: "EV Charging",
    categoryColor: "bg-cyan-100 text-cyan-700",
  },
  {
    slug: "solar-panel-maintenance",
    title: "Solar Panel Maintenance: What You Actually Need to Do",
    excerpt: "Solar panels are low-maintenance — but not no-maintenance. Here's what you should do annually, what to watch for, and when to call a professional to keep your system producing at peak performance.",
    date: "October 22, 2023",
    readTime: "5 min read",
    category: "Maintenance",
    categoryColor: "bg-lime-100 text-lime-700",
  },
  {
    slug: "going-solar-inland-empire",
    title: "Going Solar in the Inland Empire: A Local Guide",
    excerpt: "The Inland Empire is one of the best places in the country for solar. High sun hours, rising SCE rates, and strong incentives make the math compelling. Here's what Inland Empire homeowners need to know.",
    date: "October 8, 2023",
    readTime: "7 min read",
    category: "Local Guides",
    categoryColor: "bg-red-100 text-red-700",
  },
  {
    slug: "virtual-power-plant-explained",
    title: "Virtual Power Plant (VPP): What It Is and How You Get Paid",
    excerpt: "SCE's Virtual Power Plant program pays Tesla Powerwall owners to share stored energy during peak demand. Here's how it works, how much you can earn, and how to enroll.",
    date: "September 25, 2023",
    readTime: "6 min read",
    category: "Battery Storage",
    categoryColor: "bg-purple-100 text-purple-700",
  },
  {
    slug: "solar-repair-common-problems",
    title: "Solar Panel Problems: 7 Common Issues and How to Fix Them",
    excerpt: "Is your solar system underperforming? These are the seven most common problems we see — from inverter failures to critter damage — and what you can do about each one.",
    date: "September 10, 2023",
    readTime: "7 min read",
    category: "Maintenance",
    categoryColor: "bg-lime-100 text-lime-700",
  },
  {
    slug: "why-choose-local-solar-company",
    title: "Why You Should Choose a Local Solar Company Over a National Chain",
    excerpt: "National solar companies have big marketing budgets — but local installers often deliver better results. Here's why choosing a local, family-owned solar company protects your investment.",
    date: "August 28, 2023",
    readTime: "5 min read",
    category: "Solar Basics",
    categoryColor: "bg-blue-100 text-blue-700",
  },
];

export default function Blog() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative py-24 md:py-32" style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-[#0B1D51]/45" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#2BABE2/10]0/20 border border-[#2BABE2]/30 rounded-full px-4 py-2 mb-6">
            <BookOpen size={16} className="text-[#2BABE2]" />
            <span className="text-[#2BABE2] font-semibold text-sm">Solar Education Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Pell Solar <span className="text-[#2BABE2]">Blog</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Expert guides, tips, and news to help California and Idaho homeowners make smart solar decisions.
          </p>
        </div>
      </section>

      {/* ═══════════ FEATURED ARTICLE ═══════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Featured Article
          </h2>
          <Link href={`/blog/${featured.slug}`} className="no-underline block">
            <div className="bg-[#0B1D51] rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="p-10 md:p-14">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${featured.categoryColor}`}>{featured.category}</span>
                  <span className="text-white/50 text-sm flex items-center gap-1"><Calendar size={14} /> {featured.date}</span>
                  <span className="text-white/50 text-sm flex items-center gap-1"><Clock size={14} /> {featured.readTime}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {featured.title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-3xl">{featured.excerpt}</p>
                <div className="inline-flex items-center gap-2 text-[#2BABE2] font-bold text-base hover:gap-3 transition-all">
                  Read Article <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══════════ ALL ARTICLES ═══════════ */}
      <section className="py-8 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            All Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="no-underline block group">
                <div className="bg-white rounded-2xl border border-gray-200 p-7 hover:shadow-xl hover:border-green-300 transition-all h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${article.categoryColor}`}>{article.category}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-3 leading-snug group-hover:text-[#0B1D51] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Go Solar?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Get a free, no-pressure solar quote from Pell Solar, a family-owned solar company.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-quote" className="btn-gold text-lg px-10 py-4">Get Your Free Quote</Link>
            <a href="tel:8666468499" className="text-white font-bold text-lg no-underline hover:text-[#FED44D] transition-colors">(866) 646-8499</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
