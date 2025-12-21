"use client"

import { useSetAtom } from "jotai"
import { type ReactNode, useEffect } from "react"
import type { ComponentMetadata } from "@/lib/component-metadata"
import { currentComponentAtom } from "@/store/atoms"

type Props = {
  componentData?: ComponentMetadata
  children: ReactNode
}

export const ComponentProvider = ({ componentData, children }: Props) => {
  const setCurrentComponent = useSetAtom(currentComponentAtom)

  useEffect(() => {
    setCurrentComponent(componentData)

    // Cleanup on unmount
    return () => {
      setCurrentComponent(undefined)
    }
  }, [componentData, setCurrentComponent])

  return <>{children}</>
}
