/// <reference types="@types/google.maps" />

/**
 * AddressAutocomplete — reusable address input with Google Maps Places autocomplete.
 * Uses the same Manus Maps proxy as Map.tsx (no API key needed from the user).
 *
 * Usage:
 *   <AddressAutocomplete
 *     value={address}
 *     onChange={(full, parts) => {
 *       setAddress(full);
 *       setCity(parts.city);
 *       setState(parts.state);
 *       setZip(parts.zip);
 *     }}
 *     placeholder="Start typing your address..."
 *     className="..."
 *   />
 */

import { useEffect, useRef, useState } from "react";

const API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;
const FORGE_BASE_URL =
  import.meta.env.VITE_FRONTEND_FORGE_API_URL ||
  "https://forge.butterfly-effect.dev";
const MAPS_PROXY_URL = `${FORGE_BASE_URL}/v1/maps/proxy`;

declare global {
  interface Window {
    google?: typeof google;
    _mapsScriptLoading?: Promise<void>;
  }
}

/** Load the Google Maps JS SDK once (idempotent). */
function loadMapsScript(): Promise<void> {
  if (window.google?.maps?.places) return Promise.resolve();
  if (window._mapsScriptLoading) return window._mapsScriptLoading;

  window._mapsScriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-maps-proxy]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = `${MAPS_PROXY_URL}/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-maps-proxy", "true");
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });

  return window._mapsScriptLoading;
}

export interface AddressParts {
  street: string;
  city: string;
  state: string;
  zip: string;
  full: string;
}

interface Props {
  value: string;
  onChange: (fullAddress: string, parts: AddressParts) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  required?: boolean;
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Start typing your address…",
  className = "",
  style,
  id,
  required,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadMapsScript()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(console.error);
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ready || !inputRef.current) return;
    if (autocompleteRef.current) return; // already initialized

    const ac = new window.google!.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" },
      fields: ["formatted_address", "address_components"],
    });

    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      if (!place.address_components) return;

      const get = (type: string) =>
        place.address_components!.find(c => c.types.includes(type))?.long_name ?? "";
      const getShort = (type: string) =>
        place.address_components!.find(c => c.types.includes(type))?.short_name ?? "";

      const streetNumber = get("street_number");
      const route = get("route");
      const city =
        get("locality") ||
        get("sublocality") ||
        get("neighborhood") ||
        get("administrative_area_level_2");
      const state = getShort("administrative_area_level_1");
      const zip = get("postal_code");
      const street = [streetNumber, route].filter(Boolean).join(" ");
      const full = place.formatted_address ?? `${street}, ${city}, ${state} ${zip}`;

      onChange(full, { street, city, state, zip, full });
    });

    autocompleteRef.current = ac;
  }, [ready, onChange]);

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      value={value}
      onChange={e => onChange(e.target.value, { street: e.target.value, city: "", state: "", zip: "", full: e.target.value })}
      placeholder={placeholder}
      className={className}
      style={style}
      required={required}
      autoComplete="off"
    />
  );
}
