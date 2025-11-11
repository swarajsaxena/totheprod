"use client"

import { useEffect, useRef } from "react"
import { type MotionValue, motion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Scroll offset types from Framer Motion
 * Based on: https://www.framer.com/motion/scroll-animations/##scroll-offsets
 */
type SupportedEdgeUnit = "px" | "vw" | "vh" | "%"
type EdgeUnit = `${number}${SupportedEdgeUnit}`
type NamedEdges = "start" | "end" | "center"
type EdgeString = NamedEdges | EdgeUnit | `${number}`
type Edge = EdgeString | number
type Intersection = `${Edge} ${Edge}`
type ProgressIntersection = [number, number]
type ScrollOffset = Array<Edge | Intersection | ProgressIntersection>

interface HorizontalFadeInProps {
  /**
   * The text to display
   */
  text: string
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string

  /**
   * Additional CSS classes to apply to the container wrapper
   */
  containerClassName?: string

  /**
   * The scroll container id to use
   */
  scrollContainerId?: string

  /**
   * The overlap percentage between word animations
   */
  overlap?: number

  /**
   * Scroll offset configuration [start, end]
   * - "start end" = element top hits viewport bottom
   * - "start start" = element top hits viewport top
   * - "start 0.5" = element top hits viewport center
   * - Custom values like ["start 100px", "end start"] for pixel offsets
   * @default ["start end", "end start"]
   */
  scrollOffset?: ScrollOffset
}

interface WordProps {
  word: string
  index: number
  scrollYProgress: MotionValue<number>
  start: number
  end: number
}

const Word = ({ word, index, scrollYProgress, start, end }: WordProps) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const translateX = useTransform(scrollYProgress, [start, end], [1000, 0])

  return (
    <motion.span
      key={index}
      className="inline-block pl-2"
      style={{
        opacity,
        translateX,
      }}
    >
      {word}
    </motion.span>
  )
}

export const HorizontalTextReveal = ({
  text,
  className,
  containerClassName,
  scrollContainerId,
  overlap = 0.3,
  scrollOffset = ["start end", "end start"],
}: HorizontalFadeInProps) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (scrollContainerId) {
      const container = document.getElementById(scrollContainerId)
      scrollContainerRef.current = container
    }
  }, [scrollContainerId])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: scrollContainerRef,
    offset: scrollOffset,
  })

  const words = text.split(" ")

  return (
    <div ref={targetRef} className={cn("w-full", containerClassName)}>
      <div className={cn("w-full font-medium text-5xl", className)}>
        {words.map((word, index) => {
          const start = (index / words.length) * (1 - overlap)
          const end = ((index + 1) / words.length) * (1 - overlap) + overlap

          return (
            <Word
              key={index}
              word={word}
              index={index}
              scrollYProgress={scrollYProgress}
              start={start}
              end={end}
            />
          )
        })}
      </div>
    </div>
  )
}
