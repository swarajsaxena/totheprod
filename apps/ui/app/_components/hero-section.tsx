"use client"

import { ArrowRightIcon } from "@hugeicons/core-free-icons"
import Link from "next/link"
import { CornerPlus } from "@/components/internal/corner-plus"
import CtaCopyButton from "@/components/internal/cta-copy-button"
import PreviewHeading from "@/components/internal/preview-heading"
import { HorizontalTextReveal } from "@/components/ui/totheprod-ui/ttp-horizontal-text-reveal"
import { WavyButton } from "@/components/ui/totheprod-ui/wavy-button"
import { contentMap } from "../components/[id]/constants"

export const HeroSection = () => {
  return (
    <div className="flex flex-col items-center px-4">
      <div className="sticky top-8 flex w-full max-w-6xl flex-1 flex-col items-center justify-between gap-1 border-x border-dashed">
        <div className="-translate-x-1/2 absolute top-[calc(50vh-10rem)] left-1/2 w-full border-y border-dashed p-6">
          <CornerPlus variant="leftTop" />
          <CornerPlus variant="rightTop" />
          <CornerPlus variant="rightBottom" />
          <CornerPlus variant="leftBottom" />
          <PreviewHeading
            description="Where design meets functionality ~ By @ToTheProd for the PROD"
            title="Scroll down!"
          />
        </div>
        <HorizontalTextReveal
          className="sticky top-[calc(50vh-15rem)] flex h-max flex-wrap gap-3 pb-4 font-semibold! text-9xl leading-none"
          containerClassName="font-heading text-foreground mx-auto flex max-w-full flex-wrap px-4 text-9xl leading-none min-h-[500vh] font-black!"
          scrollContainerId="body-scroll-container"
          scrollOffset={["start 0", "end 0.9"]}
          text="Components that Ship and not just look good."
        />
        <div className="mb-[25vh] flex w-full gap-2 p-4">
          <CtaCopyButton text="npx shadcn add ui.totheprod.dev/ttp-raycast-command-menu" />
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
