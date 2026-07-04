import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ProductImage } from "@/components/product/product-image";
import { Reveal } from "@/components/policy/reveal";
import { productBySlug, productDetailBySlug } from "@/lib/mock/products";

const FEATURED_SLUG = "traditional-push-wagon";

/**
 * Home-page featured-product spotlight — a split band (product image on one
 * side, copy + CTA on the other) whose CTA links straight to the product page.
 * All data is read from the catalogue so title, price and image stay in sync.
 * Renders nothing if the featured product ever goes missing.
 */
export function FeaturedProductHero() {
  const product = productBySlug(FEATURED_SLUG);
  if (!product) return null;

  const detail = productDetailBySlug(FEATURED_SLUG);
  const href = `/products/${product.slug}`;
  const highlights = (detail?.benefits ?? []).slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:max-w-[90rem] lg:px-8">
      <Reveal>
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-cream-200 bg-gradient-to-br from-cream-100 to-cream-50 p-6 shadow-sm sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
          {/* image (clickable) */}
          <Link
            href={href}
            aria-label={product.titleBn}
            className="group relative block aspect-square overflow-hidden rounded-2xl bg-cream-100"
          >
            {product.badge ? (
              <span className="absolute left-3 top-3 z-10 rounded-full bg-neem px-3 py-1 text-xs font-bold text-paper shadow-sm">
                {product.badge}
              </span>
            ) : null}
            <ProductImage
              slug={product.slug}
              imageNum={1}
              label={product.imageLabelBn}
              fallbackTone={product.imageTones[0]}
              className="size-full p-4 transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </Link>

          {/* copy */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neem-deep">
              New Arrival
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {product.titleBn}
            </h2>

            {detail?.description ? (
              <p className="mt-3 max-w-lg text-[15px] leading-7 text-ink-muted">
                {detail.description}
              </p>
            ) : null}

            {highlights.length ? (
              <ul className="mt-5 space-y-2">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2.5 text-sm font-medium text-ink"
                  >
                    <span className="flex size-5 flex-none items-center justify-center rounded-full bg-neem/10 text-neem-deep">
                      <Check className="size-3.5" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* CTA → product page */}
            <div className="mt-7">
              <Link
                href={href}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neem px-7 text-sm font-bold text-paper shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-neem-deep hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neem"
              >
                Discover the Push Wagon
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
