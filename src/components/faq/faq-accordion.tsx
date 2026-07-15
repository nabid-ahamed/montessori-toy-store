"use client";

import { ChevronDown } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { productFaqs, type FaqEntry } from "@/lib/mock/product-faqs";

/**
 * Reusable FAQ section: a single-open accordion with smooth expand/collapse
 * animations. Fully data-driven via the `items` prop (defaults to the
 * product-page FAQs) so it can be dropped anywhere. Renders nothing when empty.
 *
 * `type="single" collapsible` guarantees only one item is open at a time.
 */
export function FaqAccordion({
  items = productFaqs,
  title = "Frequently Asked Questions",
}: {
  items?: FaqEntry[];
  title?: string;
}) {
  if (!items.length) return null;

  return (
    <div>
      {title ? (
        <h2 className="text-center font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
      ) : null}

      <AccordionPrimitive.Root
        type="single"
        collapsible
        className="mx-auto mt-6 flex max-w-3xl flex-col gap-3"
      >
        {items.map((item) => (
          <AccordionPrimitive.Item
            key={item.id}
            value={item.id}
            className="overflow-hidden rounded-2xl border border-cream-200 bg-paper shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="group/faq flex w-full items-center justify-between gap-4 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-neem/40">
                <span className="min-w-0 break-words text-[15px] font-semibold text-ink sm:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  className="size-5 shrink-0 text-neem transition-transform duration-300 group-aria-expanded/faq:rotate-180"
                  aria-hidden
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up">
              <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink-muted">
                {item.answer}
              </p>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </div>
  );
}
