'use client'

import NextLink from 'next/link'
import { IconButton, Row } from "@vaneui/ui"
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
    <Row sm flexWrap justifyCenter tag="nav" aria-label="Pagination">
      {hasPrev
        ? <IconButton md secondary tag={NextLink} href={`${basePath}/${currentPage - 1}`} aria-label="Previous page"><ChevronLeft/></IconButton>
        : <IconButton md secondary disabled aria-label="Previous page"><ChevronLeft/></IconButton>}
      {pages.map((p) => (
        p === currentPage
          ? <IconButton key={p} md filled aria-current="page" aria-label={`Page ${p}`}>{p}</IconButton>
          : <IconButton key={p} md secondary tag={NextLink} href={`${basePath}/${p}`} aria-label={`Page ${p}`}>{p}</IconButton>
      ))}
      {hasNext
        ? <IconButton md secondary tag={NextLink} href={`${basePath}/${currentPage + 1}`} aria-label="Next page"><ChevronRight/></IconButton>
        : <IconButton md secondary disabled aria-label="Next page"><ChevronRight/></IconButton>}
    </Row>
  )
}
