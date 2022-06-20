import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { nodeArticle } from "lib/params/node--article"
import { nodeArticleTeaser } from "lib/params/node--article--teaser"
import { viewArticlesFeatured } from "lib/params/view--articles--featured"

export type ParamType = keyof typeof params

export const params = {
  "node--article": nodeArticle,
  "node--article--teaser": nodeArticleTeaser,
  "view--articles--featured": viewArticlesFeatured,
}
