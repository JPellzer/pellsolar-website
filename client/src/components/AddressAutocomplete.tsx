/// <reference types="@types/google.maps" />

/**
 * AddressAutocomplete — reusable address input with Google Maps Places autocomplete.
 * Loads Google Maps JS API directly (no proxy).
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
import { loadGoogleMaps } from "@/lib/googleMaps";

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
    loadGoogleMaps()
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
