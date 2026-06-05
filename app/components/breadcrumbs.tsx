'use client'

import { Row } from "@vaneui/ui"
import { Text } from "@vaneui/ui"
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
    <Row md itemsCenter wFull>
      {breadcrumbs.map(({ href, text }, idx) => (
        <React.Fragment key={idx}>
          <Text lg tag={Link} href={href}>{text}</Text>
          {idx < breadcrumbs.length - 1 &&
            <Text lg secondary tag={"span"}>/</Text>
          }
        </React.Fragment>
      ))}
    </Row>
    </>
  )
}
