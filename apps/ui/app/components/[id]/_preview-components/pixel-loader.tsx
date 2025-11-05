'use client'

import PreviewHeading from '@/components/internal/PreviewHeading'
import { PixelLoader } from '@/components/ui/totheprod-ui/pixel-loader/pixel-loader'

export const PixelLoaderPreview = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-foreground flex-col text-background no-padding relative max-h-full">
      <PreviewHeading title="Pixel Loader" />
      <span className="text-5xl font-semibold font-clash tracking-tight">Your Epic Shit</span>
      <PixelLoader />
    </div>
  )
}
