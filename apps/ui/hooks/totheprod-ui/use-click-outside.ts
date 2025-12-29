import { useEffect, useRef } from "react"

/**
 * Custom hook to detect clicks outside of a specified element
 * @param customClick - Callback function to execute when clicking outside the element
 * @param options - Optional configuration
 * @param options.blockOutsideClicks - If true, prevents default behavior and stops propagation of outside clicks
 * @returns ref - Ref to attach to the element you want to detect outside clicks for
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const ref = useClickOutside(() => {
 *     console.log('Clicked outside!');
 *   }, { blockOutsideClicks: true });
 *
 *   return <div ref={ref}>Click outside me</div>;
 * };
 * ```
 */
export function useClickOutside<T extends HTMLDivElement = HTMLDivElement>(
  customClick: (event: MouseEvent | TouchEvent) => void,
  options?: { blockOutsideClicks?: boolean }
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Check if the click is outside the referenced element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // Block outside clicks if option is enabled
        if (options?.blockOutsideClicks) {
          event.preventDefault()
          event.stopPropagation()
        }

        customClick(event)
      }
    }

    // Add event listeners for both mouse and touch events
    // Use capture phase to intercept events before they reach their targets
    document.addEventListener("mousedown", handleClickOutside, true)
    document.addEventListener("touchstart", handleClickOutside, true)

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true)
      document.removeEventListener("touchstart", handleClickOutside, true)
    }
  }, [customClick, options?.blockOutsideClicks])

  return ref
}
