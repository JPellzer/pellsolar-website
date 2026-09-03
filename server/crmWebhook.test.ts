import { afterEach, describe, expect, it, vi } from "vitest";
import { postToCrm } from "./crmWebhook";

describe("website lead CRM webhook", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("sends visitor metadata and the server-only shared-secret header", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, deal_id: 77 }), { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await postToCrm({
      first_name: "Taylor",
      last_name: "Customer",
      type: "new_lead",
      visitor_ip: "198.51.100.42",
      user_agent: "PellSolarSecurityTest/1.0",
      referrer: "https://www.google.com/",
      page_url: "https://pellsolar.com/get-quote?gclid=TEST123",
      form_seconds: 14,
      honeypot: "",
      turnstile_ok: null,
    });

    expect(result).toMatchObject({ success: true, deal_id: 77 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://pellsolar-crm-prod.onrender.com/api/webhooks/website-lead",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "X-Pell-Secret": process.env.WEBSITE_LEAD_SECRET,
        }),
      }),
    );
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      visitor_ip: "198.51.100.42",
      user_agent: "PellSolarSecurityTest/1.0",
      referrer: "https://www.google.com/",
      page_url: "https://pellsolar.com/get-quote?gclid=TEST123",
      form_seconds: 14,
      honeypot: "",
      turnstile_ok: null,
    });
  });
});
