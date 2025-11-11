"use client"

import { buttonVariants } from "@/components/ui/button"
import { WavyText } from "@/components/ui/totheprod-ui/wavy-text/wavy-text"
import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { type VariantProps } from "class-variance-authority"
import * as React from "react"
import { useState } from "react"

interface WavyButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants>,
    React.ComponentProps<typeof WavyText> {
  icon?: any
}

/**
 * WavyButton - A button with wavy text animation
 *
 * A button component that displays text with a wavy animation on hover.
 *
 * @example
 * ```tsx
 * <WavyButton text="Click Me" variant="default" />
 * ```
 */
export const WavyButton = ({
  text,
  className,
  textClassName,
  variant,
  size,
  baseDelay = 0.01,
  horizontalDirection = "towards-ends",
  duration = 0.4,
  icon,
  ...props
}: WavyButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        "overflow-hidden",
        className,
      )}
      {...props}
    >
      <WavyText
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        text={text}
        textClassName={cn("font-medium text-sm", textClassName)}
        baseDelay={baseDelay}
        horizontalDirection={horizontalDirection}
        duration={duration}
        className="justify-center font-heading"
      />
      {icon && (
        <HugeiconsIcon
          icon={icon}
          className={cn("size-4 transition-all hover:translate-x-1")}
        />
      )}
    </button>
  )
}
