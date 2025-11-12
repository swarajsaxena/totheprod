"use client"

import { CornerPlus } from "@/components/internal/CornerPlus"
import {
  RaycastCommandMenuContent,
  RaycastCommandMenuDialog,
  RaycastCommandMenuFooter,
  RaycastCommandMenuInput,
  RaycastCommandMenuItem,
  RaycastCommandMenuProvider,
  RaycastCommandMenuSection,
  useRaycastCommandMenuState,
} from "@/components/ui/totheprod-ui/raycast-command-menu/raycast-command-menu"
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

const RaycastCommandMenuTrigger = () => {
  const { setOpen } = useRaycastCommandMenuState()

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div className="w-full border-y border-dashed">
      <div
        onClick={handleOpen}
        className="relative z-10 mx-auto flex w-max cursor-pointer items-center gap-3 border-x border-dashed bg-background p-8 text-muted-foreground dark:bg-secondary"
      >
        <CornerPlus />
        <CornerPlus variant="leftBottom" />
        <CornerPlus variant="rightTop" />
        <CornerPlus variant="leftTop" />
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
      </div>
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
            id="recent-projects"
            icon={<FolderOpen className="size-4" />}
            title="Search Recent Projects"
            description="Cursor"
            type="Command"
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
          />
          <RaycastCommandMenuItem
            id="clipboard-history"
            icon={<ClipboardList className="size-4" />}
            title="Clipboard History"
            description="Clipboard Manager"
            type="Command"
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
          />
          <RaycastCommandMenuItem
            id="snippets"
            icon={<Zap className="size-4" />}
            title="Create Snippet"
            description="Snippets"
            type="Command"
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
          />
        </RaycastCommandMenuSection>

        {/* System Section */}
        <RaycastCommandMenuSection title="System">
          <RaycastCommandMenuItem
            id="system-settings"
            icon={<Settings className="size-4" />}
            title="System Settings"
            type="Command"
          />
          <RaycastCommandMenuItem
            id="empty-trash"
            icon={<XCircle className="size-4" />}
            title="Empty Trash"
            description="System"
            type="Command"
          />
          <RaycastCommandMenuItem
            id="lock-screen"
            icon={<Terminal className="size-4" />}
            title="Lock Screen"
            description="System"
            type="Command"
          />
          <RaycastCommandMenuItem
            id="restart"
            icon={<RotateCcw className="size-4" />}
            title="Restart"
            description="System"
            type="Command"
          />
        </RaycastCommandMenuSection>

        {/* Applications Section */}
        <RaycastCommandMenuSection title="Applications">
          <RaycastCommandMenuItem
            id="vscode"
            icon={<Code className="size-4" />}
            title="Visual Studio Code"
            type="Application"
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
          />
          <RaycastCommandMenuItem
            id="chrome"
            icon={<Globe className="size-4" />}
            title="Google Chrome"
            type="Application"
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
          />
          <RaycastCommandMenuItem
            id="terminal"
            icon={<Terminal className="size-4" />}
            title="Terminal"
            type="Application"
          />
          <RaycastCommandMenuItem
            id="mail"
            icon={<Mail className="size-4" />}
            title="Mail"
            type="Application"
          />
          <RaycastCommandMenuItem
            id="calendar"
            icon={<Calendar className="size-4" />}
            title="Calendar"
            type="Application"
          />
          <RaycastCommandMenuItem
            id="music"
            icon={<Music className="size-4" />}
            title="Music"
            type="Application"
          />
        </RaycastCommandMenuSection>

        {/* Productivity Section */}
        <RaycastCommandMenuSection title="Productivity">
          <RaycastCommandMenuItem
            id="notion"
            icon={<FileText className="size-4" />}
            title="Notion"
            description="Open workspace"
            type="Application"
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
          />
          <RaycastCommandMenuItem
            id="linear"
            icon={<Layers className="size-4" />}
            title="Linear"
            description="Manage issues"
            type="Application"
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
          />
          <RaycastCommandMenuItem
            id="whatsapp"
            icon={<MessageSquare className="size-4" />}
            title="WhatsApp"
            type="Application"
          />
          <RaycastCommandMenuItem
            id="slack"
            icon={<Hash className="size-4" />}
            title="Slack"
            description="Team communication"
            type="Application"
          />
        </RaycastCommandMenuSection>

        {/* Tools Section */}
        <RaycastCommandMenuSection title="Tools">
          <RaycastCommandMenuItem
            id="convert-color"
            icon={<Palette className="size-4" />}
            title="Convert Color"
            description="Color Picker"
            type="Command"
          />
          <RaycastCommandMenuItem
            id="search-files"
            icon={<Search className="size-4" />}
            title="Search Files"
            description="File Search"
            type="Command"
          />
          <RaycastCommandMenuItem
            id="world-clock"
            icon={<Clock className="size-4" />}
            title="World Clock"
            description="Time zones"
            type="Command"
          />
          <RaycastCommandMenuItem
            id="image-optimizer"
            icon={<Image className="size-4" />}
            title="Optimize Image"
            description="Image Tools"
            type="Command"
          />
          <RaycastCommandMenuItem
            id="screen-record"
            icon={<Video className="size-4" />}
            title="Record Screen"
            description="Screen Recording"
            type="Command"
          />
        </RaycastCommandMenuSection>

        {/* AI Commands Section */}
        <RaycastCommandMenuSection title="AI Commands" isLast>
          <RaycastCommandMenuItem
            id="ask-webpage"
            icon={<MessageCircle className="size-4" />}
            title="Ask About Webpage"
            description="Raycast AI"
            type="AI Command"
          />
          <RaycastCommandMenuItem
            id="summarize"
            icon={<Sparkles className="size-4" />}
            title="Summarize Text"
            description="Raycast AI"
            type="AI Command"
          />
          <RaycastCommandMenuItem
            id="improve-writing"
            icon={<Sparkles className="size-4" />}
            title="Improve Writing"
            description="Raycast AI"
            type="AI Command"
          />
          <RaycastCommandMenuItem
            id="explain-code"
            icon={<Code className="size-4" />}
            title="Explain Code"
            description="Raycast AI"
            type="AI Command"
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
          />
        </RaycastCommandMenuSection>
      </RaycastCommandMenuContent>
      <RaycastCommandMenuFooter />
    </RaycastCommandMenuDialog>
  )
}

const RaycastCommandMenuPreviewContent = () => {
  return (
    <div className="no-padding relative flex h-full w-full flex-1 items-center justify-center">
      <RaycastCommandMenuTrigger />
      <RaycastCommandMenuPreviewDialog />
    </div>
  )
}

export const RaycastCommandMenuPreview = () => {
  return (
    <RaycastCommandMenuProvider shortcut="mod+j" actionsShortcut="alt+j">
      <RaycastCommandMenuPreviewContent />
    </RaycastCommandMenuProvider>
  )
}
