"use client";

import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { WishlistButton } from "@/components/product/wishlist-button";
import { PlaceholderImage } from "@/components/placeholder-image";
import { ageTierBySlug } from "@/lib/mock/age-tiers";
import { formatTk } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product, Tone } from "@/lib/types";

// Solid swatch backgrounds (static so Tailwind keeps them).
const swatchBg: Record<Tone, string> = {
  cream: "bg-cream-300",
  neem: "bg-neem",
  "neem-soft": "bg-neem-soft",
  wood: "bg-wood-deep",
  terracotta: "bg-terracotta",
  mustard: "bg-mustard",
  "dusty-blue": "bg-dusty-blue",
  blush: "bg-blush",
};

const cardHoverTransition: Transition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] };
const cardVariants = {
  rest: { y: 0, scale: 1, zIndex: 0 },
  hover: { y: -8, scale: 1.03, zIndex: 20 },
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
};

const actionVariants = {
  rest: { opacity: 0.96, y: 8 },
  hover: { opacity: 1, y: 0 },
};

const wishlistVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${rating.toFixed(1)}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rounded
              ? "fill-mustard text-mustard"
              : "fill-cream-300 text-cream-300",
          )}
        />
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const ageTier = ageTierBySlug(product.ageTierSlug);
  const href = `/products/${product.slug}`;

  return (
    <motion.div
      className="group/card isolate relative z-0 flex h-full flex-col overflow-visible rounded-xl border border-cream-300 bg-card transition-all duration-300"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      transition={cardHoverTransition}
      style={{ willChange: "transform" }}
    >
      {/* image (hover-swap) */}
      <Link href={href} className="relative block aspect-square overflow-hidden">
        <motion.div
          className="absolute inset-0"
          variants={imageVariants}
          initial="rest"
          whileHover="hover"
          transition={cardHoverTransition}
        >
          <PlaceholderImage
            tone={product.imageTones[0]}
            label={product.imageLabelBn}
            className="absolute inset-0 size-full transition-opacity duration-300 group-hover/card:opacity-0"
          />
          <PlaceholderImage
            tone={product.imageTones[1]}
            label={product.imageLabelBn}
            className="absolute inset-0 size-full opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          />
        </motion.div>

        {/* badge — top-left */}
        {product.badge ? (
          <Badge className="absolute left-2.5 top-2.5 bg-neem text-paper">
            {product.badge}
          </Badge>
        ) : null}
        {/* age pill — bottom-left (clear of the wishlist heart) */}
        {ageTier ? (
          <span className="absolute bottom-2.5 left-2.5 rounded-full bg-paper/90 px-2 py-0.5 text-[11px] font-medium text-ink-muted">
            {ageTier.labelBn}
          </span>
        ) : null}
      </Link>

      {/* wishlist heart — top-right, sibling of the link to keep markup valid */}
      <motion.div
        className="absolute right-2 top-2 z-10"
        variants={wishlistVariants}
        transition={cardHoverTransition}
      >
        <WishlistButton slug={product.slug} className="transition-transform duration-300" />
      </motion.div>

      {/* body */}
      <div className="flex flex-1 flex-col p-3">
        <Link
          href={href}
          className="line-clamp-2 font-medium text-ink transition-colors duration-300 hover:text-neem-deep"
        >
          {product.titleBn}
        </Link>

        <div className="mt-1.5 flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-xs text-ink-soft">({product.reviewCount})</span>
        </div>

        {/* gift-kit "what's inside" — only rendered for products that have it */}
        {product.kitContents?.length ? (
          <p className="mt-1.5 line-clamp-1 text-xs text-ink-soft">
            Includes: {product.kitContents.join(" · ")}
          </p>
        ) : null}

        {/* variant swatches */}
        {product.variants?.length ? (
          <div className="mt-2 flex items-center gap-1.5">
            {product.variants.map((v) => (
              <span
                key={v.name}
                title={v.name}
                className={cn(
                  "size-4 rounded-full border border-cream-300 transition-shadow duration-300",
                  swatchBg[v.tone],
                )}
              />
            ))}
          </div>
        ) : null}

        {/* price + cart */}
        <motion.div
          className="mt-auto flex items-end justify-between gap-2 pt-3"
          variants={actionVariants}
          transition={cardHoverTransition}
        >
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold text-ink">
              {formatTk(product.price)}
            </span>
            {product.compareAtPrice ? (
              <span className="text-xs text-ink-soft line-through">
                {formatTk(product.compareAtPrice)}
              </span>
            ) : null}
          </div>
          <motion.div
            variants={actionVariants}
            transition={cardHoverTransition}
            className="transition-all duration-300"
          >
            <AddToCartButton slug={product.slug} title={product.titleBn} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
