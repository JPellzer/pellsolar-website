# Pell Solar CRM — Master Project Brief

**Last Updated:** May 15, 2026  
**Session Updated:** August 21, 2026 (this session)
**Maintained by:** Manus AI  
**Purpose:** This document is the single source of truth for every credential, login, system endpoint, architectural decision, and completed task on the Pell Solar website project. Any new AI session should read this file first before taking any action.

---

## 1. Business Identity

| Field | Value |
|---|---|
| Company Name | Pell Solar Inc. |
| Owner | Josh (josh@pellsolar.com) |
| Founded | 2003 (22+ years in business) |
| Type | Family-owned solar contractor |
| Physical Address | 1326 Monte Vista Ave #7, Upland, CA 91786 |
| General Email | info@pellsolar.com |
| Toll-Free Phone | (866) 646-8499 |
| California Local Phone | (714) 455-3401 | *(corrected from 880-4416 on May 15, 2026)*
| CSLB License | #949122 — C-46 Solar Contractor |
| Service Areas | **California and Idaho ONLY** (Arizona was removed — do not add it back) |
| Certifications | Tesla Certified Installer |

---

## 2. Website — Live Site

| Field | Value |
|---|---|
| Live Domain | https://pellsolar.com |
| Alternate Domain | https://www.pellsolar.com |
| Manus Preview Domain | https://pellcrm-uznuytd2.manus.space |
| Dev Server (sandbox) | https://3000-i9mpkv7c2kcsstnkzlhdg-05484b99.us1.manus.computer |
| Project Path (sandbox) | /home/ubuntu/pell-solar-crm |
| Manus Project ID | UzNUyTd222pkxN2KfqQwdX |
| Latest Checkpoint | c2aba632 (May 15, 2026) |
| Latest Checkpoint (Aug 21) | e6956e8f — quote conversion dedup + signed bill-link fix |

**To publish:** Click the **Publish** button in the Manus UI after saving a checkpoint. Never attempt to deploy via CLI.

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Tailwind CSS 4 + Wouter (routing) |
| Backend | Express 4 + tRPC 11 |
| ORM | Drizzle ORM |
| Database | MySQL / TiDB (managed by Manus) |
| Build Tool | Vite 7 + esbuild |
| Language | TypeScript (strict, 0 errors enforced) |
| Package Manager | pnpm |
| Testing | Vitest |
| File Storage | Manus S3 (via `storagePut` / `storageGetSignedUrl`) |

**Key commands:**

```bash
cd /home/ubuntu/pell-solar-crm
pnpm dev          # Start dev server (port 3000)
pnpm build        # Production build → dist/
npx tsc --noEmit  # TypeScript check (must be 0 errors before checkpoint)
pnpm test         # Run Vitest tests
```

---

## 4. Credentials & Logins

> **Security note:** These credentials are stored in this document for AI session continuity. Do not expose them in client-side code or commit them to public repositories.

### 4.1 Twilio (SMS)

| Field | Value |
|---|---|
| Account SID | `ACc7958dad4921d32aa226f21267c12f66` |
| Auth Token | `d23575e50ff8fce033559daaf34db3fd` |
| From Number (CA Local) | `+17144553401` |
| Notify Number (Josh's phone) | Stored as `TWILIO_NOTIFY_NUMBER` env secret |
| Login Email | josh@pellsolar.com |
| Login Password | NireLlep4500$ |
| Console URL | https://console.twilio.com |

**A2P 10DLC Status (as of May 15, 2026):**

| Field | Value |
|---|---|
| Brand SID | `BNd1f239d50ad5312c10ee079c557a8981` |
| Brand Status | APPROVED / VERIFIED |
| Campaign 1 SID | `QE2c6890da8086d771620e9b13fadeba0b` |
| Campaign 1 Status | IN_PROGRESS (submitted May 13, 2026) |
| Campaign 1 Service | `MG75c2ee901445181dd0e01fa6023ed8a9` — customer-facing SMS |
| Campaign 2 SID | `QE2c6890da8086d771620e9b13fadeba0b` |
| Campaign 2 Status | IN_PROGRESS (submitted May 13, 2026) |
| Campaign 2 Service | `MG8042bab039d3dec08429976284d40bd4` — internal owner notifications |

Both campaigns have `campaign_id: null` — this is normal. Carriers assign a campaign ID once approved (typically 3–5 business days). No action needed until a campaign fails or is approved.

**To check A2P status at any time:**
```bash
python3 /home/ubuntu/twilio_a2p.py
```

### 4.2 Google Accounts

| Account | Email | Password | Notes |
|---|---|---|---|
| Google Ads / Analytics | josh@pellsolar.com | NireLLep3500$ | Login has been unreliable — may need reset |
| Google Tag Manager | Unknown | Unknown | GTM-K973H9X container exists but owner is unknown — **all conversion tracking has been moved to direct code, GTM is not required** |

### 4.3 Facebook / Meta

| Field | Value |
|---|---|
| Pixel ID | `1425971062887858` |
| Access | Via Meta Business Suite (josh@pellsolar.com) |

### 4.4 Apple Developer Account (iOS App)

| Field | Value |
|---|---|
| Apple ID | josh@pellsolar.com |
| Password | NireLLep3500$ |
| App-Specific Password | rwit-icqv-hifj-pftt |
| App Store Connect URL | https://appstoreconnect.apple.com |
| App Store App ID | 6760663938 |
| App Store Connect Direct Link | https://appstoreconnect.apple.com/apps/6760663938 |
| App Name | Pell Solar Referral |
| Bundle ID | `com.pellsolar.Pell-Solar-Referral` |
| Current Approved Version | 1.0 — referral app only (WebView pointing to old WordPress URL) |
| Pending v2 | Customer portal (My Project tab) — needs resubmission |
| WebView URL for v2 | `https://pellsolar-crm-prod.onrender.com/app` |
| Xcode Project | **No Xcode project exists** — original was built externally and is lost. Must create new project from scratch using XCODE_INSTRUCTIONS.md |
| Xcode Instructions | `/home/ubuntu/pell-solar-xcode/XCODE_INSTRUCTIONS.md` — complete step-by-step guide |
| Xcode Instructions (Aug 21) | XCODE_INSTRUCTIONS.md file was not found in sandbox; instructions were lost when the sandbox hibernated. Josh must create a new Xcode WebView project manually using the steps in section 4.4 below. |
| Google Play Store | Blocked — pending IRS CP 575 letter from accountant + Android Studio build |
| Pending Agreement | Apple Developer Program License Agreement update must be accepted before submission (yellow banner in App Store Connect) |
| iOS Submission Status (Aug 21) | WAITING — Josh must open Xcode, create a new WebView project targeting https://pellsolar-crm-prod.onrender.com/app, archive, and submit version 2.0 |

**What changed in v2 (customer portal additions):**
- "My Project" tab in bottom nav (hidden unless `is_customer=true` on the account)
- 6-step visual install progress tracker (Contract Signed → Permits → Install Scheduled → Installation → Inspection → System Activated)
- Documents tab — contracts, permits, warranties
- Messaging — customer can message the office from the app
- Account deletion feature (already in v1 per Apple requirement)

**Apple resubmission steps (once Xcode project is located):**
1. Open Xcode project
2. Change WebView URL from `pellsolar.com/referral-app/` to `https://pellsolar-crm-prod.onrender.com/app`
3. Bump version number (1.0 → 2.0 or 1.1)
4. Archive → Distribute App → App Store Connect
5. Log into appstoreconnect.apple.com with josh@pellsolar.com / NireLLep3500$
6. Add new screenshots showing My Project tab
7. Update app description to mention customer portal
8. Submit for review

### 4.5 External CRM (Claude/Harold)

| Field | Value |
|---|---|
| CRM App URL | https://app.pellsolar.com |
| CRM Backend URL | https://pellsolar-crm-prod.onrender.com |
| Booking URL | https://app.pellsolar.com/book?deal_id={deal_id} |
| Team Login | https://pellsolar-crm-prod.onrender.com/ |
| Referral App | https://pellsolar-crm-prod.onrender.com/app |
| Built by | Claude (Harold) — separate system, not part of this codebase |

---

## 5. Environment Secrets (Manus-managed)

These are injected automatically by the Manus platform. Never hardcode them. Use `webdev_request_secrets` to add or update.

| Secret Key | Purpose |
|---|---|
| `TWILIO_ACCOUNT_SID` | Twilio account SID for SMS |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_FROM_NUMBER` | SMS from number (+17144553401) |
| `TWILIO_NOTIFY_NUMBER` | Josh's phone number for lead notifications |
| `DATABASE_URL` | MySQL/TiDB connection string |
| `JWT_SECRET` | Session cookie signing |
| `BUILT_IN_FORGE_API_URL` | Manus storage/LLM API base URL |
| `BUILT_IN_FORGE_API_KEY` | Manus API bearer token (server-side) |
| `VITE_FRONTEND_FORGE_API_KEY` | Manus API bearer token (client-side) |
| `VITE_APP_ID` | Manus OAuth app ID |
| `OAUTH_SERVER_URL` | Manus OAuth backend |
| `VITE_OAUTH_PORTAL_URL` | Manus login portal (frontend) |
| `OWNER_OPEN_ID` | Josh's Manus open ID |
| `OWNER_NAME` | Josh's display name |

---

## 6. Tracking & Analytics

All tracking is implemented via **direct code** — GTM is present but not relied upon (owner unknown).

| System | ID / Tag | Location |
|---|---|---|
| Google Tag Manager | GTM-K973H9X | `client/index.html` — present but not actively used |
| Google Tag | GT-PHGH35SZ / AW-17865947343 | `client/index.html` — single verified Google tag (no GTM, no AW-17468390983) |
| Google Analytics 4 | G-GDLGN2498Y | Destination of GT-PHGH35SZ — no separate loader |
| Google Ads Lead Conversion | AW-17865947343/TI2CCLSThPQbEM_xksdC | `ThankYou.tsx` — fires ONLY when `lead_id` param present (confirmed quote) |
| Google Ads Phone Conversion | AW-17865947343/oC4xCJL7x-UcEM_xksdC | `shared/phoneTracking.ts` — fires on every tel: click |
| Facebook Pixel | 1425971062887858 | `client/index.html` — base PageView on all pages |
| Facebook Lead Event | fbq('track', 'Lead') | `ThankYou.tsx` — fires ONLY when `lead_id` param present |

---

## 7. CRM Integration Architecture

### 7.1 Lead Form Flow (Quote / Upload Bill)

1. User submits quote form at `/get-quote` or upload form at `/upload-bill`
2. Frontend calls `trpc.leads.create` (tRPC mutation)
3. Server saves lead to local MySQL database
4. Server sends SMS notification to Josh via Twilio
5. Server sends in-app notification via `notifyOwner()`
6. Server POSTs to CRM webhook: `POST https://app.pellsolar.com/api/webhooks/website-lead`
7. CRM returns `{ deal_id }` — passed to `/thank-you?deal_id=XXX`
8. Thank You page shows "Schedule My Consultation" button linking to `https://app.pellsolar.com/book?deal_id=XXX`

**CRM Webhook Payload** (`server/crmWebhook.ts`):
```json
{
  "first_name": "...", "last_name": "...", "email": "...", "phone": "...",
  "address": "...", "city": "...", "state": "...", "zip": "...",
  "bill_file_url": "https://... (presigned S3 URL)",
  "bill_file_name": "filename.pdf",
  "type": "new_lead",
  "source": "quote-page",
  "utm_data": { "utm_source": "...", "gclid": "..." }
}
```

### 7.2 Service Form Flow (Solar Repair)

1. User submits service form at `/solar-repair`
2. Frontend calls `trpc.service.submitCall` (tRPC mutation)
3. Server calls `GET https://pellsolar-crm-prod.onrender.com/api/check-customer?phone=...` to check if existing customer
4. Server POSTs to `https://pellsolar-crm-prod.onrender.com/api/webhooks/service-intake` with full tech brief
5. Server sends SMS notification to Josh
6. Returns `{ success, deal_id }` → redirects to `/thank-you?deal_id=XXX`

### 7.3 File Upload (Utility Bills)

Files are uploaded via `POST /api/upload-bill` (handled in `server/uploadRoute.ts`):

1. Frontend sends base64-encoded file
2. Server calls `storagePut()` → stores in Manus S3, returns `/manus-storage/{key}` URL (browser-only)
3. Server calls `storageGetSignedUrl()` → returns a **presigned S3 URL** (accessible by external servers)
4. Response includes both `url` (browser display) and `publicUrl` (CRM download)
5. Frontend uses `result.publicUrl || result.url` as `billFileUrl` sent to CRM
6. CRM downloads the file from the presigned S3 URL and auto-files it to the deal's Utility folder

> **Critical:** `/manus-storage/` URLs are browser-session-bound and return 403 to external servers like the CRM on Render. Always use `publicUrl` (presigned S3) when sending file URLs to the CRM.

---

## 8. Site Structure — All Routes

### Public Pages
| Path | Component | Description |
|---|---|---|
| `/` | Home | Homepage with hero, savings widget, how it works, reviews, referral, FAQ |
| `/get-quote` | QuotePage | 8-step multi-step quote form |
| `/upload-bill` | UploadBill | SCE Green Button data upload with instructions |
| `/upload-your-bill` | UploadBill | Alias |
| `/thank-you` | ThankYou | Confirmation page — fires FB Lead + Google Ads conversion |
| *(Aug 21 update)* | ThankYou | Conversions now require `?lead_id=N` in URL — direct visits do not fire |
| `/solar-repair` | SolarRepair | Service request form with AI diagnosis |
| `/schedule` | ScheduleCall | Schedule a call page |
| `/solar-demo` | SolarDemo | Interactive solar energy flow demo |

### Service Pages
| Path | Description |
|---|---|
| `/solar-panel-systems` | Solar panel systems |
| `/tesla-powerwall` | Tesla Powerwall 3 |
| `/battery-backup` | Battery backup ($142/$208/mo pricing) |
| `/ev-charging` | EV charging |
| `/financing` | Financing options + 30% ITC lease info |
| `/service-warranty` | Service & warranty |
| `/solar-lease` | Solar lease |
| `/nem-3` | NEM 3.0 explainer |

### Company Pages
| Path | Description |
|---|---|
| `/about` | About Us |
| `/reviews` | Customer reviews |
| `/our-work` | Photo gallery (pulls from DB) |
| `/referral-program` | Referral program ($2,000 reward) |
| `/blog` | Blog index |
| `/blog/:slug` | Individual blog articles (14 articles) |

### Location Pages
| Path | Description |
|---|---|
| `/california` | California solar page |
| `/idaho` | Idaho solar page |
| `/solar/anaheim-ca` through `/solar/ventura-ca` | 34 California city pages |

### Legal / Compliance Pages
| Path | Description |
|---|---|
| `/privacy-policy` | Privacy policy (React SPA + static HTML at `/privacy-policy/index.html`) |
| `/terms` | Terms and conditions |
| `/terms-and-conditions` | Alias — also served as static HTML at `/terms-and-conditions/index.html` |
| `/sms-updates` | SMS opt-in page |

### Admin Pages (protected — requires Manus OAuth)
| Path | Description |
|---|---|
| `/admin` | CRM dashboard — leads pipeline + service requests |
| `/admin/leads/:id` | Lead detail view |
| `/admin/photos` | Photo upload and management |

---

## 9. SMS Compliance (Twilio A2P 10DLC)

### What Was Done
- Static HTML pages created at `/terms-and-conditions/index.html` and `/privacy-policy/index.html` in `client/public/` — served directly by CDN, no JavaScript required (carrier bots can read them)
- Server-side routes also serve these pages via `server/staticPages.ts` as a fallback
- SMS opt-in checkboxes added to both the quote form (`/get-quote` Step 8) and service form (`/solar-repair`)
- Opt-in language includes: program name, message frequency, STOP to opt out, HELP for help, Msg & data rates may apply, links to Terms and Privacy

### Compliance URLs (must remain live)
- https://pellsolar.com/terms-and-conditions
- https://pellsolar.com/privacy-policy

### Campaign Details
Both campaigns were submitted May 13, 2026 and are IN_PROGRESS. The website was published before submission so carrier bots could verify the opt-in pages. No further action needed until carrier responds.

---

## 10. Database Schema

Tables in MySQL/TiDB (managed via Drizzle ORM):

| Table | Purpose |
|---|---|
| `users` | Manus OAuth users (admin access) |
| `leads` | All quote/upload-bill form submissions |
| `project_photos` | Job photos for the Our Work gallery |

The `leads` table stores: name, email, phone, address, ownership type, monthly bill range, interest type, bill file key/URL/name, status, source, notes, timestamps.

---

## 11. Key Files Reference

| File | Purpose |
|---|---|
| `server/routers.ts` | All tRPC procedures — leads.create, service.submitCall, crm.submitLead |
| `server/crmWebhook.ts` | CRM webhook proxy — POSTs to app.pellsolar.com |
| `server/uploadRoute.ts` | File upload endpoint — returns `url` + `publicUrl` (presigned S3) |
| `server/storage.ts` | S3 storage helpers — `storagePut`, `storageGetSignedUrl` |
| `server/_core/sms.ts` | Twilio SMS helper — `sendSms(to, body)` |
| `server/_core/env.ts` | All environment variable bindings |
| `server/staticPages.ts` | Server-side HTML routes for /terms-and-conditions and /privacy-policy |
| `server/redirects.ts` | 301 redirects from old WordPress URLs |
| `client/index.html` | GTM, GA4, Google Ads, Facebook Pixel scripts |
| `client/src/pages/ThankYou.tsx` | Fires FB Lead event + Google Ads conversion on load |
| `client/src/pages/QuotePage.tsx` | 8-step quote form — uses `publicUrl` for bill uploads |
| `client/src/pages/UploadBill.tsx` | Upload bill page — uses `publicUrl` for bill uploads |
| `client/src/pages/SolarRepair.tsx` | Service form — calls CRM service-intake webhook |
| `client/src/App.tsx` | All route definitions |
| `drizzle/schema.ts` | Database table definitions |
| `todo.md` | Project task tracking (all items) |
| `MASTER_BRIEF.md` | This file |

---

## 12. Utility Scripts (Sandbox Only)

These Python scripts live in `/home/ubuntu/` and run in the Manus sandbox. They are NOT part of the deployed app.

| Script | Purpose |
|---|---|
| `twilio_a2p.py` | Check A2P brand + campaign status, list messaging services |
| `twilio_api.py` | General Twilio API calls |
| `twilio_detail.py` | Detailed campaign inspection |
| `twilio_fix_campaign.py` | Campaign fix/resubmit helper |
| `twilio_submit.py` | Campaign submission helper |

---

## 13. Completed Work History (Chronological)

The following is a complete record of all work completed on this project, organized by phase.

### Foundation (April 2026)
The project began as a full rebuild of the old WordPress pellsolar.com site into a modern React + tRPC stack. The initial build included the leads database, multi-step quote form, bill upload, admin CRM dashboard, and all service/location pages.

### Phase 3–6: Visual Overhaul
Multiple rounds of visual redesign to match the original pellsolar.com exactly — correct navy blue (#0B1D51) color scheme, real company fonts, hero images, real customer reviews, and all 34 California city pages.

### Phase 7: Blog + Additional Pages
14 blog articles written covering solar topics. Our Work gallery, Arizona page (later removed), Terms, Privacy, and SMS Updates pages added.

### Phase 15–18: Referral Program
Referral program section added to homepage, standalone `/referral-program` page built with green money theme, navbar and footer links added.

### Phase 19: Twilio SMS Lead Notifications
SMS notifications implemented for all three lead paths (quote form, financing form, service form). Each SMS sent to Josh's phone includes name, phone (with clickable +1 format), email, address, and relevant details.

### Phase 20: 301 Redirects
~80 old WordPress URL redirects added covering city pages, service pages, blog posts, and admin pages.

### Phase 21: Real Job Photos + Admin Gallery
16 real job photos from old site uploaded to CDN, seeded into `project_photos` DB table. Our Work gallery and admin photo upload tool built.

### Phase 22–25: Admin + OAuth
Admin dashboard fixed for production (static imports). OAuth return URL fixed so login from `/admin` redirects back to `/admin`. Logout button added.

### Phase 26: Google Analytics
GA4 (G-GDLGN2498Y) and GTM (GTM-K973H9X) added to `index.html`.

### Duplicate Lead Prevention
Backend deduplication by phone/email. Frontend submit button disabled after first click. `/thank-you` redirect added.

### Phase 31–32: Schedule Consultation CTA
`deal_id` from CRM response passed through to `/thank-you` page. "Schedule My Consultation" button added linking to `https://app.pellsolar.com/book?deal_id=XXX`. Works for both new and returning customers.

### Twilio A2P 10DLC Compliance (May 13, 2026)
- Static HTML terms/privacy pages created in `client/public/` (CDN-served, no JS)
- Server-side routes added in `server/staticPages.ts` as fallback
- SMS opt-in checkboxes added to quote form and service form
- Failed campaign deleted, new campaign re-submitted with correct opt-in language
- Site published before re-submission so carrier bots could verify pages

### Phone Number Update (May 13, 2026)
California local number (714) 455-3401 added alongside (866) 646-8499 across: Navbar, Home, Financing, SolarRepair, UploadBill, ThankYou, Terms, PrivacyPolicy, CityPageTemplate, and static HTML pages.

### Arizona Removal (May 13, 2026)
All Arizona references removed: Navbar Locations dropdown, Footer service areas, App.tsx routes, sitemap.xml, license text in QuotePage and AboutUs.

### Tesla Powerwall Image Fix (May 13, 2026)
Broken image on homepage NEM 3.0 section fixed — re-uploaded to Manus storage with new key.

### Service Form Bug Fix (May 13, 2026)
Service form was sending `customer_id` in the CRM payload, causing 400 errors. Removed — CRM handles existing customer matching by phone number on its own.

### Facebook Pixel + Google Ads Tracking (May 14, 2026)
- Facebook Pixel (1425971062887858) base code added to `index.html` (all pages)
- `fbq('track', 'Lead')` event added to `ThankYou.tsx`
- Google Ads conversion event (`AW-17865947343/TI2CCLSThPQbEM_xksdC`) added to `ThankYou.tsx`
- `gtag('config', 'AW-17865947343')` added to `index.html`
- GTM bypassed entirely — direct code used instead (GTM account owner unknown)

### CRM Address Bug Fix (May 14, 2026)
City, state, and zip now sent as separate fields to CRM webhook (previously only full address string was sent).

### CRM Bill URL Bug Fix (May 14, 2026)
Bill URL converted from relative `/manus-storage/` path to full `https://pellsolar.com` URL before sending to CRM.

### CRM Bill File Auto-Filing (May 14, 2026)
`crmWebhook.ts` and `routers.ts` updated to send `bill_file_url` and `bill_file_name` as dedicated fields. CRM (Claude/Harold, commit dfc9840) has a bridge that auto-files uploaded bills to the deal's Utility folder.

### S3 Presigned URL Fix (May 14–15, 2026)
`server/uploadRoute.ts` updated to call `storageGetSignedUrl()` after upload and return `publicUrl` (presigned S3 URL) alongside `key` and `url`. `QuotePage.tsx` and `UploadBill.tsx` both updated to use `result.publicUrl || result.url` as `billFileUrl` sent to CRM. This fixes 403 errors when the CRM (on Render) tries to download uploaded files.

### Google Tag Consolidation + Conversion Dedup (August 21, 2026)
- Removed duplicate AW-17468390983 tag and GTM loader; consolidated to single GT-PHGH35SZ serving both Google Ads and GA4.
- Added `googleads.g.doubleclick.net` to production CSP.
- Wired phone-call conversion label AW-17865947343/oC4xCJL7x-UcEM_xksdC to every tel: click.
- Quote conversion dedup: `QuotePage.tsx` now passes server-confirmed `lead_id` to `/thank-you`; `ThankYou.tsx` only fires Google Ads and Facebook Lead conversions when `lead_id` is present, and uses a session-storage marker to prevent refresh double-counting.

### Signed Bill-Link Reliability Fix (August 21, 2026)
- `storageGetSignedUrl` in `uploadRoute.ts` now explicitly requests a 7-day (604800 s) expiry.
- `routers.ts` `leads.create` now calls `storageGetSignedUrl(billFileKey, 604800)` directly to generate a fresh seven-day signed URL for every CRM payload, replacing the browser-session-bound `/manus-storage/` fallback.
- External (non-signed) `billFileUrl` values from the upload route are still forwarded if no key is present.
- Regression test updated to assert the signed URL is requested with the correct expiry.

---

## 14. Known Limitations & Future Work

| Item | Status |
|---|---|
| Add real Powerwall install photo to Tesla Powerwall page | Future — deferred (need photo from Josh) |
| Powerwall install photos (Aug 21) | DONE — 5 real photos added to TeslaPowerwall page and portfolio gallery |
| Add crew selfie photo to About Us page | Future — deferred (need photo from Josh) |
| Twilio A2P campaign carrier approval | Waiting — IN_PROGRESS since May 13, 2026 |
| GTM container (GTM-K973H9X) | Present in code but not actively used — owner unknown |
| iOS v2 submission | WAITING — Josh must open Xcode and archive; Xcode instructions file was lost in sandbox hibernation |
| DMARC cleanup | WAITING — Josh must provide GoDaddy DNS access or current _dmarc TXT record value |
| Roger Fumey CRM entry | WAITING — Josh must provide correct customer data |
| Google Play submission | WAITING — Josh's Google Play account verification must complete |
| Enhanced conversions retest | WAITING — give Google Ads diagnostics a few days to update after the CSP + tag consolidation fix |

---

## 15. How to Resume Work in a New Session

When starting a new session on this project:

1. Read this file (`MASTER_BRIEF.md`) first
2. Read `todo.md` to see all completed and pending items
3. Run `webdev_check_status` to confirm the dev server is running
4. Check Twilio A2P status if relevant: `python3 /home/ubuntu/twilio_a2p.py`
5. Before any checkpoint: run `npx tsc --noEmit` (must be 0 errors) then `pnpm build`
6. After checkpoint: remind Josh to click **Publish** in the Manus UI

**Josh's preferences:**
- He wants things done correctly the first time — no rework
- He wants the AI to handle everything autonomously without acting as an intermediary
- He does not want to be asked for information that is already in this document
- All decisions should be made and executed without back-and-forth unless a user action is genuinely required (e.g., clicking Publish)
