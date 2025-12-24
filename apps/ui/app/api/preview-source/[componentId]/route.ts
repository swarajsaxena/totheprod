import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ componentId: string }> }
) {
  try {
    const { componentId } = await params

    // Try multiple possible paths for monorepo support
    const possiblePaths = [
      // Active location: components/previews directory
      join(
        process.cwd(),
        "apps/ui/components/previews",
        componentId,
        "preview.tsx"
      ),
      join(process.cwd(), "components/previews", componentId, "preview.tsx"),
    ]

    let content: string | null = null
    let lastError: Error | null = null

    for (const filePath of possiblePaths) {
      try {
        content = await readFile(filePath, "utf-8")
        break
      } catch (error) {
        lastError = error as Error
      }
    }

    if (!content) {
      console.error("Failed to read preview file from any path:", lastError)
      console.error("Tried paths:", possiblePaths)
      return NextResponse.json(
        { error: "Failed to read preview file" },
        { status: 404 }
      )
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Failed to read preview file:", error)
    return NextResponse.json(
      { error: "Failed to read preview file" },
      { status: 404 }
    )
  }
}
