"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2 } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Connect Your Wallet",
    description: "Securely link your Hedera-compatible wallet to get started. This step lets you interact seamlessly with the Fundora.",
  },
  {
    number: "02",
    title: "Enter Your Campaign Info",
    description: "Launch your vision on-chain in minutes. Define your project goals, funding target, and duration — all securely stored and verifiable on the Hedera network.",
  },
  {
    number: "03",
    title: "Create Your Campaign",
    description:
      "Deploy your campaign on the Hedera network with a single click.",
  },
  {
    number: "04",
    title: "Sign Transaction on Hedera",
    description: "Securely authorize your campaign or contribution using Hedera’s fast and low-cost consensus network.",
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
