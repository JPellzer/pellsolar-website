# Local SEO Verification — Task 2

Verified August 11, 2026 for Pell Solar structured data and static NAP implementation.

| Field | Value used in site markup | Verification source |
|---|---|---|
| Business name | Pell Solar / Pell Solar Inc. | Pell Solar’s legal pages and official site |
| Address | 1326 Monte Vista Ave #7, Upland, CA 91786 | Pell Solar’s official legal pages and footer |
| Telephone | +1-866-646-8499; +1-714-455-3401 | Pell Solar’s official legal pages and footer |
| Email | info@pellsolar.com | Pell Solar’s official legal pages and footer |
| Business hours | Monday–Saturday, 8:00 AM–5:00 PM | Pell Solar’s official schedule and footer |
| California license | CSLB #949122 | Pell Solar official site; public CSLB lookup is the governing verification tool |
| Service areas | Southern California; Treasure Valley, Idaho | Pell Solar’s official service-area pages |
| Yelp profile | https://www.yelp.com/biz/pell-solar-ontario | Yelp business listing; its current displayed rating and count differ from older site copy |
| Google reviews | Link only; no count or rating included in schema | Google values are volatile and the exact official profile rating was not retrieved programmatically |

## Schema policy

The schema uses stable business identity facts and links to public review profiles with `sameAs`. It intentionally omits `aggregateRating` and individual review objects: those values are dynamic, can drift from public listings, and self-published LocalBusiness review markup is not appropriate for this implementation. The shared footer links visitors to current Google and Yelp reviews without hardcoding volatile ratings or review counts.

## Sources

- https://pellsolar.com/terms
- https://pellsolar.com/privacy-policy
- https://pellsolar.com/schedule
- https://pellsolar.com/reviews
- https://www.yelp.com/biz/pell-solar-ontario
- https://www.cslb.ca.gov/onlineservices/checklicenseII/checklicense.aspx
