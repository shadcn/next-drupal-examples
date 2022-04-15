import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { getResourceCollection, JsonApiResource } from "next-drupal"

import { Layout } from "@/components/layout"

interface IndexPageProps {
  webformSubmissions: JsonApiResource[]
}

export default function IndexPage({ webformSubmissions }: IndexPageProps) {
  console.log(webformSubmissions)
  return (
    <Layout>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Webform Submissions</h1>
        {webformSubmissions.map((submission) => (
          <pre>{JSON.stringify(submission, null, 2)}</pre>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(): Promise<
  GetStaticPropsResult<IndexPageProps>
> {
  const webformSubmissions = await getResourceCollection(
    "webform_submission--contact"
  )

  return {
    props: {
      webformSubmissions,
    },
  }
}
