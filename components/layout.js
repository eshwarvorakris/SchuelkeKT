import Navbar from './navbar'
import Sidebar from './sidebar'
import Footer from './footer'
import { Container, SSRProvider } from 'react-bootstrap'

export default function Layout({ children }) {
  return (

    <SSRProvider>
      <div className="section1">
        <div className="blank-class"></div>
          <Sidebar />
          <div className="container-2">
            <div className='col-12 trainee-right' style={{backgroundColor:'unset'}}>
              <Navbar />
              {children}
            </div>
          
        </div>
      </div>
      <Footer />
    </SSRProvider>
  )
}
