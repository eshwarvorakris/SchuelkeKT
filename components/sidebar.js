import Link from "next/link";
import Router from "next/router";
import { useContext } from "react";
import AppContext from "../lib/appContext";
function sidebar({ profile }) {
  const layoutValues = useContext(AppContext);

  const logout = function (e) {
    e.preventDefault();
    sessionStorage.removeItem("access_token");
    Router.replace("login");
  }
  return (
    <div className="container-1 sticky-side-bar">
      <div className="col-md-2 trainee-sidebar">
        <div className="section-1-sidebar d-flex flex-column flex-shrink-0 p-3"
          style={{ width: "280px", height: '100vh', backgroundColor: '#008bd6' }}>
          <a href="" className="d-flex flex-column mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"></a>
          <div className="trainee-brand-logo">
            <img src="/trainee-images/Schuelke_Logo 1-min.png" alt="" />
          </div>
          <a href="#">
            <span className="trainee-brand-info mt-1 text-light">Knowledge Transfer</span>
          </a>
          <ul className="nav nav-pills flex-column mb-auto text-light">
            <li className="nav-item">
              <Link href="/dashboard" className="nav-link ml-4 otherLink">
                <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/1.svg" alt="" />
                <span style={{ marginLeft: '10px' }}>Dashboard</span>

              </Link>

            </li>
            <hr className="under_menu_line" />
            {layoutValues?.profile?.role == 'admin' &&
              <li>
                <Link href="/courses" className="nav-link ml-4 otherLink">
                  <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/2.svg" alt="" />
                  <span style={{ marginLeft: '10px' }}>Course Management</span>

                </Link>
              </li>
            }
            {layoutValues?.profile?.role == 'trainer' &&
              <li>
                <Link href="/courses" className="nav-link ml-4 otherLink">
                  <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/2.svg" alt="" />
                  <span style={{ marginLeft: '10px' }}>My Courses</span>

                </Link>
              </li>
            }

            {layoutValues?.profile?.role == 'admin' &&
              <><hr className="under_menu_line" /><li>
                <a href="./admin-trainer-management" className="nav-link ml-4 otherLink">
                  <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/3.svg" alt="" />
                  <span style={{ marginLeft: '10px' }}>Trainers Management</span>

                </a>
              </li></>
            }

            {
              (() => {
                if (profile?.role == 'trainer' || profile?.role == 'admin') {
                  return (
                    <><hr className="under_menu_line" />
                      <li>
                        <a href="/users/trainee" className="nav-link ml-4 otherLink">
                          <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/4.svg" alt="" />
                          <span style={{ marginLeft: '10px' }}>
                            {
                              (() => {
                                if (profile?.role == 'admin') {
                                  return (<>Trainee Management</>)
                                }
                                if (profile?.role == 'trainer') {
                                  return (<>Trainees Enrolled</>)
                                }
                              })()
                            }
                          </span>

                        </a>
                      </li></>);
                }
              })()
            }
            {
              (() => {
                if (profile?.role == 'trainee') {
                  return (
                    <>
                      <hr className="under_menu_line" /><li>
                        <a href="#" className="nav-link ml-4 otherLink">
                          <i className="fa fa-line-chart" aria-hidden="true"></i>
                          <span style={{ marginLeft: '10px' }}>Analytic Board</span>

                        </a>
                      </li>
                      <hr className="under_menu_line" /><li>
                        <a href="#" className="nav-link ml-4 otherLink">
                          <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                          <span style={{ marginLeft: '10px' }}>My Grades</span>

                        </a>
                      </li>
                    </>);
                }
              })()
            }

            <hr className="under_menu_line" />
            <li>

              <Link href="/profile" className="nav-link   ml-4 otherLink">
                <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/5.svg" alt="" />
                <span style={{ marginLeft: '10px' }}>My Profile</span>

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

export default sidebar;