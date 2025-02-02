'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import DogCard from '../components/dogCard'
import { dogs } from '../data/dogs'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Container, Grid4, Row, Section } from "@/components/ui/layout"
import { PageTitle } from "@/components/ui/typography"
import NoResults from "../components/noResults"

export default function DogsPage() {
  const [ageFilter, setAgeFilter] = useState<string>('all')
  const [breedFilter, setBreedFilter] = useState<string>('all')
  const [visibleDogs, setVisibleDogs] = useState(10)

  const availableDogs = dogs.filter(dog => dog.status !== 'Not available' && dog.status !== 'Adopted')
  const filteredDogs = availableDogs.filter(dog => {
    const notAvailable = dog.status === 'Not available' || dog.status === 'Adopted'
    const ageMatch = ageFilter === 'all' ||
      (ageFilter === 'young' && dog.age <= 3) ||
      (ageFilter === 'adult' && dog.age > 3 && dog.age <= 8) ||
      (ageFilter === 'senior' && dog.age > 8)
    const breedMatch = breedFilter === 'all' || dog.breed.toLowerCase().includes(breedFilter.toLowerCase())
    return ageMatch && breedMatch && !notAvailable
  })

  const displayedDogs = filteredDogs.slice(0, visibleDogs)
  const uniqueBreeds = Array.from(new Set(availableDogs.map(dog => dog.breed))).sort()

  return (
    <Layout>
      <Section className="my-10 flex-1">
        <Container className="gap-10 flex-1">
          <PageTitle>Dogs Available For Adoption</PageTitle>
          <Row className="gap-6">
            <Row className="gap-2">
              <Label htmlFor="age-filter">Filter by Age:</Label>
              <select value={ageFilter} onChange={(event) => setAgeFilter(event.target.value as string)} className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                <option className="bg-white text-gray-800 p-2" value={"all"}>All Ages</option>
                <option className="bg-white text-gray-800 p-2" value={"young"}>Young (0-3 years)</option>
                <option className="bg-white text-gray-800 p-2" value={"adult"}>Adult (4-8 years)</option>
                <option className="bg-white text-gray-800 p-2" value={"senior"}>Senior (9+ years)</option>
              </select>
            </Row>
            <Row className="gap-2">
              <Label htmlFor="breed-filter">Filter by Breed:</Label>
              <select value={breedFilter} onChange={(event) => setBreedFilter(event.target.value as string)} className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                <option className="bg-white text-gray-800 p-2" value={"all"}>All Breeds</option>
                {uniqueBreeds.map(breed => (
                  <option className="bg-white text-gray-800 p-2" key={breed} value={breed.toLowerCase()}>{breed}</option>
                ))}
              </select>
            </Row>
          </Row>
          <Grid4>
            {displayedDogs.map((dog) => (
              <DogCard key={dog.id} {...dog} />
            ))}
          </Grid4>
          {visibleDogs < filteredDogs.length && (
            <Button onClick={() => setVisibleDogs(prev => prev + 20)}>
              Load More
            </Button>
          )}
          {displayedDogs.length === 0 && <NoResults />}
        </Container>
      </Section>
    </Layout>
  )
}

