import { Col, Row } from "@/components/ui/layout"
import { Text, TextTitle } from "@/components/ui/typography"
import Image from 'next/image'
import Link from 'next/link'
import { getImageSrc } from "../utils/images"
import { DogMetadata } from "../data/dogMetadata"
import { Chip } from "@/components/ui/chip"

export default function DogCard(dog: DogMetadata) {
  const dogImages = dog.images.map((image) => getImageSrc(image));
  const status = dog.status
  const name = dog.name
  const breed = dog.breed
  const age = dog.age
  const gender = dog.gender
  const notAvailable = status === 'Not available' || status === 'Adopted'
  const showStatus = status !== 'Available'
  return (
    notAvailable ? null :
      <Link href={`/dogs/${dog.location}/${dog.filename.replace(".md", "")}`} className="w-full">
        <Col>
          <Col relative className="hover:scale-105 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
            <Image
              src={dogImages[0]}
              alt={name}
              width={300}
              height={300}
              className="relative object-cover h-auto w-full aspect-square"
            />
            {showStatus &&
              <Chip semibold absolute sans secondary className="right-2 bottom-2 opacity-75">{status}</Chip>
            }
          </Col>
          <Col xs>
            <Row vCentered justifyBetween>
              <TextTitle>{name}</TextTitle>
              <Chip semibold sm sans>{gender}</Chip>
            </Row>
            <Text secondary italic>{breed}</Text>
            <Text secondary sm>{age} years old</Text>
          </Col>
        </Col>
      </Link>
  )
}
