"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { cn } from "@/lib/utils";

function CartAddedPopup({
  title,
  onClose,
}: {
  title?: string;
  onClose: () => void;
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => ({
        id: index,
        x: Math.random() * 220 - 110,
        y: Math.random() * -140 - 20,
        delay: Math.random() * 0.25,
        scale: 0.8 + Math.random() * 0.6,
      })),
    [],
  );

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-4 flex max-w-md flex-col items-center gap-6 rounded-[2rem] border border-white/10 bg-[#0F1420]/95 px-8 py-10 text-center shadow-[0_32px_120px_-24px_rgba(0,0,0,0.65)]"
        >
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-slate-900/80 shadow-[0_0_0_8px_rgba(30,41,59,0.2)] ring-1 ring-white/10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-neem to-slate-800 opacity-20 blur-2xl"
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-white/10"
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.15, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1, 0.95], opacity: [0, 1, 0.85] }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-neem text-paper shadow-[0_16px_80px_-36px_rgba(94,215,126,0.8)]"
            >
              <Check className="size-10" />
            </motion.div>

            {particles.map((particle) => (
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
          </div>

          <div className="space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-neem-soft/70">
              Added to Cart!
            </p>
            <h2 className="text-3xl font-semibold text-paper">
              Added to Cart!
            </h2>
            <p className="max-w-xs text-sm leading-6 text-slate-200/80">
              The item has been added to your cart.
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2">
            <Link href="/cart" onClick={onClose} className="inline-flex">
              <Button className="w-full">View Cart</Button>
            </Link>
            <Button
              variant="outline"
              className="w-full"
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
        className={cn(inCart && "bg-neem-deep disabled:opacity-100", className)}
      >
        {inCart ? (
          <Check className="size-4" />
        ) : (
          <ShoppingCart className="size-4" />
        )}
        <span className="sr-only sm:not-sr-only">{inCart ? "Added" : "Add"}</span>
      </Button>

      {mounted && showPopup ? (
        <CartAddedPopup title={title} onClose={handleClose} />
      ) : null}
    </>
  );
}
