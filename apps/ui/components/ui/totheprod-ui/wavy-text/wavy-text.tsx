'use client'

import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { useState } from 'react'

interface WavyTextProps {
  /**
   * The text to display
   */
  text: string
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string
  /**
   * The base delay for the animation
   */
  baseDelay?: number

  /**
   * Horizontal direction (default: towards-ends)
   */
  horizontalDirection?: 'towards-ends' | 'towards-center'
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
export const WavyText = ({
  text,
  className,
  baseDelay = 0.05,
  horizontalDirection = 'towards-ends',
}: WavyTextProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const textLength = text.length

  const getDelay = (index: number) => {
    const distanceFromCenter = Math.abs(index - (textLength - 1) / 2)
    const maxDistance = (textLength - 1) / 2

    if (horizontalDirection === 'towards-center') {
      return (maxDistance - distanceFromCenter) * baseDelay
    }

    return distanceFromCenter * baseDelay
  }

  return (
    <div
      className={cn(
        'font-bold text-4xl text-center uppercase flex items-center overflow-hidden',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text.split('').map((char, index) => {
        const delay = getDelay(index)

        return (
          <motion.div key={index} className="relative">
            <motion.span
              className="inline-block leading-none"
              initial={{ y: 0 }}
              animate={{ y: isHovered ? '-100%' : 0 }}
              transition={{
                duration: 0.2,
                delay,
                ease: 'easeInOut',
              }}
            >
              {char}
            </motion.span>
            <motion.span
              className="inline-block leading-none absolute top-0 left-0"
              initial={{ y: '100%' }}
              animate={{ y: isHovered ? 0 : '100%' }}
              transition={{
                duration: 0.2,
                delay,
                ease: 'easeInOut',
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
