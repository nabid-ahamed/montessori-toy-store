"use client";

import { useEffect } from "react";
import { recordView } from "@/lib/recently-viewed";

/**
 * Records the current product in the browser's recently-viewed history on mount.
 * Renders nothing — drop it on any product page with the product's slug.
 */
export function RecentlyViewedTracker({ slug }: { slug: string }) {
  useEffect(() => {
    recordView(slug);
  }, [slug]);

  return null;
}
