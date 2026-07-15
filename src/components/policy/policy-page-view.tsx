import Link from "next/link";
import { Leaf } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { PolicyBlocks } from "@/components/policy/policy-blocks";
import { policyIcon } from "@/components/policy/policy-icons";
import { Reveal } from "@/components/policy/reveal";
import type { PolicyContent } from "@/lib/policy/types";

/**
 * Reusable premium policy page template. Renders a `PolicyContent` object as a
 * hero (with soft decorative background), an optional quick-summary card, content
 * section cards, optional trust badges, and a closing CTA. Server component — the
 * only client island is the `Reveal` scroll animation wrapper.
 */
export function PolicyPageView({ content }: { content: PolicyContent }) {
  return (
    <main className="flex-1 bg-paper">
      {/* hero */}
      <section className="relative mx-auto w-full max-w-[64rem] px-4 pt-6 pb-10 text-center sm:px-6 lg:px-8">
        {/* soft decorative background */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="absolute -top-20 left-1/2 size-72 -translate-x-1/2 rounded-full bg-neem/10 blur-3xl" />
          <div className="absolute top-8 right-4 size-40 rounded-full bg-mustard/10 blur-3xl" />
          <div className="absolute top-16 left-4 size-40 rounded-full bg-dusty-blue/10 blur-3xl" />
          <Leaf className="absolute left-[12%] top-24 size-8 -rotate-12 text-neem/20" />
          <Leaf className="absolute right-[14%] top-16 size-6 rotate-[18deg] text-neem/20" />
        </div>

        <div className="relative">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: content.title }]} />
          <Reveal className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-neem/20 bg-neem/10 px-4 py-1.5 text-sm font-semibold text-neem-deep">
              {content.badge}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {content.title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-ink-muted">{content.intro}</p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
              Last updated {content.updated}
            </p>
          </Reveal>
        </div>
      </section>

      {/* quick summary */}
      {content.summary?.length ? (
        <section className="mx-auto w-full max-w-[64rem] px-4 pb-6 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 rounded-3xl border border-cream-200 bg-cream-50/50 p-5 sm:p-6 lg:grid-cols-4">
              {content.summary.map((item) => {
                const Icon = policyIcon[item.icon];
                return (
                  <div key={item.text} className="flex flex-col items-center gap-2 text-center">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-neem/10 text-neem">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <p className="text-sm font-medium text-ink">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* content sections */}
      <div className="mx-auto w-full max-w-[64rem] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {content.sections.map((section, i) => {
          const Icon = policyIcon[section.icon];
          return (
            <Reveal key={section.id} delay={Math.min(i * 0.04, 0.2)}>
              <section
                id={section.id}
                className="scroll-mt-24 rounded-3xl border border-cream-200 bg-paper p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-11 flex-none items-center justify-center rounded-2xl bg-neem/10 text-neem">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    {section.title}
                  </h2>
                </div>
                {section.intro ? (
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{section.intro}</p>
                ) : null}
                <div className="mt-5">
                  <PolicyBlocks blocks={section.blocks} sectionId={section.id} />
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>

      {/* trust badges */}
      {content.trust?.length ? (
        <section className="mx-auto w-full max-w-[64rem] px-4 py-6 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {content.trust.map((t) => {
                const Icon = policyIcon[t.icon];
                return (
                  <div
                    key={t.label}
                    className="flex items-center gap-3 rounded-2xl border border-cream-200 bg-paper px-4 py-3.5"
                  >
                    <span className="flex size-9 flex-none items-center justify-center rounded-full bg-neem/10 text-neem">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0 break-words text-sm font-semibold text-ink">{t.label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* closing CTA */}
      <section className="mx-auto w-full max-w-[64rem] px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-neem/20 bg-neem/5 px-6 py-12 text-center sm:px-10">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              {content.cta.title}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-muted">{content.cta.text}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href={content.cta.primary.href}
                className="inline-flex h-11 items-center justify-center rounded-md bg-neem px-6 text-sm font-bold text-paper transition-colors hover:bg-neem-deep"
              >
                {content.cta.primary.label}
              </Link>
              {content.cta.secondary ? (
                <Link
                  href={content.cta.secondary.href}
                  className="inline-flex h-11 items-center justify-center rounded-md border border-cream-300 bg-paper px-6 text-sm font-bold text-ink transition-colors hover:border-neem"
                >
                  {content.cta.secondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
