// pages/_app.js

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Head from 'next/head';
import Layout from '../components/layout';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/global.css';
import '../styles/chapters-info.css';
import '../styles/tabs-component.css';
import { useRouter } from 'next/router'
export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)

  return getLayout(
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} key={router.asPath}/>
    </>
  )
}
