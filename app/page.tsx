import Layout from './components/layout'
import DogCard from './components/dogCard'
import { dogs } from './data/dogs'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Carousel from "./components/carousel"
import { longDescription, slogan } from "./data/consts"
import { Col, Container, Grid3, Grid4, Section } from "@/components/ui/layout"
import { BlogCard } from "./components/blog/blogCard"
import { Badge } from "@/components/ui/badge"
import { PageTitle, SectionTitle, Text } from "@/components/ui/typography"
import { fetchBlogposts } from "./data/fetchData"
import { getImageSrc } from "./utils/images"
import { LargeBlogCard } from "./components/blog/largeBlogCard"

export default async function Home() {

  const blogPosts = await fetchBlogposts();
  const recentPosts = blogPosts.slice(1, 4)
  const latestPost = blogPosts[0]
  const dogsToShow = dogs.filter(d => d.status !== 'Adopted' && d.status !== 'Not available' && d.status !== 'Reserved').slice(0, 8);
  const carouselDogs = dogs.filter(d => d.status !== 'Adopted' && d.status !== 'Not available' && d.status !== 'Reserved')
    .map(dog => getImageSrc(dog.images[0]))
    .slice(0, 5);

  return (
    <Layout>
      <Section className="py-12 gap-10 border-b bg-gray-50">
        <Container className="flex-row gap-12">
          <Col className="flex-1 gap-6">
            <PageTitle>{slogan}</PageTitle>
            <Text>{longDescription}</Text>
          </Col>
          <Carousel className="flex-1" images={carouselDogs} />
        </Container>
      </Section>

      <Section>
        <Container className="gap-10 justify-center">
          <Col className="gap-6 items-center">
            <Badge>Meet the dogs</Badge>
            <SectionTitle>Dogs Available For Adoption</SectionTitle>
          </Col>
          <Grid4>
            {dogsToShow.map((dog) => (
              <DogCard key={dog.id} {...dog} />
            ))}
          </Grid4>
          <Button tag={Link} href="/dogs">View All Dogs</Button>
        </Container>
      </Section>

      <Section>
        <Container className="gap-10 justify-center">
          <SectionTitle>Latest Blog Posts</SectionTitle>
          <Col className="gap-6">
            <LargeBlogCard post={latestPost} />
            <Grid3>
              {recentPosts.map((post) => (
                <BlogCard key={post.filename} post={post} />
              ))}
            </Grid3>
          </Col>
          <Button className="mt-6" tag={Link} href="/blog">View All Posts</Button>
        </Container>
      </Section>

    </Layout>
  )
}

