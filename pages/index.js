import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import auth from "../model/auth.model";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";
import authLayout from "../components/authLayout";
function index() {
  return (
    <>
      <div>

        <div className="overlay overlay-slide-left" id="overlay">
          <nav-1>
            <ul>
              <li className="nav-1"><a href="#">Home</a></li>
              <hr size="10" />
              <li className="nav-2"><a href="#section-2">About</a></li>
              <hr size="10" />
              <li className="nav-3"><a href="#section-3">Trainings</a></li>
              <hr size="10" />
              <li className="nav-4"><a href="#"><button type="button" className="btn btn-info py-2">
                Get Started
              </button></a></li>
            </ul>
          </nav-1>
        </div>

        <div className="menu-bars" id="menu-bars">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>

        <div className="section1" id="home" style={{ display: 'block' }}>
          <Navbar expand="lg">
            <div className="container">
              <a className="navbar-brand d-flex flex-column fs-2 fw-bold text-light" href="#" style={{ width: 'max-content' }}>
                <img src="site_img/Schuelke_Logo 1-min.png" alt="shulke brand logo picture" style={{ width: 'fit-content' }} />
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
                    <Link href="./login">
                      <button type="button nav-2-get-started" className="btn get-started">
                        Get Started
                      </button>
                    </Link>
                  </li>
                </ul>
              </Navbar.Collapse>
            </div>
          </Navbar>
          <div className="dot-pattern-1">
            <div className="floting-style d-flex">
              <div className="ellipse-row-1 d-flex gap-4">
                <div className="small-circle-1"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-2"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
              </div>
            </div>
            <div className="floting-style d-flex">
              <div className="ellipse-row-1 d-flex gap-4">
                <div className="small-circle-1"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-2"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
              </div>
            </div>
            <div className="floting-style d-flex">
              <div className="ellipse-row-1 d-flex gap-4">
                <div className="small-circle-1"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-2"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
              </div>
            </div>
            <div className="floting-style d-flex">
              <div className="ellipse-row-1 d-flex gap-4">
                <div className="small-circle-1"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-2"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
              </div>
            </div>
            <div className="floting-style d-flex">
              <div className="ellipse-row-1 d-flex gap-4">
                <div className="small-circle-1"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-2"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
              </div>
            </div>
            <div className="floting-style d-flex">
              <div className="ellipse-row-1 d-flex gap-4">
                <div className="small-circle-1"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-2"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
              </div>
            </div>
          </div>

          <div className="dot-pattern-2">
            <div className="floting-style d-flex">
              <div className="ellipse-row-1 d-flex gap-4">
                <div className="small-circle-1"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-2"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
              </div>
            </div>
            <div className="floting-style d-flex">
              <div className="ellipse-row-1 d-flex gap-4">
                <div className="small-circle-1"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-2"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
              </div>
            </div>
            <div className="floting-style d-flex">
              <div className="ellipse-row-1 d-flex gap-4">
                <div className="small-circle-1"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-2"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
              </div>
            </div>
            <div className="floting-style d-flex">
              <div className="ellipse-row-1 d-flex gap-4">
                <div className="small-circle-1"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-2"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
              </div>
            </div>
            <div className="floting-style d-flex">
              <div className="ellipse-row-1 d-flex gap-4">
                <div className="small-circle-1"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-2"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
              </div>
            </div>
            <div className="floting-style d-flex">
              <div className="ellipse-row-1 d-flex gap-4">
                <div className="small-circle-1"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-2"><img src="site_img/Ellipse 120.png" alt="" /></div>
                <div className="small-circle-3"><img src="site_img/Ellipse 120.png" alt="" /></div>
              </div>
            </div>
          </div>


          <img src="site_img/atom.png" alt="" className="atom-icon" />
          <img src="site_img/bulb.png" alt="" className="bulb-icon" />
          <img src="site_img/flask.png" alt="" className="flask-icon" />
          <img src="site_img/molecules.png" alt="" className="molecules-icon" />

          <img src="site_img/Schuelke_Logo 2.png" alt="" className="big-logoindex" />
          <img src="site_img/Schuelke_Logo 5.png" alt="" className="medium-logo" />
          <img src="site_img/Schuelke_Logo 4.png" alt="" className="small-logo" />


          <header className="header">
            <h1 className="fw-bolder">
              Schülke Knowledge
              Transfer (Online)
            </h1>
            <span>Acquire and Apply to Achieve</span>
          </header>
        </div>

        <div className="section2" id="section-2">
          <div className="row info-1">
            <div className="col-left col-md-12 col-lg-7 d-flex flex-column gap-4">

              <div className="main-heading">
                <h1>
                  The story of Schülke <br /> Knowledge Transfer (Online)
                </h1>
              </div>

              <div className="story-list">
                <ul className="d-flex flex-column gap-4 forgap">

                  <li className="d-flex flex-column">
                    <div className="story-header d-flex">
                      <img src="trainer-images/Vector.svg" className="story-li" alt="" />
                      <span className="info-heading">What & Who?</span>
                    </div>
                    <div>
                      <p>Schülke Knowledge Transfer (Online) is a unique learning platform specifically created for schülke
                        colleagues and our associates to acquire essential knowledge in infection prevention control.</p>
                    </div>
                  </li>

                  <li className="d-flex flex-column">
                    <div className="story-header d-flex">
                      <img src="trainer-images/Vector.svg" className="story-li" alt="" />
                      <span className="info-heading">Why?</span>
                    </div>
                    <div>
                      <p>With the rapid progress in science and evolution of disease etiologies, accurate and sound knowledge
                        has become pivotal to our business in healthcare.
                      </p>
                    </div>
                  </li>

                  <li className="d-flex flex-column">
                    <div className="story-header d-flex">
                      <img src="trainer-images/Vector.svg" className="story-li" alt="" />
                      <span className="info-heading">How?</span>
                    </div>
                    <div>
                      <p>We created a centralised scientific knowledge platform to first collect accurate and relevant
                        information from our stakeholders, packaged it into learning modules prior to funneling it to our
                        trainee for knowledge acquisition.
                      </p>
                    </div>
                  </li>

                  <li className="d-flex flex-column">
                    <div className="story-header d-flex">
                      <img src="trainer-images/Vector.svg" className="story-li" alt="" />
                      <span className="info-heading">Where?</span>
                    </div>
                    <div>
                      <p>The trainings content is designed to be assessed remotely via an online platform, mitigating the risk
                        associated with social distancing for a seamless training schedule not affected by physical absentees.
                        Trainees are able to perform the training at their own pace within the designated time frame without
                        compromising operational demands.</p>
                    </div>
                  </li>

                </ul>
              </div>

            </div>


            <div className="col-right col-lg-5 col-md-12">
              <div>
                <img className="story-illustration-img" src="trainee-images/Group 1037.png" alt="" />
              </div>
            </div>
          </div>

          <div className="related-questions container">
            <div className="row">
              <div className="col-lg-7 col-md-12 picture-2">
                <img src="trainer-images/zig-zag-2.png" className="story-illustration-img-2" alt="" />
              </div>

              <div className="info-2 col-lg-5 col-md-12 mission-4 container d-flex flex-column gap-5">
                <div className="main-heading">
                  <h1 className="info-heading-1">Mission Statement</h1>
                </div>

                <span className="content">
                  Our mission statement outlines our vision for this platform and our hope for our trainee to first ‘Acquire’
                  the
                  knowledge and then enabling them to, ‘Apply to Achieve’.
                  <br />
                  We wish you all the best in your knowledge learning journey!
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="section3" id="section-3">
          <div className="row training-topics">
            <div className="col-md-12">
              <div className="main-heading">
                <h1 className='mt-5 pt-5'>On what you will be trained!</h1>
              </div>
            </div>
            <div className="col-md-12 ">
              <div className="story-content">
                <p>Schulke knowledge Transfer will cover the following topics.</p>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row training-topics-cards " style={{ marginLeft: '50px' }}>
              <div className="col-lg-4 col-md-6 mt-sm-5 ml-5 pl-5">
                <div className="card training-card ml-md-5 p-3 text-center" style={{ width: '17rem', height: "17rem" }}>
                  <div className="card-body" id="bed-sheets">
                    <div className="card-icon">
                      <img className="section3-icon" src="trainee-images/bed-sheets (2) 1.png" alt="" />
                    </div>
                    <h5 className="card-title training-title text-light">
                      Blanket Topics
                    </h5>
                    <p className="card-text training-info text-light">
                      Applicable <br /> to all
                    </p>
                    <a href="#" className="btn btn-light training-card-btn mt-3" data-toggle="modal" data-target="#myModal">Know
                      More</a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mt-sm-5">
                <div className="card training-card ml-md-5 p-3 text-center" style={{ width: '17rem', height: "17rem" }}>
                  <div className="card-body" id="product-topics">
                    <div className="card-icon">
                      <img className="section3-icon" src="trainee-images/package 1.png" alt="" />
                    </div>
                    <h5 className="card-title training-title text-light">
                      Product Topics
                    </h5>
                    <p className="card-text training-info text-light">
                      Information of the different products in your region </p>
                    <a href="#" className="btn btn-light training-card-btn mt-3" data-toggle="modal" data-target="#myModal-2">Know
                      More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-md-5 mt-sm-5">
                <div className="card training-card ml-md-5 p-3 text-center" style={{ width: '17rem', height: "17rem" }}>
                  <div className="card-body" id="globe">
                    <div className="card-icon">
                      <img className="section3-icon" src="trainee-images/coronavirus (3) 1.png" alt="" />
                    </div>
                    <h5 className="card-title training-title text-light">
                      Country Topics
                    </h5>
                    <p className="card-text training-info text-light">
                      Information specific to your region of interest </p>
                    <a href="#" className="btn btn-light training-card-btn mt-3" data-toggle="modal" data-target="#myModal-3">Know
                      More</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" tabindex="-1" id="myModal">
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content  text-center">
                  <div className="modal-title">

                  </div>

                  <div className="modal-body">
                    <h5 className="align-middle">Blanket Topics</h5>
                    <h5 className="align-middle card-p">Applicable to all</h5>
                    <h5 className="align-middle popup-p" style={{ width: '60%', margin: "auto" }}>
                      <strong>
                        Blanket topics are overarching topics
                        of
                        infection prevention
                        control and wound
                        care. All topics within this categories will be applicable to all trainees who will learn and acquire
                        the necessary knowledge to facilitate their work (sales, marketing etc.) within schülke product
                        offerings in IPC and wound care. </strong>
                    </h5>
                  </div>

                  <div className="modal-footer">
                    <img src="trainee-images/blue.png" className="popup-brand-logo pl-3" alt="pop-up logo" />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" tabindex="-1" id="myModal-2">
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content  text-center">
                  <div className="modal-title">
                  </div>

                  <div className="modal-body">
                    <h5 className="align-middle">Product Topics</h5>
                    <h5 className="align-middle card-p">Information of the different products in your region </h5>
                    <h5 className="align-middle popup-p" style={{ width: '60%', margin: "auto" }}>
                      <strong>
                        Product topics covers the different
                        information
                        of the products within your region of concerns. Basic information of the products and field-specific
                        questions derived from the individual trainers/colleagues will be shared. These modules will provide
                        you
                        with essential information to prepare individuals to speak about the products and to answer any common
                        asked questions.
                      </strong>
                    </h5>
                  </div>

                  <div className="modal-footer">
                    <img src="trainee-images/blue.png" className="popup-brand-logo pl-3" alt="pop-up logo" />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" tabindex="-1" id="myModal-3">
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content  text-center">
                  <div className="modal-title">

                  </div>

                  <div className="modal-body">
                    <h5 className="align-middle">Country topics</h5>
                    <h5 className="align-middle card-p">Information specific to your region of interest</h5>
                    <h5 className="align-middle popup-p" style={{ width: '60%', margin: "auto" }}>
                      <strong>
                        Country topics are modules that provide
                        information for those who resides within that region. Critical information such as guidelines,
                        national
                        regulatory, compliance are covered to prepare the individuals to operate within the region of
                        interest.
                      </strong>
                    </h5>
                  </div>

                  <div className="modal-footer">
                    <img src="trainee-images/blue.png" className="popup-brand-logo pl-3" alt="pop-up logo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section4 background" id="section-4">
          <div className="container">
            <div className="row training-topics">
              <div className="col-md-12 main-heading">
                <h1 className='mt-5 pt-5'>Training Overview</h1>
              </div>
            </div>
          </div>

          <div className="container mx-auto training-video-overview">
            <div className="row">
              <div className="col-md-11 training-video m-auto d-grid background">
                <img className="training-thumbnail" data-toggle="modal" data-target="#myModal2" width="560" height="315"
                  src="trainer-images/poster.png" alt="" />
                <div className="pause-play-btn" data-toggle="modal" data-target="#myModal2">
                  {/* <ion-icon className="play-btn" name="play-outline"></ion-icon> */}
                  <center>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-play" viewBox="0 0 16 16">
                      <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                    </svg>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" tabindex="-1" id="myModal2">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center" style={{ height: '30rem' }}>

                  <video width="100%" height="100%" controls poster="images/trainer-images/poster.png">
                    <source src="/videos/landing-page/Landing Page Video V1.mp4" type="video/mp4" />
                    Your browser does not support this video.
                  </video>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section5 pb-5">
          <div className="container">
            <div className="row trainers-cards">
              <div className="col-md-12">
                <div className="main-heading">
                  <h1>Your Trainers</h1>
                </div>
              </div>
              <div className="col-md-12">
                <div className="story-content">
                  <p>The best trainers with the best expertise to guide along</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container ">
            <div className="row m-auto">
              <div className="col-lg-3 col-sm-6 full-card">
                <div className="card trainer-card indexcard" style={{ width: "13rem" }}>
                  <img className="card-img-top trainer-img" src="trainee-images/faces/Dr. Thomas.png"
                    style={{ height: "12rem" }} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title card-names" style={{ color: '#007cc2' }}>Dr. Thomas Oh</h5>
                    <div className="department-info">Medical & Scientific Affai'rs (APAC) </div>
                    <div className="LMS-info">Administrator/Trainer </div>
                    <div className="country-info">Singapore/APAC</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 full-card">
                <div className="card trainer-card indexcard" style={{ width: "13rem" }}>
                  <img className="card-img-top trainer-img" src="trainee-images/faces/Pearleen pic.png"
                    style={{ height: "12rem" }} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title card-names" style={{ color: '#007cc2' }}>Ms. Pearleen Ho</h5>
                    <div className="department-info">Senior Application Scientist </div>
                    <div className="LMS-info">Trainer </div>
                    <div className="country-info">Singapore</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 full-card">
                <div className="card trainer-card indexcard" style={{ width: "13rem" }}>
                  <img className="card-img-top trainer-img" src="trainee-images/faces/Shey.png" style={{ height: "12rem" }}
                    alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title card-names" style={{ color: '#007cc2' }}>Ms. Shey LEMCKE</h5>
                    <div className="department-info">Sales & Marketing </div>
                    <div className="LMS-info">Trainer </div>
                    <div className="country-info">Australia & New Zealand</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 full-card">
                <div className="card trainer-card indexcard" style={{ width: "13rem" }}>
                  <img className="card-img-top trainer-img" src="trainee-images/faces/Mandy.png" style={{ height: "12rem" }}
                    alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title card-names" style={{ color: '#007cc2' }}>Ms. Mandy MITCHIE</h5>
                    <div className="department-info">National Trainer </div>
                    <div className="LMS-info">Trainer </div>
                    <div className="country-info">Australia & New Zealand</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row m-auto">
              <div className="col-lg-3 col-sm-6 full-card">
                <div className="card trainer-card indexcard" style={{ width: "13rem" }}>
                  <img className="card-img-top trainer-img" src="trainee-images/faces/Rohit Bhatia.png"
                    style={{ height: "12rem" }} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title card-names" style={{ color: '#007cc2' }}>Mr. Rohit BHATIA</h5>
                    <div className="department-info">Marketing </div>
                    <div className="LMS-info">Trainer </div>
                    <div className="country-info">India</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 full-card">
                <div className="card trainer-card indexcard" style={{ width: "13rem" }}>
                  <img className="card-img-top trainer-img" src="trainee-images/faces/Raja.png" style={{ height: "12rem" }}
                    alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title card-names" style={{ color: '#007cc2' }}>Mr. V Rajaraman</h5>
                    <div className="department-info" style={{ fontSize: '10px' }}>Customer Engagement & Key Account </div>
                    <div className="LMS-info">Trainer </div>
                    <div className="country-info">India</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 full-card">
                <div className="card trainer-card indexcard" style={{ width: "13rem" }}>
                  <img className="card-img-top trainer-img" src="trainee-images/faces/Hideo head pic.png"
                    style={{ height: "12rem" }} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title card-names" style={{ color: '#007cc2' }}>Mr. Hideo TAKAHASHI</h5>
                    <div className="department-info">Sales & Marketing </div>
                    <div className="LMS-info">Trainer </div>
                    <div className="country-info">Japan</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 full-card">
                <div className="card trainer-card indexcard" style={{ width: "13rem" }}>
                  <img className="card-img-top trainer-img" src="trainee-images/faces/Mariya.png" style={{ height: "12rem" }}
                    alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title card-names" style={{ color: '#007cc2' }}>Ms. Mariya SOTA</h5>
                    <div className="department-info">Marketing </div>
                    <div className="LMS-info">Trainer </div>
                    <div className="country-info">Japan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section-6 className="footer">
          <footer className="text-center text-lg-start text-white">
            <section-6 className="footer">
              <div className="container text-center text-md-start  pt-5">
                <div className="row mt-3">
                  <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <div className="footer-brand d-flex flex-column">
                      <img className="brand-footer-logo" src="trainee-images/Schuelke_Logo 1 (1).png" alt="" />
                      <div className="footer-brand-info">Knowledge Transfer</div>
                    </div>

                    <div className="social-logos d-flex">
                      <a href="#!">
                        {/* <ion-icon className="social-logo" name="logo-facebook"></ion-icon> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-facebook" viewBox="0 0 16 16">
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>
                      </a>
                      <a href="#!">
                        {/* <ion-icon className="social-logo" name="logo-instagram"></ion-icon> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-instagram" viewBox="0 0 16 16">
                          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                        </svg>
                      </a>
                      <a href="#!">
                        {/* <ion-icon className="social-logo" name="logo-linkedin"></ion-icon> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-linkedin" viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 text-md-left">
                    <h6 className="fw-bold mb-4 text-light">
                      Quick Links
                    </h6>
                    <p>
                      <a href="#home" className="text-reset">Home</a>
                    </p>
                    <p>
                      <a href="#section-3" className="text-reset">About</a>
                    </p>
                    <p>
                      <a href="#section-4" className="text-reset">Trainings</a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">Contact</a>
                    </p>
                  </div>
                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 text-md-left">
                    <h6 className="fw-bold mb-4 text-light">
                      Topics
                    </h6>
                    <p>
                      <a href="#bed-sheets" className="text-reset">Blanket Topics</a>
                    </p>
                    <p>
                      <a href="#product-topics" className="text-reset">Country Topics</a>
                    </p>
                    <p>
                      <a href="#globe" className="text-reset">Product Topics</a>
                    </p>
                  </div>
                  <div className="last-col col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-md-left">
                    <h6 className="fw-bold mb-4 pl-md-3 text-light">Important Links</h6>
                    <p><i className="fas fa-home me-3 text-reset"></i><a href="#!" className="text-reset">Privacy Policy</a></p>
                    <p>
                      <i className="fas fa-envelope me-3 "></i>
                      <a href="#!" className="text-reset">Terms & Conditions</a>
                    </p>
                    <p><i className="fas fa-phone me-3"></i><a href="#!" className="text-reset">Disclaimer</a></p>
                    <p><i className="fas fa-print me-3"></i><a href="#!" className="text-reset">Sitemap</a></p>
                  </div>
                </div>
              </div>

              <div className="move-up">
                <a href="#home">
                  {/* <ion-icon className="move-up-icon" name="chevron-up-outline"></ion-icon> */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="move-up-icon" width="35" height="35" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                  </svg>
                </a>
              </div>
            </section-6>
            <div className="text-center p-3"
              style={{ backgroundColor: '#0b4668', color: `rgb(223, 219, 219)`, fontFamily: `myriad-regular` }}>
              © Copyright 2022 Schülke
            </div>
          </footer>
        </section-6>
      </div>
    </>
  );
}
index.getLayout = function getLayout(page) {
  return (
    <authLayout>{page}</authLayout>
  )
}
export default index;