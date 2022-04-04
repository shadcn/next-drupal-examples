import Link from "next/link"

export function Layout({ children }) {
  return (
    <div className="max-w-screen-md px-6 mx-auto">
      <header>
        <div className="container flex items-center justify-between py-6 mx-auto">
          <Link href="/" passHref>
            <a className="text-2xl font-semibold no-underline">
              Next.js for Drupal
            </a>
          </Link>
        </div>
      </header>
      <main className="container py-10 mx-auto">{children}</main>
    </div>
  )
}
