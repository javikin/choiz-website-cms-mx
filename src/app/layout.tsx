import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/analytics";
import "./globals.css";

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// DM Sans para headlines (como en Figma)
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Inter como fuente base (similar a Instrument Sans)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Choiz - Tratamiento para la caída del cabello",
  description: "El tratamiento más efectivo de México para la caída del cabello. Resultados en 90-180 días, científicamente comprobado, 100% en línea con envío gratis.",
  keywords: ["tratamiento capilar", "caída del cabello", "alopecia", "minoxidil", "finasterida", "México"],
  authors: [{ name: "Choiz" }],
  openGraph: {
    title: "Choiz - Tratamiento para la caída del cabello",
    description: "El tratamiento más efectivo de México para la caída del cabello. Resultados en 90-180 días.",
    type: "website",
    locale: "es_MX",
    siteName: "Choiz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Choiz - Tratamiento para la caída del cabello",
    description: "El tratamiento más efectivo de México para la caída del cabello.",
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
  return (
    <html lang="es">
      <head>
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://assets.tina.io" />
        <link rel="dns-prefetch" href="https://assets.tina.io" />

        {/* Preload de imagen hero LCP - Mobile */}
        <link
          rel="preload"
          as="image"
          href="/images/bg-hero-mobile.webp"
          type="image/webp"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        {/* Preload de imagen hero LCP - Desktop */}
        <link
          rel="preload"
          as="image"
          href="/images/bg-hero-desk.webp"
          type="image/webp"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${dmSans.variable} ${inter.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
