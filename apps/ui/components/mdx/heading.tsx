"use client"

import { Link02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { createElement, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type HeadingProps = {
  id?: string
  children: ReactNode
  className?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export const Heading = ({
  id,
  children,
  className,
  level = 2,
}: HeadingProps) => {
  const textContent = typeof children === "string" ? children : String(children)
  const slug = id || createSlug(textContent)

  const tagName = `h${level}`

  const sizeClasses = {
    1: "text-4xl font-bold",
    2: "text-3xl font-bold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-semibold",
    6: "text-base font-semibold",
  }

  const marginClasses = {
    1: "mt-10 mb-6",
    2: "mt-8 mb-4",
    3: "mt-6 mb-3",
    4: "mt-4 mb-2",
    5: "mt-3 mb-2",
    6: "mt-2 mb-1",
  }

  return createElement(
    tagName,
    {
      className: cn(
        "group relative scroll-mt-20",
        sizeClasses[level],
        marginClasses[level],
        className
      ),
      id: slug,
    },
    createElement(
      "a",
      {
        className: "inline-flex items-center gap-2 no-underline",
        href: `#${slug}`,
      },
      children,
      createElement(HugeiconsIcon, {
        className:
          "size-4 opacity-0 transition-opacity group-hover:opacity-100",
        icon: Link02Icon,
      })
    )
  )
}

export const H1 = (props: Omit<HeadingProps, "level">) => (
  <Heading {...props} level={1} />
)
export const H2 = (props: Omit<HeadingProps, "level">) => (
  <Heading {...props} level={2} />
)
export const H3 = (props: Omit<HeadingProps, "level">) => (
  <Heading {...props} level={3} />
)
export const H4 = (props: Omit<HeadingProps, "level">) => (
  <Heading {...props} level={4} />
)
export const H5 = (props: Omit<HeadingProps, "level">) => (
  <Heading {...props} level={5} />
)
export const H6 = (props: Omit<HeadingProps, "level">) => (
  <Heading {...props} level={6} />
)
