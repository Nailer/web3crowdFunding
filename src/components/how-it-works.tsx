"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2 } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Create Your Campaign",
    description: "Tell your story, set your funding goal, and define your rewards. Our templates make it easy.",
  },
  {
    number: "02",
    title: "Build Your Community",
    description: "Share your campaign with your network. Engage with backers and answer their questions.",
  },
  {
    number: "03",
    title: "Reach Your Goal",
    description:
      "Watch the funds roll in as your community supports your vision. Real-time updates keep everyone informed.",
  },
  {
    number: "04",
    title: "Deliver & Grow",
    description: "Fulfill your promises and keep backers updated. Build lasting relationships for future projects.",
  },
]

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...new Set([...prev, index])])
              }, index * 150)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four simple steps to launch your campaign and start raising funds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const isVisible = visibleSteps.includes(index)

            return (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[calc(100%-60%)] h-0.5 bg-gradient-to-r from-black to-transparent" />
                )}

                <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-black hover:shadow-lg transition-all h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {step.number}
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-black mt-1 flex-shrink-0" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
