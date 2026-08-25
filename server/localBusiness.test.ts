import { describe, expect, it } from "vitest";
import { getLocalBusinessJsonLd, LOCAL_BUSINESS } from "../shared/localBusiness";

describe("Pell Solar LocalBusiness schema", () => {
  it("contains the verified identity, address, contact, and California license details", () => {
    expect(LOCAL_BUSINESS.name).toBe("Pell Solar");
    expect(LOCAL_BUSINESS.legalName).toBe("Pell Solar Inc.");
    expect(LOCAL_BUSINESS.telephone).toBe("+1-866-646-8499");
    expect(LOCAL_BUSINESS.address.streetAddress).toBe("1326 Monte Vista Ave #7");
    expect(LOCAL_BUSINESS.address.addressLocality).toBe("Upland");
    expect(LOCAL_BUSINESS.address.addressRegion).toBe("CA");
    expect(LOCAL_BUSINESS.address.postalCode).toBe("91786");
    expect(LOCAL_BUSINESS.hasCredential.identifier).toBe("CSLB #949122");
  });

  it("describes verified hours and service regions", () => {
    expect(LOCAL_BUSINESS.openingHoursSpecification[0].opens).toBe("08:00");
    expect(LOCAL_BUSINESS.openingHoursSpecification[0].closes).toBe("17:00");
    expect(LOCAL_BUSINESS.areaServed.map((area) => area.name)).toEqual([
      "Southern California",
      "Treasure Valley, Idaho",
    ]);
  });

  it("keeps volatile self-published aggregate rating data out of the schema", () => {
    const parsed = JSON.parse(getLocalBusinessJsonLd()) as Record<string, unknown>;

    expect(parsed.aggregateRating).toBeUndefined();
    expect(parsed.review).toBeUndefined();
    expect(parsed.sameAs).toContain("https://www.yelp.com/biz/pell-solar-ontario");
  });
});
