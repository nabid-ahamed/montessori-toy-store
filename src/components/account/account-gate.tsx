import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Sign-in gate for the Account / Profile area. Real authentication is not wired
 * up yet, so instead of an account dashboard we prompt the visitor to sign in
 * first and point them at the (placeholder) sign-in page. Server component — no
 * interactivity of its own.
 */
export function AccountGate() {
  return (
    <main className="flex flex-1 items-center justify-center bg-paper px-4 py-16 sm:py-24">
      <div className="w-full max-w-md rounded-3xl border border-cream-200 bg-cream-50/40 px-6 py-12 text-center shadow-sm sm:px-10">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-neem/10 text-neem">
          <LockKeyhole className="size-8" strokeWidth={1.75} aria-hidden />
        </span>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
          Account
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
          Please sign in first
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-ink-muted">
          You need to be signed in to view your profile, track orders, and manage
          your saved items. Sign in to continue.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Button asChild size="lg">
            <Link href="/signin">
              Sign in
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Link
            href="/"
            className="text-sm font-semibold text-neem-deep underline underline-offset-4 hover:text-neem"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
