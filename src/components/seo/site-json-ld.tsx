import { JsonLd } from "@/components/seo/json-ld";
import { BRAND_NAME, SITE_URL } from "@/lib/config";

/**
 * Site-wide structured data injected once in the root layout: an Organization
 * node (brand identity for the knowledge panel) and a WebSite node. Rendered on
 * every page — page-specific schema (Product, Article, BreadcrumbList) is added
 * by the individual routes/components on top of this.
 */
export function SiteJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-default.png`,
    description:
      "Bangladesh-made, neem-wood, non-toxic, handmade Montessori toys for children ages 0–3.",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: SITE_URL,
  };

  return <JsonLd data={[organization, website]} />;
}
