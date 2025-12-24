"use client"

import { TtpWavyText } from "@/components/ui/totheprod-ui/ttp-wavy-text"

export const TtpWavyTextPreview = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center">
        <TtpWavyText
          horizontalDirection="towards-center"
          text="Serendipity"
          textClassName="font-heading tracking-wide "
        />
        <TtpWavyText
          text="Ephemeral"
          textClassName="font-heading tracking-wide uppercase"
        />
        <TtpWavyText
          horizontalDirection="towards-center"
          text="Ethereality"
          textClassName="font-heading tracking-wide"
        />
        <TtpWavyText
          text="Obfuscation"
          textClassName="font-heading tracking-wide uppercase"
        />
        <TtpWavyText
          horizontalDirection="towards-center"
          text="Discombobulated"
          textClassName="font-heading tracking-wide"
        />
      </div>
    </div>
  )
}
