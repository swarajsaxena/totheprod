"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type WordShufflerProps = {
  baseText?: string
  words?: string[]
  interval?: number
  letterSpacing?: number
  textClassName?: string
}

type LetterState = {
  char: string
  index: number
  id: string
  isCommon: boolean
  prevIndex?: number
  position: number
  prevPosition?: number
}

export const WordShuffler = ({
  baseText = "ToTheProd",
  words = ["Marketing", "SEO", "Analytics", "Content"],
  interval = 1000,
  letterSpacing = 10,
  textClassName,
}: WordShufflerProps) => {
  const stableWords = JSON.stringify(words)

  const [currentWord, setCurrentWord] = useState(0)
  const [letterStates, setLetterStates] = useState<LetterState[]>([])
  const [shouldFadeOut, setShouldFadeOut] = useState(false)
  const measureRef = useRef<HTMLSpanElement>(null)

  const measureLetterWidth = useCallback(
    (char: string): number => {
      if (!measureRef.current) {
        return 20
      }
      measureRef.current.textContent = char
      return measureRef.current.offsetWidth + letterSpacing
    },
    [letterSpacing]
  )

  const calculatePositions = useCallback(
    (text: string): number[] => {
      const positions: number[] = []
      let cumulativeWidth = 0

      // biome-ignore lint/complexity/noForEach: Accumulating positions requires forEach pattern
      text.split("").forEach((char) => {
        positions.push(cumulativeWidth)
        cumulativeWidth += measureLetterWidth(char)
      })

      return positions
    },
    [measureLetterWidth]
  )

  useEffect(() => {
    const currentText = stableWords[currentWord].toUpperCase()
    const prevText =
      stableWords[
        (currentWord - 1 + stableWords.length) % stableWords.length
      ].toUpperCase()

    const currentPositions = calculatePositions(currentText)
    const prevPositions = calculatePositions(prevText)

    // Track occurrence count for each character
    const getOccurrenceCount = (text: string, targetIndex: number): number => {
      const char = text[targetIndex]
      let count = 0
      for (let i = 0; i <= targetIndex; i++) {
        if (text[i] === char) {
          // biome-ignore lint/nursery/noIncrementDecrement: Simple counter increment is clearer here
          count++
        }
      }
      return count
    }

    // Track which letters from previous word have been used
    const prevLettersUsed = new Array(prevText.length).fill(false)
    const newLetterStates: LetterState[] = []

    // Map current word letters
    currentText.split("").forEach((char, index) => {
      const currentOccurrence = getOccurrenceCount(currentText, index)

      // First check if letter at same position
      if (prevText[index] === char) {
        prevLettersUsed[index] = true
        newLetterStates.push({
          char,
          index,
          id: `static-${char}-${currentOccurrence}-${index}`,
          isCommon: true,
          prevIndex: index,
          position: currentPositions[index],
          prevPosition: prevPositions[index],
        })
      } else {
        // Find matching letter in previous word that hasn't been used yet
        const prevIndex = prevText
          .split("")
          .findIndex(
            (prevChar, pIdx) => prevChar === char && !prevLettersUsed[pIdx]
          )

        if (prevIndex !== -1) {
          // Letter exists in different position - slide horizontally
          prevLettersUsed[prevIndex] = true
          newLetterStates.push({
            char,
            index,
            id: `slide-${char}-occ${currentOccurrence}-${prevIndex}-to-${index}`,
            isCommon: false,
            prevIndex,
            position: currentPositions[index],
            prevPosition: prevPositions[prevIndex],
          })
        } else {
          // This is a new letter - slide in from top
          newLetterStates.push({
            char,
            index,
            id: `${currentWord}-${char}-occ${currentOccurrence}-new-${index}`,
            isCommon: false,
            position: currentPositions[index],
          })
        }
      }
    })

    setLetterStates(newLetterStates)
  }, [currentWord, stableWords, calculatePositions])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWord((prev) => {
        const nextWord = prev + 1
        // Check if we've completed one full cycle
        if (nextWord >= stableWords.length) {
          setShouldFadeOut(true)
          return prev // Stay on last word
        }
        return nextWord
      })
    }, interval)
    return () => clearInterval(timer)
  }, [stableWords.length, interval])

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        animate={{ opacity: shouldFadeOut ? 0 : 1 }}
        className="absolute inset-0 flex items-center justify-start gap-2 bg-secondary px-16 font-black font-inter text-6xl"
        initial={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Hidden span for measuring letter widths */}
        <span
          aria-hidden="true"
          className="invisible absolute font-black text-5xl uppercase"
          ref={measureRef}
        />

        <motion.div className="relative flex items-center justify-center gap-4">
          <span>{baseText}</span>•
          <div className={cn("relative h-[1.2em] text-primary", textClassName)}>
            {letterStates.map((letter) =>
              letter.isCommon ? (
                // Same position - stay static but fade out on exit
                <motion.span
                  animate={{ opacity: 1 }}
                  className="-translate-y-1/2 absolute top-1/2 uppercase"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 1 }}
                  key={letter.id}
                  style={{ left: letter.position }}
                  transition={{ duration: 0.3 }}
                >
                  {letter.char}
                </motion.span>
              ) : (
                <motion.span
                  animate={{
                    left: letter.position,
                    opacity: 1,
                  }}
                  className="-translate-y-1/2 absolute top-1/2 uppercase"
                  exit={{
                    opacity: 0,
                  }}
                  initial={
                    letter.prevPosition !== undefined
                      ? {
                          // Different position - start from previous position
                          left: letter.prevPosition,
                          opacity: 1,
                        }
                      : {
                          // New letter - slide in from top
                          left: letter.position,
                          opacity: 0,
                        }
                  }
                  key={letter.id}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                >
                  {letter.char}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
