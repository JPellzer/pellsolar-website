/**
 * Live Google review summary (rating + review count) shown on the site.
 *
 * Google Places API (New) text search with the server key (GOOGLE_MAPS_API_KEY — a server-side
 * key, never the browser key, no Referer), the same call shape as the ZIP lookup
 * (zipCityState.ts). The old Places text search (maps/api/place/textsearch) is not allowed on
 * that key, so the summary always came back empty. (REVIEWS-PLACES-NEW)
 */
import { ENV } from "./_core/env";

export type GoogleReviewSummary = {
  provider: "Google";
  rating: number;
  reviewCount: number;
  profileUrl: string;
  fetchedAt: number;
};

export type PlacesReviewSearchResult = {
  places?: Array<{
    id?: string;
    displayName?: { text?: string };
    rating?: number;
    userRatingCount?: number;
  }>;
};

const REVIEW_LOOKUP_TIMEOUT_MS = 4_000;

let cachedSummary: GoogleReviewSummary | null = null;
let cacheExpiresAt = 0;

export function toGoogleReviewSummary(result: PlacesReviewSearchResult): GoogleReviewSummary | null {
  const candidate = (result.places ?? []).find((place) =>
    (place.displayName?.text ?? "").toLowerCase().includes("pell solar") &&
    place.rating !== undefined && place.userRatingCount !== undefined
  );

  if (!candidate || candidate.rating === undefined || candidate.userRatingCount === undefined) return null;

  return {
    provider: "Google",
    rating: candidate.rating,
    reviewCount: candidate.userRatingCount,
    profileUrl: "https://www.google.com/search?q=Pell+Solar+reviews",
    fetchedAt: Date.now(),
  };
}

async function fetchReviewSearch(): Promise<PlacesReviewSearchResult> {
  const key = ENV.googleMapsApiKey;
  if (!key) throw new Error("GOOGLE_MAPS_API_KEY is not set");
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), REVIEW_LOOKUP_TIMEOUT_MS);
  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "places.id,places.displayName,places.rating,places.userRatingCount",
      },
      body: JSON.stringify({ textQuery: "Pell Solar 1326 Monte Vista Ave Upland CA 91786", regionCode: "US", pageSize: 5 }),
      signal: ctrl.signal,
    });
    if (!response.ok) throw new Error(`Google review lookup HTTP ${response.status}`);
    return (await response.json()) as PlacesReviewSearchResult;
  } finally {
    clearTimeout(timer);
  }
}

export async function getLiveGoogleReviewSummary(): Promise<GoogleReviewSummary | null> {
  if (cachedSummary && Date.now() < cacheExpiresAt) return cachedSummary;

  try {
    const summary = toGoogleReviewSummary(await fetchReviewSearch());
    if (summary) {
      cachedSummary = summary;
      cacheExpiresAt = Date.now() + 6 * 60 * 60 * 1000;
    } else {
      // Nothing usable came back: keep what we had and look again soon, not in 6 hours.
      console.warn("[Google reviews] No Pell Solar result with a rating in the lookup");
      cacheExpiresAt = Date.now() + 15 * 60 * 1000;
    }
    return cachedSummary;
  } catch (error) {
    console.warn("[Google reviews] Unable to refresh the live review summary", error instanceof Error ? error.message : error);
    cacheExpiresAt = Date.now() + 15 * 60 * 1000;
    return cachedSummary;
  }
}
