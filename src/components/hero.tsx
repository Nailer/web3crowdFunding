"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { TypeAnimation } from "react-type-animation";
// import Link from "next/link";


export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-white to-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div
        className="absolute bottom-20 right-10 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Badge */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group">
            <Sparkles className="w-4 h-4 text-black group-hover:animate-spin" />
            <span className="text-sm font-medium text-gray-700">Join 50,000+ creators raising funds</span>
          </div>
        </div>

        {/* Main Heading */}
        <div
          className={`text-center mb-8 transition-all duration-700 delay-100 `}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight text-balance">
            Building Africa’s Future, <br />
            <span className="relative z-10">
                <TypeAnimation
                sequence={[
                    "With Next-Gen Crowdfunding",
                    1500,
                    "On Hedera 🚀",
                    1500,
                    "With Next-Gen Crowdfunding On Hedera 🌍",
                    2000,
                ]}
                wrapper="span"
                speed={60}
                deletionSpeed={50}
                repeat={Infinity}
                className="text-black"
                />
            </span>
            <span className="absolute bottom-2 left-0 right-0 h-3 -z-10 rounded" />
            </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Empower creators and innovators to raise capital, validate ideas, and build communities. The modern
            crowdfunding platform for ambitious projects.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-200 `}
        >
            <a href="/connect">
                <button className="px-8 py-4 bg-black text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition-all hover:shadow-2xl hover:scale-105 flex items-center gap-2 group cursor-pointer">
                    Start a Campaign
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </a>
            <a href="/connect">
                <button className="px-8 py-4 border-2 border-black text-black rounded-full font-semibold text-lg hover:bg-black hover:text-white transition-all cursor-pointer">
                    Explore Campaigns
                </button>
            </a>
        </div>

        {/* Stats Preview */}
        <div
          className={`grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto transition-all duration-700 delay-300 `}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-black mb-2">1M HBAR</div>
            <div className="text-sm text-gray-600">Expected Funds Raised</div>
          </div>
          <div className="text-center border-l border-r border-gray-200">
            <div className="text-3xl sm:text-4xl font-bold text-black mb-2">50K+</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-black mb-2">1M+</div>
            <div className="text-sm text-gray-600">Backers</div>
          </div>
        </div>
      </div>
    </section>
  )
}
