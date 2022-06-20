import { ParamBuilder } from "lib/param-builder"

export function nodeArticleTeaser(paramBuilder: ParamBuilder) {
  return paramBuilder
    .addInclude(["field_media_image.field_media_image", "uid"])
    .addFields("node--article", [
      "title",
      "path",
      "created",
      "field_media_image",
      "uid",
    ])
}
