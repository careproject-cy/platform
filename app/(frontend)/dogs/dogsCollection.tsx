'use client'

import { useState } from 'react'
import DogCard from '@/app/components/dogCard'
import NoResults from "@/app/components/noResults"
import { DogMetadata } from "@/app/data/dogMetadata"

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
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-10 border-b border-[var(--line)]">
        <div role="group" aria-label="Filter by age" className="flex flex-wrap gap-2">
          {ages.map(a => (
            <button key={a.key} onClick={() => setAgeFilter(a.key)} aria-pressed={ageFilter === a.key}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${ageFilter === a.key ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]"}`}>
              {a.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
          Breed
          <select value={breedFilter} onChange={(event) => setBreedFilter(event.target.value)}
                  className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-[var(--ink)] cursor-pointer hover:border-[var(--ink)]">
            <option value="all">All breeds</option>
            {uniqueBreeds.map(breed => (
              <option key={breed} value={breed.toLowerCase()}>{breed}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 pt-10">
        {displayedDogs.map((dog) => (
          <DogCard key={`${dog.location}/${dog.filename}`} {...dog} />
        ))}
      </div>
      {visibleDogs < filteredDogs.length && (
        <div className="flex justify-center pt-12">
          <button onClick={() => setVisibleDogs(prev => prev + 20)}
                  className="rounded-full border border-[var(--line)] px-6 py-3 font-medium hover:border-[var(--ink)]">
            See more dogs
          </button>
        </div>
      )}
      {displayedDogs.length === 0 && <NoResults />}
    </>
  )
}
