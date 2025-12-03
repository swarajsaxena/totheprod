"use client"

import {
  BlockGameIcon,
  ComputerIcon,
  GithubIcon,
  MoonIcon,
  NewTwitterIcon,
  SidebarLeft01FreeIcons,
  Sun02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useAtom } from "jotai"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { contentMap } from "@/app/components/[id]/constants"
import {
  RaycastCommandMenuContent,
  RaycastCommandMenuDialog,
  RaycastCommandMenuInput,
  RaycastCommandMenuItem,
  RaycastCommandMenuSection,
} from "@/components/ui/totheprod-ui/ttp-raycast-command-menu"
import { sidebarOpenAtom } from "@/store/atoms"

export const GlobalCommandMenu = () => {
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom)
  const isComponentPage = pathname.startsWith("/components/")

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
    <RaycastCommandMenuDialog
      className="backdrop-blur-xl dark:bg-muted/75"
      description="Search for apps, commands, and actions"
      title="Command Menu"
    >
      <RaycastCommandMenuInput
        askAiLabel={false}
        placeholder="Search for commands..."
      />
      <RaycastCommandMenuContent emptyText="No commands found.">
        {isComponentPage && (
          <RaycastCommandMenuSection title="Navigation">
            <RaycastCommandMenuItem
              description={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
              icon={<HugeiconsIcon icon={SidebarLeft01FreeIcons} />}
              id="toggle-sidebar"
              onSelect={() => setSidebarOpen(!sidebarOpen)}
              shortcut="mod+b"
              title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            />
          </RaycastCommandMenuSection>
        )}
        <RaycastCommandMenuSection title="Theme">
          {themeItems.map((item) => (
            <RaycastCommandMenuItem key={item.id} {...item} />
          ))}
        </RaycastCommandMenuSection>
        <RaycastCommandMenuSection title="Socials">
          <RaycastCommandMenuItem
            icon={<HugeiconsIcon icon={NewTwitterIcon} />}
            id="twitter"
            onSelect={() => window.open("https://x.com/totheprod", "_blank")}
            title="Twitter"
          />
          <RaycastCommandMenuItem
            icon={<HugeiconsIcon icon={GithubIcon} />}
            id="github"
            onSelect={() =>
              window.open("https://github.com/totheprod", "_blank")
            }
            title="GitHub"
          />
        </RaycastCommandMenuSection>

        {contentMap.map((section) => (
          <RaycastCommandMenuSection
            key={section.section}
            title={section.section}
          >
            {section.items.map((item) => (
              <RaycastCommandMenuItem
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
          </RaycastCommandMenuSection>
        ))}
      </RaycastCommandMenuContent>
    </RaycastCommandMenuDialog>
  )
}
