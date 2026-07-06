"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductRail } from "@/components/product/product-rail";
import { cn } from "@/lib/utils";
import type { AgeTier, Product, Tone } from "@/lib/types";

// Static tone → dot-colour map. Tailwind v4 only detects literal class names,
// so a dynamic `bg-${tone}` would be dropped — same pattern as the hub view.
const toneDot: Record<Tone, string> = {
  cream: "bg-cream-200",
  neem: "bg-neem",
  "neem-soft": "bg-neem-soft",
  wood: "bg-wood-light",
  terracotta: "bg-terracotta",
  mustard: "bg-mustard",
  "dusty-blue": "bg-dusty-blue",
  blush: "bg-blush",
};

type TierBlock = { tier: AgeTier; products: Product[] };

/**
 * Client browser for the "Shop by Age" hub: a chip filter bar (All ages + one
 * chip per tier) that narrows the visible tier blocks. Defaults to showing all.
 */
export function AgeHubBrowser({ blocks }: { blocks: TierBlock[] }) {
  const [selected, setSelected] = useState<string>("all");
  const visible =
    selected === "all" ? blocks : blocks.filter((b) => b.tier.slug === selected);

  const chip = (active: boolean) =>
    cn(
      "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
      active
        ? "border-neem bg-neem text-paper"
        : "border-cream-300 bg-paper text-ink-muted hover:border-neem hover:text-neem-deep",
    );

  return (
    <>
      {/* sticky filter bar — offset by the collapsed header height so it stays
          reachable under the header while browsing down the tiers. The negative
          margins let its frosted background span the container's gutters. */}
      <div className="sticky top-20 z-30 mb-10 -mx-4 border-b border-cream-200/70 bg-paper/90 px-4 py-3 backdrop-blur-sm md:top-16 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex justify-start gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:justify-center [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setSelected("all")}
            className={cn(chip(selected === "all"), "flex-none")}
          >
            All ages
          </button>
          {blocks.map(({ tier }) => (
            <button
              key={tier.slug}
              type="button"
              onClick={() => setSelected(tier.slug)}
              className={cn(chip(selected === tier.slug), "flex-none")}
            >
              <span
                className={cn(
                  "size-2 flex-none rounded-full",
                  selected === tier.slug ? "bg-paper/80" : toneDot[tier.tone],
                )}
                aria-hidden
              />
              {tier.labelBn}
            </button>
          ))}
        </div>
      </div>

      {/* per-tier blocks (filtered) */}
      <div className="space-y-12">
        {visible.map(({ tier, products }) => (
          <section key={tier.slug} className="border-t border-cream-200 pt-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={cn("size-3 flex-none rounded-full", toneDot[tier.tone])}
                  aria-hidden
                />
                <div>
                  <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    {tier.labelBn}
                  </h2>
                  {tier.taglineBn ? (
                    <p className="text-sm text-ink-muted">{tier.taglineBn}</p>
                  ) : null}
                </div>
              </div>
              <Link
                href={tier.href}
                aria-label={`View all ${tier.labelBn}`}
                className="text-sm font-medium text-neem-deep underline-offset-4 hover:underline"
              >
                View all →
              </Link>
            </div>
            {products.length > 0 ? (
              <ProductRail products={products} />
            ) : (
              <p className="text-sm text-ink-muted">New toys coming soon.</p>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
