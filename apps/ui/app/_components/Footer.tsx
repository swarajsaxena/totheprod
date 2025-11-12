import { cn } from "@/lib/utils"
import { GithubIcon, NewTwitterIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { contentMap } from "../components/[id]/constants"
import { CornerPlus } from "@/components/internal/CornerPlus"
import { ThemeLogo } from "@/components/internal/ThemeLogo"

export const Footer = () => {
  const componentsUrl = `/components/${contentMap[0].items[0].id}`
  return (
    <div className="relative flex w-full flex-col gap-4 border-b border-dashed bg-secondary/20 px-4 dark:bg-background/20">
      <div className="relative mx-auto flex h-96 w-full max-w-6xl flex-col items-center justify-center gap-2 border-x border-dashed font-heading text-xl">
        <CornerPlus variant="leftTop" />
        <CornerPlus variant="rightTop" />
        <div className="absolute inset-0 z-0 flex h-full w-full select-none items-center justify-between overflow-hidden">
          <ThemeLogo className="-translate-x-1/5 aspect-square h-full scale-125 opacity-20 dark:opacity-10" />
          <ThemeLogo className="aspect-square h-full translate-x-1/5 rotate-180 scale-125 opacity-20 dark:opacity-10" />
        </div>
        <div className="z-1 flex items-center gap-4 font-archivo text-muted-foreground text-sm *:transition-all *:hover:text-foreground">
          <Link href={componentsUrl}>Components</Link>
          <Link href="https://x.com/totheprod" target="_blank">
            <HugeiconsIcon icon={NewTwitterIcon} className="size-4" />
          </Link>
          <Link href="https://github.com/ToTheProd/ui" target="_blank">
            <HugeiconsIcon icon={GithubIcon} className="size-4" />
          </Link>
        </div>
        <div className="font-bold text-4xl">ToTheProd</div>
      </div>
    </div>
  )
}
