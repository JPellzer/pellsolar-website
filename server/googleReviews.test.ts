import { describe, expect, it } from "vitest";
import { toGoogleReviewSummary } from "./googleReviews";

describe("live Google review summary", () => {
  it("uses only the matching Pell Solar result and preserves current Google values", () => {
    const summary = toGoogleReviewSummary({
      places: [
        { id: "other", displayName: { text: "Other Solar" }, rating: 5, userRatingCount: 999 },
        { id: "pell", displayName: { text: "Pell Solar" }, rating: 4.7, userRatingCount: 31 },
      ],
    });

    expect(summary).toMatchObject({ provider: "Google", rating: 4.7, reviewCount: 31 });
  });

  it("refuses to publish a summary when a matching source has no current rating data", () => {
    expect(toGoogleReviewSummary({
      places: [{ id: "pell", displayName: { text: "Pell Solar" } }],
    })).toBeNull();
  });
});
