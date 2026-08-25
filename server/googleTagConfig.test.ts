import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectFile = (relativePath: string) =>
  readFileSync(path.resolve(process.cwd(), relativePath), "utf8");

describe("verified Google measurement configuration", () => {
  it("loads one verified Google tag and configures the approved Ads and GA4 destinations", () => {
    const html = projectFile("client/index.html");

    expect(html).toContain("gtag/js?id=GT-PHGH35SZ");
    expect(html).toContain("gtag('config', 'AW-17865947343')");
    expect(html).toContain("gtag('config', 'G-GDLGN2498Y')");
    expect((html.match(/gtag\/js\?id=/g) ?? [])).toHaveLength(1);
    expect(html).not.toContain("AW-17468390983");
    expect(html).not.toContain("GTM-K973H9X");
  });

  it("keeps the verified quote-completion conversion and allows its required Ads resource", () => {
    const thankYou = projectFile("client/src/pages/ThankYou.tsx");
    const server = projectFile("server/_core/index.ts");

    expect(thankYou).toContain("AW-17865947343/TI2CCLSThPQbEM_xksdC");
    expect(server).toContain("https://googleads.g.doubleclick.net");
  });
});
