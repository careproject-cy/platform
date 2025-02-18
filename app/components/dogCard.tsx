import { Col, Row } from "@/components/ui/layout"
import { SectionTitle, Text } from "@/components/ui/typography"
import Image from 'next/image'
import Link from 'next/link'
import { getImageSrc } from "../utils/images"
import { DogMetadata } from "../data/dogMetadata"

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
      <Link href={`/dogs/${dog.filename.replace(".md", "")}`} className="w-full">
        <Col sm>
          <Col className="relative">
            <Image
              src={dogImages[0]}
              alt={name}
              width={300}
              height={300}
              className="relative object-cover h-auto w-full aspect-square rounded-xl overflow-hidden"
            />
            {showStatus &&
              <div className="text-sm px-2 py-1 rounded-lg bg-gray-100/75 absolute right-2 top-2 text-gray-700/75 font-semibold">{status}</div>
            }
          </Col>
          <Col xs>
            <Row className="justify-between">
              <SectionTitle className="text-2xl">{name}</SectionTitle>
              <div className="text-sm px-2 py-1 rounded-lg bg-gray-100 font-semibold text-gray-600">{gender}</div>
            </Row>
            <Text sm>{breed}</Text>
            <Text sm>{age} years old</Text>
          </Col>
        </Col>
      </Link>
  )
}
