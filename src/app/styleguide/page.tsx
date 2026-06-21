import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Style Guide — ${BRAND_NAME}`,
};

type Swatch = {
  token: string;
  hex: string;
  use: string;
  /** Tailwind bg utility */
  bg: string;
  /** true → use light text on the chip */
  dark?: boolean;
  signature?: boolean;
};

type Group = { title: string; note?: string; swatches: Swatch[] };

const GROUPS: Group[] = [
  {
    title: "Surface — ক্রিম / পেপার",
    swatches: [
      { token: "cream-50", hex: "#FBF8F1", use: "card / popover", bg: "bg-cream-50" },
      { token: "cream-100", hex: "#F7F1E6", use: "base background", bg: "bg-cream-100" },
      { token: "cream-200", hex: "#EFE7D6", use: "muted / hover", bg: "bg-cream-200" },
      { token: "cream-300", hex: "#E4D9C4", use: "border / input", bg: "bg-cream-300" },
      { token: "paper", hex: "#FCFBF7", use: "on-dark foreground", bg: "bg-paper" },
    ],
  },
  {
    title: "Wood / Earth — কাঠ",
    swatches: [
      { token: "wood-light", hex: "#C9A678", use: "হালকা কাঠ", bg: "bg-wood-light" },
      { token: "wood-deep", hex: "#8A5A3B", use: "walnut · secondary", bg: "bg-wood-deep", dark: true },
    ],
  },
  {
    title: "Neem — Signature সবুজ",
    swatches: [
      { token: "neem-soft", hex: "#A9C09A", use: "sage · accent", bg: "bg-neem-soft" },
      { token: "neem", hex: "#5E7C4A", use: "primary action", bg: "bg-neem", dark: true, signature: true },
      { token: "neem-deep", hex: "#4A6239", use: "hover / pressed", bg: "bg-neem-deep", dark: true },
    ],
  },
  {
    title: "Ink / Text — কৃষ্ণ near-black",
    swatches: [
      { token: "ink", hex: "#2B2620", use: "primary text", bg: "bg-ink", dark: true },
      { token: "ink-muted", hex: "#6B6258", use: "secondary text", bg: "bg-ink-muted", dark: true },
      { token: "ink-soft", hex: "#938A7E", use: "placeholder / disabled", bg: "bg-ink-soft", dark: true },
    ],
  },
  {
    title: "Play Accents — অল্প পরিমাণে",
    swatches: [
      { token: "terracotta", hex: "#E08A5F", use: "craft-warm", bg: "bg-terracotta" },
      { token: "mustard", hex: "#E8B84B", use: "warm highlight", bg: "bg-mustard" },
      { token: "dusty-blue", hex: "#8FB0C4", use: "calm accent", bg: "bg-dusty-blue" },
      { token: "blush", hex: "#E7A9A0", use: "soft accent", bg: "bg-blush" },
    ],
  },
  {
    title: "Functional / Status",
    swatches: [
      { token: "neem (success)", hex: "#5E7C4A", use: "success", bg: "bg-neem", dark: true },
      { token: "mustard (warning)", hex: "#E8B84B", use: "warning · text=ink", bg: "bg-mustard" },
      { token: "danger", hex: "#C0492B", use: "destructive", bg: "bg-danger", dark: true },
      { token: "info", hex: "#5E83A0", use: "informational", bg: "bg-info", dark: true },
    ],
  },
];

function SwatchCard({ s }: { s: Swatch }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-cream-300 bg-cream-50">
      {s.signature && (
        <span className="absolute left-2 top-2 z-10 rounded-full border border-neem-soft bg-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neem-deep">
          Signature
        </span>
      )}
      <div
        className={`flex h-20 items-center justify-center ${s.bg} ${
          s.signature ? "ring-2 ring-neem ring-inset" : ""
        }`}
      >
        <span
          className={`font-mono text-sm ${s.dark ? "text-paper" : "text-ink"}`}
        >
          Aa · অআক
        </span>
      </div>
      <div className="px-3 pb-3 pt-2.5">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-mono text-[13px] font-semibold text-ink">
            {s.token}
          </span>
          <span className="font-mono text-xs text-ink-muted">{s.hex}</span>
        </div>
        <p className="mt-1 text-[13px] leading-snug text-ink-muted">{s.use}</p>
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      {/* header */}
      <header className="border-b-2 border-ink pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-neem-deep">
          {BRAND_NAME} · Design System
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          স্টাইল গাইড
        </h1>
        <p className="mt-3 max-w-xl text-ink-muted">
          সব রঙ, টাইপ স্কেল আর বাটন স্টেট এক জায়গায় — চোখে যাচাই করার জন্য। উষ্ণ ·
          প্রাকৃতিক · বিশ্বাসযোগ্য।
        </p>
      </header>

      {/* ---- Palette ---- */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink">রঙের প্যালেট</h2>
        {GROUPS.map((g) => (
          <div key={g.title} className="mt-7">
            <h3 className="font-display text-lg font-semibold text-wood-deep">
              {g.title}
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {g.swatches.map((s) => (
                <SwatchCard key={s.token} s={s} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ---- Type scale ---- */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold text-ink">টাইপোগ্রাফি</h2>

        <div className="mt-5 space-y-6 rounded-xl border border-cream-300 bg-cream-50 p-5 sm:p-7">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
              Display · Bricolage Grotesque
            </p>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">
              নিম কাঠের খেলনা
            </p>
            <p className="font-display text-2xl font-semibold text-ink">
              Handmade in Bangladesh
            </p>
          </div>

          <div className="border-t border-cream-300 pt-5">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
              Body · Inter + Noto Sans Bengali
            </p>
            <p className="mt-2 text-lg text-ink">
              শিশুর প্রথম খেলনা হোক নিরাপদ — non-toxic, lab-tested, হাতে বানানো।
            </p>
            <p className="mt-1 text-base text-ink-muted">
              The quick brown fox · ০১২৩৪৫৬৭৮৯ · ১৫+ SKU · ৳ ৮৫০
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              ছোট ক্যাপশন টেক্সট — caption / helper · ০–৩ বছর।
            </p>
          </div>

          <div className="border-t border-cream-300 pt-5">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
              Mono · token labels
            </p>
            <p className="mt-2 font-mono text-sm text-ink">
              --neem: #5E7C4A · --radius: 0.75rem
            </p>
          </div>
        </div>
      </section>

      {/* ---- Buttons ---- */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold text-ink">বাটন স্টেট</h2>

        <div className="mt-5 space-y-7 rounded-xl border border-cream-300 bg-cream-50 p-5 sm:p-7">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
              Variants
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button>প্রাইমারি</Button>
              <Button variant="secondary">সেকেন্ডারি</Button>
              <Button variant="outline">আউটলাইন</Button>
              <Button variant="ghost">ঘোস্ট</Button>
              <Button variant="destructive">ডিলিট</Button>
              <Button variant="link">লিংক</Button>
            </div>
          </div>

          <div className="border-t border-cream-300 pt-6">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
              Sizes
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="border-t border-cream-300 pt-6">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
              States — hover (মাউস রাখুন) · focus (Tab চাপুন) · disabled
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button>সাধারণ</Button>
              <Button disabled>নিষ্ক্রিয়</Button>
              <Button variant="outline" disabled>
                নিষ্ক্রিয় আউটলাইন
              </Button>
              <Button className="cursor-pointer">কার্টে যোগ</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-16 border-t border-cream-300 pt-6 text-center font-mono text-xs text-ink-soft">
        {BRAND_NAME} · Phase 0 · Design Foundation
      </footer>
    </main>
  );
}
