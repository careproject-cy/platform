import Image from "next/image"
import Link from "next/link"
import type { LandingDog } from "@/app/(frontend)/landing/_shared/data"

const ratios = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/5]", "aspect-[5/6]"]

// Masonry of dog photos in staggered columns; labels show on hover, always, or never.
export default function PhotoWall({ dogs, cols = 5, labels = "hover", suffix, priority = false }: {
  dogs: LandingDog[]
  cols?: 4 | 5
  labels?: "hover" | "always" | "none"
  suffix?: string
  priority?: boolean
}) {
  const columns = Array.from({ length: cols }, (_, c) => dogs.filter((_, i) => i % cols === c))
  const mobileCols = labels === "always" ? 2 : 3
  return (
    <div className={`grid ${mobileCols === 2 ? "grid-cols-2" : "grid-cols-3"} ${cols === 5 ? "md:grid-cols-5" : "md:grid-cols-4"} gap-3`}>
      {columns.map((col, c) => (
        <div key={c} className={`flex flex-col gap-3 ${c % 2 ? "-mt-16" : "-mt-4"} ${c >= mobileCols ? "max-md:hidden" : ""}`}>
          {col.map((d, i) => (
            <Link key={d.href} href={d.href} className={`group relative ${ratios[(c + i) % ratios.length]} rounded-[22px] overflow-hidden bg-[var(--line)]`}>
              <Image src={d.img} alt={labels === "none" ? "" : d.name} fill sizes="(max-width: 768px) 33vw, 20vw" priority={priority && i === 0}
                     className="object-cover group-hover:scale-[1.04] transition-transform duration-700"/>
              {labels === "always" && (
                <>
                  <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"/>
                  <span className="absolute left-3 right-3 bottom-3 text-white">
                    <span className="block font-[family-name:var(--font-serif)] text-2xl leading-none">{d.name}</span>
                    <span className={`block text-xs text-white/80 mt-1 ${suffix ? "" : "capitalize"}`}>{suffix ?? `${d.gender} · ${d.ageText}`}</span>
                  </span>
                </>
              )}
              {labels === "hover" && (
                <span className="absolute left-3 bottom-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{d.name}</span>
              )}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}
