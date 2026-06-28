"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Baby,
  BadgeCheck,
  CalendarClock,
  Clock3,
  FlaskConical,
  Leaf,
  Minus,
  PackageCheck,
  Plus,
  Recycle,
  ShieldCheck,
  Star,
  Truck,
  Video,
} from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductTabs } from "@/components/product/product-tabs";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductRail } from "@/components/product/product-rail";
import { WishlistButton } from "@/components/product/wishlist-button";
import { useCart } from "@/lib/cart/cart-context";
import { formatTk } from "@/lib/format";
import { certifications, videoCallBanner } from "@/lib/mock/trust";
import { cn } from "@/lib/utils";
import type { AgeTier, Category, Product, ProductDetail } from "@/lib/types";

const certIcon = {
  "shield-check": ShieldCheck,
  leaf: Leaf,
  baby: Baby,
  recycle: Recycle,
  "badge-check": BadgeCheck,
  "flask-conical": FlaskConical,
} as const;

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating.toFixed(1)} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "size-5",
            index < rounded ? "fill-mustard text-mustard" : "fill-cream-300 text-cream-300",
          )}
        />
      ))}
    </div>
  );
}

export function ProductDetailsView({
  product,
  detail,
  ageTier,
  category,
  related,
}: {
  product: Product;
  detail: ProductDetail;
  ageTier?: AgeTier;
  category?: Category;
  related: Product[];
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const addSelectedToCart = () => addItem(product.slug, quantity);
  const buyNow = () => {
    addSelectedToCart();
    router.push("/cart");
  };

  return (
    <main className="flex-1 bg-paper">
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-[92rem] px-4 pt-5 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: category?.nameBn ?? "Shop", href: category?.href },
            { label: product.titleBn },
          ]}
        />
      </div>

      {/* ===== top: gallery + purchase ===== */}
      <section className="mx-auto grid w-full max-w-[92rem] gap-8 px-4 py-6 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.78fr)] lg:gap-12 lg:px-8">
        <ProductGallery
          images={detail.imageSrcs}
          imageLabel={product.imageLabelBn}
          imageTones={product.imageTones}
        />

        <div className="flex flex-col py-1 lg:py-4">
          {/* tags + wishlist */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {ageTier ? (
                <span className="rounded-full bg-mustard/35 px-3 py-1 text-sm font-medium text-ink">
                  {ageTier.labelBn}
                </span>
              ) : null}
              {category ? (
                <span className="rounded-full bg-cream-100 px-3 py-1 text-sm font-medium text-ink-muted">
                  {category.nameBn}
                </span>
              ) : null}
              {product.badge ? (
                <span className="rounded-full bg-neem/10 px-3 py-1 text-sm font-semibold text-neem-deep">
                  {product.badge}
                </span>
              ) : null}
            </div>
            <WishlistButton slug={product.slug} className="border border-cream-200 bg-paper" />
          </div>

          {/* rating */}
          <div className="mt-6 flex items-center gap-3">
            <Stars rating={product.rating} />
            <span className="text-base font-semibold text-ink-muted">
              {product.reviewCount} reviews
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
            {product.titleBn}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
            {detail.description}
          </p>

          <p className="mt-4 text-sm font-bold text-terracotta">
            300k+ babies growing with our product
          </p>

          {/* price */}
          <div className="mt-5 flex flex-wrap items-end gap-3">
            {product.compareAtPrice ? (
              <span className="text-lg text-ink line-through">
                {formatTk(product.compareAtPrice)}
              </span>
            ) : null}
            <span className="font-display text-3xl font-bold text-danger">
              {formatTk(product.price)}
            </span>
            {discount ? (
              <span className="mb-1 rounded-full bg-danger/10 px-2.5 py-1 text-xs font-bold text-danger">
                {discount}% off
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-ink-muted">Taxes included.</p>

          {/* offer / countdown */}
          <div className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-mustard/65 px-5 py-3 text-sm font-extrabold uppercase text-danger shadow-[0_8px_24px_-14px_rgba(43,38,32,0.35)]">
            <Clock3 className="size-4" />
            Anniversary sale ends in: {detail.saleCountdown}
          </div>

          {/* quantity + actions */}
          <div className="mt-7 grid gap-5">
            <div>
              <p className="mb-2 text-sm font-medium text-ink-muted">Quantity</p>
              <div className="inline-grid h-12 grid-cols-3 overflow-hidden rounded-md border border-ink-soft/60 bg-paper">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Decrease quantity"
                  className="flex w-14 items-center justify-center text-ink-muted transition hover:bg-cream-100"
                >
                  <Minus className="size-4" />
                </button>
                <span className="flex w-14 items-center justify-center text-base font-medium text-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                  className="flex w-14 items-center justify-center text-ink-muted transition hover:bg-cream-100"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                onClick={addSelectedToCart}
                className="h-12 bg-neem text-base font-bold text-paper hover:bg-neem-deep"
              >
                Add to Cart
              </Button>
              <Button
                type="button"
                onClick={buyNow}
                className="h-12 bg-ink text-base font-bold text-paper hover:bg-ink/90"
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* delivery checker */}
          <div className="mt-7 rounded-lg border border-cream-200 bg-cream-50 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-lg font-bold text-ink">
              <Truck className="size-5 text-neem" />
              Estimate Delivery
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter postal code"
                className="h-11 rounded-md border border-cream-300 bg-paper px-3 text-sm outline-none focus:border-neem focus:ring-2 focus:ring-neem/20"
              />
              <Button type="button" className="h-11 bg-ink px-8 text-paper hover:bg-ink/90">
                Submit
              </Button>
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
              <PackageCheck className="size-4 text-neem" />
              {detail.deliveryEstimate}
            </p>
          </div>

          {/* trust strip */}
          <div className="mt-7 grid grid-cols-2 gap-3 border-t border-cream-200 pt-6 sm:grid-cols-3">
            {certifications.map((cert) => {
              const Icon = certIcon[cert.icon];
              return (
                <div key={cert.id} className="flex items-center gap-2.5">
                  <span className="flex size-9 flex-none items-center justify-center rounded-full bg-neem/10 text-neem">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-xs font-medium leading-tight text-ink-muted">
                    {cert.labelBn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== details tabs ===== */}
      <section className="mx-auto w-full max-w-[92rem] border-t border-cream-200 px-4 py-10 sm:px-6 lg:px-8">
        <ProductTabs detail={detail} />
      </section>

      {/* ===== video call banner ===== */}
      <section className="mx-auto w-full max-w-[92rem] px-4 pb-2 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-ink p-6 text-cream-200 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-12 flex-none items-center justify-center rounded-full bg-neem/20 text-neem-soft">
              <Video className="size-6" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-paper sm:text-2xl">
                {videoCallBanner.titleBn}
              </h2>
              <p className="mt-1 max-w-xl text-sm text-cream-300">{videoCallBanner.descBn}</p>
            </div>
          </div>
          <Button
            type="button"
            asChild
            className="h-12 shrink-0 gap-2 bg-blush px-6 text-ink hover:bg-blush/80"
          >
            <a href={videoCallBanner.href}>
              <CalendarClock className="size-4" />
              {videoCallBanner.ctaBn}
            </a>
          </Button>
        </div>
      </section>

      {/* ===== related products ===== */}
      <section className="mx-auto w-full max-w-[92rem] px-4 py-10 sm:px-6 lg:px-8">
        <ProductRail title="You may also like" products={related} viewAllHref="/collections/all" />
      </section>

      {/* ===== reviews ===== */}
      <section className="mx-auto w-full max-w-[92rem] px-4 pb-12 sm:px-6 lg:px-8">
        <ProductReviews
          reviews={detail.reviews ?? []}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </section>
    </main>
  );
}
