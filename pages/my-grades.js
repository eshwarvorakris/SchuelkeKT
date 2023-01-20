import { useState, useContext } from "react";
import useSWR from 'swr';
import auth from "../model/auth.model";
import Router from "next/router";
import AppContext from '../lib/appContext';
const mygrade = () => {
    const layoutValues = useContext(AppContext);
    { layoutValues.setPageHeading("My Grades") }
    return (
        <>
            <form>
                <div className="trainee-body">
                    <div className="trainee-list d-flex flex-column" style={{ padding: 'unset', height: 'unset' }}>
                        <div className="box-1"></div>
                        <div className="box-2"></div>

                        <div className="trainee-tag" style={{ zIndex: '1' }}>
                            <p>My Grades</p>
                        </div>

                        <div className="body-row">
                            <div><span><strong>Grade Items</strong></span></div>
                            <div><span><strong>Percentage</strong></span></div>
                            <div><span><strong>Remarks</strong></span></div>
                        </div>

                        <div className="content-heading">
                            <div className="folder-icon">
                                <img src="/trainee-images/trainee-my-grade/Group 1040.png" alt="" />
                            </div>
                            <h5 style={{ margin: 'unset', padding: 'unset' }}>Cardiology</h5>
                        </div>

                        <div className="Quizzes-heading-1">
                            <span style={{ color: "#008BD6" }}>Quizzes</span>
                        </div>

                        <div className="Quiz-container custom-scroll">
                            <div className="Quiz-1 d-flex justify-content-between">
                                <div className="grade-item d-flex gap-1 align-items-center">
                                    <div className="grade-icon">
                                        <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                            alt="" />
                                    </div>
                                    <span>Chapter 1</span>
                                </div>
                                <div className="Percentage">
                                    <span><strong>98.78%</strong></span>
                                </div>
                                <div className="Remarks">
                                    <span>Lorem ipsum dolor</span>
                                </div>
                            </div>

                            <div className="Quiz-1 d-flex justify-content-between">
                                <div className="grade-item d-flex gap-1 align-items-center">
                                    <div className="grade-icon">
                                        <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                            alt="" />
                                    </div>
                                    <span>Chapter 2</span>
                                </div>
                                <div className="Percentage">
                                    <span><strong>94.66%</strong></span>
                                </div>
                                <div className="Remarks">
                                    <span>Lorem ipsum dolor</span>
                                </div>
                            </div>

                            <div className="Quiz-1 d-flex justify-content-between">
                                <div className="grade-item d-flex gap-1 align-items-center">
                                    <div className="grade-icon">
                                        <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                            alt="" />
                                    </div>
                                    <span>Chapter 3</span>
                                </div>
                                <div className="Percentage">
                                    <span><strong>93.45%</strong></span>
                                </div>
                                <div className="Remarks">
                                    <span>Lorem ipsum dolor</span>
                                </div>
                            </div>

                            <div className="Quiz-1 d-flex justify-content-between">
                                <div className="grade-item d-flex gap-1 align-items-center">
                                    <div className="grade-icon">
                                        <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                            alt="" />
                                    </div>
                                    <span>Chapter 4</span>
                                </div>
                                <div className="Percentage">
                                    <span><strong>94.45%</strong></span>
                                </div>
                                <div className="Remarks">
                                    <span>Lorem ipsum dolor</span>
                                </div>
                            </div>

                            <div className="Quiz-1 d-flex justify-content-between">
                                <div className="grade-item d-flex gap-1 align-items-center">
                                    <div className="grade-icon">
                                        <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                            alt="" />
                                    </div>
                                    <span>Chapter 5</span>
                                </div>
                                <div className="Percentage">
                                    <span><strong>94.22%</strong></span>
                                </div>
                                <div className="Remarks">
                                    <span>Lorem ipsum dolor</span>
                                </div>
                            </div>
                        </div>


                        <div className="content-heading-2">
                            <div className="folder-icon">
                                <img src="/trainee-images/trainee-my-grade/Group 1040.png" alt="" />
                            </div>
                            <h5>Pulmonology</h5>
                        </div>

                        <div className="Quizzes-heading-2">
                            <span style={{ color: "#008BD6" }}>Quizzes</span>
                        </div>

                        <div className="Quiz-container custom-scroll">
                            <div className="Quiz-2 d-flex justify-content-between">
                                <div className="grade-item d-flex gap-1 align-items-center">
                                    <div className="grade-icon">
                                        <img src="/images/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                            alt="" />
                                    </div>
                                    <span>Chapter 1</span>
                                </div>
                                <div className="Percentage">
                                    <span><strong>98.78%</strong></span>
                                </div>
                                <div className="Remarks">
                                    <span>Lorem ipsum dolor</span>
                                </div>
                            </div>

                            <div className="Quiz-2 d-flex justify-content-between">
                                <div className="grade-item d-flex gap-1 align-items-center">
                                    <div className="grade-icon">
                                        <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                            alt="" />
                                    </div>
                                    <span>Chapter 2</span>
                                </div>
                                <div className="Percentage">
                                    <span><strong>94.66%</strong></span>
                                </div>
                                <div className="Remarks">
                                    <span>Lorem ipsum dolor</span>
                                </div>
                            </div>

                            <div className="Quiz-2 d-flex justify-content-between">
                                <div className="grade-item d-flex gap-1 align-items-center">
                                    <div className="grade-icon">
                                        <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                            alt="" />
                                    </div>
                                    <span>Chapter 3</span>
                                </div>
                                <div className="Percentage">
                                    <span><strong>93.45%</strong></span>
                                </div>
                                <div className="Remarks">
                                    <span>Lorem ipsum dolor</span>
                                </div>
                            </div>

                            <div className="Quiz-2 d-flex justify-content-between">
                                <div className="grade-item d-flex gap-1 align-items-center">
                                    <div className="grade-icon">
                                        <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                            alt="" />
                                    </div>
                                    <span>Chapter 4</span>
                                </div>
                                <div className="Percentage">
                                    <span><strong>94.45%</strong></span>
                                </div>
                                <div className="Remarks">
                                    <span>Lorem ipsum dolor</span>
                                </div>
                            </div>

                            <div className="Quiz-2 d-flex justify-content-between">
                                <div className="grade-item d-flex gap-1 align-items-center">
                                    <div className="grade-icon">
                                        <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                            alt="" />
                                    </div>
                                    <span>Chapter 5</span>
                                </div>
                                <div className="Percentage">
                                    <span><strong>94.22%</strong></span>
                                </div>
                                <div className="Remarks">
                                    <span>Lorem ipsum dolor</span>
                                </div>
                            </div>
                        </div>

                        <div className="content-heading-4">
                            <span>Final Exam</span>
                        </div>

                        <div className="Final-Result-container">
                            <div className="Quiz-2 d-flex justify-content-between">
                                <div className="grade-item d-flex gap-1 align-items-center">
                                    <div className="grade-icon">
                                        <img src="/trainee-images/trainee-my-grade/octicon_checklist-24.png"
                                            alt="" />
                                    </div>
                                    <span>Course Completion</span>
                                </div>
                                <div className="Percentage">
                                    <span><strong>98.34%</strong></span>
                                </div>
                                <div className="Remarks">
                                    <span>Lorem ipsum dolor</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}
export default mygrade;