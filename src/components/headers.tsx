"use client"

import { useState, useContext } from "react"
// import Link from "next/link"
import { Menu, X } from "lucide-react"
import { CrowdFundingContext } from "../../Context/CrowdFunding.js";


interface HeaderProps {
  isScrolled: boolean
}

export default function Headers({ isScrolled }: HeaderProps) {

  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  

  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Landing", href: "#home" },
    { label: "Create Campaign", href: "#create" },
    { label: "Campaigns", href: "#campaigns" },
    { label: "Learn", href: "#learn" },
    // { label: "Connect", href: "#connect" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg border-b border-gray-100" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-lg">FDA</span>
          </div>
          <span className="font-bold text-xl text-black hidden sm:inline">FUNDORA</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-700 hover:text-black font-medium transition-colors relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* <button className="px-6 py-2 text-black font-medium hover:text-gray-700 transition-colors">Sign In</button> */}
          <button className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl">
            {!currentAccount && (
              <ul className="flex items-center hidden space-x-8 lg:flex">
                <li>
                  <p
                    onClick={() => connectWallet()}
                    className=""
                    aria-label="Sign Up"
                    title="Sign Up"
                  >
                    Connect Wallet
                  </p>
                </li>
              </ul>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in-up">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              
              <button className="w-full px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                {!currentAccount && (
                  <ul className="flex items-center hidden space-x-8 lg:flex">
                    <li>
                      <p
                        onClick={() => connectWallet()}
                        className=""
                        aria-label="Sign Up"
                        title="Sign Up"
                      >
                        Connect Wallet
                      </p>
                    </li>
                  </ul>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
