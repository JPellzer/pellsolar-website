# Pell Solar CRM — Project Log

> **IMPORTANT FOR MANUS:** Read this file at the start of every session before answering any question about what has been built, what files exist, or what is pending. This is the authoritative record of all work done across all sessions.

---

## How to Use This File

- **Before answering "did you build X?"** — search this file first.
- **After completing any work** — add an entry to the relevant section below.
- **File paths are absolute** unless noted otherwise.
- **Sandbox artifacts** (APKs, exports) live in `/home/ubuntu/` and persist across sessions unless the sandbox is reset.

---

## Project Overview

**Live site:** https://pellsolar.com (also https://www.pellsolar.com)  
**Staging/admin:** https://pellcrm-uznuytd2.manus.space  
**Project path:** `/home/ubuntu/pell-solar-crm`  
**Stack:** React 19 + Tailwind 4 + Express 4 + tRPC 11 + MySQL (Drizzle ORM)  
**Features enabled:** db, server, user (Manus Auth)

---

## Database Tables (drizzle/schema.ts)

| Table | Purpose |
|---|---|
| `users` | Manus OAuth users (admin access) |
| `leads` | Quote form submissions from the website |
| `project_photos` | Gallery photos for /our-work page |
| `unsubscribes` | Email unsubscribe records for compliance |

---

## Website Pages Built

### Core Pages
| Route | File | Notes |
|---|---|---|
| `/` | `Home.tsx` | Full homepage matching pellsolar.com |
| `/get-quote` | `QuotePage.tsx` | Multi-step quote form (6 steps) |
| `/about` | `AboutUs.tsx` | About Us page |
| `/reviews` | `Reviews.tsx` | Customer reviews with Google/Yelp logos |
| `/schedule` | `ScheduleCall.tsx` | Schedule a call page |
| `/privacy-policy` | `PrivacyPolicy.tsx` | Privacy policy |
| `/terms` | `Terms.tsx` | Terms and conditions |
| `/sms-updates` | `SmsOptIn.tsx` | SMS opt-in page |
| `/solar-demo` | `SolarDemo.tsx` | Solar demo page |
| `/upload-bill` | `UploadBill.tsx` | Utility bill upload page |
| `/thank-you` | `ThankYou.tsx` | Post-quote thank you page |
| `/our-work` | `OurWork.tsx` | Project photo gallery |
| `/referral-program` | `ReferralProgram.tsx` | Referral program page — includes App Store button + "Coming Soon to Google Play" badge |
| `/unsubscribe` | `Unsubscribe.tsx` | Email unsubscribe page (reads ?email=&token= from URL) |
| `/blog` | `Blog.tsx` | Blog index (14 articles) |
| `/blog/:slug` | `BlogArticle.tsx` | Individual blog article |

### Service Pages
| Route | File |
|---|---|
| `/solar-panel-systems` | `SolarSystems.tsx` |
| `/tesla-powerwall` | `TeslaPowerwall.tsx` |
| `/battery-backup` | `BatteryBackup.tsx` |
| `/ev-charging` | `EVCharging.tsx` |
| `/financing` | `Financing.tsx` |
| `/solar-repair` | `SolarRepair.tsx` |
| `/service-warranty` | `ServiceWarranty.tsx` |
| `/solar-lease` | `SolarLease.tsx` |
| `/nem-3` | `NEM30.tsx` |

### State Pages
| Route | File |
|---|---|
| `/california` | `California.tsx` |
| `/idaho` | `Idaho.tsx` |
| `/arizona` | `Arizona.tsx` |

### Admin Pages (login required)
| Route | File | Notes |
|---|---|---|
| `/admin` | `AdminDashboard.tsx` | Lead list, pipeline stats, CSV export |
| `/admin/leads/:id` | `LeadDetail.tsx` | Full lead detail, bill preview, notes, status |
| `/admin/photos` | `AdminPhotos.tsx` | Upload/manage project photos |
| `/admin/unsubscribes` | `AdminUnsubscribes.tsx` | Unsubscribe compliance records, search, CSV export |

### City Pages (35 pages)
All under `/solar/{city}-ca` — Anaheim, Bakersfield, Baldwin Park, Brea, Burbank, Chino, Chino Hills, Corona, El Monte, Fontana, Fresno, Fullerton, Garden Grove, Glendora, Inland Empire, Irvine, La Habra, Lakewood, Lancaster, Long Beach, Los Angeles, Murrieta, Ontario, Orange, Palmdale, Pomona, Rancho Cucamonga, Riverside, San Bernardino, Santa Ana, Temecula, Thousand Oaks, Torrance, Ventura.

---

## Server-Side Features

### tRPC Procedures (server/routers.ts)
- `leads.create` — submit quote form, saves to DB, fires CRM webhook, sends owner notification
- `leads.getAll` — admin: list all leads with filters
- `leads.getById` — admin: single lead detail
- `leads.updateStatus` — admin: change lead status
- `leads.updateNotes` — admin: save notes
- `leads.export` — admin: CSV export
- `photos.upload` — admin: upload project photo to S3
- `photos.list` — public: list project photos
- `photos.delete` — admin: delete photo
- `unsubscribe.generateToken` — public: generate HMAC-SHA256 signed token (30-day expiry)
- `unsubscribe.process` — public: verify token, log to DB, call SendGrid suppression API
- `unsubscribe.list` — admin only: list all unsubscribes

### REST Endpoints
| Method | Path | File | Notes |
|---|---|---|---|
| POST | `/api/upload` | `uploadRoute.ts` | Bill file upload to S3 |
| POST | `/api/crm-webhook` | `crmWebhook.ts` | Receives lead data, forwards to Solar Pro CRM |
| POST | `/api/unsubscribe/generate-token` | `unsubscribeRoute.ts` | External token generation — no auth required. Body: `{email, campaign}`. Returns `{token}`. |

### Unsubscribe System (built: May 27, 2026)
- Token format: `base64url(email|expiresAt|campaign).hmac_sha256_signature`
- Secret: `JWT_SECRET` env var (auto-injected, never hardcoded)
- SendGrid ASM Group: **35533**
- Rate limit: 5 requests per IP per hour
- Admin dashboard: `/admin/unsubscribes`
- Token generation endpoint for external email scripts: `POST /api/unsubscribe/generate-token`

---

## Android App (built: May 27, 2026)

| Item | Value |
|---|---|
| **APK file** | `/home/ubuntu/pell-solar-referral-v1.0.apk` (4.5 MB) |
| **Source project** | `/home/ubuntu/pell-solar-referral-android/` |
| **Package name** | `com.pellsolar.referral` |
| **App name** | Pell Solar Referral |
| **Version** | 1.0 (versionCode 1) |
| **Target SDK** | Android 34 |
| **Min SDK** | Android 24 (Android 7.0+) |
| **What it does** | WebView app loading `https://pellsolar.com/referral-program`. Keeps all pellsolar.com links in-app, opens external links in browser. |
| **Status** | APK built and ready. Waiting for Google Play Console account verification to complete before submission. |
| **Referral page** | Updated with App Store button + "Coming Soon to Google Play" badge |

**To submit to Google Play:** Upload `/home/ubuntu/pell-solar-referral-v1.0.apk` to the Google Play Console once account verification is complete.

---

## Infrastructure & Config

- **Redirects:** `server/redirects.ts` — 301 redirects from old WordPress URLs
- **Static pages:** `server/staticPages.ts` — server-side rendered HTML for bots/SEO
- **Spam protection:** `server/spamProtection.ts` — rate limiting for form submissions
- **Sitemap:** `client/public/sitemap.xml` — all pages
- **Robots.txt:** `client/public/robots.txt`

---

## iOS App (Apple App Store)

| Item | Value |
|---|---|
| **App name** | Pell Solar Referral |
| **App ID** | 6760663938 |
| **Current version** | 3.1 — **Ready for Review** (submitted, in Apple's queue as of May 28, 2026) |
| **Previous version** | 3.0 — Ready for Distribution (approved) |
| **Screenshots** | 4 iPhone screenshots uploaded |
| **Review credentials** | reviewer@pellsolar.com / PellSolar2026! |
| **App Store Connect** | https://appstoreconnect.apple.com/apps/6760663938/distribution/ios/version/inflight |

## Google Play Console

| Item | Value |
|---|---|
| **Account** | Pell Solar (Organization), ID: 8377177075139668107 |
| **Website verification** | Request sent May 28, 2026 — pending (up to 24 hours) |
| **APK ready to upload** | `/home/ubuntu/pell-solar-referral-v1.0.apk` |
| **Next step** | Once website verification completes, create app and upload APK |

---

## Pending Items (as of May 28, 2026)

| Item | Notes |
|---|---|
| Fix `storageGetSignedUrl` expiry parameter | Bill file URLs need 7-day signed URLs for Solar Pro CRM webhook |
| Ensure bill_file_url in webhook uses long-lived signed URL | Not `/manus-storage/` path |
| Add Roger Fumey as customer via CRM webhook | With correct data and utility bill |
| Verify Roger Fumey's bill attaches in Solar Pro CRM | Under Utility folder |
| Submit Android APK to Google Play | Waiting on Play Console account verification |
| Fix customer welcome email | No email provider installed; pending decision on provider |
| Rate limit on quote form | Currently 20/hr for testing — lower back to 3 after testing done |
| Publish latest checkpoint to production | User to click Publish button in Management UI |

---

## Key Decisions & Notes

- **Color scheme:** Deep navy `#0B1D51` + solar gold `#FED44D` + white — matches pellsolar.com branding
- **Quote form interest options:** solar / battery / solar_battery / ev_charger / other
- **Lead rate limit:** Currently 20/hr (raised for testing). Production should be 3/hr.
- **CRM webhook:** Fires on every new lead submission to Solar Pro CRM
- **Bill uploads:** Stored in S3 via `storagePut()`, key saved in `leads.billFileKey`
- **Auth:** Manus OAuth — admin access requires login at `/admin`
- **TypeScript watch error** on `routers.ts:201` (`property_type` in `CrmLeadPayload`) is a false positive from the watch compiler. `pnpm tsc --noEmit` exits clean with 0 errors.

---

## Session History

### Session: May 27, 2026
- Built Android WebView APK (`pell-solar-referral-v1.0.apk`)
- Updated ReferralProgram.tsx with App Store + Google Play Coming Soon buttons
- Built complete unsubscribe system (DB table, tRPC procedures, frontend page, admin dashboard)
- Added `POST /api/unsubscribe/generate-token` REST endpoint for external email scripts
- Added Unsubscribes nav item to admin sidebar

### Session: May 28, 2026
- Created this PROJECT_LOG.md file
- Audited todo.md and confirmed Android APK was built (was incorrectly marked as pending)
- Confirmed unsubscribe system fully operational
- Sent Google Play Console website verification request (pellsolar.com already verified in Search Console via Google Analytics). Account ID: 8377177075139668107. May take up to 24 hours.
- Checked Apple App Store Connect: **Pell Solar Referral v3.1 is submitted and "Ready for Review"** — in Apple's review queue. App ID: 6760663938. 4 iPhone screenshots uploaded. All metadata complete. Review credentials: reviewer@pellsolar.com / PellSolar2026!
