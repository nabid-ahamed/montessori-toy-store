import { NeemSprig } from "@/components/blog/journal/neem-sprig";

/**
 * Journal masthead — eyebrow, the "The Neem Journal" title, a lead paragraph and
 * a centred neem sprig. Presentational.
 */
export function BlogMasthead() {
  return (
    <header className="mx-auto max-w-2xl px-4 pb-10 pt-12 text-center sm:pt-16">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--honey)]">
        From the Journal
      </p>

      <span className="mx-auto mt-5 block w-fit text-neem-soft">
        <NeemSprig className="mx-auto size-10" />
      </span>

      <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
        The Neem Journal
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink-muted sm:text-lg">
        Stories on safe, screen-free, Montessori play — and the neem wood we
        carve it from. Written for parents, from our workshop to your home.
      </p>
    </header>
  );
}
