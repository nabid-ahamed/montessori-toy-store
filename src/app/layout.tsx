import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, Hanken_Grotesk, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FooterGate } from "@/components/layout/footer-gate";
import { SiteBackground } from "@/components/layout/site-background";
import { MobileBottomBar } from "@/components/layout/mobile-bottom-bar";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { DeferredIslands } from "@/components/layout/deferred-islands";
import { CartProvider } from "@/lib/cart/cart-context";
import { CheckoutProvider } from "@/lib/checkout/checkout-context";
import { WishlistProvider } from "@/lib/wishlist/wishlist-context";
import { Toaster } from "@/components/ui/sonner";

// Display / headings
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Body
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Accent — used selectively (e.g. footer "Follow us"). It only appears below the
// fold, so skip preloading it: that frees Slow-4G bandwidth for the LCP hero
// image (Poppins still loads on demand and swaps in via `display: swap`).
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Address-modal typefaces (journal reference look). Only surface inside the
// modal, so skip preloading — they load on demand and swap in via display:swap.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Montessori Wooden Toys",
    template: "%s | Montessori Wooden Toys",
  },
  description:
    "Bangladesh-made, neem-wood, non-toxic, handmade children's toys for ages 0–3.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${poppins.variable} ${fraunces.variable} ${hanken.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col overflow-x-clip bg-paper pb-[calc(3.5rem+env(safe-area-inset-bottom))] font-sans text-foreground md:pb-0"
      >
        <SiteBackground />
        <CartProvider>
          <CheckoutProvider>
            <WishlistProvider>
              <Header />
              <div className="flex flex-1 flex-col">{children}</div>
              <FooterGate>
                <Footer />
              </FooterGate>
              <MobileBottomBar />
              <WhatsAppButton />
              <DeferredIslands />
              <Toaster />
            </WishlistProvider>
          </CheckoutProvider>
        </CartProvider>
      </body>
    </html>
  );
}
