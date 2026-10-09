"use client"

import { useState } from "react"
import { Button, Col, Row } from "@vaneui/ui"
import PhotoWall from "./photoWall"
import type { LandingDog } from "@/app/data/landingData"

const tabs = [
  { key: "all", label: "All dogs", test: () => true },
  { key: "young", label: "Puppies & young", test: (d: LandingDog) => d.age <= 3 },
  { key: "adult", label: "Adults & seniors", test: (d: LandingDog) => d.age > 3 },
  { key: "small", label: "Small & medium", test: (d: LandingDog) => d.size !== "large" },
]

export default function DogWall({ dogs }: { dogs: LandingDog[] }) {
  const [tab, setTab] = useState("all")
  const shown = dogs.filter(tabs.find(t => t.key === tab)!.test).slice(0, 12)

  return (
    <Col xl noGap>
      <Row xs flexWrap role="tablist" aria-label="Filter dogs">
        {tabs.map(t => (
          <Button key={t.key} sm role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)}
                  filled={tab === t.key} secondary={tab !== t.key} fontNormal className={tab === t.key ? "" : "bg-[var(--bg)]"}>
            {t.label}
          </Button>
        ))}
      </Row>
      <Col key={tab} className="mt-14 pt-12">
        <PhotoWall dogs={shown} cols={4} labels="always"/>
      </Col>
    </Col>
  )
}
