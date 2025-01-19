"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AdoptionForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the form data to a server
    setSubmitted(true)
  }

  if (submitted) {
    return <p className="text-green-600 font-semibold">Thank you for your interest in adoption! We will be in touch soon.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" placeholder="Your Name" required />
      <Input type="email" placeholder="Your Email" required />
      <Input type="tel" placeholder="Your Phone Number" required />
      <Textarea placeholder="Why do you want to adopt?" required />
      <Button type="submit" className="w-full">Submit Adoption Request</Button>
    </form>
  )
}

