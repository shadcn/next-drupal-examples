# example-params-builder

A proof-of-concept for building (fully-typed) JSON:API params using (Drupal JSON:API Params)[https://github.com/d34dman/drupal-jsonapi-params].

**The idea here is that (in almost all cases) the shape of your JSON:API data will match the shape of props of your components.**

## Links

1. See `lib/params` for the params builder.
2. See `lib/params-builder` for the POC of a param builder.
3. See `lib/params/view--articles--featured.ts` for an example of a builder with arguments.
4. See `pages/index.tsx` for usage example.

```tsx
const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
  "node--article",
  context,
  {
    params: paramBuilder
      .get("view--articles--featured", { limit: 2 })
      .getQueryObject(),
  }
)
```
