"use client"

import { useHotkeys } from "react-hotkeys-hook"
import { useDetailsOpen } from "./use-details-open"

export const useGlobalShortcuts = () => {
  const [, setDetailsOpen] = useDetailsOpen()

  // shift+meta+d for toggling the details panel
  useHotkeys(
    "meta+b",
    (event) => {
      event.preventDefault()
      setDetailsOpen((prev) => !prev)
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
    }
  )
}
