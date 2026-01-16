/** biome-ignore-all lint/a11y/noNoninteractiveElementInteractions: Mouse tracking is for decorative animation effect */
"use client"

import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type TtpDocumentNavigatorProps = {
  /** Additional CSS classes to apply to the container */
  className?: string
  /** The ID of the scroll container to use, defaults to "body", also used to get all the headings for that container */
  containerId?: string
}

const StyleMap = {
  H1: {
    barWidth: "w-4",
    text: "ml-0",
  },
  H2: {
    barWidth: "w-3",
    text: "ml-2",
  },
  H3: {
    barWidth: "w-2",
    text: "ml-4",
  },
  H4: {
    barWidth: "w-1",
    text: "ml-6",
  },
  H5: {
    barWidth: "w-1",
    text: "ml-6",
  },
  H6: {
    barWidth: "w-1",
    text: "ml-6",
  },
} as const

const getStyle = (heading: keyof typeof StyleMap) => {
  return StyleMap[heading]
}

export const TtpDocumentNavigator = ({
  className,
  containerId: scrollContainerId,
}: TtpDocumentNavigatorProps) => {
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([])
  const [isHovering, setisHovering] = useState(true)
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleScrollToHeading = (heading: HTMLHeadingElement) => {
    // Use ID to find the heading fresh from DOM (more reliable than stored reference)
    const headingId = heading.id
    const targetHeading = document.getElementById(headingId)

    if (!targetHeading) {
      console.warn(`Target heading with id "${headingId}" not found`)
      return
    }

    const offset = 100 // Offset from top of viewport/container

    if (scrollContainerId) {
      const scrollContainer = document.getElementById(scrollContainerId)

      if (!scrollContainer) {
        console.warn(
          `Scroll container with id "${scrollContainerId}" not found`
        )
        return
      }

      if (scrollContainer.contains(targetHeading)) {
        // Get the position of the target relative to the container
        const containerRect = scrollContainer.getBoundingClientRect()
        const targetRect = targetHeading.getBoundingClientRect()

        // Calculate the relative position
        const relativeTop =
          targetRect.top - containerRect.top + scrollContainer.scrollTop

        const scrollPosition = Math.max(0, relativeTop - offset)

        scrollContainer.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        })
      } else {
        console.warn(
          `Target heading "${headingId}" not found inside container "${scrollContainerId}"`
        )
      }
    } else {
      // Use scrollIntoView for simpler, more reliable scrolling
      const yOffset = -offset
      const y =
        targetHeading.getBoundingClientRect().top + window.scrollY + yOffset

      window.scrollTo({
        top: y,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    // Get the container element to scope heading queries
    const container = scrollContainerId
      ? document.getElementById(scrollContainerId)
      : document

    if (!container) {
      return
    }

    const headingElements = Array.from(
      container.querySelectorAll("h1, h2, h3, h4, h5, h6")
    ) as HTMLHeadingElement[]

    // Ensure each heading has an ID for tracking
    for (const [index, heading] of headingElements.entries()) {
      if (!heading.id) {
        heading.id = `heading-${index}`
      }
    }

    setHeadings(headingElements)

    // Create Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio that's intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          // Sort by intersection ratio (highest first) and then by position (topmost first)
          visibleEntries.sort((a, b) => {
            const ratioDiff = b.intersectionRatio - a.intersectionRatio
            if (Math.abs(ratioDiff) > 0.1) {
              return ratioDiff
            }
            // If ratios are similar, prefer the one closer to the top
            return a.boundingClientRect.top - b.boundingClientRect.top
          })

          const mostVisible = visibleEntries[0]
          if (mostVisible.target.id) {
            setActiveHeadingId(mostVisible.target.id)
          }
        } else {
          // If no headings are intersecting, find the one closest to the top
          const sortedByPosition = [...entries].sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
          const closest = sortedByPosition.find(
            (entry) => entry.boundingClientRect.top >= 0
          )
          if (closest?.target.id) {
            setActiveHeadingId(closest.target.id)
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px", // Trigger when heading is in the top 30% of viewport
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    // Observe all headings
    for (const heading of headingElements) {
      observerRef.current?.observe(heading)
    }

    // Cleanup
    return () => {
      for (const heading of headingElements) {
        observerRef.current?.unobserve(heading)
      }
      observerRef.current?.disconnect()
    }
  }, [scrollContainerId])

  return headings.length > 0 ? (
    <motion.div
      className={cn(
        "-translate-y-1/2 absolute top-1/2 right-4 z-50 flex h-max max-h-[75vh] w-max flex-col items-end overflow-y-auto shadow-none transition-all",
        isHovering &&
          "rounded-lg border border-border/25 bg-secondary py-2 pr-3 pl-3 shadow-xl",
        className
      )}
      onMouseLeave={() => setisHovering(false)}
    >
      {headings.map((heading) => {
        const isActive = heading.id === activeHeadingId
        return (
          <button
            aria-label={`Scroll to ${heading.textContent}`}
            className={cn(
              "group flex w-full cursor-pointer items-stretch justify-between outline-none!",
              isHovering && "pointer-events-auto"
            )}
            key={heading.id}
            onClick={() => handleScrollToHeading(heading)}
            onKeyDown={(e) => {
              if (!isHovering) {
                return
              }
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleScrollToHeading(heading)
              }
            }}
            tabIndex={0}
            type="button"
          >
            <motion.div
              animate={
                isHovering
                  ? { opacity: 1, height: "auto", width: "auto" }
                  : { opacity: 0, height: 0, width: 0 }
              }
              className={cn(
                "pointer-events-none mb-0.5 line-clamp-1 w-full max-w-[200px] flex-1 pl-2 text-left font-medium text-xs",
                isActive
                  ? "text-foreground/75 dark:text-foreground"
                  : "text-muted-foreground/50 dark:text-muted-foreground",
                isHovering &&
                  "pointer-events-auto group-hover:text-foreground/75 dark:group-hover:text-foreground",
                getStyle(heading.tagName as keyof typeof StyleMap).text
              )}
              initial={{ opacity: 0, x: -10, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {heading.textContent}
            </motion.div>
            {/** biome-ignore lint/a11y/noStaticElementInteractions: Decorative hover animation */}
            <div
              className="flex h-[unset] items-center justify-center py-1 pl-2"
              onMouseEnter={() => setisHovering(true)}
            >
              <div
                className={cn(
                  "h-[2px] rounded-full transition-colors",
                  isActive
                    ? "bg-foreground/75 dark:bg-foreground"
                    : "bg-muted-foreground/25 dark:bg-muted-foreground/50",
                  isHovering &&
                    "group-hover:bg-foreground/75 dark:group-hover:bg-foreground",
                  getStyle(heading.tagName as keyof typeof StyleMap).barWidth
                )}
              />
            </div>
          </button>
        )
      })}
    </motion.div>
  ) : null
}
