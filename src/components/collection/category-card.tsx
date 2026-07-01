"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { PlaceholderImage } from "@/components/placeholder-image";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

export type PeekTile = { tone: Tone; label: string };

// Soft tone wash for the card background. Tailwind v4 only detects literal class
// names, so this is a static map covering the whole Tone union.
const toneWash: Record<Tone, string> = {
  cream: "bg-cream-100",
  neem: "bg-neem/15",
  "neem-soft": "bg-neem-soft/40",
  wood: "bg-wood-light/50",
  terracotta: "bg-terracotta/20",
  mustard: "bg-mustard/25",
  "dusty-blue": "bg-dusty-blue/25",
  blush: "bg-blush/40",
};

type CategoryCardProps = {
  name: string;
  tagline?: string;
  href: string;
  tone: Tone;
  count: number;
  peek: PeekTile[];
  feature?: boolean;
  index: number;
};

/**
 * Premium category card for the "Shop by Category" hub: a tone-tinted panel with
 * a peek of the category's products (tone tiles), its name, tagline, and product
 * count, linking to the category collection page. Subtle motion — staggered
 * scroll entrance + hover lift — disabled under prefers-reduced-motion.
 */
export function CategoryCard({
  name,
  tagline,
  href,
  tone,
  count,
  peek,
  feature = false,
  index,
}: CategoryCardProps) {
  const reduce = useReducedMotion();
  // With no products, show a single tile in the card's own tone.
  const tiles: PeekTile[] = peek.length > 0 ? peek : [{ tone, label: name }];

  return (
    <motion.div
      className={cn("h-full", feature && "sm:col-span-2")}
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.4), ease: "easeOut" }}
      whileHover={reduce ? undefined : { y: -4 }}
    >
      <Link
        href={href}
        aria-label={`${name} — ${count > 0 ? `${count} toys` : "coming soon"}`}
        className={cn(
          "group flex h-full flex-col justify-between gap-6 rounded-3xl border border-cream-200/70 p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neem sm:p-6",
          toneWash[tone],
        )}
      >
        {/* product peek (decorative tone tiles) */}
        <div className="flex gap-2" aria-hidden>
          {tiles.slice(0, 3).map((t, i) => (
            <PlaceholderImage
              key={i}
              tone={t.tone}
              label=""
              className={cn(
                "rounded-xl border border-paper/50 transition-transform duration-300 group-hover:scale-[1.03]",
                feature ? "size-20 sm:size-24" : "size-14 sm:size-16",
              )}
            />
          ))}
        </div>

        {/* text + arrow */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className={cn("font-display font-bold text-ink", feature ? "text-2xl" : "text-lg")}>
              {name}
            </h3>
            {tagline ? <p className="mt-1 text-sm text-ink-muted">{tagline}</p> : null}
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
              {count > 0 ? `${count} toys` : "Coming soon"}
            </p>
          </div>
          <span className="flex size-9 flex-none items-center justify-center rounded-full bg-paper/80 text-neem-deep shadow-sm transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
