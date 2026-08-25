import { CANONICAL_ORIGIN } from "./seo";

/**
 * Stable business facts used in the LocalBusiness JSON-LD for public pages.
 * Ratings and counts are intentionally omitted because external review values
 * change frequently and self-published LocalBusiness review markup is not used.
 */
export const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "SolarEnergyContractor",
  "@id": `${CANONICAL_ORIGIN}/#localbusiness`,
  name: "Pell Solar",
  legalName: "Pell Solar Inc.",
  url: `${CANONICAL_ORIGIN}/`,
  logo: `${CANONICAL_ORIGIN}/manus-storage/pell-logo-yellow_77e86543.png`,
  image: `${CANONICAL_ORIGIN}/manus-storage/solar-home-main-v2_0ad97127.jpg`,
  description:
    "Pell Solar designs and installs residential solar panels, home batteries, EV charging, and solar service solutions for Southern California and Treasure Valley homeowners.",
  telephone: "+1-866-646-8499",
  email: "info@pellsolar.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1326 Monte Vista Ave #7",
    addressLocality: "Upland",
    addressRegion: "CA",
    postalCode: "91786",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Southern California" },
    { "@type": "AdministrativeArea", name: "Treasure Valley, Idaho" },
  ],
  serviceType: [
    "Residential solar panel installation",
    "Home battery installation",
    "EV charger installation",
    "Solar repair and service",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "California Contractor License",
    identifier: "CSLB #949122",
  },
  sameAs: [
    "https://www.yelp.com/biz/pell-solar-ontario",
    "https://www.facebook.com/pellsolar/",
    "https://www.youtube.com/@PellSolar",
  ],
} as const;

export function getLocalBusinessJsonLd(): string {
  return JSON.stringify(LOCAL_BUSINESS).replace(/</g, "\\u003c");
}
