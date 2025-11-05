'use client'

import { cn } from '@/lib/utils'
import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

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
   * The scroll container id to use
   */
  scrollContainerId: string

  /**
   * The overlap percentage
   */
  overlap?: number
}

export const HorizontalTextReveal = ({
  text,
  className,
  scrollContainerId,
  overlap = 0.3,
}: HorizontalFadeInProps) => {
  const scrollContainerRef = useRef<HTMLElement | null>(null)
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const container = document.getElementById(scrollContainerId)
    scrollContainerRef.current = container
  }, [scrollContainerId])

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const percentage = Math.round(latest * 100)
      setScrollPercentage(percentage)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  const words = text.split(' ')

  return (
    <div className={cn('w-full text-5xl font-medium', className)}>
      {words.map((word, index) => {
        const start = (index / words.length) * (1 - overlap)
        const end = ((index + 1) / words.length) * (1 - overlap) + overlap

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
      })}
    </div>
  )
}
