import type { Metadata } from "next"
import localFont from "next/font/local"
import { StructuredData } from "@/components/internal/structured-data"
import { Toaster } from "@/components/ui/sonner"
import { generateSiteMetadata } from "@/lib/seo/metadata"
import { generateHomePageSchema } from "@/lib/seo/structured-data"
import { CommandMenuProvider } from "@/providers/command-menu-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import "./globals.css"
import { GlobalShortcutsProvider } from "@/components/providers/global-shortcuts-provider"

const archivo = localFont({
  src: [
    {
      path: "../public/fonts/Archivo-Variable.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/Archivo-VariableItalic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-archivo",
  display: "swap",
})

const clashDisplay = localFont({
  src: "../public/fonts/Sora.ttf",
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = generateSiteMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const schemas = generateHomePageSchema()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={schemas} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <GlobalShortcutsProvider>
            <CommandMenuProvider>
              <div
                className={`relative flex h-screen max-h-screen flex-col overflow-scroll bg-muted p-2! text-foreground antialiased [&:has(.no-preview-padding)]:p-0! ${archivo.variable} ${clashDisplay.variable} font-archivo`}
                id="body-scroll-container"
              >
                {children}
              </div>
            </CommandMenuProvider>
          </GlobalShortcutsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
