import { DrupalMenuLinkContent } from "next-drupal"
import { useQuery } from "@tanstack/react-query"

export function useMenu(name: string) {
  return useQuery<DrupalMenuLinkContent[]>(
    ["menus", name],
    async () => {
      const response = await fetch(`/api/menus/${name}`)

      if (!response?.ok) {
        throw new Error()
      }

      return await response.json()
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: 0,
    }
  )
}
