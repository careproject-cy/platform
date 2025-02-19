import { Row } from "@/components/ui/layout"
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
          <Link href={href} className="text-lg text-gray-700 hover:text-gray-900">
            {text}
          </Link>
          {idx < breadcrumbs.length - 1 && <span className="text-gray-500">/</span>}
        </React.Fragment>
      ))}
    </Row>
  )
}
