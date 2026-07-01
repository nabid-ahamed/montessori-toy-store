import {
  Clock,
  Mail,
  MessageCircle,
  PackageSearch,
  Truck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  shippingHelp,
  shippingHighlights,
  shippingSections,
  shippingUpdated,
} from "@/lib/mock/shipping";
import type { ShippingHighlight } from "@/lib/mock/shipping";

// Highlight icon key → lucide component.
const highlightIcon: Record<ShippingHighlight["icon"], LucideIcon> = {
  truck: Truck,
  clock: Clock,
  "package-search": PackageSearch,
  wallet: Wallet,
};

/** Email + WhatsApp chips appended under FAQ answers that need a contact path. */
function ContactChips() {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <a
        href={`mailto:${shippingHelp.email}`}
        className="inline-flex items-center gap-2 rounded-full border border-cream-300 bg-cream-50/60 px-4 py-2 text-sm font-semibold text-ink no-underline transition-colors hover:border-neem"
      >
        <Mail className="size-4 text-neem" aria-hidden />
        {shippingHelp.email}
      </a>
      <a
        href={shippingHelp.whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-cream-300 bg-cream-50/60 px-4 py-2 text-sm font-semibold text-ink no-underline transition-colors hover:border-neem"
      >
        <MessageCircle className="size-4 text-neem" aria-hidden />
        WhatsApp {shippingHelp.whatsapp}
      </a>
    </div>
  );
}

/**
 * Shipping & Delivery policy page: a hero, a quick-facts strip, grouped FAQ
 * accordions, and a closing help CTA. Server component — content is static; the
 * Accordion is a client island rendered within.
 */
export function ShippingPolicyView() {
  return (
    <main className="flex-1 bg-paper">
      {/* hero */}
      <section className="mx-auto w-full max-w-[64rem] px-4 pt-6 pb-8 text-center sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shipping & Delivery" }]} />
        <div className="mt-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
            Shipping Policy
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Shipping &amp; Delivery
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-ink-muted">
            Everything you need to know about how — and how quickly — your handmade
            wooden toys make their way to you.
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
            Last updated {shippingUpdated}
          </p>
        </div>
      </section>

      {/* quick facts */}
      <section className="mx-auto w-full max-w-[64rem] px-4 pb-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {shippingHighlights.map((h) => {
            const Icon = highlightIcon[h.icon];
            return (
              <div
                key={h.id}
                className="flex flex-col items-start rounded-2xl border border-cream-200 bg-cream-50/50 p-5"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-neem/10 text-neem">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="mt-3 font-display text-base font-bold text-ink">{h.title}</h2>
                <p className="mt-1 text-sm text-ink-muted">{h.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ sections */}
      <div className="mx-auto w-full max-w-[64rem] px-4 py-8 sm:px-6 lg:px-8">
        {shippingSections.map((section) => (
          <section key={section.id} className="mt-8 first:mt-0">
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
              {section.title}
            </h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-cream-200 bg-paper shadow-sm">
              <Accordion
                type="single"
                collapsible
                defaultValue={section.id === "delivery" ? "delivery-0" : undefined}
              >
                {section.faqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.q}
                    value={`${section.id}-${i}`}
                    className="border-cream-200 px-5"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-5 text-[15px] leading-relaxed text-ink-muted">
                      {faq.answer.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                      {faq.contact ? <ContactChips /> : null}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        ))}
      </div>

      {/* closing help CTA */}
      <section className="mx-auto w-full max-w-[64rem] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-cream-200 bg-neem/5 px-6 py-10 text-center sm:px-10">
          <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
            Still have a shipping question?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-ink-muted">
            Our team is happy to help with special requests, international rates, or
            anything else about your order.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${shippingHelp.email}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-neem px-5 text-sm font-bold text-paper transition-colors hover:bg-neem-deep"
            >
              <Mail className="size-4" aria-hidden />
              Email us
            </a>
            <a
              href={shippingHelp.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-cream-300 bg-paper px-5 text-sm font-bold text-ink transition-colors hover:border-neem"
            >
              <MessageCircle className="size-4 text-neem" aria-hidden />
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
