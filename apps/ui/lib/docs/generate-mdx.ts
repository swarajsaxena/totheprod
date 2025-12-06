import fs from "node:fs"
import path from "node:path"
import type { ComponentInspiration } from "../component-metadata/types"
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
  inspirations?: ComponentInspiration[]
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
    inspirations,
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
    inspirations,
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
    inspirations?: ComponentInspiration[]
  }
): string => {
  const { componentName, props } = propsInfo
  const { componentId, componentTitle, description, inspirations } = metadata

  const sections: string[] = []

  // Title and description
  sections.push(`# ${componentTitle}`)
  sections.push("")

  if (description) {
    sections.push(description)
    sections.push("")
  }

  // Inspirations
  if (inspirations && inspirations.length > 0) {
    sections.push("## Inspiration")
    sections.push("")
    sections.push("This component was inspired by:")
    sections.push("")
    for (const inspiration of inspirations) {
      if (inspiration.href) {
        sections.push(`- [${inspiration.label}](${inspiration.href})`)
      } else {
        sections.push(`- ${inspiration.label}`)
      }
    }
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
const inspirationRegex = /##\s+Inspiration[\s\S]*?(?=\n##|\n$)/

/**
 * Update existing MDX file with inspirations section
 */
export const updateMDXWithInspirations = (
  mdxFilePath: string,
  inspirations: ComponentInspiration[]
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: needed
): void => {
  if (!fs.existsSync(mdxFilePath)) {
    console.warn(`⚠️  MDX file not found: ${mdxFilePath}`)
    return
  }

  const content = fs.readFileSync(mdxFilePath, "utf-8")

  // Generate inspiration section
  const inspirationSection = generateInspirationsSection(inspirations)

  // Check if inspiration section already exists

  if (inspirationRegex.test(content)) {
    // Replace existing inspiration section
    const updatedContent = content.replace(inspirationRegex, inspirationSection)
    fs.writeFileSync(mdxFilePath, updatedContent, "utf-8")
    console.log(`✅ Updated inspirations in ${path.basename(mdxFilePath)}`)
  } else {
    // Add inspiration section after description, before Installation
    const installationIndex = content.indexOf("## Installation")
    let updatedContent: string

    if (installationIndex !== -1) {
      // Insert before Installation
      updatedContent =
        content.slice(0, installationIndex) +
        inspirationSection +
        "\n" +
        content.slice(installationIndex)
    } else {
      // Try to insert after first paragraph
      const lines = content.split("\n")
      let insertIndex = 0
      let emptyLineCount = 0

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === "") {
          emptyLineCount += 1
          if (emptyLineCount === 2) {
            insertIndex = i + 1
            break
          }
        }
      }

      if (insertIndex > 0) {
        lines.splice(insertIndex, 0, inspirationSection)
        updatedContent = lines.join("\n")
      } else {
        // Append after title and description
        updatedContent = `${content}\n${inspirationSection}`
      }
    }

    fs.writeFileSync(mdxFilePath, updatedContent, "utf-8")
    console.log(`✅ Added inspirations to ${path.basename(mdxFilePath)}`)
  }
}

/**
 * Generate inspirations section content
 */
const generateInspirationsSection = (
  inspirations: ComponentInspiration[]
): string => {
  const lines: string[] = []

  lines.push("## Inspiration")
  lines.push("")
  lines.push("This component was inspired by:")
  lines.push("")

  for (const inspiration of inspirations) {
    if (inspiration.href) {
      lines.push(`- [${inspiration.label}](${inspiration.href})`)
    } else {
      lines.push(`- ${inspiration.label}`)
    }
  }

  lines.push("")

  return lines.join("\n")
}
