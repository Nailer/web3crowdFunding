"use client"

import { useEffect, useRef, useState } from "react"
import { Zap, Users, TrendingUp, Lock, Lightbulb, Globe } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Launch",
    description: "Get your campaign live in minutes with our intuitive setup wizard. No technical knowledge required.",
  },
  {
    icon: Users,
    title: "Community Powered",
    description: "Build a passionate community around your project. Engage backers and create lasting relationships.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Track your campaign performance with detailed insights and metrics. Make data-driven decisions.",
  },
  {
    icon: Lock,
    title: "Secure & Trusted",
    description: "Bank-level security protects your data and funds. Transparent and compliant with all regulations.",
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    description: "AI-powered suggestions to optimize your campaign and reach the right audience.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Access backers from 195+ countries. Multi-currency support for seamless transactions.",
  },
]

export default function Features() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger animation
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFeatures((prev) => [...new Set([...prev, index])])
              }, index * 100)
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
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">Everything You Need to Succeed</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful tools and features designed to help creators raise funds and build their dreams.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleFeatures.includes(index)

            return (
              <div
                key={index}
                className={`p-8 rounded-2xl border border-gray-200 hover:border-black hover:shadow-xl transition-all duration-300 group cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
                }}
              >
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
