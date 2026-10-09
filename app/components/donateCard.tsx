'use client'

import React, { useState } from "react"
import { Button, Card, Col, Field, Input, Row, Text, Title } from "@vaneui/ui"
import { Heart, Shield } from "react-feather"

export default function DonationCard() {
  const [selectedAmount, setSelectedAmount] = useState("25")
  const [isMonthly, setIsMonthly] = useState(false)
  const priceOptions = ["10", "25", "50", "100", "200", "250", "500", "1000"]

  const handleAmountClick = (amount: string) => {
    setSelectedAmount(amount)
  }

  const onTabClick = () => {
    setIsMonthly(!isMonthly)
    if (priceOptions.indexOf(selectedAmount) < 0) {
      setSelectedAmount("10")
    }
  }

  const getLink = (monthly: boolean, sum: string) => {
    if (!monthly) {
      return (
        "https://donate.stripe.com/dR602jfIca9VaoU000?locale=en&__embed_source=buy_btn_1P4475FGJfIenxLQ3jcc2HGL&__prefilled_amount=" +
        sum +
        "00"
      )
    } else {
      return {
        "10": "https://buy.stripe.com/fZedT9brW4PB40w6op",
        "25": "https://buy.stripe.com/dR65mDeE8bdZ40w8wF",
        "50": "https://buy.stripe.com/5kAeXdeE8bdZ8gM7su",
        "100": "https://buy.stripe.com/eVaaGX3Zu1Dp0Ok003",
        "200": "https://buy.stripe.com/6oE9CT8fKbdZ7cI28c",
        "250": "https://buy.stripe.com/fZedT9dA4a9VaoU149",
        "500": "https://buy.stripe.com/28og1h1Rmci30Ok3ci",
        "1000": "https://buy.stripe.com/5kA6qH67Ceqb8gMbIP",
        "1500": "https://buy.stripe.com/aEU5mD9jOa9VgNi9AI",
      }[sum]
    }
  }

  const otherSelected = priceOptions.indexOf(selectedAmount) < 0

  return (
    <Card xl shadow itemsCenter className="max-w-[600px] w-full mx-auto">
      <Row xs>
        <Shield aria-hidden="true" className="size-5"/>
        <Title tag="h2">Secure donation</Title>
      </Row>
      <Col sm itemsCenter wFull>
        <Text sm secondary id="donation-type">Select donation type</Text>
        <Row noGap wFull role="group" aria-labelledby="donation-type" className="rounded-full border border-(--color-border-primary) p-1">
          <Button md wFull filled={!isMonthly} ghost={isMonthly} aria-pressed={!isMonthly} onClick={() => isMonthly && onTabClick()} className="flex-1">
            Donate once
          </Button>
          <Button md wFull filled={isMonthly} ghost={!isMonthly} aria-pressed={isMonthly} onClick={() => !isMonthly && onTabClick()} className="flex-1">
            <Heart aria-hidden="true"/> Monthly
          </Button>
        </Row>
      </Col>

      <Row sm flexWrap justifyCenter role="group" aria-label="Amount">
        {priceOptions.map((amount) => (
          <Button key={amount} md fontNormal filled={selectedAmount === amount} accent={selectedAmount === amount} secondary={selectedAmount !== amount}
                  aria-pressed={selectedAmount === amount} onClick={() => handleAmountClick(amount)}>
            €{amount}
          </Button>
        ))}
        <Button md fontNormal filled={otherSelected} accent={otherSelected} secondary={!otherSelected} aria-pressed={otherSelected}
                onClick={() => handleAmountClick(isMonthly ? "1500" : "5")}>
          {isMonthly ? "€1500" : "Other"}
        </Button>
      </Row>

      <Field label="Amount to donate, EUR" className="w-full">
        <Input xl type="number" placeholder="Enter amount in EUR" value={selectedAmount} readOnly={isMonthly}
               onChange={(e) => {
                 if (!isMonthly) setSelectedAmount(e.target.value)
               }}/>
      </Field>

      <Button lg wFull filled accent justifyCenter tag="a" id="donate-button" target="_blank" rel="noopener noreferrer"
              href={getLink(isMonthly, selectedAmount)}>
        Donate €{selectedAmount}{isMonthly ? " a month" : ""}
      </Button>
    </Card>
  )
}
