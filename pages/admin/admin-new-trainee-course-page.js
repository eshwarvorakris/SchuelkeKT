import auth from "../../model/auth.model";
import Sidebar from "./component/sidebar";
import Topnavbar from "./component/topnavbar";
const adminnewtraineecoursepage = () => {
  return (
    <>
        <div>
            <div class="section1-edit">
                <div class="blank-class"></div>
                <Sidebar/>
                <div class="container-2">
                    <div class="col-md-12 trainee-right">
                        <div class="blank-nav-class"></div>
                        <Topnavbar/>
                        <form>
                            <div class="header-heading">
                                <h5>My Progress</h5>
                            </div>
                            <div class="progress-card">
                                <div class="info">
                                    <div class="progress-card-heading">
                                        <span>Cardiology Deep Dive</span>
                                    </div>
                                    <div class="remaining-info-card">
                                        <span>4 Module Remaining</span>
                                    </div>
                                    <div class="date-assessment-info d-flex gap-2">
                                        <div class="date-label-1">
                                            <span>Due Date: 14 Apr'22, 12:00 AM</span>
                                        </div>
                                        <div class="assessment-label">
                                            <span>Assessment Submissions: none</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modules-heading">
                                <h5>Modules</h5>
                            </div>
                            <div>
                                <div class="module-cards">
                                    <a href="admin-topic-page.html" class="module-anchor">
                                        <div class="module-card card-1">
                                            <span>1 . Introduction to Cardiology</span>
                                        </div>
                                    </a>

                                    <a href="admin-topic-page.html" class="module-anchor">
                                        <div class="module-card card-2">
                                            <span>2 . Cardio Vascular Diseases</span>
                                        </div>
                                    </a>

                                    <a href="admin-topic-page.html" class="module-anchor">
                                        <div class="module-card card-3">
                                            <span>3 . Medical Cardiology</span>
                                        </div>
                                    </a>

                                    <a href="admin-topic-page.html" class="module-anchor">
                                        <div class="module-card card-4">
                                            <span>4. Cardiothoracic Surgery</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="module-1">
                                <div class="module-1-heading">
                                    <h5>Module 1</h5>
                                </div>

                                <div class="body-heading">
                                    <span>Introduction to Cardiology</span>
                                </div>

                                <div class="heading-content">
                                    <span>Pulmonology is a medical speciality that deals with diseases involving the respiratory
                                        tract
                                    </span>
                                </div>

                                <div class="accordions">

                                    <div class="accordion accordion-flush d-flex flex-column gap-2" id="accordionFlushExample">
                                        <div class="accordion-container">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingOne">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#flush-collapse-1-One"
                                                        aria-expanded="false" aria-controls="flush-collapse-1-One">
                                                        <strong>Chapter 1: Introduction to Cardiology</strong>
                                                    </button>
                                                </h2>
                                                <div id="flush-collapse-1-One" class="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body one">
                                                        <div class="topic">
                                                            <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                                                                class="topic-icon" alt=""/>
                                                            <div class="topic-name">
                                                                <span>Fundamentals of Cardiology For the USMLE and
                                                                    General Medics
                                                                </span>
                                                            </div>
                                                            <div class="topic-duration"><span>20mins</span></div>
                                                        </div>
                                                        <hr class="divider"/>
                                                        <div class="topic">
                                                            <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                                                                class="topic-icon" alt=""/>
                                                            <div class="topic-name">
                                                                <span>Clinical Cardiology: Current Practice
                                                                    Guidelines</span>
                                                            </div>
                                                            <div class="topic-duration"><span>20mins</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="accordion-container">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingTwo">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#flush-collapse-2-Two"
                                                        aria-expanded="false" aria-controls="flush-collapse-2-Two">
                                                        <strong>Chapter 2: Introduction to Cardiology</strong>
                                                    </button>
                                                </h2>
                                                <div id="flush-collapse-2-Two" class="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body one">
                                                        <div class="topic">
                                                            <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                                                                class="topic-icon" alt=""/>
                                                            <div class="topic-name">
                                                                <span>Fundamentals of Cardiology For the USMLE and
                                                                    General Medics
                                                                </span>
                                                            </div>
                                                            <div class="topic-duration"><span>20mins</span></div>
                                                        </div>
                                                        <hr class="divider"/>
                                                        <div class="topic">
                                                            <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                                                                class="topic-icon" alt=""/>
                                                            <div class="topic-name">
                                                                <span>Clinical Cardiology: Current Practice
                                                                    Guidelines</span>
                                                            </div>
                                                            <div class="topic-duration"><span>20mins</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="accordion-container">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingThree">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#flush-collapse-3-Three"
                                                        aria-expanded="false" aria-controls="flush-collapse-3-Three">
                                                        <strong>Chapter 3: Introduction to Cardiology</strong>
                                                    </button>
                                                </h2>
                                                <div id="flush-collapse-3-Three" class="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingThree"
                                                    data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body one">
                                                        <div class="topic">
                                                            <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                                                                class="topic-icon" alt=""/>
                                                            <div class="topic-name">
                                                                <span>Fundamentals of Cardiology For the USMLE and
                                                                    General Medics
                                                                </span>
                                                            </div>
                                                            <div class="topic-duration"><span>20mins</span></div>
                                                        </div>
                                                        <hr class="divider"/>
                                                        <div class="topic">
                                                            <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                                                                class="topic-icon" alt=""/>
                                                            <div class="topic-name">
                                                                <span>Clinical Cardiology: Current Practice
                                                                    Guidelines</span>
                                                            </div>
                                                            <div class="topic-duration"><span>20mins</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="module-2">
                                <div class="module-2-heading">
                                    <h5>Module 2</h5>
                                </div>
                                <div class="body-heading">
                                    <span>Cardio Vascular Diseases</span>
                                </div>
                                <div class="heading-content">
                                    <span>Pulmonology is a medical speciality that deals with diseases involving the respiratory
                                        tract
                                    </span>
                                </div>                            
                                {/* <!-- <div class="button-progress-container">
                                    <button type="button" class="start-learning-btn">
                                        Start Learning
                                    </button>
                                </div> --> */}
                                {/* <!-- continue learning progress bar --> */}

                                {/* 
                                <!-- <div class="button-progress-container">
                                    <a class="topic-link" href="admin-topic-page.html">
                                    <button type="button" class="start-learning-btn d-flex gap-2">
                                        <div class="blank-class">
                                            <ion-icon class="play-icon" name="play-outline"></ion-icon>
                                        </div>
                                        <span>Continue Learning</span>

                                    </button>
                                    </a>

                                    <div class="learning-progress-bar d-flex flex-column gap-2">
                                        <div class="d-flex justify-content-between">
                                            <span>61% Completed</span>
                                            <span>9hrs 45mins left</span>
                                        </div>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50"
                                                aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div> --> */}

                                {/* <!-- /////////////////////////////////////////////////////////// -->

                                <!-- <div class="topic-chapter-container">
                                    <a class="topic-link" href="admin-topic-page.html">
                                        <div class="chapter-1">
                                            <span>Chapter 1: What Is Pulmonlogy</span>

                                            <span class="remaining-info">2hrs 30mins
                                                <i class="fa-solid fa-chevron-down pl-2"></i>
                                            </span>

                                            <div class="lastcol">
                                                <div class="chapter-locked-icon">
                                                    <span>
                                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="topic-link" href="admin-topic-page.html">
                                        <div class="chapter-2">
                                            <span>Chapter 2: The Skull (Facial bones, Skeletal structures</span>
                                            <span class="remaining-info">2hrs 34mins
                                                <i class="fa-solid fa-chevron-down pl-2"></i>
                                            </span>

                                            <div class="lastcol">
                                                <div class="chapter-locked-icon">
                                                    <span>
                                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="topic-link" href="admin-topic-page.html">
                                        <div class="chapter-3">
                                            <span>Chapter 3: Appendicular Skeleton-Girdles</span>

                                            <span class="remaining-info">2hrs 34mins
                                                <i class="fa-solid fa-chevron-down pl-2"></i>
                                            </span>

                                            <div class="lastcol">
                                                <div class="chapter-locked-icon">
                                                    <span>
                                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div> --> */}
                                <div class="accordions">
                                    <div class="accordion accordion-flush d-flex flex-column gap-2" id="accordionFlushExample">
                                        <div class="accordion-container">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingOne">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                                                        aria-expanded="false" aria-controls="flush-collapseOne">
                                                        <strong>Chapter 1: Introduction to Cardiology</strong>
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseOne" class="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body one">
                                                        <div class="topic">
                                                            <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                                                                class="topic-icon" alt=""/>
                                                            <div class="topic-name">
                                                                <span>Fundamentals of Cardiology For the USMLE and
                                                                    General Medics
                                                                </span>
                                                            </div>
                                                            <div class="topic-duration"><span>20mins</span></div>
                                                        </div>
                                                        <hr class="divider"/>
                                                        <div class="topic">
                                                            <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                                                                class="topic-icon" alt=""/>
                                                            <div class="topic-name">
                                                                <span>Clinical Cardiology: Current Practice
                                                                    Guidelines</span>
                                                            </div>
                                                            <div class="topic-duration"><span>20mins</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="accordion-container">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingTwo">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                                                        aria-expanded="false" aria-controls="flush-collapseTwo">
                                                        <strong>Chapter 2: Introduction to Cardiology</strong>
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseTwo" class="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body one">
                                                        <div class="topic">
                                                            <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                                                                class="topic-icon" alt=""/>
                                                            <div class="topic-name">
                                                                <span>Fundamentals of Cardiology For the USMLE and
                                                                    General Medics
                                                                </span>
                                                            </div>
                                                            <div class="topic-duration"><span>20mins</span></div>
                                                        </div>
                                                        <hr class="divider"/>
                                                        <div class="topic">
                                                            <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                                                                class="topic-icon" alt=""/>
                                                            <div class="topic-name">
                                                                <span>Clinical Cardiology: Current Practice
                                                                    Guidelines</span>
                                                            </div>
                                                            <div class="topic-duration"><span>20mins</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="accordion-container">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="flush-headingThree">
                                                    <button class="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                                                        aria-expanded="false" aria-controls="flush-collapseThree">
                                                        <strong>Chapter 3: Introduction to Cardiology</strong>
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseThree" class="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingThree"
                                                    data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body one">
                                                        <div class="topic">
                                                            <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                                                                class="topic-icon" alt=""/>
                                                            <div class="topic-name">
                                                                <span>Fundamentals of Cardiology For the USMLE and
                                                                    General Medics
                                                                </span>
                                                            </div>
                                                            <div class="topic-duration"><span>20mins</span></div>
                                                        </div>
                                                        <hr class="divider"/>
                                                        <div class="topic">
                                                            <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                                                                class="topic-icon" alt=""/>
                                                            <div class="topic-name">
                                                                <span>Clinical Cardiology: Current Practice
                                                                    Guidelines</span>
                                                            </div>
                                                            <div class="topic-duration"><span>20mins</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="btn-containers">
                                    <button type="button" class="footer-btn approve-btn"
                                        style={{backgroundColor: "#008bd6"}}>Approve</button>
                                    <button type="button" class="footer-btn reject-btn">Reject</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
export default adminnewtraineecoursepage;