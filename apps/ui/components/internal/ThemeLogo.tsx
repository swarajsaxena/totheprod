import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import { ComponentProps, useEffect, useState } from "react"

export const ThemeLogo = (props: ComponentProps<typeof motion.img>) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // const { theme } = useTheme()

  // const effectiveTheme = mounted ? theme : "light"
  return (
    <motion.svg
      viewBox="0 0 217 217"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      alt="Logo"
      // src={effectiveTheme !== "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
      {...props}
      className={cn("h-6 text-foreground dark:text-primary", props.className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29 111.987V42.2122C29 33.5745 33.2764 25.4933 40.4283 20.6158L63.9541 4.57143C71.0457 -0.264963 80.0629 -1.33608 88.0961 1.70369L171.065 33.0989C181.259 36.9565 188 46.6939 188 57.563V88.8995C188 97.6299 183.632 105.785 176.354 110.643L109.022 155.582V174.276C109.022 182.834 104.824 190.851 97.7802 195.744L73.9488 212.3C67.1226 217.042 58.4452 218.278 50.5596 215.632L46.8749 214.395C36.1937 210.81 29 200.829 29 189.595V111.987ZM53.0071 34.1298L139.792 66.2506C143.066 67.4622 145.238 70.5754 145.238 74.056V111.572C145.238 114.369 143.829 116.979 141.487 118.52L69.4671 165.92C67.1255 167.461 65.7166 170.071 65.7166 172.868V194.789C65.7166 200.571 59.9483 204.593 54.4988 202.61L47.2348 199.967C43.9389 198.767 41.7462 195.643 41.7462 192.145V41.9351C41.7462 36.1332 47.5504 32.1101 53.0071 34.1298Z"
        fill="currentColor"
      />
    </motion.svg>
  )
}
