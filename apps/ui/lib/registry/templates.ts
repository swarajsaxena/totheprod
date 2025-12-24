import type { ComponentMetadata } from "@/lib/component-metadata"

/**
 * Registry item structure for shadcn compatibility
 */
export type RegistryItem = {
  name: string
  type: "registry:block" | "registry:component" | "registry:ui"
  title?: string
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: Array<{
    path: string
    type:
      | "registry:component"
      | "registry:ui"
      | "registry:hook"
      | "registry:lib"
    target?: string
  }>
  meta?: {
    source?: string
    category?: string
    tags?: string[]
    installCommand?: string
  }
}

/**
 * Complete registry structure
 */
export type Registry = {
  $schema: string
  name: string
  homepage: string
  items: RegistryItem[]
}

/**
 * Convert component metadata to registry item
 */
export const createRegistryItem = (
  component: ComponentMetadata
): RegistryItem => {
  return {
    name: component.id,
    type: component.registryType || "registry:block",
    title: component.title,
    description: component.description,
    dependencies:
      component.dependencies.length > 0 ? component.dependencies : undefined,
    files: component.files,
    meta: {
      category: component.category,
      tags: component.tags,
      installCommand: component.installCommand,
    },
  }
}

/**
 * Create complete registry from components
 */
export const createRegistry = (
  components: ComponentMetadata[],
  registryName: string,
  homepage: string
): Registry => {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: registryName,
    homepage,
    items: components
      .filter((component) => component.status !== "disabled")
      .map(createRegistryItem),
  }
}
