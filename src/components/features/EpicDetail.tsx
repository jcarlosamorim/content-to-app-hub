import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import type { Epic, StoryStatus } from "@/types/hub"
import { getEpicProgress } from "@/hooks/useHubData"

interface EpicDetailProps {
  epic: Epic
}

const statusConfig: Record<StoryStatus, { icon: string; variant: "done" | "in-progress" | "todo" | "locked" }> = {
  done: { icon: "check", variant: "done" },
  "in-progress": { icon: "spinner", variant: "in-progress" },
  todo: { icon: "circle", variant: "todo" },
  locked: { icon: "lock", variant: "locked" }
}

function getEpicIcon(epicId: number): string {
  const icons: Record<number, string> = {
    0: "bullseye",
    1: "building",
    2: "megaphone",
    3: "rocket",
    4: "chart-line-up",
  }
  return icons[epicId] || "folder"
}

function renderContent(content: Record<string, unknown>, depth = 0): React.ReactNode {
  return (
    <div className={cn("space-y-2", depth > 0 && "ml-4 mt-2")}>
      {Object.entries(content).map(([key, value]) => {
        if (value === null || value === undefined) return null

        if (Array.isArray(value)) {
          return (
            <div key={key} className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground uppercase">
                {key.replace(/_/g, " ")}
              </span>
              <ul className="space-y-1">
                {value.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm font-serif">
                    <Icon name="angle-right" size="size-3" className="mt-1.5 text-primary shrink-0" />
                    {typeof item === "object" ? (
                      renderContent(item as Record<string, unknown>, depth + 1)
                    ) : (
                      <span>{String(item)}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )
        }

        if (typeof value === "object") {
          return (
            <div key={key} className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground uppercase">
                {key.replace(/_/g, " ")}
              </span>
              {renderContent(value as Record<string, unknown>, depth + 1)}
            </div>
          )
        }

        return (
          <div key={key} className="flex items-start gap-2">
            <span className="text-xs font-medium text-muted-foreground min-w-[100px]">
              {key.replace(/_/g, " ")}:
            </span>
            <span className="text-sm font-serif">{String(value)}</span>
          </div>
        )
      })}
    </div>
  )
}

export function EpicDetail({ epic }: EpicDetailProps) {
  const progress = getEpicProgress(epic.stories)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name={getEpicIcon(epic.id)} size="size-6" className="text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{epic.name}</h2>
            <p className="text-muted-foreground font-serif">{epic.description}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">{progress}%</p>
            <p className="text-xs text-muted-foreground">Concluído</p>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Stories */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Stories</h3>
        <Accordion type="single" collapsible className="space-y-2">
          {epic.stories.map((story) => {
            const config = statusConfig[story.status as StoryStatus]
            return (
              <AccordionItem
                key={story.id}
                value={story.id}
                className="border rounded-lg bg-card"
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-3 flex-1">
                    <Badge variant={config.variant} size="sm">
                      <Icon name={config.icon} size="size-3" />
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">
                      {story.id}
                    </span>
                    <span className="font-medium">{story.name}</span>
                    {story.minds && story.minds.length > 0 && (
                      <div className="flex gap-1 ml-auto mr-4">
                        {story.minds.map((mind) => (
                          <Badge key={mind} variant="outline" size="sm">
                            {mind}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <Card className="bg-muted/30 border-0">
                    <CardContent className="pt-4">
                      {renderContent(story.content)}
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
