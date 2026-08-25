export const SITE_NAME = "Pell Solar";
export const CANONICAL_ORIGIN = "https://pellsolar.com";
export const DEFAULT_DESCRIPTION =
  "Solar panel and battery installation for homeowners across Southern California and Idaho. Request a free custom solar quote from Pell Solar.";

export type SeoMeta = {
  title: string;
  description: string;
  canonicalPath?: string;
  noindex?: boolean;
  notFound?: boolean;
  ogType?: "website" | "article";
  ogImage?: string;
};

const OG_IMAGE = "/manus-storage/solar-home-main-v2_0ad97127.jpg";

const cityNames: Record<string, string> = {
  "anaheim-ca": "Anaheim",
  "bakersfield-ca": "Bakersfield",
  "baldwin-park-ca": "Baldwin Park",
  "brea-ca": "Brea",
  "burbank-ca": "Burbank",
  "chino-ca": "Chino",
  "chino-hills-ca": "Chino Hills",
  "corona-ca": "Corona",
  "el-monte-ca": "El Monte",
  "fontana-ca": "Fontana",
  "fresno-ca": "Fresno",
  "fullerton-ca": "Fullerton",
  "garden-grove-ca": "Garden Grove",
  "glendora-ca": "Glendora",
  "inland-empire-ca": "Inland Empire",
  "irvine-ca": "Irvine",
  "la-habra-ca": "La Habra",
  "lakewood-ca": "Lakewood",
  "lancaster-ca": "Lancaster",
  "long-beach-ca": "Long Beach",
  "los-angeles-ca": "Los Angeles",
  "murrieta-ca": "Murrieta",
  "ontario-ca": "Ontario",
  "orange-ca": "Orange",
  "palmdale-ca": "Palmdale",
  "pomona-ca": "Pomona",
  "rancho-cucamonga-ca": "Rancho Cucamonga",
  "riverside-ca": "Riverside",
  "san-bernardino-ca": "San Bernardino",
  "santa-ana-ca": "Santa Ana",
  "temecula-ca": "Temecula",
  "thousand-oaks-ca": "Thousand Oaks",
  "torrance-ca": "Torrance",
  "ventura-ca": "Ventura",
  "upland-ca": "Upland",
  "montclair-ca": "Montclair",
  "claremont-ca": "Claremont",
  "rialto-ca": "Rialto",
  "colton-ca": "Colton",
  "jurupa-valley-ca": "Jurupa Valley",
  "moreno-valley-ca": "Moreno Valley",
  "san-dimas-ca": "San Dimas",
  "la-verne-ca": "La Verne",
  "covina-ca": "Covina",
  "west-covina-ca": "West Covina",
  "eastvale-ca": "Eastvale",
  "norco-ca": "Norco",
  "redlands-ca": "Redlands",
  "highland-ca": "Highland",
  "loma-linda-ca": "Loma Linda",
  "bloomington-ca": "Bloomington",
  "grand-terrace-ca": "Grand Terrace",
  "hacienda-heights-ca": "Hacienda Heights",
  "walnut-ca": "Walnut",
  "diamond-bar-ca": "Diamond Bar",
  "azusa-ca": "Azusa",
};

const pageMeta: Record<string, Pick<SeoMeta, "title" | "description" | "canonicalPath">> = {
  "/": {
    title: "Solar & Battery Installation, Southern California & Idaho | Pell Solar",
    description:
      "Pell Solar designs and installs solar panels, home batteries, and EV charging for homeowners in Southern California and Idaho. Get a free custom quote.",
    canonicalPath: "/",
  },
  "/get-quote": {
    title: "Get a Free Solar Quote | Pell Solar",
    description:
      "Get a free custom solar and battery quote from Pell Solar. Share your home and energy needs to start designing a system for your household.",
    canonicalPath: "/get-quote",
  },
  "/about": {
    title: "About Pell Solar | Southern California Solar Company",
    description:
      "Learn about Pell Solar, a family-owned solar company serving Southern California and Idaho with solar panels, home batteries, and energy guidance.",
    canonicalPath: "/about",
  },
  "/reviews": {
    title: "Pell Solar Customer Reviews | Solar Installation Reviews",
    description:
      "Read customer feedback about Pell Solar’s solar panel, battery backup, and EV charging installations across Southern California and Idaho.",
    canonicalPath: "/reviews",
  },
  "/schedule": {
    title: "Schedule a Solar Consultation | Pell Solar",
    description:
      "Schedule a consultation with Pell Solar to discuss solar panels, battery backup, EV charging, and your home’s energy needs.",
    canonicalPath: "/schedule",
  },
  "/upload-bill": {
    title: "Upload Your Utility Bill for a Solar Estimate | Pell Solar",
    description:
      "Upload a utility bill or energy-use file so Pell Solar can prepare a more accurate solar and battery estimate for your home.",
    canonicalPath: "/upload-bill",
  },
  "/referral-program": {
    title: "Pell Solar Referral Program | Earn Referral Rewards",
    description:
      "Learn how to refer friends and family to Pell Solar and access the Pell Solar referral program.",
    canonicalPath: "/referral-program",
  },
  "/solar-demo": {
    title: "Interactive Solar & Battery Demo | Pell Solar",
    description:
      "See how a Pell Solar system can connect solar panels, battery storage, home energy use, and EV charging.",
    canonicalPath: "/solar-demo",
  },
  "/sms-updates": {
    title: "SMS Updates | Pell Solar",
    description:
      "Sign up to receive Pell Solar service and appointment updates by text message.",
    canonicalPath: "/sms-updates",
  },
  "/solar-panel-systems": {
    title: "Solar Panel Installation in Southern California | Pell Solar",
    description:
      "Explore custom residential solar panel systems from Pell Solar, including design, installation, monitoring, and energy production for Southern California homes.",
    canonicalPath: "/solar-panel-systems",
  },
  "/tesla-powerwall": {
    title: "Tesla Powerwall Installation in Southern California | Pell Solar",
    description:
      "Learn about Tesla Powerwall home battery installation from Pell Solar for backup power, solar self-consumption, and time-of-use energy management.",
    canonicalPath: "/tesla-powerwall",
  },
  "/battery-backup": {
    title: "Home Battery Backup in Southern California | Pell Solar",
    description:
      "Pell Solar installs home battery backup systems that store solar energy, support outage preparedness, and help manage peak electricity use.",
    canonicalPath: "/battery-backup",
  },
  "/ev-charging": {
    title: "EV Charger Installation in Southern California | Pell Solar",
    description:
      "Add convenient home EV charging with professional installation from Pell Solar, designed to work with your home electrical system and solar plans.",
    canonicalPath: "/ev-charging",
  },
  "/financing": {
    title: "Solar Financing Options in Southern California | Pell Solar",
    description:
      "Compare solar financing, leasing, and payment options with Pell Solar to find a solar and battery plan that fits your household budget.",
    canonicalPath: "/financing",
  },
  "/solar-repair": {
    title: "Solar Repair in Southern California | Pell Solar",
    description:
      "Get help with solar repair, system diagnostics, equipment issues, and service needs from Pell Solar in Southern California.",
    canonicalPath: "/solar-repair",
  },
  "/service-warranty": {
    title: "Solar Service & Warranty Support in Southern California | Pell Solar",
    description:
      "Learn about Pell Solar service and warranty support for solar panels, inverters, batteries, monitoring, and installed energy systems.",
    canonicalPath: "/service-warranty",
  },
  "/solar-lease": {
    title: "Solar Lease Options in Southern California | Pell Solar",
    description:
      "Explore solar lease options from Pell Solar for predictable monthly payments and professionally designed solar and battery systems.",
    canonicalPath: "/solar-lease",
  },
  "/nem-3": {
    title: "NEM 3.0 Solar & Battery Guide for Southern California | Pell Solar",
    description:
      "Understand California NEM 3.0 and why pairing solar with battery storage can help households use more of the energy they produce.",
    canonicalPath: "/nem-3",
  },
  "/california": {
    title: "Solar & Battery Installation in California | Pell Solar",
    description:
      "Pell Solar provides solar panel, battery backup, and EV charging solutions for homeowners throughout Southern California.",
    canonicalPath: "/california",
  },
  "/idaho": {
    title: "Solar Installation in Boise & Treasure Valley, ID | Pell Solar",
    description:
      "Pell Solar provides solar panel, battery backup, and EV charging solutions for homeowners in Boise, Meridian, Nampa, Eagle, Kuna, and Treasure Valley.",
    canonicalPath: "/idaho",
  },
  "/our-work": {
    title: "Solar Installation Projects in Southern California | Pell Solar",
    description:
      "Browse completed Pell Solar installations, including solar panels, home batteries, EV charging, and residential energy projects.",
    canonicalPath: "/our-work",
  },
  "/blog": {
    title: "Solar & Battery Insights | Pell Solar Blog",
    description:
      "Read practical solar, battery backup, EV charging, financing, and NEM 3.0 guidance for homeowners from Pell Solar.",
    canonicalPath: "/blog",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Pell Solar",
    description: "Read Pell Solar’s privacy policy and information practices.",
    canonicalPath: "/privacy-policy",
  },
  "/terms": {
    title: "Terms & Conditions | Pell Solar",
    description: "Read the Pell Solar website terms and conditions.",
    canonicalPath: "/terms",
  },
};

const blogArticles: Record<string, { title: string; description: string }> = {
  "how-solar-panels-work": { title: "How Solar Panels Work: A Simple Guide for Homeowners", description: "Learn how solar panels convert sunlight into usable electricity, how inverters work, and how solar energy supports your home." },
  "nem-3-explained": { title: "NEM 3.0 Explained: What California Homeowners Need to Know", description: "Understand California NEM 3.0, solar export rates, and why battery storage matters for new solar homeowners." },
  "tesla-powerwall-vs-other-batteries": { title: "Tesla Powerwall vs. Other Home Batteries", description: "Compare Tesla Powerwall with other home battery options and learn which energy-storage features matter for your home." },
  "solar-cost-california": { title: "How Much Do Solar Panels Cost in California?", description: "Understand the factors that affect residential solar costs in California, including system size, equipment, energy use, and financing." },
  "solar-tax-credit-guide": { title: "Solar Tax Credit Guide for Homeowners", description: "Review the key considerations around solar incentives and tax-credit eligibility when planning a residential solar project." },
  "best-solar-panels-california": { title: "Best Solar Panels for California Homes", description: "Learn how panel efficiency, warranties, roof design, and monitoring features influence the right solar equipment for a California home." },
  "solar-lease-vs-buy": { title: "Solar Lease vs. Buy: Which Is Better?", description: "Compare solar lease and ownership options to understand monthly payments, long-term control, and the questions to ask before choosing." },
  "how-to-read-sce-bill": { title: "How to Read Your SCE Bill", description: "Learn how to review Southern California Edison bill details, energy use, and the information helpful for planning solar and battery storage." },
  "ev-charger-installation-guide": { title: "Home EV Charger Installation Guide", description: "Understand the planning, electrical requirements, and installation steps for adding a convenient home EV charger." },
  "solar-panel-maintenance": { title: "Solar Panel Maintenance Tips for Homeowners", description: "Learn practical ways to monitor solar performance, keep equipment maintained, and know when to request professional solar service." },
  "going-solar-inland-empire": { title: "Going Solar in the Inland Empire", description: "A local guide to solar panels, battery backup, utility bills, and energy planning for Inland Empire homeowners." },
  "virtual-power-plant-explained": { title: "Virtual Power Plants Explained", description: "Learn how virtual power plant programs can use connected home batteries to support the grid during periods of peak demand." },
  "solar-repair-common-problems": { title: "Common Solar Repair Problems and Fixes", description: "Understand common solar-system issues, warning signs, and when to contact a qualified professional for solar repair service." },
  "why-choose-local-solar-company": { title: "Why Choose a Local Solar Company?", description: "Learn how local solar expertise, permitting familiarity, service support, and accountability can shape your installation experience." },
};

function normalizePath(urlOrPath: string): string {
  const path = urlOrPath.split("?")[0] || "/";
  return (path.replace(/\/+$/, "") || "/").toLowerCase();
}

export function getSeoMeta(urlOrPath: string): SeoMeta {
  const path = normalizePath(urlOrPath);

  if (path.startsWith("/admin") || path === "/unsubscribe" || path === "/thank-you") {
    return { title: SITE_NAME, description: DEFAULT_DESCRIPTION, noindex: true };
  }

  const cityMatch = path.match(/^\/solar\/([^/]+)$/);
  if (cityMatch) {
    const city = cityNames[cityMatch[1]];
    if (city) {
      return {
        title: `Solar Installation in ${city}, CA | ${SITE_NAME}`,
        description: `Explore solar panel and battery installation options for homeowners in ${city}, California. Request a free custom solar quote from Pell Solar.`,
        canonicalPath: `/solar/${cityMatch[1]}`,
        ogImage: OG_IMAGE,
      };
    }
  }

  const articleMatch = path.match(/^\/blog\/([^/]+)$/);
  if (articleMatch) {
    const article = blogArticles[articleMatch[1]];
    if (article) {
      return {
        title: `${article.title} | ${SITE_NAME}`,
        description: article.description,
        canonicalPath: `/blog/${articleMatch[1]}`,
        ogType: "article",
        ogImage: OG_IMAGE,
      };
    }
  }

  const canonicalAliases: Record<string, string> = {
    "/refer": "/referral-program",
    "/upload-your-bill": "/upload-bill",
    "/solar-california": "/california",
    "/solar-idaho": "/idaho",
    "/solar-panels": "/solar-panel-systems",
    "/solar-financing": "/financing",
    "/nem-3-0": "/nem-3",
    "/terms-and-conditions": "/terms",
  };
  const canonicalPath = canonicalAliases[path] ?? path;
  const meta = pageMeta[canonicalPath];
  if (meta) return { ...meta, canonicalPath: canonicalPath, ogImage: OG_IMAGE };

  return { title: `Page Not Found | ${SITE_NAME}`, description: DEFAULT_DESCRIPTION, notFound: true };
}
