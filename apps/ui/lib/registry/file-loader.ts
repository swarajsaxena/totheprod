import { readFile } from "node:fs/promises"
import { join } from "node:path"
import type { ComponentFile } from "@/lib/component-metadata"

/**
 * Load preview file content from the filesystem
 */
const loadPreviewFile = async (componentId: string): Promise<string | null> => {
  const possiblePaths = [
    // Active location: components/previews directory
    join(
      process.cwd(),
      "apps/ui/components/previews",
      componentId,
      "preview.tsx"
    ),
    join(process.cwd(), "components/previews", componentId, "preview.tsx"),
  ]

  for (const filePath of possiblePaths) {
    try {
      const content = await readFile(filePath, "utf-8")
      return content
    } catch {
      // Try next path
    }
  }

  return null
}

/**
 * Load file content from the filesystem based on file path
 */
const loadFileContent = async (
  filePath: string,
  componentId: string
): Promise<string | null> => {
  // If it's a preview file, use the preview loader
  if (filePath.includes("preview.tsx") || filePath.includes("preview")) {
    return loadPreviewFile(componentId)
  }

  // Try to load from the filesystem
  const possiblePaths = [
    join(process.cwd(), "apps/ui", filePath),
    join(process.cwd(), filePath),
  ]

  for (const fullPath of possiblePaths) {
    try {
      const content = await readFile(fullPath, "utf-8")
      return content
    } catch {
      // Try next path
    }
  }

  return null
}

/**
 * Load component files with their content from registry
 */
export const loadComponentFiles = async (
  componentId: string
): Promise<ComponentFile[]> => {
  try {
    // Load registry file
    const registryPath = join(process.cwd(), "public/r", `${componentId}.json`)

    let componentItem: {
      name: string
      files?: Array<{
        path: string
        type: string
        content?: string
        target?: string
      }>
    }
    try {
      const registryContent = await readFile(registryPath, "utf-8")
      // The registry file is a single RegistryItem, not a full Registry
      componentItem = JSON.parse(registryContent) as {
        name: string
        files?: Array<{
          path: string
          type: string
          content?: string
          target?: string
        }>
      }
    } catch {
      // If registry doesn't exist, return empty array
      return []
    }

    if (!componentItem?.files) {
      return []
    }

    // Load content for each file
    const filesWithContent = await Promise.all(
      componentItem.files.map(
        async (file: {
          path: string
          type: string
          content?: string
          target?: string
        }) => {
          // If content is already in registry, use it
          if (file.content) {
            return {
              path: file.path,
              type: file.type as ComponentFile["type"],
              target: file.target,
              content: file.content,
            } as ComponentFile
          }

          // Otherwise, load from filesystem
          const content = await loadFileContent(file.path, componentId)

          return {
            path: file.path,
            type: file.type as ComponentFile["type"],
            target: file.target,
            content: content || undefined,
          } as ComponentFile
        }
      )
    )

    // Add preview file if it exists and isn't already in the list
    const hasPreview = filesWithContent.some((file: ComponentFile) =>
      file.path.includes("preview.tsx")
    )

    if (!hasPreview) {
      const previewContent = await loadPreviewFile(componentId)
      if (previewContent) {
        filesWithContent.unshift({
          path: `components/previews/${componentId}/preview.tsx`,
          type: "registry:component",
          content: previewContent,
        } as ComponentFile)
      }
    }

    return filesWithContent
  } catch (error) {
    console.error(`Failed to load files for component ${componentId}:`, error)
    return []
  }
}
