import { Link, useRoute } from "wouter";
import { Calendar, Clock, ArrowLeft, Phone, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";

// ─── Article content ────────────────────────────────────────────────────────

const articles: Record<string, {
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
  content: React.ReactNode;
}> = {

  "how-solar-panels-work": {
    title: "How Solar Panels Work: A Simple Guide for Homeowners",
    subtitle: "A clear, jargon-free explanation of how solar panels convert sunlight into electricity — and how that electricity powers your home.",
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Solar Basics",
    categoryColor: "bg-blue-100 text-blue-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>Solar panels seem like magic — sunlight goes in, electricity comes out. But the science behind them is actually pretty straightforward. Understanding how your system works helps you get the most out of it and spot problems early.</p>

        <h2>The Photovoltaic Effect</h2>
        <p>Solar panels work through something called the <strong>photovoltaic effect</strong> — discovered in 1839 by French physicist Edmond Becquerel. When photons (light particles) from the sun hit a silicon cell, they knock electrons loose. Those free electrons create an electric current.</p>
        <p>Each solar panel is made up of dozens of individual silicon cells. When sunlight hits them, they generate direct current (DC) electricity. Your home runs on alternating current (AC), so the next step is converting it.</p>

        <h2>The Inverter: DC to AC Conversion</h2>
        <p>Your solar system includes an <strong>inverter</strong> — the brain of the operation. It converts the DC electricity from your panels into the AC electricity your appliances use.</p>
        <p>There are two main types:</p>
        <ul>
          <li><strong>String inverters</strong> — one central inverter for the whole system. Less expensive, but if one panel is shaded, the whole string underperforms.</li>
          <li><strong>Microinverters</strong> — one small inverter per panel. More expensive, but each panel operates independently. Pell Solar primarily installs Enphase microinverters for this reason.</li>
        </ul>

        <h2>What Happens to the Electricity</h2>
        <p>Once your panels generate electricity, it flows through your home's electrical panel. Your appliances use it first — lights, HVAC, refrigerator, EV charger. If you generate more than you use, the excess flows to the grid (or charges your battery).</p>
        <p>Under California's NEM 3.0 rules, excess electricity sent to the grid earns you credits — but at a lower rate than before. This is why pairing solar with a <strong>Tesla Powerwall battery</strong> is now essential. Instead of sending cheap daytime energy to the grid, you store it and use it at night when rates are highest.</p>

        <h2>The Role of Net Metering</h2>
        <p>Your utility meter tracks electricity flowing in both directions. When your panels produce more than you use, the meter runs backward (or records a credit). When you draw from the grid at night, the meter runs forward.</p>
        <p>At the end of each billing period, you pay only the <em>net</em> difference — hence "net metering." With a properly sized system and battery, many Pell Solar customers reduce their SCE bill to near zero.</p>

        <h2>How Much Electricity Do Panels Produce?</h2>
        <p>A typical residential solar panel produces 400–450 watts under ideal conditions. A 16-panel system (6.8 kW) produces roughly 25–30 kWh per day in Southern California — enough to power an average home.</p>
        <p>Production varies by:</p>
        <ul>
          <li>Time of year (more sun in summer)</li>
          <li>Panel orientation and tilt</li>
          <li>Shading from trees or other structures</li>
          <li>Panel temperature (hot panels are slightly less efficient)</li>
        </ul>

        <h2>Monitoring Your System</h2>
        <p>Every Pell Solar installation includes a monitoring system — either Enphase Enlighten or Tesla's app. You can see exactly how much energy each panel is producing in real time, track your savings, and get alerts if something isn't working correctly.</p>

        <h2>The Bottom Line</h2>
        <p>Solar panels convert sunlight to DC electricity → an inverter converts it to AC → your home uses it → excess goes to a battery or the grid. It's a clean, silent, low-maintenance system that can power your home for 25+ years.</p>
        <p>If you're curious how much a system would produce for your specific home, <Link href="/get-quote" className="text-[#2BABE2] font-semibold">get a free quote from Pell Solar</Link>. We'll design a system sized exactly for your energy usage.</p>
      </div>
    ),
  },

  "nem-3-explained": {
    title: "NEM 3.0 Explained: What California Homeowners Need to Know",
    subtitle: "California's new net metering rules changed the solar math. Here's what NEM 3.0 means for your savings and why battery storage is now essential.",
    date: "February 28, 2024",
    readTime: "8 min read",
    category: "California Solar",
    categoryColor: "bg-yellow-100 text-yellow-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>On April 15, 2023, California's Public Utilities Commission implemented NEM 3.0 — the third version of the state's net energy metering rules. For homeowners going solar, this is the most important policy change in a decade.</p>

        <h2>What Changed Under NEM 3.0</h2>
        <p>Under the old NEM 2.0 rules, excess solar energy you sent to the grid was credited at roughly the retail rate — about $0.30–0.40/kWh. Under NEM 3.0, that export rate dropped dramatically — to about $0.05–0.08/kWh during most hours.</p>
        <p>In plain terms: the grid is no longer a good "battery." Sending electricity to SCE during the day and buying it back at night is now a losing trade.</p>

        <h2>Why Battery Storage Is Now Essential</h2>
        <p>Under NEM 2.0, you could install solar without a battery and still save significantly. Under NEM 3.0, the math changes:</p>
        <ul>
          <li>Solar produces most electricity between 10 AM and 3 PM</li>
          <li>SCE's highest rates (Time-of-Use peak) are from 4–9 PM</li>
          <li>Without a battery, you sell cheap daytime energy and buy expensive evening energy</li>
          <li>With a battery, you store daytime energy and use it during the 4–9 PM peak window</li>
        </ul>
        <p>A <strong>Tesla Powerwall 3</strong> stores 13.5 kWh — enough to power most homes through the entire 4–9 PM peak period and into the night.</p>

        <h2>NEM 3.0 Payback Period</h2>
        <p>Under NEM 2.0, solar-only systems typically paid back in 5–7 years. Under NEM 3.0, solar-only systems may take 9–12 years. But solar + battery systems under NEM 3.0 can pay back in 6–9 years — because the battery captures the full value of your solar production.</p>

        <h2>Who Is Affected</h2>
        <p>NEM 3.0 applies to new solar applications submitted after April 15, 2023. If you already have solar under NEM 2.0, you're grandfathered in for 20 years from your original interconnection date.</p>
        <p>If you're considering solar now, you'll be on NEM 3.0 — which means a battery is strongly recommended.</p>

        <h2>The Virtual Power Plant Opportunity</h2>
        <p>NEM 3.0 introduced a new opportunity: the <strong>Virtual Power Plant (VPP)</strong> program. SCE pays Tesla Powerwall owners to dispatch stored energy back to the grid during peak demand events. Participants earn $2–4 per kWh dispatched — far more than the standard export rate.</p>
        <p>This turns your battery into an income-generating asset during the summer months when grid demand is highest.</p>

        <h2>What This Means for Your Decision</h2>
        <p>Solar still makes excellent financial sense under NEM 3.0 — you just need to pair it with a battery. The combination of solar + Powerwall under NEM 3.0 can still eliminate your SCE bill and provide backup power during outages.</p>
        <p>Pell Solar designs every system under NEM 3.0 rules, optimizing panel placement and battery sizing to maximize your savings under the new rate structure.</p>
        <p><Link href="/get-quote" className="text-[#2BABE2] font-semibold">Get a free NEM 3.0 analysis for your home →</Link></p>
      </div>
    ),
  },

  "tesla-powerwall-vs-other-batteries": {
    title: "Tesla Powerwall vs. Other Home Batteries: Which Is Best?",
    subtitle: "We compare the Tesla Powerwall 3 to the Franklin iBX2, Enphase IQ Battery, and LG RESU to help you choose the right battery for your home.",
    date: "February 10, 2024",
    readTime: "7 min read",
    category: "Battery Storage",
    categoryColor: "bg-purple-100 text-purple-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>Home battery storage has become essential for California solar owners under NEM 3.0. But with multiple options on the market, how do you choose? Here's a straightforward comparison of the top home batteries available in 2024.</p>

        <h2>Tesla Powerwall 3</h2>
        <p>The Powerwall 3 is Tesla's latest home battery, released in 2024. It's the most significant upgrade in the Powerwall lineup — and it's the battery Pell Solar recommends for most installations.</p>
        <p><strong>Key specs:</strong></p>
        <ul>
          <li>13.5 kWh usable capacity</li>
          <li>11.5 kW continuous power output (up from 7.6 kW on PW2)</li>
          <li>Integrated solar inverter — no separate inverter needed</li>
          <li>25-year warranty</li>
          <li>VPP-eligible (earn money dispatching to the grid)</li>
        </ul>
        <p>The integrated inverter is a game-changer. It eliminates a separate piece of equipment, reduces installation cost, and improves system efficiency. The 11.5 kW output means it can power your entire home — including HVAC and EV charging — during an outage.</p>

        <h2>Franklin iBX2</h2>
        <p>The Franklin iBX2 is a newer entrant with some compelling specs, particularly for homes that need more capacity.</p>
        <ul>
          <li>13.6 kWh usable capacity (similar to Powerwall)</li>
          <li>10 kW continuous power output</li>
          <li>Stackable — add multiple units easily</li>
          <li>10-year warranty (shorter than Powerwall)</li>
          <li>Competitive pricing</li>
        </ul>
        <p>The Franklin is a solid choice for homes that want to stack multiple batteries at a lower per-kWh cost. The shorter warranty is a consideration for long-term planning.</p>

        <h2>Enphase IQ Battery 5P</h2>
        <p>Enphase's battery integrates seamlessly with Enphase microinverter systems.</p>
        <ul>
          <li>5 kWh per unit (stackable)</li>
          <li>3.84 kW continuous power output per unit</li>
          <li>Works natively with Enphase microinverters</li>
          <li>10-year warranty</li>
          <li>Modular — add capacity as needed</li>
        </ul>
        <p>The Enphase battery is best for homes already using Enphase microinverters who want seamless integration. The lower per-unit capacity means you'll need multiple units for whole-home backup.</p>

        <h2>LG RESU Prime</h2>
        <p>LG's residential battery is a mature product with a strong track record.</p>
        <ul>
          <li>9.6 kWh or 16 kWh options</li>
          <li>5 kW continuous power output</li>
          <li>Compact form factor</li>
          <li>10-year warranty</li>
          <li>Compatible with most inverters</li>
        </ul>
        <p>The LG RESU is a reliable choice with a smaller footprint, but the lower power output limits its ability to run high-draw appliances during an outage.</p>

        <h2>Our Recommendation</h2>
        <p>For most California homeowners under NEM 3.0, the <strong>Tesla Powerwall 3</strong> is the best choice. The integrated inverter, 25-year warranty, VPP eligibility, and 11.5 kW output make it the most capable and future-proof option. The higher upfront cost is offset by the integrated inverter savings and long-term warranty coverage.</p>
        <p>For homes that want to maximize storage capacity at lower cost, the Franklin iBX2 is worth considering — especially when stacking multiple units.</p>
        <p><Link href="/tesla-powerwall" className="text-[#2BABE2] font-semibold">Learn more about the Tesla Powerwall 3 →</Link></p>
      </div>
    ),
  },

  "solar-cost-california": {
    title: "How Much Do Solar Panels Cost in California? (2024 Guide)",
    subtitle: "Solar prices have dropped dramatically. Here's what a typical California homeowner pays in 2024, what affects the cost, and how to evaluate quotes.",
    date: "January 22, 2024",
    readTime: "9 min read",
    category: "Pricing",
    categoryColor: "bg-[#2BABE2/15] text-[#0B1D51]",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>The cost of solar has fallen more than 90% over the past two decades. In 2024, a typical California homeowner can go solar for $0 down — with monthly payments lower than their current electric bill.</p>

        <h2>Average Solar System Cost in California</h2>
        <p>Before incentives, the average residential solar system in California costs:</p>
        <ul>
          <li><strong>Small system (6–8 kW):</strong> $18,000–$24,000</li>
          <li><strong>Medium system (10–14 kW):</strong> $28,000–$38,000</li>
          <li><strong>Large system (16–20 kW):</strong> $42,000–$54,000</li>
        </ul>
        <p>After the 30% federal tax credit, those numbers drop to:</p>
        <ul>
          <li><strong>Small system:</strong> $12,600–$16,800</li>
          <li><strong>Medium system:</strong> $19,600–$26,600</li>
          <li><strong>Large system:</strong> $29,400–$37,800</li>
        </ul>

        <h2>Adding Battery Storage</h2>
        <p>A Tesla Powerwall 3 adds approximately $10,000–$12,000 to the system cost before the tax credit. After the 30% credit, that's $7,000–$8,400. Under NEM 3.0, the battery typically pays for itself within 3–5 years through avoided peak-rate electricity purchases.</p>

        <h2>What Affects the Cost</h2>
        <p>Several factors influence your final quote:</p>
        <ul>
          <li><strong>System size</strong> — determined by your energy usage (kWh/month from your bill)</li>
          <li><strong>Roof type</strong> — tile roofs cost more to install on than composition shingle</li>
          <li><strong>Panel brand</strong> — premium panels (REC, Panasonic) cost more than standard panels</li>
          <li><strong>Inverter type</strong> — microinverters cost more than string inverters</li>
          <li><strong>Electrical panel upgrade</strong> — older panels may need upgrading</li>
          <li><strong>Permit fees</strong> — vary by city/county</li>
        </ul>

        <h2>Financing Options</h2>
        <p>Most California homeowners finance their solar system rather than paying cash:</p>
        <ul>
          <li><strong>Solar loan:</strong> $0 down, you own the system, claim the 30% tax credit yourself. Typical payment: $150–$250/month for a 20-year loan.</li>
          <li><strong>Solar lease:</strong> $0 down, the leasing company owns the system and claims the tax credit. Fixed payment for 25 years. Pell Solar's Solar Shield package starts at $234/month.</li>
          <li><strong>Cash purchase:</strong> Highest upfront cost, best long-term return. Typical payback: 6–9 years.</li>
        </ul>

        <h2>How to Evaluate Solar Quotes</h2>
        <p>When comparing quotes, don't just look at the total price. Look at:</p>
        <ul>
          <li><strong>Cost per watt</strong> — divide total price by system size in watts. $2.50–$3.50/watt is typical in California.</li>
          <li><strong>Panel brand and warranty</strong> — a 25-year warranty is standard for quality panels.</li>
          <li><strong>Inverter type</strong> — microinverters (Enphase) or power optimizers (SolarEdge) outperform string inverters in most residential applications.</li>
          <li><strong>Installer credentials</strong> — verify CSLB license, insurance, and reviews.</li>
          <li><strong>Production estimate</strong> — ask for a year-1 production estimate in kWh and compare it to your actual usage.</li>
        </ul>

        <h2>The Bottom Line</h2>
        <p>Solar in California is one of the best home investments available — especially with SCE rates among the highest in the country. A properly designed system can eliminate your electric bill, protect you from future rate increases, and add value to your home.</p>
        <p><Link href="/get-quote" className="text-[#2BABE2] font-semibold">Get a free, no-pressure quote from Pell Solar →</Link></p>
      </div>
    ),
  },

  "solar-tax-credit-guide": {
    title: "The 30% Federal Solar Tax Credit: Complete 2024 Guide",
    subtitle: "The federal solar investment tax credit (ITC) lets you deduct 30% of your solar system cost from your federal taxes. Here's exactly how it works.",
    date: "January 8, 2024",
    readTime: "7 min read",
    category: "Incentives",
    categoryColor: "bg-orange-100 text-orange-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>The federal solar investment tax credit (ITC) is the most valuable solar incentive available to American homeowners. Under the Inflation Reduction Act of 2022, the credit was extended and increased to 30% through 2032.</p>

        <h2>What Is the Solar Tax Credit?</h2>
        <p>The ITC allows you to deduct <strong>30% of your total solar system cost</strong> from your federal income taxes. This includes panels, inverters, batteries, installation labor, permitting, and inspection fees.</p>
        <p>It's a <em>tax credit</em> — not a deduction. A deduction reduces your taxable income; a credit directly reduces the taxes you owe. If your system costs $25,000, you get a $7,500 credit against your federal tax bill.</p>

        <h2>What's Included in the Credit</h2>
        <p>The 30% credit applies to:</p>
        <ul>
          <li>Solar panels</li>
          <li>Inverters (string, microinverters, power optimizers)</li>
          <li>Battery storage (Tesla Powerwall, Franklin, Enphase IQ)</li>
          <li>Racking and mounting hardware</li>
          <li>Wiring and electrical work</li>
          <li>Installation labor</li>
          <li>Permitting and inspection fees</li>
          <li>Sales tax on equipment</li>
        </ul>

        <h2>Who Qualifies</h2>
        <p>To claim the credit, you must:</p>
        <ul>
          <li>Own (not lease) the solar system</li>
          <li>Install it at your primary or secondary U.S. residence</li>
          <li>Owe federal income taxes (the credit is non-refundable)</li>
        </ul>
        <p>If you lease your solar system, the leasing company claims the credit — which is why lease payments are lower than loan payments for the same system.</p>

        <h2>How to Claim It</h2>
        <p>Claiming the credit is straightforward:</p>
        <ol>
          <li>Complete IRS Form 5695 (Residential Energy Credits) with your tax return</li>
          <li>Enter your total solar system cost on line 1</li>
          <li>Calculate 30% — that's your credit amount</li>
          <li>The credit reduces your federal tax liability dollar-for-dollar</li>
        </ol>
        <p>If your credit exceeds your tax liability in year 1, the unused portion carries forward to the following year.</p>

        <h2>Credit Schedule</h2>
        <p>The 30% credit is available through 2032. After that:</p>
        <ul>
          <li>2033: 26%</li>
          <li>2034: 22%</li>
          <li>2035 and beyond: 0% (unless Congress extends it)</li>
        </ul>

        <h2>California State Incentives</h2>
        <p>In addition to the federal credit, California offers:</p>
        <ul>
          <li><strong>Property tax exclusion</strong> — solar installations are excluded from property tax reassessment</li>
          <li><strong>Sales tax exemption</strong> — solar equipment is exempt from California sales tax</li>
          <li><strong>SGIP rebate</strong> — the Self-Generation Incentive Program offers rebates for battery storage in certain utility territories</li>
        </ul>

        <h2>The Bottom Line</h2>
        <p>The 30% federal tax credit is a substantial incentive that significantly reduces the cost of going solar. Combined with California's property tax exclusion and NEM 3.0 savings, solar is one of the best financial decisions a California homeowner can make.</p>
        <p>Consult a tax professional for advice specific to your situation. Pell Solar can provide the documentation you need to claim the credit.</p>
        <p><Link href="/get-quote" className="text-[#2BABE2] font-semibold">Get a free quote and see your estimated tax credit →</Link></p>
      </div>
    ),
  },

  "best-solar-panels-california": {
    title: "Best Solar Panels for California Homes in 2024",
    subtitle: "We break down the top panel brands — REC, Panasonic, Q Cells, Canadian Solar, and Silfab — and explain which performs best in California's climate.",
    date: "December 18, 2023",
    readTime: "8 min read",
    category: "Equipment",
    categoryColor: "bg-teal-100 text-teal-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>Not all solar panels perform equally in California's climate. High temperatures, intense UV exposure, and coastal salt air all affect long-term performance. Here's how the top panel brands compare for California homeowners.</p>

        <h2>What Makes a Good Solar Panel?</h2>
        <p>When evaluating panels, look at:</p>
        <ul>
          <li><strong>Efficiency</strong> — percentage of sunlight converted to electricity (higher = more power per square foot)</li>
          <li><strong>Temperature coefficient</strong> — how much output drops per degree Celsius above 25°C (lower is better for hot climates)</li>
          <li><strong>Degradation rate</strong> — how fast output declines over time (lower is better)</li>
          <li><strong>Warranty</strong> — product warranty (defects) and performance warranty (minimum output)</li>
          <li><strong>Manufacturer stability</strong> — will the company be around to honor the warranty in 25 years?</li>
        </ul>

        <h2>REC Alpha Pure-R</h2>
        <p>REC is our top recommendation for most California installations. The Alpha Pure-R uses heterojunction (HJT) technology — the same technology used in high-end commercial panels.</p>
        <ul>
          <li>Efficiency: 22.3%</li>
          <li>Temperature coefficient: -0.24%/°C (excellent for hot climates)</li>
          <li>25-year product + performance warranty</li>
          <li>Degradation: 0.25%/year (industry-leading)</li>
        </ul>
        <p>The low temperature coefficient is particularly valuable in Southern California, where rooftop temperatures regularly exceed 140°F in summer.</p>

        <h2>Panasonic EverVolt</h2>
        <p>Panasonic's EverVolt uses HJT technology developed from their decades of solar research. Excellent performance in high-temperature environments.</p>
        <ul>
          <li>Efficiency: 22.2%</li>
          <li>Temperature coefficient: -0.26%/°C</li>
          <li>25-year product + performance warranty</li>
          <li>Degradation: 0.26%/year</li>
        </ul>

        <h2>Q Cells Q.PEAK DUO BLK ML-G10+</h2>
        <p>Q Cells offers excellent value — near-premium performance at a more accessible price point. Popular for budget-conscious installations that still want quality.</p>
        <ul>
          <li>Efficiency: 21.4%</li>
          <li>Temperature coefficient: -0.34%/°C</li>
          <li>25-year product + performance warranty</li>
          <li>Anti-LID and anti-PID technology</li>
        </ul>

        <h2>Canadian Solar HiHero</h2>
        <p>Canadian Solar's HiHero series uses HJT technology and offers strong performance at competitive pricing.</p>
        <ul>
          <li>Efficiency: 22.8% (highest in lineup)</li>
          <li>Temperature coefficient: -0.26%/°C</li>
          <li>25-year product + performance warranty</li>
          <li>Strong track record in high-temperature climates</li>
        </ul>

        <h2>Silfab Elite</h2>
        <p>Silfab manufactures in North America (Washington State), which matters for Buy American provisions and supply chain reliability.</p>
        <ul>
          <li>Efficiency: 21.4%</li>
          <li>Temperature coefficient: -0.34%/°C</li>
          <li>30-year product warranty (industry-leading)</li>
          <li>Made in USA</li>
        </ul>

        <h2>Our Recommendation for California</h2>
        <p>For Southern California's hot climate, prioritize panels with a <strong>low temperature coefficient</strong> (below -0.30%/°C). REC and Panasonic's HJT technology excels here.</p>
        <p>For the best value, Q Cells offers near-premium performance at a lower price point — a solid choice for budget-conscious homeowners who still want quality.</p>
        <p>Pell Solar installs all of the above brands and will recommend the best option for your specific roof, budget, and energy goals.</p>
        <p><Link href="/solar-panel-systems" className="text-[#2BABE2] font-semibold">Learn more about our solar panel options →</Link></p>
      </div>
    ),
  },

  "solar-lease-vs-buy": {
    title: "Solar Lease vs. Buy: Which Option Is Right for You?",
    subtitle: "Should you lease your solar system or buy it outright? The answer depends on your goals, credit, and how long you plan to stay in your home.",
    date: "December 5, 2023",
    readTime: "6 min read",
    category: "Financing",
    categoryColor: "bg-indigo-100 text-indigo-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>When you go solar, you have two main options: lease the system or buy it (either with cash or a loan). Each has real advantages and drawbacks. Here's a clear comparison to help you decide.</p>

        <h2>Solar Lease: How It Works</h2>
        <p>With a solar lease, a financing company owns the system and installs it on your roof. You pay a fixed monthly fee for 25 years. The leasing company claims the 30% federal tax credit, which is why they can offer $0 down.</p>
        <p><strong>Pell Solar's lease packages:</strong></p>
        <ul>
          <li>Solar Shield: $234/month (16 panels + Tesla Powerwall 3)</li>
          <li>Solar Shield+: $307/month (32 panels + Tesla Powerwall 3)</li>
        </ul>
        <p>Both include full maintenance, monitoring, and a 90% production guarantee for the entire 25-year term.</p>

        <h2>Solar Loan: How It Works</h2>
        <p>With a solar loan, you own the system from day one. You borrow money to pay for it, make monthly payments for 12–20 years, and claim the 30% federal tax credit yourself.</p>
        <p>Typical loan payments for a comparable system: $180–$260/month for a 20-year loan at 6–8% APR. After the loan is paid off, you own the system free and clear — and your electricity is essentially free.</p>

        <h2>Cash Purchase: How It Works</h2>
        <p>Pay the full system cost upfront. You own the system, claim the tax credit, and have no monthly payments. Best long-term return — typical payback period is 6–9 years, after which your electricity is free for the remaining 15+ years of the system's life.</p>

        <h2>Side-by-Side Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">Factor</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Lease</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Loan</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Cash</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Upfront cost", "$0", "$0", "Full cost"],
                ["Monthly payment", "Fixed 25 yrs", "12–20 yr loan", "None"],
                ["Tax credit", "Leasing company", "You (30%)", "You (30%)"],
                ["System ownership", "Leasing company", "You", "You"],
                ["Maintenance", "Included", "Your responsibility", "Your responsibility"],
                ["Production guarantee", "90%", "No", "No"],
                ["Long-term savings", "Moderate", "High", "Highest"],
                ["Best for", "No upfront cost", "Want to own", "Maximum savings"],
              ].map(([factor, lease, loan, cash], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-200 px-4 py-2 font-medium">{factor}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">{lease}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">{loan}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">{cash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>When a Lease Makes Sense</h2>
        <ul>
          <li>You want $0 down with no financial risk</li>
          <li>You don't have enough federal tax liability to benefit from the 30% credit</li>
          <li>You want maintenance included — no surprise repair bills</li>
          <li>You want a production guarantee</li>
        </ul>

        <h2>When Buying Makes Sense</h2>
        <ul>
          <li>You have federal tax liability to use the 30% credit</li>
          <li>You plan to stay in your home long-term</li>
          <li>You want to maximize long-term savings</li>
          <li>You want to own an asset that adds value to your home</li>
        </ul>

        <h2>The Bottom Line</h2>
        <p>Both options can make financial sense — it depends on your situation. A Pell Solar consultant can run the numbers for both options and help you decide which is right for your home and goals.</p>
        <p><Link href="/get-quote" className="text-[#2BABE2] font-semibold">Get a free comparison for your home →</Link></p>
      </div>
    ),
  },

  "how-to-read-sce-bill": {
    title: "How to Read Your SCE Electric Bill (And Why It Matters for Solar)",
    subtitle: "Your Southern California Edison bill contains everything you need to know about whether solar makes sense for your home. Here's how to decode it.",
    date: "November 20, 2023",
    readTime: "5 min read",
    category: "California Solar",
    categoryColor: "bg-yellow-100 text-yellow-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>Before getting a solar quote, the most important thing you can do is understand your current electric bill. It tells you exactly how much energy you use, when you use it, and what you're paying for it — all critical inputs for designing the right solar system.</p>

        <h2>Key Numbers on Your SCE Bill</h2>

        <h3>1. Total kWh Used</h3>
        <p>This is the most important number for solar sizing. It's usually displayed as "Total Energy Charges" or in a usage graph. A typical Southern California home uses 600–1,200 kWh/month. Your solar system should be sized to produce roughly this amount annually.</p>

        <h3>2. Your Rate Plan</h3>
        <p>SCE offers several rate plans. The most common for residential customers is <strong>TOU-D-PRIME</strong> (Time-of-Use). Under this plan, rates vary by time of day:</p>
        <ul>
          <li><strong>Off-peak (9 PM – 4 PM):</strong> ~$0.28/kWh</li>
          <li><strong>Mid-peak (4 PM – 9 PM, weekdays):</strong> ~$0.45/kWh</li>
          <li><strong>On-peak (4 PM – 9 PM, summer weekdays):</strong> ~$0.55/kWh</li>
        </ul>
        <p>This is why battery storage is so valuable — you store cheap daytime solar energy and use it during the expensive 4–9 PM window.</p>

        <h3>3. Baseline Allowance</h3>
        <p>SCE gives you a "baseline allowance" of electricity at a lower rate. Usage above the baseline is charged at higher "above baseline" rates. High-usage homes pay significantly more per kWh for their upper tiers.</p>

        <h3>4. Minimum Delivery Charge</h3>
        <p>Even with solar, you'll still pay SCE's minimum monthly delivery charge — currently about $10–15/month. This is the cost of staying connected to the grid.</p>

        <h2>What to Look for Before Getting a Solar Quote</h2>
        <p>When you call Pell Solar for a quote, have your last 12 months of bills ready (or your annual kWh usage). We'll use this to:</p>
        <ul>
          <li>Size your system to cover your actual usage</li>
          <li>Calculate your estimated savings under NEM 3.0</li>
          <li>Determine the right battery size for your usage pattern</li>
          <li>Show you a month-by-month production vs. usage comparison</li>
        </ul>

        <h2>The SCE Annual True-Up</h2>
        <p>Under NEM 3.0, SCE calculates your net energy usage annually. If you generated more than you used over the year, you receive a credit (at the low export rate). If you used more than you generated, you pay the difference. A well-designed system with battery storage minimizes what you owe at true-up.</p>

        <h2>Quick Tip: The $300+ Bill Rule</h2>
        <p>If your average SCE bill is $300 or more per month, solar almost certainly makes financial sense — especially with a battery. At $300/month, you're spending $3,600/year on electricity. A properly sized solar + battery system can reduce that to near zero.</p>
        <p><Link href="/get-quote" className="text-[#2BABE2] font-semibold">Get a free analysis based on your actual bill →</Link></p>
      </div>
    ),
  },

  "ev-charger-installation-guide": {
    title: "Home EV Charger Installation: Everything You Need to Know",
    subtitle: "Thinking about installing a Level 2 EV charger at home? Here's what the installation involves, how much it costs, and why pairing it with solar is the smartest move.",
    date: "November 5, 2023",
    readTime: "6 min read",
    category: "EV Charging",
    categoryColor: "bg-cyan-100 text-cyan-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>If you own an electric vehicle, a Level 2 home charger is one of the best upgrades you can make. Charging at home is cheaper, more convenient, and — when paired with solar — can be nearly free.</p>

        <h2>Level 1 vs. Level 2 Charging</h2>
        <p><strong>Level 1 charging</strong> uses a standard 120V outlet. It adds about 3–5 miles of range per hour — fine for plug-in hybrids, but painfully slow for full EVs. Charging a Tesla Model 3 from empty takes 3+ days on Level 1.</p>
        <p><strong>Level 2 charging</strong> uses a 240V circuit (same as your dryer). It adds 20–30 miles of range per hour. A Tesla Model 3 charges from 20% to 100% in about 8 hours — overnight, while you sleep.</p>

        <h2>What's Involved in Installation</h2>
        <p>A Level 2 charger installation typically involves:</p>
        <ol>
          <li><strong>Electrical panel assessment</strong> — your panel needs available capacity for a 50-amp circuit (most modern panels do)</li>
          <li><strong>Running a 240V circuit</strong> — from your panel to the garage or driveway</li>
          <li><strong>Mounting the charger</strong> — wall-mounted EVSE (Electric Vehicle Supply Equipment)</li>
          <li><strong>Permit and inspection</strong> — required in most California cities</li>
        </ol>

        <h2>How Much Does It Cost?</h2>
        <p>A typical Level 2 charger installation in Southern California costs $800–$1,500, including:</p>
        <ul>
          <li>EVSE unit: $300–$700 (ChargePoint, Emporia, JuiceBox, Tesla Wall Connector)</li>
          <li>Electrical work: $400–$800</li>
          <li>Permit: $50–$150</li>
        </ul>
        <p>If your electrical panel needs upgrading (older homes with 100-amp panels), add $2,000–$4,000 for the panel upgrade.</p>

        <h2>Why Pair EV Charging with Solar</h2>
        <p>Charging an EV adds 200–400 kWh/month to your electricity usage — a significant increase. Without solar, that's an extra $60–$160/month on your SCE bill.</p>
        <p>With solar, you can charge your EV on sunshine. A properly sized solar system can cover both your home's electricity needs and your EV charging — for free, once the system is paid off.</p>
        <p>Under NEM 3.0, the ideal setup is: charge your EV during the day when solar is producing, or charge from your Tesla Powerwall battery in the evening. Either way, you avoid SCE's peak rates.</p>

        <h2>Best EV Chargers for Home Use</h2>
        <ul>
          <li><strong>Tesla Wall Connector</strong> — best for Tesla owners, integrates with Powerwall</li>
          <li><strong>ChargePoint Home Flex</strong> — adjustable amperage, works with all EVs</li>
          <li><strong>Emporia EV Charger</strong> — smart load management, prevents overloading your panel</li>
          <li><strong>JuiceBox 40</strong> — reliable, good app, works with all EVs</li>
        </ul>

        <h2>Getting Started</h2>
        <p>Pell Solar installs Level 2 EV chargers as a standalone service or as part of a solar installation. We handle the permit, electrical work, and inspection — you just tell us where you want it.</p>
        <p><Link href="/ev-charging" className="text-[#2BABE2] font-semibold">Learn more about EV charger installation →</Link></p>
      </div>
    ),
  },

  "solar-panel-maintenance": {
    title: "Solar Panel Maintenance: What You Actually Need to Do",
    subtitle: "Solar panels are low-maintenance — but not no-maintenance. Here's what to do annually and when to call a professional.",
    date: "October 22, 2023",
    readTime: "5 min read",
    category: "Maintenance",
    categoryColor: "bg-lime-100 text-lime-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>One of solar's biggest selling points is low maintenance. No moving parts, no fuel, no filters to change. But "low maintenance" doesn't mean "no maintenance." Here's what you should actually do to keep your system producing at peak performance.</p>

        <h2>Annual Inspection</h2>
        <p>Have a licensed solar contractor inspect your system once a year. They'll check:</p>
        <ul>
          <li>Panel condition (cracks, delamination, soiling)</li>
          <li>Inverter operation and error codes</li>
          <li>Wiring and connections (rodent damage, corrosion)</li>
          <li>Racking and mounting hardware (loose bolts, rust)</li>
          <li>Roof penetrations (flashing, sealant)</li>
          <li>Monitoring system accuracy</li>
        </ul>

        <h2>Panel Cleaning</h2>
        <p>In Southern California, panels typically need cleaning once or twice a year. Dust, bird droppings, and pollen accumulate and reduce production by 5–25%.</p>
        <p>You can clean panels yourself with a soft brush and water (no soap — it leaves residue). Do it in the early morning or evening when panels are cool. Never use a pressure washer — it can damage the panels and void the warranty.</p>
        <p>Professional cleaning costs $150–$300 and is worth it if you're not comfortable on the roof.</p>

        <h2>Monitor Your Production</h2>
        <p>The best maintenance tool is your monitoring app (Enphase Enlighten or Tesla app). Check it monthly and look for:</p>
        <ul>
          <li>Panels producing significantly less than others (could indicate shading, soiling, or failure)</li>
          <li>Overall production declining faster than expected</li>
          <li>Error codes or offline devices</li>
        </ul>
        <p>If you notice a sudden drop in production, call your installer. Many issues (inverter faults, communication errors) can be diagnosed remotely.</p>

        <h2>Critter Guard</h2>
        <p>In Southern California, squirrels and birds love to nest under solar panels. They chew through wiring and cause expensive damage. If you don't have critter guard installed, consider adding it — especially if you have trees near your roof.</p>
        <p>Signs of critter activity: scratching sounds on the roof, droppings on panels, sudden production drops.</p>

        <h2>Tree Trimming</h2>
        <p>Trees grow. A tree that wasn't shading your panels when they were installed may be shading them now. Check for new shading annually and trim as needed. Even partial shading of one panel can significantly reduce whole-string production with string inverters.</p>

        <h2>What NOT to Do</h2>
        <ul>
          <li>Don't walk on panels — they're not designed for foot traffic</li>
          <li>Don't use abrasive cleaners or pressure washers</li>
          <li>Don't ignore error codes — small issues become big ones</li>
          <li>Don't attempt electrical repairs yourself — always use a licensed contractor</li>
        </ul>

        <h2>When to Call a Professional</h2>
        <p>Call Pell Solar if you notice:</p>
        <ul>
          <li>Production more than 15% below expected</li>
          <li>Persistent error codes on your monitoring app</li>
          <li>Physical damage to panels, racking, or wiring</li>
          <li>Roof leaks near panel mounting points</li>
          <li>Critter activity under panels</li>
        </ul>
        <p><Link href="/solar-repair" className="text-[#2BABE2] font-semibold">Learn about our solar repair and maintenance services →</Link></p>
      </div>
    ),
  },

  "going-solar-inland-empire": {
    title: "Going Solar in the Inland Empire: A Local Guide",
    subtitle: "The Inland Empire is one of the best places in the country for solar. Here's what Inland Empire homeowners need to know before going solar.",
    date: "October 8, 2023",
    readTime: "7 min read",
    category: "Local Guides",
    categoryColor: "bg-red-100 text-red-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>The Inland Empire — Riverside and San Bernardino counties — is one of the best solar markets in the United States. High electricity rates, abundant sunshine, and strong incentives make solar an excellent investment for IE homeowners.</p>

        <h2>Why the Inland Empire Is Perfect for Solar</h2>
        <p>Several factors make the IE particularly well-suited for solar:</p>
        <ul>
          <li><strong>Sun hours:</strong> The IE averages 5.5–6.5 peak sun hours per day — among the highest in the continental US</li>
          <li><strong>High electricity rates:</strong> SCE rates are among the highest in the country, making solar savings significant</li>
          <li><strong>Hot summers:</strong> High AC usage means high summer bills — exactly when solar produces the most</li>
          <li><strong>Strong home values:</strong> Solar adds $15,000–$25,000 to IE home values on average</li>
        </ul>

        <h2>SCE Service Territory</h2>
        <p>Most of the Inland Empire is served by Southern California Edison (SCE). Under NEM 3.0, SCE customers benefit most from pairing solar with a Tesla Powerwall battery — storing daytime solar energy to use during SCE's peak pricing window (4–9 PM).</p>

        <h2>Cities We Serve in the Inland Empire</h2>
        <p>Pell Solar serves homeowners throughout the Inland Empire. Our service area includes:</p>
        <ul>
          <li>Riverside, Corona, Moreno Valley</li>
          <li>San Bernardino, Fontana, Rancho Cucamonga</li>
          <li>Ontario, Upland, Claremont, Pomona</li>
          <li>Temecula, Murrieta, Menifee, Lake Elsinore</li>
          <li>Redlands, Yucaipa, Beaumont, Banning</li>
          <li>Chino, Chino Hills, Eastvale</li>
        </ul>

        <h2>Typical IE Solar System</h2>
        <p>The average Inland Empire home uses 800–1,200 kWh/month — higher than the California average due to air conditioning. A typical IE solar installation:</p>
        <ul>
          <li>System size: 8–14 kW</li>
          <li>Panels: 20–35 panels</li>
          <li>Battery: Tesla Powerwall 3 (strongly recommended under NEM 3.0)</li>
          <li>Monthly savings: $200–$400 on SCE bill</li>
        </ul>

        <h2>Permitting in IE Cities</h2>
        <p>Pell Solar handles all permitting in every IE city we serve. Typical permit timelines:</p>
        <ul>
          <li>Riverside: 2–3 weeks</li>
          <li>San Bernardino: 3–4 weeks</li>
          <li>Rancho Cucamonga: 2–3 weeks</li>
          <li>Corona: 2–3 weeks</li>
          <li>Temecula: 2–3 weeks</li>
        </ul>
        <p>From contract signing to system activation typically takes 6–10 weeks in the Inland Empire.</p>

        <h2>Pell Solar's IE Office</h2>
        <p>Our California office is located in Upland — right in the heart of the Inland Empire. We're a local company, not a national chain. When you call us, you reach our local team, not a call center.</p>
        <p>1326 Monte Vista Ave #7, Upland, CA 91786 | (714) 880-4416</p>
        <p><Link href="/get-quote" className="text-[#2BABE2] font-semibold">Get a free quote for your Inland Empire home →</Link></p>
      </div>
    ),
  },

  "virtual-power-plant-explained": {
    title: "Virtual Power Plant (VPP): What It Is and How You Get Paid",
    subtitle: "SCE's Virtual Power Plant program pays Tesla Powerwall owners to share stored energy during peak demand. Here's how it works and how to enroll.",
    date: "September 25, 2023",
    readTime: "6 min read",
    category: "Battery Storage",
    categoryColor: "bg-purple-100 text-purple-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>If you have a Tesla Powerwall, you may be sitting on an income-generating asset you're not using. Southern California Edison's Virtual Power Plant (VPP) program pays Powerwall owners to dispatch stored energy back to the grid during peak demand events — at rates far above the standard NEM export rate.</p>

        <h2>What Is a Virtual Power Plant?</h2>
        <p>A Virtual Power Plant is a network of home batteries that can be coordinated to act like a single large power plant. Instead of building expensive peaker plants that only run a few hours per year, utilities can call on thousands of home batteries to supply power during demand spikes.</p>
        <p>For homeowners, it's a way to earn money from your battery without any effort — Tesla's software handles everything automatically.</p>

        <h2>How the SCE VPP Program Works</h2>
        <p>SCE's VPP program (called the "Bring Your Own Battery" or BYOB program) works as follows:</p>
        <ol>
          <li>You enroll your Tesla Powerwall in the program through the Tesla app</li>
          <li>During peak demand events (typically hot summer afternoons), SCE sends a dispatch signal</li>
          <li>Tesla's software automatically discharges your Powerwall to the grid</li>
          <li>You receive a payment for every kWh dispatched</li>
          <li>After the event, your Powerwall recharges from solar or the grid</li>
        </ol>

        <h2>How Much Can You Earn?</h2>
        <p>Payment rates vary by program and season, but typical VPP earnings are:</p>
        <ul>
          <li><strong>Standard dispatch:</strong> $2.00–$2.50/kWh</li>
          <li><strong>Emergency dispatch:</strong> $3.00–$4.00/kWh</li>
        </ul>
        <p>A Tesla Powerwall 3 holds 13.5 kWh. A full dispatch earns $27–$54 per event. During a hot California summer, there may be 10–20 dispatch events — earning $270–$1,080 per season.</p>

        <h2>Does It Affect Your Backup Power?</h2>
        <p>This is the most common concern. The answer: Tesla's software manages this automatically. You can set a minimum reserve level (e.g., keep 20% for backup), and the VPP dispatch will never go below that level.</p>
        <p>You can also opt out of individual dispatch events if you prefer to keep your battery fully charged for an upcoming storm or outage.</p>

        <h2>How to Enroll</h2>
        <p>Enrollment is through the Tesla app:</p>
        <ol>
          <li>Open the Tesla app → Powerwall → Settings → Storm Watch & VPP</li>
          <li>Select your utility (SCE) and enroll in the available programs</li>
          <li>Set your minimum reserve level</li>
          <li>Done — Tesla handles everything automatically</li>
        </ol>

        <h2>VPP Under NEM 3.0</h2>
        <p>Under NEM 3.0, the standard grid export rate is very low (~$0.05–0.08/kWh). VPP dispatch rates ($2–4/kWh) are 25–50x higher. This makes VPP participation one of the best ways to maximize the financial return on your battery investment under NEM 3.0.</p>
        <p><Link href="/battery-backup" className="text-[#2BABE2] font-semibold">Learn more about Tesla Powerwall and battery storage →</Link></p>
      </div>
    ),
  },

  "solar-repair-common-problems": {
    title: "Solar Panel Problems: 7 Common Issues and How to Fix Them",
    subtitle: "Is your solar system underperforming? These are the seven most common problems we see — and what you can do about each one.",
    date: "September 10, 2023",
    readTime: "7 min read",
    category: "Maintenance",
    categoryColor: "bg-lime-100 text-lime-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>Solar systems are designed to run for 25+ years with minimal issues. But problems do occur — and catching them early saves money. Here are the seven most common solar problems we see at Pell Solar, and what to do about each one.</p>

        <h2>1. Inverter Failure</h2>
        <p><strong>Symptoms:</strong> No production, error codes on monitoring app, inverter display showing fault</p>
        <p><strong>Cause:</strong> Inverters are the most failure-prone component in a solar system. String inverters typically last 10–15 years. Microinverters (Enphase) last longer but can still fail.</p>
        <p><strong>Fix:</strong> Inverter replacement. Cost varies by type — string inverters: $1,000–$2,500; microinverters: $150–$300 per unit. If your inverter is under warranty, replacement is free.</p>

        <h2>2. Low Production</h2>
        <p><strong>Symptoms:</strong> System producing less than expected, higher-than-expected electric bills</p>
        <p><strong>Cause:</strong> Many possible causes — panel soiling, new shading, panel degradation, inverter issues, wiring problems</p>
        <p><strong>Fix:</strong> Start with panel cleaning. If production is still low, have a technician run diagnostics to identify the root cause.</p>

        <h2>3. Critter Damage</h2>
        <p><strong>Symptoms:</strong> Sudden production drop, visible chewed wiring, scratching sounds on roof</p>
        <p><strong>Cause:</strong> Squirrels, birds, and rodents nest under panels and chew through wiring</p>
        <p><strong>Fix:</strong> Repair damaged wiring, install critter guard to prevent recurrence. Cost: $500–$1,500 depending on damage extent.</p>

        <h2>4. Roof Leaks</h2>
        <p><strong>Symptoms:</strong> Water stains on ceiling near panel mounting points, visible rust around flashing</p>
        <p><strong>Cause:</strong> Improper installation — inadequate flashing, wrong sealant, or penetrations in the wrong location</p>
        <p><strong>Fix:</strong> Remove panels, repair roof, reinstall with proper flashing. If the original installer is still in business and the leak is due to their installation, it should be covered under workmanship warranty.</p>

        <h2>5. Monitoring Communication Issues</h2>
        <p><strong>Symptoms:</strong> Monitoring app shows devices offline, no production data</p>
        <p><strong>Cause:</strong> Wi-Fi router change, internet outage, gateway firmware issue</p>
        <p><strong>Fix:</strong> Often resolved by rebooting the gateway (Enphase Envoy or Tesla Gateway). If that doesn't work, check Wi-Fi credentials and signal strength at the gateway location.</p>

        <h2>6. Panel Microcracks</h2>
        <p><strong>Symptoms:</strong> Gradual production decline, visible dark spots on panels (visible with thermal camera)</p>
        <p><strong>Cause:</strong> Thermal stress, hail, foot traffic, or manufacturing defects</p>
        <p><strong>Fix:</strong> Panel replacement. If within the 25-year product warranty, the manufacturer covers it. Document with photos and contact your installer.</p>

        <h2>7. Hot Spots</h2>
        <p><strong>Symptoms:</strong> One panel producing significantly less than others, visible discoloration</p>
        <p><strong>Cause:</strong> Partial shading, cell defects, or soiling causing current mismatch within a panel</p>
        <p><strong>Fix:</strong> Clean the affected panel first. If the hot spot persists, the panel may need replacement. Hot spots can cause fires if left unaddressed — don't ignore them.</p>

        <h2>When to Call a Professional</h2>
        <p>If your system is producing more than 15% below expected, or if you see any physical damage, call a licensed solar contractor. Many issues can be diagnosed remotely through monitoring data before an on-site visit is needed.</p>
        <p>Pell Solar services all brands — not just systems we installed. We offer free remote diagnostics for systems with active monitoring.</p>
        <p><Link href="/solar-repair" className="text-[#2BABE2] font-semibold">Schedule a solar repair diagnostic →</Link></p>
      </div>
    ),
  },

  "why-choose-local-solar-company": {
    title: "Why You Should Choose a Local Solar Company Over a National Chain",
    subtitle: "National solar companies have big marketing budgets — but local installers often deliver better results. Here's why choosing local protects your investment.",
    date: "August 28, 2023",
    readTime: "5 min read",
    category: "Solar Basics",
    categoryColor: "bg-blue-100 text-blue-700",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>You've probably seen ads from national solar companies — Sunrun, SunPower, Vivint Solar, and others. They have massive marketing budgets, celebrity endorsements, and slick websites. But when it comes to your home, bigger isn't always better.</p>

        <h2>The Problem with National Solar Companies</h2>
        <p>National solar companies operate on a franchise model. They sign you up, then subcontract the actual installation to local crews — often the lowest bidder. Quality control varies significantly.</p>
        <p>More importantly: when something goes wrong 5 years from now, who do you call? National companies have high turnover, frequent rebranding, and some have gone bankrupt (SunPower filed for bankruptcy in 2024). If your installer is gone, your warranty may be worthless.</p>

        <h2>Why Local Companies Are Better</h2>

        <h3>Accountability</h3>
        <p>A local company has its reputation on the line in your community. They can't afford bad reviews — their next customer might be your neighbor. National companies can absorb bad reviews across thousands of installations.</p>

        <h3>Direct Relationship</h3>
        <p>When you call a local company, you reach the people who installed your system — not a call center in another state. They know your roof, your system, and your history.</p>

        <h3>Faster Service</h3>
        <p>Local companies can dispatch a technician quickly. National companies often have service backlogs of weeks or months because they're managing thousands of customers across large geographic areas.</p>

        <h3>Better Installations</h3>
        <p>Local installers build their business on referrals. They take pride in clean, professional installations because every job is a showcase in their community. National companies often prioritize speed over quality.</p>

        <h3>Long-Term Support</h3>
        <p>A 25-year warranty is only valuable if the company will be around to honor it. Local companies that have been in business for 10+ years are far more likely to be around in 25 years than a national chain that may pivot, rebrand, or go bankrupt.</p>

        <h2>What to Look for in a Local Solar Company</h2>
        <ul>
          <li><strong>Years in business:</strong> 5+ years minimum; 10+ is better</li>
          <li><strong>CSLB license:</strong> Verify at cslb.ca.gov (California requires C-46 Solar Contractor license)</li>
          <li><strong>Insurance:</strong> General liability and workers' comp</li>
          <li><strong>Reviews:</strong> Check Yelp, Google, and BBB — look for consistent quality over time</li>
          <li><strong>Physical office:</strong> A real office means a real company</li>
          <li><strong>References:</strong> Ask for references from installations 5+ years ago</li>
        </ul>

        <h2>About Pell Solar</h2>
        <p>Pell Solar is a family-owned company with a physical office in Upland, CA. We serve Southern California and Idaho with solar and battery solutions, and our team is available to discuss your project by phone.</p>
        <p>CSLB License #949122 | (866) 646-8499</p>
        <p><Link href="/about" className="text-[#2BABE2] font-semibold">Learn more about Pell Solar →</Link></p>
      </div>
    ),
  },
};

// ─── Article page component ─────────────────────────────────────────────────

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const article = articles[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Article Not Found</h1>
          <p className="text-gray-600 mb-8">This article doesn't exist or has been moved.</p>
          <Link href="/blog" className="btn-green">Back to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative py-24 md:py-32" style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-[#0B1D51]/45" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${article.categoryColor}`}>{article.category}</span>
            <span className="text-white/50 text-sm flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
            <span className="text-white/50 text-sm flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {article.title}
          </h1>
          <p className="text-xl text-white/75 max-w-3xl mx-auto">{article.subtitle}</p>
        </div>
      </section>

      {/* ═══════════ ARTICLE BODY ═══════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">

          {/* Back link */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium mb-10 no-underline transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          {/* Article content */}
          <div className="
            [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-5
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul>li]:text-gray-700 [&_ul>li]:mb-2 [&_ul>li]:leading-relaxed
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol>li]:text-gray-700 [&_ol>li]:mb-2 [&_ol>li]:leading-relaxed
            [&_strong]:font-bold [&_strong]:text-gray-900
            [&_em]:italic
            [&_a]:text-[#2BABE2] [&_a]:font-semibold [&_a]:no-underline [&_a:hover]:underline
            [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6 [&_table]:text-sm
            [&_th]:border [&_th]:border-gray-200 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:bg-gray-100
            [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-2
          ">
            {article.content}
          </div>

          {/* Author / CTA box */}
          <div className="mt-16 bg-[#0B1D51] rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Ready to Go Solar?
            </h3>
            <p className="text-white/70 mb-6">Get a free, no-pressure quote from Pell Solar, a family-owned solar company.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/get-quote" className="btn-gold text-base px-8 py-3">Get Your Free Quote</Link>
              <a href="tel:8666468499" className="text-white font-bold no-underline hover:text-[#FED44D] transition-colors flex items-center gap-2">
                <Phone size={16} className="text-[#FED44D]" /> (866) 646-8499
              </a>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-10 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium no-underline transition-colors">
              <ArrowLeft size={16} /> Back to all articles
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
