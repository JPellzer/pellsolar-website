import { makeRequest, type PlacesSearchResult } from "./_core/map";

export type GoogleReviewSummary = {
  provider: "Google";
  rating: number;
  reviewCount: number;
  profileUrl: string;
  fetchedAt: number;
};

let cachedSummary: GoogleReviewSummary | null = null;
let cacheExpiresAt = 0;

export function toGoogleReviewSummary(result: PlacesSearchResult): GoogleReviewSummary | null {
  const candidate = result.results.find((place) =>
    place.name.toLowerCase().includes("pell solar") && place.rating !== undefined && place.user_ratings_total !== undefined
  );

  if (!candidate || candidate.rating === undefined || candidate.user_ratings_total === undefined) return null;

  return {
    provider: "Google",
    rating: candidate.rating,
    reviewCount: candidate.user_ratings_total,
    profileUrl: "https://www.google.com/search?q=Pell+Solar+reviews",
    fetchedAt: Date.now(),
  };
}

export async function getLiveGoogleReviewSummary(): Promise<GoogleReviewSummary | null> {
  if (cachedSummary && Date.now() < cacheExpiresAt) return cachedSummary;

  try {
    const result = await Promise.race([
      makeRequest<PlacesSearchResult>("/maps/api/place/textsearch/json", {
        query: "Pell Solar 1326 Monte Vista Ave Upland CA 91786",
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Google review request timed out")), 4_000)),
    ]);
    cachedSummary = toGoogleReviewSummary(result);
    cacheExpiresAt = Date.now() + 6 * 60 * 60 * 1000;
    return cachedSummary;
  } catch (error) {
    console.warn("[Google reviews] Unable to refresh the live review summary", error);
    cacheExpiresAt = Date.now() + 15 * 60 * 1000;
    return cachedSummary;
  }
}
