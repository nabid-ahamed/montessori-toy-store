"use client";

import { useState } from "react";
import { BadgeCheck, Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/placeholder-image";
import { cn } from "@/lib/utils";
import type { Review } from "@/lib/types";

// Soft brand-tone backgrounds for the initial avatars. Picked deterministically
// from the reviewer's name so the same person always gets the same colour.
const avatarPalette = [
  "bg-neem/15 text-neem-deep",
  "bg-terracotta/20 text-terracotta",
  "bg-mustard/30 text-ink",
  "bg-dusty-blue/25 text-ink",
  "bg-blush/40 text-ink",
];

/** Circular avatar generated from the first letter of the reviewer's name. */
function InitialAvatar({ name }: { name: string }) {
  const trimmed = name.trim();
  const initial = (trimmed.charAt(0) || "?").toUpperCase();
  // Sum the char codes so the colour is stable per name (not just first letter).
  const hash = Array.from(trimmed).reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const tone = avatarPalette[hash % avatarPalette.length];

  return (
    <span
      aria-hidden
      className={cn(
        "flex size-10 flex-none select-none items-center justify-center rounded-full font-display text-base font-bold",
        tone,
      )}
    >
      {initial}
    </span>
  );
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < Math.round(rating) ? "fill-mustard text-mustard" : "fill-cream-300 text-cream-300",
          )}
        />
      ))}
    </div>
  );
}

/** A single review row. */
function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(false);
  const count = (review.helpfulCount ?? 0) + (helpful ? 1 : 0);

  return (
    <article className="border-b border-cream-200 py-5 last:border-0">
      <div className="flex gap-3">
        <InitialAvatar name={review.nameBn} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-ink">{review.nameBn}</span>
            {review.verifiedPurchase ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-neem-deep">
                <BadgeCheck className="size-3.5" />
                Verified purchase
              </span>
            ) : null}
            <span className="text-xs text-ink-soft">{review.dateBn}</span>
          </div>

          <div className="mt-1.5 flex items-center gap-3">
            <Stars rating={review.rating} />
            {review.titleBn ? (
              <span className="font-display text-sm font-bold text-ink">
                {review.titleBn}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">{review.bodyBn}</p>

      {review.images?.length ? (
        <div className="mt-3 flex gap-2">
          {review.images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="size-16 overflow-hidden rounded-md border border-cream-200 bg-cream-50"
            >
              <PlaceholderImage tone="cream" className="size-full" label="Photo" />
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setHelpful((v) => !v)}
          aria-pressed={helpful}
          className={cn(
            "gap-1.5 text-xs font-medium text-ink-muted",
            helpful && "text-neem-deep",
          )}
        >
          <ThumbsUp className={cn("size-3.5", helpful && "fill-neem text-neem")} />
          Helpful{count > 0 ? ` (${count})` : ""}
        </Button>
      </div>
    </article>
  );
}

/** Rating breakdown — counts of 5★ down to 1★ as horizontal bars. */
function RatingBreakdown({ reviews }: { reviews: Review[] }) {
  const buckets = [5, 4, 3, 2, 1];
  const counts = buckets.map(
    (star) => reviews.filter((r) => Math.round(r.rating) === star).length,
  );
  const total = reviews.length || 1;

  return (
    <div className="w-full space-y-2">
      {buckets.map((star, i) => {
        const pct = (counts[i] / total) * 100;
        return (
          <div key={star} className="flex items-center gap-3 text-sm text-ink-muted">
            <span className="w-3 shrink-0 text-right font-medium tabular-nums">
              {star}
            </span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-cream-200">
              <div
                className="h-full rounded-full bg-neem transition-[width] duration-500 ease-out"
                // A tiny min keeps a rounded nub visible for small (non-zero) counts.
                style={{ width: counts[i] === 0 ? 0 : `max(0.75rem, ${pct}%)` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Customer reviews: overall rating card, rating breakdown bars, and the
 * review list with stars, verified badges, and helpful toggles.
 */
export function ProductReviews({
  reviews,
  rating,
  reviewCount,
}: {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}) {
  const list = reviews.length ? reviews : [];
  const avg = list.length
    ? list.reduce((sum, r) => sum + r.rating, 0) / list.length
    : rating;

  return (
    <section className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        Customer Reviews
      </h2>

      <div className="grid gap-6 rounded-xl border border-cream-200 bg-cream-50 p-5 sm:grid-cols-[auto_1fr] sm:gap-8">
        <div className="flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
          <span className="font-display text-5xl font-bold text-ink">{avg.toFixed(1)}</span>
          <Stars rating={avg} className="mt-2" />
          <span className="mt-2 text-sm text-ink-muted">
            Based on {reviewCount.toLocaleString("en-US")} reviews
          </span>
        </div>
        <div className="flex items-center sm:pl-8 sm:border-l sm:border-cream-200">
          <RatingBreakdown reviews={list} />
        </div>
      </div>

      <div>
        {list.length ? (
          list.map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <p className="py-8 text-center text-sm text-ink-muted">
            No reviews yet. Be the first to share your experience.
          </p>
        )}
      </div>
    </section>
  );
}
