import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'

interface DogCardProps {
  id: string
  name: string
  breed: string
  age: number
  description: string
}

export default function DogCard({ id, name, breed, age, description }: DogCardProps) {
  return (
    <Link href={`/dogs/${id}`} className="w-full">
      <Card className="w-full max-w-sm">
        <CardContent className="gap-4">
          <Image
            src={`/placeholder.svg?height=200&width=300&text=${name}`}
            alt={name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <CardTitle>{name}</CardTitle>
          <CardDescription>{breed} • {age} years old</CardDescription>
          <p>{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

