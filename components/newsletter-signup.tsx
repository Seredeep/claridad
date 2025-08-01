"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your newsletter service
    setIsSubscribed(true)
    setEmail("")
  }

  if (isSubscribed) {
    return (
      <div className="text-center">
        <div className="mb-2 text-[#58eda2]">✓ Subscribed!</div>
        <p className="text-sm text-gray-600">Thank you for subscribing to our newsletter.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
      />
      <Button type="submit" className="bg-[#58eda2] hover:bg-[#4dd396] text-white">
        <Mail className="h-4 w-4 mr-2" />
        Subscribe
      </Button>
    </form>
  )
}
