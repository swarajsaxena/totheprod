"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type TtpCursorCometProps = {
  className?: string
  rowAndColCount?: number
  cometRadius?: number
  trailFadeSpeed?: number
  radialOpacityFade?: number
  symbols?: string[]
}

type BoxState = {
  opacity: number
  timestamp: number
  distance: number
  centerCol: number
  centerRow: number
  isActive: boolean
  symbol: string
}

export const TtpCursorComet = ({
  className,
  rowAndColCount = 30,
  cometRadius = 4,
  trailFadeSpeed = 0.03,
  radialOpacityFade = 0,
  symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "-", "+", ";", "{", "}"],
}: TtpCursorCometProps) => {
  const [boxStates, setBoxStates] = useState<Record<string, BoxState>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastHoveredBoxRef = useRef<{ row: number; col: number } | null>(null)

  const getRandomSymbol = (): string => {
    return symbols[Math.floor(Math.random() * symbols.length)]
  }

  // Fade out trail effect - both opacity and radius shrink
  useEffect(() => {
    const fadeTrail = () => {
      setBoxStates((prevStates) => {
        const newStates: Record<string, BoxState> = {}

        // biome-ignore lint/complexity/noForEach: Animation state updates require forEach for clarity
        Object.entries(prevStates).forEach(([key, state]) => {
          const [rowStr, colStr] = key.split("-")
          const row = Number.parseInt(rowStr, 10)
          const col = Number.parseInt(colStr, 10)

          // Calculate current distance from the original center
          const currentDistance = Math.sqrt(
            (col - state.centerCol) ** 2 + (row - state.centerRow) ** 2
          )

          // Reduce opacity
          const newOpacity = state.opacity - trailFadeSpeed

          // Calculate shrinking radius based on opacity
          // As opacity decreases, the effective radius shrinks proportionally
          const effectiveRadius = cometRadius * (newOpacity / 1)

          // Keep the box only if it's within the shrinking radius and still has opacity
          if (newOpacity > 0 && currentDistance <= effectiveRadius) {
            newStates[key] = {
              opacity: newOpacity,
              timestamp: state.timestamp,
              distance: state.distance,
              centerCol: state.centerCol,
              centerRow: state.centerRow,
              isActive: false, // Trail boxes are not active
              symbol: state.symbol, // Keep the same symbol
            }
          }
        })

        return newStates
      })

      animationFrameRef.current = requestAnimationFrame(fadeTrail)
    }

    animationFrameRef.current = requestAnimationFrame(fadeTrail)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [trailFadeSpeed, cometRadius])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return
    }

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const boxWidth = rect.width / rowAndColCount
    const boxHeight = rect.height / rowAndColCount

    // Calculate which box is being hovered
    const hoveredCol = Math.floor(x / boxWidth)
    const hoveredRow = Math.floor(y / boxHeight)

    if (
      hoveredCol < 0 ||
      hoveredCol >= rowAndColCount ||
      hoveredRow < 0 ||
      hoveredRow >= rowAndColCount
    ) {
      return
    }

    const timestamp = Date.now()

    // Check if we've moved to a different box
    const hasMovedBox =
      !lastHoveredBoxRef.current ||
      lastHoveredBoxRef.current.row !== hoveredRow ||
      lastHoveredBoxRef.current.col !== hoveredCol

    // Update the last hovered box reference
    if (hasMovedBox) {
      lastHoveredBoxRef.current = { row: hoveredRow, col: hoveredCol }
    }

    // Calculate which boxes fall within the radius and merge with existing trail
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complex animation logic required for cursor comet effect
    setBoxStates((prevStates) => {
      const newBoxStates: Record<string, BoxState> = { ...prevStates }

      // First, mark all existing boxes as inactive (trailing)
      // biome-ignore lint/complexity/noForEach: State mutation pattern requires forEach
      Object.keys(newBoxStates).forEach((key) => {
        if (newBoxStates[key]) {
          newBoxStates[key] = { ...newBoxStates[key], isActive: false }
        }
      })

      for (let row = 0; row < rowAndColCount; row++) {
        for (let col = 0; col < rowAndColCount; col++) {
          // Calculate distance from hovered box center to current box center
          const distance = Math.sqrt(
            (col - hoveredCol) ** 2 + (row - hoveredRow) ** 2
          )

          // If within radius, calculate opacity based on distance
          if (distance <= cometRadius) {
            // Calculate opacity: if radialOpacityFade is 0, all boxes get full opacity
            // Otherwise, opacity decreases from 1 (center) to 0 (edge)
            const opacity =
              radialOpacityFade === 0
                ? 1
                : 1 - (distance / cometRadius) * radialOpacityFade
            const key = `${row}-${col}`

            // Update box state, keeping the higher opacity if it already exists
            // Only generate new symbol if we moved to a new box
            newBoxStates[key] = {
              opacity: Math.max(opacity, prevStates[key]?.opacity ?? 0),
              timestamp,
              distance,
              centerCol: hoveredCol,
              centerRow: hoveredRow,
              isActive: true, // Active comet boxes show symbols
              symbol: hasMovedBox
                ? getRandomSymbol() // Generate new symbol only when moved to new box
                : (prevStates[key]?.symbol ?? getRandomSymbol()), // Keep existing or generate if new
            }
          }
        }
      }

      return newBoxStates
    })
  }

  const handleMouseLeave = () => {
    // Don't clear immediately, let the trail fade naturally
    lastHoveredBoxRef.current = null
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Mouse tracking is for decorative animation effect
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: Decorative cursor comet effect
    <div
      className={cn(
        "absolute top-0 left-0 h-full w-full overflow-hidden",
        className
      )}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {Array.from({ length: rowAndColCount }).map((_, row) => (
        <div className="flex flex-1 flex-row" key={row}>
          {Array.from({ length: rowAndColCount }).map((_, col) => {
            const key = `${row}-${col}`
            const boxState = boxStates[key]

            return (
              <motion.div
                animate={{
                  opacity: boxState?.opacity ?? 0,
                  backgroundColor: boxState
                    ? "var(--background)"
                    : "transparent",
                }}
                className="flex aspect-square h-[unset] flex-1 select-none items-center justify-center font-mono text-foreground text-sm"
                initial={{ opacity: 0, backgroundColor: "transparent" }}
                key={col}
                transition={{
                  opacity: { duration: 0, ease: "easeOut" },
                  backgroundColor: { duration: 0, ease: "easeOut" },
                }}
              >
                {boxState?.symbol}
              </motion.div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
