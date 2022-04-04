import * as React from "react"
import { getPathsFromContext, getResourceFromContext } from "next-drupal"

import { Layout } from "@/components/layout"

export default function BasicPage({ page }) {
  return (
    <Layout>
      <article>
        <h1 className="mb-4 text-6xl font-black leading-tight">{page.title}</h1>
        {page.body?.processed && (
          <div
            dangerouslySetInnerHTML={{ __html: page.body?.processed }}
            className="mt-6 font-serif text-xl leading-loose prose"
          />
        )}
      </article>
    </Layout>
  )
}

export async function getStaticPaths(context) {
  return {
    paths: await getPathsFromContext(["node--page"], context),
    fallback: "blocking",
  }
}

export async function getStaticProps(context) {
  const page = await getResourceFromContext("node--page", context)

  if (!context.preview && page?.status === false) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
    },
  }
}
