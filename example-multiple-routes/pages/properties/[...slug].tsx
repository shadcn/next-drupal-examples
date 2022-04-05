import * as React from "react"
import Image from "next/image"
import { getPathsFromContext, getResourceFromContext } from "next-drupal"

import { Layout } from "@/components/layout"

export default function PropertyPage({ property }) {
  if (!property) return null

  const thumbnail = property?.field_images?.[0].field_media_image

  return (
    <Layout>
      <article className="prose">
        <h1 className="mb-4 text-6xl font-black leading-tight">
          {property.title}
        </h1>
        {thumbnail && (
          <Image
            src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${thumbnail.uri.url}`}
            width={360}
            height={240}
            layout="responsive"
            objectFit="cover"
          />
        )}
        {property.body?.processed && (
          <div
            dangerouslySetInnerHTML={{ __html: property.body?.processed }}
            className="mt-6 font-serif text-xl leading-loose prose"
          />
        )}
      </article>
    </Layout>
  )
}

export async function getStaticPaths(context) {
  const paths = await getPathsFromContext(["node--property_listing"], context)

  // Delete the "properties" prefix for route.
  paths.map((path) => {
    if (typeof path !== "string" && Array.isArray(path.params.slug)) {
      path.params.slug.shift()
    }

    return path
  })

  return {
    paths,
    fallback: "blocking",
  }
}

export async function getStaticProps(context) {
  const property = await getResourceFromContext(
    "node--property_listing",
    context,
    {
      prefix: "properties",
      params: {
        include: "field_images.field_media_image,field_location",
      },
    }
  )

  if (!context.preview && property?.status === false) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      property,
    },
  }
}
