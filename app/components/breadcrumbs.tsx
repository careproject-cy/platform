import React from 'react'
import { Row, Text } from "@vaneui/ui"
import { domain } from "@/app/data/consts"
import { TextLink } from "@/app/components/site/links"

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
    <Row xs flexWrap tag="nav" aria-label="Breadcrumb">
      {breadcrumbs.map(({ href, text }, idx) => (
        <React.Fragment key={idx}>
          {idx < breadcrumbs.length - 1
            ? <TextLink sm secondary noUnderline href={href}>{text}</TextLink>
            : <Text sm tag="span" aria-current="page">{text}</Text>}
          {idx < breadcrumbs.length - 1 && <Text sm secondary tag="span" aria-hidden="true">/</Text>}
        </React.Fragment>
      ))}
    </Row>
    </>
  )
}
