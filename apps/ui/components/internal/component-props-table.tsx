"use client"

import { useAtomValue } from "jotai"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { currentComponentAtom } from "@/store/atoms"

export const ComponentPropsTable = () => {
  const component = useAtomValue(currentComponentAtom)

  if (!component?.props || Object.keys(component.props).length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Props</h2>
        <p className="text-muted-foreground text-sm">
          This component does not have documented props, or props documentation
          is still being generated.
        </p>
        <div className="rounded-md border border-dashed p-4">
          <p className="text-muted-foreground text-sm">
            Run{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">
              bun run docs:generate
            </code>{" "}
            to auto-generate props documentation from TypeScript types.
          </p>
        </div>
      </div>
    )
  }

  const propsArray = Object.entries(component.props)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-semibold text-lg">Props</h2>
        <p className="text-muted-foreground text-sm">
          Component properties and their types.
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
              <TableHead className="w-20 text-center">Required</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propsArray.map(([name, prop]) => (
              <TableRow key={name}>
                <TableCell className="font-mono text-sm">{name}</TableCell>
                <TableCell className="font-mono text-muted-foreground text-xs">
                  {prop.type}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {prop.default || "-"}
                </TableCell>
                <TableCell className="text-center">
                  {prop.required ? "✅" : "❌"}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {prop.description || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-md border border-blue-500/20 bg-blue-500/10 p-4">
        <p className="text-blue-900 text-sm dark:text-blue-100">
          <strong>💡 Tip:</strong> Props are automatically extracted from
          TypeScript definitions. Update the component file to see changes
          reflected here.
        </p>
      </div>
    </div>
  )
}
