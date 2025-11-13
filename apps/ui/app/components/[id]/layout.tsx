"use client"

import { SourceCodeIcon, ViewIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useAtom, useAtomValue } from "jotai"
import Link from "next/link"
import { useParams } from "next/navigation"
import type { ReactNode } from "react"
import { ComponentDetails } from "@/components/internal/component-details"
import ComponentSidebar from "@/components/internal/component-sidebar"
import { ThemeLogo } from "@/components/internal/theme-logo"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { detailsOpenAtom, sidebarOpenAtom } from "@/store/atoms"

const ComponentPageLayout = ({ children }: { children: ReactNode }) => {
  const [detailsOpen, setDetailsOpen] = useAtom(detailsOpenAtom)
  const sidebarOpen = useAtomValue(sidebarOpenAtom)
  const currentComponentId = useParams().id
  return (
    <div className="relative flex h-full max-h-screen flex-1 flex-row overflow-hidden rounded-lg border border-dashed">
      <ComponentSidebar />
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute top-0 left-0 z-10 flex w-full border-b border-dashed bg-background dark:bg-secondary">
          <div
            className={cn(
              "flex items-center justify-between gap-2 border-r border-dashed p-2 pl-6",
              sidebarOpen && "pl-2"
            )}
          >
            {!sidebarOpen && (
              <Link href="/">
                <ThemeLogo className="h-6 w-6" />
              </Link>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild size="icon-sm" variant="outline">
                  <Link href={`/preview/${currentComponentId}`}>
                    <HugeiconsIcon className="size-4" icon={ViewIcon} />
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
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  size="icon-sm"
                  variant="outline"
                >
                  <HugeiconsIcon className="size-4" icon={SourceCodeIcon} />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="start">
                <p>Source Code</p>
              </TooltipContent>
            </Tooltip>
            <ThemeToggle variant="outline" />
          </div>
        </div>
        <div
          className="relative flex h-full max-h-screen flex-col items-center overflow-auto bg-background p-8 dark:bg-secondary [&:has(.no-padding)]:p-0"
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
