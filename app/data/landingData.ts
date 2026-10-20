import { fetchBlogposts, fetchDogs } from "@/app/data/fetchData"
import { getImageSrc } from "@/app/utils/images"
import type { DogMetadata } from "@/app/data/dogMetadata"

// Only the fields the homepage renders (and DogWall filters on), so client props stay small.
export type LandingDog = Pick<DogMetadata, "name" | "gender" | "ageText" | "age" | "size"> & { href: string; img: string }

const toLanding = (d: DogMetadata): LandingDog => ({
  name: d.name,
  gender: d.gender,
  ageText: d.ageText,
  age: d.age,
  size: d.size,
  href: `/dogs/${d.location}/${d.filename.replace(".md", "")}`,
  img: getImageSrc(d.images[0]),
})

const byNewest = (a: DogMetadata, b: DogMetadata) => new Date(b.added).getTime() - new Date(a.added).getTime()

export async function getLandingData() {
  const [dogs, posts] = await Promise.all([fetchDogs(), fetchBlogposts()])
  const availableDogs = dogs.filter(d => d.status === "Available" || d.status === "In foster care")
  const available = availableDogs.map(toLanding)
  const newest = [...availableDogs].sort(byNewest).map(toLanding)
  const adopted = dogs.filter(d => d.status === "Adopted").map(toLanding)
  return {
    // Hero wall: newest arrivals first, topped up with dogs that already went home.
    heroWall: [...newest, ...adopted].slice(0, 32),
    available,
    // The "went home" wall shows 20; the adoption steps reuse a few of the same photos.
    adopted: adopted.slice(0, 20),
    posts: posts.slice(0, 3).map(p => ({
      href: `/blog/${p.filename.replace(".md", "")}`,
      img: getImageSrc(p.imageSrc),
      title: p.title,
      description: p.description,
    })),
  }
}

export type LandingData = Awaited<ReturnType<typeof getLandingData>>
