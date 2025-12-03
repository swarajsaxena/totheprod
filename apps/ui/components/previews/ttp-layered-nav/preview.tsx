"use client"

import PreviewHeading from "@/components/internal/preview-heading"
import { LayeredNav } from "@/components/ui/totheprod-ui/ttp-layered-nav"

export const TtpLayeredNavPreview = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
      <PreviewHeading
        description="Click the menu button to see the effect"
        title="Layered Nav"
      />
      <LayeredNav itemClassName="font-heading" />
    </div>
  )
}
