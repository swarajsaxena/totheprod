#!/usr/bin/env bun

/**
 * Check if registry/docs generation is needed
 *
 * This script checks if component metadata or TypeScript files have changed
 * and determines if regeneration is needed.
 */

import { execSync } from "node:child_process"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.join(__dirname, "..")
const REGISTRY_PATH = path.join(ROOT_DIR, "registry.json")
const PUBLIC_REGISTRY_PATH = path.join(ROOT_DIR, "public", "registry.json")

const checkGitChanges = (pattern: string): boolean => {
  try {
    const result = execSync(`git diff --name-only HEAD -- ${pattern}`, {
      cwd: ROOT_DIR,
      encoding: "utf-8",
    })
    return result.trim().length > 0
  } catch {
    // If git command fails, assume changes exist
    return true
  }
}

const main = () => {
  const needsRegeneration = {
    registry: false,
    docs: false,
  }

  // Check if registry files exist
  const registryExists =
    existsSync(REGISTRY_PATH) || existsSync(PUBLIC_REGISTRY_PATH)

  // Check if metadata or component files changed
  const metadataChanged = checkGitChanges("lib/component-metadata/**")
  const componentsChanged =
    checkGitChanges("components/**/*.tsx") ||
    checkGitChanges("components/**/*.ts")
  const registryScriptChanged =
    checkGitChanges("lib/registry/**") ||
    checkGitChanges("scripts/generate-registry.ts")

  // Check if docs script changed
  const docsScriptChanged =
    checkGitChanges("lib/docs/**") ||
    checkGitChanges("scripts/generate-docs.ts")

  // Determine if regeneration is needed
  if (
    !registryExists ||
    metadataChanged ||
    componentsChanged ||
    registryScriptChanged
  ) {
    needsRegeneration.registry = true
  }

  if (metadataChanged || componentsChanged || docsScriptChanged) {
    needsRegeneration.docs = true
  }

  // Output JSON for easy parsing
  console.log(JSON.stringify(needsRegeneration))

  return needsRegeneration.registry || needsRegeneration.docs
}

const needsRegeneration = main()
process.exit(needsRegeneration ? 1 : 0)
