"use client"

import { useState, useEffect } from "react"
import Headers from "../components/headers"
import Hero from "../components/hero"
import Features from "../components/features"
import HowItWorks from "../components/how-it-works"
import Stats from "../components/stats"
import Testimonials from "../components/testimonials"
import CTA from "../components/cta"
import Footer from "../components/footer"

export default function index() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Headers isScrolled={isScrolled} />
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
