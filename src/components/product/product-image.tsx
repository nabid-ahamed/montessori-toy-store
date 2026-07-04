"use client";

import React from "react";
import { PlaceholderImage } from "@/components/placeholder-image";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

// Probe order: prefer the optimised .webp, fall back to legacy formats.
const EXTENSIONS = [".webp", ".png", ".jpg", ".jpeg", ".gif"];

/**
 * The single source of truth for rendering a product photo. Resolves the real
 * file from `/images/products/{slug}/{num}.{ext}` (probing extensions, .webp
 * first) and applies the shared premium treatment: `object-contain` so nothing
 * is ever cropped, a uniform ~14% float padding so every product sits
 * identically inside its frame, a skeleton shimmer + blur-in while loading, and
 * a branded neutral placeholder (never a broken-image icon) when no file exists.
 *
 * It renders a transparent layer — the surrounding <ProductFrame> supplies the
 * background, radius and shadow — so multiple instances can be stacked for the
 * card hover-swap without their backgrounds fighting.
 *
 * `priority` marks above-the-fold imagery (eager load); everything else lazy
 * loads with async decoding.
 */
export function ProductImage({
  slug,
  imageNum,
  label,
  fallbackTone,
  className,
  padded = true,
  priority = false,
}: {
  slug: string;
  imageNum: number;
  label: string;
  fallbackTone: Tone;
  className?: string;
  /** Apply the uniform ~14% float padding (default). Pass false to opt out. */
  padded?: boolean;
  /** Above-the-fold image: load eagerly instead of lazily. */
  priority?: boolean;
}) {
  const [imagePath, setImagePath] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">(
    "loading",
  );

  React.useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setImagePath(null);

    const tryExtension = (index: number) => {
      if (cancelled) return;
      if (index >= EXTENSIONS.length) {
        setStatus("error");
        return;
      }
      const path = `/images/products/${slug}/${imageNum}${EXTENSIONS[index]}`;
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        setImagePath(path);
        setStatus("ready");
      };
      img.onerror = () => tryExtension(index + 1);
      img.src = path;
    };

    tryExtension(0);
    return () => {
      cancelled = true;
    };
  }, [slug, imageNum]);

  const pad = padded ? "p-[14%]" : undefined;

  // No file resolved — show the branded neutral placeholder.
  if (status === "error") {
    return (
      <PlaceholderImage
        tone={fallbackTone}
        label={label}
        className={cn("size-full", pad, className)}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* skeleton shimmer while the photo resolves/decodes */}
      {status !== "ready" ? (
        <div className="absolute inset-0 animate-pulse bg-frame" aria-hidden />
      ) : null}
      {imagePath ? (
        <img
          src={imagePath}
          alt={`${label} - Image ${imageNum}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "size-full object-contain transition-[opacity,filter] duration-500 ease-out",
            pad,
            status === "ready" ? "opacity-100 blur-0" : "opacity-0 blur-md",
          )}
        />
      ) : null}
    </div>
  );
}
