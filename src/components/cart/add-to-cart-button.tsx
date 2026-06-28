"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { cn } from "@/lib/utils";

const popupParticles = [
  { id: 0, x: -96, y: -112, delay: 0.02, scale: 1.1 },
  { id: 1, x: -62, y: -146, delay: 0.14, scale: 0.9 },
  { id: 2, x: -22, y: -94, delay: 0.05, scale: 1.3 },
  { id: 3, x: 28, y: -132, delay: 0.2, scale: 1 },
  { id: 4, x: 74, y: -106, delay: 0.09, scale: 1.25 },
  { id: 5, x: 108, y: -72, delay: 0.17, scale: 0.85 },
  { id: 6, x: -112, y: -58, delay: 0.24, scale: 0.95 },
  { id: 7, x: 46, y: -168, delay: 0.12, scale: 1.15 },
] as const;

function CartAddedPopup({
  title,
  onClose,
}: {
  title?: string;
  onClose: () => void;
}) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/55 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-4 flex max-w-md flex-col items-center gap-8 rounded-[1.75rem] border border-slate-200 bg-paper px-8 py-10 text-center shadow-[0_30px_80px_-30px_rgba(15,23,42,0.22)]"
        >
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-neem/10 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.18)]">
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-neem/15 to-slate-200/30"
            />
            <motion.div
              className="relative flex h-16 w-16 items-center justify-center rounded-full bg-neem text-paper shadow-[0_12px_40px_-18px_rgba(15,23,42,0.25)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Check className="size-7" />
            </motion.div>
          </div>

          {popupParticles.map((particle) => (
            <motion.span
              key={particle.id}
              initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: [0, particle.x],
                y: [0, particle.y],
                scale: [0.8, particle.scale],
              }}
              transition={{
                duration: 1.6,
                delay: particle.delay,
                ease: "easeOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-neem shadow-[0_0_18px_rgba(110,231,183,0.5)]"
            />
          ))}

          <div className="space-y-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Added to Cart
            </p>
            <h2 className="text-3xl font-semibold text-slate-950">
              Added to Cart!
            </h2>
            <p className="mx-auto max-w-xs text-sm leading-7 text-slate-600">
              {title ? `${title} has been added to your cart.` : "The item has been added to your cart."}
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2">
            <Link href="/cart" onClick={onClose} className="inline-flex">
              <Button className="w-full bg-neem text-paper hover:bg-neem-deep focus-visible:ring-neem/40">
                View Cart
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-300"
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

/**
 * Adds a product to the cart from a product card. State is derived from cart
 * membership: once the product is in the cart the button locks to "Added" so it
 * can't add duplicates or bump the quantity — quantity is only changed from the
 * cart page's stepper. Tiny client island so ProductCard stays a server
 * component.
 */
export function AddToCartButton({
  slug,
  title,
  className,
}: {
  slug: string;
  title?: string;
  className?: string;
}) {
  const { items, addItem } = useCart();
  const inCart = items.some((it) => it.product.slug === slug);
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!showPopup) return;
    const timeout = window.setTimeout(() => setShowPopup(false), 2600);
    return () => window.clearTimeout(timeout);
  }, [showPopup]);

  const onAdd = () => {
    addItem(slug);
    setShowPopup(true);
  };

  const handleClose = () => setShowPopup(false);

  return (
    <>
      <Button
        size="sm"
        onClick={onAdd}
        disabled={inCart}
        aria-label={inCart ? "Added to cart" : "Add to cart"}
        className={cn(
          "h-9 min-w-[118px] justify-center gap-2 px-3 text-[0.8rem] font-semibold",
          inCart && "bg-neem-deep disabled:opacity-100",
          className,
        )}
      >
        <motion.div
          layout
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="inline-flex items-center justify-center gap-2"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={inCart ? "added" : "add"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="inline-flex items-center gap-2"
            >
              {inCart ? (
                <Check className="size-4" />
              ) : (
                <ShoppingCart className="size-4" />
              )}
              <span>{inCart ? "Added ✓" : "Add to Cart"}</span>
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </Button>

      {mounted && showPopup ? (
        <CartAddedPopup title={title} onClose={handleClose} />
      ) : null}
    </>
  );
}
