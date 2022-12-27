import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";

function navbar() {
  return (
    <Navbar expand="lg">
      <div className="container">
        <a className="navbar-brand d-flex flex-column fs-2 fw-bold text-light" href="#" style={{width: 'max-content'}}>
          <img src="site_img/Schuelke_Logo 1-min.png" alt="shulke brand logo picture" style={{width:'fit-content'}} />
          <span className="brand-info-header">Knowledge Transfer</span>
        </a>

        <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
         
        <Navbar.Collapse className="nav-2-links collapse navbar-collapse flex-row-reverse" id="navbarNavAltMarkup">
          <ul className="navbar-nav">
            <li className="nav-item active mx-4">
              <a className="nav-link text-white" href="#">Home</a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link text-white" href="#section-2">About</a>
            </li>
            <li className="nav-item mx-4 mr-5">
              <a className="nav-link text-white" href="#section-3">Trainings</a>
            </li>
            <li className="nav-item">
              <Link href="trainer/login">
                <button type="button nav-2-get-started" className="btn get-started">
                  Get Started
                </button>
              </Link>
            </li>
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default navbar;