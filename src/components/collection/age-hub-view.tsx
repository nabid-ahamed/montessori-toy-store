import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductRail } from "@/components/product/product-rail";
import { ageTiers } from "@/lib/mock/age-tiers";
import { products } from "@/lib/mock/products";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

// Static tone → dot-colour map. Tailwind v4 only detects literal class names,
// so a dynamic `bg-${tone}` would be dropped — same pattern as PlaceholderImage.
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

// Max product previews per tier rail (the rail scrolls; the tier PLP has the rest).
const MAX_PER_TIER = 8;

/**
 * "Shop by Age" hub: a hero plus one block per age tier — a colour-accented
 * header and a horizontal rail previewing that tier's products, linking to the
 * tier's full collection page. Server component; all interactivity lives inside
 * the reused ProductRail / ProductCard.
 */
export function AgeHubView() {
  return (
    <main className="flex-1 bg-paper">
      {/* hero */}
      <section className="mx-auto w-full max-w-[92rem] px-4 pt-6 pb-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop by Age" }]} />
        <div className="mt-6 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
            Shop by Age
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Toys for every stage
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-ink-muted">
            From first grasps to pretend play — find the right Montessori toys for
            your child&apos;s age and stage.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2" aria-hidden>
            {ageTiers.map((tier) => (
              <span key={tier.slug} className={cn("size-3 rounded-full", toneDot[tier.tone])} />
            ))}
          </div>
        </div>
      </section>

      {/* per-tier blocks */}
      <div className="mx-auto w-full max-w-[92rem] space-y-12 px-4 pb-16 sm:px-6 lg:px-8">
        {ageTiers.map((tier) => {
          const scoped = products
            .filter((p) => p.ageTierSlug === tier.slug)
            .slice(0, MAX_PER_TIER);
          return (
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
              {scoped.length > 0 ? (
                <ProductRail products={scoped} />
              ) : (
                <p className="text-sm text-ink-muted">New toys coming soon.</p>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
