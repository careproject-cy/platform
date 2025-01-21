import Layout from './components/layout'
import DogCard from './components/dogCard'
import { dogs } from './data/dogs'
import { blogPosts } from './data/blog-posts'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Carousel from "./components/carousel"

export default function Home() {
  const recentPosts = blogPosts.slice(0, 3)

  return (
    <Layout>
      <section className="flex flex-row mb-12 w-full">
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Our Dogs for Adoption</h2>
        </div>
        <Carousel className="w-full max-w-md" images={dogs.filter(d => d.status !== 'Adopted' && d.status !== 'Not available' && d.status !== 'Reserved').map(dog => dog.images[0]).slice(0, 5)} />
      </section>

      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Pawsome Shelter</h1>

      <section className="mb-12 w-full">
        <h2 className="text-2xl font-semibold mb-4">Our Dogs for Adoption</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7">
          {dogs.map((dog) => (
            <DogCard key={dog.id} {...dog} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{new Date(post.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${post.id}`}>
                  <Button variant="outline">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/blog">
            <Button>View All Posts</Button>
          </Link>
        </div>
      </section>

      <section id="about" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p>Pawsome Shelter is dedicated to finding loving homes for dogs in need. We believe every dog deserves a chance at a happy life with a caring family.</p>
      </section>
    </Layout>
  )
}

