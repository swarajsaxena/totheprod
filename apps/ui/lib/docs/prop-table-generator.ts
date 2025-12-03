import type { PropInfo } from "./extract-types"

/**
 * Generate MDX prop table from prop information
 */
export const generatePropTable = (props: PropInfo[]): string => {
  if (props.length === 0) {
    return ""
  }

  const header = `| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|`

  const rows = props.map((prop) => {
    const name = `\`${prop.name}\``
    const type = `\`${prop.type}\``
    const defaultValue = prop.defaultValue ? `\`${prop.defaultValue}\`` : "-"
    const required = prop.required ? "✅" : "❌"
    const description = prop.description || "-"

    return `| ${name} | ${type} | ${defaultValue} | ${required} | ${description} |`
  })

  return [header, ...rows].join("\n")
}

/**
 * Generate prop table section for MDX
 */
export const generatePropTableSection = (
  _componentName: string,
  props: PropInfo[]
): string => {
  if (props.length === 0) {
    return ""
  }

  return `## Props

${generatePropTable(props)}
`
}

/**
 * Generate component usage example
 */
export const generateUsageExample = (
  componentName: string,
  props: PropInfo[]
): string => {
  const requiredProps = props.filter((p) => p.required)
  const optionalProps = props.filter((p) => !p.required).slice(0, 2) // Show max 2 optional props

  const propsString = [...requiredProps, ...optionalProps]
    .map((prop) => {
      const value =
        prop.defaultValue ||
        (prop.type.includes("string") ? `"value"` : "value")
      return `  ${prop.name}={${value}}`
    })
    .join("\n")

  return `\`\`\`tsx
import { ${componentName} } from "@/components/ui/totheprod-ui/${componentName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .slice(1)}"

export default function Example() {
  return (
    <${componentName}
${propsString}
    />
  )
}
\`\`\`
`
}

/**
 * Generate installation command
 */
export const generateInstallCommand = (componentId: string): string => {
  return `\`\`\`bash
npx shadcn@latest add https://ui.totheprod.com/r/${componentId}.json
\`\`\`
`
}
