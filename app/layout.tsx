import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import { slogan, social_img_url } from "./data/consts";
import React from "react";
import ThemeWrapper from "@/app/themeWrapper";

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

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <script src="https://analytics.ahrefs.com/analytics.js" data-key="j+/2DiRHjgrgVvAfvvGKDw" async></script>
    </head>
      <body className={`${mono.variable} ${sans.variable} antialiased font-sans`}>
      <ThemeWrapper>
        {children}
      </ThemeWrapper>
      <Analytics/>
      </body>
    </html>
  );
}
