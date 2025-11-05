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
  horizontalDirection?: 'towards-ends' | 'towards-center'
  /**
   * The duration of the animation
   */
  duration?: number
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
  textClassName,
  baseDelay = 0.05,
  horizontalDirection = 'towards-ends',
  duration = 0.4,
}: WavyTextProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const textLength = text.length

  const getEnterDelay = (index: number) => {
    const distanceFromCenter = Math.abs(index - (textLength - 1) / 2)
    const maxDistance = (textLength - 1) / 2

    if (horizontalDirection === 'towards-center') {
      return (maxDistance - distanceFromCenter) * baseDelay
    }

    return distanceFromCenter * baseDelay
  }

  const getExitDelay = (index: number) => {
    const distanceFromCenter = Math.abs(index - (textLength - 1) / 2)
    const maxDistance = (textLength - 1) / 2

    if (horizontalDirection === 'towards-center') {
      // Exit from center to ends
      return distanceFromCenter * baseDelay
    }

    // Exit from ends to center
    return (maxDistance - distanceFromCenter) * baseDelay
  }

  return (
    <div
      className={cn('font-bold text-center flex items-center overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text.split('').map((char, index) => {
        const enterDelay = getEnterDelay(index)
        const exitDelay = getExitDelay(index)

        return (
          <motion.div key={index} className={cn('relative leading-none')}>
            <motion.span
              className={cn('text-4xl inline-block leading-none', textClassName)}
              initial={{ y: 0 }}
              animate={{ y: isHovered ? '-100%' : 0 }}
              transition={{
                duration,
                delay: isHovered ? enterDelay : exitDelay,
                ease: 'backOut',
                type: 'tween',
              }}
            >
              {char}
            </motion.span>
            <motion.span
              className={cn(
                'text-4xl inline-block absolute top-0 left-0 leading-none',
                textClassName
              )}
              initial={{ y: '95%' }}
              animate={{ y: isHovered ? 0 : '95%' }}
              transition={{
                duration,
                delay: isHovered ? enterDelay : exitDelay,
                ease: 'backOut',
                type: 'tween',
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
