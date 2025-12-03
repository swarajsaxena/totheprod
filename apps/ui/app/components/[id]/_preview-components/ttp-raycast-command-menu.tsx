"use client"

import {
  Calendar,
  ClipboardList,
  Clock,
  Code,
  Copy,
  Edit,
  ExternalLink,
  FileText,
  FolderOpen,
  Globe,
  Hash,
  Image,
  Layers,
  Mail,
  MessageCircle,
  MessageSquare,
  Music,
  Palette,
  RotateCcw,
  Search,
  Settings,
  Share2,
  Sparkles,
  Star,
  Terminal,
  Trash2,
  Video,
  XCircle,
  Zap,
} from "lucide-react"
import { toast } from "sonner"
import CornerPlusContainer from "@/components/internal/corner-plus-container"
import {
  RaycastCommandMenuContent,
  RaycastCommandMenuDialog,
  RaycastCommandMenuFooter,
  RaycastCommandMenuInput,
  RaycastCommandMenuItem,
  RaycastCommandMenuProvider,
  RaycastCommandMenuSection,
  useTtpRaycastCommandMenuState,
} from "@/components/ui/totheprod-ui/ttp-raycast-command-menu"

const RaycastCommandMenuTrigger = () => {
  const { setOpen } = useTtpRaycastCommandMenuState()

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div className="w-full">
      <CornerPlusContainer>
        <button
          aria-label="Open command menu"
          className="flex w-max cursor-pointer items-center gap-3 bg-background p-8 text-muted-foreground dark:bg-secondary"
          onClick={handleOpen}
          type="button"
        >
          <Sparkles className="size-4" />
          <span className="font-medium text-sm">Open Command Menu</span>
          <div>
            <span className="pointer-events-none inline-flex select-none items-center justify-center rounded border bg-secondary p-1 px-2 font-medium font-mono text-xs dark:bg-muted/10">
              Ctrl
            </span>
            <span className="mx-1 text-muted-foreground text-xs">+</span>
            <kbd className="pointer-events-none inline-flex select-none items-center justify-center rounded border bg-secondary p-1 px-2 font-medium font-mono text-xs dark:bg-muted/10">
              j
            </kbd>
          </div>
        </button>
      </CornerPlusContainer>
    </div>
  )
}

const RaycastCommandMenuPreviewDialog = () => {
  return (
    <RaycastCommandMenuDialog>
      <RaycastCommandMenuInput placeholder="Search for apps and commands..." />
      <RaycastCommandMenuContent>
        {/* Favorites Section */}
        <RaycastCommandMenuSection title="Favorites">
          <RaycastCommandMenuItem
            actions={[
              {
                id: "open",
                icon: <ExternalLink className="size-4" />,
                label: "Open in New Window",
                shortcut: ["⌘", "O"],
                onAction: () => toast("Opening in new window"),
              },
              {
                id: "copy-path",
                icon: <Copy className="size-4" />,
                label: "Copy Path",
                shortcut: ["⌘", "C"],
                onAction: () => toast("Copying path"),
              },
              {
                id: "star",
                icon: <Star className="size-4" />,
                label: "Add to Favorites",
                shortcut: ["⌘", "F"],
                onAction: () => toast("Added to favorites"),
              },
            ]}
            description="Cursor"
            icon={<FolderOpen className="size-4" />}
            id="recent-projects"
            title="Search Recent Projects"
            type="Command"
          />
          <RaycastCommandMenuItem
            actions={[
              {
                id: "paste",
                icon: <Copy className="size-4" />,
                label: "Paste",
                shortcut: ["⌘", "V"],
                onAction: () => toast("Pasting"),
              },
              {
                id: "clear",
                icon: <Trash2 className="size-4" />,
                label: "Clear History",
                shortcut: ["⌘", "⌫"],
                onAction: () => toast("Clearing history"),
              },
            ]}
            description="Clipboard Manager"
            icon={<ClipboardList className="size-4" />}
            id="clipboard-history"
            title="Clipboard History"
            type="Command"
          />
          <RaycastCommandMenuItem
            actions={[
              {
                id: "create",
                icon: <Edit className="size-4" />,
                label: "Create New Snippet",
                shortcut: ["⌘", "N"],
                onAction: () => toast("Creating snippet"),
              },
              {
                id: "browse",
                icon: <Search className="size-4" />,
                label: "Browse Snippets",
                shortcut: ["⌘", "B"],
                onAction: () => toast("Browsing snippets"),
              },
            ]}
            description="Snippets"
            icon={<Zap className="size-4" />}
            id="snippets"
            title="Create Snippet"
            type="Command"
          />
        </RaycastCommandMenuSection>

        {/* System Section */}
        <RaycastCommandMenuSection title="System">
          <RaycastCommandMenuItem
            icon={<Settings className="size-4" />}
            id="system-settings"
            title="System Settings"
            type="Command"
          />
          <RaycastCommandMenuItem
            description="System"
            icon={<XCircle className="size-4" />}
            id="empty-trash"
            title="Empty Trash"
            type="Command"
          />
          <RaycastCommandMenuItem
            description="System"
            icon={<Terminal className="size-4" />}
            id="lock-screen"
            title="Lock Screen"
            type="Command"
          />
          <RaycastCommandMenuItem
            description="System"
            icon={<RotateCcw className="size-4" />}
            id="restart"
            title="Restart"
            type="Command"
          />
        </RaycastCommandMenuSection>

        {/* Applications Section */}
        <RaycastCommandMenuSection title="Applications">
          <RaycastCommandMenuItem
            actions={[
              {
                id: "open",
                icon: <ExternalLink className="size-4" />,
                label: "Open",
                shortcut: ["↩"],
                onAction: () => toast("Opening VSCode"),
              },
              {
                id: "new-window",
                icon: <ExternalLink className="size-4" />,
                label: "Open New Window",
                shortcut: ["⌘", "N"],
                onAction: () => toast("Opening new window"),
              },
              {
                id: "reveal",
                icon: <Search className="size-4" />,
                label: "Reveal in Finder",
                shortcut: ["⌘", "R"],
                onAction: () => toast("Revealing in Finder"),
              },
            ]}
            icon={<Code className="size-4" />}
            id="vscode"
            title="Visual Studio Code"
            type="Application"
          />
          <RaycastCommandMenuItem
            actions={[
              {
                id: "open",
                icon: <ExternalLink className="size-4" />,
                label: "Open",
                shortcut: ["↩"],
                onAction: () => toast("Opening Chrome"),
              },
              {
                id: "incognito",
                icon: <ExternalLink className="size-4" />,
                label: "Open Incognito Window",
                shortcut: ["⌘", "⇧", "N"],
                onAction: () => toast("Opening incognito"),
              },
            ]}
            icon={<Globe className="size-4" />}
            id="chrome"
            title="Google Chrome"
            type="Application"
          />
          <RaycastCommandMenuItem
            icon={<Terminal className="size-4" />}
            id="terminal"
            title="Terminal"
            type="Application"
          />
          <RaycastCommandMenuItem
            icon={<Mail className="size-4" />}
            id="mail"
            title="Mail"
            type="Application"
          />
          <RaycastCommandMenuItem
            icon={<Calendar className="size-4" />}
            id="calendar"
            title="Calendar"
            type="Application"
          />
          <RaycastCommandMenuItem
            icon={<Music className="size-4" />}
            id="music"
            title="Music"
            type="Application"
          />
        </RaycastCommandMenuSection>

        {/* Productivity Section */}
        <RaycastCommandMenuSection title="Productivity">
          <RaycastCommandMenuItem
            actions={[
              {
                id: "open",
                icon: <ExternalLink className="size-4" />,
                label: "Open Workspace",
                shortcut: ["↩"],
                onAction: () => toast("Opening Notion"),
              },
              {
                id: "new-page",
                icon: <FileText className="size-4" />,
                label: "Create New Page",
                shortcut: ["⌘", "N"],
                onAction: () => toast("Creating new page"),
              },
              {
                id: "search",
                icon: <Search className="size-4" />,
                label: "Search Pages",
                shortcut: ["⌘", "P"],
                onAction: () => toast("Searching pages"),
              },
              {
                id: "share",
                icon: <Share2 className="size-4" />,
                label: "Share Workspace",
                shortcut: ["⌘", "S"],
                onAction: () => toast("Sharing workspace"),
              },
            ]}
            description="Open workspace"
            icon={<FileText className="size-4" />}
            id="notion"
            title="Notion"
            type="Application"
          />
          <RaycastCommandMenuItem
            actions={[
              {
                id: "open",
                icon: <ExternalLink className="size-4" />,
                label: "Open Linear",
                shortcut: ["↩"],
                onAction: () => toast("Opening Linear"),
              },
              {
                id: "create-issue",
                icon: <Edit className="size-4" />,
                label: "Create Issue",
                shortcut: ["⌘", "I"],
                onAction: () => toast("Creating issue"),
              },
              {
                id: "my-issues",
                icon: <ClipboardList className="size-4" />,
                label: "My Issues",
                shortcut: ["⌘", "M"],
                onAction: () => toast("Viewing my issues"),
              },
            ]}
            description="Manage issues"
            icon={<Layers className="size-4" />}
            id="linear"
            title="Linear"
            type="Application"
          />
          <RaycastCommandMenuItem
            icon={<MessageSquare className="size-4" />}
            id="whatsapp"
            title="WhatsApp"
            type="Application"
          />
          <RaycastCommandMenuItem
            description="Team communication"
            icon={<Hash className="size-4" />}
            id="slack"
            title="Slack"
            type="Application"
          />
        </RaycastCommandMenuSection>

        {/* Tools Section */}
        <RaycastCommandMenuSection title="Tools">
          <RaycastCommandMenuItem
            description="Color Picker"
            icon={<Palette className="size-4" />}
            id="convert-color"
            title="Convert Color"
            type="Command"
          />
          <RaycastCommandMenuItem
            description="File Search"
            icon={<Search className="size-4" />}
            id="search-files"
            title="Search Files"
            type="Command"
          />
          <RaycastCommandMenuItem
            description="Time zones"
            icon={<Clock className="size-4" />}
            id="world-clock"
            title="World Clock"
            type="Command"
          />
          <RaycastCommandMenuItem
            description="Image Tools"
            icon={<Image className="size-4" />}
            id="image-optimizer"
            title="Optimize Image"
            type="Command"
          />
          <RaycastCommandMenuItem
            description="Screen Recording"
            icon={<Video className="size-4" />}
            id="screen-record"
            title="Record Screen"
            type="Command"
          />
        </RaycastCommandMenuSection>

        {/* AI Commands Section */}
        <RaycastCommandMenuSection isLast title="AI Commands">
          <RaycastCommandMenuItem
            description="Raycast AI"
            icon={<MessageCircle className="size-4" />}
            id="ask-webpage"
            title="Ask About Webpage"
            type="AI Command"
          />
          <RaycastCommandMenuItem
            description="Raycast AI"
            icon={<Sparkles className="size-4" />}
            id="summarize"
            title="Summarize Text"
            type="AI Command"
          />
          <RaycastCommandMenuItem
            description="Raycast AI"
            icon={<Sparkles className="size-4" />}
            id="improve-writing"
            title="Improve Writing"
            type="AI Command"
          />
          <RaycastCommandMenuItem
            actions={[
              {
                id: "explain",
                icon: <Sparkles className="size-4" />,
                label: "Explain Selected Code",
                shortcut: ["↩"],
                onAction: () => toast("Explaining code"),
              },
              {
                id: "improve",
                icon: <Sparkles className="size-4" />,
                label: "Suggest Improvements",
                shortcut: ["⌘", "I"],
                onAction: () => toast("Suggesting improvements"),
              },
              {
                id: "refactor",
                icon: <Code className="size-4" />,
                label: "Refactor Code",
                shortcut: ["⌘", "R"],
                onAction: () => toast("Refactoring code"),
              },
            ]}
            description="Raycast AI"
            icon={<Code className="size-4" />}
            id="explain-code"
            title="Explain Code"
            type="AI Command"
          />
        </RaycastCommandMenuSection>
      </RaycastCommandMenuContent>
      <RaycastCommandMenuFooter />
    </RaycastCommandMenuDialog>
  )
}

const RaycastCommandMenuPreviewContent = () => {
  return (
    <div
      className="relative flex h-full w-full flex-1 items-center justify-center"
      data-preview-padding="false"
    >
      <RaycastCommandMenuTrigger />
      <RaycastCommandMenuPreviewDialog />
    </div>
  )
}

export const TtpRaycastCommandMenuPreview = () => {
  return (
    <RaycastCommandMenuProvider actionsShortcut="alt+j" shortcut="mod+j">
      <RaycastCommandMenuPreviewContent />
    </RaycastCommandMenuProvider>
  )
}
