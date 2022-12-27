import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";

function sidebar() {
  return (
    <div class="container-1 sticky-side-bar">
          <div class="col-md-2 trainee-sidebar">
            <div class="section-1-sidebar d-flex flex-column flex-shrink-0 p-3"
              style={{ width: "280px", height: '100vh', backgroundColor: '#008bd6' }}>
              <a href="" class="d-flex flex-column mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"></a>
              <div class="trainee-brand-logo">
                <img src="/trainee-images/Schuelke_Logo 1-min.png" alt="" />
              </div>
              <a href="#">
                <span class="trainee-brand-info mt-1 text-light">Knowledge Transfer</span>
              </a>
              <ul class="nav nav-pills flex-column mb-auto text-light">
                <li class="nav-item">
                  <a href="./dashboard" class="nav-link mt-4 ml-4 " aria-current="page">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house pr-2" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" style={{marginRight:'0.5 rem'}}/>
              </svg>
                    <span style={{ marginLeft: '10px' }}>Dashboard</span>
                   
                  </a>
                </li>
                <hr class="under_menu_line" />
                <li>
                  <a href="./mycourse" class="nav-link link-light ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-handbag" viewBox="0 0 16 16">
                      <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"/>
                    </svg>
                      <span style={{ marginLeft: '10px' }}> My Courses</span>
                   
                  </a>
                </li>
                <hr class="under_menu_line" />
                <li>
                  <a href="./enrolledtrainers" class="nav-link link-light ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                  <path style={{fillRule:"evenodd"}} d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                </svg>
                      <span style={{ marginLeft: '10px' }}>Trainees Enrolled</span>
                
                  </a>
                </li>
                <hr class="under_menu_line" />
                <li>
                  <a href="./myprofile" class="nav-link link-light ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files-alt" viewBox="0 0 16 16">
                  <path d="M11 0H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2 2 2 0 0 0 2-2V4a2 2 0 0 0-2-2 2 2 0 0 0-2-2zm2 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1V3zM2 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2z" />
                </svg>
                      <span style={{ marginLeft: '10px' }}>My Profile</span>
                    
                  </a>
                </li>
                <hr class="under_menu_line" />
                <li>
                  <a href="./login" class="nav-link link-light ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                      <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                    <span style={{ marginLeft: '10px' }}>Log out</span>
                  </a>
                </li>
                <hr class="under_menu_line" />
              </ul>
            </div>
          </div>
        </div>
  );
}

export default sidebar;