// app/page.tsx

"use client"

import { SiteHeader } from "@/components/header"
import { HowItWorksSection } from "./_components/sections/HowItWorksSection"
import { Footer } from "./_components/sections/Footer"
import { HeroSection } from "./_components/sections/HeroSection"
import { DemoSection } from "./_components/sections/DemoSection"
import { LatestBinsSection } from "./_components/sections/LatestBinsSection"
import { FeaturesGridSection } from "./_components/sections/FeaturesSection"
import { CTASection } from "./_components/sections/CTASection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Navegación arriba */}
      <SiteHeader showGradient={true} />

      {/* Secciones */}
      <HeroSection />
      <LatestBinsSection />
      <HowItWorksSection />
      <FeaturesGridSection />
      <CTASection />

      {/* Pie de página */}
      <Footer />
    </div>
  )
}
