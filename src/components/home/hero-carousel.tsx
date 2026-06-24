"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { heroSlides } from "@/lib/mock/hero";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);
  // autoplay: advance every 3s, keep going after manual interaction.
  // useState initializer creates the plugin once (stable, no ref access during render).
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setSelected(api.selectedScrollSnap());
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        plugins={[autoplay]}
      >
        <CarouselContent>
          {heroSlides.map((s, i) => (
            <CarouselItem key={s.id}>
              {/* image-only slide (no overlay text — the banners carry their
                  own copy). The container keeps the images' true 16:9 ratio at
                  every breakpoint, so the whole artwork is always visible with
                  no cropping or letterboxing. The image slowly zooms (Ken
                  Burns) via a GPU-only CSS transform; overflow-hidden clips the
                  zoom. */}
              <div className="relative block aspect-video w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="animate-kenburns object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden border-none bg-paper/80 sm:flex" />
        <CarouselNext className="right-4 hidden border-none bg-paper/80 sm:flex" />
      </Carousel>

      {/* Shop Now CTA — centred over the hero, gently fades + slides up on
          mount (Framer Motion). The overlay is click-through (pointer-events-
          none) so carousel swipe/arrows still work; only the pill is
          interactive. Points at the current slide's target. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-end pr-6 sm:pr-16 lg:pr-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="pointer-events-auto"
        >
          <Link
            href={heroSlides[selected]?.href ?? "/collections/all"}
            className="group inline-flex items-center gap-2 rounded-full bg-neem px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-paper shadow-md transition-all duration-300 ease-out hover:bg-neem-deep hover:shadow-lg sm:px-7 sm:text-sm"
          >
            Shop Now
            <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* dots — overlaid at the bottom of the banner */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === selected ? "w-6 bg-neem" : "w-2 bg-paper/70 hover:bg-paper",
            )}
          />
        ))}
      </div>
    </div>
  );
}
