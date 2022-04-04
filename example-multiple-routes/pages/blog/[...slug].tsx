import * as React from "react"
import Image from "next/image"
import { getPathsFromContext, getResourceFromContext } from "next-drupal"

import { Layout } from "@/components/layout"

export default function ArticlePage({ article }) {
  return (
    <Layout>
      <article>
        <h1 className="mb-4 text-6xl font-black leading-tight">
          {article.title}
        </h1>
        {article.field_image?.uri && (
          <figure>
            <Image
              src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${article.field_image.uri.url}`}
              width={768}
              height={400}
              layout="responsive"
              objectFit="cover"
              alt={article.field_image.resourceIdObjMeta.alt}
            />
            {article.field_image.resourceIdObjMeta.title && (
              <figcaption className="py-2 text-sm text-center text-gray-600">
                {article.field_image.resourceIdObjMeta.title}
              </figcaption>
            )}
          </figure>
        )}
        {article.body?.processed && (
          <div
            dangerouslySetInnerHTML={{ __html: article.body?.processed }}
            className="mt-6 font-serif text-xl leading-loose prose"
          />
        )}
      </article>
    </Layout>
  )
}

export async function getStaticPaths(context) {
  return {
    paths: await getPathsFromContext(["node--article"], context),
    fallback: "blocking",
  }
}

export async function getStaticProps(context) {
  const article = await getResourceFromContext("node--article", context, {
    prefix: "blog",
    params: {
      include: "field_image,uid",
    },
  })

  if (!context.preview && article?.status === false) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article,
    },
  }
}
