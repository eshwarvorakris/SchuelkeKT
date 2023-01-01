import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function sidebar() {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
    <div className="sidebar-sticky">
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            <span data-feather="home"></span>
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span data-feather="file"></span>
            Course
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span data-feather="shopping-cart"></span>
            Trainer
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span data-feather="users"></span>
            Trainee
          </a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href={"/module"}>
            <span data-feather="bar-chart-2"></span>
            Module
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href={"/content"}>
            <span data-feather="bar-chart-2"></span>
            Content
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span data-feather="layers"></span>
            User
          </a>
        </li>
      </ul>

    </div>
  </nav>
  );
}

export default sidebar;