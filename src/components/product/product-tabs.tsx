import { Check, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProductDetail } from "@/lib/types";

function BulletList({
  items,
  icon = "check",
}: {
  items: string[];
  icon?: "check" | "heart";
}) {
  if (!items.length) return <p className="text-sm text-ink-muted">No information yet.</p>;
  return (
    <ul className="space-y-2.5 text-sm leading-6 text-ink-muted">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          {icon === "check" ? (
            <Check className="mt-0.5 size-4 flex-none text-neem" />
          ) : (
            <Heart className="mt-0.5 size-4 flex-none text-terracotta" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Detail/spec table row. */
function SpecRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-cream-200 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-sm font-medium text-ink">{label}</dt>
      <dd className="text-sm text-ink-muted">{value}</dd>
    </div>
  );
}

/**
 * Tabbed product information: Description, Why Play, How Play, Details, and
 * Return & Exchange. Falls back gracefully when optional fields are missing.
 */
export function ProductTabs({ detail }: { detail: ProductDetail }) {
  const specs = detail.specs;

  return (
    <Tabs defaultValue="description" className="gap-6">
      <TabsList variant="line" className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent">
        <TabsTrigger value="description" className="text-sm font-semibold text-ink">
          Description
        </TabsTrigger>
        <TabsTrigger value="why" className="text-sm font-semibold text-ink">
          Why Play
        </TabsTrigger>
        <TabsTrigger value="how" className="text-sm font-semibold text-ink">
          How to Play
        </TabsTrigger>
        <TabsTrigger value="details" className="text-sm font-semibold text-ink">
          Details
        </TabsTrigger>
        <TabsTrigger value="return" className="text-sm font-semibold text-ink">
          Return &amp; Exchange
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="space-y-6">
        <p className="max-w-2xl text-sm leading-7 text-ink-muted sm:text-base">
          {detail.description}
        </p>
        {detail.features.length ? (
          <div>
            <h3 className="mb-3 font-display text-base font-bold text-ink">Features</h3>
            <BulletList items={detail.features} icon="check" />
          </div>
        ) : null}
        {detail.benefits.length ? (
          <div>
            <h3 className="mb-3 font-display text-base font-bold text-ink">Benefits</h3>
            <BulletList items={detail.benefits} icon="heart" />
          </div>
        ) : null}
      </TabsContent>

      <TabsContent value="why">
        <div className="max-w-2xl">
          <h3 className="mb-3 font-display text-base font-bold text-ink">Why your child will love it</h3>
          <BulletList items={detail.whyPlay ?? []} icon="heart" />
        </div>
      </TabsContent>

      <TabsContent value="how">
        <div className="max-w-2xl">
          <h3 className="mb-3 font-display text-base font-bold text-ink">How to play</h3>
          <BulletList items={detail.howPlay ?? []} icon="check" />
        </div>
      </TabsContent>

      <TabsContent value="details">
        <dl className="max-w-2xl">
          <SpecRow label="Age range" value={specs?.ageRange} />
          <SpecRow label="Materials" value={specs?.materials} />
          <SpecRow label="Safety" value={specs?.safety} />
          <SpecRow label="Weight" value={specs?.weight} />
          <SpecRow label="Dimensions" value={specs?.dimensions} />
        </dl>
      </TabsContent>

      <TabsContent value="return">
        <p className="max-w-2xl text-sm leading-7 text-ink-muted">
          {detail.returnPolicy}
        </p>
      </TabsContent>
    </Tabs>
  );
}
