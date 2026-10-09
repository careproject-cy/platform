import { fetchBlogposts, fetchDogs } from "@/app/data/fetchData"
import { getImageSrc } from "@/app/utils/images"
import type { DogMetadata } from "@/app/data/dogMetadata"

export type LandingDog = DogMetadata & { href: string; img: string }

const toLanding = (d: DogMetadata): LandingDog => ({
  ...d,
  href: `/dogs/${d.location}/${d.filename.replace(".md", "")}`,
  img: getImageSrc(d.images[0]),
})

export async function getLandingData() {
  const [dogs, posts] = await Promise.all([fetchDogs(), fetchBlogposts()])
  const available = dogs.filter(d => d.status === "Available" || d.status === "In foster care").map(toLanding)
  const adopted = dogs.filter(d => d.status === "Adopted").map(toLanding)
  const reserved = dogs.filter(d => d.status === "Reserved").map(toLanding)
  const newest = [...available].sort((a, b) => new Date(b.added).getTime() - new Date(a.added).getTime())
  return {
    available,
    newest,
    adopted,
    reserved,
    posts: posts.map(p => ({ ...p, href: `/blog/${p.filename.replace(".md", "")}`, img: getImageSrc(p.imageSrc) })),
    counts: {
      available: available.length,
      adopted: adopted.length,
      small: available.filter(d => d.size === "small").length,
      medium: available.filter(d => d.size === "medium").length,
      large: available.filter(d => d.size === "large").length,
    },
  }
}

export type LandingData = Awaited<ReturnType<typeof getLandingData>>
