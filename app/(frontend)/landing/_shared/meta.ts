import type { Metadata } from "next"

export const draftMeta = (name: string): Metadata => ({
  title: `Landing draft: ${name}`,
  robots: { index: false, follow: false },
})
