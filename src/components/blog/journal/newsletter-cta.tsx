"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

/**
 * Newsletter band — a deep-neem panel with an email capture. Frontend only: the
 * submit handler is stubbed (no backend / real subscription) and just shows a
 * local success state.
 */
export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  // Stub — no backend yet. Swap for a real subscribe call later.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  };

  return (
    <section className="overflow-hidden rounded-3xl bg-neem px-6 py-12 text-center text-paper sm:px-10 sm:py-14">
      <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Join the Neem Journal
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-paper/85">
        New play ideas, safety notes and Montessori tips — a gentle note now and
        then, never spam.
      </p>

      {sent ? (
        <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-paper/15 px-4 py-2 text-sm font-medium">
          <Check className="size-4" />
          Thanks — you&apos;re on the list.
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-6 flex max-w-md flex-col gap-2.5 sm:flex-row"
        >
          <label htmlFor="journal-email" className="sr-only">
            Email address
          </label>
          <input
            id="journal-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-11 flex-1 rounded-full border border-paper/20 bg-paper px-4 text-sm text-ink outline-none placeholder:text-ink-soft focus-visible:border-[color:var(--honey)]"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-[color:var(--honey)] px-5 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Subscribe
            <ArrowRight className="size-4" />
          </button>
        </form>
      )}
    </section>
  );
}
