/**
 * FAQ content for the support-center page. Plain-text questions/answers so they
 * stay searchable; optional `link` points to a relevant page. Edit here in one
 * place. Answers are kept consistent with the store's policy pages.
 */

export type FaqCategory =
  | "Orders"
  | "Shipping"
  | "Returns"
  | "Products"
  | "Payments"
  | "Bulk Orders";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  link?: { label: string; href: string };
};

/** Filter chips shown above the FAQ list. "All" shows every question. */
export const faqFilters = [
  "All",
  "Orders",
  "Shipping",
  "Returns",
  "Products",
  "Payments",
  "Bulk Orders",
] as const;

export type FaqFilter = (typeof faqFilters)[number];

export const faqs: FaqItem[] = [
  // Orders
  {
    id: "place-order",
    category: "Orders",
    question: "How do I place an order?",
    answer:
      "Browse our collection, add the toys you love to your cart, and check out with your delivery details. You'll receive an order confirmation right away.",
  },
  {
    id: "track-order",
    category: "Orders",
    question: "How can I track my order?",
    answer:
      "Once your order ships, we'll send you a notification with a tracking link so you can follow your parcel until it reaches you.",
    link: { label: "Shipping & Delivery", href: "/policy/shipping" },
  },
  {
    id: "change-order",
    category: "Orders",
    question: "Can I change or cancel my order?",
    answer:
      "If your order hasn't shipped yet, contact us as soon as possible and we'll do our best to update or cancel it for you.",
  },
  // Shipping
  {
    id: "shipping-times",
    category: "Shipping",
    question: "How long does delivery take?",
    answer:
      "We dispatch most orders within 24 hours. Major cities typically receive their order in 6–7 days, and other regions in 7–10 days.",
    link: { label: "Shipping & Delivery", href: "/policy/shipping" },
  },
  {
    id: "delivery-areas",
    category: "Shipping",
    question: "Which areas do you deliver to?",
    answer:
      "We deliver nationwide through trusted couriers like RedX, Pathao, and Steadfast. We also ship internationally on request.",
  },
  {
    id: "shipping-cost",
    category: "Shipping",
    question: "How much does shipping cost?",
    answer:
      "Shipping is a nominal fee based on your order's total weight, and the exact amount is always shown at checkout before you pay.",
  },
  {
    id: "international",
    category: "Shipping",
    question: "Do you ship internationally?",
    answer:
      "Yes! Reach out and we'll find the best international rate for your location. International shipping is charged on actuals.",
    link: { label: "Shipping & Delivery", href: "/policy/shipping" },
  },
  // Returns
  {
    id: "returns",
    category: "Returns",
    question: "What is your return & exchange policy?",
    answer:
      "Unused items in their original packaging can be returned or exchanged within 7 days of delivery. Just reach out with your order number to start.",
    link: { label: "Returns & Refund Policy", href: "/policy/returns" },
  },
  {
    id: "refund-process",
    category: "Returns",
    question: "How does the refund process work?",
    answer:
      "Once we receive and inspect your return, approved refunds are processed to your original payment method within 5–7 business days.",
    link: { label: "Returns & Refund Policy", href: "/policy/returns" },
  },
  {
    id: "damaged",
    category: "Returns",
    question: "My toy arrived damaged — what should I do?",
    answer:
      "We're sorry to hear that! Report it within 48 hours with a photo, and we'll arrange a free pickup and a replacement or full refund.",
  },
  // Payments
  {
    id: "payment-methods",
    category: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept the payment options shown at checkout, including cards, mobile wallets, and Cash on Delivery where available.",
  },
  {
    id: "cod",
    category: "Payments",
    question: "Do you offer Cash on Delivery?",
    answer:
      "Yes — COD is available for eligible orders, with limits shown at checkout. COD refunds are made via bank transfer or mobile wallet (bKash / Nagad).",
  },
  {
    id: "secure-payment",
    category: "Payments",
    question: "Is it safe to pay online?",
    answer:
      "Absolutely. Payments are processed securely by our trusted payment partners, and we never store your full card details.",
    link: { label: "Privacy Policy", href: "/policy/privacy" },
  },
  // Products
  {
    id: "safety",
    category: "Products",
    question: "Are your toys safe for children?",
    answer:
      "Every toy is made from non-toxic, natural neem wood with child-safe finishes, and is carefully checked for quality and safety.",
  },
  {
    id: "age",
    category: "Products",
    question: "What age are your toys recommended for?",
    answer:
      "Each product lists its recommended age range on its page. You can also browse by age to quickly find the perfect fit.",
    link: { label: "Shop by age", href: "/collections/by-age" },
  },
  {
    id: "materials",
    category: "Products",
    question: "What are the toys made from?",
    answer:
      "Our toys are crafted from sustainably sourced neem wood, finished with natural, non-toxic colours and oils.",
  },
  {
    id: "cleaning",
    category: "Products",
    question: "How do I clean and care for the toys?",
    answer:
      "Wipe gently with a slightly damp cloth and dry immediately. Avoid soaking in water to keep the wood beautiful for years of play.",
  },
  {
    id: "warranty",
    category: "Products",
    question: "Do your toys come with a warranty?",
    answer:
      "Yes — every toy is covered against manufacturing defects for 6 months from the date of delivery.",
    link: { label: "Warranty Policy", href: "/policy/warranty" },
  },
  // Bulk Orders
  {
    id: "bulk",
    category: "Bulk Orders",
    question: "Do you offer bulk or wholesale orders?",
    answer:
      "Yes! We work with preschools, retailers, and distributors with special pricing and dedicated support. Request a quote any time.",
    link: { label: "Bulk / B2B", href: "/bulk" },
  },
];
