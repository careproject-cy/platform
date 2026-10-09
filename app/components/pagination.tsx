import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'react-feather'

interface PaginationProps {
  basePath: string
  currentPage: number
  totalPages: number
}

const item = "size-11 grid place-items-center rounded-full border text-sm transition-colors"

export default function Pagination({basePath, currentPage, totalPages}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({length: totalPages}, (_, i) => i + 1)
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages
  const idle = `${item} border-[var(--line)] hover:border-[var(--ink)]`

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
      {hasPrev
        ? <Link href={`${basePath}/${currentPage - 1}`} aria-label="Previous page" className={idle}><ChevronLeft className="size-4"/></Link>
        : <span aria-hidden="true" className={`${item} border-[var(--line)] opacity-40`}><ChevronLeft className="size-4"/></span>}
      {pages.map((p) => (
        p === currentPage
          ? <span key={p} aria-current="page" className={`${item} border-[var(--ink)] bg-[var(--ink)] text-white`}>{p}</span>
          : <Link key={p} href={`${basePath}/${p}`} className={idle}>{p}</Link>
      ))}
      {hasNext
        ? <Link href={`${basePath}/${currentPage + 1}`} aria-label="Next page" className={idle}><ChevronRight className="size-4"/></Link>
        : <span aria-hidden="true" className={`${item} border-[var(--line)] opacity-40`}><ChevronRight className="size-4"/></span>}
    </nav>
  )
}
