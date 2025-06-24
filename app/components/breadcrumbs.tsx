import { Row } from "@vaneui/ui"
import { Text } from "@vaneui/ui"
import Link from 'next/link'
import React from 'react'

interface BreadcrumbsProps {
  breadcrumbs: { href: string, text: string }[]
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <Row md itemsCenter className="w-full">
      {breadcrumbs.map(({ href, text }, idx) => (
        <React.Fragment key={idx}>
          <Text lg tag={Link} href={href}>{text}</Text>
          {idx < breadcrumbs.length - 1 &&
            <Text lg secondary tag={"span"}>/</Text>
          }
        </React.Fragment>
      ))}
    </Row>
  )
}
