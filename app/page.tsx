import DogCard from './components/dogCard'
import Link from 'next/link'
import Carousel from "./components/carousel"
import { platform_name, subtitle } from "./data/consts"
import { BlogCard } from "./components/blog/blogCard"
import { Button, Col, Container, Grid3, Grid4, Row, Section, Badge, PageTitle, SectionTitle, Text } from "@vaneui/ui"
import { fetchBlogposts, fetchDogs } from "./data/fetchData"
import { getImageSrc } from "./utils/images"
import { LargeBlogCard } from "./components/blog/largeBlogCard"
import { Metadata } from "next"
import { ArrowRight, CheckCircle } from "react-feather";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Home Page | ${platform_name}`,
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
    <>
      <Section accent className="border-b mesh-grad">
        <Container xl className="py-12 max-lg:py-10 max-md:py-8">
          <Row xl lgCol className="max-lg:gap-20">
            <Col xl className="w-1/2 max-lg:w-full">
              <PageTitle>
                Every dog deserves a <span className="whitespace-nowrap"><span
                className="relative isolate inline-block no-underline text-accent
           before:content-[''] before:absolute before:left-0 before:top-2/3
           before:w-full before:h-[25%] before:bg-yellow-200 before:-z-[1]"
              >loving home</span>.</span> Help us give them a
                chance.
              </PageTitle>
              <Text lg>{subtitle}</Text>
              <Row lg smCol>
                <Button filled primary lg tag={Link} href="/more/donate"
                        className="max-sm:w-full">
                  <CheckCircle/> Support Us
                </Button>
                <Button lg tag={Link} href="/more/about"
                        className="max-sm:w-full">
                  Learn More <ArrowRight/>
                </Button>
              </Row>
            </Col>
            <Carousel images={carouselDogs} className="max-md:hidden w-1/2 max-lg:w-full max-w-[700px]"/>
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
          <Button lg tag={Link} href="/dogs">
            View All Dogs <ArrowRight/>
          </Button>
        </Container>
      </Section>

      <Section>
        <Container xl itemsCenter>
          <SectionTitle>Latest Blog Posts</SectionTitle>
          <Col lg>
            <LargeBlogCard post={latestPost}/>
            <Grid3>
              {recentPosts.map((post) => (
                <BlogCard key={post.filename} post={post}/>
              ))}
            </Grid3>
          </Col>
          <Button lg tag={Link} href="/blog">
            View All Posts <ArrowRight/>
          </Button>
        </Container>
      </Section>

    </>
  )
}

