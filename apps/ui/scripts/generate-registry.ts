#!/usr/bin/env bun
/**
 * Registry Generation Script
 *
 * Generates registry.json from component metadata
 * Run with: bun run registry:generate
 */

import { buildRegistry, defaultConfig } from "../lib/registry/generator"

const main = () => {
  console.log("🚀 ToTheProd Registry Generator\n")

  try {
    buildRegistry(defaultConfig)
    console.log("\n✨ Registry generation complete!\n")
    process.exit(0)
  } catch (error) {
    console.error("\n❌ Registry generation failed:")
    console.error(error)
    process.exit(1)
  }
}

main()
