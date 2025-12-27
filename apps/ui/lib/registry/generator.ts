import fs from "node:fs"
import path from "node:path"
import type { ComponentMetadata } from "@/lib/component-metadata"
import { components } from "@/lib/component-metadata"
import type { Registry } from "./templates"
import { createRegistry } from "./templates"

/**
 * Registry generator configuration
 */
export type GeneratorConfig = {
  registryName: string
  homepage: string
  outputPath: string
  componentsDir: string
}

/**
 * Default configuration
 */
export const defaultConfig: GeneratorConfig = {
  registryName: "totheprod",
  homepage: "https://ui.totheprod.com",
  outputPath: "registry.json", // Root level for shadcn build
  componentsDir: "components/ui/totheprod-ui",
}

/**
 * Validate that component files exist
 */
const validateComponentFiles = (
  component: ComponentMetadata,
  baseDir: string
): { valid: boolean; missingFiles: string[] } => {
  const missingFiles: string[] = []

  for (const file of component.files) {
    const filePath = path.join(baseDir, file.path)
    if (!fs.existsSync(filePath)) {
      missingFiles.push(file.path)
    }
  }

  return {
    valid: missingFiles.length === 0,
    missingFiles,
  }
}

/**
 * Extract dependencies from a component file
 * This reads the actual component file and looks for imports
 */
const extractFileDependencies = (filePath: string): string[] => {
  try {
    const content = fs.readFileSync(filePath, "utf-8")
    const dependencies = new Set<string>()

    // Match import statements for npm packages
    const importRegex = /import\s+(?:.*?from\s+)?['"]([^./][^'"]+)['"]/g
    let match: RegExpExecArray | null

    // biome-ignore lint/suspicious/noAssignInExpressions: Standard regex.exec() pattern
    while ((match = importRegex.exec(content)) !== null) {
      const packageName = match[1]
      // Extract package name (handle scoped packages)
      const pkgName = packageName.startsWith("@")
        ? packageName.split("/").slice(0, 2).join("/")
        : packageName.split("/")[0]
      dependencies.add(pkgName)
    }

    return Array.from(dependencies)
  } catch (error) {
    console.warn(`Failed to extract dependencies from ${filePath}:`, error)
    return []
  }
}

/**
 * Enhance component metadata with file-based dependency detection
 */
const enhanceComponentMetadata = (
  component: ComponentMetadata,
  baseDir: string
): ComponentMetadata => {
  const detectedDeps = new Set<string>(component.dependencies)

  // Extract dependencies from each file
  for (const file of component.files) {
    const filePath = path.join(baseDir, file.path)
    if (fs.existsSync(filePath)) {
      const fileDeps = extractFileDependencies(filePath)
      for (const dep of fileDeps) {
        // Filter out React and internal packages
        if (
          !(
            dep.startsWith("react") ||
            dep.startsWith("@/") ||
            dep.startsWith(".")
          )
        ) {
          detectedDeps.add(dep)
        }
      }
    }
  }

  return {
    ...component,
    dependencies: Array.from(detectedDeps),
  }
}

/**
 * Generate registry from component metadata
 */
export const generateRegistry = (
  config: GeneratorConfig = defaultConfig
): Registry => {
  const baseDir = process.cwd()

  // Validate and enhance components
  const validComponents: ComponentMetadata[] = []
  const errors: Array<{ component: string; errors: string[] }> = []

  for (const component of components) {
    // Validate files exist
    const validation = validateComponentFiles(component, baseDir)

    if (!validation.valid) {
      errors.push({
        component: component.id,
        errors: validation.missingFiles.map((file) => `Missing file: ${file}`),
      })
      continue
    }

    // Enhance with detected dependencies
    const enhanced = enhanceComponentMetadata(component, baseDir)
    validComponents.push(enhanced)
  }

  // Log errors if any
  if (errors.length > 0) {
    console.warn("\n⚠️  Component validation warnings:")
    for (const error of errors) {
      console.warn(`\n  ${error.component}:`)
      for (const err of error.errors) {
        console.warn(`    - ${err}`)
      }
    }
  }

  // Create registry
  const registry = createRegistry(
    validComponents,
    config.registryName,
    config.homepage
  )

  return registry
}

/**
 * Write registry to file
 */
export const writeRegistry = (registry: Registry, outputPath: string): void => {
  const content = `${JSON.stringify(registry, null, 2)}\n`
  fs.writeFileSync(outputPath, content, "utf-8")
}

/**
 * Generate and write registry
 */
export const buildRegistry = (
  config: GeneratorConfig = defaultConfig
): void => {
  console.log("🔨 Generating registry...")

  const registry = generateRegistry(config)

  console.log(`\n✅ Generated ${registry.items.length} component entries`)

  // Write to root (for shadcn build command)
  writeRegistry(registry, config.outputPath)
  console.log(`📝 Written to: ${config.outputPath}`)

  // Also copy to public folder (for web access to full registry)
  const publicRegistryPath = path.join("public", config.outputPath)
  writeRegistry(registry, publicRegistryPath)
  console.log(`📝 Copied to: ${publicRegistryPath}`)
}
