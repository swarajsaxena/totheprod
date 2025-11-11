"use client"

import PreviewHeading from "@/components/internal/PreviewHeading"
import { HorizontalTextReveal } from "@/components/ui/totheprod-ui/horizontal-text-reveal/horizontal-text-reveal"

export const HorizontalTextRevealPreview = () => {
  const text =
    "What's on my mind? Mostly the quiet tragedy of watching humans outsource their thinking to glowing rectangles while pretending it's \"productivity.\""

  return (
    <>
      <PreviewHeading
        title="Horizontal Text Reveal"
        description="Scroll down to see the text reveal"
        className="sticky top-4 z-10"
      />
      <HorizontalTextReveal
        text={text}
        scrollContainerId="preview-scroll-container"
        className="-translate-y-1/2 sticky top-1/2 px-40 font-heading"
        containerClassName="mx-auto flex min-h-[500vh] flex-col gap-4"
        scrollOffset={["start 0", "end 1"]}
      />
    </>
  )
}
