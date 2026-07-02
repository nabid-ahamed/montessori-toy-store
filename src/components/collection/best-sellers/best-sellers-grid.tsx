"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BestSellerCard } from "@/components/collection/best-sellers/best-seller-card";
import { QuickViewDialog } from "@/components/collection/best-sellers/quick-view-dialog";
import { bestSellerProducts } from "@/lib/mock/best-sellers";
import { ageTiers } from "@/lib/mock/age-tiers";
import { categories } from "@/lib/mock/categories";
import { formatTk } from "@/lib/format";
import type { Product } from "@/lib/types";

const SORTS = [
  { value: "best", label: "Best Selling" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;
type SortValue = (typeof SORTS)[number]["value"];

const PRICE_MAX = Math.max(...bestSellerProducts.map((p) => p.price));

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-cream-200 bg-card">
      <div className="aspect-square animate-pulse bg-cream-200" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-16 animate-pulse rounded bg-cream-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-cream-200" />
        <div className="h-3 w-full animate-pulse rounded bg-cream-200" />
        <div className="flex justify-between pt-3">
          <div className="h-5 w-16 animate-pulse rounded bg-cream-200" />
          <div className="h-8 w-20 animate-pulse rounded bg-cream-200" />
        </div>
      </div>
    </div>
  );
}

/** Search + age + category + price facets. Reused in the sidebar and the sheet. */
function Facets({
  query,
  setQuery,
  age,
  setAge,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
}: {
  query: string;
  setQuery: (v: string) => void;
  age: string;
  setAge: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Search</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search best sellers…"
            className="h-10 bg-paper pl-9"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Age</label>
        <Select value={age} onValueChange={setAge}>
          <SelectTrigger className="h-10 w-full bg-paper">
            <SelectValue placeholder="All ages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ages</SelectItem>
            {ageTiers.map((t) => (
              <SelectItem key={t.slug} value={t.slug}>
                {t.labelBn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-10 w-full bg-paper">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.nameBn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-ink">Price range</label>
        <Slider
          min={0}
          max={PRICE_MAX}
          step={10}
          value={[maxPrice]}
          onValueChange={([v]) => setMaxPrice(v)}
          aria-label="Maximum price"
        />
        <p className="mt-2 text-sm text-ink-muted">
          Up to <span className="font-medium text-ink">{formatTk(maxPrice)}</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Best Sellers product grid with live search, age/category/price filters, sort,
 * a sticky desktop filter sidebar (a Sheet on mobile), a skeleton loading state,
 * and a Quick View dialog. Frontend only — filters the mock best-seller list.
 */
export function BestSellersGrid() {
  const [query, setQuery] = useState("");
  const [age, setAge] = useState("all");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [sort, setSort] = useState<SortValue>("best");
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  // Simulate an initial fetch so the skeleton state is exercised (swap for a
  // real loading flag when the backend is connected).
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(t);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = bestSellerProducts.filter((p) => {
      if (q && !p.titleBn.toLowerCase().includes(q)) return false;
      if (age !== "all" && p.ageTierSlug !== age) return false;
      if (category !== "all" && p.categorySlug !== category) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    const sorted = [...filtered];
    switch (sort) {
      case "best":
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
        sorted.sort(
          (a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0),
        );
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
    }
    return sorted;
  }, [query, age, category, maxPrice, sort]);

  const resetAll = () => {
    setQuery("");
    setAge("all");
    setCategory("all");
    setMaxPrice(PRICE_MAX);
  };

  const facetProps = {
    query,
    setQuery,
    age,
    setAge,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
      {/* sticky sidebar (desktop) */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-2xl border border-cream-200 bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Filters</h2>
            <button
              type="button"
              onClick={resetAll}
              className="text-sm font-medium text-neem-deep underline-offset-4 hover:underline"
            >
              Reset
            </button>
          </div>
          <Facets {...facetProps} />
        </div>
      </aside>

      {/* main */}
      <div>
        {/* toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-muted">
            {loading ? "Loading…" : `${results.length} products`}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-10 gap-2 lg:hidden"
              onClick={() => setSheetOpen(true)}
            >
              <SlidersHorizontal className="size-4" />
              Filters
            </Button>
            <Select value={sort} onValueChange={(v) => setSort(v as SortValue)}>
              <SelectTrigger className="h-10 w-[180px] bg-paper">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORTS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* grid / skeleton / empty */}
        {loading ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-cream-300 px-6 py-16 text-center">
            <p className="font-display text-xl font-bold text-ink">
              No best sellers match your filters
            </p>
            <p className="mt-2 max-w-sm text-sm text-ink-muted">
              Try a different search, widen the price range, or clear a filter.
            </p>
            <Button variant="outline" className="mt-6" onClick={resetAll}>
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 xl:grid-cols-4">
            {results.map((product) => (
              <BestSellerCard
                key={product.slug}
                product={product}
                onQuickView={setQuickView}
              />
            ))}
          </div>
        )}
      </div>

      {/* mobile filters sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="left" className="w-[300px] overflow-y-auto">
          <SheetHeader className="flex-row items-center justify-between">
            <SheetTitle>Filters</SheetTitle>
            <button
              type="button"
              onClick={resetAll}
              className="mr-8 text-sm font-medium text-neem-deep hover:underline"
            >
              Reset
            </button>
          </SheetHeader>
          <div className="px-4 pb-8">
            <Facets {...facetProps} />
            <Button className="mt-6 w-full" onClick={() => setSheetOpen(false)}>
              Show {results.length} results
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <QuickViewDialog product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
