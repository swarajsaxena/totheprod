"use client"

import { useState } from "react"
import { TextScramble } from "@/components/ui/totheprod-ui/text-scramble/text-scramble"

export const TextScramblePreview = () => {
  const [trigger, setTrigger] = useState(true)

  const handleReplay = () => {
    setTrigger(false)
    setTimeout(() => setTrigger(true), 100)
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-secondary">
      <div className="flex flex-col items-center gap-8">
        <TextScramble
          text="ToTheProd Components"
          className="font-bold font-heading text-5xl text-foreground"
          trigger={trigger}
        />

        <button
          onClick={handleReplay}
          className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          Replay Animation
        </button>
      </div>
    </div>
  )
}
