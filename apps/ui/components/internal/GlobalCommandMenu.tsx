"use client"

import { contentMap } from "@/app/components/[id]/constants"
import {
  RaycastCommandMenuContent,
  RaycastCommandMenuDialog,
  RaycastCommandMenuInput,
  RaycastCommandMenuItem,
  RaycastCommandMenuSection,
} from "@/components/ui/totheprod-ui/raycast-command-menu/raycast-command-menu"
import {
  BlockGameIcon,
  ComputerIcon,
  GithubIcon,
  MoonIcon,
  NewTwitterIcon,
  Sun02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

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
    } else if (theme === "dark") {
      return [toggleThemeItem, systemThemeItem]
    } else {
      return [toggleThemeItem, systemThemeItem]
    }
  })()

  return (
    <RaycastCommandMenuDialog
      className="backdrop-blur-xl dark:bg-muted/75"
      title="Command Menu"
      description="Search for apps, commands, and actions"
    >
      <RaycastCommandMenuInput
        placeholder="Search for commands..."
        askAiLabel={false}
      />
      <RaycastCommandMenuContent emptyText="No commands found.">
        <RaycastCommandMenuSection title="Theme">
          {themeItems.map((item) => (
            <RaycastCommandMenuItem key={item.id} {...item} />
          ))}
        </RaycastCommandMenuSection>
        <RaycastCommandMenuSection title="Socials">
          <RaycastCommandMenuItem
            id="twitter"
            icon={<HugeiconsIcon icon={NewTwitterIcon} />}
            title="Twitter"
            onSelect={() => window.open("https://x.com/totheprod", "_blank")}
          />
          <RaycastCommandMenuItem
            id="github"
            icon={<HugeiconsIcon icon={GithubIcon} />}
            title="GitHub"
            onSelect={() =>
              window.open("https://github.com/totheprod", "_blank")
            }
          />
        </RaycastCommandMenuSection>

        {contentMap.map((section) => (
          <RaycastCommandMenuSection
            key={section.section}
            title={section.section}
          >
            {section.items.map((item) => (
              <RaycastCommandMenuItem
                key={item.id}
                id={item.id}
                icon={
                  "logo" in item && item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.title}
                      width={16}
                      height={16}
                    />
                  ) : section.icon ? (
                    section.icon
                  ) : (
                    <HugeiconsIcon icon={BlockGameIcon} />
                  )
                }
                title={item.title}
                description={item.description}
                onSelect={() => router.push(`/components/${item.id}`)}
              />
            ))}
          </RaycastCommandMenuSection>
        ))}
      </RaycastCommandMenuContent>
    </RaycastCommandMenuDialog>
  )
}
