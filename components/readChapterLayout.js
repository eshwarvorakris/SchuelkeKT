
import { useEffect, useState } from 'react';
import AppContext from '../lib/appContext'
import { Container, SSRProvider } from 'react-bootstrap'
import SessionTimer from './sessionTimer'


export default function ReadChapterLayout({ children }) {
  const [pageHeading,setPageHeading]=useState("Chapters");
  const [profile,setProfile]=useState(null);
  const layoutValues={pageHeading,setPageHeading,profile,setProfile};
  // useEffect(()=>{
  //   //// console.log(1)
  //   let tempProfile=JSON.parse(sessionStorage.getItem("userinfo"));
    
  //   setProfile(tempProfile);
  //   //// console.log(2)
  //   // console.log(profile);
  //   //// console.log(3)
  // },[profile])
  return (
    <AppContext.Provider value={layoutValues}>
    <SSRProvider>
    <SessionTimer sessionTimer={true} />
     {children}

    </SSRProvider>
    </AppContext.Provider>
  )
}