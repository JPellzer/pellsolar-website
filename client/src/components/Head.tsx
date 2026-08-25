import { useEffect } from "react";
import { useLocation } from "wouter";
import { getSeoMeta } from "@shared/seo";

/** Keeps the browser tab title aligned when visitors navigate after hydration. */
export default function Head() {
  const [location] = useLocation();

  useEffect(() => {
    document.title = getSeoMeta(location).title;
  }, [location]);

  return null;
}
