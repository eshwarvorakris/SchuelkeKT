import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./component/sidebar";
import Topnavbar from "./component/topnavbar";
import Router from "next/router";
const mygrade = () => {
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
                            <div class="trainee-body-list">
                                <div class="trainee-body d-flex flex-column">
                                    <div class="box-1"></div>
                                    <div class="box-2"></div>

                                    <div class="trainee-tag">
                                        <p>My Grades</p>
                                    </div>

                                    {/* <!-- trainee body --> */}

                                    <div class="body-row">
                                        <div><span><strong>Grade Items</strong></span></div>
                                        <div><span><strong>Percentage</strong></span></div>
                                        <div><span><strong>Remarks</strong></span></div>
                                    </div>

                                    <div class="content-heading">
                                        <div class="folder-icon">
                                            <img src="/trainee-images/trainee-my-grade/Group 1040.png" alt=""/>
                                        </div>
                                        <h5>Cardiology</h5>
                                    </div>

                                    <div class="Quizzes-heading-1">
                                        <span style={{color: "#008BD6"}}>Quizzes</span>
                                    </div>

                                    <div class="Quiz-container custom-scroll">
                                        <div class="Quiz-1 d-flex justify-content-between">
                                            <div class="grade-item d-flex gap-1 align-items-center">
                                                <div class="grade-icon">
                                                    <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                                        alt=""/>
                                                </div>
                                                <span>Chapter 1</span>
                                            </div>
                                            <div class="Percentage">
                                                <span><strong>98.78%</strong></span>
                                            </div>
                                            <div class="Remarks">
                                                <span>Lorem ipsum dolor</span>
                                            </div>
                                        </div>

                                        <div class="Quiz-1 d-flex justify-content-between">
                                            <div class="grade-item d-flex gap-1 align-items-center">
                                                <div class="grade-icon">
                                                    <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                                        alt=""/>
                                                </div>
                                                <span>Chapter 2</span>
                                            </div>
                                            <div class="Percentage">
                                                <span><strong>94.66%</strong></span>
                                            </div>
                                            <div class="Remarks">
                                                <span>Lorem ipsum dolor</span>
                                            </div>
                                        </div>

                                        <div class="Quiz-1 d-flex justify-content-between">
                                            <div class="grade-item d-flex gap-1 align-items-center">
                                                <div class="grade-icon">
                                                    <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                                        alt=""/>
                                                </div>
                                                <span>Chapter 3</span>
                                            </div>
                                            <div class="Percentage">
                                                <span><strong>93.45%</strong></span>
                                            </div>
                                            <div class="Remarks">
                                                <span>Lorem ipsum dolor</span>
                                            </div>
                                        </div>

                                        <div class="Quiz-1 d-flex justify-content-between">
                                            <div class="grade-item d-flex gap-1 align-items-center">
                                                <div class="grade-icon">
                                                    <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                                        alt=""/>
                                                </div>
                                                <span>Chapter 4</span>
                                            </div>
                                            <div class="Percentage">
                                                <span><strong>94.45%</strong></span>
                                            </div>
                                            <div class="Remarks">
                                                <span>Lorem ipsum dolor</span>
                                            </div>
                                        </div>

                                        <div class="Quiz-1 d-flex justify-content-between">
                                            <div class="grade-item d-flex gap-1 align-items-center">
                                                <div class="grade-icon">
                                                    <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                                        alt=""/>
                                                </div>
                                                <span>Chapter 5</span>
                                            </div>
                                            <div class="Percentage">
                                                <span><strong>94.22%</strong></span>
                                            </div>
                                            <div class="Remarks">
                                                <span>Lorem ipsum dolor</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="content-heading-2">
                                        <div class="folder-icon">
                                            <img src="/trainee-images/trainee-my-grade/Group 1040.png" alt=""/>
                                        </div>
                                        <h5>Pulmonology</h5>
                                    </div>

                                    <div class="Quizzes-heading-2">
                                        <span style={{color: "#008BD6"}}>Quizzes</span>
                                    </div>

                                    <div class="Quiz-container custom-scroll">
                                        <div class="Quiz-2 d-flex justify-content-between">
                                            <div class="grade-item d-flex gap-1 align-items-center">
                                                <div class="grade-icon">
                                                    <img src="/images/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                                        alt=""/>
                                                </div>
                                                <span>Chapter 1</span>
                                            </div>
                                            <div class="Percentage">
                                                <span><strong>98.78%</strong></span>
                                            </div>
                                            <div class="Remarks">
                                                <span>Lorem ipsum dolor</span>
                                            </div>
                                        </div>

                                        <div class="Quiz-2 d-flex justify-content-between">
                                            <div class="grade-item d-flex gap-1 align-items-center">
                                                <div class="grade-icon">
                                                    <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                                        alt=""/>
                                                </div>
                                                <span>Chapter 2</span>
                                            </div>
                                            <div class="Percentage">
                                                <span><strong>94.66%</strong></span>
                                            </div>
                                            <div class="Remarks">
                                                <span>Lorem ipsum dolor</span>
                                            </div>
                                        </div>

                                        <div class="Quiz-2 d-flex justify-content-between">
                                            <div class="grade-item d-flex gap-1 align-items-center">
                                                <div class="grade-icon">
                                                    <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                                        alt=""/>
                                                </div>
                                                <span>Chapter 3</span>
                                            </div>
                                            <div class="Percentage">
                                                <span><strong>93.45%</strong></span>
                                            </div>
                                            <div class="Remarks">
                                                <span>Lorem ipsum dolor</span>
                                            </div>
                                        </div>

                                        <div class="Quiz-2 d-flex justify-content-between">
                                            <div class="grade-item d-flex gap-1 align-items-center">
                                                <div class="grade-icon">
                                                    <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                                        alt=""/>
                                                </div>
                                                <span>Chapter 4</span>
                                            </div>
                                            <div class="Percentage">
                                                <span><strong>94.45%</strong></span>
                                            </div>
                                            <div class="Remarks">
                                                <span>Lorem ipsum dolor</span>
                                            </div>
                                        </div>

                                        <div class="Quiz-2 d-flex justify-content-between">
                                            <div class="grade-item d-flex gap-1 align-items-center">
                                                <div class="grade-icon">
                                                    <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                                        alt=""/>
                                                </div>
                                                <span>Chapter 5</span>
                                            </div>
                                            <div class="Percentage">
                                                <span><strong>94.22%</strong></span>
                                            </div>
                                            <div class="Remarks">
                                                <span>Lorem ipsum dolor</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="content-heading-4">
                                        <span>Final Exam</span>
                                    </div>

                                    <div class="Final-Result-container">
                                        <div class="Quiz-2 d-flex justify-content-between">
                                            <div class="grade-item d-flex gap-1 align-items-center">
                                                <div class="grade-icon">
                                                    <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                                        alt=""/>
                                                </div>
                                                <span>Course Completion</span>
                                            </div>
                                            <div class="Percentage">
                                                <span><strong>98.34%</strong></span>
                                            </div>
                                            <div class="Remarks">
                                                <span>Lorem ipsum dolor</span>
                                            </div>
                                        </div>
                                    </div>

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
export default mygrade;