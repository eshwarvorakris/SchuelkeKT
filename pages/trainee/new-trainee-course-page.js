import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./component/sidebar";
import Topnavbar from "./component/topnavbar";
import Router from "next/router";
const newtraineecoursepage = () => {
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
                                {/* <!-- for better understanding the circular progress bar
                                refer the documentation ==> https://www.cssscript.com/circular-progress-bar-plain-html-css/  
                                or
                                https://www.tiagoalmeida.dev/posts/making-a-pure-css-circular-progress-bar.html--> */}
                                <div class="progress-bar-info">
                                    <div class="progress-circle over50 p60">
                                        <span>60%</span>
                                        <div class="left-half-clipper">
                                            <div class="first50-bar"></div>
                                            <div class="value-bar"></div>
                                        </div>
                                    </div>
                                    <div class="time-info">
                                        <span>9hrs 41mins left</span>
                                    </div>
                                </div>
                            </div>
                            <div class="modules-heading">
                                <h5>Modules</h5>
                            </div>
                            <div>
                                <div class="module-cards">
                                    <a href="/trainee/topic-page.html" class="module-anchor">
                                        <div class="module-card card-1">
                                            <span>1 . Introduction to Cardiology</span>
                                        </div>
                                    </a>

                                    <a href="/trainee/topic-page.html" class="module-anchor">
                                        <div class="module-card card-2">
                                            <span>2 . Cardio Vascular Diseases</span>
                                        </div>
                                    </a>

                                    <a href="/trainee/topic-page.html" class="module-anchor">
                                        <div class="module-card card-3">
                                            <span>3 . Medical Cardiology</span>
                                        </div>
                                    </a>

                                    <a href="/trainee/topic-page.html" class="module-anchor">
                                        <div class="module-card card-4">
                                            <span>4. Cardiothoracic Surgery</span>
                                        </div>
                                    </a>
                                </div>

                                <div class="progress-bars">
                                    <div class="card-1-progress">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0"
                                                aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="card-2-progress">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50"
                                                aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="card-3-progress">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75"
                                                aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="card-4-progress">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="100"
                                                aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>

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

                                {/* <!-- ////////////////////////////////////////////////////////// -->

                                <!-- start learning --> */}

                                {/* <!-- <div class="button-progress-container">
                                    <button type="button" class="start-learning-btn">
                                        Start Learning
                                    </button>
                                </div> --> */}


                                {/* <!-- continue learning progress bar --> */}


                                <div class="button-progress-container">
                                    <a class="topic-link" href="/trainee/topic-page.html">
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
                                </div>

                                {/* <!-- /////////////////////////////////////////////////////////// --> */}

                                <div class="topic-chapter-container">

                                    <a class="topic-link" href="/trainee/topic-page.html">
                                        <div class="chapter-1">
                                            <span>Chapter 1: What Is Pulmonlogy</span>

                                            <span class="remaining-info">2hrs 30mins
                                                <i class="fa-solid fa-chevron-down pl-2"></i>
                                            </span>

                                            <div class="lastcol">
                                                <div class="chapter-completed-icon circle-icon">
                                                    <span>
                                                        <i class="completed-icon fa-solid fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </a>

                                    <a class="topic-link" href="/trainee/topic-page.html">
                                        <div class="chapter-2">
                                            <span>Chapter 2: The Skull (Facial bones, Skeletal structures</span>

                                            <span class="remaining-info">2hrs 34mins
                                                <i class="fa-solid fa-chevron-down pl-2"></i>
                                            </span>

                                            <div class="lastcol">
                                                {/* <!-- for better understanding the circular progress bar refer the documentation ==> https://www.cssscript.com/circular-progress-bar-plain-html-css/  
                                            or
                                            https://www.tiagoalmeida.dev/posts/making-a-pure-css-circular-progress-bar.html--> */}
                                                <div class="progress-bar-info">
                                                    <div class="progress-circle progress-size over50 p90">
                                                        <span>90%</span>
                                                        <div class="left-half-clipper">
                                                            <div class="first50-bar"></div>
                                                            <div class="value-bar"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a class="topic-link" href="/trainee/topic-page.html">
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

                                {/* <!-- ////////////////////////////////////////////////////////// -->

                                <!-- start learning --> */}

                                <div class="button-progress-container">
                                    <button type="button" class="start-learning-btn">
                                        Start Learning
                                    </button>
                                </div>


                                {/* <!-- continue learning progress bar -->


                                <!-- <div class="button-progress-container">
                                    <a class="topic-link" href="/trainee/topic-page.html">
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
                                </div> -->

                                <!-- /////////////////////////////////////////////////////////// --> */}

                                <div class="topic-chapter-container">
                                    <a class="topic-link" href="/trainee/topic-page.html">
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
                                    <a class="topic-link" href="/trainee/topic-page.html">
                                        <div class="chapter-2">
                                            <span>Chapter 2: The Skull Facial bones, Skeletal structures</span>
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
                                    <a class="topic-link" href="/trainee/topic-page.html">
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
export default newtraineecoursepage;