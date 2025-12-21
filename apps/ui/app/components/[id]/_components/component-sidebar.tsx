"use client"

import {
  Copy01Icon,
  Search01FreeIcons,
  SidebarLeft01FreeIcons,
  SourceCodeIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useAtom } from "jotai"
import { motion } from "motion/react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { contentMap } from "@/app/components/[id]/constants"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTtpCommandPaletteState } from "@/components/ui/totheprod-ui/ttp-command-palette"
import {
  TtpTickerSidebar,
  TtpTickerSidebarItem,
  TtpTickerSidebarSection,
  TtpTickerSidebarSectionHeader,
} from "@/components/ui/totheprod-ui/ttp-ticker-sidebar"
import { cn } from "@/lib/utils"
import { detailsOpenAtom, sidebarOpenAtom } from "@/store/atoms"
import { CornerPlus } from "../../../../components/internal/corner-plus"
import { ThemeLogo } from "../../../../components/internal/theme-logo"

export const ComponentSidebar = () => {
  const params = useParams()
  const currentId = (params?.id as string) || ""
  const [isHovered, setIsHovered] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom)

  useHotkeys(
    "mod+b",
    (e) => {
      e.preventDefault()
      setSidebarOpen((prev) => !prev)
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
      enabled: true,
      preventDefault: true,
    },
    [setSidebarOpen]
  )

  const getXPosition = () => {
    if (sidebarOpen) {
      return 0
    }
    if (isHovered) {
      return -68
    }
    return "-95%"
  }

  return (
    <motion.div
      animate={{
        x: getXPosition(),
        transition: {
          // duration: 0.3,
          type: "tween",
          ease: [0.262, -0.001, 0, 0.992],
        },
      }}
      className={cn(
        "-translate-y-1/2 absolute top-1/2 left-0 z-20 flex h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] flex-col justify-center rounded-r-lg border border-dashed bg-background/80 fill-card pl-16 shadow-lg backdrop-blur-sm dark:bg-background/80",
        sidebarOpen &&
          "relative top-0 right-0 h-full max-h-full translate-y-0 rounded-none border-y-0 border-l-0 bg-background pl-0 shadow-none dark:bg-background"
      )}
      initial={{ x: sidebarOpen ? 0 : "-100%" }}
    >
      <SidebarTools
        className={cn(
          "dark:bg-background dark:text-muted-foreground",
          (isHovered || sidebarOpen) && "pointer-events-none opacity-0"
        )}
        currentId={currentId}
      />

      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Mouse handlers for hover effects only */}
      {/* biome-ignore lint/a11y/useSemanticElements: Complementary role is appropriate for sidebar container */}
      <div
        aria-label="Component navigation sidebar"
        className="flex h-full flex-col justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="complementary"
      >
        <div className="flex w-full items-center justify-between border-b border-dashed p-3 text-muted-foreground text-xs">
          <Link href="/">
            <ThemeLogo className="h-6 w-6" layoutId="logo" />
          </Link>
          <SidebarTools
            className={cn(
              "relative top-0 right-0 translate-x-0 border-none p-0",
              !(isHovered || sidebarOpen) && "pointer-events-none opacity-0"
            )}
            currentId={currentId}
          />

          {!sidebarOpen && (
            <div className="-translate-y-1/2 -rotate-90 absolute top-1/2 right-0 translate-x-1/2 border border-dashed bg-background px-3 py-1 text-sm dark:bg-secondary">
              <CornerPlus variant="leftCenter" />
              <CornerPlus variant="rightCenter" />
              Sidebar
            </div>
          )}
        </div>
        <TtpTickerSidebar className="mb-auto p-0" sectionDividersLength={0}>
          {contentMap.map((section, sectionIndex) => (
            <TtpTickerSidebarSection
              className="group relative border-t border-dashed px-4 py-4 first:border-t-0 last:border-b"
              isLast={sectionIndex === contentMap.length - 1}
              key={section.section}
            >
              {/* <CornerPlus variant="rightTop" />
              <CornerPlus
                className="hidden group-last:block"
                variant="rightBottom"
              /> */}
              <TtpTickerSidebarSectionHeader>
                {section.section}
              </TtpTickerSidebarSectionHeader>
              {section.items
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((item, itemIndex) => (
                  <TtpTickerSidebarItem
                    href={`/components/${item.id}`}
                    isActive={currentId === item.id}
                    isLast={itemIndex === section.items.length - 1}
                    key={item.id}
                  >
                    {item.title}
                  </TtpTickerSidebarItem>
                ))}
            </TtpTickerSidebarSection>
          ))}
        </TtpTickerSidebar>
      </div>
    </motion.div>
  )
}

type SidebarToolsProps = {
  currentId: string
  className?: string
}

const SidebarTools = ({ currentId, className }: SidebarToolsProps) => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom)
  const [detailsOpen, setDetailsOpen] = useAtom(detailsOpenAtom)
  const [isHovered, setIsHovered] = useState(false)
  const { open, setOpen } = useTtpCommandPaletteState()
  const handleToggleCommandMenu = () => {
    setOpen(!open)
  }
  return (
    <motion.div
      className={cn(
        "absolute top-2 right-2 z-30 flex translate-x-full items-center justify-between gap-2 rounded-lg border border-dashed bg-background p-2 transition-all dark:bg-secondary",
        className
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            size="icon-sm"
            variant="outline"
          >
            <HugeiconsIcon className="size-4" icon={SidebarLeft01FreeIcons} />
          </Button>
        </TooltipTrigger>
        <TooltipContent align="start">
          <p>Toggle sidebar</p>
        </TooltipContent>
      </Tooltip>
      {/* {!sidebarOpen && (
          <Link href="/">
            <ThemeLogo className="h-6 w-6" />
          </Link>
        )} */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild size="icon-sm" variant="outline">
            <Link href={`/preview/${currentId}`}>
              <HugeiconsIcon className="size-4" icon={ViewIcon} />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent align="start">
          <p>Preview</p>
        </TooltipContent>
      </Tooltip>
      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Mouse handlers for hover effects only */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: Static element is appropriate for sidebar container */}
      <div
        className={cn("relative")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Button
          className="text-xs"
          onClick={() => setDetailsOpen(!detailsOpen)}
          size="icon-sm"
          variant="outline"
        >
          <HugeiconsIcon className="size-4" icon={SourceCodeIcon} />
        </Button>
        <div
          className={cn(
            "-top-[5px] -left-[5px] pointer-events-none absolute flex flex-col gap-1 rounded-xl border border-dashed bg-background p-1 opacity-0",
            isHovered && "pointer-events-auto opacity-100"
          )}
        >
          <Button
            className="justify-start text-xs"
            onClick={() => setDetailsOpen(!detailsOpen)}
            size="icon-sm"
            variant="outline"
          >
            <HugeiconsIcon className="size-4" icon={SourceCodeIcon} />
            View Code
          </Button>
          <Button
            className="justify-start text-xs"
            onClick={() => setDetailsOpen(!detailsOpen)}
            size="icon-sm"
            variant="outline"
          >
            <HugeiconsIcon className="size-4" icon={Copy01Icon} />
            Copy Source Code
          </Button>
        </div>
      </div>
      <Button
        onClick={handleToggleCommandMenu}
        size="icon-sm"
        variant="outline"
      >
        <HugeiconsIcon className="size-4" icon={Search01FreeIcons} />
      </Button>
    </motion.div>
  )
}
