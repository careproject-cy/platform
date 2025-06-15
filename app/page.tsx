import Layout from './components/layout'
import DogCard from './components/dogCard'
import Link from 'next/link'
import Carousel from "./components/carousel"
import { longDescription, platform_name, slogan } from "./data/consts"
import { BlogCard } from "./components/blog/blogCard"
import { Button, Col, Container, Grid3, Grid4, Row, Section, Badge, PageTitle, SectionTitle, Text } from "@vaneui/ui"
import { fetchBlogposts, fetchDogs } from "./data/fetchData"
import { getImageSrc } from "./utils/images"
import { LargeBlogCard } from "./components/blog/largeBlogCard"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${"Home Page"} | ${platform_name}`,
  };
}

export default async function Home() {

  const blogPosts = await fetchBlogposts();
  const recentPosts = blogPosts.slice(1, 4)
  const latestPost = blogPosts[0]
  const dogs = await fetchDogs();
  const dogsToShow = dogs.filter(d => d.status !== 'Adopted' && d.status !== 'Not available' && d.status !== 'Reserved').slice(0, 8);
  const carouselDogs = dogs.filter(d => d.status !== 'Adopted' && d.status !== 'Not available' && d.status !== 'Reserved')
    .map(dog => getImageSrc(dog.images[0]))
    .slice(0, 5);

  return (
    <Layout>
      <Section className="border-b bg-gray-50">
        <Container xl className="py-12 max-lg:py-10 max-md:py-8">
          <Row xl lgCol>
            <Col xl>
              <PageTitle>{slogan}</PageTitle>
              <Text secondary lg>{longDescription}</Text>
              <Row lg smCol>
                <Button lg tag={Link} href="/more/donate" className="max-sm:w-full bg-gradient-to-br from-orange-400 to-red-600 border-orange-400 text-white hover:opacity-90 hover:scale-105">Support Us</Button>
                <Button lg tag={Link} href="/more/about" className="max-sm:w-full bg-white hover:opacity-90 hover:scale-105">Learn More</Button>
              </Row>
            </Col>
            <Carousel images={carouselDogs} className="max-md:hidden"/>
          </Row>
        </Container>
      </Section>

      <Section>
        <Container xl itemsCenter>
          <Col lg itemsCenter>
            <Badge>Meet the dogs</Badge>
            <SectionTitle>Dogs Available For Adoption</SectionTitle>
          </Col>
          <Grid4>
            {dogsToShow.map((dog) => (
              <DogCard key={dog.filename} {...dog} />
            ))}
          </Grid4>
          <Button tag={Link} href="/dogs">View All Dogs</Button>
        </Container>
      </Section>

      <Section>
        <Container xl itemsCenter>
          <SectionTitle>Latest Blog Posts</SectionTitle>
          <Col lg>
            <LargeBlogCard post={latestPost} />
            <Grid3>
              {recentPosts.map((post) => (
                <BlogCard key={post.filename} post={post} />
              ))}
            </Grid3>
          </Col>
          <Button tag={Link} href="/blog">View All Posts</Button>
        </Container>
      </Section>

    </Layout>
  )
}

