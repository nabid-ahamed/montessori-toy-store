"use client";

import Link from "next/link";
import { Eye, Star } from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ProductImage } from "@/components/product/product-image";
import { WishlistButton } from "@/components/product/wishlist-button";
import { shortDescription } from "@/lib/mock/best-sellers";
import { ageTierBySlug } from "@/lib/mock/age-tiers";
import { formatTk } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

function Stars({ rating, count }: { rating: number; count: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating.toFixed(1)}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              i < rounded ? "fill-mustard text-mustard" : "fill-cream-300 text-cream-300",
            )}
          />
        ))}
      </div>
      <span className="text-xs text-ink-soft">({count})</span>
    </div>
  );
}

/**
 * Premium Best Seller card: hover image-zoom (two-image swap), wishlist, a
 * "Best Seller" badge, name, short description, age recommendation, rating,
 * price, Add to Cart, and a Quick View trigger. Hover lift via CSS.
 */
export function BestSellerCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView: (product: Product) => void;
}) {
  const href = `/products/${product.slug}`;
  const ageTier = ageTierBySlug(product.ageTierSlug);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-200 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* image */}
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <Link href={href} className="absolute inset-0 block">
          <ProductImage
            slug={product.slug}
            imageNum={1}
            label={product.imageLabelBn}
            fallbackTone={product.imageTones[0]}
            className="absolute inset-0 size-full p-3 transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-0"
          />
          <ProductImage
            slug={product.slug}
            imageNum={2}
            label={product.imageLabelBn}
            fallbackTone={product.imageTones[1]}
            className="absolute inset-0 size-full p-3 opacity-0 transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-100"
          />
        </Link>

        <span className="absolute left-3 top-3 rounded-full bg-neem px-2.5 py-1 text-[11px] font-bold text-paper shadow-sm">
          Best Seller
        </span>
        <WishlistButton
          slug={product.slug}
          className="absolute right-2.5 top-2.5 border border-cream-200 bg-paper/90"
        />

        {/* quick view — slides up on hover */}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-1.5 rounded-full bg-paper/95 py-2 text-sm font-semibold text-ink opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-paper group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye className="size-4" />
          Quick View
        </button>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-4">
        {ageTier ? (
          <span className="text-xs font-medium uppercase tracking-wide text-neem-deep">
            {ageTier.labelBn}
          </span>
        ) : null}
        <Link
          href={href}
          className="mt-1 line-clamp-1 font-display text-base font-bold text-ink transition-colors hover:text-neem-deep"
        >
          {product.titleBn}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {shortDescription(product.slug)}
        </p>

        <div className="mt-2">
          <Stars rating={product.rating} count={product.reviewCount} />
        </div>

        {/* Price + Add to Cart. On narrow cards they stack (full-width button)
            so the label never overflows; side-by-side once there's room. */}
        <div className="mt-auto flex flex-col gap-2.5 pt-4 min-[440px]:flex-row min-[440px]:items-center min-[440px]:justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-bold text-ink">
              {formatTk(product.price)}
            </span>
            {product.compareAtPrice ? (
              <span className="text-xs text-ink-soft line-through">
                {formatTk(product.compareAtPrice)}
              </span>
            ) : null}
          </div>
          <AddToCartButton
            slug={product.slug}
            title={product.titleBn}
            className="h-9 w-full min-w-0 px-2 text-xs min-[440px]:w-auto min-[440px]:px-3"
          />
        </div>
      </div>
    </div>
  );
}
