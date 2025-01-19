import { notFound } from 'next/navigation'
import Layout from '../../components/layout'
import { dogs } from '../../data/dogs'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface DogPageProps {
  params: Promise<{ id: string }>
}

export default async function DogPage({ params }: DogPageProps) {
  const { id } = await params
  const dog = dogs.find(d => d.id === id)

  if (!dog) {
    notFound()
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{dog.name}</h1>
        <Image
          src={`/placeholder.svg?height=400&width=600&text=${dog.name}`}
          alt={dog.name}
          width={600}
          height={400}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <p className="text-lg mb-2"><strong>Breed:</strong> {dog.breed}</p>
          <p className="text-lg mb-2"><strong>Age:</strong> {dog.age} years old</p>
          <p className="text-lg mb-4">{dog.longDescription}</p>
          <Link href="#adopt">
            <Button className="w-full">Adopt {dog.name}</Button>
          </Link>
        </div>
        <div id="adopt">
          <h2 className="text-2xl font-semibold mb-4">Adopt {dog.name}</h2>
          <p className="mb-4">
            To start the adoption process for {dog.name}, please fill out our adoption form.
            We will review your application and get back to you as soon as possible.
          </p>
          <Link href="/#adopt">
            <Button variant="outline" className="w-full">Go to Adoption Form</Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

