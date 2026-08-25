import { describe, expect, it } from "vitest";
import { toGoogleReviewSummary } from "./googleReviews";

describe("live Google review summary", () => {
  it("uses only the matching Pell Solar result and preserves current Google values", () => {
    const summary = toGoogleReviewSummary({
      status: "OK",
      results: [
        { place_id: "other", name: "Other Solar", formatted_address: "Upland, CA", geometry: { location: { lat: 0, lng: 0 } }, rating: 5, user_ratings_total: 999, types: [] },
        { place_id: "pell", name: "Pell Solar", formatted_address: "1326 Monte Vista Ave, Upland, CA", geometry: { location: { lat: 1, lng: 1 } }, rating: 4.7, user_ratings_total: 31, types: [] },
      ],
    });

    expect(summary).toMatchObject({ provider: "Google", rating: 4.7, reviewCount: 31 });
  });

  it("refuses to publish a summary when a matching source has no current rating data", () => {
    expect(toGoogleReviewSummary({
      status: "OK",
      results: [{ place_id: "pell", name: "Pell Solar", formatted_address: "Upland, CA", geometry: { location: { lat: 0, lng: 0 } }, types: [] }],
    })).toBeNull();
  });
});
