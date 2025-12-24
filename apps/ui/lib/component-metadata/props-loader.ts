import type { ComponentPropsGroup } from "./types"

/**
 * Load props from JSON file for a component
 * Falls back to index.json if individual file doesn't exist
 */
export const loadComponentProps = async (
  componentId: string
): Promise<ComponentPropsGroup[] | null> => {
  try {
    // Try loading individual component file first
    try {
      const response = await fetch(`/content/props/${componentId}.json`)
      if (response.ok) {
        const props = (await response.json()) as ComponentPropsGroup[]
        return props
      }
    } catch {
      // Individual file doesn't exist, try index.json
    }

    // Fallback to index.json
    try {
      const indexResponse = await fetch("/content/props/index.json")
      if (indexResponse.ok) {
        const index = (await indexResponse.json()) as Record<
          string,
          ComponentPropsGroup[]
        >
        return index[componentId] || null
      }
    } catch {
      // Index file doesn't exist
    }

    return null
  } catch {
    return null
  }
}
