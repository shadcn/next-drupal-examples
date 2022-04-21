import Head from "next/head"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { DrupalNode } from "next-drupal"
import { getSession, useSession, signOut } from "next-auth/react"

import { Layout } from "components/layout"
import { drupal } from "@/lib/drupal"

interface IndexPageProps {
  articles: DrupalNode[]
}

export default function IndexPage({ articles }: IndexPageProps) {
  // Check for session client-side.
  const { data, status } = useSession()

  // If not authenticated, return null.
  // We're relying on getServerSideProps to handle the redirect.
  if (status !== "authenticated") {
    return null
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const { title } = event.target.elements

    // Make a POST request to our API route.
    const response = await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
      }),
    })

    if (!response.ok) {
      alert(response.statusText)
    }

    // The article has been created. Reload the browser.
    // If you're using something like react-query, you can refresh the cache.
    window.location.reload()
  }

  return (
    <Layout>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black">My Articles.</h1>
          <div className="flex items-center justify-end ml-auto space-x-4">
            <p className="flex-1 text-sm text-gray-600">
              Logged in as <span>{data.user.email}</span>
            </p>
            <button
              onClick={() => signOut()}
              className="px-2 py-1 text-sm text-white bg-black rounded-md"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="p-8 border rounded-md">
          {articles?.length ? (
            articles.map((node) => (
              <div key={node.id} className="prose">
                <h2>{node.title}</h2>
                <hr className="my-8" />
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-gray-500">No nodes found</p>
          )}
        </div>
        <form className="flex space-x-4" onSubmit={onSubmit}>
          <input
            name="title"
            placeholder="Add article..."
            className="flex-1 px-4 py-2 border rounded-md"
            required
          />
          <button className="px-4 py-2 text-white bg-blue-600 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IndexPageProps>> {
  const session = await getSession(context)

  // If no session, redirect to login.
  // /api/auth/signin is a page provided by next-auth.
  // You can redirect to your custom login page here.
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  // Set the token on the client.
  drupal.auth = () => `Bearer ${session.accessToken}`

  // For this demo, I created a view that returns articles for the logged-in user.
  const view = await drupal.getView<DrupalNode[]>("articles--user_articles", {
    // Tell drupal to make an authenticated request.
    withAuth: true,
    params: {
      "fields[node--article]": "title,path",
    },
  })

  return {
    props: {
      articles: view.results,
    },
  }
}
