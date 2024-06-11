import Menu from '@/lib/component/menu'
import { Analytics } from '@vercel/analytics/react'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Analytics />
      <Head>
        <title>Visualbum</title>
        <meta name='description' content='p5.jsの習作' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Menu />
      </main>
    </>
  )
}
