import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Col, Row, Section, Container, Grid3 } from "@vaneui/ui"
import { PageTitle, SectionTitle, Text, Title } from "@vaneui/ui"
import { Divider } from "@vaneui/ui"
import Gallery from "@/app/components/gallery"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { domain, platform_name } from "@/app/data/consts"
import DogCard from "@/app/components/dogCard"
import { getImageSrc } from "@/app/utils/images"
import { getDate, getStringFromYears } from "@/app/utils/dateUtils"
import { fetchDogs, fetchMd } from "@/app/data/fetchData"
import MdComponent from "@/app/components/md/mdComponent"
import Sharer from "@/app/components/sharerWrapper"
import { Chip } from "@vaneui/ui"

interface IdProps {
  params: Promise<{ location: string, file: string }>
}


export async function generateMetadata({params}: IdProps): Promise<Metadata> {
  const {location, file} = await params
  const dogs = await fetchDogs()
  const filename = `${file}.md`
  const dog = dogs.find(d => d.filename === filename && d.location === location)
  if (!dog) {
    return {
      title: `Not found | ${platform_name}`
    };
  }
  const imgUrl = getImageSrc(dog.images[0]);
  const url = `https://${domain}/dogs/${location}/${file}`
  
  return {
    title: `${dog.name} | ${dog.breed} | ${platform_name}`,
    openGraph: {
      url: url,
      images: [
        {
          url: imgUrl || "care-project-social.png",
          width: 800,
          height: 600,
          alt: `${dog.name} open graph image`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      images: [imgUrl || "care-project-social.png"]
    }
  }
}

export default async function DogPage({params}: IdProps) {
  const {location, file} = await params

  const dogs = await fetchDogs()
  const filename = `${file}.md`
  const dog = dogs.find(d => d.filename === filename && d.location === location)

  if (!dog) {
    notFound()
  }

  const {content} = await fetchMd(`data/dogs/${location}/${filename}`)

  const sizeText =
    dog.size === "small"
      ? "Small (< 10 kg) size"
      : dog.size === "medium"
        ? "Medium (10-25 kg) size"
        : "Large (> 25kg) size"
  const similarDogs = dogs.filter(d =>
    d.size === dog.size && d.filename !== dog.filename
    && d.status != "Adopted" && d.status != "Not available").slice(0, 9)

  const galleryImages = dog.images.map((image) => getImageSrc(image));

  const shareText = `Check out ${dog.name}!`
  const url = `https://${domain}/dogs/${location}/${file}`

  const status = dog.status
  const showStatus = status !== 'Available'

  return (
    <Section>
      <Container lg>
        <Row lg justifyBetween tabletCol wFull>
          <Breadcrumbs breadcrumbs={[{href: "/", text: "Home"}, {
            href: "/dogs",
            text: "Dogs"
          }, {href: `/dogs/${location}/${dog.filename.replace(".md", "")}`, text: dog.name}]}/>
          <Sharer shareText={shareText} url={url}/>
        </Row>
        <Row xl mobileCol itemsStart>
          <Gallery className="flex-1" images={galleryImages}
                   chipText={showStatus ? status : undefined}/>
          <Col lg className="flex-1">
            <Col sm>
              <PageTitle>{dog.name}</PageTitle>
              <Row itemsCenter justifyBetween>
                <Text semibold lg>{sizeText}</Text>
                <Chip semibold lg>{dog.gender}</Chip>
              </Row>
              <Row justifyBetween>
                <Text lg>{dog.breed}</Text>
                <Text lg>{getStringFromYears(dog.age)}</Text>
              </Row>
            </Col>
            <Divider/>
            <Col lg>
              <MdComponent md={content}/>
            </Col>
            <Divider/>
            <Col>
              <Title xs secondary>
                Added at {getDate(dog.added)}
              </Title>
              <Text sm secondary>
                Please note that the information about the dog is collected at the time the dog was added to the
                website meaning some of the data may not be accurate.
              </Text>
            </Col>
          </Col>
        </Row>
        {similarDogs.length !== 0 &&
          <Col xl itemsCenter wFull className="gap-10 pb-10">
            <Divider/>
            <SectionTitle>Similar dogs</SectionTitle>
            <Grid3 xl wFull>
              {similarDogs.map((dog) => (
                <DogCard key={dog.filename} {...dog} />
              ))}
            </Grid3>
          </Col>
        }
      </Container>
    </Section>
  )
}

