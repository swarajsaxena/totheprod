"use client"

import PreviewHeading from "@/components/internal/PreviewHeading"
import { WavyText } from "@/components/ui/totheprod-ui/wavy-text/wavy-text"

export const WavyTextPreview = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
      <PreviewHeading title="Wavy Text" className="-mt-[10%]" />
      <div className="flex flex-col items-center">
        <WavyText
          text="Serendipity"
          horizontalDirection="towards-center"
          textClassName="font-heading tracking-wide "
        />
        <WavyText
          text="Ephemeral"
          textClassName="font-heading tracking-wide uppercase"
        />
        <WavyText
          text="Ethereality"
          horizontalDirection="towards-center"
          textClassName="font-heading tracking-wide"
        />
        <WavyText
          text="Obfuscation"
          textClassName="font-heading tracking-wide uppercase"
        />
        <WavyText
          text="Discombobulated"
          horizontalDirection="towards-center"
          textClassName="font-heading tracking-wide"
        />
      </div>
    </div>
  )
}
