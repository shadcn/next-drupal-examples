import { DrupalNode } from "next-drupal"

import { NodePage } from "components/node--page"
import { NodeArticle } from "components/node--article"

const nodeTypes = {
  "node--page": NodePage,
  "node--article": NodeArticle,
}

export interface NodeProps {
  node: DrupalNode
  viewMode?: string
}

export function Node({ node, viewMode = "full", ...props }: NodeProps) {
  if (!node) {
    return null
  }

  const Component = nodeTypes[node.type]

  if (!Component) {
    return null
  }

  return <Component node={node} viewMode={viewMode} {...props} />
}
