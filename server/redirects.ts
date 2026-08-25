import { Router } from "express";

const router = Router();

// 301 redirects from old pellsolar.com WordPress URLs to new site URLs
export const redirectMap: Record<string, string> = {
  // Service pages
  "/solar": "/solar-panel-systems",
  // "/solar-panel-systems" intentionally omitted — it's a real page, no redirect needed
  "/powerwall": "/tesla-powerwall",
  "/tesla-installer": "/tesla-powerwall",
  // "/battery-backup" intentionally omitted — it's a real page, no redirect needed
  "/solar-backup": "/battery-backup",
  "/california-solar-batteries-backup": "/battery-backup",
  // "/ev-charging" intentionally omitted — it's a real page, no redirect needed
  // "/financing" intentionally omitted — it's a real page, no redirect needed
  "/financing-2": "/financing/",
  "/california-bundles": "/financing/",
  // "/solar-lease" intentionally omitted — it's a real page, no redirect needed
  // "/solar-repair" intentionally omitted — it's a real page, no redirect needed
  "/service-request": "/solar-repair",
  "/service": "/solar-repair",
  "/california-solar-services": "/solar-repair",
  // "/nem-3" intentionally omitted — it's a real page, no redirect needed

  // Company pages
  "/about-us": "/about",
  // "/about" intentionally omitted — it's a real page, no redirect needed
  "/customer-reviews": "/reviews",
  // "/our-work" intentionally omitted — it's a real page, no redirect needed
  "/schedule-call": "/schedule",
  "/news": "/blog",

  // Location pages
  // "/california" intentionally omitted — it's a real page, no redirect needed
  "/california-installation": "/california",
  "/california-old": "/california",
  "/solar-panel-company-california": "/california",
  // "/idaho" intentionally omitted — it's a real page, no redirect needed
  "/idaho-installation": "/idaho",
  "/solar-panel-company-idaho": "/idaho",

  // City pages — old format → new format
  "/altadena-ca-solar": "/solar/altadena-ca",
  "/arcadia-ca-solar": "/solar/arcadia-ca",
  "/azusa-ca-solar": "/solar/azusa-ca",
  "/chino-ca-solar": "/solar/chino-ca",
  "/chino-hills-ca-solar": "/solar/chino-hills-ca",
  "/chino-hills-ca-solar-2": "/solar/chino-hills-ca",
  "/claremont-ca-solar": "/solar/claremont-ca",
  "/corona-ca-solar": "/solar/corona-ca",
  "/corona-ca-solar-2": "/solar/corona-ca",
  "/covina-ca-solar": "/solar/covina-ca",
  "/diamond-bar-ca-solar": "/solar/diamond-bar-ca",
  "/eastvale-ca-solar": "/solar/eastvale-ca",
  "/fontana-ca-solar": "/solar/fontana-ca",
  "/glendora-ca-solar": "/solar/glendora-ca",
  "/jurupa-valley-ca-solar": "/solar/jurupa-valley-ca",
  "/la-verne-ca-solar": "/solar/la-verne-ca",
  "/los-angeles-county-ca-solar": "/solar/los-angeles-ca",
  "/los-angeles-county-solar": "/solar/los-angeles-ca",
  "/monrovia-ca-solar": "/solar/monrovia-ca",
  "/moreno-valley-ca-solar": "/solar/moreno-valley-ca",
  "/murrieta-ca-solar": "/solar/murrieta-ca",
  "/ontario-ca-solar": "/solar/ontario-ca",
  "/orange-county-solar": "/solar/orange-ca",
  "/pasadena-ca-solar": "/solar/pasadena-ca",
  "/pomona-ca-solar": "/solar/pomona-ca",
  "/rancho-cucamonga-ca-solar": "/solar/rancho-cucamonga-ca",
  "/rancho-cucamonga-ca-solar-2": "/solar/rancho-cucamonga-ca",
  "/redlands-ca-solar": "/solar/redlands-ca",
  "/rialto-ca-solar": "/solar/rialto-ca",
  "/riverside-ca-solar": "/solar/riverside-ca",
  "/riverside-ca-solar-2": "/solar/riverside-ca",
  "/riverside-county-ca-solar": "/solar/riverside-ca",
  "/riverside-county-solar": "/solar/riverside-ca",
  "/san-bernardino-ca-solar": "/solar/san-bernardino-ca",
  "/san-bernardino-county-ca-solar": "/solar/san-bernardino-ca",
  "/san-bernardino-county-solar": "/solar/san-bernardino-ca",
  "/san-dimas-ca-solar": "/solar/san-dimas-ca",
  "/temecula-ca-solar": "/solar/temecula-ca",
  "/upland-ca-solar": "/solar/upland-ca",
  "/upland-ca-solar-2": "/solar/upland-ca",
  "/walnut-ca-solar": "/solar/walnut-ca",
  "/west-covina-ca-solar": "/solar/west-covina-ca",
  "/yucaipa-ca-solar": "/solar/yucaipa-ca",

  // Blog / article pages
  "/3-types-of-solar-panels": "/blog",
  "/5-benefits-of-using-solar-power": "/blog",
  "/cleaning-your-solar-panels-heres-some-tips": "/blog",
  "/do-solar-communities-do-it-better": "/blog",
  "/environmentally-friendly-camping": "/blog",
  "/fun-facts-about-solar-energy": "/blog",
  "/get-your-tax-credit-by-2020": "/blog",
  "/how-effective-are-solar-panels-during-winter": "/blog",
  "/how-much-maintenance-do-solar-panels-require": "/blog",
  "/reducing-pollution-with-solar-power": "/blog",
  "/rewind-when-solar-panels-were-invented": "/blog",
  "/solar-delivers-more-than-renewable-energy": "/blog",
  "/solar-power-101": "/blog",
  "/solar-power-benefits-in-treasure-valley": "/blog",
  "/solar-power-is-becoming-a-reality-in-the-auto-industry": "/blog",
  "/solar-power-reaches-new-heights-with-window-technology": "/blog",
  "/solar-power-saving-the-planet-and-your-wallet-one-watt-at-a-time": "/blog",
  "/solar-vs-wind-energy-which-alternative-energy-is-right-for-you": "/blog",
  "/the-30-federal-solar-tax-credit-is-ending-soon": "/blog",

  // Quote / form pages
  // "/get-quote" intentionally omitted — it's a real page, no redirect needed
  "/upload-utility-bill": "/upload-bill",
  "/upload-your-data": "/upload-bill",
  "/proposal": "/get-quote",
  "/solar-proposal": "/get-quote",
  // Legal pages — NOTE: /terms-and-conditions and /privacy-policy are handled by staticPages.ts (server-side HTML)
  // Do NOT add redirects for those paths here or they will intercept the static HTML routes

  // Thank you — /thank-you is handled by React router (ThankYou.tsx), do NOT redirect here
  // /thank-you-quote also handled by React

  // Referral application aliases — required for existing iOS WebView app installations
  "/referral-program": "https://app.pellsolar.com/app",
  "/referral-app": "https://app.pellsolar.com/app",
  "/referral-app.html": "https://app.pellsolar.com/app",

  // Old internal/admin pages — redirect to homepage
  "/deal-intel": "/",
  "/customer-referrals": "/",
  "/salesman-portal": "/",
  "/solar-pro": "/",
  // "/solar-demo" intentionally omitted — it's a real page, no redirect needed
  "/pell-solar-referral-admin": "/",
  "/idaho-solar-offer": "/idaho",
  "/california-solar-offer": "/california",
};

// Register all redirects as 301 permanent redirects
for (const [from, to] of Object.entries(redirectMap)) {
  router.get(from, (_req, res) => {
    res.redirect(301, to);
  });
}

export default router;
