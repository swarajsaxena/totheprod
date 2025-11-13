"use client"

import { ComponentsGrid } from "@/components/internal/components-grid"
import { HomeNavbar } from "@/components/internal/home-navbar"
import { LenisProvider } from "@/components/providers/lenis-provider"
import { Footer } from "./_components/footer-section"
import { HeroSection } from "./_components/hero-section"
import { contentMap } from "./components/[id]/constants"

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
