// Brand name. Use BRAND_NAME everywhere — never hardcode a name.
export const BRAND_NAME = "Toytuni";

// Canonical site origin, used for metadataBase, canonical URLs, sitemap, robots
// and absolute OG image URLs. The final domain isn't fixed yet, so it's an env
// override (set NEXT_PUBLIC_SITE_URL in the deployment) with the current Vercel
// preview as the default. No trailing slash.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://montessori-toy-store.vercel.app";

// One-line brand descriptor, reused in headers/meta/footer.
export const BRAND_TAGLINE = "Neem-wood, non-toxic, handmade toys for little ones";

// Short paragraph used in the footer brand block.
export const BRAND_DESCRIPTION =
  "Handmade, non-toxic neem-wood toys — thoughtfully crafted for little hands and big imaginations. Safe play, built to last and loved.";
