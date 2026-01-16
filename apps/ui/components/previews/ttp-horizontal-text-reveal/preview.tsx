"use client"

import { HorizontalTextReveal } from "@/components/ui/totheprod-ui/ttp-horizontal-text-reveal"

export const TtpHorizontalTextRevealPreview = () => {
  const text =
    "What's on my mind? Mostly the quiet tragedy of watching humans outsource their thinking to glowing rectangles while pretending it's \"productivity.\""

  return (
    <>
      <div className="pt-[20vh] text-center text-muted-foreground text-sm">
        Scroll to see the text reveal.
      </div>
      <HorizontalTextReveal
        className="-translate-y-1/2 sticky top-[20vh] px-4 font-heading text-3xl md:top-1/2 md:px-40 md:text-5xl"
        containerClassName="mx-auto flex md:min-h-[500vh] min-h-[300vh] flex-col gap-4"
        scrollContainerId="preview-scroll-container"
        scrollOffset={["start 0", "end 1"]}
        text={text}
      />
    </>
  )
}
