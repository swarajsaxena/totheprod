"use client"

import PreviewHeading from "@/components/internal/preview-heading"
import { PixelLoader } from "@/components/ui/totheprod-ui/ttp-pixel-loader"

export const TtpPixelLoaderPreview = () => {
  return (
    <div
      className="relative flex h-full max-h-full w-full flex-col items-center justify-center"
      data-preview-padding="false"
    >
      <PreviewHeading title="Pixel Loader" />
      <span className="font-heading font-semibold text-5xl tracking-tight">
        Your Epic Shit
      </span>
      <PixelLoader />
    </div>
  )
}
