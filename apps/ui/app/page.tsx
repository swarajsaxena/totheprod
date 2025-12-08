"use client"

import { motion } from "motion/react"
import CornerPlusContainer from "@/components/internal/corner-plus-container"
import { ThemeLogo } from "@/components/internal/theme-logo"

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-background shadow">
      <CornerPlusContainer containerClassName="flex w-full max-w-2xl flex-col gap-4 items-center p-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex w-max items-center gap-2">
            <ThemeLogo className="size-6" />
            <span className="font-heading font-semibold text-xl tracking-wide">
              ToTheProd
            </span>
          </div>
          <p className="w-full max-w-md text-muted-foreground text-sm leading-relaxed md:text-base">
            A production-ready component library featuring{" "}
            <span className="font-medium text-foreground">
              navigation menus
            </span>
            , <span className="font-medium text-foreground">text effects</span>,{" "}
            <span className="font-medium text-foreground">animations</span>, and
            more.
          </p>

          <div className="mt-2 flex flex-col gap-2 text-muted-foreground text-xs md:text-sm">
            <p>Components that ship, not just look good.</p>
            <p className="font-medium text-primary">Coming soon...</p>
          </div>
        </motion.div>
      </CornerPlusContainer>
    </main>
  )
}
