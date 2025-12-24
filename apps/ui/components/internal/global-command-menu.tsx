"use client"

import {
  BlockGameIcon,
  ComputerIcon,
  GithubIcon,
  MoonIcon,
  NewTwitterIcon,
  Sun02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { contentMap } from "@/app/components/[id]/constants"
import {
  CommandPaletteContent,
  CommandPaletteDialog,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteSection,
} from "@/components/ui/totheprod-ui/ttp-command-palette"

export const GlobalCommandMenu = () => {
  const router = useRouter()
  const { setTheme, theme } = useTheme()

  const handleSystemTheme = () => {
    setTheme("system")
  }

  const toggleThemeItem = {
    id: "theme-toggle",
    icon: <HugeiconsIcon icon={theme !== "light" ? Sun02Icon : MoonIcon} />,
    title: theme !== "light" ? "Light Theme" : "Dark Theme",
    description:
      theme !== "light" ? "Switch to light mode" : "Switch to dark mode",
    onSelect: () => setTheme(theme === "light" ? "dark" : "light"),
    shortcut: "alt+shift+t",
  }

  const systemThemeItem = {
    id: "theme-system",
    icon: <HugeiconsIcon icon={ComputerIcon} />,
    title: "System Theme",
    description: "Switch to system mode",
    onSelect: handleSystemTheme,
    shortcut: "alt+shift+s",
  }

  const themeItems = (() => {
    if (theme === "system") {
      return [toggleThemeItem]
    }
    if (theme === "dark") {
      return [toggleThemeItem, systemThemeItem]
    }
    return [toggleThemeItem, systemThemeItem]
  })()

  return (
    <CommandPaletteDialog
      className="backdrop-blur-xl dark:bg-muted/75"
      description="Search for apps, commands, and actions"
      title="Command Menu"
    >
      <CommandPaletteInput
        askAiLabel={false}
        placeholder="Search for commands..."
      />
      <CommandPaletteContent emptyText="No commands found.">
        <CommandPaletteSection title="Theme">
          {themeItems.map((item) => (
            <CommandPaletteItem key={item.id} {...item} />
          ))}
        </CommandPaletteSection>
        <CommandPaletteSection title="Socials">
          <CommandPaletteItem
            icon={<HugeiconsIcon icon={NewTwitterIcon} />}
            id="twitter"
            onSelect={() => window.open("https://x.com/totheprod", "_blank")}
            title="Twitter"
          />
          <CommandPaletteItem
            icon={<HugeiconsIcon icon={GithubIcon} />}
            id="github"
            onSelect={() =>
              window.open("https://github.com/totheprod", "_blank")
            }
            title="GitHub"
          />
        </CommandPaletteSection>

        {contentMap.map((section) => (
          <CommandPaletteSection key={section.section} title={section.section}>
            {section.items.map((item) => (
              <CommandPaletteItem
                description={item.description}
                icon={(() => {
                  if ("logo" in item && item.logo) {
                    return (
                      <Image
                        alt={item.title}
                        height={16}
                        src={item.logo}
                        width={16}
                      />
                    )
                  }
                  if (section.icon) {
                    return section.icon
                  }
                  return <HugeiconsIcon icon={BlockGameIcon} />
                })()}
                id={item.id}
                key={item.id}
                onSelect={() => router.push(`/components/${item.id}`)}
                title={item.title}
              />
            ))}
          </CommandPaletteSection>
        ))}
      </CommandPaletteContent>
    </CommandPaletteDialog>
  )
}
