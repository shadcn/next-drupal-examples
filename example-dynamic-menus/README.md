# example-dynamic-menus

An example showing how to implement dynamic menus using an API route.

## Guide

### Step 1: Implement an API route to fetch menus

```ts
// pages/api/menus/[name].ts
import { drupal } from "lib/drupal"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Only allow GET requests.
    if (req.method !== "GET") {
      return res.status(405).end()
    }

    const name = req.query.name as string

    // Fetch the menu from drupal.
    const { items } = await drupal.getMenu(name)

    return res.json(items)
  } catch (error) {
    res.status(422).end()
  }
}
```

### Step 2: Create a `useMenu` hook

This `useMenu` uses `@tanstack/react-query`. Make sure you have this installed.

```ts
// lib/use-menu.ts
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
```

### Step 3: Fetch menu and render in your components

```tsx
// components/layout.tsx
import Link from "next/link"

import { useMenu } from "hooks/use-menu"

export function Layout({ children }) {
  const { data: menu } = useMenu("main")

  return (
    <>
      <div>
        <header>
          <div className="flex space-x-8">
            {menu?.map((item) => (
              <Link key={item.id} href={item.url} passHref>
                <a>{item.title}</a>
              </Link>
            ))}
          </div>
        </header>
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </>
  )
}
```
