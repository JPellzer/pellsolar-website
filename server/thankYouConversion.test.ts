import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("confirmed lead conversion tracking", () => {
  const quotePage = readFileSync(
    path.resolve(process.cwd(), "client/src/pages/QuotePage.tsx"),
    "utf8"
  );
  const thankYou = readFileSync(
    path.resolve(process.cwd(), "client/src/pages/ThankYou.tsx"),
    "utf8"
  );

  it("passes the server-confirmed lead id into the thank-you URL", () => {
    expect(quotePage).toContain('searchParams.set("lead_id", String(data.id))');
  });

  it("only fires conversion tags for confirmed leads and de-duplicates refreshes", () => {
    expect(thankYou).toContain('const leadId = params.get("lead_id")');
    expect(thankYou).toContain("if (!leadId) return");
    expect(thankYou).toContain("pellsolar-lead-conversion:${leadId}");
    expect(thankYou).toContain("window.sessionStorage.getItem(conversionKey)");
    expect(thankYou).toContain("AW-17865947343/TI2CCLSThPQbEM_xksdC");
  });

  it("suppresses appointment booking when the CRM marks the lead as suspect", () => {
    expect(quotePage).toContain('searchParams.set("suspect", "1")');
    expect(thankYou).toContain('const isSuspect = params.get("suspect") === "1"');
    expect(thankYou).toContain("{dealId && !isSuspect && (");
    expect(thankYou).toContain("{!isSuspect && <div className=\"flex flex-col sm:flex-row gap-4 justify-center mb-10\">");
  });
});
