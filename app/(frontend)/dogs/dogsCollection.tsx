'use client'

import { useState } from 'react'
import DogCard from '@/app/components/dogCard'
import NoResults from "@/app/components/noResults"
import { DogMetadata } from "@/app/data/dogMetadata"
import { Button, Col, Grid4, Label, Row, Select } from "@vaneui/ui"

const ages = [
  { key: 'all', label: 'All ages' },
  { key: 'young', label: 'Young (0-3)' },
  { key: 'adult', label: 'Adult (4-8)' },
  { key: 'senior', label: 'Senior (9+)' },
]

export default function DogsCollection({ dogs }: { dogs: DogMetadata[] }) {

  const [ageFilter, setAgeFilter] = useState<string>('all')
  const [breedFilter, setBreedFilter] = useState<string>('all')
  const [visibleDogs, setVisibleDogs] = useState(12)

  const availableDogs = dogs.filter(dog => dog.status !== 'Not available' && dog.status !== 'Adopted')
  const filteredDogs = availableDogs.filter(dog => {
    const ageMatch = ageFilter === 'all' ||
      (ageFilter === 'young' && dog.age <= 3) ||
      (ageFilter === 'adult' && dog.age > 3 && dog.age <= 8) ||
      (ageFilter === 'senior' && dog.age > 8)
    const breedMatch = breedFilter === 'all' || dog.breed.toLowerCase().includes(breedFilter.toLowerCase())
    return ageMatch && breedMatch
  })

  const displayedDogs = filteredDogs.slice(0, visibleDogs)
  const uniqueBreeds = Array.from(new Set(availableDogs.map(dog => dog.breed))).sort()

  return (
    <Col xl noGap>
      <Row lg mobileStack justifyBetween borderB className="pb-10 max-mobile:items-start">
        <Row xs flexWrap role="group" aria-label="Filter by age">
          {ages.map(a => (
            <Button key={a.key} sm fontNormal onClick={() => setAgeFilter(a.key)} aria-pressed={ageFilter === a.key}
                    filled={ageFilter === a.key} secondary={ageFilter !== a.key}>
              {a.label}
            </Button>
          ))}
        </Row>
        <Label row itemsCenter secondary>
          Breed
          <Select sm pill wAuto value={breedFilter} onChange={(event) => setBreedFilter(event.target.value)}>
            <option value="all">All breeds</option>
            {uniqueBreeds.map(breed => (
              <option key={breed} value={breed.toLowerCase()}>{breed}</option>
            ))}
          </Select>
        </Label>
      </Row>
      <Grid4 className="gap-x-5 gap-y-10 pt-10">
        {displayedDogs.map((dog) => (
          <DogCard key={`${dog.location}/${dog.filename}`} {...dog} />
        ))}
      </Grid4>
      {visibleDogs < filteredDogs.length && (
        <Row justifyCenter className="pt-12">
          <Button onClick={() => setVisibleDogs(prev => prev + 20)}>See more dogs</Button>
        </Row>
      )}
      {displayedDogs.length === 0 && <NoResults />}
    </Col>
  )
}
