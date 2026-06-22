import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlaceholderImage } from "@/components/placeholder-image";
import { ageTiers } from "@/lib/mock/age-tiers";
import { products } from "@/lib/mock/products";

/** how many products sit in a given age tier (for the card's count line). */
const countFor = (slug: string) =>
  products.filter((p) => p.ageTierSlug === slug).length;

export function ShopByAge() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:max-w-[90rem] lg:px-8">
      {/* heading */}
      <div className="flex flex-col items-center text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
          Find the right fit
        </span>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Shop by Age
        </h2>
        <p className="mt-2 max-w-md text-sm text-ink-muted">
          Toys matched to every stage — from first grasp to imaginative play.
        </p>
      </div>

      {/* age-tier cards */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {ageTiers.map((t) => {
          const count = countFor(t.slug);
          return (
            <Link
              key={t.slug}
              href={t.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-cream-300 bg-card transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <PlaceholderImage
                tone={t.tone}
                label={t.labelBn}
                className="aspect-[4/3] w-full font-display text-lg"
              />
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-base font-bold text-ink sm:text-lg">
                  {t.labelBn}
                </h3>
                {t.taglineBn ? (
                  <p className="mt-0.5 text-xs text-ink-muted sm:text-sm">
                    {t.taglineBn}
                  </p>
                ) : null}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-ink-soft">
                    {count} {count === 1 ? "toy" : "toys"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-neem-deep">
                    Shop
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
