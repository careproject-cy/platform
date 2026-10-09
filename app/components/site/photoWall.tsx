import Image from "next/image"
import NextLink from "next/link"
import { Chip, Col, Grid3, Text, Title } from "@vaneui/ui"
import type { LandingDog } from "@/app/data/landingData"

const ratios = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/5]", "aspect-[5/6]"]

// Masonry of dog photos in staggered columns; labels show on hover, always, or never.
export default function PhotoWall({ dogs, cols = 5, labels = "hover", suffix, priority = false }: {
  dogs: LandingDog[]
  cols?: 4 | 5 | 8
  labels?: "hover" | "always" | "none"
  suffix?: string
  priority?: boolean
}) {
  const columns = Array.from({ length: cols }, (_, c) => dogs.filter((_, i) => i % cols === c))
  const mobileCols = labels === "always" ? 2 : 3
  // The 8-column wall adds columns as the screen widens so photos stay a sensible size.
  const gridCols = cols === 8 ? "md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 min-[120rem]:grid-cols-8" : cols === 5 ? "md:grid-cols-5" : "md:grid-cols-4"
  const baseCols = mobileCols === 2 ? "grid-cols-2 max-tablet:grid-cols-2 max-mobile:grid-cols-2" : "grid-cols-3 max-tablet:grid-cols-3 max-mobile:grid-cols-3"
  const hideFrom = (c: number) => cols !== 8 ? "" : c >= 7 ? "min-[120rem]:flex hidden" : c >= 6 ? "2xl:flex hidden" : c >= 5 ? "xl:flex hidden" : ""

  return (
    <Grid3 sm className={`${baseCols} ${gridCols}`}>
      {columns.map((col, c) => (
        <Col sm key={c} className={`${c % 2 ? "-mt-16" : "-mt-4"} ${c >= mobileCols ? "max-md:hidden" : ""} ${hideFrom(c)}`}>
          {col.map((d, i) => (
            <Col key={d.href} tag={NextLink} href={d.href} relative overflowHidden
                 className={`group ${ratios[(c + i) % ratios.length]} rounded-[22px] bg-[var(--line)]`}>
              <Image src={d.img} alt={labels === "none" ? "" : d.name} fill sizes="(max-width: 768px) 33vw, 20vw" priority={priority && i === 0}
                     className="object-cover group-hover:scale-[1.04] transition-transform duration-700"/>
              {labels === "always" && (
                <>
                  <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"/>
                  <Col xs absolute data-theme="dark" className="left-3 right-3 bottom-3 bg-transparent">
                    <Title tag="span" className="leading-none">{d.name}</Title>
                    <Text xs secondary>{suffix ?? <><span className="capitalize">{d.gender}</span> · {d.ageText}</>}</Text>
                  </Col>
                </>
              )}
              {labels === "hover" && (
                <Chip sm absolute className="left-3 bottom-3 bg-white/90 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">{d.name}</Chip>
              )}
            </Col>
          ))}
        </Col>
      ))}
    </Grid3>
  )
}
