import Navbar from './navbar'
import Sidebar from './sidebar'
import Footer from './footer'
import SessionTimer from './sessionTimer'
import { Container, SSRProvider } from 'react-bootstrap'
import AppContext from '../lib/appContext'
import { useEffect, useState } from 'react'

export default function Layout({ children }) {
  const [pageHeading,setPageHeading]=useState("Dashboard");
  const [profile,setProfile]=useState(null);
  const layoutValues={pageHeading,setPageHeading,profile,setProfile};
  useEffect(()=>{
    //console.log(1)
    let tempProfile=JSON.parse(sessionStorage.getItem("userinfo"));
    setProfile(tempProfile);
    //console.log(2)
    console.log(profile);
    //console.log(3)
  },[])
  return (
    <AppContext.Provider value={layoutValues}>
    <SSRProvider>
      <div className="section1" style={{height:"unset", marginBottom:'unset', minHeight:'100vh'}}>
        <SessionTimer sessionTimer={true} />
        <div className="blank-class"></div>
          <Sidebar />
          <div className="container-2">
            <div className='col-md-12 trainer-right'>
              <Navbar />

              {children}
              </div>
          
        </div>
      </div>
      <Footer />
    </SSRProvider>
    </AppContext.Provider>
  )
}
