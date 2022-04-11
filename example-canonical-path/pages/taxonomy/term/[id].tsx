import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next"
import {
  DrupalTaxonomyTerm,
  getResourceCollection,
  getResourceCollectionFromContext,
} from "next-drupal"

interface TermPageProps {
  term: DrupalTaxonomyTerm
}

export default function TermPage({ term }: TermPageProps) {
  return (
    <div>
      <h1>{term.name}</h1>
    </div>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  // Load taxonomy to get the ids.
  const terms = await getResourceCollectionFromContext<DrupalTaxonomyTerm[]>(
    "taxonomy_term--property_location",
    context,
    {
      params: {
        "fields[taxonomy_term--property_location]": "path,drupal_internal__tid",
      },
    }
  )

  // Create paths from terms.
  const paths = terms.map((term) => ({
    params: {
      id: `${term.drupal_internal__tid}`,
    },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<TermPageProps>> {
  const termId = context.params.id as string

  // We don't have a helper to fetch a resource by internal__id.
  // We use getResourceCollection with a filter.
  const terms = await getResourceCollection<DrupalTaxonomyTerm[]>(
    "taxonomy_term--property_location",
    {
      params: {
        "filter[drupal_internal__tid]": termId,
      },
    }
  )

  if (!terms.length) {
    return {
      notFound: true,
    }
  }

  const [term] = terms

  return {
    props: {
      term,
    },
  }
}
