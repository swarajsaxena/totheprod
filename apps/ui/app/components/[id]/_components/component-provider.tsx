"use client"

import { useSetAtom } from "jotai"
import { type ReactNode, useEffect } from "react"
import type { ComponentMetadata } from "@/lib/component-metadata"
import { currentComponentAtom, currentComponentMdxAtom } from "@/store/atoms"

type Props = {
  mdxDocs?: string
  componentData?: ComponentMetadata
  children: ReactNode
}

export const ComponentProvider = ({
  mdxDocs,
  componentData,
  children,
}: Props) => {
  const setCurrentMdx = useSetAtom(currentComponentMdxAtom)
  const setCurrentComponent = useSetAtom(currentComponentAtom)

  useEffect(() => {
    setCurrentMdx(mdxDocs)
    setCurrentComponent(componentData)

    // Cleanup on unmount
    return () => {
      setCurrentMdx(undefined)
      setCurrentComponent(undefined)
    }
  }, [mdxDocs, componentData, setCurrentMdx, setCurrentComponent])

  return <>{children}</>
}
