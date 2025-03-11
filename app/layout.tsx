import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import { platform_name, slogan, social_img_url } from "./data/consts";

const sans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Noto_Sans_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: platform_name,
  description: slogan,
  openGraph: {
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
  }
};

export const runtime = 'edge' // 'nodejs' (default) | 'edge'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mono.variable} ${sans.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
