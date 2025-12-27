#!/usr/bin/env bun

/**
 * Format Registry JSON Files
 *
 * Formats JSON files in public/r/ with multi-line arrays for better readability
 */

import fs from "node:fs"
import path from "node:path"

const formatJson = (obj: unknown): string => {
  return JSON.stringify(
    obj,
    (key, value) => {
      return value
    },
    2
  )
}

const formatRegistryFiles = () => {
  const registryDir = path.join(process.cwd(), "public/r")

  if (!fs.existsSync(registryDir)) {
    console.log("⚠️  Registry directory not found")
    return
  }

  const files = fs
    .readdirSync(registryDir)
    .filter((file) => file.endsWith(".json"))

  console.log(`\n🎨 Formatting ${files.length} registry files...`)

  for (const file of files) {
    const filePath = path.join(registryDir, file)
    const content = fs.readFileSync(filePath, "utf-8")
    const json = JSON.parse(content)

    // Format with proper indentation and ensure newline at end
    const formatted = formatJson(json) + "\n"

    fs.writeFileSync(filePath, formatted, "utf-8")
  }

  console.log("✅ Registry files formatted")
}

formatRegistryFiles()
