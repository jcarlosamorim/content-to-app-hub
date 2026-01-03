export interface Project {
  name: string
  tagline: string
  version: string
  lastUpdated: string
}

export interface Story {
  id: string
  name: string
  status: "done" | "in-progress" | "todo" | "locked"
  minds?: string[]
  content: Record<string, unknown>
}

export interface Epic {
  id: number
  name: string
  emoji: string
  description: string
  color: "purple" | "blue" | "cyan" | "green" | "orange"
  stories: Story[]
}

export interface ValueLadderItem {
  name: string
  price: string
  description: string
  status: "active" | "locked"
  level: number
}

export interface HubData {
  project: Project
  epics: Epic[]
  valueLadder?: ValueLadderItem[]
}

export type StoryStatus = Story["status"]
export type EpicColor = Epic["color"]

export const STATUS_CONFIG = {
  done: {
    label: "Concluído",
    variant: "success" as const,
    icon: "check"
  },
  "in-progress": {
    label: "Em Progresso",
    variant: "info" as const,
    icon: "loader"
  },
  todo: {
    label: "A Fazer",
    variant: "secondary" as const,
    icon: "circle"
  },
  locked: {
    label: "Bloqueado",
    variant: "outline" as const,
    icon: "lock"
  }
}

export const COLOR_CONFIG: Record<EpicColor, string> = {
  purple: "bg-purple-500/20 border-purple-500/50 text-purple-400",
  blue: "bg-blue-500/20 border-blue-500/50 text-blue-400",
  cyan: "bg-cyan-500/20 border-cyan-500/50 text-cyan-400",
  green: "bg-green-500/20 border-green-500/50 text-green-400",
  orange: "bg-orange-500/20 border-orange-500/50 text-orange-400"
}
