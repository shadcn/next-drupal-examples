import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { ParamBuilder } from "lib/param-builder"

export function viewArticlesFeatured(
  paramBuilder: ParamBuilder,
  opts: { limit: number }
): DrupalJsonApiParams {
  return paramBuilder
    .get("node--article--teaser")
    .addFilter("status", "1")
    .addSort("created", "DESC")
    .addPageLimit(opts.limit)
}
