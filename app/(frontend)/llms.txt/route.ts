import { fetchBlogposts, fetchDogs } from '@/app/data/fetchData'
import { domain, locationLabels } from '@/app/data/consts'

export const dynamic = 'force-static'

const baseUrl = `https://${domain}`

export async function GET() {
  const [dogs, posts] = await Promise.all([fetchDogs(), fetchBlogposts()])
  const homeless = dogs.filter((dog) => dog.status !== 'Adopted' && dog.status !== 'Not available')
  const dogLines = homeless.map((dog) => {
    const where = locationLabels[dog.location] ?? 'a shelter in Cyprus'
    const status = dog.status === 'Available' ? '' : ` Currently ${dog.status.toLowerCase()}.`
    return `- [${dog.name}](${baseUrl}/dogs/${dog.location}/${dog.filename.replace('.md', '')}): ${dog.gender === 'female' ? 'Female' : 'Male'} ${dog.breed.replace(/^mixed breed$/i, 'mixed-breed')}, ${dog.ageText.replace(/^~/, 'about ')}, ${dog.size} size, at ${where}.${status}`
  })
  const postLines = posts
    .filter((post) => post.visible)
    .map((post) => `- [${post.title}](${baseUrl}/blog/${post.filename.replace('.md', '')}): ${post.description}`)

  const body = `# CARE Project

> CARE (Cyprus Animals Rescue Effort) Project is a UANA Foundation initiative that rescues, fosters, and rehomes stray dogs in Cyprus. Run by volunteers, it provides medical care and rehabilitation and promotes adoption across the island.

## Main pages
- [Adoptable dogs](${baseUrl}/dogs): Dogs currently available for adoption in Cyprus
- [Adopted dogs](${baseUrl}/adopted/1): Success stories of dogs who found their forever homes
- [Blog](${baseUrl}/blog): Rescue stories and practical pet-care guides
- [About](${baseUrl}/more/about): Who we are and what we do

## How to help
- [Adopt](${baseUrl}/more/adopt): How to adopt a rescued dog
- [Foster](${baseUrl}/more/foster): How to foster a dog
- [Donate](${baseUrl}/more/donate): Support our rescue work
- [Get involved](${baseUrl}/more/get-involved): Volunteer and other ways to help

## Dogs looking for a home
${dogLines.join('\n')}

## Stories and guides
${postLines.join('\n')}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
