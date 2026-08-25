import {
  ATTRIBUTION_SESSION_KEY,
  captureAttribution,
  deriveLeadSource,
  readSessionAttribution,
} from "@shared/attribution";
import { describe, expect, it } from "vitest";

class MemorySessionStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

describe("session attribution", () => {
  it("persists Google Click ID and UTM data from a landing page through later navigation", () => {
    const storage = new MemorySessionStorage();

    const landing = captureAttribution(
      "?utm_source=google&utm_medium=cpc&utm_campaign=solar-search&utm_term=solar+upland&gclid=TEST123",
      storage,
    );
    const quotePage = captureAttribution("", storage);

    expect(landing.gclid).toBe("TEST123");
    expect(quotePage).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "solar-search",
      utm_term: "solar upland",
      gclid: "TEST123",
    });
    expect(readSessionAttribution(storage)).toEqual(quotePage);
    expect(storage.getItem(ATTRIBUTION_SESSION_KEY)).toContain("TEST123");
    expect(deriveLeadSource("quote-page", quotePage)).toBe("google-ads");
  });

  it("uses a non-Google UTM source and preserves the quote-page fallback", () => {
    expect(deriveLeadSource("quote-page", { utm_source: "facebook" })).toBe("facebook");
    expect(deriveLeadSource("quote-page", {})).toBe("quote-page");
  });
});
