export const ATTRIBUTION_SESSION_KEY = "pell-solar:attribution";

export type AttributionData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string; fbc?: string; fbp?: string; gbraid?: string; wbraid?: string; click_id?: string;
};

type SessionStorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "fbc", "fbp", "gbraid", "wbraid", "click_id"] as const;

function clean(value: string | null | undefined) {
  const trimmed = typeof value === "string" ? value.trim() : undefined;
  return typeof trimmed === "string" ? trimmed.slice(0,512) || undefined : undefined;
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
  if (typeof document !== 'undefined') {
    for (const key of ['fbp','fbc'] as const) {
      const cookie = document.cookie.split('; ').find(c => c.startsWith('_'+key+'='));
      if (cookie) captured[key] = cookie.slice(key.length+2, key.length+514);
    }
  }
  if (captured.fbclid && !captured.fbc) captured.fbc = 'fb.1.' + Date.now() + '.' + captured.fbclid;
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
  if (gclid || attribution?.gbraid || attribution?.wbraid || utmSource?.toLowerCase() === "google") return "google-ads";
  return utmSource || (attribution?.fbclid ? "facebook" : attribution?.click_id ? "nextdoor" : defaultSource);
}
