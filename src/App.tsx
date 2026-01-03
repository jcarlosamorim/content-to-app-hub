import { useState } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { EpicDetail } from "@/components/features/EpicDetail"
import { useHubData, getTotalProgress } from "@/hooks/useHubData"
import { useTheme } from "@/hooks/useTheme"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { Symbol } from "@/components/ui/symbol"

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

function App() {
  const { data, loading, error } = useHubData()
  const { theme, toggleTheme } = useTheme()
  const [selectedEpic, setSelectedEpic] = useState<number | null>(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <Icon name="spinner" size="size-10" className="animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground font-serif">Carregando Hub...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4 text-destructive">
          <Icon name="exclamation" size="size-10" className="mx-auto" />
          <p>Erro ao carregar dados</p>
          <p className="text-sm text-muted-foreground font-serif">{error?.message}</p>
        </div>
      </div>
    )
  }

  const totalProgress = getTotalProgress(data.epics)
  const currentEpic = data.epics.find((e) => e.id === selectedEpic)
  const totalStories = data.epics.reduce((acc, e) => acc + e.stories.length, 0)
  const completedStories = data.epics.reduce(
    (acc, e) => acc + e.stories.filter((s) => s.status === "done").length,
    0
  )

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        epics={data.epics}
        selectedEpic={selectedEpic}
        onSelectEpic={setSelectedEpic}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 ml-72 p-8">
        {currentEpic ? (
          <EpicDetail epic={currentEpic} />
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Welcome Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Symbol name="infinity" className="text-primary text-2xl" />
                <h1 className="text-3xl font-bold">
                  {data.project.name}
                </h1>
              </div>
              <p className="text-lg text-muted-foreground font-serif">
                {data.project.tagline}
              </p>
            </div>

            {/* Progress Overview */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="bullseye" size="size-5" className="text-primary" />
                  Progresso Geral
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end gap-4">
                  <span className="text-5xl font-bold text-primary">
                    {totalProgress}%
                  </span>
                  <span className="text-muted-foreground mb-2 font-serif">
                    {completedStories} de {totalStories} stories concluídas
                  </span>
                </div>
                <Progress value={totalProgress} className="h-3" />
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="layers" size="size-4" />
                    Total de Epics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{data.epics.length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="check" size="size-4" />
                    Stories Concluídas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-success">
                    {completedStories}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="info" size="size-4" />
                    Versão
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{data.project.version}</p>
                  <p className="text-xs text-muted-foreground font-serif">
                    Atualizado: {data.project.lastUpdated}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Acesso Rápido</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.epics.map((epic) => {
                  const epicProgress = Math.round(
                    (epic.stories.filter((s) => s.status === "done").length /
                      epic.stories.length) *
                      100
                  )
                  return (
                    <Card
                      key={epic.id}
                      className="cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => setSelectedEpic(epic.id)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <Icon
                              name={getEpicIcon(epic.id)}
                              size="size-5"
                              className="text-muted-foreground"
                            />
                          </div>
                          <span className="text-base">{epic.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2 font-serif">
                          {epic.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span>{epic.stories.length} stories</span>
                          <span className="font-medium text-primary">
                            {epicProgress}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
