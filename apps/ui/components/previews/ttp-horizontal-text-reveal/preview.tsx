"use client"

import PreviewHeading from "@/components/internal/preview-heading"
import { HorizontalTextReveal } from "@/components/ui/totheprod-ui/ttp-horizontal-text-reveal"

export const TtpHorizontalTextRevealPreview = () => {
  const text =
    "What's on my mind? Mostly the quiet tragedy of watching humans outsource their thinking to glowing rectangles while pretending it's \"productivity.\""

  return (
    <>
      <PreviewHeading
        className="sticky top-4 z-10"
        description="Scroll down to see the text reveal"
        title="Horizontal Text Reveal"
      />
      <HorizontalTextReveal
        className="-translate-y-1/2 sticky top-1/2 px-40 font-heading"
        containerClassName="mx-auto flex min-h-[500vh] flex-col gap-4"
        scrollContainerId="preview-scroll-container"
        scrollOffset={["start 0", "end 1"]}
        text={text}
      />
    </>
  )
}
