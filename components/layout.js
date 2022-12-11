// components/layout.js

import Navbar from './navbar'
import Footer from './footer'
import { Container } from 'react-bootstrap'

export default function Layout({ children }) {
  return (
    <Container>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Container>
  )
}