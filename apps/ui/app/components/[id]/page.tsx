import type { Metadata } from "next"
import type React from "react"
import { StructuredData } from "@/components/internal/structured-data"
import { loadComponentFiles } from "@/lib/registry/file-loader"
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
  const filesWithContent = await loadComponentFiles(id)
  const componentWithFiles = {
    ...component,
    files: filesWithContent.length > 0 ? filesWithContent : component.files,
  }

  const PreviewComponent = component.preview
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
