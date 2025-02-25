import { Row } from "@/components/ui/layout"
import { Text } from "@/components/ui/typography"
import Link from 'next/link'
import React from 'react'

interface BreadcrumbsProps {
  breadcrumbs: { href: string, text: string }[]
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <Row md vCentered>
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
