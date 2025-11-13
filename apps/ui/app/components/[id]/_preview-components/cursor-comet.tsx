"use client"

import PreviewHeading from "@/components/internal/preview-heading"
import { CursorComet } from "@/components/ui/totheprod-ui/cursor-comet/cursor-comet"

export const CursorCometPreview = () => {
  return (
    <div className="relative m-auto flex aspect-square max-h-[500px] w-full max-w-1/2 flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border bg-foreground p-8">
      <PreviewHeading
        description="Hover around this box to see the effect."
        title="Cursor Comet"
      />
      <CursorComet />
    </div>
  )
}
