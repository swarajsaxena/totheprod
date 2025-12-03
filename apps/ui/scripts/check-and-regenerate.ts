#!/usr/bin/env bun

/**
 * Check if component files changed and regenerate if needed
 *
 * This script is meant to be run in git hooks to automatically
 * regenerate registry and docs when component files change.
 */

import { execSync } from "node:child_process"

const COMPONENT_PATTERNS = [
  /^apps\/ui\/lib\/component-metadata\//,
  /^apps\/ui\/components\/totheprod-ui\//,
  /^apps\/ui\/components\/previews\//,
]

const shouldRegenerate = (): boolean => {
  try {
    // Get list of staged files
    const stagedFiles = execSync("git diff --cached --name-only", {
      encoding: "utf-8",
    })
      .trim()
      .split("\n")
      .filter(Boolean)

    // Check if any component-related files are staged
    const hasComponentChanges = stagedFiles.some((file) =>
      COMPONENT_PATTERNS.some((pattern) => pattern.test(file))
    )

    return hasComponentChanges
  } catch {
    // If git command fails, assume we should regenerate
    console.warn("⚠️  Could not check git status, regenerating anyway")
    return true
  }
}

const main = () => {
  if (!shouldRegenerate()) {
    console.log("ℹ️  No component changes detected, skipping regeneration")
    return
  }

  console.log("🔄 Component files changed, regenerating registry and docs...")

  try {
    execSync("bun run generate:all", {
      cwd: process.cwd(),
      stdio: "inherit",
    })

    // Stage the generated files
    const generatedFiles = [
      "apps/ui/registry.json",
      "apps/ui/public/registry.json",
      "apps/ui/public/r/",
      "apps/ui/docs/components/",
    ]

    for (const file of generatedFiles) {
      try {
        execSync(`git add ${file}`, { stdio: "ignore" })
      } catch {
        // File might not exist or already staged, ignore
      }
    }

    console.log("✅ Registry and docs regenerated and staged")
  } catch (error) {
    console.error("❌ Failed to regenerate:", error)
    process.exit(1)
  }
}

main()
