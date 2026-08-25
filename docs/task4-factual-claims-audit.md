# Task 4 Factual-Claim Audit

## Live Source Checked

- URL: `https://pellsolar.com/`
- Checked: 2026-08-11

## Findings Requiring Remediation

The live homepage currently displays hardcoded review figures and aspirational ratings, including Yelp `4.5 · 66 reviews`, Google `4.6 · 26 reviews`, and a `5-Star Rated` trust-bar claim. These figures are not safe as static application content because review scores and counts change and must not be represented as fixed site-owned data.

The source audit also found hardcoded ratings, review counts, a `5,000+ Systems Installed` claim, a named founder claim (`Shaun Pell`), and a detailed corporate timeline on the About page. The founder name and timeline dates have not been independently verified in this task and require owner confirmation before publication as factual assertions.

## Remediation Standard

Use links to the live Google and Yelp profiles without self-published aggregate scores or counts. Replace unverified narrative history and numerical installation totals with durable, non-numeric wording until Josh confirms the exact facts.
