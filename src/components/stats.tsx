"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  {
    label: "Success Rate",
    value: "42%",
    description: "of campaigns reach their funding goals",
  },
  {
    label: "Average Funding",
    value: "$8,150",
    description: "raised per successful campaign",
  },
  {
    label: "Video Impact",
    value: "+105%",
    description: "more funds with campaign videos",
  },
  {
    label: "First 48 Hours",
    value: "30%",
    description: "goal achievement predicts success",
  },
]

export default function Stats() {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0))
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            // Animate numbers
            const targets = [42, 8150, 105, 30]
            const duration = 2000
            const startTime = Date.now()

            const animate = () => {
              const elapsed = Date.now() - startTime
              const progress = Math.min(elapsed / duration, 1)

              setCounts(targets.map((target) => Math.floor(target * progress)))

              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }

            animate()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Backed by Numbers</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Real data from successful crowdfunding campaigns that prove the power of community-driven funding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl border border-gray-700 hover:border-white transition-colors group"
            >
              <div className="text-5xl sm:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform">
                {counts[index]}
                {index === 2 ? "%" : index === 1 ? "" : "%"}
              </div>
              <div className="text-gray-300 text-sm mb-3">{stat.label}</div>
              <p className="text-gray-400 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
