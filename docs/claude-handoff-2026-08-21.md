# Pell Solar Website Handoff for Claude

Paste the following into Claude:

---

I am taking over maintenance of the **Pell Solar** full-stack website at `pellsolar.com`. The app is React 19 + Tailwind 4 + Express + tRPC + MySQL/Drizzle, located at `/home/ubuntu/pell-solar-crm`.

## Current checkpoint and deployment state

The latest code checkpoint is **`18d145ac`**. It includes the current Google Ads website-call conversion wiring. It is validated locally but needs the owner to click **Publish** if that checkpoint has not already been published in the Manus UI. Do not use a separate deployment process.

## Latest Google measurement configuration

Google Ads account **152-152-2054** confirmed the authoritative Google tag is:

```text
Google tag: GT-PHGH35SZ
Google Ads destination: AW-17865947343
GA4 destination: G-GDLGN2498Y
```

The website now deliberately uses **one** Google loader:

```html
https://www.googletagmanager.com/gtag/js?id=GT-PHGH35SZ
```

It configures both `AW-17865947343` and `G-GDLGN2498Y`. The old GTM loader (`GTM-K973H9X`), its noscript iframe, and the unowned Ads tag `AW-17468390983` were removed from executable website code. Do **not** reintroduce another GA4, GTM, or Ads loader.

The production CSP permits:

```text
https://www.googletagmanager.com
https://googleads.g.doubleclick.net
https://connect.facebook.net
```

The Google Ads lead conversion fires only on the Thank You page after a completed quote:

```text
AW-17865947343/TI2CCLSThPQbEM_xksdC
```

The user has already completed the Google Ads account configuration:

1. **Submit lead form (Page load pellsolar.com/thank-you)** is now **Secondary**.
2. **Submit lead form (pellsolar.com/)** is still **Primary**.
3. **Click to call (1)** was created as a **Primary** website phone-call conversion.

Every `tel:` link now fires both of these events exactly once, without blocking the call action:

```js
gtag('event', 'phone_click', {
  phone_number,
  link_url,
  link_location
});

gtag('event', 'conversion', {
  send_to: 'AW-17865947343/oC4xCJL7x-UcEM_xksdC',
  value: 1.0,
  currency: 'USD'
});
```

This was tested against the production build with `window.gtag` stubbed: one `phone_click` and one `conversion` event emitted. **Do not add another call conversion tag.**

Enhanced conversions should be rechecked in Google Ads a few days after the latest publish. If diagnostics still show an error, the next change should be narrowly scoped to passing consented quote email/phone data at conversion time—not another tag or page-load conversion.

## Other completed recent website repairs

1. **Referral app redirects:** `/referral-program`, `/referral-app`, and `/referral-app.html` permanently redirect with HTTP 301 to `https://app.pellsolar.com/app`.
2. **Navigation:** desktop dropdowns use reliable browser-native controls and close on mouse leave, outside click, Escape, link selection, route change, or opening another menu. Mobile accordions remain independent.
3. **SEO/SSR:** public sitemap routes return crawler-visible HTML with unique metadata, canonical URLs, H1s, and one LocalBusiness schema block. Admin/private routes remain excluded.
4. **City coverage:** `/solar/upland-ca` was restored, and 21 additional active-LSA-territory city pages were added. Footer has internal links to every indexed solar city page, including Upland and Eastvale.
5. **Lead attribution:** UTM source/medium/campaign/term and `gclid` persist across a visitor session. `gclid` or `utm_source=google` maps source to `google-ads`; non-Google UTM source passes through; no parameters falls back to `quote-page`. Two approved live tests landed in the CRM correctly:
   - Test GoogleAds: source `google-ads`, CRM deal `14496`
   - Test QuotePage: source `quote-page`, CRM deal `14497`
6. **Visual repairs:** restored a broken Solar Repair hero, server rendering for `/upload-bill`, invalid California/Idaho map embeds, and the NEM/homepage Powerwall image. The Powerwall fix includes cache-busting plus an image fallback on relevant pages.

## Validation currently in place

The latest checkpoint passed TypeScript, production build, and **59 Vitest tests**. Relevant tests include:

```text
server/googleTagConfig.test.ts
server/phoneTracking.test.ts
server/attribution.test.ts
server/navbar.test.ts
server/visualAssets.test.ts
server/seo.test.ts
```

## Important constraints

1. Do not fabricate testimonials, reviews, review counts, ratings, or history claims.
2. Do not remove or change the static footer NAP, phone links, or CSLB #949122 without owner approval.
3. Do not remove out-of-area city pages unless Josh explicitly asks.
4. Do not create test leads in production without explicit Josh approval; previous test leads were expressly approved.
5. Do not publish automatically. Save a checkpoint and have Josh click Publish.

## Remaining follow-ups — not code changes to make now

1. Wait several days after the latest publish, then review Google Ads enhanced-conversion diagnostics. Only if still failing should consented quote contact data be passed with the conversion event.
2. DMARC aggregate reports are still pending: update only the `rua=mailto:` recipient in the GoDaddy `_dmarc.pellsolar.com` record after Josh signs in or provides the record; preserve the DMARC policy itself.
3. Real Powerwall install and crew images remain future content tasks and require Josh’s approved photos.

---

Project-specific audit notes are in:

```text
docs/google-tag-audit-2026-08-21.md
docs/google-ads-account-steps-2026-08-21.md
docs/visual-audit-2026-08-18.md
```
