import type { Metadata } from "next"
import type React from "react"
import { StructuredData } from "@/components/internal/structured-data"
import type { ComponentFile } from "@/lib/component-metadata"
import type { PreviewConfig } from "@/lib/component-metadata/types"
import { loadComponentFiles, loadPreviewFile } from "@/lib/registry/file-loader"
import { generateComponentMetadata } from "@/lib/seo/metadata"
import { generateComponentPageSchema } from "@/lib/seo/structured-data"
import { ComponentProvider } from "./_components/component-provider"
import { contentMap } from "./constants"

export type ComponentData = {
  id: string
  preview?: React.ComponentType
  title: string
  description: string
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> => {
  const { id } = await params

  const component = contentMap
    .find((item) => item.items.some((item) => item.id === id))
    ?.items.find((item) => item.id === id)

  if (!component) {
    return {
      title: "Component Not Found",
      description: "The requested component does not exist.",
    }
  }

  return generateComponentMetadata(component)
}

const NotFoundComponent = () => <div>Component not found</div>

/**
 * Get preview config from preview component
 */
const getPreviewConfig = async (
  componentId: string,
  PreviewComponent?: React.ComponentType
): Promise<PreviewConfig> => {
  if (!PreviewComponent) {
    return {}
  }

  try {
    // Dynamically import the preview module to access exports
    const previewModule = await import(
      `@/components/previews/${componentId}/preview`
    )
    return (previewModule.previewConfig as PreviewConfig) || {}
  } catch {
    return {}
  }
}

/**
 * Apply preview config to file list
 */
const applyPreviewConfig = async (
  componentId: string,
  registryFiles: ComponentFile[],
  config: PreviewConfig
): Promise<ComponentFile[]> => {
  // If customFiles is specified, use only those files
  if (config.customFiles && config.customFiles.length > 0) {
    const customFilesWithContent = await Promise.all(
      config.customFiles.map(async (filePath) => {
        const content = await loadPreviewFile(componentId)
        return {
          path: filePath,
          type: "registry:component" as const,
          content: content || undefined,
        }
      })
    )
    return customFilesWithContent
  }

  // Otherwise, use registry files and optionally add preview file
  const files = [...registryFiles]

  // Check if preview file should be added (default: true)
  const shouldShowPreview = config.showPreviewFile !== false

  if (shouldShowPreview) {
    const previewContent = await loadPreviewFile(componentId)
    if (previewContent) {
      // Add preview file at the beginning if not already present
      const hasPreview = files.some((file) => file.path.includes("preview.tsx"))
      if (!hasPreview) {
        files.unshift({
          path: `components/previews/${componentId}/preview.tsx`,
          type: "registry:component",
          content: previewContent,
        })
      }
    }
  }

  return files
}

const ComponentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const component = contentMap
    .find((item) => item.items.some((item) => item.id === id))
    ?.items.find((item) => item.id === id)

  if (!component) {
    const NotFoundComp = NotFoundComponent
    return <NotFoundComp />
  }

  // Load files server-side with content
  const registryFiles = await loadComponentFiles(id)

  // Get preview config
  const previewConfig = await getPreviewConfig(id, component.preview)

  // Apply preview config to determine final file list
  const finalFiles = await applyPreviewConfig(id, registryFiles, previewConfig)

  const PreviewComponent = component.preview

  // Exclude preview from component data to avoid passing functions to Client Components
  const componentWithFiles = {
    ...component,
    preview: undefined, // Remove the preview function
    files: finalFiles.length > 0 ? finalFiles : component.files,
  }

  const schemas = generateComponentPageSchema(component)

  return (
    <>
      <StructuredData data={schemas} />
      <ComponentProvider componentData={componentWithFiles}>
        {PreviewComponent ? <PreviewComponent /> : null}
      </ComponentProvider>
    </>
  )
}

export default ComponentPage
