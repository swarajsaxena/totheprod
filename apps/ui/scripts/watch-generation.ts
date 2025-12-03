#!/usr/bin/env bun

/**
 * Watch mode for automatic registry/docs generation
 *
 * Watches for changes in component files and automatically regenerates
 * registry and documentation.
 */

import { execSync } from "node:child_process"
import { watch } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.join(__dirname, "..")

const WATCH_PATTERNS = [
  path.join(ROOT_DIR, "lib", "component-metadata"),
  path.join(ROOT_DIR, "components"),
  path.join(ROOT_DIR, "lib", "registry"),
  path.join(ROOT_DIR, "lib", "docs"),
]

let isGenerating = false
let debounceTimer: NodeJS.Timeout | null = null

const generate = () => {
  if (isGenerating) {
    console.log("⏳ Generation already in progress, skipping...")
    return
  }

  isGenerating = true
  console.log("\n🔄 Changes detected, regenerating...")

  try {
    execSync("bun run generate:all", {
      cwd: ROOT_DIR,
      stdio: "inherit",
    })
    console.log("✅ Generation complete!\n")
  } catch (error) {
    console.error("❌ Generation failed:", error)
  } finally {
    isGenerating = false
  }
}

const debouncedGenerate = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    generate()
  }, 1000) // Wait 1 second after last change
}

console.log("👀 Watching for changes...")
console.log("Watching:", WATCH_PATTERNS.join(", "))
console.log("\nPress Ctrl+C to stop\n")

// Watch each directory
for (const dir of WATCH_PATTERNS) {
  watch(dir, { recursive: true }, (eventType, filename) => {
    if (filename && !filename.includes("node_modules")) {
      console.log(`📝 ${eventType}: ${filename}`)
      debouncedGenerate()
    }
  })
}

// Keep process alive
process.on("SIGINT", () => {
  console.log("\n👋 Stopping watch mode...")
  process.exit(0)
})
