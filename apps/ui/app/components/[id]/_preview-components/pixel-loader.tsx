'use client'

import PreviewHeading from '@/components/internal/PreviewHeading'
import { PixelLoader } from '@/components/ui/totheprod-ui/pixel-loader/pixel-loader'

export const PixelLoaderPreview = () => {
  return (
    <div className="bg-foreground text-background no-padding relative flex h-full max-h-full w-full flex-col items-center justify-center">
      <PreviewHeading title="Pixel Loader" />
      <span className="font-clash text-5xl font-semibold tracking-tight">Your Epic Shit</span>
      <PixelLoader />
    </div>
  )
}
