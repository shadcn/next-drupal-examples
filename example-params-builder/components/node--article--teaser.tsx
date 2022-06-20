import Image from "next/image"
import Link from "next/link"

import { absoluteURL, formatDate } from "lib/utils"

export function NodeArticleTeaser({ node, ...props }) {
  console.log(node)
  return (
    <article {...props}>
      <Link href={node.path.alias} passHref>
        <a className="no-underline hover:text-blue-600">
          <h2 className="mb-4 text-4xl font-bold">{node.title}</h2>
        </a>
      </Link>
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_media_image?.field_media_image && (
        <div>
          <Image
            src={absoluteURL(node.field_media_image.field_media_image.uri.url)}
            width={768}
            height={480}
            layout="responsive"
            objectFit="cover"
            alt={node.field_media_image.field_media_image.resourceIdObjMeta.alt}
          />
        </div>
      )}
      {node.body?.summary && (
        <p className="mt-6 font-serif text-xl leading-loose">
          {node.body.summary}
        </p>
      )}
    </article>
  )
}
