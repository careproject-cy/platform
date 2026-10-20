import Image from 'next/image'
import { Badge, Chip, Col, Row, Text, Title } from "@vaneui/ui"
import { getImageSrc } from "../utils/images"
import { DogMetadata } from "../data/dogMetadata"
import { LinkCol } from "./site/links"

// Only what the card renders, so callers can pass slim objects to client lists.
export type DogCardData = Pick<DogMetadata, "filename" | "location" | "name" | "breed" | "ageText" | "gender" | "status" | "size">
  & { images: string[] }

// Default for Grid4: 2 columns below 768px, 3 below 1024px, then 4 inside a ~1200px container.
// Callers in another grid pass their own `sizes`.
const cardSizes = "(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 320px"

export default function DogCard(dog: DogCardData & { adoptedView?: boolean; sizes?: string }) {
  const status = dog.status
  const adoptedView = dog.adoptedView ?? false
  const isAdopted = status === 'Adopted'
  // 'Not available' is always hidden. Adopted dogs are hidden everywhere
  // EXCEPT when a caller explicitly opts in via adoptedView (the /adopted grid).
  const hidden = status === 'Not available' || (isAdopted && !adoptedView)
  const showStatus = status !== 'Available' && !adoptedView
  if (hidden) return null

  return (
    <LinkCol sm href={`/dogs/${dog.location}/${dog.filename.replace(".md", "")}`} className="group w-full">
      <Col relative overflowHidden className="aspect-[4/5] rounded-[22px] bg-(--line)">
        <Image src={getImageSrc(dog.images[0])} alt={isAdopted ? `${dog.name}, adopted rescue dog` : `${dog.name}, ${dog.breed} for adoption`}
               fill loading="lazy" sizes={dog.sizes ?? cardSizes}
               className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"/>
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"/>
        {showStatus && (
          <Badge sm absolute className="left-3 top-3 bg-white/90 backdrop-blur">
            {status === 'In foster care' ? 'In foster' : status}
          </Badge>
        )}
        <Col xs absolute data-theme="dark" className="left-4 right-4 bottom-4 bg-transparent">
          <Title lg tag="span" className="leading-none">{dog.name}</Title>
          <Text xs secondary>
            {adoptedView ? 'went home' : <><span className="capitalize">{dog.gender}</span> · {dog.ageText}</>}
          </Text>
        </Col>
      </Col>
      {!adoptedView && (
        <Row justifyBetween>
          <Text sm secondary truncate>{dog.breed}</Text>
          <Chip xs noShrink className="capitalize">{dog.size}</Chip>
        </Row>
      )}
    </LinkCol>
  )
}
