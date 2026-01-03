import { useState, useEffect } from "react"
import type { HubData } from "@/types/hub"

export function useHubData() {
  const [data, setData] = useState<HubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/data.json")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const json = await response.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function getEpicProgress(stories: { status: string }[]): number {
  if (stories.length === 0) return 0
  const completed = stories.filter((s) => s.status === "done").length
  return Math.round((completed / stories.length) * 100)
}

export function getTotalProgress(epics: { stories: { status: string }[] }[]): number {
  const allStories = epics.flatMap((e) => e.stories)
  return getEpicProgress(allStories)
}
