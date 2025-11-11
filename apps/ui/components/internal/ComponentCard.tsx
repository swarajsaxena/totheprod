"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { CornerPlus } from "./CornerPlus"

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
      href={`/components/${id}`}
      className="group relative flex-col gap-2 border-l border-dashed last:border-r"
    >
      <CornerPlus variant="leftTop" className="z-10" />
      <CornerPlus variant="leftBottom" className="" />
      <CornerPlus
        variant="rightBottom"
        className="z-10 hidden group-last:block"
      />
      <CornerPlus variant="rightTop" className="z-10 hidden group-last:block" />
      {/* <CornerPlus variant="rightTop" /> */}
      <div className="relative flex aspect-[1.54/1] overflow-hidden">
        <video
          src={`/component-videos/${id}${mounted && theme === "dark" ? "-dark" : ""}.mov`}
          autoPlay
          muted
          loop
          controls={false}
          className="h-full w-full scale-105 overflow-hidden object-cover"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-start justify-end bg-linear-to-bl from-transparent via-background/75 to-background p-6 font-medium transition-all group-hover:opacity-50">
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
