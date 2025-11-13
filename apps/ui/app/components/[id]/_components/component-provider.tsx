"use client"

import { useSetAtom } from "jotai"
import { type ReactNode, useEffect } from "react"
import { currentComponentMdxAtom } from "@/store/atoms"

type Props = {
  mdxDocs?: string
  children: ReactNode
}

export const ComponentProvider = ({ mdxDocs, children }: Props) => {
  const setCurrentMdx = useSetAtom(currentComponentMdxAtom)

  useEffect(() => {
    setCurrentMdx(mdxDocs)

    // Cleanup on unmount
    return () => {
      setCurrentMdx(undefined)
    }
  }, [mdxDocs, setCurrentMdx])

  return <>{children}</>
}
