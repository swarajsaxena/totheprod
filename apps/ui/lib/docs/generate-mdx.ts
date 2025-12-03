import fs from "node:fs"
import path from "node:path"
import type { ComponentPropsInfo } from "./extract-types"
import {
  generateInstallCommand,
  generatePropTableSection,
  generateUsageExample,
} from "./prop-table-generator"

const PROPS_TABLE_REGEX = /##\s+Props[\s\S]*?\|[\s\S]*?\|/

export type MDXGenerationOptions = {
  outputDir: string
  componentId: string
  componentTitle: string
  description?: string
  overwrite?: boolean
}

/**
 * Generate MDX documentation file from component props info
 */
export const generateMDXFile = (
  propsInfo: ComponentPropsInfo,
  options: MDXGenerationOptions
): void => {
  const {
    outputDir,
    componentId,
    componentTitle,
    description,
    overwrite = false,
  } = options

  const mdxFilePath = path.join(outputDir, `${componentId}.mdx`)

  // Check if file exists and overwrite is false
  if (fs.existsSync(mdxFilePath) && !overwrite) {
    console.log(`📄 Skipping ${componentId}.mdx (already exists)`)
    return
  }

  const mdxContent = generateMDXContent(propsInfo, {
    componentId,
    componentTitle,
    description,
  })

  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true })

  // Write MDX file
  fs.writeFileSync(mdxFilePath, mdxContent, "utf-8")

  console.log(`✅ Generated ${componentId}.mdx`)
}

/**
 * Generate MDX content
 */
const generateMDXContent = (
  propsInfo: ComponentPropsInfo,
  metadata: {
    componentId: string
    componentTitle: string
    description?: string
  }
): string => {
  const { componentName, props } = propsInfo
  const { componentId, componentTitle, description } = metadata

  const sections: string[] = []

  // Title and description
  sections.push(`# ${componentTitle}`)
  sections.push("")

  if (description) {
    sections.push(description)
    sections.push("")
  }

  // Installation
  sections.push("## Installation")
  sections.push("")
  sections.push(generateInstallCommand(componentId))
  sections.push("")

  // Usage Example
  sections.push("## Usage")
  sections.push("")
  sections.push(generateUsageExample(componentName, props))
  sections.push("")

  // Props Table
  if (props.length > 0) {
    sections.push(generatePropTableSection(componentName, props))
    sections.push("")
  }

  // Examples section placeholder
  sections.push("## Examples")
  sections.push("")
  sections.push("### Basic Usage")
  sections.push("")
  sections.push("Add your examples here...")
  sections.push("")

  return sections.join("\n")
}

/**
 * Update existing MDX file with props table
 */
export const updateMDXWithPropsTable = (
  mdxFilePath: string,
  propsInfo: ComponentPropsInfo
): void => {
  if (!fs.existsSync(mdxFilePath)) {
    console.warn(`⚠️  MDX file not found: ${mdxFilePath}`)
    return
  }

  const content = fs.readFileSync(mdxFilePath, "utf-8")

  // Check if props table already exists
  const hasPropsTable = PROPS_TABLE_REGEX.test(content)

  if (hasPropsTable) {
    // Replace existing props table
    const propTableSection = generatePropTableSection(
      propsInfo.componentName,
      propsInfo.props
    )
    const updatedContent = content.replace(PROPS_TABLE_REGEX, propTableSection)
    fs.writeFileSync(mdxFilePath, updatedContent, "utf-8")
    console.log(`✅ Updated props table in ${path.basename(mdxFilePath)}`)
  } else {
    // Add props table before Examples section or at the end
    const propTableSection = generatePropTableSection(
      propsInfo.componentName,
      propsInfo.props
    )

    const examplesIndex = content.indexOf("## Examples")
    let updatedContent: string

    if (examplesIndex !== -1) {
      // Insert before Examples
      updatedContent =
        content.slice(0, examplesIndex) +
        propTableSection +
        "\n" +
        content.slice(examplesIndex)
    } else {
      // Append at the end
      updatedContent = `${content}\n${propTableSection}`
    }

    fs.writeFileSync(mdxFilePath, updatedContent, "utf-8")
    console.log(`✅ Added props table to ${path.basename(mdxFilePath)}`)
  }
}
