import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { JournalView } from "@/components/blog/journal/journal-view";
import { BRAND_NAME } from "@/lib/config";

// Journal-only typefaces (scoped to /blog via the `.journal` wrapper).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: `The Neem Journal — ${BRAND_NAME}`,
  description:
    "Stories on safe, screen-free, Montessori play — and the neem wood we carve it from.",
};

export default function Page() {
  return (
    <div className={`${fraunces.variable} ${hanken.variable} journal`}>
      <JournalView />
    </div>
  );
}
