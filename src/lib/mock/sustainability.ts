/**
 * Content for the "Sustainability" page (/policy/sustainability). Text-forward,
 * editorial — no image dependencies. All copy lives here so the view stays
 * presentational.
 */

import type { FaqEntry } from "@/lib/mock/product-faqs";

/** Icon keys used across the page, mapped to lucide components in the view. */
export type SustainabilityIcon =
  | "tree-pine"
  | "trees"
  | "recycle"
  | "leaf"
  | "droplets"
  | "package"
  | "sprout"
  | "award"
  | "hand-heart"
  | "hand"
  | "heart"
  | "gift"
  | "globe";

/** Generic icon + title + description card, reused across several sections. */
export type SustainabilityCard = {
  id: string;
  icon: SustainabilityIcon;
  title: string;
  desc: string;
};

/** A single "by the numbers" stat — animates when `count` is set, else static. */
export type SustainabilityStat = {
  id: string;
  count?: number;
  prefix?: string;
  suffix?: string;
  value?: string;
  label: string;
  desc: string;
};

export const sustainabilityIntro = {
  eyebrow: "Sustainability",
  title: "Toys made in harmony with nature",
  lead: "We believe the toys that shape little hands shouldn't cost the earth. From the wood we grow to the way each toy returns to the soil, sustainability is woven into every stage of how we make and pack our Montessori toys.",
};

export const sustainabilityPledge = {
  eyebrow: "Our Commitment",
  heading: "A promise to your child and the planet",
  lead: "Sustainability isn't a marketing badge for us — it's a set of decisions we make on every toy, every order, every day.",
  points: [
    {
      title: "Renewable by nature",
      text: "We craft with fast-growing neem wood — a naturally renewable resource that regenerates far quicker than hardwoods.",
    },
    {
      title: "Plastic-free, always",
      text: "No plastic in our toys and none in our packaging. What arrives at your door is wood, paper, and care.",
    },
    {
      title: "Made to last generations",
      text: "Durable, timeless toys are the most sustainable toys — built to be handed down, not thrown away.",
    },
    {
      title: "Low-waste craftsmanship",
      text: "Offcuts become smaller toys or are composted, so very little of every tree goes to waste.",
    },
    {
      title: "Kind to the earth at every stage",
      text: "Non-toxic finishes and fully biodegradable wood mean our toys leave no lasting trace.",
    },
  ],
};

/** Section — sustainability pillars (6 cards). */
export const sustainabilityPillars: SustainabilityCard[] = [
  {
    id: "sourced-wood",
    icon: "tree-pine",
    title: "Responsibly Sourced Wood",
    desc: "Neem harvested from renewable, responsibly managed trees — never old-growth forests.",
  },
  {
    id: "plastic-free",
    icon: "package",
    title: "Plastic-Free Packaging",
    desc: "Recycled kraft and paper packaging that's recyclable and compostable at home.",
  },
  {
    id: "natural-finishes",
    icon: "droplets",
    title: "Natural, Non-Toxic Finishes",
    desc: "Water-based, food-grade finishes that are safe for children and gentle on nature.",
  },
  {
    id: "low-waste",
    icon: "recycle",
    title: "Low-Waste Workshop",
    desc: "Wood offcuts are reused for smaller toys or composted — almost nothing is wasted.",
  },
  {
    id: "built-to-last",
    icon: "award",
    title: "Built to Last",
    desc: "Heirloom-quality toys designed to be loved for years and passed between siblings.",
  },
  {
    id: "biodegradable",
    icon: "sprout",
    title: "Naturally Biodegradable",
    desc: "At the very end of their life, our wooden toys return safely to the earth.",
  },
];

/** Section — impact by the numbers (4 stats). */
export const sustainabilityImpact: SustainabilityStat[] = [
  {
    id: "plastic-free",
    count: 100,
    suffix: "%",
    label: "Plastic-free packaging",
    desc: "Every order ships in paper and recycled kraft — never plastic.",
  },
  {
    id: "renewable",
    count: 100,
    suffix: "%",
    label: "Renewable neem wood",
    desc: "A fast-regenerating resource, sourced responsibly.",
  },
  {
    id: "toxic",
    value: "Zero",
    label: "Harmful chemicals",
    desc: "No lead, phthalates, or solvents — only child-safe finishes.",
  },
  {
    id: "biodegradable",
    count: 100,
    suffix: "%",
    label: "Biodegradable wood",
    desc: "Fully compostable at the end of a long, well-loved life.",
  },
];

/** Section — materials & sourcing (4 cards). */
export const sustainabilityMaterials: SustainabilityCard[] = [
  {
    id: "neem-wood",
    icon: "trees",
    title: "Renewable Neem Wood",
    desc: "Naturally durable and antibacterial, grown quickly and sustainably.",
  },
  {
    id: "finishes",
    icon: "droplets",
    title: "Water-Based Finishes",
    desc: "Low-odour, non-toxic oils and paints that are safe for kids and the planet.",
  },
  {
    id: "packaging",
    icon: "recycle",
    title: "Recycled Kraft Packaging",
    desc: "Made from recycled paper, printed with soy inks, and fully recyclable.",
  },
  {
    id: "artisans",
    icon: "hand-heart",
    title: "Local Artisan Craft",
    desc: "Handmade in small batches locally, supporting fair, low-carbon livelihoods.",
  },
];

/** Section — the circular lifecycle timeline (5 steps). */
export const sustainabilityLifecycle: SustainabilityCard[] = [
  {
    id: "grown",
    icon: "sprout",
    title: "Grown, Not Manufactured",
    desc: "It begins with a renewable neem tree, not a barrel of oil.",
  },
  {
    id: "crafted",
    icon: "hand",
    title: "Handcrafted Locally",
    desc: "Shaped by artisans nearby, keeping our carbon footprint low.",
  },
  {
    id: "loved",
    icon: "heart",
    title: "Loved for Years",
    desc: "Durable design means one toy replaces many disposable ones.",
  },
  {
    id: "passed-down",
    icon: "gift",
    title: "Passed Down",
    desc: "Timeless toys move on to siblings, cousins, and friends.",
  },
  {
    id: "returned",
    icon: "leaf",
    title: "Returns to the Earth",
    desc: "When it's finally done, it biodegrades — leaving no trace.",
  },
];

/** Section — FAQs (uses the shared FaqEntry shape + reusable accordion). */
export const sustainabilityFaqs: FaqEntry[] = [
  {
    id: "packaging",
    question: "Is your packaging really plastic-free?",
    answer:
      "Yes. We ship in recycled kraft and paper packaging with no plastic tape or fillers. It's recyclable and, in most cases, home-compostable.",
  },
  {
    id: "neem-sustainable",
    question: "Is neem wood sustainable?",
    answer:
      "Very. Neem grows quickly and regenerates far faster than traditional hardwoods, and we source only from responsibly managed, renewable trees — never old-growth forests.",
  },
  {
    id: "finishes",
    question: "What finishes do you use?",
    answer:
      "Only water-based, food-grade, non-toxic finishes free from lead, phthalates, and solvents — safe for your child and low-impact for the environment.",
  },
  {
    id: "biodegradable",
    question: "Are the toys biodegradable?",
    answer:
      "They are. Because our toys are solid wood with natural finishes and no plastic, they biodegrade safely at the end of their life — ideally after being passed down for years.",
  },
  {
    id: "waste",
    question: "How do you reduce waste?",
    answer:
      "We design to minimise offcuts, then reuse the wood we do trim for smaller toys or compost it. Our small-batch, made-to-last approach avoids the overproduction that fills landfills.",
  },
];

export const sustainabilityCta = {
  heading: "Play That's Kind to the Planet",
  text: "Choose toys that nurture your child today and protect the world they'll grow up in. Explore our handcrafted, earth-friendly collection.",
  primary: { label: "Shop Sustainable Toys", href: "/collections/all" },
  secondary: { label: "Our Safety Standards", href: "/policy/safety-standards" },
};
