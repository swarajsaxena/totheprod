#!/usr/bin/env bun

/**
 * Cleanup Registry Files
 *
 * This script removes any unnecessary duplicate registry.json files
 * that might be created during the build process.
 *
 * Note: shadcn build generates individual component JSON files in public/r/
 * (e.g., ttp-blur-focus-navigation.json) which are the actual files users
 * consume. The registry.json is only needed at the root and in public/ folder
 * for the full registry listing, not in public/r/.
 */

import fs from "node:fs"
import path from "node:path"

const REGISTRY_R_DIR = path.join(process.cwd(), "public/r")
const DUPLICATE_REGISTRY = path.join(REGISTRY_R_DIR, "registry.json")

const cleanupDuplicateRegistry = (): void => {
  if (fs.existsSync(DUPLICATE_REGISTRY)) {
    console.log("🧹 Removing duplicate registry.json from public/r/...")
    fs.unlinkSync(DUPLICATE_REGISTRY)
    console.log("✅ Cleanup complete")
  }
}

const main = () => {
  try {
    cleanupDuplicateRegistry()
    process.exit(0)
  } catch (error) {
    console.error("❌ Cleanup failed:")
    console.error(error)
    process.exit(1)
  }
}

main()
