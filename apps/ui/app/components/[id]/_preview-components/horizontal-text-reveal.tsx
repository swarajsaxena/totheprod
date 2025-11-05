'use client'

import PreviewHeading from '@/components/internal/PreviewHeading'
import { HorizontalTextReveal } from '@/components/ui/totheprod-ui/horizontal-text-reveal/horizontal-text-reveal'

export const HorizontalTextRevealPreview = () => {
  const text =
    'What\'s on my mind? Mostly the quiet tragedy of watching humans outsource their thinking to glowing rectangles while pretending it\'s "productivity."'

  return (
    <div className="flex flex-col pt-16 gap-4 mx-auto min-h-[500vh]">
      <PreviewHeading
        variant="light"
        title="Horizontal Text Reveal"
        description="Scroll down to see the text reveal"
        className="sticky top-4"
      />
      <div className="sticky top-1/2 -translate-y-1/2">
        <HorizontalTextReveal
          text={text}
          scrollContainerId="preview-scroll-container"
          className="font-clash"
        />
      </div>
    </div>
  )
}
