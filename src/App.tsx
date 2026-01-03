import { useState } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { EpicDetail } from "@/components/features/EpicDetail"
import { useHubData, getTotalProgress } from "@/hooks/useHubData"
import { useTheme } from "@/hooks/useTheme"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Layers, TrendingUp, Target, Zap } from "lucide-react"

function App() {
  const { data, loading, error } = useHubData()
  const { theme, toggleTheme } = useTheme()
  const [selectedEpic, setSelectedEpic] = useState<number | null>(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Carregando Hub...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4 text-destructive">
          <p>Erro ao carregar dados</p>
          <p className="text-sm text-muted-foreground">{error?.message}</p>
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
          <div className="space-y-8">
            {/* Welcome Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">
                Bem-vindo ao{" "}
                <span className="text-gradient-brand">{data.project.name}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {data.project.tagline}
              </p>
            </div>

            {/* Progress Overview */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Progresso Geral
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end gap-4">
                  <span className="text-5xl font-bold text-primary">
                    {totalProgress}%
                  </span>
                  <span className="text-muted-foreground mb-2">
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
                    <Layers className="h-4 w-4" />
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
                    <TrendingUp className="h-4 w-4" />
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
                    <Zap className="h-4 w-4" />
                    Versão
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{data.project.version}</p>
                  <p className="text-xs text-muted-foreground">
                    Atualizado: {data.project.lastUpdated}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Acesso Rápido</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.epics.map((epic) => (
                  <Card
                    key={epic.id}
                    className="cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => setSelectedEpic(epic.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-3">
                        <span className="text-2xl">{epic.emoji}</span>
                        <span className="text-base">{epic.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        {epic.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span>{epic.stories.length} stories</span>
                        <span className="font-medium text-primary">
                          {Math.round(
                            (epic.stories.filter((s) => s.status === "done")
                              .length /
                              epic.stories.length) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
