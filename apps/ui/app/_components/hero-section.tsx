"use client"

import { ArrowRightIcon } from "@hugeicons/core-free-icons"
import Link from "next/link"
import { CornerPlus } from "@/components/internal/corner-plus"
import CtaCopyButton from "@/components/internal/cta-copy-button"
import { WavyButton } from "@/components/ui/totheprod-ui/wavy-button"
import { contentMap } from "../components/[id]/constants"

export const HeroSection = () => {
  return (
    <div className="flex flex-col items-center px-4">
      <div className="sticky top-8 flex w-full max-w-6xl flex-1 flex-col items-center justify-between gap-1 border-x border-dashed py-[15vh]">
        <div className="flex h-max flex-wrap gap-3 pb-4 font-semibold! text-5xl leading-none md:px-4 md:text-9xl">
          Components that Ship and not just look good.
        </div>
        <div className="flex w-full flex-col gap-2 md:flex-row md:p-4">
          <CtaCopyButton text="npx shadcn add ui.totheprod.dev/ttp-command-palette" />
          <Link
            className="flex-1"
            href={`/components/${contentMap[0].items[0].id}`}
          >
            <WavyButton
              className="w-full"
              icon={ArrowRightIcon}
              text="Components"
              textClassName="text-xs uppercase"
              variant="outline"
            />
          </Link>
          <CornerPlus variant="leftBottom" />
          <CornerPlus variant="rightBottom" />
        </div>
      </div>
    </div>
  )
}
