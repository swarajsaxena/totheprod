'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from 'lenis'

type LenisProviderProps = {
  children: ReactNode
  wrapperId?: string
}

export const LenisProvider = ({ children, wrapperId }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Find wrapper element if ID is provided
    const wrapper = wrapperId ? document.getElementById(wrapperId) : undefined

    // Initialize Lenis
    lenisRef.current = new Lenis({
      wrapper: wrapper as HTMLElement | undefined,
      content: wrapper as HTMLElement | undefined,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    // Animation frame loop
    const raf = (time: number) => {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenisRef.current?.destroy()
    }
  }, [wrapperId])

  return <>{children}</>
}
