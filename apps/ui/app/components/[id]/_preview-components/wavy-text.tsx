import PreviewHeading from '@/components/internal/PreviewHeading'
import { WavyText } from '@/components/ui/totheprod-ui/wavy-text/wavy-text'
import React from 'react'

export const WavyTextPreview = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-between">
      <PreviewHeading title="Wavy Text" />
      <div className="flex flex-col items-center">
        <WavyText text="Serendipity" horizontalDirection="towards-center" />
        <WavyText text="Ephemeral" />
        <WavyText text="Ethereality" horizontalDirection="towards-center" />
        <WavyText text="Obfuscation" />
        <WavyText text="Discombobulated" horizontalDirection="towards-center" />
      </div>
    </div>
  )
}
