import Link from "next/link"
import { DrupalMenuLinkContent } from "next-drupal"

import { PreviewAlert } from "components/preview-alert"

export interface LayoutProps {
  children: React.ReactNode
  menus: {
    main: DrupalMenuLinkContent[]
    footer: DrupalMenuLinkContent[]
  }
}

export function Layout({ children, menus }: LayoutProps) {
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
            <nav className="flex justify-end space-x-8">
              {menus?.main.map((item) => (
                <Link key={item.id} href={item.url} passHref>
                  <a>{item.title}</a>
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="container py-10 mx-auto">{children}</main>
        <footer className="flex justify-center py-8 space-x-4">
          {menus?.footer.map((item) => (
            <Link key={item.id} href={item.url} passHref>
              <a>{item.title}</a>
            </Link>
          ))}
        </footer>
      </div>
    </>
  )
}
