"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { cn } from "@/lib/utils"

type TtpWavyTextProps = {
  /**
   * The text to display
   */
  text: string
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string
  /**
   * Additional CSS classes to apply to the text
   */
  textClassName?: string
  /**
   * The base delay for the animation
   */
  baseDelay?: number
  /**
   * Horizontal direction (default: towards-ends)
   */
  horizontalDirection?: "towards-ends" | "towards-center"
  /**
   * The duration of the animation
   */
  duration?: number
  /**
   * Whether the text is hovered
   */
  isHovered?: boolean
  /**
   * Set the hover state
   */
  setIsHovered?: (isHovered: boolean) => void
}

/**
 * WavyText - A wavy text component
 *
 * A component that displays a text with a wavy animation.
 *
 * @example
 * ```tsx
 * <WavyText text="Hello" />
 * ```
 */
export const TtpWavyText = ({
  text,
  className,
  textClassName,
  baseDelay = 0.05,
  horizontalDirection = "towards-ends",
  duration = 0.4,
  isHovered: _isHovered,
  setIsHovered: _setIsHovered,
}: TtpWavyTextProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const textLength = text.length

  const getEnterDelay = (index: number) => {
    const distanceFromCenter = Math.abs(index - (textLength - 1) / 2)
    const maxDistance = (textLength - 1) / 2

    if (horizontalDirection === "towards-center") {
      return (maxDistance - distanceFromCenter) * baseDelay
    }

    return distanceFromCenter * baseDelay
  }

  const getExitDelay = (index: number) => {
    const distanceFromCenter = Math.abs(index - (textLength - 1) / 2)
    const maxDistance = (textLength - 1) / 2

    if (horizontalDirection === "towards-center") {
      // Exit from center to ends
      return distanceFromCenter * baseDelay
    }

    // Exit from ends to center
    return (maxDistance - distanceFromCenter) * baseDelay
  }

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: Hover effect for text animation
    // biome-ignore lint/a11y/noStaticElementInteractions: Decorative hover animation
    <div
      className={cn(
        "flex items-center overflow-hidden text-center font-bold",
        className
      )}
      onMouseEnter={() =>
        _setIsHovered ? _setIsHovered(true) : setIsHovered(true)
      }
      onMouseLeave={() =>
        _setIsHovered ? _setIsHovered(false) : setIsHovered(false)
      }
    >
      {text.split("").map((char, index) => {
        const enterDelay = getEnterDelay(index)
        const exitDelay = getExitDelay(index)

        return (
          <motion.div className={cn("relative leading-none")} key={index}>
            <motion.span
              animate={{ y: _isHovered || isHovered ? "-100%" : 0 }}
              className={cn(
                "inline-block text-4xl leading-none",
                textClassName
              )}
              initial={{ y: 0 }}
              transition={{
                duration,
                delay: _isHovered || isHovered ? enterDelay : exitDelay,
                ease: "backOut",
                type: "tween",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
            <motion.span
              animate={{ y: _isHovered || isHovered ? 0 : "95%" }}
              className={cn(
                "absolute top-0 left-0 inline-block text-4xl leading-none",
                textClassName
              )}
              initial={{ y: "95%" }}
              transition={{
                duration,
                delay: _isHovered || isHovered ? enterDelay : exitDelay,
                ease: "backOut",
                type: "tween",
              }}
            >
              {char}
            </motion.span>
          </motion.div>
        )
      })}
    </div>
  )
}
