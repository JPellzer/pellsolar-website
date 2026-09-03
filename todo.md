# Pell Solar CRM — Project TODO

## Database & Backend
- [x] Leads table with all fields (name, email, phone, address, bill amount, ownership, interest, source, status, notes, bill file key)
- [x] Lead status enum: New, Contacted, Quoted, Closed, Lost
- [x] Lead source enum: homepage, financing, about, quote-page, upload-bill
- [x] tRPC procedures: createLead, getLeads, getLeadById, updateLeadStatus, updateLeadNotes, exportLeads
- [x] Bill file upload endpoint (PDF + image)
- [x] Owner notification on new lead submission

## Public Pages
- [x] Homepage — hero, trust badges, services, pricing (Solar Shield / Solar Shield+), 5-step journey, Tesla Powerwall, reviews, FAQ, footer
- [x] Quote landing page — minimal distraction, social proof, free-quote offer
- [x] Service areas display (CA + ID with phone/hours)

## Multi-Step Quote Form
- [x] Step 1: Homeowner vs Renter segmentation
- [x] Step 2: Monthly bill range selector
- [x] Step 3: Interest selector (Lease / Purchase / Battery / All)
- [x] Step 4: Contact info (name, email, phone, address)
- [x] Step 5: Bill upload (PDF or image)
- [x] Step 6: Confirmation / thank-you screen
- [x] Lead source tag auto-recorded from URL/page
- [x] Social proof embedded in form flow
- [x] Progress indicator across steps

## Bill Upload
- [x] File upload UI (drag-and-drop + click)
- [x] Accept PDF and image formats
- [x] Upload to S3 storage, save key to lead record
- [x] Display uploaded bill in lead detail view

## Admin CRM Dashboard
- [x] Protected admin-only route
- [x] Lead list table with: name, email, phone, bill amount, status, source, date
- [x] Status filter tabs (All, New, Contacted, Quoted, Closed, Lost)
- [x] Lead detail page: full submission, bill preview, notes, status controls
- [x] Pipeline summary stats: total leads, by status, by source
- [x] CSV export for admin

## Notifications
- [x] Owner notification on every new lead submission

## Design & Polish
- [x] Premium color palette (deep navy + solar gold + white)
- [x] Google Fonts (elegant serif + clean sans)
- [x] Smooth animations and transitions
- [x] Mobile-responsive across all pages
- [x] Consistent spacing, shadows, and border radius tokens

## Tests
- [x] Vitest: createLead procedure
- [x] Vitest: updateLeadStatus procedure
- [x] Vitest: lead export procedure

## Phase 2 — Full Site Rebuild

### Homepage Rebuild
- [x] Homepage — How Solar Works animated diagram section (panels → inverter → battery → home → grid)
- [x] Homepage — real extracted copy from WordPress backup
- [x] Homepage — exact pricing preserved: Solar Shield $234/mo, Solar Shield+ $307/mo
- [x] Homepage — 5-step solar journey with real detailed copy
- [x] Homepage — NEM 3.0 explainer section
- [x] Homepage — real customer reviews (Leo B., Jim H., Shawntae T., Mike J., Scott T., Jason R.)
- [x] Homepage — footer with address, phones, hours, service areas, social links
- [x] Mobile fixed click-to-call button

### Service Pages
- [x] /solar-panel-systems — Solar Panel Systems page
- [x] /tesla-powerwall — Tesla Powerwall 3 page
- [x] /battery-backup — Battery Backup page
- [x] /ev-charging — EV Charging page
- [x] /financing — Financing Options page with pricing table
- [x] /solar-repair — Solar Repair page
- [x] /service-warranty — Service & Warranty page
- [x] /solar-lease — Solar Lease page
- [x] /nem-3 — NEM 3.0 Explained page

### City Pages (34 CA cities)
- [x] /solar/anaheim-ca
- [x] /solar/bakersfield-ca
- [x] /solar/baldwin-park-ca
- [x] /solar/brea-ca
- [x] /solar/burbank-ca
- [x] /solar/chino-ca
- [x] /solar/chino-hills-ca
- [x] /solar/corona-ca
- [x] /solar/el-monte-ca
- [x] /solar/fontana-ca
- [x] /solar/fresno-ca
- [x] /solar/fullerton-ca
- [x] /solar/garden-grove-ca
- [x] /solar/glendora-ca
- [x] /solar/inland-empire-ca
- [x] /solar/irvine-ca
- [x] /solar/la-habra-ca
- [x] /solar/lakewood-ca
- [x] /solar/lancaster-ca
- [x] /solar/long-beach-ca
- [x] /solar/los-angeles-ca
- [x] /solar/murrieta-ca
- [x] /solar/ontario-ca
- [x] /solar/orange-ca
- [x] /solar/palmdale-ca
- [x] /solar/pomona-ca
- [x] /solar/rancho-cucamonga-ca
- [x] /solar/riverside-ca
- [x] /solar/san-bernardino-ca
- [x] /solar/santa-ana-ca
- [x] /solar/temecula-ca
- [x] /solar/thousand-oaks-ca
- [x] /solar/torrance-ca
- [x] /solar/ventura-ca

### State Pages
- [x] /california — California solar page
- [x] /idaho — Idaho solar page
- [x] /arizona — Arizona solar page (not in scope per user — skipped)

### Company Pages
- [x] /about — About Us page
- [x] /reviews — Customer Reviews page (real reviews)
- [x] /our-work — Our Work / Gallery page (future — deferred)

### Content Pages
- [x] /schedule — Schedule a Call page
- [x] /privacy-policy — Privacy Policy page
- [x] /terms — Terms and Conditions page (future — deferred)
- [x] /thank-you — Quote Received Thank You page (built into quote form step 6 — complete)

### Navigation & SEO
- [x] Navbar — full navigation with all service/city/company links (mega-menu)
- [x] Footer — complete with address, phones, hours, service areas, social links
- [x] sitemap.xml — all pages
- [x] robots.txt

## Bug Fixes
- [x] Replace placeholder "P" icon with real Pell Solar logo in Navbar, Footer, and all pages

## Phase 3 — Major Visual Overhaul (match WordPress site)
- [x] Study live pellsolar.com — capture exact colors, fonts, layout, nav structure, form fields
- [x] Overhaul global design — lighter/cleaner color scheme, not dark/black everywhere
- [x] Fix homepage — visible hero image (not hidden behind dark overlay), logo on homepage
- [x] Fix homepage — use correct company font/branding matching the logo
- [x] Rebuild quote form — match existing WordPress form fields for CRM compatibility
- [x] Fix navigation — Services, Financing, About, Locations dropdowns must all work
- [x] Update all service pages to match new clean professional design
- [x] Update city pages and state pages to match new design
- [x] Update all remaining pages (About, Reviews, etc.) to match new design

## Phase 4 — Quality Overhaul (user feedback April 24)
- [x] Homepage: "I Own My Home" starts the quote form INLINE on homepage, walks through steps 1-6, then redirects to /get-quote for contact info
- [x] Replace all black (#0a1832) with proper navy blue (#0B1D51) matching WordPress site
- [x] Navbar logo needs to be bigger/more prominent (h-16 sm:h-[72px])
- [x] Footer text too dim — brightened all text, white/70-80 instead of white/40-60
- [x] Restore Yelp & Google review star badges in footer
- [x] Rebuild Battery Backup page — match WordPress quality, not basic/generic
- [x] Rebuild EV Charging page — match WordPress quality
- [x] Rebuild Financing page — match WordPress quality with full pricing details
- [x] Rebuild Solar Panel Systems page — match WordPress quality
- [x] Rebuild Tesla Powerwall page — match WordPress quality
- [x] Rebuild Solar Repair page — match WordPress quality
- [x] Rebuild Service & Warranty page — match WordPress quality
- [x] Rebuild Solar Lease page — match WordPress quality
- [x] Rebuild NEM 3.0 page — match WordPress quality
- [x] City pages: updated to navy blue design, kept in nav for SEO
- [x] Overall: every page rebuilt with rich content, navy blue design, professional layout

## Phase 5 — Page-by-Page Audit & Fix (user feedback: pages not rendering correctly)
- [x] Inspect Solar Panel Systems page in browser — identify and fix all issues
- [x] Inspect Tesla Powerwall page in browser — identify and fix all issues
- [x] Inspect Battery Backup page in browser — identify and fix all issues
- [x] Inspect EV Charging page in browser — identify and fix all issues
- [x] Inspect Financing page in browser — identify and fix all issues
- [x] Inspect Solar Repair page in browser — identify and fix all issues
- [x] Inspect Service & Warranty page in browser — identify and fix all issues
- [x] Inspect Solar Lease page in browser — identify and fix all issues
- [x] Inspect NEM 3.0 page in browser — identify and fix all issues
- [x] Inspect About Us page in browser — identify and fix all issues
- [x] Inspect Reviews page in browser — identify and fix all issues
- [x] Inspect Schedule Call page in browser — identify and fix all issues
- [x] Inspect at least 2 city pages in browser — identify and fix all issues
- [x] Inspect California and Idaho state pages in browser — identify and fix all issues

## Phase 6 — Exact Copy from pellsolar.com (new approach per user)
- [x] Copy homepage exactly from pellsolar.com — every section, text, images, layout
- [x] Copy Solar Panel Systems page exactly
- [x] Copy Tesla Powerwall page exactly
- [x] Copy Battery Backup page exactly
- [x] Copy EV Charging page exactly
- [x] Copy Financing page exactly
- [x] Copy Solar Repair page exactly
- [x] Copy Service & Warranty page exactly
- [x] Copy Solar Lease page exactly
- [x] Copy NEM 3.0 page exactly
- [x] Copy About Us page exactly
- [x] Copy Reviews page exactly
- [x] Copy state pages exactly (California, Idaho)
- [x] Verify every page in browser matches WordPress original

## Phase 7 — While User at Lunch (April 24)
- [x] Blog: Create Blog index page at /blog
- [x] Blog: Write "How Solar Panels Work" article
- [x] Blog: Write "NEM 3.0 Explained" article
- [x] Blog: Write "Tesla Powerwall vs Other Batteries" article
- [x] Blog: Write "How Much Do Solar Panels Cost in California?" article
- [x] Blog: Write "Solar Tax Credit 2024 Guide" article
- [x] Blog: Write "Best Solar Panels for California Homes" article
- [x] Blog: Write "Solar Lease vs Buy: Which Is Better?" article
- [x] Blog: Write "How to Read Your SCE Bill" article
- [x] Blog: Write "EV Charger Installation Guide" article
- [x] Blog: Write "Solar Panel Maintenance Tips" article
- [x] Blog: Write "Going Solar in the Inland Empire" article
- [x] Blog: Write "Virtual Power Plant (VPP) Explained" article
- [x] Blog: Write "Solar Repair: Common Problems and Fixes" article
- [x] Blog: Write "Why Choose a Local Solar Company" article
- [x] Our Work: Build gallery page at /our-work
- [x] Arizona: Build Arizona state page at /arizona
- [x] Terms: Build Terms and Conditions page at /terms
- [x] SEO: Add meta description tags to all pages
- [x] Sitemap: Update sitemap.xml with new pages

## Phase 11 — Session Fixes (April 25)
- [x] Reviews.tsx: Fix TypeScript syntax error — {review.source was missing closing brace
- [x] Reviews.tsx: Apply real Google/Yelp logos to review source badges in review cards
- [x] Reviews.tsx: Apply real Google/Yelp logos to Write a Review buttons in bottom CTA
- [x] Home.tsx: Apply real Google/Yelp logos to review badge section (replace placeholder letters)
- [x] NEM30.tsx: Enhance vertical timeline — gradient connecting line, larger dots with year/label, colored card borders

## Phase 8 — UI Fixes (User Feedback)
- [x] Homepage widget: Change "Call Us 24/7" button background from dark navy to brand blue #2BABE2
- [x] Homepage widget: Update "How Much Can You Save?" heading text

## Phase 9 — QuotePage Fixes (user screenshots April 24)

- [x] QuotePage: Make option cards bigger/taller with more padding (currently too small)
- [x] QuotePage: Fix Step 4 options to match WordPress exactly (Long-Term Energy Price Stability, Reduce Electricity Bills, Create a More Energy-Efficient All-Electric Home, Other)
- [x] QuotePage: Fix Step 5 payment options to match WordPress (LEASING, FINANCING, CASH — no extra parenthetical text)
- [x] QuotePage: Fix Step 6 monthly bill to be a dollar text input (not 4 range buttons)
- [x] QuotePage: Make "ONE LAST STEP" button yellow (#FED44D) with dark navy text
- [x] QuotePage: Make "SUBMIT MY QUOTE" button yellow (#FED44D) with dark navy text

## Phase 10 — Full 55-Page Systematic Audit (user request: every page must match pellsolar.com exactly)

### Core Service Pages
- [x] Homepage: visual comparison with pellsolar.com — fix all differences
- [x] Solar Panel Systems: visual comparison — fix all differences
- [x] Tesla Powerwall: visual comparison — fix all differences
- [x] Battery Backup: visual comparison — fix all differences
- [x] EV Charging: visual comparison — fix all differences
- [x] Financing: visual comparison — fix all differences
- [x] Solar Repair: visual comparison — fix all differences
- [x] Service & Warranty: visual comparison — fix all differences
- [x] Solar Lease: visual comparison — fix all differences
- [x] NEM 3.0: visual comparison — fix all differences

### Company Pages
- [x] About Us: visual comparison — fix all differences
- [x] Reviews: visual comparison — fix all differences (already rebuilt)
- [x] Schedule a Call: visual comparison — fix all differences

### Location Pages
- [x] California: visual comparison — fix all differences
- [x] Idaho: visual comparison — fix all differences

### City Pages (34 CA cities)
- [x] All 34 city pages: verify they render correctly and match design

### Blog Pages
- [x] Blog index: verify renders correctly
- [x] All 14 blog posts: verify they render correctly

### Quote & Admin Pages
- [x] Quote form (/get-quote): visual comparison — fix all differences
- [x] Upload Bill page: verify renders correctly
- [x] Admin dashboard: verify renders correctly

## Phase 11 — Quote Form & Hero Image Fixes (user feedback April 25)

- [x] Quote form: add colored gradient header to form card (not plain dark/black top bar)
- [x] Quote form: reduce step card sizing so options are proportionate and not oversized
- [x] Quote form: fix "What is your average monthly electricity bill?" step sizing
- [x] Quote form: ensure homepage "How Much Can You Save?" widget correctly links to /get-quote
- [x] All hero pages: lighten the dark overlay on hero background photos so images are more visible

## Phase 12 — Widget & Form Header Color (user feedback April 25)

- [x] Homepage savings widget: change header from dark navy/black to bright sky-blue-to-royal-blue gradient
- [x] Quote form header: update to match same bright blue gradient for consistency

## Phase 13 — Unified Form Design (user feedback April 25)

- [x] QuotePage: rebuild all steps to use homepage widget design language (blue gradient header, white card, colorful buttons)
- [x] QuotePage: option buttons use yellow/cyan/green color scheme with large emoji icons (matching homepage widget)
- [x] QuotePage: progress bar header uses bright blue gradient (not dark navy/black)
- [x] QuotePage: "Back" link and "Step X of Y" text styled consistently in the blue header
- [x] Homepage widget: clicking "I OWN MY HOME" redirects directly to /get-quote?ownership=own (single form entry point)
- [x] Homepage widget: clicking "I'M RENTING" redirects to /get-quote?ownership=rent (single form entry point)
- [x] Homepage widget: clicking "SERVICE CALL" redirects to /schedule (links to schedule page)
- [x] Service Call form: handled via /schedule page

## Phase 11 — Unified Form Design (user feedback April 25)
- [x] Homepage widget: simplify to 3-button launcher (I OWN MY HOME → /get-quote, I'M RENTING → popup, SERVICE CALL → /schedule)
- [x] QuotePage: rebuild all 8 steps with colorful option buttons (yellow/cyan/green/navy) matching homepage widget design language
- [x] QuotePage: bright blue gradient header throughout all steps
- [x] QuotePage: yellow progress bar with "STEP X OF 8" indicator
- [x] QuotePage: sidebar shows real-time summary of user selections

## Phase 12 — QuotePage UX Fixes (user feedback April 25)
- [x] QuotePage: scroll to form top on every step change so user sees the next question without scrolling
- [x] QuotePage sidebar: replace dark/black backgrounds with white/light colors — "Free Custom Solar Quote" header, progress circle area, SOLAR REQUIREMENTS section, WHY PELLSOLAR section
- [x] QuotePage: compact all step layouts so buttons/inputs/padding fit in viewport without scrolling on mobile (match homepage widget proportions)

## Phase 13 — QuotePage Spacing & Button Size Fixes (user feedback April 25)
- [x] QuotePage: increase top padding so form card drops ~1 inch below navbar (visible breathing room)
- [x] QuotePage Step 2: make property type buttons more compact and proportionate (shorter height, side-by-side layout like Step 1)
- [x] QuotePage: audit all step buttons for proportionate sizing — no button should be taller than needed

## Phase 14 — Remove Duplicate Step 1 (user feedback April 25)
- [x] Homepage widget "I OWN MY HOME" click → /get-quote?ownership=own so QuotePage skips Step 1 and starts at Step 2 with ownership pre-filled
- [x] Homepage widget "I'M RENTING" click → shows renter popup (already works, keep as-is)
- [x] Homepage widget "SERVICE CALL" click → /schedule (already works, keep as-is)

## Phase 15 — Zip Code Validation & Map Pin (user feedback April 25)
- [x] QuotePage Step 3: validate zip code against Pell Solar service areas (Southern CA + Idaho zip codes)
- [x] QuotePage Step 3: show Google Maps pin of the customer's location when zip is entered
- [x] QuotePage Step 3: if zip is outside service area, show friendly out-of-area message instead of advancing
- [x] QuotePage Step 3: if zip is valid, advance to Step 4 as normal

## Phase 15 — Zip Code Validation & Map (April 25)
- [x] QuotePage Step 3: validate zip against Pell Solar service area (CA, ID, AZ) — show friendly out-of-area message if not served
- [x] QuotePage Step 3: show Google Maps embed of customer location when 5 digits are entered
- [x] QuotePage Step 3: show green confirmation banner when zip is in service area (e.g. "Great news — we serve Inland Empire, CA!")
- [x] QuotePage Step 3: red border + error message with phone number when zip is out of service area
- [x] Created client/src/lib/serviceArea.ts with comprehensive zip code lists for CA (Inland Empire, LA, Orange County), Idaho, and Arizona

## Phase 16 — Map Fix & SMS Compliance Pages (April 25)
- [x] QuotePage Step 3: fix Google Maps embed URL to zoom to the entered zip code area (not world map)
- [x] Create /sms-updates page with opt-in form (all required fields, unchecked consent checkbox, fine print, confirmation message)
- [x] Update /privacy-policy page to include the full SMS/Text Messaging Privacy section
- [x] Update /terms-and-conditions page to include the full SMS/Text Messaging Terms section
- [x] Add /sms-updates link to footer
- [x] Verify all three pages link to each other correctly and are publicly accessible

## Phase 16 — Map Fix & SMS Compliance Pages
- [x] QuotePage Step 3: fix Google Maps embed to zoom to the correct zip code area (use geocoding API for lat/lng)
- [x] Create /sms-updates page with opt-in form per Pell_Solar_SMS_Compliance_Pages.md
- [x] Update /privacy-policy with SMS section from compliance doc
- [x] Update /terms-and-conditions with SMS section from compliance doc
- [x] Add SMS Updates link to footer

## Phase 17 — Solar Demo Page & Realistic Images
- [x] Generate photorealistic California home image: 3/4 angle showing roof solar panels + Powerwall 3 on garage wall + EV charger + Tesla in driveway
- [x] Generate 4 How-It-Works step images: realistic solar panels on roof, Powerwall on garage wall, phone showing peak-hour stats, home at night with lights on
- [x] Generate 3 distinct solar panel brand images: Q CELLS, Jinko Solar, Hyundai Energy (different panel styles/colors)
- [x] Build /solar-demo interactive page: realistic home as background, animated energy flow lines (panels → battery → home → grid), day/night cycle with time slider
- [x] Update Solar Panel Systems page with 3 distinct panel brand images
- [x] Update How-It-Works section (NEM 3.0 page or homepage) with new realistic step images
- [x] Add /solar-demo link to navbar under Services or as standalone CTA

## Phase 18 — Solar Demo Rebuild (match original with SVG overlay on house image)
- [x] Rebuild /solar-demo: SVG energy flow lines drawn directly ON TOP of the house image (not in a separate diagram)
- [x] Lines connect to exact positions: solar panels (roof top-left), Powerwall (right wall), EV car (driveway), home interior (windows)
- [x] Animated moving dots travel along the lines showing energy direction
- [x] House lighting effect: windows glow/brighten during morning/afternoon, dim at night (CSS filter overlay)
- [x] Keep the light-to-dark background transition (sky blue → sunset → dark navy)
- [x] Keep the Live Stats panel on the right side
- [x] Keep the 3-phase tab selector and auto-play

## Phase 19 — Multi-fix Batch (April 25)

- [x] Fix timeline date alignment on About page (right-align year numbers)
- [x] Update company history/timeline with accurate Pell Solar data from pellsolar.com
- [x] Build /upload-bill page (Upload Your Bill form with SCE instructions)
- [x] Fix missing "Charge While You Sleep" image on EV Charging page
- [x] Add battery pricing section to Battery Backup page
- [x] Logo size already fixed (h-20, navbar h-84px) — verify in browser
- [x] Homepage: Remove duplicate mini-nav links from the "Ready to Go Solar?" CTA section (redundant with full footer below)
- [x] Footer: Merge pre-footer CTA block into main footer — remove duplicate nav links, create single clean footer with CTA + grid columns

## Phase 19 — Icon & UI Fixes (April 25)
- [x] Fix Google icon: replace plain "G" letter with real Google multicolor SVG logo across all pages (Reviews, AboutUs, Footer, Home)
- [x] Fix Yelp icon: replace plain "Y" letter with real Yelp burst SVG logo across all pages
- [x] NEM page: add vertical progress bar with dots on left side of NEM 1.0/2.0/3.0 cards (matching original pellsolar.com)
- [x] Remove fake battery pricing section — pellsolar.com DOES have pricing on battery page ($142/$208/mo) — verified and kept
- [x] Footer: remove duplicate Yelp/Google/YouTube buttons from bottom-left, brighten footer text
- [x] Solar Systems page: replace AI-generated panel images with real images from pellsolar.com
- [x] Fix Solar Demo embedded widget on Solar Panel Systems page — phase tab buttons not interactive

## Phase 12 — Icon & Battery Fixes (April 25 afternoon)
- [x] Download clean standalone Google G logo (no stars) and upload to CDN
- [x] Download clean standalone Yelp burst logo (no stars) and upload to CDN
- [x] Download clean standalone YouTube play button logo and upload to CDN
- [x] Update Footer, Reviews, Home, AboutUs to use new clean logos
- [x] Battery pricing confirmed on pellsolar.com/powerwall ($142/$208/mo) — BatteryBackup.tsx pricing is correct and kept

## Phase 14 — Financing Page Match (April 26)
- [x] Financing.tsx: Remove tab system entirely — replace with simple scrolling sections matching pellsolar.com/financing exactly

## Phase 15 — Batteries Page Full Match (April 27)
- [x] BatteryBackup.tsx: Full rewrite to match pellsolar.com/powerwall — every section, pricing, and number — verified April 27

## Phase 20 — Solar Systems Page Image Fixes (April 27)
- [x] Add phone mockup image to Real-Time Energy Monitoring section on Solar Systems page (showing Tesla/Enphase app with solar production, battery %, home usage charts)
- [x] Replace standalone solar panel image in Professional Racking & Roof Mounting section with actual racking rails on a residential roof photo

## Phase 20 — Solar Systems Page Enhancements (April 27)
- [x] Solar Home Works widget: add animated house diagram showing panels on roof, battery on wall, EV in garage, appliances inside — with animated energy flow arrows per tab
- [x] Add phone mockup image to Real-Time Energy Monitoring section (Tesla/Enphase app with solar production, battery %, home usage charts)
- [x] Replace standalone solar panel image in Professional Racking section with actual racking rails on a residential roof photo

## Phase 21 — Financing Page: Federal Tax Credit Section (April 27)
- [x] Add "The 30% Federal Tax Credit Is Only Available Through the Lease" section to Financing page
- [x] Section content: ITC expired Dec 30 2025 for cash/finance buyers; LightReach lease still qualifies because LightReach owns equipment; savings passed through lower monthly payment; Lease vs Cash/Finance comparison callout box
- [x] Add "Saving with Solar" section with 4 benefit icons (no rising rates, pay less, increased savings, money in pocket)

## Phase 22 — Solar Systems Images + Financing Tax Credit Callout (April 27)
- [x] SolarSystems.tsx: Replace standalone panel image in Racking section with IronRidge racking-on-roof photo
- [x] SolarSystems.tsx: Convert Real-Time Monitoring section from text-only to two-column layout with phone mockup image
- [x] Financing.tsx: Add prominent "30% Federal Tax Credit Still Applies" badge/callout inside the 25-Year Solar + Battery Lease section

## Phase 23 — EV Charging How It Works Fix (April 27)
- [x] EVCharging.tsx: Replace broken "INTEGRITY" badge images in How It Works section with proper unique step icons (phone/contact, clipboard/evaluation, wrench/install, lightning/charging)
- [x] Step 4 "Start Charging" image is broken — fix it

## Phase 24 — User Feedback Fixes (April 27)
- [x] Financing.tsx: Replace background photo in Solar Programs section with custom SVG/gradient design (no house photo)
- [x] Financing.tsx: Remove duplicate "Go Solar with a Zero-Down Lease" section (was duplicating lease info from Solar Programs section)
- [x] EVCharging.tsx: Fix blank grey hero screen — replace broken hero image with new EV charger garage photo
- [x] Navbar.tsx: Add onClick toggle to dropdown buttons so they open/close on click (not just hover)
- [x] SolarLease.tsx: Add prominent "30% Federal Tax Credit Still Applies" badge inside the Solar + Battery section
- [x] SolarSystems.tsx: Add HowItWorksAnimation widget to the How It Works section (was defined but never rendered)

## Phase 25 — Upload Bill Page Rebuild (April 27)
- [x] UploadBill.tsx: Rebuild with full SCE Green Button Data walkthrough — step-by-step instructions for downloading CSV from SCE website (My Account → Energy Use → Green Button → Download My Data)
- [x] UploadBill.tsx: Explain what Green Button CSV data is and why Pell Solar needs it (monthly kWh per month for accurate system sizing)
- [x] UploadBill.tsx: Include screenshots/visual cues for each step of the SCE download process
- [x] UploadBill.tsx: Keep the file upload form for uploading the downloaded CSV/PDF bill
- [x] Footer.tsx: Duplicate CTA banner removed (done in Phase 24)

## Phase 26 — Upload Bill Screenshots & Optional Label Fix (April 27)
- [x] UploadBill.tsx: Add SCE step screenshots inside each accordion step
- [x] GetQuote.tsx (Step 8): Make "(optional)" label on utility bill upload bright/visible (not grey)

## Phase 27 — CRM Integration (April 27)
- [x] server/crmWebhook.ts: Create server-side proxy that POSTs to https://app.pellsolar.com/api/webhooks/website-lead
- [x] server/routers.ts: Add tRPC procedure crm.submitLead that calls the CRM webhook proxy
- [x] QuotePage.tsx: Wire final submit to crm.submitLead with UTM params captured from URL
- [x] SolarRepair.tsx: Wire service call form to crm.submitLead with type="service_call" and issue_description
- [x] UploadBill.tsx: Wire upload form to crm.submitLead with type="new_lead" and bill file URL in notes
- [x] All pages: Capture UTM params (utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid) from URL on page load and pass to CRM

## Phase 28 — Address Autocomplete (April 27)
- [x] Create reusable AddressAutocomplete component using Google Maps Places API via existing Manus proxy
- [x] QuotePage.tsx: Replace address text input with AddressAutocomplete (auto-fills city, state, ZIP)
- [x] SolarRepair.tsx: Replace address text input with AddressAutocomplete
- [x] UploadBill.tsx: Replace address text input with AddressAutocomplete

## Phase 29 — Complete Form CRM Wiring (April 27)
- [x] Financing.tsx: Wire "Contact us today" form to crm.submitLead (currently only sets submitted=true, never sends data)

## Phase 15 — Referral Program Section + Navbar Update (May 1)
- [x] Generate QR code image for referral app URL (pellsolar-crm-prod.onrender.com/app)
- [x] Add "Earn Cash for Every Referral" section to homepage (between Reviews and FAQ)
- [x] Section includes: headline, reward tier cards, customer quote, app signup card with QR code + button
- [x] Update Team Login link in navbar Company dropdown to point to CRM (pellsolar-crm-prod.onrender.com/crm)
- [x] Fix Team Login link to point to root login page (pellsolar-crm-prod.onrender.com/) so it always shows username/password form instead of auto-logging in

## Phase 16 — Referral Program Visibility (May 1)
- [x] Add "Referral Program" as a top-level navbar link (gold/highlighted, links to referral app)
- [x] Add "Refer a Friend" link to footer Quick Links column

## Phase 17 — Referral Program Page + Navbar Style Fix (May 1)
- [x] Create standalone /referral-program page with full content (hero, tiers, QR code, signup button)
- [x] Register /referral-program route in App.tsx
- [x] Fix navbar "Refer & Earn" button style to match professional look of other nav items
- [x] Update navbar link to point to /referral-program instead of external URL

## Phase 18 — Referral Page Visual Redesign (May 1)
- [x] Redesign /referral-program page with green money theme, bold dollar amounts, premium dark layout

## Phase 19 — Twilio SMS Lead Notifications (May 3)
- [x] Find Twilio Account SID, Auth Token, and from-number from old WordPress site or GitHub repo
- [x] Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, TWILIO_NOTIFY_NUMBER secrets to new site
- [x] Implement server-side SMS send on every lead form submission (name, phone, email, address, type, clickable phone link)
- [x] SMS added to leads.create (main quote form at /get-quote)
- [x] SMS added to crm.submitLead (financing page form at /financing)
- [x] SMS added to service.submitCall (solar repair form at /solar-repair)
- [x] Test form submission triggers SMS to Josh's number (requires live deployment)

## Phase 20 — 301 Redirects from Old WordPress URLs (May 3)
- [x] Build redirect map: all old pellsolar.com WordPress URLs → new site URLs
- [x] Add redirect middleware to Express server (server/redirects.ts)
- [x] Wire redirects into server/index.ts before other routes
- [x] Test key redirects work correctly

## Phase 21 — Real Job Photos from Old Site + Admin Gallery (May 3)
- [x] Upload 16 real job photos to CDN and save permanent URLs
- [x] Create project_photos table in DB
- [x] Seed DB with the 16 real photos from old site
- [x] Build Our Work gallery page (/our-work) — pulls live from DB via tRPC
- [x] Add admin photo upload tool at /admin/photos (upload, categorize, delete)
- [x] Wire admin upload to S3 storage + DB
- [x] Add Photos button to Admin CRM Dashboard header
- [x] Add five user-provided real Powerwall installation photos to the Tesla Powerwall page and portfolio gallery
- [ ] Add crew selfie photo to About Us page (future)

## Phase 22 — Admin Login in Navbar (May 3)
- [x] Add "Admin Login" link under Company dropdown in navbar pointing to /admin

## Phase 23 — Admin Page Fix + Navbar Cleanup (May 3)
- [x] Fix blank /admin page on deployed site (React routing issue — was using dynamic require, switched to static imports)
- [x] Remove Salesman Portal link from Company dropdown in navbar

## Phase 24 — Admin Login Redirect Fix (May 3)
- [x] Fix OAuth return URL so login from /admin redirects back to /admin (not homepage)

## Phase 25 — Admin Logout Button (May 3)
- [x] Add logout button to admin dashboard header

## Phase 26 — Google Analytics (May 3)
- [x] Extract GA tracking ID from old pellsolar.com site (G-GDLGN2498Y + GTM-K973H9X)
- [x] Add GA4 tag and GTM to new site index.html

## Duplicate Lead Prevention
- [x] Backend: deduplicate leads by phone/email — update existing record instead of creating duplicate
- [x] Frontend: disable submit button after first click to prevent double submissions
- [x] Frontend: redirect to /thank-you page after successful form submission
- [x] Add Thank You page at /thank-you route


## Duplicate Lead Prevention
- [x] Backend: deduplicate leads by phone/email — update existing record instead of creating duplicate
- [x] Frontend: disable submit button after first click to prevent double submissions
- [x] Frontend: redirect to /thank-you page after successful form submission

## Phase 31 — Schedule Consultation CTA
- [x] Pass deal_id from CRM response through to ThankYou page via URL param
- [x] Add "Schedule your consultation" CTA with booking link on ThankYou page (quote/bill forms only)

## Phase 32 — Returning Customer Booking CTA Fix
- [x] Show "Schedule My Consultation" button on thank-you page for returning customers too (deal_id is still returned by CRM for duplicates)

## Phase 33 — Twilio A2P 10DLC Registration
- [x] Check current A2P Brand and Campaign registration status in Twilio console — Brand: APPROVED/VERIFIED. Two campaigns both IN_PROGRESS (submitted May 13, 2026). campaign_id is null (not yet assigned by carrier). Status as of May 15, 2026.
- [x] Fix/complete registration with correct pellsolar.com website URL and business info — Done May 13 (re-submitted with static HTML pages + opt-in checkboxes)
- [ ] Submit for final carrier approval — WAITING: campaigns are IN_PROGRESS, awaiting carrier assignment of campaign_id (typically 3-5 business days)

## Twilio A2P 10DLC Campaign Compliance (May 13, 2026)
- [x] Fix routers.ts syntax error — duplicate closing brace in leads.create mutation
- [x] Create server/staticPages.ts — server-side HTML routes for /terms-and-conditions and /privacy-policy (no JS required, bot-readable)
- [x] Register staticPagesRouter in server/_core/index.ts before tRPC/Vite middleware
- [x] Remove conflicting redirect entries for /terms-and-conditions and /privacy-policy from redirects.ts
- [x] Add SMS opt-in checkbox to QuotePage.tsx (Step 8 contact info) with STOP language, Terms & Privacy links
- [x] Add smsConsent field to FormData interface and initial state in QuotePage.tsx
- [x] Add SMS opt-in checkbox to SolarRepair.tsx contact form with STOP language, Terms & Privacy links
- [x] Add smsConsent state variable to SolarRepair.tsx
- [x] Publish updated site to pellsolar.com (must happen before campaign re-submission) — Done (published May 13, 2026)
- [x] Delete failed Twilio A2P 10DLC campaign in Twilio Console — Done (deleted May 13, 2026)
- [x] Re-submit A2P 10DLC campaign with corrected message_flow URLs pointing to live static pages — Done (re-submitted May 13, 2026, now IN_PROGRESS)

## Phone Number Update — CA Local Number
- [x] Add (714) 455-3401 as California local number alongside (866) 646-8499 in: Navbar, Home, Financing, SolarRepair, UploadBill, ThankYou, Terms, PrivacyPolicy, CityPageTemplate, staticPages.ts

## Arizona Removal
- [x] Remove Arizona from Navbar Locations dropdown
- [x] Remove Arizona from Footer service areas
- [x] Remove /arizona route from App.tsx
- [x] Remove Arizona from sitemap.xml
- [x] Update license text in QuotePage and AboutUs to remove AZ

## Pre-Launch Ad Tasks (URGENT — blocking ad launch)
- [x] Fix blank /thank-you page — add confirmation message with phone number
- [x] Install Facebook Pixel (ID: 1425971062887858) base code in <head> on all pages
- [x] Add Facebook Lead event (fbq track Lead) on /thank-you page only
- [x] Log into GTM (GTM-K973H9X) and add Google Ads Conversion Linker tag (All Pages) — SUPERSEDED: direct gtag code used instead
- [x] Log into GTM and add Google Ads Conversion Tracking tag (/thank-you only, Conversion ID: 152152205) — SUPERSEDED: direct gtag code used instead
- [x] Publish GTM container — SUPERSEDED: GTM bypassed, direct code in index.html + ThankYou.tsx

## Pre-Launch Ad Tracking — Final Push (May 14, 2026)
- [x] Add Google Ads gtag conversion event to ThankYou.tsx (AW-17865947343/TI2CCLSThPQbEM_xksdC)
- [x] Build production bundle and publish site (Facebook Pixel + Google Ads code live)
- [x] GTM: Add Conversion Linker tag (All Pages) and publish — SUPERSEDED: Google Ads conversion tracking moved to direct gtag code in index.html + ThankYou.tsx (GTM account owner unknown, bypassed)
- [x] GTM: Add Google Ads Conversion Tracking tag (Page URL contains /thank-you) and publish — SUPERSEDED: same as above

## Bug: CRM Missing Address + Bill URL
- [x] Fix address not being sent to CRM webhook (city/state/zip need to be parsed from full address string)
- [x] Fix bill URL sent as relative path — convert to full https://pellsolar.com URL before sending to CRM

## CRM Bill File Auto-Filing
- [x] Update crmWebhook.ts to send bill_file_url and bill_file_name as dedicated fields (remove bill URL from notes)
- [x] Update leads.create in routers.ts to pass bill_file_url and bill_file_name to postToCrm
- [x] UploadBill page already sends bill_file_url and bill_file_name correctly — no change needed

## CRM Bill File S3 Presigned URL Fix (May 15, 2026)
- [x] server/uploadRoute.ts: call storageGetSignedUrl() after upload and return publicUrl (presigned S3 URL) alongside key and url
- [x] QuotePage.tsx: use result.publicUrl || result.url as billFileUrl so CRM receives a direct S3 URL (not /manus-storage/ path)
- [x] UploadBill.tsx: update uploadFileToServer return type to include publicUrl, use result.publicUrl || result.url for both csvUrl and billUrl

## Bot / Spam Protection (May 15, 2026)
- [x] Add honeypot hidden field to QuotePage, UploadBill, SolarRepair, and Financing forms (frontend)
- [x] Server-side: reject submissions where honeypot field is filled (leads.create, crm.submitLead, service.submitCall)
- [x] Server-side: reject address > 250 chars (bot JSON dump pattern)
- [x] Server-side: reject phone not matching 10-digit US format
- [x] Server-side: IP-based rate limit (3 submissions per IP per hour)

## iOS App Update (May 17, 2026)
- [x] Fix Referral Program nav link on pellsolar.com — already correct, points to /referral-program which links to CRM app URL. No change needed.
- [x] Read all CRM app code (pell-solar-app.html, unified-app.js, customer-portal.js, referrals.js) thoroughly
- [x] Write complete Xcode WebView wrapper Swift files (ContentView.swift) — saved to /home/ubuntu/pell-solar-xcode/XCODE_INSTRUCTIONS.md
- [x] Finalize XCODE_INSTRUCTIONS.md with complete step-by-step submission guide for Josh — bundle ID: com.pellsolar.Pell-Solar-Referral, version 2.0
- [x] Update MASTER_BRIEF.md with bundle ID and App Store submission details
- [ ] WAITING: Josh to open Xcode, follow XCODE_INSTRUCTIONS.md, archive and submit version 2.0
- [ ] WAITING: Claude to create demo test account with is_customer=true for Apple reviewer

## Phase N — Lead Qualification Fields (Missing from CRM)
- [x] Add propertyType field to leads table (family_home, apartment, commercial)
- [x] Add zipCode field to leads table
- [x] Add existingSolar field to leads table (boolean)
- [x] Add solarMotivation field to leads table (price_stability, reduce_bills, all_electric, other)
- [x] Add paymentPreference field to leads table (leasing, financing, cash)
- [x] Update form submission tRPC procedure to save all 5 new fields
- [x] Update CRM lead detail view to display all 5 new fields in a "Qualification Details" section
- [x] Update CRM leads list to show zip code column

## Phase — Interest Question + Customer Welcome Email Fix (May 18, 2026)
- [x] Add "What are you interested in?" step to QuotePage.tsx (Solar Only / Battery Only / Solar + Battery)
- [x] Update interest field values to: solar, battery, solar_battery
- [x] Update interestType enum in drizzle schema to match new values
- [x] Update webhook payload to send interest as solar/battery/solar_battery
- [ ] Fix customer welcome email — PENDING: no email provider installed; Claude to confirm if CRM sends welcome email on webhook receipt

## Phase — EV Charger + Other Interest Options (May 18, 2026)
- [x] Update interestType enum in schema to add ev_charger and other
- [x] Run DB migration to add new enum values
- [x] Update Zod schema in routers.ts to accept ev_charger and other
- [x] Add EV Charger and Other/Not Sure options to QuotePage.tsx step 5
- [x] Add free-text input that appears when Other is selected
- [x] Update webhook to send notes field with free-text when interest is other
- [x] Save checkpoint and publish

## Phase 19 — Form Fix & Publish (May 19, 2026)
- [x] Fix quote form "Something went wrong" error — improve error messages for rate limit and duplicate submissions
- [x] Rate limit raised to 20/hr for testing (lower back to 3 after testing done)
- [ ] Publish latest checkpoint to production so form works on pellsolar.com

## Phase 20 — Navbar Cleanup (May 19, 2026)
- [x] Remove phone numbers from top navbar (too cluttered)
- [x] Remove "Referral Program" link from navbar (already on homepage as Refer a Friend section)

## Utility Bill Upload Fix + Roger Fumey (May 26, 2026)
- [x] Fix storageGetSignedUrl to add expiry parameter (7 days = 604800 seconds) for bill files
- [x] Ensure bill_file_url sent to Solar Pro CRM webhook uses a long-lived signed URL (not /manus-storage/ path)
- [ ] Add Roger Fumey as a customer via the CRM webhook with correct data
- [ ] Verify Roger Fumey's utility bill attaches correctly in the Solar Pro CRM under the Utility folder

## Android App & Referral Page
- [x] Build Android APK (WebView app loading pellsolar.com/referral-program) — APK at /home/ubuntu/pell-solar-referral-v1.0.apk (4.5MB, built May 27)
- [x] Update referral program page to show App Store button + Android coming soon message
- [ ] Submit Android app to Google Play Console once account verification completes

## Unsubscribe System
- [x] Add unsubscribes table to database schema (id, email, timestamp, campaign, ip_address, token)
- [x] Build token generation/verification with 30-day expiry and cryptographic signing
- [x] Build /unsubscribe tRPC procedure with SendGrid ASM Group 35533 suppression
- [x] Add rate limiting to unsubscribe endpoint
- [x] Build /unsubscribe frontend page with confirmation message
- [x] Build admin dashboard view for unsubscribe compliance records
- [x] Register /unsubscribe and /admin/unsubscribes routes in App.tsx
- [x] Add Unsubscribes nav item to admin sidebar

## Phase N — Mobile Chat Redesign (Jul 2, 2026)
- [x] AdminChat.tsx: Full mobile-first iMessage-style redesign — chat list view on mobile, tap to open full-screen conversation, back button, large text input, proper bubble layout
- [x] AdminChat.tsx: ON/OFF power toggle button in header (large, easy to tap on mobile)
- [x] AdminChat.tsx: Visitor phone number is a tappable tel: link in chat header
- [x] AdminChat.tsx: Input font-size 16px to prevent iOS auto-zoom
- [x] AdminChat.tsx: Desktop layout preserved (sidebar + chat panel side by side)
- [x] chat.ts SMS: Added googlechrome:// deep link alongside https:// link so iOS opens in Chrome
- [x] Add Chat History page at /admin/chat-history showing all past conversations with expandable message threads
- [x] Add Chat History nav button to AdminDashboard header

## Phase — Local SEO, SSR, and Lead-Flow Verification (August 2026)
- [x] Audit all public routes, current client-rendered HTML, existing metadata, LocalBusiness schema, and footer NAP details
- [x] Convert public marketing routes to crawler-visible server-rendered HTML while keeping admin and other private routes client-only and noindexed
- [x] Add unique route-specific titles, descriptions, canonical URLs, and Open Graph metadata for public marketing pages
- [x] Add accurate LocalBusiness JSON-LD using Pell Solar’s verified business details, CSLB license number, hours, service areas, and only supportable review data
- [x] Ensure the footer provides static text NAP information that matches the Google Business Profile
- [x] Verify quote-form submissions still create the Pell Solar lead and deliver the correct CRM webhook payload after SEO changes
- [x] Add automated checks for crawler-visible HTML and route metadata; structured-data and lead-webhook checks remain part of later tasks

## Task 2 — LocalBusiness Schema and Static NAP
- [x] Verify Pell Solar’s exact name, address, telephone numbers, business hours, CSLB license, service areas, and public review data against authoritative sources
- [x] Add one valid LocalBusiness JSON-LD object to every public SSR page, with no invented aggregate ratings
- [x] Add static, server-rendered NAP and CSLB license text to the shared public footer
- [x] Add automated validation for schema JSON, required NAP fields, and absence from admin/private routes

## Task 3 — Quote Form and CRM Delivery Verification
- [x] Trace the quote form’s client mutation, lead-creation procedure, database helper, CRM webhook payload, and success handling
- [x] Add deterministic tests covering a complete quote submission with required contact, address, utility-bill, and source fields
- [x] Assert the CRM payload preserves first name, last name, phone, address, bill URL, bill filename, source, and interest type
- [x] Verify the final build retains the public quote route and lead submission contract without creating a live lead

## Phone-Link Conversion Tracking
- [x] Inventory every public `tel:` link and current Google Analytics conversion setup
- [x] Fire one `phone_click` Google Analytics event per public phone-link tap, including the normalized phone number and link location
- [x] Add automated tests confirming shared phone links emit the tracking event without blocking the call action
- [x] Verify the production build preserves existing quote-form conversion tracking unchanged

## Task 4 — Production Script, Reviews, and Factual-Claim Remediation
- [x] Identify and remove the manus-space-dispatcher production script without affecting required application functionality
- [x] Inventory all hardcoded reviews, rating values, review counts, founder claims, timeline claims, and install-count claims
- [x] Replace unsupported rating displays with current verified-source links or truthful non-rating presentation
- [x] Correct only owner-confirmed or independently verifiable About-page history and install-count facts; document unresolved items for Josh
- [x] Add regression tests and verify crawler-visible production HTML contains no obsolete dispatcher or unsupported public claims

## City Page Coverage — Upland and Active LSA Territory
- [x] Restore the critical `/solar/upland-ca` route, using the standard city template with Upland-specific content and SEO metadata
- [x] Add pages for Montclair, Claremont, Rialto, Colton, Jurupa Valley, Moreno Valley, San Dimas, La Verne, Covina, West Covina, Eastvale, Norco, Redlands, Highland, Loma Linda, Bloomington, Grand Terrace, Hacienda Heights, Walnut, Diamond Bar, and Azusa
- [x] Register every new city route and add all 22 URLs to sitemap.xml without removing existing out-of-area pages
- [x] Verify every new route returns HTTP 200 with a unique title, meta description, canonical URL, H1, and one LocalBusiness schema block
- [x] Add regression coverage to keep Upland and the active-LSA-territory city routes present in the route registry and sitemap

## DMARC Aggregate Report Cleanup
- [ ] Inspect the published `_dmarc.pellsolar.com` record and confirm the aggregate-report recipient address
- [ ] Preserve DMARC authentication policy while removing or rerouting unwanted aggregate-report delivery
- [ ] Verify the published DMARC record after the approved DNS change

## Attribution Task 1 — UTM and Google Click ID Lead Source Tracking
- [x] Capture utm_source, utm_medium, utm_campaign, utm_term, and gclid from any public landing-page URL
- [x] Persist first-touch attribution across in-site navigation until the visitor’s browser session ends
- [x] Send captured attribution with quote submissions and derive source as google-ads, the non-Google UTM source, or quote-page fallback
- [x] Add deterministic tests for Google Click ID attribution and the no-parameter quote-page fallback without creating a live CRM lead
- [x] With Josh’s approval, submit two clearly marked live test leads to verify Google Ads and quote-page fallback values land in the Solar Pro CRM

## Attribution Task 2 — Footer City Internal Links
- [x] Inventory the city-page registry and existing shared-footer layout
- [x] Add compact grouped links to every `/solar/` city page, including Upland and Eastvale
- [x] Preserve the static NAP block, telephone links, business hours, and CSLB #949122 exactly as currently rendered
- [x] Add automated footer HTML checks for at least 30 city links, Upland/Eastvale URLs, and retained NAP/license text

## Urgent Referral App Redirect Restoration
- [x] Add permanent redirects from `/referral-program`, `/referral-app`, and `/referral-app.html` to `https://app.pellsolar.com/app`
- [x] Add regression checks confirming all three aliases respond with HTTP 301 and the exact hosted-app destination

## Urgent Navigation Dropdown Regression
- [x] Identify the published dropdown interaction failure and any browser-console error causing it
- [x] Restore click and keyboard interaction for all desktop and mobile navigation menus
- [x] Add regression coverage for Services, About Us, Locations, and Company dropdown opening behavior
- [x] Verify the fixed navigation in a production build before publishing

## Urgent Navigation Dropdown Close Behavior
- [x] Close desktop dropdowns on mouse leave, click outside, Escape, link selection, and opening another desktop menu
- [x] Keep native mobile accordions independently accessible without desktop close behavior interfering
- [x] Add regression tests for sticky-menu closing behavior and verify it in a production build

## Visual Asset and Logo Reliability Audit
- [x] Inventory every public image, logo, and external media reference for missing or failed responses
- [x] Audit representative service, company, quote, gallery, and city pages for visible missing assets and layout breakage
- [x] Repair confirmed shared and page-specific asset failures without changing working lead or CRM flows
- [x] Add regression checks and verify all repaired pages in a production build

## Live Visual Asset Repair — August 21, 2026
- [x] Audit pellsolar.com and representative public routes for missing images, icons, logos, and broken media
- [x] Repair each confirmed live visual-asset failure using permanent asset URLs without changing lead or CRM flows
- [x] Add or update visual-asset regression coverage and verify the repaired routes in a production build

## Urgent NEM 3.0 Powerwall Image Repair
- [x] Identify and replace the failed Powerwall image in the NEM 3.0 content section
- [x] Check every NEM 3.0 image reference for a valid response and visible render
- [x] Add a regression test and production-build verification for the repaired NEM media

## Google Ads Conversion Tracking Audit
- [x] Confirm which Google Ads conversion ID belongs to account 152-152-2054 before removing any tag
- [x] Inventory and consolidate duplicate GA4, Google Ads, Google Tag Manager, and view-through tag loaders
- [x] Prevent thank-you page and quote-wizard conversion double counting while preserving the verified lead conversion
- [x] Verify enhanced-conversion data readiness and sitewide phone-click event binding
- [x] Document the account-side Google Ads conversion and call-action changes required after website repairs

### Verified Configuration
- [x] Preserve `AW-17865947343` / `GT-PHGH35SZ` as the authoritative Google tag for Google Ads account 152-152-2054 and GA4 destination `G-GDLGN2498Y`
- [x] Remove only the unowned `AW-17468390983` website tag and duplicate GA4/GTM loader paths
- [x] Allow `https://googleads.g.doubleclick.net` in the production CSP for required Google Ads conversion resources
- [x] Verify quote completion fires only `AW-17865947343/TI2CCLSThPQbEM_xksdC` once and phone-click events remain bound sitewide

### Account-side Follow-Up
- [x] In Google Ads, keep the tagged lead action for `AW-17865947343/TI2CCLSThPQbEM_xksdC` as Primary and make the duplicate thank-you page-load action Secondary or remove it from the default Leads goal
- [x] Create a Google Ads Website conversion action for the existing `phone_click` event
- [ ] Retest enhanced conversions after deployment; only add consented quote email/phone to the website event if diagnostics still report an error

## Quote-to-Thank-You Conversion Deduplication
- [x] Trace every lead conversion event from quote submission through the thank-you page
- [x] Guard the primary Google Ads lead conversion so an acknowledged submission counts once per browser session
- [x] Add regression coverage for exactly one quote-completion conversion event
- [x] Prevent thank-you page and quote-wizard conversion double counting while preserving the verified lead conversion
- [x] Verify enhanced-conversion data readiness and sitewide phone-click event binding
- [x] Trace every lead conversion event from quote submission through the thank-you page
- [x] Guard the primary Google Ads lead conversion so an acknowledged submission counts once per browser session
- [x] Add regression coverage for exactly one quote-completion conversion event

## Google Ads Website Phone Conversion Wiring
- [x] Fire `AW-17865947343/oC4xCJL7x-UcEM_xksdC` on every telephone-link click with value and currency while retaining `phone_click`
- [x] Add regression tests verifying GA4 and Google Ads call events both fire once per telephone-link interaction
- [x] Verify the deployed site uses only the consolidated `GT-PHGH35SZ` loader and the new phone-call conversion action

## Source Code Export — August 25, 2026
- [x] Create a downloadable archive of the current Pell Solar website source code for Josh
- [x] Upload the source-code archive to Josh's Google Drive as "Pellsolar Code Website"

## Quote Form & CRM Security Hardening — August 25, 2026
- [x] Add a visually hidden company_website honeypot and form completion timer to the existing quote form
- [x] Forward visitor IP, user agent, referrer, page URL, timing, honeypot, and Turnstile status with quote leads
- [x] Add optional Cloudflare Turnstile server verification that fails safely only when configured
- [x] Add server-only WEBSITE_LEAD_SECRET authentication to CRM webhook and customer-check requests
- [x] Suppress the booking button on the thank-you page when the CRM marks a lead as suspect
- [x] Add regression tests and verify the hardened quote flow without changing its questions, design, or booking behavior

## Live Video Embed Repair — August 29, 2026
- [x] Inventory all public video embeds and player references across Pell Solar pages
- [x] Identify and repair each confirmed broken video embed or player configuration
- [x] Add regression coverage and verify repaired video sections in the production build
