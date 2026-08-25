export const ATTRIBUTION_SESSION_KEY = "pell-solar:attribution";

export type AttributionData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
};

type SessionStorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"] as const;

function clean(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function getSessionStorage(): SessionStorageLike | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return window.sessionStorage;
  } catch {
    return undefined;
  }
}

export function extractAttribution(search: string | URLSearchParams): AttributionData {
  const params = typeof search === "string" ? new URLSearchParams(search) : search;
  return ATTRIBUTION_KEYS.reduce<AttributionData>((result, key) => {
    const value = clean(params.get(key));
    if (value) result[key] = value;
    return result;
  }, {});
}

export function readSessionAttribution(storage = getSessionStorage()): AttributionData {
  if (!storage) return {};
  try {
    const parsed = JSON.parse(storage.getItem(ATTRIBUTION_SESSION_KEY) || "{}") as AttributionData;
    return ATTRIBUTION_KEYS.reduce<AttributionData>((result, key) => {
      const value = clean(parsed[key]);
      if (value) result[key] = value;
      return result;
    }, {});
  } catch {
    return {};
  }
}

export function captureAttribution(search: string | URLSearchParams, storage = getSessionStorage()): AttributionData {
  const captured = extractAttribution(search);
  const existing = readSessionAttribution(storage);
  const combined = { ...existing, ...captured };

  if (storage && Object.keys(captured).length > 0) {
    try {
      storage.setItem(ATTRIBUTION_SESSION_KEY, JSON.stringify(combined));
    } catch {
      // Attribution remains available for the current submission even when storage is unavailable.
    }
  }

  return combined;
}

export function installAttributionCapture() {
  if (typeof window === "undefined") return;

  const captureCurrentLocation = () => captureAttribution(window.location.search);
  captureCurrentLocation();
  window.addEventListener("popstate", captureCurrentLocation);
}

export function hasAttribution(data: AttributionData) {
  return Object.values(data).some(Boolean);
}

export function deriveLeadSource(defaultSource: string, attribution?: AttributionData): string {
  const gclid = clean(attribution?.gclid);
  const utmSource = clean(attribution?.utm_source);
  if (gclid || utmSource?.toLowerCase() === "google") return "google-ads";
  return utmSource || defaultSource;
}
