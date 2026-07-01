import { AlertTriangle, Check, CheckCircle2, Info, type LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { CalloutTone, PolicyBlock } from "@/lib/policy/types";

const calloutStyles: Record<
  CalloutTone,
  { wrap: string; icon: LucideIcon; iconColor: string }
> = {
  info: { wrap: "border-dusty-blue/30 bg-dusty-blue/10", icon: Info, iconColor: "text-dusty-blue" },
  success: { wrap: "border-neem/30 bg-neem/10", icon: CheckCircle2, iconColor: "text-neem" },
  warning: {
    wrap: "border-terracotta/30 bg-terracotta/10",
    icon: AlertTriangle,
    iconColor: "text-terracotta",
  },
};

/** Renders a single policy block based on its discriminated `type`. */
function Block({ block, sectionId }: { block: PolicyBlock; sectionId: string }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-[15px] leading-relaxed text-ink-muted">{block.text}</p>;

    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((it) => (
            <li
              key={it}
              className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-muted"
            >
              <span className="mt-2 size-1.5 flex-none rounded-full bg-neem" aria-hidden />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );

    case "checklist":
      return (
        <ul className="space-y-2.5">
          {block.items.map((it) => (
            <li key={it} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
              <span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-neem/15 text-neem">
                <Check className="size-3.5" strokeWidth={3} aria-hidden />
              </span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="space-y-4">
          {block.items.map((it, i) => (
            <li key={it.title} className="flex items-start gap-4">
              <span className="flex size-8 flex-none items-center justify-center rounded-full bg-neem font-display text-sm font-bold text-paper">
                {i + 1}
              </span>
              <div>
                <h4 className="font-semibold text-ink">{it.title}</h4>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "timeline":
      return (
        <ol className="relative ml-2 space-y-6 border-l border-cream-300 pl-6">
          {block.items.map((it) => (
            <li key={it.title} className="relative">
              <span
                className="absolute -left-[1.9rem] top-1 size-4 rounded-full border-2 border-paper bg-neem"
                aria-hidden
              />
              <h4 className="font-semibold text-ink">{it.title}</h4>
              <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{it.text}</p>
            </li>
          ))}
        </ol>
      );

    case "callout": {
      const tone = block.tone ?? "info";
      const style = calloutStyles[tone];
      const Icon = style.icon;
      return (
        <div className={cn("flex gap-3 rounded-2xl border p-4", style.wrap)}>
          <Icon className={cn("size-5 flex-none", style.iconColor)} aria-hidden />
          <div>
            {block.title ? <p className="font-semibold text-ink">{block.title}</p> : null}
            <p className={cn("text-sm leading-relaxed text-ink-muted", block.title && "mt-0.5")}>
              {block.text}
            </p>
          </div>
        </div>
      );
    }

    case "faq":
      return (
        <div className="overflow-hidden rounded-2xl border border-cream-200 bg-paper">
          <Accordion type="single" collapsible defaultValue={`${sectionId}-faq-0`}>
            {block.items.map((it, i) => (
              <AccordionItem
                key={it.q}
                value={`${sectionId}-faq-${i}`}
                className="border-cream-200 px-4"
              >
                <AccordionTrigger className="py-3.5 text-left text-[15px] font-semibold text-ink hover:no-underline">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-4 text-sm leading-relaxed text-ink-muted">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      );

    default:
      return null;
  }
}

/** Renders an ordered list of policy blocks with consistent vertical rhythm. */
export function PolicyBlocks({
  blocks,
  sectionId,
}: {
  blocks: PolicyBlock[];
  sectionId: string;
}) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => (
        <Block key={`${block.type}-${i}`} block={block} sectionId={sectionId} />
      ))}
    </div>
  );
}
