"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { BRAND_NAME } from "@/lib/config";
import { cn } from "@/lib/utils";

// Brand glyphs for the social sign-in buttons. lucide dropped brand icons, so
// these are inline SVG (simple-icons paths) — same pattern as the footer.
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  );
}

// Accessible custom checkbox styled to match the brand (neem check on cream).
function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="group inline-flex cursor-pointer select-none items-center gap-2.5">
      <span className="relative inline-flex">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={cn(
            "flex size-5 items-center justify-center rounded-[6px] border transition-colors",
            checked
              ? "border-neem bg-neem"
              : "border-cream-300 bg-paper group-hover:border-neem-soft",
          )}
        >
          {checked ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-3 text-paper"
              aria-hidden
            >
              <path
                d="M20 6 9 17l-5-5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </span>
      </span>
      <span className="text-[15px] text-ink">{label}</span>
    </label>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [news, setNews] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);
    // Placeholder auth: real authentication is not wired up yet. We simulate a
    // network round-trip so the button shows its loading state, then bounce the
    // user home. Swap this for a real auth call when backend is ready.
    window.setTimeout(() => {
      setLoading(false);
      toast.success("Check your email for a login link.");
      router.push("/");
    }, 900);
  };

  return (
    <main className="flex min-h-screen flex-col bg-paper px-4">
      {/* brand wordmark — name only, centered at top */}
      <div className="flex justify-center pt-8 pb-4">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-ink"
        >
          {BRAND_NAME}
        </Link>
      </div>

      {/* centered content column */}
      <div className="flex flex-1 items-start justify-center pt-24">
        <div className="w-full max-w-sm">
          <h1 className="font-sans text-2xl font-normal leading-[28.8px] tracking-normal text-black">
            Sign in
          </h1>
          <p className="mt-2 font-sans text-sm font-normal leading-[21px] tracking-normal text-[#0000008f]">
            Sign in to track orders, save your wishlist, and check out faster
          </p>

          {/* Continue with Shop */}
          <button
            type="button"
            onClick={() => toast.info("Shop sign-in isn’t wired up yet.")}
            className="mt-5 flex h-12 w-full items-center justify-center rounded-lg bg-[#5a31f4] text-base font-semibold text-white transition hover:bg-[#4a27d4]"
          >
            Continue with
          </button>

          {/* social sign-in */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => toast.info("Social sign-in isn’t wired up yet.")}
              className="flex h-12 items-center justify-center gap-2.5 rounded-lg border border-cream-300 bg-paper text-[15px] font-medium text-ink transition hover:bg-cream-100"
            >
              <GoogleIcon className="size-5" />
              Google
            </button>
            <button
              type="button"
              onClick={() => toast.info("Social sign-in isn’t wired up yet.")}
              className="flex h-12 items-center justify-center gap-2.5 rounded-lg border border-cream-300 bg-paper text-[15px] font-medium text-ink transition hover:bg-cream-100"
            >
              <FacebookIcon className="size-5 text-[#1877F2]" />
              Facebook
            </button>
          </div>

          {/* divider */}
          <div className="my-4 flex items-center gap-4">
            <span className="h-px flex-1 bg-cream-300" />
            <span className="text-sm text-ink-muted">or</span>
            <span className="h-px flex-1 bg-cream-300" />
          </div>

          {/* email + arrow submit */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex items-stretch rounded-lg border border-cream-300 bg-paper transition-colors focus-within:border-neem">
              <div className="flex flex-1 flex-col justify-center px-4 py-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-ink-soft"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-soft"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                aria-label="Continue"
                className="m-1.5 flex w-10 items-center justify-center rounded-md bg-neem text-paper transition hover:bg-neem-deep disabled:opacity-60"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>

            {/* news checkbox */}
            <div className="mt-4">
              <Checkbox
                checked={news}
                onChange={setNews}
                label="Email me with news and offers"
              />
            </div>

            {/* terms */}
            <p className="mt-4 text-center text-sm text-ink-muted">
              By continuing, you agree to our{" "}
              <Link
                href="/policy/terms"
                className="underline underline-offset-2 hover:text-ink"
              >
                Terms of service
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* privacy policy — pinned at bottom */}
      <div className="flex justify-center py-5">
        <Link
          href="/policy/privacy"
          className="text-[15px] text-wood-deep underline-offset-2 hover:underline"
        >
          Privacy policy
        </Link>
      </div>
    </main>
  );
}
