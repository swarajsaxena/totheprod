"use client"

import { useAtom } from "jotai"
import { useParams } from "next/navigation"
import { useCallback, useEffect } from "react"
import { locationAtom } from "@/store/atoms"

export const useDetailsOpen = () => {
  const [loc, setLoc] = useAtom(locationAtom)
  const currentId = useParams().id

  const detailsOpen = loc.searchParams?.get("documentation") === "true"

  const setDetailsOpen = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      setLoc((prevLoc) => {
        const currentOpen =
          prevLoc.searchParams?.get("documentation") === "true"
        const newValue =
          typeof value === "function" ? value(currentOpen) : value
        const newSearchParams = new URLSearchParams(prevLoc.searchParams || "")

        if (newValue) {
          newSearchParams.set("documentation", "true")
        } else {
          newSearchParams.delete("documentation")
        }

        return {
          ...prevLoc,
          searchParams: newSearchParams,
        }
      })
    },
    [setLoc]
  )

  useEffect(() => {
    if (!currentId && detailsOpen) {
      setDetailsOpen(false)
    }
  }, [currentId, detailsOpen, setDetailsOpen])

  return [detailsOpen, setDetailsOpen] as const
}
