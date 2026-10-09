import { Metadata } from "next"
import { platform_name } from "@/app/data/consts"
import { getLandingData } from "@/app/data/landingData"
import HomeView from "@/app/components/views/homeView"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Dog Adoption & Rescue in Cyprus | ${platform_name}`,
    description:
      "CARE Project rescues, fosters, and rehomes stray dogs across Cyprus. Meet adoptable dogs, read rescue stories, and help us support animal welfare.",
  };
}

export default async function HomePage() {
  return <HomeView data={await getLandingData()}/>
}
