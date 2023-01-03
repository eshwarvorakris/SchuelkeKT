import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./component/sidebar";
import Topnavbar from "./component/topnavbar";
import Router from "next/router";
const quizresultresult = () => {
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
                            <div class="header-breadcrumb" aria-label="breadcrumb">
                                <ol class="breadcrumb" style={{backgroundColor: "#F5F6F8"}}>
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#">Course</a></li>
                                    <li class="breadcrumb-item"><a href="#">Cardiology</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Quizzes</li>
                                </ol>
                            </div>
                            <div class="content-header">
                                {/* <!-- <h4>To Boost Your Understanding</h4> --> */}

                                <h4><img src="/trainee-images/trainee-quiz-images/carbon_warning-filled.png"
                                        alt="warning symbol" class="icon"/> Try again once you are ready</h4>
                                <div class="header-content">
                                    <h6>Your Received <span class="text-danger pr-2">70%</span> To Pass <span
                                            style={{color: "#007CC2"}}>80% or Above</span>
                                    </h6>
                                    <a class="try-again" href="./trainee-quiz">
                                        <button type="button" class="try-again-btn">Try Again</button>
                                    </a>
                                </div>
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


                                            <div class="question-options">
                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option correct">

                                                    <div>
                                                        <input checked type="radio" id="1-option-1" name="question-1"/>
                                                        <label for="1-option-1">A. Endocardium</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                            
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input type="radio" id="1-option-2" disabled name="question-1"/>
                                                        <label for="1-option-2">B. Interventricular septum</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                    
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="1-option-3" name="question-1"/>
                                                        <label for="1-option-3">C. Myocardium</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="1-option-4" name="question-1"/>
                                                        <label for="1-option-4">D. Pericardium</label>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="question-2">
                                            <div class="question">
                                                <span>2. The record used to detect electrical changes in the heart muscle as the
                                                    heart is beating is called a</span>

                                                <div class="points">1 point</div>
                                            </div>


                                            <div class="question-options">

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option wrong">
                                                    <div>
                                                        <input checked type="radio" id="2-option-1" name="question-2"/>
                                                        <label for="2-option-1">A. Echocardiogram</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="2-option-2" name="question-2"/>
                                                        <label for="2-option-2">B. Electrocardiogram</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="2-option-3" name="question-2"/>
                                                        <label for="2-option-3">C. Electroencephalogram</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                            
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="2-option-4" name="question-2"/>
                                                        <label for="2-option-4">D. Sphygmomanometer</label>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="question-3">
                                            <div class="question">
                                                <span>3. A patient comes in with trouble breating,
                                                    and sweling in the lower legs. The provider suspects</span>

                                                <div class="points">1 point</div>
                                            </div>


                                            <div class="question-options">

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="3-option-1" name="question-3"/>
                                                        <label for="3-option-1">A. Congestive heart failure</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="3-option-2" name="question-3"/>
                                                        <label for="3-option-2">B. A heart murmur</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option correct">
                                                    <div>
                                                        <input checked type="radio" id="3-option-3" name="question-3"/>
                                                        <label for="3-option-3">C. Myocardial infarction</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="3-option-4" name="question-3"/>
                                                        <label for="3-option-4">D. Aneurysm</label>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="question-4">
                                            <div class="question">
                                                <span>4. Which of the following risk factors for cardiac disease can be
                                                    modified?</span>

                                                <div class="points">1 point</div>
                                            </div>


                                            <div class="question-options">

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="4-option-1" name="question-4"/>
                                                        <label for="4-option-1">A. Age</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option correct">
                                                    <div>
                                                        <input checked type="radio" id="4-option-2" name="question-4"/>
                                                        <label for="4-option-2">B. Diabetes mellitus</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="4-option-3" name="question-4"/>
                                                        <label for="4-option-3">C. Family history</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="4-option-4" name="question-4"/>
                                                        <label for="4-option-4">D. Gender</label>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="question-5">
                                            <div class="question">
                                                <span>5. Which of the following risk factors for cardiac disease can be
                                                    modified?</span>

                                                <div class="points">1 point</div>
                                            </div>


                                            <div class="question-options">

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option correct">
                                                    <div>
                                                        <input checked type="radio" id="5-option-1" name="question-5"/>
                                                        <label for="5-option-1">A. Age</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="5-option-2" name="question-5"/>
                                                        <label for="5-option-2">B. Diabetes mellitus</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>

                                                {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="5-option-3" name="question-5"/>
                                                        <label for="5-option-3">C. Family history</label><br/>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>
                                                        {/* <!-- add "correct" or "wrong" classes here  --> */}
                                                <div class="d-flex justify-content-between option">
                                                    <div>
                                                        <input disabled type="radio" id="5-option-4" name="question-5"/>
                                                        <label for="5-option-4">D. Gender</label>
                                                    </div>

                                                    <img class="wrong-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                                                        alt="wrong"/>

                                                    <img class="correct-icon"
                                                        src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                                                        alt="correct"/>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="footer-btn">
                                        <a href="#">
                                            <button type="button" class="go-up-btn">
                                                <ion-icon class="go-up-icon" name="chevron-up-outline"></ion-icon>
                                            </button>
                                        </a>
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
export default quizresultresult;