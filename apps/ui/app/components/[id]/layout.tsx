'use client'

import { ComponentDetails } from '@/components/internal/ComponentDetails'
import ComponentSidebar from '@/components/internal/ComponentSidebar'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { detailsOpenAtom } from '@/store/atoms'
import { SourceCodeIcon, ViewIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

const ComponentPageLayout = ({ children }: { children: ReactNode }) => {
  const [detailsOpen, setDetailsOpen] = useAtom(detailsOpenAtom)
  const currentComponentId = useParams().id
  return (
    <div className="flex h-full max-h-screen flex-1 flex-row gap-1 overflow-hidden *:rounded *:first:rounded-l-xl *:last:rounded-r-xl">
      <ComponentSidebar />
      <div className="relative flex-1 overflow-hidden">
        <div className="bg-secondary border-border/10 absolute top-2 left-2 z-50 flex gap-1 rounded-xl border border-dashed p-1 shadow">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="border-border/50 border border-dashed"
                variant="ghost"
                size="icon-sm"
                asChild
              >
                <Link href={`/preview/${currentComponentId}`}>
                  <HugeiconsIcon icon={ViewIcon} className="size-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent align="start">
              <p>Preview</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="border-border/50 border border-dashed"
                variant="ghost"
                size="icon-sm"
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                <HugeiconsIcon icon={SourceCodeIcon} className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent align="start">
              <p>Source Code</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div
          className="bg-secondary relative flex h-full max-h-screen flex-col items-center overflow-auto p-8 [&:has(.no-padding)]:p-0"
          id="preview-scroll-container"
        >
          {/* <Button onClick={() => setDetailsOpen(!detailsOpen)}>Click me</Button> */}
          {children}
        </div>
      </div>
      {detailsOpen && (
        <div className="h-[unset] flex-1 overflow-auto p-8">
          <ComponentDetails />
        </div>
      )}
    </div>
  )
}

export default ComponentPageLayout
