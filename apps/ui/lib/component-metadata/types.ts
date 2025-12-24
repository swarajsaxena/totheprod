import type { ComponentType, ReactNode } from "react"

/**
 * Component complexity level
 */
export type ComponentComplexity = "simple" | "moderate" | "advanced"

/**
 * Component status
 */
export type ComponentStatus =
  | "stable"
  | "beta"
  | "experimental"
  | "deprecated"
  | "disabled"

/**
 * Prop definition for documentation
 */
export type PropDefinition = {
  type: string
  description?: string
  default?: string
  required?: boolean
}

/**
 * Component props group for multi-component files
 */
export type ComponentPropsGroup = {
  componentName: string
  props: Record<string, PropDefinition>
}

/**
 * Component file information
 */
export type ComponentFile = {
  path: string
  type: "registry:component" | "registry:ui" | "registry:hook" | "registry:lib"
  target?: string
}

/**
 * Component inspiration/credit
 */
export type ComponentInspiration = {
  label: string
  href?: string
}

/**
 * Component example variant
 */
export type ComponentExample = {
  id: string
  title: string
  description?: string
  code: string
}

/**
 * Complete component metadata
 */
export type ComponentMetadata = {
  // Basic Information
  id: string
  title: string
  description: string

  // Categorization
  category: string
  tags: string[]

  // Technical Details
  dependencies: string[]
  files: ComponentFile[]
  installCommand?: string
  complexity?: ComponentComplexity
  status?: ComponentStatus
  version?: string

  // Documentation
  props?: Record<string, PropDefinition> | ComponentPropsGroup[]
  examples?: ComponentExample[]

  // Preview & Assets
  preview?: ComponentType
  videoPath?: string
  logo?: string

  // Credits
  inspirations?: ComponentInspiration[]

  // Registry
  registryType?: "registry:block" | "registry:component"

  // Metadata
  createdAt?: string
  updatedAt?: string
}

/**
 * Component category/section with icon
 */
export type ComponentCategory = {
  section: string
  icon?: ReactNode
  description?: string
  items: ComponentMetadata[]
}

/**
 * Utility type for component ID constants
 */
export type TComponentId = string
