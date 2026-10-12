import React from 'react'
import { BrandHeader } from './components/BrandHeader'
import { RoadScene } from './components/RoadScene'
import { ClosingSection } from './components/ClosingSection'
import { Footer } from './components/Footer'
import { useReducedMotion } from './hooks/useReducedMotion'

export default function App() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div id="hero" className="min-h-screen w-full bg-[#050811] text-white flex flex-col antialiased selection:bg-[#00f0ff] selection:text-black">
      <a
        href="#journey"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00f0ff] focus:text-black focus:font-bold focus:rounded focus:outline-none"
      >
        Skip to interactive journey
      </a>

      <BrandHeader />

      <main className="flex-1 w-full flex flex-col">
        <RoadScene prefersReducedMotion={prefersReducedMotion} />
        <ClosingSection />
      </main>

      <Footer />
    </div>
  )
}
