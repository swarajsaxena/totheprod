"use client"

import { CornerPlus } from "@/components/internal/CornerPlus"
import CtaCopyButton from "@/components/internal/CtaCopyButton"
import PreviewHeading from "@/components/internal/PreviewHeading"
import { HorizontalTextReveal } from "@/components/ui/totheprod-ui/horizontal-text-reveal/horizontal-text-reveal"
import { WavyButton } from "@/components/ui/totheprod-ui/wavy-button/wavy-button"
import { ArrowRightIcon } from "@hugeicons/core-free-icons"
import { contentMap } from "../components/[id]/constants"
import Link from "next/link"

export const HeroSection = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="sticky top-8 flex w-full max-w-6xl flex-1 flex-col items-center justify-between gap-1 border-x border-dashed">
        <div className="-translate-x-1/2 absolute top-[calc(50vh-10rem)] left-1/2 w-full border-y border-dashed p-6">
          <CornerPlus variant="leftTop" />
          <CornerPlus variant="rightTop" />
          <CornerPlus variant="rightBottom" />
          <CornerPlus variant="leftBottom" />
          <PreviewHeading
            title="Scroll down!"
            description="Where design meets functionality ~ By @ToTheProd for the PROD"
          />
        </div>
        <HorizontalTextReveal
          scrollContainerId="body-scroll-container"
          text="Components that Ship and not just look good."
          className="sticky top-[calc(50vh-15rem)] flex h-max flex-wrap gap-3 pb-4 font-semibold! text-9xl leading-none"
          containerClassName="font-heading text-foreground mx-auto flex max-w-full flex-wrap px-4 text-9xl leading-none min-h-[500vh] font-black!"
          scrollOffset={["start 0", "end 0.9"]}
        />
        <div className="mb-[25vh] flex w-full gap-2 p-4">
          <CtaCopyButton text="npx shadcn add ui.totheprod.dev/raycast-command-menu" />
          <Link
            className="flex-1"
            href={`/components/${contentMap[0].items[0].id}`}
          >
            <WavyButton
              className="w-full"
              textClassName="text-xs uppercase"
              text="Components"
              variant="outline"
              icon={ArrowRightIcon}
            />
          </Link>
          <CornerPlus variant="leftBottom" />
          <CornerPlus variant="rightBottom" />
        </div>
      </div>
    </div>
  )
}
