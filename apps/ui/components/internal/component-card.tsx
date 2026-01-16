"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { CornerPlus } from "./corner-plus"

type ComponentCardProps = {
  id: string
  title: string
  description?: string
}

export const ComponentCard = ({
  id,
  title,
  description,
}: ComponentCardProps) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Link
      className="group relative flex-col gap-2 border-l border-dashed last:border-r"
      href={`/components/${id}`}
    >
      <CornerPlus className="z-10" variant="leftTop" />
      <CornerPlus className="" variant="leftBottom" />
      <CornerPlus
        className="z-10 hidden group-last:block"
        variant="rightBottom"
      />
      <CornerPlus className="z-10 hidden group-last:block" variant="rightTop" />
      {/* <CornerPlus variant="rightTop" /> */}
      <div className="relative flex aspect-[1.54/1] overflow-hidden">
        <video
          autoPlay
          className="h-full w-full scale-105 overflow-hidden object-cover"
          controls={false}
          loop
          muted
          playsInline
          preload="metadata"
          src={`/component-videos/${id}${mounted && theme === "dark" ? "-dark" : ""}.webm`}
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-start justify-end bg-linear-to-bl from-transparent via-muted/75 to-muted p-6 font-medium transition-all group-hover:opacity-50">
        <p className="font-heading">{title}</p>
        {description && (
          <p className="max-w-3/4 text-muted-foreground text-xs">
            {description}
          </p>
        )}
      </div>
    </Link>
  )
}
