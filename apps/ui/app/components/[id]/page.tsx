import { CodeIcon, SourceCodeIcon, ViewIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { readFile } from "fs/promises"
import Link from "next/link"
import path from "path"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ComponentProvider } from "./_components/ComponentProvider"
import { contentMap } from "./constants"

export type ComponentData = {
  id: string
  preview?: React.ComponentType
  title: string
  description: string
  docsPath?: string
}

const getMdxContent = async (
  docsPath?: string,
): Promise<string | undefined> => {
  if (!docsPath) return undefined

  try {
    const filePath = path.join(process.cwd(), "docs", "components", docsPath)
    const content = await readFile(filePath, "utf-8")
    return content
  } catch (error) {
    console.error(`Failed to read MDX file: ${docsPath}`, error)
    return undefined
  }
}

const NotFoundComponent = () => <div>Component not found</div>

const ComponentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const component: ComponentData = contentMap
    .find((item) => item.items.some((item) => item.id === id))
    ?.items.find((item) => item.id === id) ?? {
    preview: NotFoundComponent,
    title: "404 - Not Found",
    description: "The component you are looking for does not exist.",
    id: id,
  }

  const mdxContent = await getMdxContent(component.id + ".mdx")

  const PreviewComponent = component.preview

  return (
    <>
      <ComponentProvider mdxDocs={mdxContent}>
        {PreviewComponent ? <PreviewComponent /> : null}
      </ComponentProvider>
    </>
  )
}

export default ComponentPage
