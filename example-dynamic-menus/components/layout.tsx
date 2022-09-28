import Link from "next/link"

import { PreviewAlert } from "components/preview-alert"
import { useMenu } from "hooks/use-menu"

export function Layout({ children }) {
  const { data: menu } = useMenu("main")

  return (
    <>
      <PreviewAlert />
      <div className="max-w-screen-md px-6 mx-auto">
        <header>
          <div className="container flex items-center justify-between py-6 mx-auto">
            <Link href="/" passHref>
              <a className="text-2xl font-semibold no-underline">
                Next.js for Drupal
              </a>
            </Link>
            <div className="flex space-x-8">
              {menu?.map((item) => (
                <Link key={item.id} href={item.url} passHref>
                  <a>{item.title}</a>
                </Link>
              ))}
            </div>
          </div>
        </header>
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </>
  )
}
