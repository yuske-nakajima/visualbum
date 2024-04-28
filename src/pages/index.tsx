import { PAGE_INFO_LIST } from '@/lib/constants'
import Head from 'next/head'
import Link from 'next/link'
export default function Home() {
  return (
    <>
      <Head>
        <title>Visualbum</title>
        <meta name='description' content='p5.jsの習作' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <ul>
          {PAGE_INFO_LIST.map((pageInfo) => {
            return (
              <li key={pageInfo.title}>
                <Link href={pageInfo.href}>{pageInfo.title}</Link>
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}
