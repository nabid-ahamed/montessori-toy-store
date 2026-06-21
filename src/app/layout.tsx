import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/config";

// Display / headings
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Latin body
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Bangla body — primary UI language
const notoBengali = Noto_Sans_Bengali({
  variable: "--font-bn",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
  description:
    "বাংলাদেশে তৈরি, নিম কাঠের, non-toxic, হাতে-বানানো শিশু-খেলনা — ০–৩ বছরের শিশুদের জন্য।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${bricolage.variable} ${inter.variable} ${notoBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
