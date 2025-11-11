"use client"

import { ComponentsGrid } from "@/components/internal/ComponentsGrid"
import { HomeNavbar } from "@/components/internal/HomeNavbar"
import { LenisProvider } from "@/components/providers/LenisProvider"
import { contentMap } from "./components/[id]/constants"
import { HeroSection } from "./_components/HeroSection"
import { Footer } from "./_components/Footer"

export default function Home() {
  return (
    <LenisProvider wrapperId="body-scroll-container">
      <main className="flex flex-col items-stretch rounded-xl bg-background dark:bg-secondary">
        <HomeNavbar
          componentsUrl={`/components/${contentMap[0].items[0].id}`}
        />
        <HeroSection />
        <ComponentsGrid contentMap={contentMap} />
        <Footer />
      </main>
    </LenisProvider>
  )
}
