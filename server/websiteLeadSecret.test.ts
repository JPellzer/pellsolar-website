import { describe, expect, it } from "vitest";

const CRM_CUSTOMER_CHECK_URL = process.env.CRM_TEST_CUSTOMER_CHECK_URL;
const enabled = process.env.RUN_CRM_INTEGRATION_TESTS === 'true' && Boolean(CRM_CUSTOMER_CHECK_URL?.includes('dev'));

describe.skipIf(!enabled)("WEBSITE_LEAD_SECRET", () => {
  it("authenticates a harmless customer-check request", async () => {
    const secret = process.env.WEBSITE_LEAD_SECRET;
    expect(secret).toMatch(/^[a-f0-9]{40,}$/i);

    const response = await fetch(CRM_CUSTOMER_CHECK_URL!, {
      headers: { "X-Pell-Secret": secret! },
    });

    // A valid secret may return no match (404) or a normal successful lookup
    // response (200), but must not be rejected as unauthenticated.
    expect([200, 404]).toContain(response.status);
  }, 15_000);
});
