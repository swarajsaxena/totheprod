#!/usr/bin/env bun
/**
 * Extract Props for All Components
 *
 * Extracts prop definitions from all component files
 * Run with: bun run extract:props:all
 */

import { mkdir, readdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import type { ComponentPropsGroup } from "../lib/component-metadata/types"
import { extractProps } from "./extract-props"

const getComponentIdFromFilename = (filename: string): string | null => {
  // Extract component ID from filename (e.g., ttp-wavy-text.tsx -> ttp-wavy-text)
  if (!(filename.startsWith("ttp-") && filename.endsWith(".tsx"))) {
    return null
  }
  return filename.slice(0, -4) // Remove .tsx extension
}

const formatComponentProps = (
  componentId: string,
  groups: ReturnType<typeof extractProps>
): string => {
  if (groups.length === 0) {
    return ""
  }

  const formatted = groups
    .map((group) => {
      const propsEntries = Object.entries(group.props)
        .map(([name, prop]) => {
          const lines: string[] = []
          lines.push(`      ${name}: {`)
          lines.push(`        type: "${prop.type.replace(/"/g, '\\"')}",`)
          if (prop.description) {
            lines.push(
              `        description: "${prop.description.replace(/"/g, '\\"')}",`
            )
          }
          if (prop.default !== undefined) {
            lines.push(`        default: "${prop.default}",`)
          }
          lines.push(`        required: ${prop.required ?? false},`)
          lines.push("      },")
          return lines.join("\n")
        })
        .join("\n")

      return `  {
    componentName: "${group.componentName}",
    props: {
${propsEntries}
    },
  }`
    })
    .join(",\n")

  return `// ${componentId}
props: [
${formatted}
],`
}

const main = async () => {
  const componentsDir = join(process.cwd(), "components", "ui", "totheprod-ui")
  const propsDir = join(process.cwd(), "public", "content", "props")

  try {
    // Ensure props directory exists
    await mkdir(propsDir, { recursive: true })

    const files = await readdir(componentsDir)
    const componentFiles = files.filter(
      (file) => file.startsWith("ttp-") && file.endsWith(".tsx")
    )

    if (componentFiles.length === 0) {
      console.log("⚠️  No component files found.")
      process.exit(0)
    }

    console.log(`🔍 Found ${componentFiles.length} component files\n`)

    const results: Array<{
      componentId: string
      props: string
      propsData?: ComponentPropsGroup[]
      error?: string
    }> = []

    const allPropsMap: Record<string, ComponentPropsGroup[]> = {}

    for (const file of componentFiles) {
      const componentId = getComponentIdFromFilename(file)
      if (!componentId) {
        continue
      }

      try {
        console.log(`📦 Extracting props for: ${componentId}...`)
        const groups = extractProps(componentId)

        if (groups.length === 0) {
          console.log("   ⚠️  No props found\n")
          results.push({
            componentId,
            props: "",
            error: "No props found",
          })
          continue
        }

        // Save individual JSON file
        const jsonPath = join(propsDir, `${componentId}.json`)
        await writeFile(
          jsonPath,
          `${JSON.stringify(groups, null, 2)}\n`,
          "utf-8"
        )

        // Add to all props map
        allPropsMap[componentId] = groups

        const formatted = formatComponentProps(componentId, groups)
        results.push({
          componentId,
          props: formatted,
          propsData: groups,
        })
        console.log(
          `   ✅ Extracted ${groups.length} component(s) → ${jsonPath}\n`
        )
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        console.error(`   ❌ Error: ${errorMessage}\n`)
        results.push({
          componentId,
          props: "",
          error: errorMessage,
        })
      }
    }

    // Save all props in a single index file
    const indexPath = join(propsDir, "index.json")
    await writeFile(
      indexPath,
      `${JSON.stringify(allPropsMap, null, 2)}\n`,
      "utf-8"
    )
    console.log(`📁 Saved all props index → ${indexPath}\n`)

    // Output summary
    console.log(`\n${"=".repeat(80)}`)
    console.log("📋 PROPS EXTRACTION SUMMARY")
    console.log(`${"=".repeat(80)}\n`)

    const successful = results.filter((r) => !r.error && r.props)
    const failed = results.filter((r) => r.error || !r.props)

    console.log(`✅ Successful: ${successful.length}`)
    console.log(`❌ Failed: ${failed.length}`)
    console.log(`📁 JSON files saved to: ${propsDir}\n`)

    if (successful.length > 0) {
      console.log("=".repeat(80))
      console.log("📝 COPY THE FOLLOWING INTO YOUR COMPONENT METADATA")
      console.log(`${"=".repeat(80)}\n`)

      for (const result of successful) {
        console.log(result.props)
        console.log("\n")
      }
    }

    if (failed.length > 0) {
      console.log(`${"=".repeat(80)}`)
      console.log("⚠️  COMPONENTS WITH ERRORS")
      console.log(`${"=".repeat(80)}\n`)

      for (const result of failed) {
        console.log(`${result.componentId}: ${result.error || "No props"}`)
      }
      console.log("\n")
    }

    process.exit(0)
  } catch (error) {
    console.error("\n❌ Props extraction failed:")
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

main()
