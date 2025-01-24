'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import DogCard from '../components/dogCard'
import { dogs } from '../data/dogs'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Section from "@/components/ui/section"
import Container from "@/components/ui/container"
import Badge from "@/components/ui/badge"

export default function DogsPage() {
  const [ageFilter, setAgeFilter] = useState<string>('all')
  const [breedFilter, setBreedFilter] = useState<string>('all')
  const [visibleDogs, setVisibleDogs] = useState(20)

  const filteredDogs = dogs.filter(dog => {
    const ageMatch = ageFilter === 'all' ||
      (ageFilter === 'young' && dog.age <= 3) ||
      (ageFilter === 'adult' && dog.age > 3 && dog.age <= 8) ||
      (ageFilter === 'senior' && dog.age > 8)
    const breedMatch = breedFilter === 'all' || dog.breed.toLowerCase().includes(breedFilter.toLowerCase())
    return ageMatch && breedMatch
  })

  const displayedDogs = filteredDogs.slice(0, visibleDogs)

  const uniqueBreeds = Array.from(new Set(dogs.map(dog => dog.breed))).sort()

  return (
    <Layout>
      <Section className="my-12">
        <Container className="gap-6">
          <div className="w-full flex justify-center">
            <Badge>Meet the dogs</Badge>
          </div>
          <h1 className="text-4xl font-semibold mb-4 w-full text-center">Dogs Available For Adoption</h1>
          <div>
            <Label htmlFor="age-filter">Filter by Age</Label>
            <select value={"all"} onChange={(event) => setAgeFilter(event.target.value as string)} className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
              <option className="bg-white text-gray-800 p-2" value={"all"}>All Ages</option>
              <option className="bg-white text-gray-800 p-2" value={"young"}>Young (0-3 years)</option>
              <option className="bg-white text-gray-800 p-2" value={"adult"}>Adult (4-8 years)</option>
              <option className="bg-white text-gray-800 p-2" value={"senior"}>Senior (9+ years)</option>
            </select>
          </div>

          <div>
            <Label htmlFor="breed-filter">Filter by Breed</Label>
            <select value={"all"} onChange={(event) => setBreedFilter(event.target.value as string)} className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
              <option className="bg-white text-gray-800 p-2" value={"all"}>All Breeds</option>
              {uniqueBreeds.map(breed => (
                <option className="bg-white text-gray-800 p-2" key={breed} value={breed.toLowerCase()}>{breed}</option>
              ))}
            </select>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7">
            {displayedDogs.map((dog) => (
              <DogCard key={dog.id} {...dog} />
            ))}
          </div>
          {visibleDogs < filteredDogs.length && (
            <div className="text-center">
              <Button onClick={() => setVisibleDogs(prev => prev + 20)}>
                Load More
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </Layout>
  )
}

