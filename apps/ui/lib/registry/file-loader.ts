import { readFile } from "node:fs/promises"
import { join } from "node:path"
import type { ComponentFile } from "@/lib/component-metadata"

/**
 * Load file content from the filesystem
 */
const loadFileContent = async (filePath: string): Promise<string | null> => {
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
          const content = await loadFileContent(file.path)

          return {
            path: file.path,
            type: file.type as ComponentFile["type"],
            target: file.target,
            content: content || undefined,
          } as ComponentFile
        }
      )
    )

    return filesWithContent
  } catch (error) {
    console.error(`Failed to load files for component ${componentId}:`, error)
    return []
  }
}

/**
 * Load preview file content for a component
 */
export const loadPreviewFile = async (
  componentId: string
): Promise<string | null> => {
  const possiblePaths = [
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
