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
      <main className="flex flex-col items-stretch rounded-xl border border-dashed bg-background dark:bg-secondary">
        <HomeNavbar
          componentsUrl={`/components/${contentMap[0].items[0].id}`}
        />
        <HeroSection />
        <ComponentsGrid contentMap={contentMap} />
        <div className="relative flex w-full flex-col gap-4 border-b border-dashed px-4">
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-2 border-x border-dashed py-6 font-heading text-xl">
            Where design meets functionality.
          </div>
        </div>
        <Footer />
      </main>
    </LenisProvider>
  )
}
