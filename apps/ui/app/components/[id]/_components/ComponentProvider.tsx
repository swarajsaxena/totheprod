'use client'

import { currentComponentMdxAtom } from '@/store/atoms'
import { useSetAtom } from 'jotai'
import { ReactNode, useEffect } from 'react'

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
