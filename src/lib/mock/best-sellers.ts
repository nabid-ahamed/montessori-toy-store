/**
 * Mock data for the "Best Sellers" collection page. Products are ranked by
 * review count as a stand-in for real sales data (swap for a backend query
 * later). Supporting content (features, reviews, FAQs, hero, CTA) lives here so
 * the view stays presentational.
 */

import { bestSellers, productDetailBySlug } from "@/lib/mock/products";
import type { FaqEntry } from "@/lib/mock/product-faqs";
import type { Product } from "@/lib/types";

/**
 * The store's actual best sellers — products flagged with the "Best Seller"
 * badge (see products.ts). Ranked by review count so the most-loved show first.
 * Swap the source for a real sales query when the backend is connected.
 */
export const bestSellerProducts: Product[] = [...bestSellers].sort(
  (a, b) => b.reviewCount - a.reviewCount,
);

/** Short one-line description for a product (first sentence of its detail copy). */
export function shortDescription(slug: string): string {
  const desc = productDetailBySlug(slug)?.description ?? "";
  const firstSentence = desc.split(/(?<=\.)\s/)[0];
  return firstSentence || "A handcrafted neem-wood favourite loved by families.";
}

export const bestSellerHero = {
  badge: "Most Loved by Parents",
  title: "Best Sellers",
  subtitle:
    "Discover our most-loved Montessori toys, chosen by thousands of families to inspire learning through play.",
  image: "/images/collections/best-sellers.jpg",
  imageAlt: "A joyful child playing with handcrafted neem-wood Montessori toys",
};

export type BestSellerFeatureIcon = "shield-check" | "badge-check" | "leaf" | "award";

export type BestSellerFeature = {
  id: string;
  icon: BestSellerFeatureIcon;
  title: string;
  desc: string;
};

export const bestSellerFeatures: BestSellerFeature[] = [
  {
    id: "safe",
    icon: "shield-check",
    title: "Child-Safe Materials",
    desc: "Food-grade, non-toxic finishes with no small detachable parts — safe for teething and play.",
  },
  {
    id: "montessori",
    icon: "badge-check",
    title: "Montessori Approved",
    desc: "Open-ended, purposeful designs that nurture independence and hands-on learning.",
  },
  {
    id: "eco",
    icon: "leaf",
    title: "Eco-Friendly Wood",
    desc: "Responsibly sourced, fast-renewing neem — kind to your child and the planet.",
  },
  {
    id: "durable",
    icon: "award",
    title: "Built to Last",
    desc: "Solid, splinter-free construction made to be loved for years and passed down.",
  },
];

export type FeaturedReview = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
};

export const bestSellerReviews: FeaturedReview[] = [
  {
    id: "r1",
    name: "Sumaiya R.",
    location: "Dhaka",
    rating: 5,
    text: "The finish is beautifully smooth and the wood feels solid. My little one hasn't put it down since it arrived.",
    product: "Neem Wood Rattle Set",
  },
  {
    id: "r2",
    name: "Imran H.",
    location: "Chattogram",
    rating: 5,
    text: "Genuinely premium quality for the price, and it arrived in two days. Exactly the kind of toy I was hoping to find.",
    product: "Stacking Ring Tower",
  },
  {
    id: "r3",
    name: "Nadia A.",
    location: "Sylhet",
    rating: 5,
    text: "Gifted this at a baby shower and the parents adored it. Feels handmade and thoughtful — a clear favourite.",
    product: "Neem Teether Ring",
  },
  {
    id: "r4",
    name: "Farhana K.",
    location: "Dhaka",
    rating: 4,
    text: "Lovely toy that keeps my toddler engaged for ages. Would have loved a storage pouch, but otherwise perfect.",
    product: "Wooden Xylophone",
  },
];

export const bestSellerFaqs: FaqEntry[] = [
  {
    id: "why-best",
    question: "Why are these toys best sellers?",
    answer:
      "These are the toys families reach for again and again — chosen for their safe materials, timeless Montessori design, and the highest ratings and repeat purchases across our store.",
  },
  {
    id: "age",
    question: "Which age is suitable?",
    answer:
      "Every toy lists a recommended age range on its product page, spanning newborns through preschoolers. Use the Age filter to find toys matched to your child's stage.",
  },
  {
    id: "safe",
    question: "Are they safe?",
    answer:
      "Yes. Each toy is made from smooth-sanded neem wood with food-grade, non-toxic finishes, checked for lead and heavy metals, with no small detachable parts. Adult supervision is always recommended.",
  },
  {
    id: "clean",
    question: "How do I clean them?",
    answer:
      "Wipe gently with a slightly damp cloth and let them air-dry fully. Avoid soaking or dishwashers — a light coat of food-safe oil now and then keeps the wood looking new.",
  },
];

export const bestSellerCta = {
  heading: "Find the Perfect Toy for Every Stage",
  text: "From first grips to big-kid builds, explore toys designed to grow with your child.",
  primary: { label: "Shop All Toys", href: "/collections/all" },
  secondary: { label: "Browse by Age", href: "/collections/by-age" },
};
