import Router from "next/router";
import { helper } from '../../lib/helper';
import Image from "next/image";
import Link from "next/link";
function sidebar({ profile }) {

  /* const { data: profile, error, isLoading } = useSWR('/', async () => await auth.profile());
  if (error) {
    Router.replace("login");
  } else {
    props.sendProfile(profile);
  } */

  const logout = function (e) {
    e.preventDefault();
    sessionStorage.setItem("access_token", "");
    //Router.replace("/login");
    window.location.href = "/login";
  }
  // console.log("users",helper.user);
  return (
    <div className="container-1 sticky-side-bar">
      <div className="col-md-2 trainee-sidebar">
        <div className="section-1-sidebar d-flex flex-column flex-shrink-0 p-3"
          style={{ width: "280px", height: '100vh', backgroundColor: '#008bd6' }}>
          <Link href="" className="d-flex flex-column mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"></Link>
          <div className="trainee-brand-logo">
            <img src="/trainee-images/Schuelke_Logo 1-min.png" alt="" />
          </div>
          <Link href="#">
            <span className="trainee-brand-info mt-1 text-light">Knowledge Transfer</span>
          </Link>
          <ul className="nav nav-pills flex-column mb-auto text-light">
            <li className="nav-item">
              <Link href="/dashboard" className="nav-link mt-4 ml-4 otherLink" aria-current="page">
                <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/1.svg" alt="" />
                <span style={{ marginLeft: '10px' }}>Dashboard</span>
              </Link>
            </li>
            <hr className="under_menu_line" />
            <li>
              {
                (() => {
                  if (profile?.role == 'admin') {
                    return (
                      <Link href="/courses" className="nav-link ml-4 otherLink">
                        <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/2.svg" alt="" />
                        <span style={{ marginLeft: '10px' }}>Course Management</span>
                      </Link>);
                  }
                  else if (profile?.role == 'trainer') {
                    return (
                      <Link href="/courses" className="nav-link ml-4 otherLink">
                        <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/2.svg" alt="" />
                        <span style={{ marginLeft: '10px' }}>My Courses</span>
                      </Link>);
                  }
                  else {
                    return (
                      <Link href="/courses" className="nav-link ml-4 otherLink">
                        <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/2.svg" alt="" />
                        <span style={{ marginLeft: '10px' }}>My Courses</span>
                      </Link>);
                  }
                })()
              }
            </li>
            {
              (() => {
                if (profile?.role == 'admin') {
                  return (
                      <><hr className="under_menu_line" /><li>
                      <Link href="/users/trainer" className="nav-link ml-4 otherLink">
                        <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/3.svg" alt="" />
                        <span style={{ marginLeft: '10px' }}>Trainers Management</span>

                      </Link>
                    </li></>
                  );
                }
              })()
            }
            {
              (() => {
                if (profile?.role == 'admin' || profile?.role == 'trainer') {
                  return (
                    <><hr className="under_menu_line" /><li>
                      <Link href="/users/trainee" className="nav-link ml-4 otherLink">
                        <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/4.svg" alt="" />
                        <span style={{ marginLeft: '10px' }}>Trainess Management</span>

                      </Link>
                    </li></>
                  );
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
              <Link href="#" onClick={logout} className="nav-link  ml-4 otherLink">
                <img className="sidebar-icon" style={{ width: '20px', height: '20px' }} src="/admin-images/sidebar/6.svg" alt="" />
                <span style={{ marginLeft: '10px' }}>Log out</span>
              </Link>
            </li>
            <hr className="under_menu_line" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default sidebar;