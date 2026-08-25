# Google Ads Account Steps After Website Tag Repair

## Verified website configuration

The site now uses the one verified Google tag `GT-PHGH35SZ`. Its configured destinations are Google Ads `AW-17865947343` and GA4 `G-GDLGN2498Y`. The only hard-coded lead conversion is sent from the Thank You page after quote completion:

```text
AW-17865947343/TI2CCLSThPQbEM_xksdC
```

The site does not load `AW-17468390983` or `GTM-K973H9X`. Phone links emit one non-blocking `phone_click` event with `phone_number`, `link_url`, and `link_location`.

## One-time account changes

1. In **Goals → Conversions**, find the conversion action whose tag setup corresponds to `AW-17865947343/TI2CCLSThPQbEM_xksdC`. Keep that action **Primary** and include it in the Leads goal.
2. Find the duplicate **page-load** action that triggers when a URL contains `thank-you`. Change it to **Secondary** or remove it from the account-default Leads goal. Do not leave both lead actions Primary.
3. Create a new **Website** conversion action for the custom event `phone_click`. Include it as Primary only if website calls should optimize bidding; otherwise begin as Secondary until a few weeks of data confirms quality. Map the phone number event parameter for reporting if the Google Ads setup offers event parameters.
4. After the new deployment is live, use **Google tag diagnostics** to retest enhanced conversions. The site now permits `googleads.g.doubleclick.net`; if enhanced conversions still show an error, the next website change is to pass consented quote email and phone into the conversion tag at completion. Do not enable a second tag or a page-load duplicate to solve that warning.
5. In the Google tag’s domain configuration, keep `pellsolar.com` and `www.pellsolar.com`. Add any other domain only if Google diagnostics shows the same verified tag executing there intentionally.
