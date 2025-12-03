/**
 * Component Metadata System
 *
 * Centralized metadata for all UI components
 */

export type { CategoryId } from "./categories"

// Categories
// biome-ignore lint/performance/noBarrelFile: Centralized exports for better DX
export { categories } from "./categories"
export type { ComponentIdType } from "./components"

// Components
export {
  ComponentId,
  components,
  getComponentById,
  getComponentsByCategory,
  getComponentsByTag,
} from "./components"
// Types
export type {
  ComponentCategory,
  ComponentComplexity,
  ComponentExample,
  ComponentFile,
  ComponentInspiration,
  ComponentMetadata,
  ComponentStatus,
  PropDefinition,
  TComponentId,
} from "./types"

// Utility functions
import { categories } from "./categories"
import { getComponentsByCategory } from "./components"
import type { ComponentCategory } from "./types"

/**
 * Get content map organized by categories
 * This groups components by their category and includes category metadata
 */
export const getContentMap = (): ComponentCategory[] => {
  const categoriesArray = Object.values(categories)

  return categoriesArray.map((category) => ({
    section: category.section,
    icon: category.icon,
    description: category.description,
    items: getComponentsByCategory(category.id),
  }))
}

/**
 * Pre-computed content map for easy use
 */
export const contentMap = getContentMap()
