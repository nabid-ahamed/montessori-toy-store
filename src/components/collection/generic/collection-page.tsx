import Link from "next/link";
import { ArrowRight, Star, type LucideIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Breadcrumb } from "@/components/breadcrumb";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Reveal } from "@/components/policy/reveal";
import { CollectionExplorer } from "@/components/collection/generic/collection-explorer";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/lib/mock/product-faqs";
import type { Product, Tone } from "@/lib/types";

export type CollectionStat = { icon: LucideIcon; value: string; label: string };
export type CollectionFeature = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
};
export type CollectionTestimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
  tone: Tone;
};

export type CollectionPageConfig = {
  breadcrumb: { label: string; href?: string }[];
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  stats: CollectionStat[];
  products: Product[];
  badgeLabel?: string;
  searchPlaceholder?: string;
  whyTitle: string;
  whySubtitle: string;
  features: CollectionFeature[];
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  testimonials: CollectionTestimonial[];
  faqs: FaqEntry[];
  cta: {
    heading: string;
    text: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};

const avatarBg: Record<Tone, string> = {
  cream: "bg-cream-300 text-ink",
  neem: "bg-neem text-paper",
  "neem-soft": "bg-neem-soft text-neem-deep",
  wood: "bg-wood-light text-ink",
  terracotta: "bg-terracotta text-ink",
  mustard: "bg-mustard text-ink",
  "dusty-blue": "bg-dusty-blue text-ink",
  blush: "bg-blush text-ink",
};

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} of 5`}>
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
 * Reusable, config-driven collection page (text-first). Composes a header with
 * CTAs, collection stats, the interactive product explorer, a "why" feature
 * grid, a testimonials carousel, recently viewed, an FAQ accordion, and a
 * closing CTA. Pass a `CollectionPageConfig` to build any collection page.
 */
export function CollectionPage({ config }: { config: CollectionPageConfig }) {
  const { hero, cta } = config;

  return (
    <main className="flex-1 bg-cream-50">
      {/* ===== header (text-based; hero image can be added later) ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumb items={config.breadcrumb} />
        <Reveal className="mx-auto mt-8 max-w-3xl text-center lg:mt-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neem/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-neem-deep">
            {hero.badge}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href={hero.primary.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-neem px-7 text-sm font-bold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-neem-deep"
            >
              {hero.primary.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={hero.secondary.href}
              className="inline-flex h-12 items-center justify-center rounded-md border border-cream-300 bg-paper px-7 text-sm font-bold text-ink transition-colors duration-300 hover:border-neem hover:text-neem-deep"
            >
              {hero.secondary.label}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ===== collection statistics ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {config.stats.map((stat, i) => (
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

      {/* ===== product explorer ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 pb-16 sm:px-6 lg:px-8">
        <CollectionExplorer
          products={config.products}
          badgeLabel={config.badgeLabel}
          searchPlaceholder={config.searchPlaceholder}
        />
      </section>

      {/* ===== why (features) ===== */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {config.whyTitle}
            </h2>
            <p className="mt-3 text-ink-muted">{config.whySubtitle}</p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {config.features.map((feature, i) => (
              <Reveal key={feature.id} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-3xl border border-cream-200 bg-cream-50/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-neem-soft hover:shadow-md">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-neem/10 text-neem-deep transition-colors duration-300 group-hover:bg-neem group-hover:text-paper">
                    <feature.icon className="size-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                    {feature.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== testimonials carousel ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {config.testimonialsTitle}
          </h2>
          <p className="mt-3 text-ink-muted">{config.testimonialsSubtitle}</p>
        </Reveal>

        <Reveal className="mt-12">
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-4">
              {config.testimonials.map((t) => (
                <CarouselItem key={t.id} className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3">
                  <figure className="flex h-full flex-col rounded-2xl border border-cream-200 bg-card p-6 shadow-sm">
                    <ReviewStars rating={t.rating} />
                    <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      “{t.text}”
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-cream-200 pt-4">
                      <span
                        className={cn(
                          "flex size-11 flex-none items-center justify-center rounded-full font-display text-base font-bold",
                          avatarBg[t.tone],
                        )}
                        aria-hidden
                      >
                        {t.name.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-ink">{t.name}</p>
                        <p className="text-xs text-ink-soft">{t.location}</p>
                        <p className="mt-0.5 truncate text-xs font-medium text-neem-deep">
                          Purchased: {t.product}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 hidden sm:flex" />
            <CarouselNext className="right-2 hidden sm:flex" />
          </Carousel>
        </Reveal>
      </section>

      {/* ===== recently viewed (only shows when real history exists) ===== */}
      <div className="bg-paper">
        <RecentlyViewed
          title="Recently Viewed"
          subtitle="Pick up right where you left off."
          fallback={[]}
        />
      </div>

      {/* ===== FAQ ===== */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <FaqAccordion items={config.faqs} title="Frequently Asked Questions" />
          </Reveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28">
        <Reveal className="overflow-hidden rounded-3xl border border-cream-200 bg-neem/8 px-6 py-14 text-center sm:px-10 lg:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            {cta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">{cta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={cta.primary.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-neem px-7 text-sm font-bold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-neem-deep"
            >
              {cta.primary.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={cta.secondary.href}
              className="inline-flex h-12 items-center justify-center rounded-md border border-cream-300 bg-paper px-7 text-sm font-bold text-ink transition-colors duration-300 hover:border-neem hover:text-neem-deep"
            >
              {cta.secondary.label}
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
