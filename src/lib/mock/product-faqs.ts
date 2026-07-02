/**
 * Lightweight FAQ data for the reusable FAQ section (e.g. on the product or
 * safety pages). Kept separate from the support-center FAQs in `faqs.ts` — these
 * are short, focused questions with no category/search. Edit here in one place.
 */

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

/** Default product-page FAQs. Pass a custom list to reuse the section elsewhere. */
export const productFaqs: FaqEntry[] = [
  {
    id: "newborn-safe",
    question: "Is it safe for newborns?",
    answer:
      "Yes. Every piece is made from smooth-sanded neem wood with a food-grade, non-toxic finish and no small detachable parts. We still recommend adult supervision during play.",
  },
  {
    id: "clean",
    question: "How do I clean it?",
    answer:
      "Wipe with a slightly damp cloth and let it air-dry fully. Avoid soaking, dishwashers, or harsh chemicals — a light coat of food-safe oil now and then keeps the wood looking new.",
  },
  {
    id: "chew",
    question: "Can babies chew it?",
    answer:
      "They can. Neem wood is naturally antibacterial and our finish is baby-safe, so gentle chewing and teething are perfectly fine. Just check for wear over time as with any toy.",
  },
  {
    id: "gift-packaging",
    question: "Does it come in gift packaging?",
    answer:
      "Yes — free gift wrapping is available on request at checkout, so it arrives ready to give with a clean, premium finish.",
  },
];
