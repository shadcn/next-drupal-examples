import { NextApiRequest, NextApiResponse } from "next"

import { drupal } from "lib/drupal"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    const articles = await drupal.getResourceCollection("node--article", {
      params: {
        include: "field_image,uid",
      },
    })

    response.json(articles)
  }

  response.end()
}
