import Image from 'next/image'
import Link from 'next/link'
import { getImageSrc } from "../utils/images"
import { DogMetadata } from "../data/dogMetadata"

export default function DogCard(dog: DogMetadata & { adoptedView?: boolean }) {
  const status = dog.status
  const adoptedView = dog.adoptedView ?? false
  const isAdopted = status === 'Adopted'
  // 'Not available' is always hidden. Adopted dogs are hidden everywhere
  // EXCEPT when a caller explicitly opts in via adoptedView (the /adopted grid).
  const hidden = status === 'Not available' || (isAdopted && !adoptedView)
  const showStatus = status !== 'Available' && !adoptedView
  if (hidden) return null

  return (
    <Link href={`/dogs/${dog.location}/${dog.filename.replace(".md", "")}`}
          className="group block w-full rounded-[22px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[var(--line)]">
        <Image src={getImageSrc(dog.images[0])} alt={dog.name} fill loading="lazy"
               sizes="(max-width: 768px) 50vw, 25vw"
               className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"/>
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"/>
        {showStatus && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-medium text-neutral-900">
            {status === 'In foster care' ? 'In foster' : status}
          </span>
        )}
        <span className="absolute left-4 right-4 bottom-4 text-white">
          <span className="block font-serif text-3xl leading-none">{dog.name}</span>
          <span className="block text-xs text-white/80 mt-1.5">
            {adoptedView ? 'went home' : <><span className="capitalize">{dog.gender}</span> · {dog.ageText}</>}
          </span>
        </span>
      </div>
      {!adoptedView && (
        <div className="mt-3 flex items-center justify-between gap-3 text-sm text-[var(--muted)]">
          <span className="truncate">{dog.breed}</span>
          <span className="shrink-0 rounded-full border border-[var(--line)] px-2.5 py-0.5 text-xs capitalize">{dog.size}</span>
        </div>
      )}
    </Link>
  )
}
