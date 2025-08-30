import { platform_name } from "./data/consts"
import { fetchBlogposts, fetchDogs } from "./data/fetchData"
import { getImageSrc } from "./utils/images"
import { Metadata } from "next"
import HeroSection from "./components/sections/heroSection"
import HowWeHelpSection from "./components/sections/howWeHelpSection"
import AvailableDogsSection from "./components/sections/availableDogsSection"
import GallerySection from "./components/sections/gallerySection"
import BlogPostsSection from "./components/sections/blogPostsSection"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Home Page | ${platform_name}`,
  };
}

export default async function HomePage() {
  const blogPosts = await fetchBlogposts();
  const recentPosts = blogPosts.slice(1, 4)
  const latestPost = blogPosts[0]
  const dogs = await fetchDogs();
  const dogsToShow = dogs.filter(d => d.status !== 'Adopted' && d.status !== 'Not available' && d.status !== 'Reserved').slice(0, 8);
  const carouselDogs = dogs.filter(d => d.status !== 'Adopted' && d.status !== 'Not available' && d.status !== 'Reserved')
    .map(dog => getImageSrc(dog.images[0]))
    .slice(0, 5);
  const galleryImages = dogs.filter(d => d.status === 'Adopted')
    .map((dog) => ({
      src: getImageSrc(dog.images[0]),
      alt: `${dog.name} - Successfully adopted rescued dog`
    }));

  return (
    <>
      <HeroSection carouselImages={carouselDogs}/>
      <HowWeHelpSection/>
      <AvailableDogsSection dogs={dogsToShow}/>
      <GallerySection images={galleryImages}/>
      <BlogPostsSection latestPost={latestPost} recentPosts={recentPosts}/>
    </>
  )
}