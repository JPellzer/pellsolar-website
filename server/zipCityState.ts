/**
 * ZIP lookup — the one Google call behind the quote form's ZIP step (geo.geocodeZip) and the
 * city + state fill done right before a lead is forwarded to the CRM, when the visitor typed an
 * address without picking a suggestion and so sent no city / state. (ZIP-CITY-FILL)
 *
 * Google Places API (New) text search on "<zip>, USA" with the server key (GOOGLE_MAPS_API_KEY —
 * a server-side key, never the browser key, no Referer). A result is used only when it is this
 * exact US ZIP.
 *
 * Never throws and never holds a submission up: a short timeout, and any failure (no key,
 * no result, a result for a different ZIP) returns null / {} so the lead goes out with what we have.
 */
import { ENV } from "./_core/env";

const ZIP_LOOKUP_TIMEOUT_MS = 1500;

type PlacesComponent = { longText?: string; shortText?: string; types?: string[] };
type PlacesTextSearchResult = {
  places?: Array<{
    formattedAddress?: string;
    location?: { latitude: number; longitude: number };
    addressComponents?: PlacesComponent[];
  }>;
};

export type ZipPlace = { lat: number; lng: number; formatted: string; city?: string; state?: string };

export async function lookupZip(
  zip: string | undefined | null,
  timeoutMs: number = ZIP_LOOKUP_TIMEOUT_MS,
): Promise<ZipPlace | null> {
  const z = String(zip ?? "").match(/\d{5}/)?.[0];
  const key = ENV.googleMapsApiKey;
  if (!z || !key) return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "places.formattedAddress,places.location,places.addressComponents",
      },
      body: JSON.stringify({ textQuery: `${z}, USA`, regionCode: "US", pageSize: 3 }),
      signal: ctrl.signal,
    });
    if (!response.ok) {
      console.warn(`[ZIP lookup] Google lookup HTTP ${response.status}`);
      return null;
    }
    const result = (await response.json()) as PlacesTextSearchResult;
    for (const place of result.places ?? []) {
      const comp = (type: string) => (place.addressComponents ?? []).find(c => c.types?.includes(type));
      // Only trust a result that is this exact US ZIP.
      if (comp("postal_code")?.shortText !== z) continue;
      if (comp("country") && comp("country")!.shortText !== "US") continue;
      if (!place.location) continue;
      const city = (
        comp("locality") || comp("postal_town") || comp("sublocality") || comp("neighborhood") || comp("administrative_area_level_3")
      )?.longText;
      const state = comp("administrative_area_level_1")?.shortText;
      return {
        lat: place.location.latitude,
        lng: place.location.longitude,
        formatted: place.formattedAddress ?? "",
        city: city || undefined,
        state: state || undefined,
      };
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function cityStateFromZip(
  zip: string | undefined | null,
  timeoutMs: number = ZIP_LOOKUP_TIMEOUT_MS,
): Promise<{ city?: string; state?: string }> {
  const found = await lookupZip(zip, timeoutMs);
  return found ? { city: found.city, state: found.state } : {};
}

/** Fill a blank city / state from the ZIP. What the visitor sent is never replaced. */
export async function fillCityStateFromZip<T extends { city?: string; state?: string }>(
  fields: T,
  zip: string | undefined | null,
): Promise<T> {
  if ((fields.city && fields.state) || !zip) return fields;
  const found = await cityStateFromZip(zip);
  return { ...fields, city: fields.city || found.city, state: fields.state || found.state };
}
