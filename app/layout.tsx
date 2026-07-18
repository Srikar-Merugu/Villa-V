import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif-luxury",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans-luxury",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VILLA V | A Cinematic Real Estate Masterpiece",
  description: "Witness the construction journey of Villa V—a custom, state-of-the-art luxury residence engineered with uncompromising precision and premium materials.",
  keywords: ["Luxury Real Estate", "Luxury Villa", "Architecture", "Infinity Pool", "Modern Home", "Cinematic Villa"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-[#0A0A0A] text-[#F5F5F5] min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
