import Link from "next/link";
import Router  from "next/router";
import { useContext } from "react";
import AppContext from "../lib/appContext";
import Image from "next/image";

// import the icons you need
import {
  faHome
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
function Sidebar({ profile }) {
  const layoutValues = useContext(AppContext);
  const router = useRouter()
  
  const logout = function (e) {
    e.preventDefault();
    sessionStorage.removeItem("access_token");
    Router.replace("/login");
  }
  return (
    <div className="container-1 sticky-side-bar">
      <div className="col-md-2 trainee-sidebar">
        <div className="section-1-sidebar d-flex flex-column flex-shrink-0 p-3"
          style={{ width: "280px", height: '100vh', backgroundColor: '#008bd6' }}>
          <Link href="/" className="d-flex flex-column mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <div className="trainee-brand-logo">
            <img src="/trainee-images/Schuelke_Logo 1-min.png" alt="" />
          </div>
          <span className="trainee-brand-info mt-1 text-light">Knowledge Transfer {}</span>
          </Link>
          <ul className="nav nav-pills flex-column mb-auto text-light">
            <li className="nav-item">
              <Link href="/dashboard" className="nav-link ml-4 otherLink" style={router.pathname.includes('dashboard') ? {    background: 'white',color: "#037dc3 !important" } : {}}>
                <img className="sidebar-icon" style={{ width: '20px', height: '20px'  }} src={router.pathname.includes('dashboard') ? "/admin-images/sidebar/1_bak-active.svg" : "/admin-images/sidebar/1.svg" } alt="" />
                {/* <FontAwesomeIcon icon={faHome}  style={router.pathname.includes('dashboard') ? {fontSize: 15, color: "#037dc3"} : { fontSize: 15, color: "white" }}      /> */}
                <span style={ router.pathname.includes('dashboard') ? {color:'#037dc3', marginLeft: '10px'} : { marginLeft: '10px' }}>Dashboard</span>

              </Link>

            </li>
            {layoutValues?.profile?.role == 'admin' &&
              <><hr className="under_menu_line" /><li>
                <Link href="/courses" className="nav-link ml-4 otherLink" style={router.pathname.includes('courses') || router.pathname.includes('module') ? {    background: 'white',color: '#037dc3 !important'} : {}}>
                  <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src={router.pathname.includes('courses') || router.pathname.includes('module') ? "/admin-images/sidebar/2-active.svg" : "/admin-images/sidebar/2.svg"} alt="" />
                  <span style={ router.pathname.includes('courses') || router.pathname.includes('module') ? {color:'#037dc3', marginLeft: '10px'} : { marginLeft: '10px' }}>Course Management</span>

                </Link>
              </li></>
            }
            {(layoutValues?.profile?.role == 'trainer' || layoutValues?.profile?.role == 'trainee') &&
              <><hr className="under_menu_line" /><li>
                <Link href="/courses" className="nav-link ml-4 otherLink" style={router.pathname.includes('courses') || router.pathname.includes('module') ? {    background: 'white',color: '#037dc3 !important'} : {}}>
                <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src={router.pathname.includes('courses') || router.pathname.includes('module') ? "/admin-images/sidebar/2-active.svg" : "/admin-images/sidebar/2.svg"} alt="" />

                
                  <span style={ router.pathname.includes('courses') || router.pathname.includes('module') ? {color:'#037dc3', marginLeft: '10px'} : { marginLeft: '10px' }}>My Courses</span>

                </Link>
              </li></>
            }

            {layoutValues?.profile?.role == 'admin' &&
              <><hr className="under_menu_line" /><li>
                <Link href="/users/trainer" className="nav-link ml-4 otherLink" style={router.pathname.includes('users/trainer') ? {    background: 'white',color: '#037dc3 !important'} : {}}>
                  <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src={router.pathname.includes('users/trainer') ? "/admin-images/sidebar/3-active.svg" : "/admin-images/sidebar/3.svg"} alt="" />
                  <span style={ router.pathname.includes('users/trainer') ? {color:'#037dc3', marginLeft: '10px'} : { marginLeft: '10px' }}>Trainers Management</span>

                </Link>
              </li></>
            }

            {
              (() => {
                if (layoutValues?.profile?.role == 'trainer' || layoutValues?.profile?.role == 'admin') {
                  return (
                    <><hr className="under_menu_line" />
                      <li>
                        <Link href="/users/trainee" className="nav-link ml-4 otherLink" style={router.pathname.includes('users/trainee') ? {    background: 'white',color: '#037dc3 !important'} : {}}>
                          <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src={router.pathname.includes('users/trainee') ? "/admin-images/sidebar/4-active.svg" : "/admin-images/sidebar/4.svg"} alt="" />
                          <span style={ router.pathname.includes('users/trainee') ? {color:'#037dc3', marginLeft: '10px'} : { marginLeft: '10px' }}>
                            {
                              (() => {
                                if (layoutValues?.profile?.role == 'admin') {
                                  return (<>Trainee Management</>)
                                }
                                if (layoutValues?.profile?.role == 'trainer') {
                                  return (<>Trainees Enrolled</>)
                                }
                              })()
                            }
                          </span>

                        </Link>
                      </li></>);
                }
              })()
            }
            {
              (() => {
                if (layoutValues?.profile?.role == 'trainee') {
                  return (
                    <>
                      {/* <hr className="under_menu_line" />
                      <li>
                        <Link href="/analytics" className="nav-link ml-4 otherLink">
                          <i className="fa fa-line-chart" aria-hidden="true"></i>
                          <span style={{ marginLeft: '10px' }}>Analytic Board</span>

                        </Link>
                      </li> */}
                      <hr className="under_menu_line" /><li>
                        <Link href="/my-grades" className="nav-link ml-4 otherLink"  style={router.pathname.includes('my-grades') ? {    background: 'white',color: '#037dc3 !important'} : {}}>
                          <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                          <span style={ router.pathname.includes('/my-grades') ? {color:'#037dc3', marginLeft: '10px'} : { marginLeft: '10px' }}>My Grades</span>

                        </Link>
                      </li>
                    </>);
                }
              })()
            }

            <hr className="under_menu_line" />
            <li>

              <Link href="/profile" className="nav-link   ml-4 otherLink" style={router.pathname.includes('profile') ? {background: 'white',color: '#037dc3 !important'} : {}}>
                <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src={router.pathname.includes('/profile') ? "/admin-images/sidebar/5-active.svg" : "/admin-images/sidebar/5.svg"} alt="" />
                <span style={ router.pathname.includes('/profile') ? {color:'#037dc3', marginLeft: '10px'} : { marginLeft: '10px' }}>My Profile</span>

              </Link>
            </li>
            <hr className="under_menu_line" />
            <li>
              <a href="#" onClick={logout} className="nav-link  ml-4 otherLink">
                <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/6.svg" alt="" />
                <span style={{ marginLeft: '10px' }}>Log out</span>
              </a>
            </li>
            <hr className="under_menu_line" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;