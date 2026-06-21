import type { AgeTier } from "@/lib/types";

export const ageTiers: AgeTier[] = [
  { slug: "0-6m", labelBn: "০–৬ মাস", href: "/collections/0-6m", tone: "blush" },
  { slug: "6-12m", labelBn: "৬–১২ মাস", href: "/collections/6-12m", tone: "mustard" },
  { slug: "1-2y", labelBn: "১–২ বছর", href: "/collections/1-2y", tone: "neem-soft" },
  { slug: "2-3y-plus", labelBn: "২–৩ বছর+", href: "/collections/2-3y-plus", tone: "dusty-blue" },
];

export const ageTierBySlug = (slug: string) =>
  ageTiers.find((t) => t.slug === slug);
