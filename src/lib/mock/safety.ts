/**
 * Content for the "Safety Standards" page (/policy/safety-standards). All copy
 * and image paths live here so the view stays presentational. Drop real
 * photography under /public/images/safety/ using the `image` paths below —
 * until then the view falls back to toned placeholders.
 */

import type { FaqEntry } from "@/lib/mock/product-faqs";
import type { Tone } from "@/lib/types";

/** Icon keys used across the page, mapped to lucide components in the view. */
export type SafetyIcon =
  | "shield-check"
  | "feather"
  | "leaf"
  | "droplets"
  | "hammer"
  | "baby"
  | "trees"
  | "hand"
  | "sparkles"
  | "clipboard-check"
  | "package"
  | "tree-pine"
  | "shield"
  | "paintbrush"
  | "sprout"
  | "hand-heart"
  | "award";

/** Generic icon + title + description card, reused across several sections. */
export type SafetyCard = {
  id: string;
  icon: SafetyIcon;
  title: string;
  desc: string;
};

export const safetyHero = {
  badge: "Safety First",
  title: "Designed for Safe Play, Built for Peace of Mind",
  subtitle:
    "Every toy we make is thoughtfully designed and handcrafted with your child's safety as the very first priority — from the wood we choose to the finish that touches their hands.",
  image: "/images/safety/hero.jpg",
  imageAlt: "A child playing happily with handcrafted neem-wood Montessori toys",
  imageTone: "neem-soft" as Tone,
};

export const safetyPromise = {
  eyebrow: "Our Safety Promise",
  heading: "Safety you can see, touch, and trust",
  lead: "Safety isn't a feature we add at the end — it's the first decision we make and the last thing we check. Here's the promise behind every toy we send home.",
  paragraphs: [
    {
      title: "Child-first design",
      text: "Every shape, size, and weight is considered for little hands — no sharp corners, no loose parts that don't belong.",
    },
    {
      title: "Smooth hand-finished edges",
      text: "Each piece is sanded by hand until it's soft to the touch, so play feels gentle from the very first grip.",
    },
    {
      title: "Durable construction",
      text: "Solid neem wood is built to withstand drops, chews, and years of enthusiastic play without splintering.",
    },
    {
      title: "Safe for babies and toddlers",
      text: "Non-toxic, food-grade finishes mean our toys are safe for teething, tasting, and everything in between.",
    },
    {
      title: "Built for everyday play",
      text: "Timeless, sturdy, and easy to clean — made to be reached for again and again, then passed down.",
    },
  ],
};

/** Section 3 — safety features grid (6 cards). */
export const safetyFeatures: SafetyCard[] = [
  {
    id: "non-toxic",
    icon: "shield-check",
    title: "Non-Toxic Materials",
    desc: "Only food-grade, baby-safe materials — no harmful chemicals, ever.",
  },
  {
    id: "rounded-edges",
    icon: "feather",
    title: "Smooth Rounded Edges",
    desc: "Hand-sanded corners and surfaces that are gentle on delicate skin.",
  },
  {
    id: "eco-wood",
    icon: "leaf",
    title: "Eco-Friendly Wood",
    desc: "Responsibly sourced neem wood that's naturally antibacterial.",
  },
  {
    id: "safe-paint",
    icon: "droplets",
    title: "Water-Based Child-Safe Paint",
    desc: "Bright, lasting colours from non-toxic, water-based finishes.",
  },
  {
    id: "durable",
    icon: "hammer",
    title: "Durable Construction",
    desc: "Solid, splinter-free builds made to survive real, everyday play.",
  },
  {
    id: "age-appropriate",
    icon: "baby",
    title: "Age Appropriate Design",
    desc: "Sizes and features matched to each stage of your child's growth.",
  },
];

/** Section 4 — quality-control timeline (5 steps). */
export const qualitySteps: SafetyCard[] = [
  {
    id: "wood-selection",
    icon: "trees",
    title: "Wood Selection",
    desc: "We hand-pick mature, sustainably grown neem for strength and grain.",
  },
  {
    id: "handcrafting",
    icon: "hand",
    title: "Handcrafting",
    desc: "Skilled artisans shape each toy by hand — no mass production.",
  },
  {
    id: "sanding",
    icon: "sparkles",
    title: "Sanding & Finishing",
    desc: "Every surface is sanded smooth and sealed with a food-safe finish.",
  },
  {
    id: "inspection",
    icon: "clipboard-check",
    title: "Safety Inspection",
    desc: "Each piece is checked for edges, joins, and finish before it passes.",
  },
  {
    id: "packaging",
    icon: "package",
    title: "Packaging",
    desc: "Carefully wrapped in protective, eco-friendly packaging.",
  },
];

/** Section 5 — materials we use (4 cards). */
export const safetyMaterials: SafetyCard[] = [
  {
    id: "neem-wood",
    icon: "tree-pine",
    title: "Premium Neem Wood",
    desc: "Naturally durable and antibacterial — a time-honoured choice for baby-safe toys.",
  },
  {
    id: "finishes",
    icon: "shield",
    title: "Child-Safe Finishes",
    desc: "Food-grade, non-toxic oils that protect the wood and stay safe for tiny mouths.",
  },
  {
    id: "paint",
    icon: "paintbrush",
    title: "Water-Based Paint",
    desc: "Vibrant, low-odour colours free from lead, phthalates, and solvents.",
  },
  {
    id: "sourcing",
    icon: "sprout",
    title: "Sustainable Sourcing",
    desc: "Responsibly harvested wood, so safe play never comes at the planet's cost.",
  },
];

/** Section 6 — why parents trust us (4 highlights). */
export const safetyTrust: SafetyCard[] = [
  {
    id: "child-safe",
    icon: "shield-check",
    title: "100% Child-Safe Materials",
    desc: "Every material that touches your child is non-toxic and lab-conscious.",
  },
  {
    id: "handcrafted",
    icon: "hand-heart",
    title: "Handcrafted With Care",
    desc: "Made in small batches by artisans who treat each toy as their own.",
  },
  {
    id: "sustainable",
    icon: "leaf",
    title: "Sustainable Wood",
    desc: "Responsibly sourced neem that's kind to your child and the earth.",
  },
  {
    id: "built-to-last",
    icon: "award",
    title: "Built to Last",
    desc: "Heirloom-quality toys designed to be loved and passed down.",
  },
];

/** Section 7 — FAQs (uses the shared FaqEntry shape + reusable accordion). */
export const safetyFaqs: FaqEntry[] = [
  {
    id: "paints-safe",
    question: "Are the paints safe?",
    answer:
      "Yes. We only use water-based, non-toxic paints that are free from lead, phthalates, and harsh solvents — safe even if your child mouths the toy.",
  },
  {
    id: "suitable-age",
    question: "What age are these toys suitable for?",
    answer:
      "Each toy lists a recommended age range on its product page. We make pieces designed for newborns through preschoolers, with sizes and features matched to each stage. Adult supervision is always recommended.",
  },
  {
    id: "clean",
    question: "How should I clean the toys?",
    answer:
      "Wipe gently with a slightly damp cloth and let them air-dry fully. Avoid soaking or dishwashers. A light coat of food-safe oil now and then keeps the wood looking new.",
  },
  {
    id: "tested",
    question: "Are the toys tested?",
    answer:
      "Every piece goes through a hands-on safety inspection — edges, joins, and finish are all checked before a toy is approved for packaging and dispatch.",
  },
  {
    id: "wood",
    question: "What wood is used?",
    answer:
      "We craft our toys from premium neem wood, which is naturally durable and antibacterial, then finish it with food-grade, child-safe oils.",
  },
];

export const safetyCta = {
  heading: "Give Your Child a Safe Start to Learning",
  text: "Explore toys that are as safe as they are beautiful — handcrafted to spark curiosity and grow with your little one.",
  primary: { label: "Shop Safe Toys", href: "/collections/all" },
  secondary: { label: "Contact Us", href: "/contact" },
};
