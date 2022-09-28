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
