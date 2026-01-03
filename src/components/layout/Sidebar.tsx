import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Icon } from "@/components/ui/icon"
import { Symbol } from "@/components/ui/symbol"
import { cn } from "@/lib/utils"
import type { Epic } from "@/types/hub"
import { getEpicProgress } from "@/hooks/useHubData"

interface SidebarProps {
  epics: Epic[]
  selectedEpic: number | null
  onSelectEpic: (id: number) => void
  theme: "light" | "dark"
  onToggleTheme: () => void
}

export function Sidebar({
  epics,
  selectedEpic,
  onSelectEpic,
  theme,
  onToggleTheme
}: SidebarProps) {
  return (
    <aside className="w-72 border-r border-border bg-card flex flex-col h-screen fixed left-0 top-0">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <Symbol name="infinity" className="text-primary text-lg" />
          <h1 className="text-lg font-bold">
            Content-to-App
          </h1>
        </div>
        <p className="text-xs text-muted-foreground font-serif">
          Hub de Desenvolvimento NEXORAMA
        </p>
      </div>

      {/* Epics List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Epics
          </p>
          {epics.map((epic) => {
            const progress = getEpicProgress(epic.stories)
            const isSelected = selectedEpic === epic.id

            return (
              <button
                key={epic.id}
                onClick={() => onSelectEpic(epic.id)}
                className={cn(
                  "w-full p-3 rounded-lg text-left transition-all",
                  "hover:bg-muted",
                  isSelected
                    ? "bg-primary/10 border border-primary/30"
                    : "border border-transparent"
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    isSelected ? "bg-primary/20" : "bg-muted"
                  )}>
                    <Icon
                      name={getEpicIcon(epic.id)}
                      size="size-4"
                      className={isSelected ? "text-primary" : "text-muted-foreground"}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium truncate",
                      isSelected ? "text-primary" : "text-foreground"
                    )}>
                      {epic.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {epic.stories.length} stories
                    </p>
                  </div>
                  <span className={cn(
                    "text-xs font-medium",
                    progress === 100 ? "text-success" : "text-muted-foreground"
                  )}>
                    {progress}%
                  </span>
                </div>
                <Progress value={progress} className="h-1" />
              </button>
            )
          })}
        </div>
      </ScrollArea>

      {/* Theme Toggle */}
      <Separator />
      <div className="p-4">
        <div className="flex gap-2">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            size="sm"
            className="flex-1"
            onClick={() => theme !== "light" && onToggleTheme()}
          >
            <Icon name="sun" size="size-4" className="mr-2" />
            Light
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            size="sm"
            className="flex-1"
            onClick={() => theme !== "dark" && onToggleTheme()}
          >
            <Icon name="moon" size="size-4" className="mr-2" />
            Dark
          </Button>
        </div>
      </div>
    </aside>
  )
}

function getEpicIcon(epicId: number): string {
  const icons: Record<number, string> = {
    0: "bullseye",      // Hub Visual
    1: "building",      // Arquitetura
    2: "megaphone",     // Marketing
    3: "rocket",        // Lançamento
    4: "chart-line-up", // Growth
  }
  return icons[epicId] || "folder"
}
