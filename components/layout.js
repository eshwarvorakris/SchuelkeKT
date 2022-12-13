// components/layout.js

import Navbar from './navbar'
import Footer from './footer'
import { Container } from 'react-bootstrap'

export default function Layout({ children }) {
  return (
    
      <main>{children}</main>
    
  )
}