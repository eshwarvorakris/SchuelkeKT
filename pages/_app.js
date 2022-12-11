// pages/_app.js

import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}