import Head from "next/head"
import { useQuery } from "@tanstack/react-query"

import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"

export default function IndexPage() {
  const { data, isLoading } = useQuery(["articles"], async () => {
    const response = await fetch("http://localhost:3000/api/articles")

    return await response.json()
  })

  return (
    <Layout>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Latest Articles.</h1>
        {isLoading ? (
          <p>Loading articles...</p>
        ) : (
          data.map((node) => (
            <div key={node.id}>
              <NodeArticleTeaser node={node} />
              <hr className="my-20" />
            </div>
          ))
        )}
      </div>
    </Layout>
  )
}
