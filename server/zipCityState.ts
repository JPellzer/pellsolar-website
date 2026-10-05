/**
 * City + state for a ZIP, from the same Google geocode lookup the quote form's ZIP step uses
 * (geo.geocodeZip). Used right before a lead is forwarded to the CRM, when the visitor typed an
 * address without picking a suggestion and so sent no city / state. (ZIP-CITY-FILL)
 *
 * Never throws and never holds a submission up: a short timeout, and any failure (no key,
 * no result, a result for a different ZIP) returns {} so the lead goes out with what we have.
 */
import { makeRequest, type GeocodingResult } from "./_core/map";

const ZIP_LOOKUP_TIMEOUT_MS = 1500;

export async function cityStateFromZip(
  zip: string | undefined | null,
  timeoutMs: number = ZIP_LOOKUP_TIMEOUT_MS,
): Promise<{ city?: string; state?: string }> {
  const z = String(zip ?? "").match(/\d{5}/)?.[0];
  if (!z) return {};
  try {
    const result = await Promise.race([
      makeRequest<GeocodingResult>("/maps/api/geocode/json", { address: `${z}, USA` }),
      new Promise<null>(resolve => setTimeout(() => resolve(null), timeoutMs)),
    ]);
    const first = result?.results?.[0];
    if (!first) return {};
    const comp = (type: string) => first.address_components.find(c => c.types.includes(type));
    // Only trust a result that is this exact US ZIP.
    if (comp("postal_code")?.short_name !== z) return {};
    if (comp("country") && comp("country")!.short_name !== "US") return {};
    const city = (
      comp("locality") || comp("postal_town") || comp("sublocality") || comp("neighborhood") || comp("administrative_area_level_3")
    )?.long_name;
    const state = comp("administrative_area_level_1")?.short_name;
    return { city: city || undefined, state: state || undefined };
  } catch {
    return {};
  }
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
