'use client'

import PreviewHeading from '@/components/internal/PreviewHeading'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

const items = [
  { text: 'Content Creation', backgroundColor: '#FCB8FA' },
  { text: 'Social Media', backgroundColor: '#34C791' },
  { text: 'Email Marketing', backgroundColor: '#0F8DFF' },
  { text: 'Analytics', backgroundColor: '#FA5325' },
]

const StickyCard = ({
  i,
  text,
  backgroundColor,
  progress,
  range,
  targetScale,
}: {
  i: number
  text: string
  backgroundColor: string
  progress: any
  range: [number, number]
  targetScale: number
}) => {
  const scale = useTransform(progress, range, [1, targetScale])
  const rotateX = useTransform(progress, range, [0, 25])
  const rotateY = useTransform(progress, range, [0, i % 2 === 0 ? 10 : -10])
  const top = useTransform(progress, range, [0, 100])

  return (
    <div
      className="sticky top-16 flex items-center justify-center w-full"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{
          scale,
          rotateX,
          rotateY,
          backgroundColor,
          transformOrigin: 'top center',
          top,
        }}
        className="relative shadow-2xl flex h-[90vh] w-full rounded-3xl flex-col overflow-hidden items-center justify-center text-6xl font-bold text-white text-center will-change-transform"
      >
        <span className="absolute top-8 left-8">{text}</span>
        <span className="absolute bottom-8 right-8 text-[25vw] opacity-25">{i + 1}</span>
      </motion.div>
    </div>
  )
}

export const PerpectiveCarousel = () => {
  const scrollContainerId = 'preview-scroll-container'

  const scrollContainerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const container = document.getElementById(scrollContainerId)
    scrollContainerRef.current = container
  }, [scrollContainerId])

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
    container: scrollContainerRef,
  })

  return (
    <div className="bg-[#FAF4EC] no-padding px-8 flex w-full flex-col gap-16 items-center justify-start pb-[200vh]">
      <PreviewHeading
        className="py-[20vh]"
        title="Perspective Carousel"
        description="Scroll down to see the effect."
      />
      {items.map((item, i) => {
        const targetScale = 0.3
        return (
          <StickyCard
            key={`item_${i}`}
            i={i}
            {...item}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        )
      })}
    </div>
  )
}
