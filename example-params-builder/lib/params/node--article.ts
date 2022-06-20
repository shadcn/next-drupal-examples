import { ParamBuilder } from "lib/param-builder"

export function nodeArticle(paramBuilder: ParamBuilder) {
  return paramBuilder
    .addInclude(["field_media_image.field_media_image", "uid"])
    .addFields("node--article", [
      "title",
      "created",
      "uid",
      "field_media_image",
      "body",
    ])
}
