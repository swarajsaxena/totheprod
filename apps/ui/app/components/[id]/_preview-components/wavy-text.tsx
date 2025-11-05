'use client'

import PreviewHeading from '@/components/internal/PreviewHeading'
import { WavyText } from '@/components/ui/totheprod-ui/wavy-text/wavy-text'

export const WavyTextPreview = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center flex-1 w-full">
      <PreviewHeading variant="light" title="Wavy Text" className="-mt-[10%]" />
      <div className="flex flex-col items-center">
        <WavyText
          text="Serendipity"
          horizontalDirection="towards-center"
          textClassName="font-clash tracking-wide "
        />
        <WavyText text="Ephemeral" textClassName="font-clash tracking-wide uppercase" />
        <WavyText
          text="Ethereality"
          horizontalDirection="towards-center"
          textClassName="font-clash tracking-wide"
        />
        <WavyText text="Obfuscation" textClassName="font-clash tracking-wide uppercase" />
        <WavyText
          text="Discombobulated"
          horizontalDirection="towards-center"
          textClassName="font-clash tracking-wide"
        />
      </div>
    </div>
  )
}
