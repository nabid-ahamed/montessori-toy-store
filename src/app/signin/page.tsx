"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/config";
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
function RememberMe({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="group inline-flex cursor-pointer select-none items-center gap-2">
      <span className="relative inline-flex">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={cn(
            "flex size-[18px] items-center justify-center rounded-[6px] border transition-colors",
            checked
              ? "border-neem bg-neem"
              : "border-cream-300 bg-cream-50 group-hover:border-neem-soft",
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
      <span className="text-sm text-ink-muted">Remember me</span>
    </label>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);
    // Placeholder auth: real authentication is not wired up yet. We simulate a
    // network round-trip so the button shows its loading state, then bounce the
    // user home. Swap this for a real auth call when backend is ready.
    window.setTimeout(() => {
      setLoading(false);
      toast.success("Signed in. Welcome back!");
      router.push("/");
    }, 900);
  };

  return (
    <main className="relative flex min-h-[calc(100vh-7rem)] items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      {/* soft brand backdrop — large blurred neem + terracotta blobs, low-opacity
          so the card stays the focus. Purely decorative. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 top-1/4 size-80 rounded-full bg-neem-soft/25 blur-3xl" />
        <div className="absolute -right-24 bottom-1/4 size-80 rounded-full bg-blush/25 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* brand wordmark */}
        <Link
          href="/"
          className="mb-8 flex flex-col items-center text-center"
        >
          <span className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {BRAND_NAME}
          </span>
          <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
            {BRAND_TAGLINE}
          </span>
        </Link>

        <div className="rounded-3xl border border-cream-300 bg-paper/90 p-7 shadow-xl shadow-ink/5 backdrop-blur-sm sm:p-9">
          {/* heading */}
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              Sign in to track orders, save your wishlist, and check out faster.
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
            {/* email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ink"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl bg-cream-50 pl-10"
                />
              </div>
            </div>

            {/* password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-ink"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl bg-cream-50 pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft transition-colors hover:text-ink"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* remember me + forgot password */}
            <div className="flex items-center justify-between pt-1">
              <RememberMe checked={remember} onChange={setRemember} />
              <Link
                href="/signin"
                className="text-sm font-medium text-neem-deep underline-offset-4 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Password reset isn’t available yet.");
                }}
              >
                Forgot password?
              </Link>
            </div>

            {/* primary action */}
            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-11 w-full rounded-full bg-neem text-sm font-semibold uppercase tracking-[0.1em] text-paper shadow-md transition hover:bg-neem-deep disabled:opacity-70"
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          {/* divider */}
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-cream-300" />
            <span className="text-xs uppercase tracking-[0.12em] text-ink-soft">
              or
            </span>
            <span className="h-px flex-1 bg-cream-300" />
          </div>

          {/* social sign-in */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl border-cream-300 bg-paper text-sm font-medium text-ink hover:bg-cream-100"
              onClick={() =>
                toast.info("Social sign-in isn’t wired up yet.")
              }
            >
              <GoogleIcon className="size-4" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl border-cream-300 bg-paper text-sm font-medium text-ink hover:bg-cream-100"
              onClick={() =>
                toast.info("Social sign-in isn’t wired up yet.")
              }
            >
              <FacebookIcon className="size-4 text-[#1877F2]" />
              Facebook
            </Button>
          </div>
        </div>

        {/* create account */}
        <p className="mt-6 text-center text-sm text-ink-muted">
          New here?{" "}
          <Link
            href="/signin"
            className="font-semibold text-neem-deep underline-offset-4 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              toast.info("Account creation isn’t available yet.");
            }}
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
