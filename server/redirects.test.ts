import { describe, expect, it } from "vitest";
import { redirectMap } from "./redirects";

describe("referral application redirects", () => {
  const hostedReferralApp = "https://app.pellsolar.com/app";

  it.each(["/referral-program", "/referral-app", "/referral-app.html"])(
    "permanently redirects %s to the hosted referral application",
    (path) => {
      expect(redirectMap[path]).toBe(hostedReferralApp);
    },
  );
});
