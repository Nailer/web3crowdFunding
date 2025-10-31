"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
// import Link from "next/lia
export default function CTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Launch Your Dream Project?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are turning their ideas into reality. Start your campaign today and reach
            your funding goal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/connect">
                <button className="cursor-pointer px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:shadow-2xl hover:scale-105 flex items-center gap-2 group">
                Start Your Campaign
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </a>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
