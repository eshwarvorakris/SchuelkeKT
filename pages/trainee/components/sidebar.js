import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";

function sidebar() {
  return (
    <div className="container-1 sticky-side-bar">

      <div className="col-md-2 trainee-sidebar">
        <div className="traineesection-1-sidebar d-flex flex-column flex-shrink-0 p-3"
          style={{ width: '280px', height: '100vh', backgroundColor: '#008bd6' }}>

          <div className="trainee-brand-logo">
            <a href="#"><img src="/trainee-images/Schuelke_Logo 1-min.png" alt="" /></a>
            <p className='small text-light mt-2'>Knowledge Transfer</p>
          </div>

          <ul className="nav nav-pills flex-column mb-auto text-light">
            <li className="nav-item">
              <a href="dashboard" className="nav-link mt-4 ml-4 link-light" aria-current="page">
                
                <img src="/trainer-images/home.png" alt="" />
                <span className='' style={{ marginLeft: '10px' }}>Dashboard</span>
              </a>
            </li>
            <hr className="under_menu_line" />
            <li>
              <a href="./mycourse" className="nav-link link-light ml-4">
                
                <img src="/trainer-images/Grade.png" alt="" />
                <span className='' style={{ marginLeft: '10px' }}>My Courses</span>
              </a>
            </li>

            <hr className="under_menu_line" />
            <li>
              <a href='./traineelist' className="nav-link link-light ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-graph-up" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                </svg>
                <span className='' style={{ marginLeft: '10px' }}>Trainee Enroled</span>
              </a>
            </li>
            <hr className="under_menu_line" />
            <li>
              <a href='./myprofile' className="nav-link link-light ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-files-alt" viewBox="0 0 16 16">
                  <path d="M11 0H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2 2 2 0 0 0 2-2V4a2 2 0 0 0-2-2 2 2 0 0 0-2-2zm2 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1V3zM2 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2z" />
                </svg>
                <span className='' style={{ marginLeft: '10px' }}>My Profile</span>
              </a>
            </li>
            <hr className="under_menu_line" />
            <li>
              <a href="login" className="nav-link link-light ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>
                <span className='' style={{ marginLeft: '10px' }}>Log Out</span>
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