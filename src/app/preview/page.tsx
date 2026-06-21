import type { Metadata } from "next";
import { ProductCard } from "@/components/product/product-card";
import { ProductRail } from "@/components/product/product-rail";
import { products, bestSellers, newLaunches } from "@/lib/mock/products";
import { BRAND_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Preview — ${BRAND_NAME}`,
};

// Temporary verification page for Step 1 primitives. Removed/replaced in Step 7.
export default function PreviewPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="border-b-2 border-ink pb-5">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-neem-deep">
          ধাপ ১ · Primitives Preview
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink">
          ProductCard ও ProductRail
        </h1>
        <p className="mt-2 text-ink-muted">
          এই পেজটি শুধু যাচাইয়ের জন্য — পরে সরিয়ে ফেলা হবে।
        </p>
      </header>

      {/* static grid — inspect a single card closely */}
      <section className="mt-10">
        <h2 className="mb-4 font-display text-xl font-semibold text-wood-deep">
          ProductCard (গ্রিড)
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* rails */}
      <div className="mt-12 space-y-10">
        <ProductRail
          title="বেস্ট সেলার"
          subtitle="অভিভাবকদের সবচেয়ে পছন্দের"
          products={bestSellers}
          viewAllHref="/collections/best-sellers"
        />
        <ProductRail
          title="নতুন লঞ্চ"
          products={newLaunches}
          viewAllHref="/collections/new"
        />
        <ProductRail
          title="সব খেলনা"
          products={products}
          viewAllHref="/collections/all"
        />
      </div>
    </main>
  );
}
