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
import PageTitle from "@/components/ui/pageTitle"

export default function Home() {

  const recentPosts = blogPosts.slice(1, 4)
  const latestPost = blogPosts[0]
  const dogsToShow = dogs.filter(d => d.status !== 'Adopted' && d.status !== 'Not available' && d.status !== 'Reserved').slice(0, 8);
  const carouselDogs = dogs.filter(d => d.status !== 'Adopted' && d.status !== 'Not available' && d.status !== 'Reserved').map(dog => dog.images[0]).slice(0, 5);

  return (
    <Layout>
      <Section className="py-12 gap-10 border-b bg-gray-50">
        <Container className="flex-row gap-12">
          <div className="w-full flex flex-col flex-1 items-center justify-center">
            <div className="w-full flex flex-col">
              <PageTitle>{slogan}</PageTitle>
              <div className="text-lg text-gray-600">{longDescription}</div>
            </div>
          </div>
          <Carousel className="flex-1" images={carouselDogs} />
        </Container>
      </Section>

      <Section>
        <Container className="gap-10 justify-center">
          <Badge>Meet the dogs</Badge>
          <h2 className="text-4xl font-semibold">Dogs Available For Adoption</h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
            {dogsToShow.map((dog) => (
              <DogCard key={dog.id} {...dog} />
            ))}
          </div>
          <Button tag={Link} href="/dogs">View All Dogs</Button>
        </Container>
      </Section>

      <Section>
        <Container className="gap-10 justify-center">
          <h2 className="text-4xl font-semibold">Latest Blog Posts</h2>
          <Container className="p-0 gap-6">
            <BlogCard large post={latestPost} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogCard large={false} key={post.id} post={post} />
              ))}
            </div>
          </Container>
          <Button className="mt-6" tag={Link} href="/blog">View All Posts</Button>
        </Container>
      </Section>

    </Layout>
  )
}

