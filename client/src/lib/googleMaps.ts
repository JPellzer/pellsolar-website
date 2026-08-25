/// <reference types="@types/google.maps" />

/**
 * Shared Google Maps JavaScript API loader
 * Used by AddressAutocomplete and map previews
 */

declare global {
  interface Window {
    google?: typeof google;
    _mapsScriptLoading?: Promise<void>;
  }
}

// Google Maps browser key (public client-side key)
export const MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_BROWSER_KEY ||
  "AIzaSyA2FyZfKQvilDk3e0yV3W47mvAQ3AW5aDI";

/** Load the Google Maps JS SDK once (idempotent). */
export function loadGoogleMaps(): Promise<void> {
  if (window.google?.maps?.places) return Promise.resolve();
  if (window._mapsScriptLoading) return window._mapsScriptLoading;

  window._mapsScriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-google-maps]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&v=weekly&libraries=places,marker`;
    script.async = true;
    script.setAttribute("data-google-maps", "true");
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });

  return window._mapsScriptLoading;
}
