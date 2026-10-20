import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Noto_Sans_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";
import { baseOpenGraph, social_img_url } from "@/app/data/consts";
import React from "react";
import ThemeWrapper from "@/app/(frontend)/themeWrapper";
import { Col } from "@vaneui/ui";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import CTACard from "@/app/components/callToActionCard";
import StructuredData from "@/app/components/structuredData";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Only code-style text uses it, so it should not compete with the hero fonts for preload.
const mono = Noto_Sans_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  preload: false,
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://careproject.cy"),
  alternates: {
    canonical: './',
  },
  description: "CARE Project rescues, fosters and rehomes stray dogs from Limassol shelters in Cyprus, with adoption in Cyprus, the UK, Germany and the Netherlands.",
  openGraph: {
    ...baseOpenGraph,
    url: './',
    images: [
      {
        url: social_img_url,
        width: 1200,
        height: 630,
        alt: "Rescued dogs of CARE Project: From the streets of Cyprus to your sofa"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    images: [social_img_url]
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#101a14" },
  ],
};

export default function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
    <body className={`${mono.variable} ${sans.variable} ${serif.variable} antialiased font-sans`}>
    <StructuredData/>
    <ThemeWrapper>
      <Col className="min-h-screen" noGap>
        <Header/>
        <Col tag={'main'} noGap className="flex-1">
          {children}
        </Col>
        <CTACard/>
        <Footer/>
      </Col>
    </ThemeWrapper>
    <Script src="https://analytics.ahrefs.com/analytics.js" data-key="j+/2DiRHjgrgVvAfvvGKDw" strategy="afterInteractive"/>
    <Analytics/>
    <SpeedInsights/>
    </body>
    </html>
  );
}
