"use client"

import PreviewHeading from "@/components/internal/PreviewHeading"
import { LayeredNav } from "@/components/ui/totheprod-ui/layered-nav/layered-nav"

export const LayeredNavPreview = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
      <PreviewHeading
        title="Layered Nav"
        description="Click the menu button to see the effect"
      />
      <LayeredNav itemClassName="font-heading" />
    </div>
  )
}
