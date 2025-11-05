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
    <div className="flex flex-row gap-1 max-h-screen overflow-hidden h-full flex-1 *:rounded *:first:rounded-l-xl *:last:rounded-r-xl">
      <ComponentSidebar />
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute top-2 z-50 left-2 p-1 rounded-xl bg-secondary shadow border border-dashed border-border/10 flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="border border-dashed border-border/50"
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
                className="border border-dashed border-border/50"
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
          className="bg-secondary p-8 overflow-auto max-h-screen h-full relative flex flex-col items-center [&:has(.no-padding)]:p-0"
          id="preview-scroll-container"
        >
          {/* <Button onClick={() => setDetailsOpen(!detailsOpen)}>Click me</Button> */}
          {children}
        </div>
      </div>
      {detailsOpen && (
        <div className="p-8 flex-1 h-[unset] overflow-auto">
          <ComponentDetails />
        </div>
      )}
    </div>
  )
}

export default ComponentPageLayout
