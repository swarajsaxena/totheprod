#!/usr/bin/env bun

/**
 * Generate all: Registry + Documentation
 *
 * This script generates both the registry.json and documentation
 * from component metadata and TypeScript types.
 */

import { execSync } from "node:child_process"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.join(__dirname, "..")

const runScript = (scriptName: string, description: string) => {
  console.log(`\n📦 ${description}...`)
  const scriptPath = path.join(ROOT_DIR, "scripts", scriptName)

  if (!existsSync(scriptPath)) {
    console.error(`❌ Script not found: ${scriptPath}`)
    process.exit(1)
  }

  try {
    execSync(`bun run ${scriptPath}`, {
      cwd: ROOT_DIR,
      stdio: "inherit",
    })
    console.log(`✅ ${description} completed`)
  } catch (error) {
    console.error(`❌ ${description} failed:`, error)
    process.exit(1)
  }
}

console.log("🚀 Generating Registry and Documentation\n")

// Generate registry
runScript("generate-registry.ts", "Generating registry.json")

// Build shadcn registry files
console.log("\n📦 Building shadcn registry files...")
try {
  execSync("bun run registry:build", {
    cwd: ROOT_DIR,
    stdio: "inherit",
  })
  console.log("✅ Shadcn registry build completed")
} catch (error) {
  console.error("❌ Shadcn registry build failed:", error)
  process.exit(1)
}

// Generate documentation
runScript("generate-docs.ts", "Generating documentation")

console.log("\n✨ All generation completed successfully!")
