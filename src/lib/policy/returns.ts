import type { PolicyContent } from "./types";

/**
 * Returns & Refund Policy content. Placeholder specifics (windows, wallets,
 * contact) — edit here in one place. Rendered by the reusable PolicyPageView.
 */
export const returnsPolicy: PolicyContent = {
  slug: "returns",
  badge: "Returns & Refunds",
  title: "Returns & Refund Policy",
  intro:
    "We want every purchase to bring joy. Learn how returns, refunds, and exchanges work — simple, fair, and hassle-free.",
  updated: "1 July 2026",
  summary: [
    { icon: "clock", text: "7-day return window" },
    { icon: "check-circle", text: "Unused & in original packaging" },
    { icon: "wallet", text: "Refunds in 5–7 business days" },
    { icon: "truck", text: "Free pickup on damaged items" },
  ],
  sections: [
    {
      id: "overview",
      icon: "sparkles",
      title: "Overview",
      blocks: [
        {
          type: "paragraph",
          text: "Every toy we make is crafted with care, and we want you to love what arrives at your door. If something isn't quite right, we've made it easy to return or exchange your order.",
        },
        {
          type: "paragraph",
          text: "This policy explains what can be returned, how long you have, and how refunds and exchanges work.",
        },
      ],
    },
    {
      id: "eligibility",
      icon: "check-circle",
      title: "Return Eligibility",
      intro: "To be eligible for a return, your item should meet the following conditions:",
      blocks: [
        {
          type: "checklist",
          items: [
            "Items must be unused and undamaged",
            "Original packaging and tags intact",
            "Return requested within 7 days of delivery",
            "Proof of purchase (order number or receipt)",
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Good to know",
          text: "Start a return by contacting our support team with your order number — we'll guide you through every step.",
        },
      ],
    },
    {
      id: "non-returnable",
      icon: "x-circle",
      title: "Non-Returnable Items",
      intro: "For safety and hygiene reasons, a few items can't be returned:",
      blocks: [
        {
          type: "list",
          items: [
            "Personalised or custom-made toys",
            "Gift cards and vouchers",
            "Clearance or final-sale items",
            "Items returned without original packaging",
            "Products showing signs of use or damage not caused by us",
          ],
        },
      ],
    },
    {
      id: "exchange",
      icon: "rotate-ccw",
      title: "Exchange Process",
      intro: "Prefer a different toy or variant? Exchanges are simple:",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Reach out",
              text: "Contact support within 7 days with your order number and the item you'd like to exchange.",
            },
            {
              title: "Pack it up",
              text: "Repack the item safely in its original packaging.",
            },
            {
              title: "Send it back",
              text: "We'll arrange a pickup or share the return address with you.",
            },
            {
              title: "Receive your swap",
              text: "Once we inspect the item, we'll ship your replacement — any price difference is settled either way.",
            },
          ],
        },
      ],
    },
    {
      id: "refund-timeline",
      icon: "clock",
      title: "Refund Timeline",
      intro: "Here's what happens once we receive your returned item:",
      blocks: [
        {
          type: "timeline",
          items: [
            { title: "Day 0 — Item received", text: "Your return arrives at our facility." },
            {
              title: "Day 1–2 — Quality check",
              text: "We inspect the item to confirm it meets the return conditions.",
            },
            {
              title: "Day 3 — Refund initiated",
              text: "Approved refunds are processed to your original payment method.",
            },
            {
              title: "Day 5–7 — Refund completed",
              text: "The amount reflects in your account, depending on your bank or provider.",
            },
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Please note",
          text: "Original shipping charges are non-refundable unless the return is due to our error. Cash-on-Delivery orders are refunded via bank transfer or mobile wallet (bKash / Nagad).",
        },
      ],
    },
    {
      id: "damaged",
      icon: "shield-check",
      title: "Damaged or Incorrect Orders",
      blocks: [
        {
          type: "paragraph",
          text: "If your order arrives damaged, defective, or incorrect, we'll make it right at no extra cost to you.",
        },
        {
          type: "checklist",
          items: [
            "Report within 48 hours of delivery",
            "Share a photo of the item and its packaging",
            "We'll arrange a free pickup and send a replacement or full refund",
          ],
        },
      ],
    },
    {
      id: "faq",
      icon: "message-circle",
      title: "Frequently Asked Questions",
      blocks: [
        {
          type: "faq",
          items: [
            {
              q: "Can I return a toy if my child just didn't take to it?",
              a: "As long as it's unused, in its original packaging, and within 7 days of delivery, yes — reach out and we'll help you sort it out.",
            },
            {
              q: "Do I have to pay for return shipping?",
              a: "For change-of-mind returns, return shipping is arranged by you. For damaged, defective, or incorrect items, we cover the pickup and replacement in full.",
            },
            {
              q: "How will I receive a refund for a Cash-on-Delivery order?",
              a: "COD orders are refunded via bank transfer or mobile wallet (bKash / Nagad) once your return has been approved.",
            },
            {
              q: "Can I exchange for a completely different toy?",
              a: "Absolutely — contact support and we'll help you swap for another item. Any price difference is simply adjusted either way.",
            },
          ],
        },
      ],
    },
  ],
  trust: [
    { icon: "shield-check", label: "Secure & fair returns" },
    { icon: "leaf", label: "Eco-friendly materials" },
    { icon: "badge-check", label: "Handmade quality" },
    { icon: "truck", label: "Free pickup on damages" },
  ],
  cta: {
    title: "Still have questions?",
    text: "Our support team is happy to help with returns, refunds, and exchanges.",
    primary: { label: "Contact us", href: "/contact" },
    secondary: { label: "Email support", href: "mailto:hello@databrandix.com" },
  },
};
