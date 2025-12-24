"use client"

import { LayeredNav } from "@/components/ui/totheprod-ui/ttp-layered-nav"

export const TtpLayeredNavPreview = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
      <LayeredNav itemClassName="font-heading" />
    </div>
  )
}
