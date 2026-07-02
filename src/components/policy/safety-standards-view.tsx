import { Fragment } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Baby,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Droplets,
  Feather,
  Hammer,
  Hand,
  HandHeart,
  Leaf,
  Package,
  Paintbrush,
  Shield,
  ShieldCheck,
  Sparkles,
  Sprout,
  TreePine,
  Trees,
  type LucideIcon,
} from "lucide-react";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Reveal } from "@/components/policy/reveal";
import {
  qualitySteps,
  safetyCta,
  safetyFaqs,
  safetyFeatures,
  safetyMaterials,
  safetyPromise,
  safetyTrust,
  type SafetyIcon,
} from "@/lib/mock/safety";

// Icon key → lucide component (static map; bundlers only see literal keys).
const icons: Record<SafetyIcon, LucideIcon> = {
  "shield-check": ShieldCheck,
  feather: Feather,
  leaf: Leaf,
  droplets: Droplets,
  hammer: Hammer,
  baby: Baby,
  trees: Trees,
  hand: Hand,
  sparkles: Sparkles,
  "clipboard-check": ClipboardCheck,
  package: Package,
  "tree-pine": TreePine,
  shield: Shield,
  paintbrush: Paintbrush,
  sprout: Sprout,
  "hand-heart": HandHeart,
  award: Award,
};

/**
 * Bespoke "Safety Standards" page. Editorial, trust-building layout: an overlay
 * hero, our safety promise, a feature grid, a quality-control timeline, the
 * materials we use, trust highlights, an FAQ accordion, and a closing CTA.
 * Server component composing client islands (Reveal fade-ups, AboutImage,
 * FaqAccordion); hover/zoom effects are CSS-only.
 */
export function SafetyStandardsView() {
  return (
    <main className="flex-1 bg-cream-50">
      {/* ===== hero removed — to be updated later ===== */}

      {/* ===== 2. our safety promise ===== */}
      <section className="mx-auto grid w-full max-w-[80rem] gap-10 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-8 lg:pt-20 lg:pb-24">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
            {safetyPromise.eyebrow}
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {safetyPromise.heading}
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-muted">
            {safetyPromise.lead}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-cream-200 rounded-3xl border border-cream-200 bg-paper px-6 shadow-sm sm:px-8">
            {safetyPromise.paragraphs.map((p, i) => (
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

      {/* ===== 3. safety features grid ===== */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Built with safety at every layer
            </h2>
            <p className="mt-3 text-ink-muted">
              The details you can&apos;t always see are the ones we obsess over most.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {safetyFeatures.map((feature, i) => {
              const Icon = icons[feature.icon];
              return (
                <Reveal key={feature.id} delay={(i % 3) * 0.08}>
                  <div className="group h-full rounded-3xl border border-cream-200 bg-cream-50/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-neem-soft hover:shadow-md">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-neem/10 text-neem-deep transition-colors duration-300 group-hover:bg-neem group-hover:text-paper">
                      <Icon className="size-7" strokeWidth={1.75} aria-hidden />
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

      {/* ===== 4. quality control process ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
            Quality Control
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            From forest to playroom
          </h2>
          <p className="mt-3 text-ink-muted">
            Five careful steps stand between raw wood and the toy in your child&apos;s hands.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-2 lg:flex-row lg:items-stretch">
          {qualitySteps.map((step, i) => {
            const Icon = icons[step.icon];
            const last = i === qualitySteps.length - 1;
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
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {step.desc}
                    </p>
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

      {/* ===== 5. materials we use ===== */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
              Materials We Use
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Honest materials, nothing hidden
            </h2>
            <p className="mt-3 text-ink-muted">
              We choose every material for how it feels, how it lasts, and how safely it sits
              in little hands.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {safetyMaterials.map((material, i) => {
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

      {/* ===== 6. why parents trust us ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Why parents trust us
          </h2>
          <p className="mt-3 text-ink-muted">
            Thousands of families choose us for the same reasons you will.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {safetyTrust.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.id} delay={(i % 4) * 0.08}>
                <div className="group flex h-full flex-col items-center rounded-3xl border border-cream-200 bg-cream-50/60 p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-neem-soft hover:shadow-md">
                  <span className="flex size-14 items-center justify-center rounded-full bg-neem/10 text-neem-deep transition-colors duration-300 group-hover:bg-neem group-hover:text-paper">
                    <Icon className="size-7" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===== 7. FAQ ===== */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <FaqAccordion items={safetyFaqs} title="Frequently Asked Questions" />
          </Reveal>
        </div>
      </section>

      {/* ===== 8. final CTA ===== */}
      <section className="mx-auto w-full max-w-[80rem] px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28">
        <Reveal className="overflow-hidden rounded-3xl border border-cream-200 bg-neem/8 px-6 py-14 text-center sm:px-10 lg:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {safetyCta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">{safetyCta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={safetyCta.primary.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-neem px-7 text-sm font-bold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-neem-deep"
            >
              {safetyCta.primary.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={safetyCta.secondary.href}
              className="inline-flex h-12 items-center justify-center rounded-md border border-cream-300 bg-paper px-7 text-sm font-bold text-ink transition-colors duration-300 hover:border-neem hover:text-neem-deep"
            >
              {safetyCta.secondary.label}
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
