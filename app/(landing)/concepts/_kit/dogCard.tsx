import Image from "next/image"
import Link from "next/link"
import type { LandingDog } from "@/app/(frontend)/landing/_shared/data"

const statusLabel: Record<string, string> = { "In foster care": "In foster", Reserved: "Reserved", Adopted: "Adopted" }

export default function DogCard({ dog, ratio = "aspect-[4/5]" }: { dog: LandingDog; ratio?: string }) {
  const label = statusLabel[dog.status]
  return (
    <Link href={dog.href} className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
      <div className={`relative ${ratio} overflow-hidden rounded-2xl bg-[var(--line)]`}>
        <Image src={dog.img} alt={dog.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"/>
        {label && <span className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-medium text-neutral-900">{label}</span>}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <span className="font-semibold tracking-tight">{dog.name}</span>
        <span className="text-xs text-[var(--muted)] capitalize">{dog.size}</span>
      </div>
      <div className="text-sm text-[var(--muted)] capitalize">{dog.gender} · {dog.ageText}</div>
    </Link>
  )
}
