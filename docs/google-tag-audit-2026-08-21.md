# Google Tag Audit — 2026-08-21

## Verified account configuration

Google Ads account `152-152-2054` identifies `AW-17865947343` / `GT-PHGH35SZ` as its Google tag. Its destinations are Google Ads `AW-17865947343` and GA4 `G-GDLGN2498Y`. The quote completion conversion label is `AW-17865947343/TI2CCLSThPQbEM_xksdC`. The user confirmed `AW-17468390983` is not referenced by this Ads account and must not remain on the site.

## Live DOM audit

The published homepage currently contains exactly two Google loader paths: one GTM loader for `GTM-K973H9X` and one gtag loader for `G-GDLGN2498Y`, with inline configuration for GA4 `G-GDLGN2498Y` and Ads `AW-17865947343`. The application source contains no reference to `AW-17468390983` and no application-owned DoubleClick view-through script. The remaining duplication risk is the parallel use of GTM and the hard-coded gtag path, which must be collapsed to the verified Google tag implementation.

## Required website changes

Use one gtag loader tied to the verified Google tag, configure both GA4 and Ads through that loader, remove the GTM loader and noscript iframe, and allow `https://googleads.g.doubleclick.net` in production `script-src` for conversion resources. Preserve the first-party script and Meta Pixel allowlist.

## Rebuilt production verification

The rebuilt production homepage contains one Google tag loader at `https://www.googletagmanager.com/gtag/js?id=GT-PHGH35SZ`, with the only Google destination configuration calls targeting `AW-17865947343` and `G-GDLGN2498Y`. The page exposes `window.gtag`, contains no GTM loader, and contains no `AW-17468390983` reference.

## Website-call conversion verification

With `window.gtag` stubbed in the rebuilt production homepage, a representative `tel:` link fired exactly two non-blocking events: the existing GA4 `phone_click` event with the normalized phone number and current page path, followed by the approved Google Ads conversion event with `send_to: AW-17865947343/oC4xCJL7x-UcEM_xksdC`, `value: 1.0`, and `currency: USD`.

## Quote conversion de-duplication verification

The rebuilt production `/thank-you` page was opened directly without a `lead_id`. It rendered normally and no `pellsolar-lead-conversion:*` session marker was created. This confirms an arbitrary direct or bookmarked thank-you-page visit does not create a Google Ads lead conversion. A server-confirmed quote completion now passes its returned lead ID to this page, where the matching session marker allows exactly one conversion for that lead in the current browser session.
