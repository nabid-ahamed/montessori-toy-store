import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
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
import { HomeResetProvider, HomeResetBoundary } from "@/components/layout/home-reset";
import { Preloader } from "@/components/Preloader";
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
      suppressHydrationWarning
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col overflow-x-clip bg-paper pb-[calc(3.5rem+env(safe-area-inset-bottom))] font-sans text-foreground md:pb-0"
      >
        <Preloader />
        <SiteBackground />
        <CartProvider>
          <CheckoutProvider>
            <WishlistProvider>
              <HomeResetProvider>
                <Header />
                <div className="flex flex-1 flex-col">
                  <HomeResetBoundary>{children}</HomeResetBoundary>
                </div>
                <FooterGate>
                  <Footer />
                </FooterGate>
                <MobileBottomBar />
                <WhatsAppButton />
                <DeferredIslands />
                <Toaster />
              </HomeResetProvider>
            </WishlistProvider>
          </CheckoutProvider>
        </CartProvider>
      </body>
    </html>
  );
}
