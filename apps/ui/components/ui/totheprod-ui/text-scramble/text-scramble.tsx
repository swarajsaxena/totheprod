"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TextScrambleProps {
  text: string
  className?: string
  charClassName?: string
  duration?: number
  scrambleSpeed?: number
  trigger?: boolean
  onComplete?: () => void
}

const RANDOM_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz"

const getRandomChar = (originalChar: string) => {
  // If original is uppercase letter, return uppercase random char
  if (/[A-Z]/.test(originalChar)) {
    return UPPERCASE_CHARS[Math.floor(Math.random() * UPPERCASE_CHARS.length)]
  }
  // If original is lowercase letter, return lowercase random char
  if (/[a-z]/.test(originalChar)) {
    return LOWERCASE_CHARS[Math.floor(Math.random() * LOWERCASE_CHARS.length)]
  }
  // For numbers and special chars, use full set
  return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]
}

export const TextScramble = ({
  text,
  className,
  charClassName,
  duration = 2000,
  scrambleSpeed = 50,
  trigger = true,
  onComplete,
}: TextScrambleProps) => {
  const [displayText, setDisplayText] = useState(
    text.split("").map((char) => (char === " " ? " " : getRandomChar(char))),
  )
  const revealedIndicesRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text.split(""))
      revealedIndicesRef.current = new Set(text.split("").map((_, i) => i))
      return
    }

    const chars = text.split("")
    const revealDelay = duration / chars.length

    // Initialize with random characters
    setDisplayText(
      chars.map((char) => (char === " " ? " " : getRandomChar(char))),
    )
    revealedIndicesRef.current = new Set()

    // Scramble interval - keeps updating non-revealed characters
    const scrambleInterval = setInterval(() => {
      setDisplayText((prev) =>
        prev.map((char, index) => {
          if (revealedIndicesRef.current.has(index)) {
            return char // Keep revealed characters
          }
          return chars[index] === " " ? " " : getRandomChar(chars[index])
        }),
      )
    }, scrambleSpeed)

    // Reveal timeouts - reveal each character sequentially
    const timeouts: NodeJS.Timeout[] = []

    chars.forEach((char, index) => {
      const timeout = setTimeout(() => {
        revealedIndicesRef.current.add(index)
        setDisplayText((prev) => {
          const newText = [...prev]
          newText[index] = char
          return newText
        })

        // Check if all characters are revealed
        if (index === chars.length - 1) {
          clearInterval(scrambleInterval)
          onComplete?.()
        }
      }, index * revealDelay)

      timeouts.push(timeout)
    })

    return () => {
      clearInterval(scrambleInterval)
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [text, duration, scrambleSpeed, trigger, onComplete])

  // Group characters into words for rendering
  const words: { chars: string[]; indices: number[] }[] = []
  let currentWord: { chars: string[]; indices: number[] } = {
    chars: [],
    indices: [],
  }

  displayText.forEach((char, index) => {
    if (char === " ") {
      if (currentWord.chars.length > 0) {
        words.push(currentWord)
        currentWord = { chars: [], indices: [] }
      }
      // Add space as its own word
      words.push({ chars: [" "], indices: [index] })
    } else {
      currentWord.chars.push(char)
      currentWord.indices.push(index)
    }
  })

  // Don't forget the last word if there's no trailing space
  if (currentWord.chars.length > 0) {
    words.push(currentWord)
  }

  return (
    <div className={cn("flex flex-wrap", className)}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="inline-flex whitespace-nowrap">
          {word.chars.map((char, charIndex) => (
            <div
              key={word.indices[charIndex]}
              className={cn("inline-block", charClassName)}
              style={{
                minWidth: char === " " ? "0.25em" : undefined,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
