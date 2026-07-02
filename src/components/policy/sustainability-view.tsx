import { Fragment } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  ChevronRight,
  Droplets,
  Gift,
  Globe,
  Hand,
  HandHeart,
  Heart,
  Leaf,
  Package,
  Recycle,
  Sprout,
  TreePine,
  Trees,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Counter } from "@/components/about/counter";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Reveal } from "@/components/policy/reveal";
import {
  sustainabilityCta,
  sustainabilityFaqs,
  sustainabilityImpact,
  sustainabilityIntro,
  sustainabilityLifecycle,
  sustainabilityMaterials,
  sustainabilityPillars,
  sustainabilityPledge,
  type SustainabilityIcon,
} from "@/lib/mock/sustainability";

// Icon key → lucide component (static map; bundlers only see literal keys).
const icons: Record<SustainabilityIcon, LucideIcon> = {
  "tree-pine": TreePine,
  trees: Trees,
  recycle: Recycle,
  leaf: Leaf,
  droplets: Droplets,
  package: Package,
  sprout: Sprout,
  award: Award,
  "hand-heart": HandHeart,
  hand: Hand,
  heart: Heart,
  gift: Gift,
  globe: Globe,
};

/**
 * Bespoke, text-forward "Sustainability" page. Editorial layout with no image
 * dependencies: an intro header, our commitment, sustainability pillars, impact
 * counters, materials & sourcing, a circular-lifecycle timeline, an FAQ
 * accordion, and a closing CTA. Server component composing client islands
 * (Reveal fade-ups, Counter, FaqAccordion); hover effects are CSS-only.
 */
export function SustainabilityView() {
  return (
    <main className="flex-1 bg-cream-50">
      {/* ===== intro header ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Sustainability" }]} />
        <Reveal className="mx-auto mt-10 max-w-3xl text-center lg:mt-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neem/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-neem-deep">
            <Leaf className="size-3.5" aria-hidden />
            {sustainabilityIntro.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
            {sustainabilityIntro.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {sustainabilityIntro.lead}
          </p>
        </Reveal>
      </section>

      {/* ===== our commitment ===== */}
      <section className="mx-auto grid w-full max-w-[80rem] gap-10 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-8 lg:pt-20 lg:pb-24">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
            {sustainabilityPledge.eyebrow}
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {sustainabilityPledge.heading}
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-muted">
            {sustainabilityPledge.lead}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-cream-200 rounded-3xl border border-cream-200 bg-paper px-6 shadow-sm sm:px-8">
            {sustainabilityPledge.points.map((p, i) => (
              <div key={p.title} className="flex items-start gap-4 py-5">
                <span className="flex size-10 flex-none items-center justify-center rounded-full bg-neem/10 text-neem-deep">
                  <Check className="size-5" strokeWidth={2.5} aria-hidden />
                </span>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs text-neem-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-base font-bold text-ink sm:text-lg">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== sustainability pillars ===== */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Sustainable at every step
            </h2>
            <p className="mt-3 text-ink-muted">
              Six commitments that shape how we grow, make, and pack every toy.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sustainabilityPillars.map((pillar, i) => {
              const Icon = icons[pillar.icon];
              return (
                <Reveal key={pillar.id} delay={(i % 3) * 0.08}>
                  <div className="group h-full rounded-3xl border border-cream-200 bg-cream-50/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-neem-soft hover:shadow-md">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-neem/10 text-neem-deep transition-colors duration-300 group-hover:bg-neem group-hover:text-paper">
                      <Icon className="size-7" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                      {pillar.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== impact by the numbers ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
            Our Impact
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Sustainability by the numbers
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sustainabilityImpact.map((stat, i) => (
            <Reveal key={stat.id} delay={(i % 4) * 0.08}>
              <div className="h-full rounded-3xl border border-cream-200 bg-cream-50/60 p-7 text-center">
                <div className="font-display text-4xl font-bold text-neem-deep sm:text-5xl">
                  {typeof stat.count === "number" ? (
                    <Counter
                      target={stat.count}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  ) : (
                    stat.value
                  )}
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{stat.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{stat.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== materials & sourcing ===== */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
              Materials &amp; Sourcing
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Earth-friendly from the ground up
            </h2>
            <p className="mt-3 text-ink-muted">
              Every material is chosen to be safe for your child and gentle on the planet.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sustainabilityMaterials.map((material, i) => {
              const Icon = icons[material.icon];
              return (
                <Reveal key={material.id} delay={(i % 4) * 0.08}>
                  <div className="group h-full rounded-3xl border border-cream-200 bg-cream-50/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-neem-soft hover:shadow-md">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-neem/10 text-neem-deep transition-colors duration-300 group-hover:bg-neem group-hover:text-paper">
                      <Icon className="size-7" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink">
                      {material.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                      {material.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== circular lifecycle timeline ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
            A Circular Life
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            From a tree, back to the earth
          </h2>
          <p className="mt-3 text-ink-muted">
            Our toys follow nature&apos;s own cycle — grown, loved, and returned.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-2 lg:flex-row lg:items-stretch">
          {sustainabilityLifecycle.map((step, i) => {
            const Icon = icons[step.icon];
            const last = i === sustainabilityLifecycle.length - 1;
            return (
              <Fragment key={step.id}>
                <Reveal delay={i * 0.08} className="flex-1">
                  <div className="group flex h-full flex-col items-center rounded-3xl border border-cream-200 bg-paper p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="relative flex size-14 items-center justify-center rounded-2xl bg-neem/10 text-neem-deep transition-colors duration-300 group-hover:bg-neem group-hover:text-paper">
                      <Icon className="size-7" strokeWidth={1.75} aria-hidden />
                      <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-neem-deep text-[11px] font-bold text-paper">
                        {i + 1}
                      </span>
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.desc}</p>
                  </div>
                </Reveal>
                {!last ? (
                  <div className="flex items-center justify-center text-neem-soft lg:px-1">
                    <ChevronDown className="size-6 lg:hidden" aria-hidden />
                    <ChevronRight className="hidden size-6 lg:block" aria-hidden />
                  </div>
                ) : null}
              </Fragment>
            );
          })}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <FaqAccordion items={sustainabilityFaqs} title="Frequently Asked Questions" />
          </Reveal>
        </div>
      </section>

      {/* ===== final CTA ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28">
        <Reveal className="overflow-hidden rounded-3xl border border-cream-200 bg-neem/8 px-6 py-14 text-center sm:px-10 lg:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {sustainabilityCta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">{sustainabilityCta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={sustainabilityCta.primary.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-neem px-7 text-sm font-bold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-neem-deep"
            >
              {sustainabilityCta.primary.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={sustainabilityCta.secondary.href}
              className="inline-flex h-12 items-center justify-center rounded-md border border-cream-300 bg-paper px-7 text-sm font-bold text-ink transition-colors duration-300 hover:border-neem hover:text-neem-deep"
            >
              {sustainabilityCta.secondary.label}
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
