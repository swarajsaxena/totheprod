#!/usr/bin/env bun
/**
 * Documentation Generation Script
 *
 * Automatically generates documentation from TypeScript component files
 * Run with: bun run docs:generate
 */

import fs from "node:fs"
import path from "node:path"
import { components } from "@/lib/component-metadata"
import { extractPropsFromFile } from "@/lib/docs/extract-types"
import { updateMDXWithPropsTable } from "@/lib/docs/generate-mdx"

const DOCS_DIR = path.join(process.cwd(), "docs", "components")

const main = () => {
  console.log("🚀 ToTheProd Documentation Generator\n")
  console.log("📝 Extracting props from component files...\n")

  let successCount = 0
  let skippedCount = 0
  let errorCount = 0

  for (const component of components) {
    try {
      // Find the component file
      const componentFile = component.files.find((f) =>
        f.path.includes("totheprod-ui")
      )

      if (!componentFile) {
        console.log(`⏭️  Skipping ${component.id} (no component file found)`)
        skippedCount += 1
        continue
      }

      const componentPath = path.join(process.cwd(), componentFile.path)

      // Check if component file exists
      if (!fs.existsSync(componentPath)) {
        console.warn(`⚠️  Component file not found: ${componentPath}`)
        skippedCount += 1
        continue
      }

      // Extract props
      const propsInfo = extractPropsFromFile(componentPath)

      if (!propsInfo || propsInfo.props.length === 0) {
        console.log(`⏭️  Skipping ${component.id} (no props found)`)
        skippedCount += 1
        continue
      }

      // Check if MDX file exists
      const mdxPath = path.join(DOCS_DIR, `${component.id}.mdx`)

      if (!fs.existsSync(mdxPath)) {
        console.log(`⏭️  Skipping ${component.id} (no MDX file found)`)
        skippedCount += 1
        continue
      }

      // Update MDX file with props table
      updateMDXWithPropsTable(mdxPath, propsInfo)
      successCount += 1
    } catch (error) {
      console.error(`❌ Failed to process ${component.id}:`, error)
      errorCount += 1
    }
  }

  const separator = "=".repeat(50)
  console.log(`\n${separator}`)
  console.log("📊 Documentation Generation Summary")
  console.log(separator)
  console.log(`✅ Successfully updated: ${successCount}`)
  console.log(`⏭️  Skipped: ${skippedCount}`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log("=".repeat(50))

  if (errorCount > 0) {
    process.exit(1)
  }

  console.log("\n✨ Documentation generation complete!\n")
}

try {
  main()
} catch (error) {
  console.error("\n❌ Documentation generation failed:")
  console.error(error)
  process.exit(1)
}
