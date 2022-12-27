// pages/_app.js

import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/global.css";
import Head from "next/head";
export default function MyApp({ Component, pageProps }) {
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