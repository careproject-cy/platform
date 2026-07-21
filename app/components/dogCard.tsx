import { Col, Img, Row } from "@vaneui/ui"
import { Text, Title } from "@vaneui/ui"
import Image from 'next/image'
import Link from 'next/link'
import { getImageSrc } from "../utils/images"
import { DogMetadata } from "../data/dogMetadata"
import { Chip } from "@vaneui/ui"
import { getStringFromYears } from "../utils/dateUtils"

export default function DogCard(dog: DogMetadata & { adoptedView?: boolean }) {
  const status = dog.status
  const name = dog.name
  const breed = dog.breed
  const age = dog.age
  const gender = dog.gender
  const adoptedView = dog.adoptedView ?? false
  const isAdopted = status === 'Adopted'
  // 'Not available' is always hidden. Adopted dogs are hidden everywhere
  // EXCEPT when a caller explicitly opts in via adoptedView (the /adopted grid).
  const hidden = status === 'Not available' || (isAdopted && !adoptedView)
  const showStatus = status !== 'Available'
  return (
    hidden ? null :
      <Link href={`/dogs/${dog.location}/${dog.filename.replace(".md", "")}`} className="w-full">
        <Col xl>
          <Col lg relative className="hover:scale-102 transition-all duration-200">
            <Img relative shadow objectCover hAuto wFull
              tag={Image}
              loading='lazy'
              src={getImageSrc(dog.images[0])}
              alt={name}
              width={300}
              height={300}
              sizes="(max-width: 768px) 100vw, 300px"
              className="aspect-square"
            />
            {showStatus &&
              <Chip sm semibold absolute sans className="right-2 bottom-2 opacity-75">{status}</Chip>
            }
          </Col>
          <Col xs>
            <Row itemsCenter justifyBetween>
              <Title>{name}</Title>
              <Chip semibold sm>{gender}</Chip>
            </Row>
            <Text secondary italic>{breed}</Text>
            <Text secondary sm>{getStringFromYears(age)}</Text>
          </Col>
        </Col>
      </Link>
  )
}
