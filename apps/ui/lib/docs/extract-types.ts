/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: explanation */
import path from "node:path"
import { Project, type SourceFile, SyntaxKind } from "ts-morph"

export type PropInfo = {
  name: string
  type: string
  description?: string
  defaultValue?: string
  required: boolean
}

export type ComponentPropsInfo = {
  componentName: string
  filePath: string
  props: PropInfo[]
}

/**
 * Extract props from a TypeScript component file
 */
export const extractPropsFromFile = (
  filePath: string
): ComponentPropsInfo | null => {
  const project = new Project({
    tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
  })

  const sourceFile = project.addSourceFileAtPath(filePath)
  const fileName = path.basename(filePath, path.extname(filePath))
  const componentName = fileName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")

  const props = extractProps(sourceFile, componentName)

  if (props.length === 0) {
    return null
  }

  return {
    componentName,
    filePath,
    props,
  }
}

/**
 * Extract props from source file
 */
const extractProps = (
  sourceFile: SourceFile,
  componentName: string
): PropInfo[] => {
  const props: PropInfo[] = []

  // Find type aliases that might be props
  const typeAliases = sourceFile.getTypeAliases()

  for (const typeAlias of typeAliases) {
    const typeName = typeAlias.getName()

    // Look for Props type (e.g., ComponentProps, TtpWavyTextProps)
    if (
      typeName.includes("Props") ||
      typeName === `${componentName}Props` ||
      typeName.toLowerCase().includes("props")
    ) {
      const typeNode = typeAlias.getTypeNode()

      if (typeNode && typeNode.getKind() === SyntaxKind.TypeLiteral) {
        const members = typeNode
          .asKindOrThrow(SyntaxKind.TypeLiteral)
          .getMembers()

        for (const member of members) {
          if (member.getKind() === SyntaxKind.PropertySignature) {
            const propSignature = member.asKind(SyntaxKind.PropertySignature)
            if (!propSignature) {
              continue
            }

            const name = propSignature.getName()
            const typeText = propSignature.getType().getText()
            const isRequired = !propSignature.hasQuestionToken()

            // Extract JSDoc comment
            const jsDocs = propSignature.getJsDocs()
            const description = jsDocs[0]?.getDescription().trim()

            // Try to find default value from initializer
            const defaultValue = propSignature.getInitializer()?.getText()

            props.push({
              name,
              type: typeText,
              description,
              defaultValue,
              required: isRequired,
            })
          }
        }
      }
    }
  }

  // Also check interfaces
  const interfaces = sourceFile.getInterfaces()

  for (const interfaceDecl of interfaces) {
    const interfaceName = interfaceDecl.getName()

    if (
      interfaceName.includes("Props") ||
      interfaceName === `${componentName}Props`
    ) {
      const properties = interfaceDecl.getProperties()

      for (const prop of properties) {
        const name = prop.getName()
        const typeText = prop.getType().getText()
        const isRequired = !prop.hasQuestionToken()

        // Extract JSDoc comment
        const jsDocs = prop.getJsDocs()
        const description = jsDocs[0]?.getDescription().trim()

        // Try to find default value
        const defaultValue = prop.getInitializer()?.getText()

        props.push({
          name,
          type: typeText,
          description,
          defaultValue,
          required: isRequired,
        })
      }
    }
  }

  return props
}

/**
 * Extract props from multiple component files
 */
export const extractPropsFromMultipleFiles = (
  filePaths: string[]
): ComponentPropsInfo[] => {
  const results: ComponentPropsInfo[] = []

  for (const filePath of filePaths) {
    try {
      const propsInfo = extractPropsFromFile(filePath)
      if (propsInfo) {
        results.push(propsInfo)
      }
    } catch (error) {
      console.error(`Failed to extract props from ${filePath}:`, error)
    }
  }

  return results
}
