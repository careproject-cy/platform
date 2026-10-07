import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./concepts.css"

const sans = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  metadataBase: new URL("https://careproject.cy"),
  robots: { index: false, follow: false },
}

// Draft landing concepts own their header, footer and donate band, so they skip the site layout.
export default function ConceptsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
