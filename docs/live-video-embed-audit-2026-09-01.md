# Live Video Embed Audit — September 1, 2026

## Findings

The public website contains three YouTube video embeds: the homepage tax-credit video, the Battery Backup page Powerwall video, and the Tesla Powerwall page video.

The production Content Security Policy allowed only first-party and Cloudflare Turnstile frames. Consequently, it prevented the browser from loading YouTube embeds and the existing Google Maps embeds. This restriction was introduced while allowing Turnstile and was the primary site-wide cause of blank embedded-video areas.

The Tesla Powerwall page had an additional page-level fault: it referenced `0mKoEBCRpJk`, which is unavailable from YouTube’s public oEmbed endpoint. Pell Solar’s official YouTube channel identifies `yzb6ols_ffE` as its public video titled **Tesla Powerwall 3 | Whole-Home Backup Battery (Pell Solar)**.

## Repair

The production frame policy now permits only the embedded sources required by the public site:

| Source | Purpose |
|---|---|
| `https://challenges.cloudflare.com` | Optional Cloudflare Turnstile widget |
| `https://www.youtube.com` | Existing public YouTube embeds |
| `https://www.youtube-nocookie.com` | Privacy-enhanced YouTube embeds if used later |
| `https://www.google.com` | Existing Google Maps embeds |

The Tesla Powerwall iframe now uses `https://www.youtube.com/embed/yzb6ols_ffE`.

## Verification

The current live response header confirmed the faulty restrictive `frame-src` policy before repair. The replacement video returned HTTP 200 with Pell Solar’s page as the referrer and did not include YouTube error 153. TypeScript, the dedicated visual-asset regression test, the full 69-test suite, and the production build passed.

The screenshot utility renders cross-origin video frames as blank, so it is not used as a playback assertion. Browser and HTTP validation were used instead.
