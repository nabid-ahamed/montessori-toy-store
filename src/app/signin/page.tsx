import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <div className="rounded-3xl border border-cream-300 bg-paper/90 p-10 shadow-xl shadow-ink/5">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-neem-deep">
          Coming soon
        </p>
        <h1 className="mt-4 text-3xl font-bold text-ink">This page is not built yet</h1>
        <p className="mt-4 text-base leading-7 text-ink-muted">
          Authentication will be implemented later. For now, this is a placeholder page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-neem px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-paper shadow-md transition hover:bg-neem-deep"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
