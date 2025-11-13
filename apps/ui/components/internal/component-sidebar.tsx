"use client"

import { SidebarLeft01FreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useAtom } from "jotai"
import { motion } from "motion/react"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useState } from "react"
import { contentMap } from "@/app/components/[id]/constants"
import {
  RaunoSidebar,
  RaunoSidebarItem,
  RaunoSidebarSection,
  RaunoSidebarSectionHeader,
} from "@/components/ui/totheprod-ui/rauno-sidebar/rauno-sidebar"
import { cn } from "@/lib/utils"
import { sidebarOpenAtom } from "@/store/atoms"
import { buttonVariants } from "../ui/button"
import { CornerPlus } from "./corner-plus"
import { ThemeLogo } from "./theme-logo"

const ComponentSidebar = () => {
  const params = useParams()
  const currentId = params?.id as string
  const [isHovered, setIsHovered] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom)
  const getXPosition = () => {
    if (sidebarOpen) {
      return 0
    }
    if (isHovered) {
      return -70
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
      <motion.button
        className={cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "-right-6 absolute top-12 rotate-180 bg-background dark:bg-secondary",
          (sidebarOpen || isHovered) && "top-2 right-2 rotate-0"
        )}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <HugeiconsIcon className="size-4" icon={SidebarLeft01FreeIcons} />
      </motion.button>

      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Mouse handlers for hover effects only */}
      {/* biome-ignore lint/a11y/useSemanticElements: Complementary role is appropriate for sidebar container */}
      <div
        aria-label="Component navigation sidebar"
        className="flex h-full flex-col justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="complementary"
      >
        <div className="flex w-full items-center justify-between p-3 text-muted-foreground text-xs">
          <Link href="/">
            <ThemeLogo className="h-6 w-6" layoutId="logo" />
          </Link>

          {!sidebarOpen && (
            <div className="-translate-y-1/2 -rotate-90 absolute top-1/2 right-0 translate-x-1/2 border border-dashed bg-background px-3 py-1 text-sm dark:bg-secondary">
              <CornerPlus variant="leftCenter" />
              <CornerPlus variant="rightCenter" />
              Sidebar
            </div>
          )}
        </div>
        <RaunoSidebar className="my-auto">
          {contentMap.map((section, sectionIndex) => (
            <RaunoSidebarSection
              isLast={sectionIndex === contentMap.length - 1}
              key={section.section}
            >
              <RaunoSidebarSectionHeader>
                {section.section}
              </RaunoSidebarSectionHeader>
              {section.items.map((item, itemIndex) => (
                <RaunoSidebarItem
                  href={`/components/${item.id}`}
                  isActive={currentId === item.id}
                  isLast={itemIndex === section.items.length - 1}
                  key={item.id}
                >
                  {item.title}
                </RaunoSidebarItem>
              ))}
            </RaunoSidebarSection>
          ))}
        </RaunoSidebar>
      </div>
    </motion.div>
  )
}

export default React.memo(ComponentSidebar)
