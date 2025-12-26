"use client"

import { useAtom } from "jotai"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useMemo } from "react"
import { locationAtom } from "@/store/atoms"

export const useDetailsOpen = () => {
  const [loc, setLoc] = useAtom(useMemo(() => locationAtom, []))
  const currentId = useParams().id

  const detailsOpen = loc.searchParams?.get("documentation") === "true"
  console.log("🚀 ~ useDetailsOpen ~ detailsOpen:", detailsOpen)

  const setDetailsOpen = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const newValue = typeof value === "function" ? value(detailsOpen) : value
      const newSearchParams = new URLSearchParams(loc.searchParams || "")

      if (newValue) {
        newSearchParams.set("documentation", "true")
      } else {
        newSearchParams.delete("documentation")
      }

      setLoc({
        ...loc,
        searchParams: newSearchParams,
      })
    },
    [detailsOpen, loc.searchParams, loc, setLoc]
  )

  useEffect(() => {
    if (!currentId) {
      setDetailsOpen(false)
    }
  }, [currentId, setDetailsOpen])

  return [detailsOpen, setDetailsOpen] as const
}
