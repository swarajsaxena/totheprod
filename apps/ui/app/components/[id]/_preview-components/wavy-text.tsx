"use client"

import PreviewHeading from "@/components/internal/preview-heading"
import { WavyText } from "@/components/ui/totheprod-ui/wavy-text/wavy-text"

export const WavyTextPreview = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
      <PreviewHeading className="-mt-[10%]" title="Wavy Text" />
      <div className="flex flex-col items-center">
        <WavyText
          horizontalDirection="towards-center"
          text="Serendipity"
          textClassName="font-heading tracking-wide "
        />
        <WavyText
          text="Ephemeral"
          textClassName="font-heading tracking-wide uppercase"
        />
        <WavyText
          horizontalDirection="towards-center"
          text="Ethereality"
          textClassName="font-heading tracking-wide"
        />
        <WavyText
          text="Obfuscation"
          textClassName="font-heading tracking-wide uppercase"
        />
        <WavyText
          horizontalDirection="towards-center"
          text="Discombobulated"
          textClassName="font-heading tracking-wide"
        />
      </div>
    </div>
  )
}
