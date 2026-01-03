import { Check, Circle, Loader2, Lock, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import type { Epic, StoryStatus } from "@/types/hub"
import { getEpicProgress } from "@/hooks/useHubData"

interface EpicDetailProps {
  epic: Epic
}

const statusIcons: Record<StoryStatus, React.ReactNode> = {
  done: <Check className="h-4 w-4" />,
  "in-progress": <Loader2 className="h-4 w-4 animate-spin" />,
  todo: <Circle className="h-4 w-4" />,
  locked: <Lock className="h-4 w-4" />
}

const statusVariants: Record<StoryStatus, "done" | "in-progress" | "todo" | "locked"> = {
  done: "done",
  "in-progress": "in-progress",
  todo: "todo",
  locked: "locked"
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
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-3 w-3 mt-1.5 text-primary shrink-0" />
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
            <span className="text-sm">{String(value)}</span>
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
          <span className="text-4xl">{epic.emoji}</span>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{epic.name}</h2>
            <p className="text-muted-foreground">{epic.description}</p>
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
          {epic.stories.map((story) => (
            <AccordionItem
              key={story.id}
              value={story.id}
              className="border rounded-lg bg-card"
            >
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3 flex-1">
                  <Badge variant={statusVariants[story.status as StoryStatus]} size="sm">
                    {statusIcons[story.status as StoryStatus]}
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
          ))}
        </Accordion>
      </div>
    </div>
  )
}
