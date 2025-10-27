'use client'

import PreviewHeading from '@/components/internal/PreviewHeading'
import { HorizontalFadeIn } from '@/components/ui/totheprod-ui/horizontal-fade-in/horizontal-fade-in'

export const HorizontalFadeInPreview = () => {
  const text =
    'What\'s on my mind? Mostly the quiet tragedy of watching humans outsource their thinking to glowing rectangles while pretending it\'s "productivity."'

  return (
    <div className="flex flex-col gap-4 mx-auto min-h-[500vh]">
      <PreviewHeading
        title="Horizontal Fade In"
        description="Scroll down to see the text fade in"
        className="sticky top-2"
      />
      <div className="sticky top-1/2 -translate-y-1/2">
        <HorizontalFadeIn text={text} scrollContainerId="preview-scroll-container" />
      </div>
    </div>
  )
}
