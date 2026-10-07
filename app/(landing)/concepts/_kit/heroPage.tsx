import { getLandingData } from "@/app/(frontend)/landing/_shared/data"
import SiteHeader from "./siteHeader"
import SiteFooter from "./siteFooter"
import DonateBand from "./donateBand"
import BBody, { bTheme, serif } from "../b/body"

export type LandingData = Awaited<ReturnType<typeof getLandingData>>

// Concept B's page with a swappable hero, for comparing hero layouts side by side.
export default async function HeroPage({ Hero }: { Hero: (p: { data: LandingData }) => React.ReactNode }) {
  const data = await getLandingData()
  return (
    <div className={`cp ${serif.variable} min-h-screen`} style={bTheme}>
      <SiteHeader/>
      <main>
        <Hero data={data}/>
        <BBody data={data}/>
        <DonateBand title="Fund a dog's way home" dark/>
      </main>
      <SiteFooter/>
    </div>
  )
}
