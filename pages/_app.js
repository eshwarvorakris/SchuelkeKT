// pages/_app.js

import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/global.css";
import Head from "next/head";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function MyApp({ Component, pageProps }) {
  library.add(fas, faSpinner)
  return (
    <Layout>
      <Head>
      <link rel="shortcut icon" href="/favicon.png" type="image/x-icon"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}