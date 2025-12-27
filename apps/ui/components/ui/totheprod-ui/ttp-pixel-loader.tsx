"use client"

import { motion } from "motion/react"
import { useMemo } from "react"

type PixelLoaderProps = {
  /**
   * The number of rows to display (default is 25)
   */
  rows?: number
  /**
   * The number of columns to display (default is 25)
   */
  columns?: number
  /**
   * The duration of the animation (default is 0.1 seconds)
   */
  duration?: number
  /**
   * The delay of the animation (default is 0.5 seconds)
   */
  delay?: number
  /**
   * The amount of randomness to apply to the circumference (default is 0.3, which is ±15%)
   */
  randomness?: number
}

export const PixelLoader = ({
  rows = 25,
  columns = 25,
  duration = 0,
  delay = 1,
  randomness = 0.3,
}: PixelLoaderProps) => {
  // Pick a random center point once
  const center = useMemo(
    () => ({
      row: Math.floor(Math.random() * rows),
      col: Math.floor(Math.random() * columns),
    }),
    [rows, columns]
  )

  // Calculate the maximum possible distance for normalization
  const maxDistance = useMemo(() => {
    return Math.sqrt(rows ** 2 + columns ** 2)
  }, [rows, columns])

  const getDelay = (row: number, col: number) => {
    // Calculate Euclidean distance from the center
    const distance = Math.sqrt(
      (row - center.row) ** 2 + (col - center.col) ** 2
    )
    // Normalize and apply delay
    const baseDelay = (distance / maxDistance) * delay
    // Add randomness to make the circumference less perfect
    const variation = (Math.random() - 0.5) * randomness
    return baseDelay * (1 + variation)
  }

  return (
    <div className="pointer-events-none absolute top-0 left-0 flex h-full w-full flex-col">
      {Array.from({ length: rows }).map((_, row) => (
        <div className="flex flex-1 flex-row" key={`row-${row}`}>
          {Array.from({ length: columns }).map((_, column) => (
            <motion.div
              animate={{ opacity: 0 }}
              className="h-[unset] flex-1 bg-foreground"
              initial={{ opacity: 1 }}
              key={`column-${column}`}
              transition={{ duration, delay: getDelay(row, column) }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
