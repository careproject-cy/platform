import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import { slogan, social_img_url } from "./data/consts";
import React from "react";
import ThemeWrapper from "@/app/themeWrapper";
import { Col } from "@vaneui/ui";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import CTACard from "@/app/components/callToActionCard";

const sans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Noto_Sans_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://careproject.cy"),
  alternates: {
    canonical: './',
  },
  description: slogan,
  openGraph: {
    url: './',
    images: [
      {
        url: social_img_url,
        width: 800,
        height: 600,
        alt: `care-project-social`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    images: [social_img_url]
  },
};

export default function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
    <head>
      <script src="https://analytics.ahrefs.com/analytics.js" data-key="j+/2DiRHjgrgVvAfvvGKDw" async></script>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"}/>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet"/>
    </head>
    <body className={`${mono.variable} ${sans.variable} antialiased font-sans`}>
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
    <Analytics/>
    </body>
    </html>
  );
}
