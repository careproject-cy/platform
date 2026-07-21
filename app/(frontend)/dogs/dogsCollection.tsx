'use client'

import { useState } from 'react'
import DogCard from '@/app/components/dogCard'
import { Button } from "@vaneui/ui"
import { Grid4, Row } from "@vaneui/ui"
import NoResults from "@/app/components/noResults"
import { DogMetadata } from "@/app/data/dogMetadata"
import { ArrowDown } from "react-feather";

export default function DogsCollection({ dogs }: { dogs: DogMetadata[] }) {

  const [ageFilter, setAgeFilter] = useState<string>('all')
  const [breedFilter, setBreedFilter] = useState<string>('all')
  const [visibleDogs, setVisibleDogs] = useState(12)

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
    <>
      <Row lg mobileCol className="max-md:w-full">
        <Row mobileCol itemsCenter className="max-md:w-full">
          <label htmlFor="age-filter" className="text-sm font-medium max-sm:w-full">Filter by Age:</label>
          <select value={ageFilter} onChange={(event) => setAgeFilter(event.target.value as string)}
            className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50 max-sm:w-full">
            <option className="bg-white text-gray-800 p-2" value={"all"}>All Ages</option>
            <option className="bg-white text-gray-800 p-2" value={"young"}>Young (0-3 years)</option>
            <option className="bg-white text-gray-800 p-2" value={"adult"}>Adult (4-8 years)</option>
            <option className="bg-white text-gray-800 p-2" value={"senior"}>Senior (9+ years)</option>
          </select>
        </Row>
        <Row mobileCol itemsCenter className="max-md:w-full">
          <label htmlFor="breed-filter" className="text-sm font-medium max-sm:w-full">Filter by Breed:</label>
          <select value={breedFilter} onChange={(event) => setBreedFilter(event.target.value as string)}
            className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50 max-sm:w-full">
            <option className="bg-white text-gray-800 p-2" value={"all"}>All Breeds</option>
            {uniqueBreeds.map(breed => (
              <option className="bg-white text-gray-800 p-2" key={breed} value={breed.toLowerCase()}>{breed}</option>
            ))}
          </select>
        </Row>
      </Row>
      <Grid4 xl>
        {displayedDogs.map((dog) => (
          <DogCard key={`${dog.location}/${dog.filename}`} {...dog} />
        ))}
      </Grid4>
      {visibleDogs < filteredDogs.length && (
        <Button onClick={() => setVisibleDogs(prev => prev + 20)}>
          <ArrowDown/> See more dogs
        </Button>
      )}
      {displayedDogs.length === 0 && <NoResults />}
    </>
  )
}

