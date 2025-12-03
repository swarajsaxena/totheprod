# Registry & Documentation Generation

This document explains when and how to generate the registry and documentation files.

## 📋 Overview

The UI library uses automated generation for:
- **Registry** (`registry.json` + `public/r/`): Shadcn-compatible component registry
- **Documentation**: Auto-generated prop tables from TypeScript types

## 🚀 When to Generate

### Automatic Generation

Generation happens automatically in these scenarios:

1. **Before Build** (`prebuild` hook)
   - Runs `generate:all` before every `bun run build`
   - Ensures production builds have latest registry/docs

2. **Before Push** (Git pre-push hook)
   - Checks if generation is needed
   - Runs generation if component files changed
   - Prevents pushing outdated registry/docs

### Manual Generation

Run manually when:

- ✅ You've added a new component
- ✅ You've modified component metadata (`lib/component-metadata/`)
- ✅ You've changed component TypeScript types
- ✅ You've updated component files
- ✅ You want to update documentation

## 🛠️ Commands

### Generate Everything

```bash
bun run generate:all
```

Generates both registry and documentation. This is the recommended command.

### Generate Registry Only

```bash
bun run generate:registry
```

Generates `registry.json` and builds shadcn registry files in `public/r/`.

### Generate Documentation Only

```bash
bun run generate:docs
```

Extracts props from TypeScript and updates MDX files with prop tables.

### Watch Mode (Development)

```bash
bun run generate:watch
```

Watches for file changes and automatically regenerates. Great for active development!

### Check if Generation is Needed

```bash
bun run generate:check
```

Checks if regeneration is needed based on git changes. Returns exit code 1 if needed.

## 🔄 Automation Details

### Pre-Build Hook

The `prebuild` script ensures registry/docs are always up-to-date before building:

```json
"prebuild": "bun run generate:all"
```

### Pre-Push Hook

The `.husky/pre-push` hook:
1. Checks if generation is needed
2. Runs generation if required
3. Verifies generated files are committed
4. Prevents push if files are outdated

### CI/CD Integration

For CI/CD pipelines, add this step:

```yaml
- name: Generate Registry & Docs
  run: |
    cd apps/ui
    bun run generate:all
```

## 📁 Generated Files

### Registry Files

- `registry.json` - Main registry file (app root)
- `public/registry.json` - Public registry (web accessible)
- `public/r/*.json` - Individual component registry files

### Documentation Files

- `docs/components/*.mdx` - Updated with prop tables

## ⚠️ Important Notes

1. **Always commit generated files** - They're part of the codebase
2. **Don't edit generated files manually** - They'll be overwritten
3. **Run before pushing** - Pre-push hook will catch this, but good practice
4. **Watch mode for active development** - Saves time during development

## 🐛 Troubleshooting

### "Registry not found" error

```bash
bun run generate:registry
```

### "Props table missing" in docs

```bash
bun run generate:docs
```

### Pre-push hook failing

The hook detected outdated files. Run:

```bash
bun run generate:all
git add .
git commit -m "chore: regenerate registry and docs"
```

### Watch mode not detecting changes

Make sure you're watching the correct directories:
- `lib/component-metadata/`
- `components/`
- `lib/registry/`
- `lib/docs/`

## 📚 Related Files

- `scripts/generate-all.ts` - Main generation orchestrator
- `scripts/generate-registry.ts` - Registry generation
- `scripts/generate-docs.ts` - Documentation generation
- `scripts/check-generation-needed.ts` - Change detection
- `scripts/watch-generation.ts` - Watch mode
- `.husky/pre-push` - Pre-push hook

