# example-multiple-routes

Using multiple routes to structure pages, data fetching and components.

Next.js does not support multiple segments for dynamic routes. The following does not work.

```
.
└── pages
    ├── [...blogSlug].tsx
    └── [...propertySlug].tsx
```

To help with this, `next-drupal` data fetchers has a `prefix` option you can leverage to structure your pages into subdirectories.

```
.
└── pages
    ├── blog
    │   └── [...slug].tsx
    ├── properties
    │   └── [...slug].tsx
    └── [...slug].tsx
```

- `pages/[...slug].tsx` is resposible for fetching and rendering the root routes (`/`).
- `pages/blog/[...slug].tsx` fetches post data and renders articles at `/blog/slug-for-article`.
- `pages/propeties/[...slug].tsx` fetches property data for `/properties/slug-for-property`.

## How it works

1. Remove the subdir from the paths in `getStaticPaths`
2. Use the `prefix` options when fetching data in `getResourceFromContext`

For `pages/blog/[...slug].tsx`

```ts
export async function getStaticPaths(context) {
  const paths = await getPathsFromContext(["node--article"], context)

  // 1️⃣ Delete the "blog" prefix for route. <---------------
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
  const article = await getResourceFromContext("node--article", context, {
    prefix: "blog", // 2️⃣ Prefix with the subdir path. <---------------
    params: {
      include: "field_image,uid",
    },
  })
}
```

For `pages/properties/[...slug].tsx`

```ts
export async function getStaticPaths(context) {
  return {
    paths: await getPathsFromContext(["node--property_listing"], context),
    fallback: "blocking",
  }
}

export async function getStaticProps(context) {
  const article = await getResourceFromContext(
    "node--property_listing",
    context,
    {
      prefix: "properties", // <----- Prefix with the subdir path.
      params: {
        include: "field_images.field_media_image,field_location",
      },
    }
  )
}
```
