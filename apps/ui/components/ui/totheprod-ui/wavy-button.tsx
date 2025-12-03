"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import type { VariantProps } from "class-variance-authority"
import type * as React from "react"
import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { TtpWavyText } from "@/components/ui/totheprod-ui/ttp-wavy-text"
import { cn } from "@/lib/utils"

interface WavyButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants>,
    React.ComponentProps<typeof TtpWavyText> {
  // biome-ignore lint/suspicious/noExplicitAny: Icon can be any React element or component
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
      className={cn(
        buttonVariants({ variant, size }),
        "overflow-hidden",
        className
      )}
      data-slot="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <TtpWavyText
        baseDelay={baseDelay}
        className="justify-center font-heading"
        duration={duration}
        horizontalDirection={horizontalDirection}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        text={text}
        textClassName={cn("font-medium text-sm", textClassName)}
      />
      {icon && (
        <HugeiconsIcon
          className={cn("size-4 transition-all hover:translate-x-1")}
          icon={icon}
        />
      )}
    </button>
  )
}
