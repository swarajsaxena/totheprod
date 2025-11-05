'use client'

import PreviewHeading from '@/components/internal/PreviewHeading'
import { CursorComet } from '@/components/ui/totheprod-ui/cursor-comet/cursor-comet'

export const CursorCometPreview = () => {
  return (
    <div className="relative flex flex-col gap-4 items-center rounded-xl justify-center border bg-foreground p-8 m-auto max-w-1/2 w-full aspect-square overflow-hidden max-h-[500px]">
      <PreviewHeading title="Cursor Comet" description="Hover around this box to see the effect." />
      <CursorComet />
    </div>
  )
}
