'use client'

import { useState } from 'react'
import DogCard, { type DogCardData } from '@/app/components/dogCard'
import NoResults from "@/app/components/noResults"
import { Button, Col, Grid4, Label, Row, Select } from "@vaneui/ui"

const ages = [
  { key: 'all', label: 'All ages' },
  { key: 'young', label: 'Young (0-3)' },
  { key: 'adult', label: 'Adult (4-8)' },
  { key: 'senior', label: 'Senior (9+)' },
]

export type CollectionDog = DogCardData & { age: number }

// `dogs` is already limited to adoptable dogs on the server. Every card is rendered so all dog links are in
// the HTML; cards past `visibleDogs` are only hidden with CSS until "See more dogs" reveals them.
export default function DogsCollection({ dogs }: { dogs: CollectionDog[] }) {

  const [ageFilter, setAgeFilter] = useState<string>('all')
  const [breedFilter, setBreedFilter] = useState<string>('all')
  const [visibleDogs, setVisibleDogs] = useState(12)

  const matches = (dog: CollectionDog) => {
    const ageMatch = ageFilter === 'all' ||
      (ageFilter === 'young' && dog.age <= 3) ||
      (ageFilter === 'adult' && dog.age > 3 && dog.age <= 8) ||
      (ageFilter === 'senior' && dog.age > 8)
    const breedMatch = breedFilter === 'all' || dog.breed.toLowerCase().includes(breedFilter.toLowerCase())
    return ageMatch && breedMatch
  }

  // Position of each dog among the filtered ones (-1 when filtered out).
  let shown = 0
  const positions = dogs.map(dog => (matches(dog) ? shown++ : -1))
  const uniqueBreeds = Array.from(new Set(dogs.map(dog => dog.breed))).sort()

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
        {dogs.map((dog, i) => (
          <div key={`${dog.location}/${dog.filename}`} className={positions[i] < 0 || positions[i] >= visibleDogs ? "hidden" : "contents"}>
            <DogCard {...dog} />
          </div>
        ))}
      </Grid4>
      {visibleDogs < shown && (
        <Row justifyCenter className="pt-12">
          <Button onClick={() => setVisibleDogs(prev => prev + 20)}>See more dogs</Button>
        </Row>
      )}
      {shown === 0 && <NoResults />}
    </Col>
  )
}
