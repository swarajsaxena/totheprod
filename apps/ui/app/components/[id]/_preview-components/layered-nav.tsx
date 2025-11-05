'use client'

import PreviewHeading from '@/components/internal/PreviewHeading'
import { LayeredNav } from '@/components/ui/totheprod-ui/layered-nav/layered-nav'

export const LayeredNavPreview = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center flex-1 w-full">
      <PreviewHeading
        variant="light"
        title="Layered Nav"
        description="Click the menu button to see the effect"
      />
      <LayeredNav itemClassName="font-clash" />
    </div>
  )
}
