import { Col, Row } from "@/components/ui/layout"
import { SectionTitle } from "@/components/ui/typography"
import Image from 'next/image'
import Link from 'next/link'

interface DogCardProps {
  id: string
  name: string
  breed: string
  age: number
  gender: string
  status: string
  images: string[]
}

export default function DogCard({ id, name, breed, age, gender, status, images }: DogCardProps) {
  const notAvailable = status === 'Not available' || status === 'Adopted'
  const showStatus = status !== 'Available'
  return (
    notAvailable ? null :
      <Link href={`/dogs/${id}`} className="w-full">
        <Col className="w-full gap-4">
          <div className="w-full relative min-w-full rounded-xl overflow-hidden">
            <Image
              src={images[0]}
              alt={name}
              width={300}
              height={300}
              className="relative object-cover h-auto w-full"
            />
            {showStatus &&
              <div className="text-sm px-2 py-1 rounded-lg bg-gray-100/75 absolute right-2 top-2 text-gray-700/75 font-semibold">{status}</div>
            }
          </div>
          <Col className="gap-1">
            <Row className="w-full justify-between items-center gap-4">
              <SectionTitle className="text-2xl">{name}</SectionTitle>
              <div className="text-sm px-2 py-1 rounded-lg bg-gray-100 font-semibold text-gray-600">{gender}</div>
            </Row>
            <div className="text-sm">{breed}</div>
            <div className="text-sm">{age} years old</div>
          </Col>
        </Col>
      </Link>
  )
}

