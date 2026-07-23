import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

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

const pinyonScript = Pinyon_Script({
  variable: "--font-script-luxury",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://villa-v.vercel.app"),
  title: "Villa Sérénité | A Cinematic Real Estate Masterpiece",
  description: "Witness the construction journey of Villa Sérénité—a custom, state-of-the-art luxury residence engineered with uncompromising precision and premium materials.",
  keywords: ["Luxury Real Estate", "Luxury Villa", "Villa Sérénité", "Architecture", "Infinity Pool", "Modern Home", "Cinematic Villa"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Villa Sérénité | A Cinematic Real Estate Masterpiece",
    description: "Witness the construction journey of Villa Sérénité—a custom, state-of-the-art luxury residence engineered with uncompromising precision and premium materials.",
    url: "/",
    siteName: "Villa Sérénité",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Sérénité | A Cinematic Real Estate Masterpiece",
    description: "Witness the construction journey of Villa Sérénité—a custom, state-of-the-art luxury residence engineered with uncompromising precision and premium materials.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Rich Structured Data for SEO Crawler indexing (SingleFamilyResidence & FAQPage Schemas)
  const structuralSchema = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    "name": "Villa Sérénité",
    "description": "An architectural marvel overlooking the Adriatic Sea, crafted with marine-grade concrete, Schuco structural glazing, and KNX home automation.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Split",
      "addressRegion": "Dalmatia",
      "addressCountry": "HR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.7225",
      "longitude": "16.4428"
    },
    "numberOfRooms": 14,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": 850,
      "unitCode": "MTK"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Infinity Pool",
        "value": "Ozonated freshwater system with automated pH balance and climate control"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Smart Home Automation",
        "value": "KNX standard building control for climate, light presets, and safety integration"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Glazing Profile",
        "value": "Schuco triple-glazed structural facade panels"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the timeline for the completion of Villa Sérénité?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Foundation groundwork has finished. Concrete structure shell phase completes Q4 2026. Handover is scheduled for Q4 2027."
        }
      },
      {
        "@type": "Question",
        "name": "Can the interior floor plans be customized?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, early-stage buyers can work with our design architect to adjust non-structural partition layouts and material specifications."
        }
      },
      {
        "@type": "Question",
        "name": "How do I schedule a private site viewing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book a private consultation by submitting the registration form on our website. Our client representative will contact you within 24 hours."
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${inter.variable} ${pinyonScript.variable} h-full antialiased`}
    >
      <head>
        {/* Preload the first hero frame-sequence still for each device tier (canvas scrub, not a <video>) */}
        <link rel="preload" href="/frames/hero/desktop/frame_0001.webp" as="image" type="image/webp" media="(min-width: 768px)" />
        <link rel="preload" href="/frames/hero/mobile/frame_0001.webp" as="image" type="image/webp" media="(max-width: 767px)" />

        {/* Standard Favicons and Touch Icons mapping */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Inject JSON-LD Schema scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuralSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="bg-[#0B0B0C] text-[#E9E8E5] min-h-full flex flex-col overflow-x-hidden">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
