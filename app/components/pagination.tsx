"use client"

import Link from 'next/link'
import { Button, Row } from "@vaneui/ui"
import { ChevronLeft, ChevronRight } from 'react-feather'

interface PaginationProps {
  basePath: string
  currentPage: number
  totalPages: number
}

export default function Pagination({basePath, currentPage, totalPages}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({length: totalPages}, (_, i) => i + 1)
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <Row sm itemsCenter justifyCenter flexWrap wFull>
      {hasPrev
        ? <Button sm tag={Link} href={`${basePath}/${currentPage - 1}`} aria-label="Previous page"><ChevronLeft/></Button>
        : <Button sm disabled aria-label="Previous page"><ChevronLeft/></Button>}
      {pages.map((p) => (
        p === currentPage
          ? <Button key={p} sm filled aria-current="page">{p}</Button>
          : <Button key={p} sm tag={Link} href={`${basePath}/${p}`}>{p}</Button>
      ))}
      {hasNext
        ? <Button sm tag={Link} href={`${basePath}/${currentPage + 1}`} aria-label="Next page"><ChevronRight/></Button>
        : <Button sm disabled aria-label="Next page"><ChevronRight/></Button>}
    </Row>
  )
}
