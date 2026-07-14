/**
 * Shipping & Delivery policy content. Placeholder specifics — edit here in one
 * place when the real logistics details are confirmed. NOTE: courier names,
 * delivery windows, and the help contact below are placeholders adapted from a
 * reference site; swap in the store's real carriers, ranges, and contact.
 */

export type ShippingHighlight = {
  id: string;
  icon: "truck" | "clock" | "package-search" | "wallet";
  title: string;
  desc: string;
};

/** A single FAQ. `answer` is a list of paragraphs; `contact` appends the help
 *  chips (email + WhatsApp) under the answer. */
export type ShippingFaq = {
  q: string;
  answer: string[];
  contact?: boolean;
};

export type ShippingSection = {
  id: string;
  title: string;
  faqs: ShippingFaq[];
};

/** Quick-facts strip shown above the FAQ. */
export const shippingHighlights: ShippingHighlight[] = [
  {
    id: "dispatch",
    icon: "truck",
    title: "Ships within 24 hours",
    desc: "We dispatch most orders within a day of ordering.",
  },
  {
    id: "window",
    icon: "clock",
    title: "6–10 day delivery",
    desc: "Delivery time depends on your location.",
  },
  {
    id: "tracking",
    icon: "package-search",
    title: "Tracking on every order",
    desc: "Follow your parcel until it reaches you.",
  },
  {
    id: "cod",
    icon: "wallet",
    title: "Cash on Delivery",
    desc: "COD available at checkout, within set limits.",
  },
];

/** Grouped FAQ content for the shipping policy page. */
export const shippingSections: ShippingSection[] = [
  {
    id: "delivery",
    title: "Shipping & delivery",
    faqs: [
      {
        q: "How soon will my order reach me?",
        answer: [
          "We try to ship products within 24 hours of placing your order. The time taken to deliver depends on your delivery location.",
          "Typically, major cities receive products within 6–7 days of shipping, and other regions within 7–10 days. Any product above 10 kg may take 7–10 days to deliver.",
        ],
      },
      {
        q: "How reliable are your delivery services?",
        answer: [
          "We've partnered with trusted couriers like RedX, Pathao, and Steadfast to deliver your order safely across the country. Depending on your location, we ship by surface or air for the best balance of speed and care.",
        ],
      },
      {
        q: "Why are my products arriving in multiple shipments?",
        answer: [
          "We ship from multiple locations, so your order may reach you in more than one parcel. Not to worry — every item is on its way.",
        ],
      },
      {
        q: "Do you charge for shipping?",
        answer: [
          "Yes, we charge a nominal fee based on the total weight of your order. The exact amount is always shown at checkout before you pay.",
        ],
      },
      {
        q: "How will I know if my order has been shipped?",
        answer: [
          "Once your shipment is booked, we'll send you a notification with tracking details so you can follow your order until it reaches you safely.",
        ],
      },
      {
        q: "What if I have a special request for my order?",
        answer: [
          "We love special requests! Just reach out to our team and we'll do our best to make it happen.",
        ],
        contact: true,
      },
    ],
  },
  {
    id: "international",
    title: "International orders",
    faqs: [
      {
        q: "Do you ship internationally?",
        answer: [
          "Yes, we do! Get in touch with us and we'll find the best shipping rate to your location. Please note that free shipping does not apply to international orders — international shipping is charged on actuals.",
        ],
        contact: true,
      },
      {
        q: "How long does an international order take?",
        answer: [
          "For international orders we ship via DHL Express or FedEx, and your parcel typically reaches its destination within 10–15 days after shipping. Any customs-related delays or charges are borne by the customer.",
        ],
      },
    ],
  },
  {
    id: "payment",
    title: "Payment",
    faqs: [
      {
        q: "Do you offer Cash on Delivery (COD)?",
        answer: [
          "Yes! COD is available for eligible orders. COD limits may change and are displayed at checkout.",
        ],
      },
    ],
  },
];

/** Placeholder help contact used by the FAQ chips and the closing CTA. */
export const shippingHelp = {
  email: "hello@toytuni.com",
  whatsapp: "+880 1234-567890",
  whatsappHref: "https://wa.me/8801234567890",
};

/** Static "last updated" stamp shown in the hero. */
export const shippingUpdated = "1 July 2026";
