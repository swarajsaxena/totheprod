#!/usr/bin/env bun

/**
 * Props Extraction Script
 *
 * Extracts prop definitions from component files using ts-morph
 * Run with: bun run extract:props <component-id>
 * Example: bun run extract:props ttp-wavy-text
 */

import { join } from "node:path"
import {
  type BindingElement,
  type FunctionDeclaration,
  type InterfaceDeclaration,
  type Node,
  type ParameterDeclaration,
  Project,
  type PropertySignature,
  type SourceFile,
  SyntaxKind,
  type Type,
  type TypeAliasDeclaration,
  type VariableDeclaration,
} from "ts-morph"
import type {
  ComponentPropsGroup,
  PropDefinition,
} from "../lib/component-metadata/types"

const project = new Project({
  tsConfigFilePath: join(process.cwd(), "tsconfig.json"),
})

type ExtractedProp = {
  name: string
  type: string
  description?: string
  required: boolean
  default?: string
}

type ComponentInfo = {
  name: string
  propsTypeName: string
  functionNode: Node
}

const getTypeString = (type: Type): string => {
  let text = type.getText()
  console.log("🚀 ~ getTypeString ~ text:", text)

  // Clean up import() patterns - extract just the type name
  // Matches: import("/path/to/file").TypeName or import("/path/to/file").TypeName[]
  const importPattern = /import\(".*?"\)\.([A-Za-z_$][A-Za-z0-9_$]*)(\[\])?/g
  text = text.replace(importPattern, (_match, typeName, arraySuffix) => {
    return `${typeName}${arraySuffix || ""}`
  })

  // Clean up common patterns
  return text.replace(/\s+/g, " ").trim()
}

type NodeWithJsDocs = Node & {
  getJsDocs?: () => Array<{
    getComment: () => string | { getText: () => string } | undefined
  }>
}

const getJsDocFromNode = (node: Node): string | undefined => {
  try {
    // Some node types have getJsDocs method, but it's not on the base Node type
    const nodeWithJsDocs = node as NodeWithJsDocs
    const jsDocs = nodeWithJsDocs.getJsDocs?.()
    if (jsDocs && jsDocs.length > 0) {
      const jsDoc = jsDocs[0]
      const comment = jsDoc.getComment()
      if (comment) {
        return typeof comment === "string"
          ? comment.trim()
          : comment.getText().trim()
      }
    }
  } catch {
    // Method doesn't exist on this node type
  }
  return
}

const extractJSDocDescription = (node: Node): string | undefined => {
  // Try to get JSDoc from the property itself
  const ownJsDoc = getJsDocFromNode(node)
  if (ownJsDoc) {
    return ownJsDoc
  }

  // Try to get comment from previous sibling
  const previousSibling = node.getPreviousSibling()
  if (previousSibling) {
    return getJsDocFromNode(previousSibling)
  }

  return
}

const unquoteString = (text: string): string => {
  if (text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, -1)
  }
  if (text.startsWith("'") && text.endsWith("'")) {
    return text.slice(1, -1)
  }
  return text
}

const extractDefaultFromBindingElement = (
  element: BindingElement,
  propName: string
): string | undefined => {
  // Handle renamed properties (e.g., isHovered: _isHovered)
  const nameNode = element.getNameNode()
  const bindingName = nameNode.getText()
  const propertyName = element.getPropertyNameNode()?.getText() || bindingName

  if (propertyName === propName || bindingName === propName) {
    const initializer = element.getInitializer()
    if (initializer) {
      return unquoteString(initializer.getText())
    }
  }
  return
}

const extractDefaultFromParameter = (
  param: ParameterDeclaration,
  propName: string
): string | undefined => {
  // Handle destructured parameters (most common case for React components)
  const objectBindingPattern = param.getFirstChildByKind(
    SyntaxKind.ObjectBindingPattern
  )
  if (objectBindingPattern) {
    const bindingElements = objectBindingPattern.getElements()
    for (const element of bindingElements) {
      const defaultValue = extractDefaultFromBindingElement(element, propName)
      if (defaultValue !== undefined) {
        return defaultValue
      }
    }
    return
  }

  // Handle rest parameters
  if (param.getDotDotDotToken()) {
    return
  }

  // Handle simple parameters (non-destructured)
  const paramName = param.getName()
  if (paramName === propName) {
    const initializer = param.getInitializer()
    if (initializer) {
      return unquoteString(initializer.getText())
    }
  }

  return
}

const extractDefaultValue = (
  componentName: string,
  propName: string,
  sourceFile: SourceFile
): string | undefined => {
  // Find the component function
  const component = sourceFile
    .getVariableDeclaration(componentName)
    ?.getInitializer()

  if (!component) {
    return
  }

  // Look for arrow function or function expression
  const arrowFunction = component.asKind(SyntaxKind.ArrowFunction)
  const functionExpression = component.asKind(SyntaxKind.FunctionExpression)

  const func = arrowFunction || functionExpression
  if (!func) {
    return
  }

  // Get parameters
  const parameters = func.getParameters()

  // Find the parameter with this prop name
  for (const param of parameters) {
    const defaultValue = extractDefaultFromParameter(param, propName)
    if (defaultValue !== undefined) {
      return defaultValue
    }
  }

  return
}

const getTypeLiteralProperties = (typeNode: Node): PropertySignature[] => {
  const typeLiteral = typeNode.asKind(SyntaxKind.TypeLiteral)
  return typeLiteral ? typeLiteral.getProperties() : []
}

const getIntersectionTypeMembers = (typeNode: Node): PropertySignature[] => {
  const intersection = typeNode.asKind(SyntaxKind.IntersectionType)
  if (!intersection) {
    return []
  }
  const members: PropertySignature[] = []
  const types = intersection.getTypeNodes()
  for (const type of types) {
    if (type.getKind() === SyntaxKind.TypeLiteral) {
      members.push(...getTypeLiteralProperties(type))
    }
  }
  return members
}

const getTypeMembers = (
  propsType: InterfaceDeclaration | TypeAliasDeclaration
): PropertySignature[] => {
  const interfaceDeclaration = propsType.asKind(SyntaxKind.InterfaceDeclaration)
  if (interfaceDeclaration) {
    return interfaceDeclaration.getProperties()
  }

  const typeAlias = propsType.asKind(SyntaxKind.TypeAliasDeclaration)
  if (!typeAlias) {
    return []
  }

  const typeNode = typeAlias.getTypeNode()
  if (!typeNode) {
    return []
  }

  if (typeNode.getKind() === SyntaxKind.TypeLiteral) {
    return getTypeLiteralProperties(typeNode)
  }

  if (typeNode.getKind() === SyntaxKind.IntersectionType) {
    return getIntersectionTypeMembers(typeNode)
  }

  return []
}

const isPropertyRequired = (member: PropertySignature): boolean => {
  return !member.hasQuestionToken()
}

const extractPropsFromType = (
  propsType: InterfaceDeclaration | TypeAliasDeclaration,
  componentName: string,
  sourceFile: SourceFile
): ExtractedProp[] => {
  const props: ExtractedProp[] = []
  const members = getTypeMembers(propsType)

  for (const member of members) {
    const name = member.getName()
    const type = member.getTypeNode()

    if (!type) {
      continue
    }

    const propType = type.getType()
    const typeString = getTypeString(propType)
    const description = extractJSDocDescription(member)
    const required = isPropertyRequired(member)
    const defaultValue = extractDefaultValue(componentName, name, sourceFile)

    props.push({
      name,
      type: typeString,
      description,
      required,
      default: defaultValue,
    })
  }

  return props
}

const isComponentName = (name: string): boolean => {
  return name[0] === name[0].toUpperCase() || name.startsWith("Ttp")
}

const findComponentFromVariable = (
  sourceFile: SourceFile,
  declaration: VariableDeclaration
): ComponentInfo | undefined => {
  if (!declaration.isExported()) {
    return
  }

  const name = declaration.getName()
  if (!isComponentName(name)) {
    return
  }

  const propsTypeName = `${name}Props`
  const propsType =
    sourceFile.getTypeAlias(propsTypeName) ||
    sourceFile.getInterface(propsTypeName)

  if (propsType) {
    return {
      name,
      propsTypeName,
      functionNode: declaration,
    }
  }

  return
}

const findComponentFromFunction = (
  sourceFile: SourceFile,
  func: FunctionDeclaration
): ComponentInfo | undefined => {
  if (!func.isExported()) {
    return
  }

  const name = func.getName()
  if (!(name && isComponentName(name))) {
    return
  }

  const propsTypeName = `${name}Props`
  const propsType =
    sourceFile.getTypeAlias(propsTypeName) ||
    sourceFile.getInterface(propsTypeName)

  if (propsType) {
    return {
      name,
      propsTypeName,
      functionNode: func,
    }
  }

  return
}

const findExportedComponents = (sourceFile: SourceFile): ComponentInfo[] => {
  const components: ComponentInfo[] = []

  // Find exported variable declarations (const ComponentName = ...)
  const variableDeclarations = sourceFile.getVariableDeclarations()
  for (const declaration of variableDeclarations) {
    const component = findComponentFromVariable(sourceFile, declaration)
    if (component) {
      components.push(component)
    }
  }

  // Find exported function declarations (export function ComponentName)
  const functionDeclarations = sourceFile.getFunctions()
  for (const func of functionDeclarations) {
    const component = findComponentFromFunction(sourceFile, func)
    if (component) {
      components.push(component)
    }
  }

  return components
}

export const extractProps = (componentId: string): ComponentPropsGroup[] => {
  const componentPath = join(
    process.cwd(),
    "components",
    "ui",
    "totheprod-ui",
    `${componentId}.tsx`
  )

  const sourceFile = project.addSourceFileAtPath(componentPath)

  if (!sourceFile) {
    throw new Error(`Could not find component file: ${componentPath}`)
  }

  const exportedComponents = findExportedComponents(sourceFile)

  if (exportedComponents.length === 0) {
    throw new Error(`No exported components found in ${componentPath}`)
  }

  const groups: ComponentPropsGroup[] = []

  for (const component of exportedComponents) {
    const propsType =
      sourceFile.getTypeAlias(component.propsTypeName) ||
      sourceFile.getInterface(component.propsTypeName)

    if (!propsType) {
      console.warn(
        `Warning: Could not find ${component.propsTypeName} for ${component.name}`
      )
      continue
    }

    const extractedProps = extractPropsFromType(
      propsType as InterfaceDeclaration | TypeAliasDeclaration,
      component.name,
      sourceFile
    )

    if (extractedProps.length === 0) {
      continue
    }

    // Convert to PropDefinition format
    const props: Record<string, PropDefinition> = {}
    for (const prop of extractedProps) {
      props[prop.name] = {
        type: prop.type,
        description: prop.description,
        default: prop.default,
        required: prop.required,
      }
    }

    groups.push({
      componentName: component.name,
      props,
    })
  }

  return groups
}

const formatOutput = (groups: ComponentPropsGroup[]): string => {
  const formatted = groups
    .map((group) => {
      const propsEntries = Object.entries(group.props)
        .map(([name, prop]) => {
          const lines: string[] = []
          lines.push(`      ${name}: {`)
          lines.push(`        type: "${prop.type.replace(/"/g, '\\"')}",`)
          if (prop.description) {
            lines.push(
              `        description: "${prop.description.replace(/"/g, '\\"')}",`
            )
          }
          if (prop.default !== undefined) {
            lines.push(`        default: "${prop.default}",`)
          }
          lines.push(`        required: ${prop.required ?? false},`)
          lines.push("      },")
          return lines.join("\n")
        })
        .join("\n")

      return `  {
    componentName: "${group.componentName}",
    props: {
${propsEntries}
    },
  }`
    })
    .join(",\n")

  return `props: [\n${formatted}\n]`
}

const main = () => {
  const componentId = process.argv[2]

  if (!componentId) {
    console.error("❌ Error: Component ID is required")
    console.log("\nUsage: bun run extract:props <component-id>")
    console.log("Example: bun run extract:props ttp-wavy-text")
    process.exit(1)
  }

  try {
    console.log(`🔍 Extracting props for: ${componentId}\n`)

    const groups = extractProps(componentId)

    if (groups.length === 0) {
      console.log("⚠️  No props found for this component.")
      process.exit(0)
    }

    console.log("✨ Props extracted successfully!\n")
    console.log("📋 Copy the following into your component metadata:\n")
    console.log(formatOutput(groups))
    console.log("\n")

    process.exit(0)
  } catch (error) {
    console.error("\n❌ Props extraction failed:")
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// Only run main if this file is executed directly (not imported)
// Check if this is the main entry point by seeing if componentId argument exists
// When imported, process.argv won't have the component ID
if (process.argv[2]) {
  main()
}
