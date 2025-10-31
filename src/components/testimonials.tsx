"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, TechFlow",
    content:
      "Fundora helped us raise $500K in just 30 days. The platform is intuitive and the community support is incredible.",
    rating: 5,
    image: "👩‍💼",
  },
  {
    name: "Marcus Johnson",
    role: "Creator, ArtVision",
    content:
      "The analytics dashboard gave us insights we never had before. We optimized our campaign and exceeded our goal by 200%.",
    rating: 5,
    image: "👨‍🎨",
  },
  {
    name: "Elena Rodriguez",
    role: "Entrepreneur, GreenTech",
    content:
      "The support team was amazing. They helped us every step of the way. Highly recommend for anyone serious about crowdfunding.",
    rating: 5,
    image: "👩‍💻",
  },
]

export default function Testimonials() {
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            testimonials.forEach((_, index) => {
              setTimeout(() => {
                setVisibleTestimonials((prev) => [...new Set([...prev, index])])
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
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">Loved by Creators</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful creators who have raised millions through our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const isVisible = visibleTestimonials.includes(index)

            return (
              <div
                key={index}
                className={`p-8 rounded-2xl border border-gray-200 hover:border-black hover:shadow-xl transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold text-black">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed">"{testimonial.content}"</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

