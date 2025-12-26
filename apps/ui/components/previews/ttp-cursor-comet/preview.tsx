"use client"

import { TtpCursorComet } from "@/components/ui/totheprod-ui/ttp-cursor-comet"

export const TtpCursorCometPreview = () => {
  return (
    <div className="relative m-auto flex aspect-square h-full max-h-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border bg-foreground p-8">
      <TtpCursorComet />
    </div>
  )
}
