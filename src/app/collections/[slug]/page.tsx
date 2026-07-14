import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AllProductsView } from "@/components/collection/all-products-view";
import { AgeCollectionView } from "@/components/collection/age-collection-view";
import { CategoryCollectionView } from "@/components/collection/category-collection-view";
import { StubPage } from "@/components/stub-page";
import { AgeHubView } from "@/components/collection/age-hub-view";
import { CategoryHubView } from "@/components/collection/category-hub-view";
import { NewArrivalsView } from "@/components/collection/new-arrivals-view";
import { BestSellersView } from "@/components/collection/best-sellers/best-sellers-view";
import { NeemWoodView } from "@/components/collection/neem-wood-view";
import { ageTierBySlug } from "@/lib/mock/age-tiers";
import { categoryBySlug } from "@/lib/mock/categories";
import { BRAND_NAME } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "all") {
    return {
      title: `All Products — ${BRAND_NAME}`,
      description: "Browse every handmade, non-toxic wooden toy in our store.",
    };
  }
  if (slug === "by-age") {
    return {
      title: `Shop by Age — ${BRAND_NAME}`,
      description:
        "Browse handmade, non-toxic wooden Montessori toys by your child's age and developmental stage.",
    };
  }
  if (slug === "by-category") {
    return {
      title: `Shop by Category — ${BRAND_NAME}`,
      description:
        "Browse handmade, non-toxic wooden Montessori toys by play type — teethers, stackers, blocks, ride-ons and more.",
    };
  }
  if (slug === "new-arrivals") {
    return {
      title: `New Arrivals — ${BRAND_NAME}`,
      description:
        "The latest handmade, non-toxic wooden Montessori toys — freshly added to the store.",
    };
  }
  if (slug === "best-sellers") {
    return {
      title: `Best Sellers — ${BRAND_NAME}`,
      description:
        "Our most-loved Montessori toys, chosen by thousands of families to inspire learning through play.",
    };
  }
  if (slug === "neem-wood") {
    return {
      title: `Neem Wood Collection — ${BRAND_NAME}`,
      description:
        "Toys carved from naturally durable, antibacterial neem wood — safe for little hands and gentle on the planet.",
    };
  }
  const tier = ageTierBySlug(slug);
  if (tier) {
    return {
      title: `${tier.labelBn} — ${BRAND_NAME}`,
      description: `Handmade, non-toxic wooden toys for ${tier.labelBn}. ${
        tier.taglineBn ?? ""
      }`.trim(),
    };
  }
  const category = categoryBySlug(slug);
  if (category) {
    return {
      title: `${category.nameBn} — ${BRAND_NAME}`,
      description: `Handmade, non-toxic ${category.nameBn} toys. ${
        category.taglineBn ?? ""
      }`.trim(),
    };
  }
  return { title: `Collection: ${slug} — ${BRAND_NAME}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // "Stacking & Sorting" + "Shape Sorters & Puzzles" merged into one category —
  // keep the old URLs working by redirecting to the unified collection.
  if (slug === "stacking" || slug === "puzzles") {
    redirect("/collections/stacking-sorting-puzzles");
  }

  if (slug === "all") {
    return <AllProductsView />;
  }

  if (slug === "by-age") {
    return <AgeHubView />;
  }

  if (slug === "by-category") {
    return <CategoryHubView />;
  }

  if (slug === "new-arrivals") {
    return <NewArrivalsView />;
  }

  if (slug === "best-sellers") {
    return <BestSellersView />;
  }

  if (slug === "neem-wood") {
    return <NeemWoodView />;
  }

  const tier = ageTierBySlug(slug);
  if (tier) {
    // key on the slug so navigating age→age (same component type) remounts the
    // grid and resets its filters, instead of carrying the previous tier's
    // filters/price-ceiling over. Filters still persist within a single tier.
    return <AgeCollectionView key={tier.slug} tier={tier} />;
  }

  const category = categoryBySlug(slug);
  if (category) {
    // key on the slug so navigating category→category (same component type)
    // remounts the grid and resets its filters. See note above.
    return <CategoryCollectionView key={category.slug} category={category} />;
  }

  return <StubPage title={`Collection: ${slug}`} />;
}
