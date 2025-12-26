"use client"

import { useHotkeys } from "react-hotkeys-hook"
import { useDetailsOpen } from "./use-details-open"

export const useGlobalShortcuts = () => {
  const [, setDetailsOpen] = useDetailsOpen()

  // shift+meta+d for toggling the details panel
  useHotkeys(
    "shift+meta+d",
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
