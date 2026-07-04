"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Dedicated cinematic treatment for hero / lifestyle photography (child's hands
 * + toy, not a product-on-white shot). Full-bleed within its parent, `object-
 * cover` with a responsive min-height, a subtle bottom gradient for text
 * legibility, and a graceful cream fallback if the photo is missing.
 *
 * Drop the real photo at the named path — e.g. `/images/hero/lifestyle.webp` —
 * and pass it as `src`; no code changes needed.
 */
export function HeroImage({
  src,
  alt,
  priority = false,
  overlay = true,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  /** First/LCP hero image: load eagerly. */
  priority?: boolean;
  /** Bottom gradient scrim for overlaid text/CTA legibility (default on). */
  overlay?: boolean;
  className?: string;
  /** Extra classes on the <Image> itself (e.g. a Ken Burns animation). */
  imageClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative size-full min-h-[280px] overflow-hidden bg-cream-100 sm:min-h-[360px] lg:min-h-[460px]",
        className,
      )}
    >
      {failed ? (
        <div className="absolute inset-0 bg-gradient-to-br from-cream-200 to-cream-100" />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="100vw"
          onError={() => setFailed(true)}
          className={cn("object-cover", imageClassName)}
        />
      )}
      {overlay ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/35 to-transparent"
        />
      ) : null}
    </div>
  );
}
