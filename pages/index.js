import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import auth from "../model/auth.model";
import Navbar from "../components/navbar";

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

      <div className="section1" id="home" style={{display:'block'}}>
        <Navbar />
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

          <img src="site_img/Schuelke_Logo 2.png" alt="" className="big-logo" />
          <img src="site_img/Schuelke_Logo 5.png" alt="" className="medium-logo"/>
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
          <div className="col-md-12 mb-5">
            <div className="story-content">
              <p>Schulke knowledge Transfer will cover the following topics.</p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row training-topics-cards">
            <div className="col-lg-4 col-md-6 mt-sm-5">
              <div className="card training-card ml-md-5 p-3 text-center" style={{width: '17rem', height: "17rem"}}>
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
                  <a href="#" className="btn btn-light training-card-btn" data-toggle="modal" data-target="#myModal">Know
                    More</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mt-sm-5">
              <div className="card training-card ml-md-5 p-3 text-center" style={{width: '17rem', height: "17rem"}}>
                <div className="card-body" id="product-topics">
                  <div className="card-icon">
                    <img className="section3-icon" src="trainee-images/package 1.png" alt="" />
                  </div>
                  <h5 className="card-title training-title text-light">
                    Product Topics
                  </h5>
                  <p className="card-text training-info text-light">
                    Information of the different products in your region </p>
                  <a href="#" className="btn btn-light training-card-btn" data-toggle="modal" data-target="#myModal-2">Know
                    More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-md-5 mt-sm-5">
              <div className="card training-card ml-md-5 p-3 text-center"  style={{width: '17rem', height: "17rem"}}>
                <div className="card-body" id="globe">
                  <div className="card-icon">
                    <img className="section3-icon" src="trainee-images/coronavirus (3) 1.png" alt="" />
                  </div>
                  <h5 className="card-title training-title text-light">
                    Country Topics
                  </h5>
                  <p className="card-text training-info text-light">
                    Information specific to your region of interest </p>
                  <a href="#" className="btn btn-light training-card-btn" data-toggle="modal" data-target="#myModal-3">Know
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
                  <h5 className="align-middle popup-p" style={{width: '60%', margin: "auto"}}>
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
                  <h5 className="align-middle popup-p" style={{width: '60%', margin: "auto"}}>
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
                  <h5 className="align-middle popup-p" style={{width: '60%', margin: "auto"}}>
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
                <ion-icon className="play-btn" name="play-outline"></ion-icon>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" tabindex="-1" id="myModal2">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center" style={{height: '30rem'}}>

                <video width="100%" height="100%" controls poster="images/trainer-images/poster.png">
                  <source src="/videos/landing-page/Landing Page Video V1.mp4" type="video/mp4" />
                  Your browser does not support this video.
                </video>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section5">
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
              <div className="card trainer-card" style={{width: "13rem"}}>
                <img className="card-img-top trainer-img" src="trainee-images/faces/Dr. Thomas.png"
                  style={{height: "12rem"}} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title card-names" style={{color:'#007cc2'}}>Dr. Thomas Oh</h5>
                  <div className="department-info">Medical & Scientific Affai'rs (APAC) </div>
                  <div className="LMS-info">Administrator/Trainer </div>
                  <div className="country-info">Singapore/APAC</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 full-card">
              <div className="card trainer-card"style={{width: "13rem"}}>
                <img className="card-img-top trainer-img" src="trainee-images/faces/Pearleen pic.png"
                  style={{height: "12rem"}} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title card-names" style={{color:'#007cc2'}}>Ms. Pearleen Ho</h5>
                  <div className="department-info">Senior Application Scientist </div>
                  <div className="LMS-info">Trainer </div>
                  <div className="country-info">Singapore</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 full-card">
              <div className="card trainer-card"style={{width: "13rem"}}>
                <img className="card-img-top trainer-img" src="trainee-images/faces/Shey.png" style={{height: "12rem"}}
                  alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title card-names" style={{color:'#007cc2'}}>Ms. Shey LEMCKE</h5>
                  <div className="department-info">Sales & Marketing </div>
                  <div className="LMS-info">Trainer </div>
                  <div className="country-info">Australia & New Zealand</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 full-card">
              <div className="card trainer-card"style={{width: "13rem"}}>
                <img className="card-img-top trainer-img" src="trainee-images/faces/Mandy.png" style={{height: "12rem"}}
                  alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title card-names" style={{color:'#007cc2'}}>Ms. Mandy MITCHIE</h5>
                  <div className="department-info">National Trainer </div>
                  <div className="LMS-info">Trainer </div>
                  <div className="country-info">Australia & New Zealand</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row m-auto">
            <div className="col-lg-3 col-sm-6 full-card">
              <div className="card trainer-card" style={{width: "13rem"}}>
                <img className="card-img-top trainer-img" src="trainee-images/faces/Rohit Bhatia.png"
                  style={{height: "12rem"}} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title card-names" style={{color:'#007cc2'}}>Mr. Rohit BHATIA</h5>
                  <div className="department-info">Marketing </div>
                  <div className="LMS-info">Trainer </div>
                  <div className="country-info">India</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 full-card">
              <div className="card trainer-card" style={{width: "13rem"}}>
                <img className="card-img-top trainer-img" src="trainee-images/faces/Raja.png" style={{height: "12rem"}}
                  alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title card-names" style={{color:'#007cc2'}}>Mr. V Rajaraman</h5>
                  <div className="department-info" style={{fontSize: '10px'}}>Customer Engagement & Key Account </div>
                  <div className="LMS-info">Trainer </div>
                  <div className="country-info">India</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 full-card">
              <div className="card trainer-card" style={{width: "13rem"}}>
                <img className="card-img-top trainer-img" src="trainee-images/faces/Hideo head pic.png"
                  style={{height: "12rem"}} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title card-names" style={{color:'#007cc2'}}>Mr. Hideo TAKAHASHI</h5>
                  <div className="department-info">Sales & Marketing </div>
                  <div className="LMS-info">Trainer </div>
                  <div className="country-info">Japan</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 full-card">
              <div className="card trainer-card" style={{width: "13rem"}}>
                <img className="card-img-top trainer-img" src="trainee-images/faces/Mariya.png" style={{height: "12rem"}}
                  alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title card-names" style={{color:'#007cc2'}}>Ms. Mariya SOTA</h5>
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
            <div className="container text-center text-md-start mt-5 pt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <div className="footer-brand d-flex flex-column">
                    <img className="brand-footer-logo" src="trainee-images/Schuelke_Logo 1 (1).png" alt="" />
                    <div className="footer-brand-info">Knowledge Transfer</div>
                  </div>
                  
                  <div className="social-logos d-flex">
                    <a href="#!">
                      <ion-icon className="social-logo" name="logo-facebook"></ion-icon>
                    </a>
                    <a href="#!">
                      <ion-icon className="social-logo" name="logo-instagram"></ion-icon>
                    </a>
                    <a href="#!">
                      <ion-icon className="social-logo" name="logo-linkedin"></ion-icon>
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
                  <p><i className="fas fa-home me-3"></i><a href="#!">Privacy Policy</a></p>
                  <p>
                    <i className="fas fa-envelope me-3"></i>
                    <a href="#!">Terms & Conditions</a>
                  </p>
                  <p><i className="fas fa-phone me-3"></i><a href="#!">Disclaimer</a></p>
                  <p><i className="fas fa-print me-3"></i><a href="#!">Sitemap</a></p>
                </div>
              </div>
            </div>

            <div className="move-up">
              <a href="#home">
                <ion-icon className="move-up-icon" name="chevron-up-outline"></ion-icon>
              </a>
            </div>
          </section-6>
          <div className="text-center p-3"
            style={{backgroundColor: '#0b4668', color: `rgb(223, 219, 219)`, fontFamily: `myriad-regular`}}>
            © Copyright 2022 Schülke
          </div>
        </footer>
      </section-6>
    </div>
    </>
  );
}
export default index;