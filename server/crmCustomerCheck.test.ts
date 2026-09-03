import { afterEach, describe, expect, it, vi } from "vitest";
import { checkCustomerInCrm } from "./crmCustomerCheck";

describe("CRM customer pre-check", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("sends the X-Pell-Secret header on the customer-check request", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ exists: false }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(checkCustomerInCrm("(714) 555-1234", "test@example.com")).resolves.toBe(false);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://pellsolar-crm-prod.onrender.com/api/check-customer?phone=7145551234&email=test%40example.com",
      expect.objectContaining({
        headers: expect.objectContaining({ "X-Pell-Secret": process.env.WEBSITE_LEAD_SECRET }),
      }),
    );
  });
});
