import Layout from './components/layout'
import DogCard from './components/dogCard'
import { dogs } from './data/dogs'
import { blogPosts } from './data/blog-posts'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Carousel from "./components/carousel"
import { longDescription, slogan } from "./data/consts"
import Section from "@/components/ui/section"
import Container from "@/components/ui/container"
import { BlogCard } from "./components/blogCard"
import Badge from "@/components/ui/badge"

export default function Home() {

  const recentPosts = blogPosts.slice(1, 4)
  const latestPost = blogPosts[0]

  return (
    <Layout>
      <Section className="mb-12 py-12 gap-10 border-b bg-gray-50">
        <Container className="flex-row gap-12">
          <div className="w-full flex flex-col flex-1 items-center justify-center">
            <div className="w-full flex flex-col">
              <h1 className="text-5xl font-semibold mb-8">{slogan}</h1>
              <div className="text-lg text-gray-600">{longDescription}</div>
            </div>
          </div>
          <Carousel className="flex-1" images={dogs.filter(d => d.status !== 'Adopted' && d.status !== 'Not available' && d.status !== 'Reserved').map(dog => dog.images[0]).slice(0, 6)} />
        </Container>
      </Section>

      <Section className="mb-12">
        <Container className="gap-6">
          <div className="w-full flex justify-center">
            <Badge>Meet the dogs</Badge>
          </div>
          <h2 className="text-4xl font-semibold mb-4 w-full text-center">Dogs Available For Adoption</h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7">
            {dogs.map((dog) => (
              <DogCard key={dog.id} {...dog} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="mb-12">
        <Container className="gap-6">
          <h2 className="text-4xl font-semibold mb-4 w-full text-center">Latest Blog Posts</h2>
          <BlogCard large post={latestPost} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard large={false} key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/blog">
              <Button>View All Posts</Button>
            </Link>
          </div>
        </Container>
      </Section>

      <section id="about" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p>Pawsome Shelter is dedicated to finding loving homes for dogs in need. We believe every dog deserves a chance at a happy life with a caring family.</p>
      </section>
    </Layout>
  )
}

