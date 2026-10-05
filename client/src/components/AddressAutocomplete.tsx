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
 *
 * City / state / ZIP (ADDR-STICKY-PICK): they come from the suggestion the visitor picks.
 * A small edit after picking (adding a unit number, fixing a typo) keeps the picked
 * city / state / ZIP. Typing a different address without picking a suggestion drops them —
 * an old pick's city never rides along with a new street.
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

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
const leadingNumber = (s: string) => (norm(s).match(/^\d+[a-z]?/) || [""])[0];

/** Levenshtein distance, capped: returns cap + 1 as soon as the strings are further apart. */
export function editDistance(a: string, b: string, cap = 16): number {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (cur[j] < rowMin) rowMin = cur[j];
    }
    if (rowMin > cap) return cap + 1;
    prev = cur;
  }
  return prev[b.length];
}

/**
 * Is `typed` still the address that was picked (a small edit of it)?
 * Same house number, and either the picked city is still in the text or the text is within
 * a few characters of the picked address (room for "Apt 12" / "#4B" / a typo fix).
 */
export function isSmallEditOfPick(typed: string, picked: AddressParts): boolean {
  const t = norm(typed);
  if (!t) return false;
  const pickedNum = leadingNumber(picked.street || picked.full);
  if (pickedNum && leadingNumber(typed) !== pickedNum) return false;
  if (picked.city && (" " + t + " ").includes(" " + norm(picked.city) + " ")) return true;
  const full = norm(picked.full);
  const street = norm(picked.street);
  return editDistance(t, full, 12) <= 12 || (!!street && editDistance(t, street, 12) <= 12);
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
  const pickedRef = useRef<AddressParts | null>(null);
  // The Places listener is attached once; always call the latest onChange from it.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
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

      const parts = { street, city, state, zip, full };
      pickedRef.current = parts;
      onChangeRef.current(full, parts);
    });

    autocompleteRef.current = ac;
  }, [ready]);

  const handleTyping = (text: string) => {
    const picked = pickedRef.current;
    if (picked && isSmallEditOfPick(text, picked)) {
      // Still the picked address (unit number added, typo fixed): keep its city / state / ZIP.
      onChange(text, { street: text, city: picked.city, state: picked.state, zip: picked.zip, full: text });
      return;
    }
    // A different address typed without picking a suggestion: the old pick no longer applies.
    pickedRef.current = null;
    onChange(text, { street: text, city: "", state: "", zip: "", full: text });
  };

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      value={value}
      onChange={e => handleTyping(e.target.value)}
      placeholder={placeholder}
      className={className}
      style={style}
      required={required}
      data-addr-fill="sticky-pick-v1"
      autoComplete="off"
    />
  );
}
