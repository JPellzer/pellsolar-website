/// <reference types="@types/google.maps" />

/**
 * ZipMapPreview - Interactive mini-map preview for zip codes
 * Uses Google Maps JavaScript API with geocoding
 */

import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "@/lib/googleMaps";

interface ZipMapPreviewProps {
  zip: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ZipMapPreview({ zip, className, style }: ZipMapPreviewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!zip || zip.length !== 5) {
      setLoading(true);
      return;
    }

    let cancelled = false;

    async function initMap() {
      try {
        await loadGoogleMaps();
        if (cancelled) return;

        // Create map if not exists
        if (!mapRef.current && mapContainer.current) {
          mapRef.current = new window.google.maps.Map(mapContainer.current, {
            zoom: 12,
            center: { lat: 0, lng: 0 },
            disableDefaultUI: true, // Minimal UI for preview
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          });
        }

        if (!mapRef.current) return;

        // Geocode the zip
        const geocoder = new window.google.maps.Geocoder();
        const result = await geocoder.geocode({ address: `${zip}, USA` });

        if (cancelled) return;

        if (result.results && result.results.length > 0) {
          const location = result.results[0].geometry.location;

          // Update map center
          mapRef.current.setCenter(location);

          // Remove old marker if exists
          if (markerRef.current) {
            markerRef.current.map = null;
          }

          // Add new marker
          markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
            map: mapRef.current,
            position: location,
            title: zip,
          });

          setLoading(false);
          setError(false);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (err) {
        console.error("Map initialization error:", err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    initMap();

    return () => {
      cancelled = true;
    };
  }, [zip]);

  if (loading) {
    return (
      <div className={className} style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f4f8" }}>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>📍 Loading map...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className} style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f4f8" }}>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>📍 {zip}</p>
      </div>
    );
  }

  return <div ref={mapContainer} className={className} style={style} />;
}
