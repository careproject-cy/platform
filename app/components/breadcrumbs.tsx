import Link from 'next/link'
import React from 'react'
import { domain } from "@/app/data/consts"

interface BreadcrumbsProps {
  breadcrumbs: { href: string, text: string }[]
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map(({ href, text }, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: text,
      item: `https://${domain}${href}`,
    })),
  }
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
      {breadcrumbs.map(({ href, text }, idx) => (
        <React.Fragment key={idx}>
          {idx < breadcrumbs.length - 1
            ? <Link href={href} className="hover:text-[var(--ink)]">{text}</Link>
            : <span aria-current="page" className="text-[var(--ink)]">{text}</span>}
          {idx < breadcrumbs.length - 1 && <span aria-hidden="true">/</span>}
        </React.Fragment>
      ))}
    </nav>
    </>
  )
}
