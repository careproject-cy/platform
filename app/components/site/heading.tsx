import Reveal from "./reveal"

export function SectionHeading({ title, children }: { title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em] max-w-[14ch] text-balance">{title}</h2>
      {children}
    </Reveal>
  )
}

// Top of an inner page: optional crumbs line, large serif title, optional intro.
export function PageHeader({ eyebrow, title, children }: { eyebrow?: React.ReactNode; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="pt-12 md:pt-16 pb-10 md:pb-14">
      {eyebrow && <div className="mb-6">{eyebrow}</div>}
      <Reveal>
        <h1 className="font-serif text-5xl md:text-[5.25rem] leading-[0.95] tracking-[-0.02em] max-w-[16ch] text-balance">{title}</h1>
      </Reveal>
      {children && (
        <Reveal delay={80}>
          <div className="mt-6 text-lg text-[var(--muted)] leading-relaxed max-w-2xl">{children}</div>
        </Reveal>
      )}
    </header>
  )
}
