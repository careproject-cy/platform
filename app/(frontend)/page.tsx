import { platform_name } from "@/app/data/consts"
import { fetchBlogposts, fetchDogs } from "@/app/data/fetchData"
import { getImageSrc } from "@/app/utils/images"
import { Metadata } from "next"
import HeroSection from "@/app/components/sections/heroSection"
import HowWeHelpSection from "@/app/components/sections/howWeHelpSection"
import AvailableDogsSection from "@/app/components/sections/availableDogsSection"
import GallerySection from "@/app/components/sections/gallerySection"
import BlogPostsSection from "@/app/components/sections/blogPostsSection"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Dog Adoption & Rescue in Cyprus | ${platform_name}`,
    description:
      "CARE Project rescues, fosters, and rehomes stray dogs across Cyprus. Meet adoptable dogs, read rescue stories, and help us support animal welfare.",
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
      {latestPost && <BlogPostsSection latestPost={latestPost} recentPosts={recentPosts}/>}
    </>
  )
}