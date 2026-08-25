import { describe, expect, it } from "vitest";
import { CITY_LINKS } from "@shared/cityLinks";

describe("footer city links", () => {
  it("covers every current indexed solar city route, including Upland and Eastvale", () => {
    expect(CITY_LINKS.length).toBeGreaterThanOrEqual(30);
    expect(CITY_LINKS.map((city) => city.href)).toContain("/solar/upland-ca");
    expect(CITY_LINKS.map((city) => city.href)).toContain("/solar/eastvale-ca");
    expect(new Set(CITY_LINKS.map((city) => city.href)).size).toBe(CITY_LINKS.length);
  });
});
