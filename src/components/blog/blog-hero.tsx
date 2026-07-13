import { NeemSprig } from "@/components/blog/journal/neem-sprig";

/**
 * Blog hero — large title + subtitle over a soft, decorative brand background
 * (tinted circles + neem sprigs). Purely presentational.
 */
export function BlogHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-cream-100">
      {/* decorative wash — soft brand-tinted shapes */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-20 size-64 rounded-full bg-neem-soft/25"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-12 size-72 rounded-full bg-mustard/15"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-[12%] hidden text-neem-soft/50 sm:block"
      >
        <NeemSprig className="size-28 -rotate-12" />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-[10%] hidden text-neem-soft/40 sm:block"
      >
        <NeemSprig className="size-24 rotate-[160deg]" />
      </span>

      <div className="relative mx-auto max-w-2xl px-6 py-14 text-center sm:py-16">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-neem-deep">
          Our Blog
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Parenting &amp; Learning
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink-muted">
          Play ideas, safety notes and Montessori know-how for raising curious,
          screen-free little ones.
        </p>
      </div>
    </section>
  );
}
