import Sidebar from './sidebar'
import Footer from './footer'
import { Container, SSRProvider } from 'react-bootstrap'

export default function Layout({ children }) {
  return (
    <SSRProvider>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      
      
    </nav>
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div className="pt-3 pb-2 mb-3 border-bottom">
          {children}
          </div>
          </main>
        </div>
      </div>
        <Footer />
    </SSRProvider>
  )
}