import { drupal } from "@/lib/drupal"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    // Check if we have a session.
    const session = await getSession({ req: request })

    // If not, respond with unauthorized.
    if (!session) {
      return response.status(403).end()
    }

    // Get the content of body.
    const { title } = JSON.parse(request.body)

    // Create a JSON:API payload.
    const body = {
      data: {
        type: "node--article",
        attributes: {
          title,
        },
      },
    }

    // Set the Bearer token.
    drupal.auth = () => `Bearer ${session.accessToken}`

    const url = drupal.buildUrl("/jsonapi/node/article")

    // Make a POST request to create the article.
    const result = await drupal.fetch(url.toString(), {
      // Tell DrupalClient to make an authenticated call.
      withAuth: true,
      method: "POST",
      body: JSON.stringify(body),
    })

    if (!result.ok) {
      throw new Error("Something went wrong. Please try again.")
    }

    // Article has been created. Respond with 201.
    return response.status(201).json({})
  } catch (error) {
    return response.status(422).end()
  }
}
