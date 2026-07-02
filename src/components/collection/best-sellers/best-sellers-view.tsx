import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Baby,
  Heart,
  Leaf,
  Package,
  ShieldCheck,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Reveal } from "@/components/policy/reveal";
import { BestSellersGrid } from "@/components/collection/best-sellers/best-sellers-grid";
import {
  bestSellerCta,
  bestSellerFaqs,
  bestSellerFeatures,
  bestSellerHero,
  bestSellerProducts,
  bestSellerReviews,
  type BestSellerFeatureIcon,
} from "@/lib/mock/best-sellers";
import { cn } from "@/lib/utils";

const featureIcon: Record<BestSellerFeatureIcon, LucideIcon> = {
  "shield-check": ShieldCheck,
  "badge-check": BadgeCheck,
  leaf: Leaf,
  award: Award,
};

// ---- collection statistics (derived from the mock best-seller list) --------
const totalProducts = bestSellerProducts.length;
const ageGroups = new Set(bestSellerProducts.map((p) => p.ageTierSlug)).size;
const avgRating = (
  bestSellerProducts.reduce((s, p) => s + p.rating, 0) / totalProducts
).toFixed(1);
const totalReviews = bestSellerProducts.reduce((s, p) => s + p.reviewCount, 0);

const stats: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Package, value: `${totalProducts}`, label: "Best-selling toys" },
  { icon: Baby, value: `${ageGroups}`, label: "Age groups" },
  { icon: Star, value: `${avgRating}★`, label: "Average rating" },
  {
    icon: Heart,
    value: `${(totalReviews / 1000).toFixed(1)}k+`,
    label: "Customer favourites",
  },
];

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${rating}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating ? "fill-mustard text-mustard" : "fill-cream-300 text-cream-300",
          )}
        />
      ))}
    </div>
  );
}

/**
 * Premium "Best Sellers" collection page. Editorial layout: hero, breadcrumb,
 * collection stats, the interactive product grid, trust features, featured
 * reviews, an FAQ accordion, and a closing CTA. Server component composing
 * client islands (Reveal, BestSellersGrid, FaqAccordion, AboutImage).
 */
export function BestSellersView() {
  return (
    <main className="flex-1 bg-cream-50">
      {/* ===== header (text-based for now; hero image to be added later) ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Collections", href: "/collections/all" },
            { label: "Best Sellers" },
          ]}
        />
        <Reveal className="mx-auto mt-8 max-w-3xl text-center lg:mt-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neem/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-neem-deep">
            <Heart className="size-3.5" />
            {bestSellerHero.badge}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {bestSellerHero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {bestSellerHero.subtitle}
          </p>
        </Reveal>
      </section>

      {/* ===== collection statistics ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={(i % 4) * 0.06}>
              <div className="flex h-full flex-col items-start rounded-2xl border border-cream-200 bg-card p-5 shadow-sm sm:p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-neem/10 text-neem-deep">
                  <stat.icon className="size-5" />
                </span>
                <p className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-sm text-ink-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== product grid ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 pb-16 sm:px-6 lg:px-8">
        <BestSellersGrid />
      </section>

      {/* ===== why parents love these toys ===== */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Why parents love these toys
            </h2>
            <p className="mt-3 text-ink-muted">
              The reasons these toys become family favourites, again and again.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellerFeatures.map((feature, i) => {
              const Icon = featureIcon[feature.icon];
              return (
                <Reveal key={feature.id} delay={(i % 4) * 0.08}>
                  <div className="group h-full rounded-3xl border border-cream-200 bg-cream-50/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-neem-soft hover:shadow-md">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-neem/10 text-neem-deep transition-colors duration-300 group-hover:bg-neem group-hover:text-paper">
                      <Icon className="size-7" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                      {feature.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== customer reviews ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Loved by thousands of families
          </h2>
          <p className="mt-3 text-ink-muted">Real reviews from real parents.</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellerReviews.map((review, i) => (
            <Reveal key={review.id} delay={(i % 4) * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-cream-200 bg-card p-6 shadow-sm">
                <ReviewStars rating={review.rating} />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-4 border-t border-cream-200 pt-4">
                  <p className="text-sm font-bold text-ink">{review.name}</p>
                  <p className="text-xs text-ink-soft">{review.location}</p>
                  <p className="mt-1 text-xs font-medium text-neem-deep">
                    Purchased: {review.product}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <FaqAccordion items={bestSellerFaqs} title="Frequently Asked Questions" />
          </Reveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28">
        <Reveal className="overflow-hidden rounded-3xl border border-cream-200 bg-neem/8 px-6 py-14 text-center sm:px-10 lg:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {bestSellerCta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">{bestSellerCta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={bestSellerCta.primary.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-neem px-7 text-sm font-bold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-neem-deep"
            >
              {bestSellerCta.primary.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={bestSellerCta.secondary.href}
              className="inline-flex h-12 items-center justify-center rounded-md border border-cream-300 bg-paper px-7 text-sm font-bold text-ink transition-colors duration-300 hover:border-neem hover:text-neem-deep"
            >
              {bestSellerCta.secondary.label}
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
