import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./component/sidebar";
import Topnavbar from "./component/topnavbar";
import Router from "next/router";
const traineequiz = () => {
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
                            <div class="header-breadcrumb"  aria-label="breadcrumb">
                                <ol class="breadcrumb" style={{backgroundColor: "#F5F6F8"}}>
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#">Course</a></li>
                                    <li class="breadcrumb-item"><a href="#">Cardiology</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Quizzes</li>
                                </ol>
                            </div>

                            <div class="content-header">
                                <h4>To Boost Your Understanding</h4>
                            </div>

                    <div class="trainee-body">
                        <div class="trainee-list d-flex flex-column">
                            <div class="box-container-1">
                                <div class="box-1"></div>
                                <div class="box-2"></div>

                                <div class="trainee-tag">
                                    <p>Quizzes</p>
                                </div>
                            </div>

                            <div class="quiz-heading">
                                <h5>Questions</h5>
                            </div>

                            <div class="quiz-container">

                                <div class="question-1">
                                    <div class="question">
                                        <span>1. The smooth layer of endothelial cells that lines the interior of the
                                            heart and the heart valves is called</span>

                                        <div class="points">1 point</div>
                                    </div>
                                    <div class="question-options" id="group1">
                                        <div class="d-flex option">
                                            <input type="radio" id="1-option-1" name="group1"/>
                                            <label for="1-option-1">A. Endocardium</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="1-option-2" name="group1"/>
                                            <label for="1-option-2">B. Interventricular septum</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="1-option-3" name="group1"/>
                                            <label for="1-option-3">C. Myocardium</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="1-option-4" name="group1"/>
                                            <label for="1-option-4">D. Pericardium</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="question-2">
                                    <div class="question">
                                        <span>2. The record used to detect electrical changes in the heart muscle as the
                                            heart is beating is called a</span>

                                        <div class="points">1 point</div>
                                    </div>
                                    <div class="question-options" id="group2">
                                        <div class="d-flex option">
                                            <input type="radio" id="2-option-1" name="group2"/>
                                            <label for="2-option-1">A. Echocardiogram</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="2-option-2" name="group2"/>
                                            <label for="2-option-2">B. Electrocardiogram</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="2-option-3" name="group2"/>
                                            <label for="2-option-3">C. Electroencephalogram</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="2-option-4" name="group2"/>
                                            <label for="2-option-4">D. Sphygmomanometer</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="question-3">
                                    <div class="question">
                                        <span>3. A patient comes in with trouble breating,
                                            and sweling in the lower legs. The provider suspects</span>

                                        <div class="points">1 point</div>
                                    </div>
                                    <div class="question-options" id="group3">
                                        <div class="d-flex option">
                                            <input type="radio" id="3-option-1" name="group3"/>
                                            <label for="3-option-1">A. Congestive heart failure</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="3-option-2" name="group3"/>
                                            <label for="3-option-2">B. A heart murmur</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="3-option-3" name="group3"/>
                                            <label for="3-option-3">C. Myocardial infarction</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="3-option-4" name="group3"/>
                                            <label for="3-option-4">D. Aneurysm</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="question-4">
                                    <div class="question">
                                        <span>4. Which of the following risk factors for cardiac disease can be
                                            modified?</span>

                                        <div class="points">1 point</div>
                                    </div>
                                    <div class="question-options" id="group4">
                                        <div class="d-flex option">
                                            <input type="radio" id="4-option-1" name="group4"/>
                                            <label for="4-option-1">A. Age</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="4-option-2" name="group4"/>
                                            <label for="4-option-2">B. Diabetes mellitus</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="4-option-3" name="group4"/>
                                            <label for="4-option-3">C. Family history</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="4-option-4" name="group4"/>
                                            <label for="4-option-4">D. Gender</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="question-5">
                                    <div class="question">
                                        <span>5. Which of the following risk factors for cardiac disease can be
                                            modified?</span>

                                        <div class="points">1 point</div>
                                    </div>
                                    <div class="question-options" id="group5">
                                        <div class="d-flex option">
                                            <input type="radio" id="5-option-1" name="group5"/>
                                            <label for="5-option-1">A. Age</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="5-option-2" name="group5"/>
                                            <label for="5-option-2">B. Diabetes mellitus</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="5-option-3" name="group5"/>
                                            <label for="5-option-3">C. Family history</label><br/>
                                        </div>
                                        <div class="d-flex option">
                                            <input type="radio" id="5-option-4" name="group5"/>
                                            <label for="5-option-4">D. Gender</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="alert-box">
                                <input class="checkbox-box" type="checkbox" required id="checkmark"/>
                                <label for="checkmark"><span>Make sure that all the answers are marked</span></label>
                            </div>

                            <div class="button-container d-flex">
                                <a href="./trainee-quiz-result">
                                    <button type="button" class="submit-btn"
                                        style={{backgroundColor: "#008bd6"}}>Submit</button>
                                </a>
                                <button type="button" class="draft-btn">Save Draft</button>
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
export default traineequiz;