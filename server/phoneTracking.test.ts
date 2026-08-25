import { describe, expect, it } from "vitest";
import {
  getPhoneClickEventParams,
  getPhoneConversionEventParams,
  getPhoneTrackingInlineScript,
  GOOGLE_ADS_PHONE_CONVERSION,
} from "../shared/phoneTracking";

describe("phone-link conversion tracking", () => {
  it("normalizes a phone link and preserves the page location for analytics", () => {
    expect(getPhoneClickEventParams("tel:+1 (714) 455-3401", "/solar/rancho-cucamonga-ca")).toEqual({
      phone_number: "+17144553401",
      link_url: "tel:+1 (714) 455-3401",
      link_location: "/solar/rancho-cucamonga-ca",
    });
  });

  it("uses delegated click tracking without preventing the phone call action", () => {
    const script = getPhoneTrackingInlineScript();

    expect(script).toContain('a[href^="tel:"]');
    expect(script).toContain("phone_click");
    expect(script).toContain(GOOGLE_ADS_PHONE_CONVERSION);
    expect(script).toContain("'conversion'");
    expect(script).not.toContain("preventDefault");
  });

  it("uses the approved Google Ads website-call label with a nominal call value", () => {
    expect(getPhoneConversionEventParams()).toEqual({
      send_to: "AW-17865947343/oC4xCJL7x-UcEM_xksdC",
      value: 1.0,
      currency: "USD",
    });
  });
});
