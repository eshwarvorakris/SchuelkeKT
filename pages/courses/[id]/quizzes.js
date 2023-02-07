import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import React, { useState, useContext } from 'react';
import AppContext from "../../../lib/appContext";
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import questionModel from "../../../model/questions.model";
import courseModel from "../../../model/course.model";
import assignmentModel from "../../../model/assignment.model";
function Page() {
  const layoutValues = useContext(AppContext);
  { layoutValues.setPageHeading("Quizzes") }
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "id";
  QueryParam.order_in = router.query?.order_in || "asc";
  //const { data: assignment, mutate: loadassignment, error, isLoading } = useSWR(QueryParam?"assignmentList":null, async () => await questionModel.list({ course_id: router?.query?.id }), config.swrConfig);
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();
  const [formErrors, setFormErrors] = useState([]);
  const watchAllFields = watch();
  //console.log(watch());
  const [questions, setQuestions] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [submitButton, setSubmitButton] = useState("");
  const [courseId, setCourseId] = useState(router?.id);
  const [checkedInput, setCheckedInput] = useState([]);
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  useEffect(() => {
    /* const subscription = watch((data) => {
      if (data.questions !== undefined) {
        setQuestions(data.questions);
      }
    });
    return () => subscription.unsubscribe(); */
  }, [watch]);

  useEffect(() => {
    //console.log("id = ", router?.query?.id);
    if (router?.query?.id !== undefined) {
      console.log("in");
      courseModel.detail(router?.query?.id).then((res) => {
        console.log("course Name = ", res.data);
        setCourseName(res?.data?.course_name);
      }).catch((error) => {
        console.log(error);
      });
      setCourseId(router?.query?.id)
      questionModel.traineelist({ course_id: router?.query?.id, order_by: "sequence_no", order_in: "asc" }).then(async (res) => {
        if (res.data.length > 0) {
          setQuestions(res.data);
          //console.log("course Name = ",res.data?.[0]?.course?.course_name);
          const formDataget = new FormData();
          formDataget.append("course_id", router?.query?.id);
          await assignmentModel.getSubmitted(formDataget).then((submittedRes) => {
            //console.log(submittedRes.data);
            if (submittedRes?.data?.is_attempted === true) {

              if (submittedRes?.data?.attemptData?.question_attempted) {
                submittedRes?.data?.attemptData?.question_attempted.map((attempQuestion) => {
                  if (attempQuestion.answer) {
                    //console.log(attempQuestion.answer);
                    //checkedInput.push(attempQuestion.answer);
                    //setCheckedInput([...checkedInput, attempQuestion.answer]);
                    setCheckedInput(setCheckedInput => [...setCheckedInput, attempQuestion.answer]);
                  }
                });
              }
            }
          });
          reset(res.data);
        }
        //console.log(res.data)
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [router]);

  const onSubmit = async e => {
    e.preventDefault();
    console.clear();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const formData = new FormData(e.target);
    formData.append("status", submitButton);
    await assignmentModel.create(formData).then((res) => {
      console.log(res.data);
      if (submitButton == "drafted") {
        helper.sweetalert.toast("Assignment saved to draft");
      } else {
        setShowSubmitButton(false);
        document.getElementById('quizTextHead').classList.add("d-none");
        document.getElementById('resultDiv').classList.remove("d-none");
        if (res.data) {

          document.getElementById("gotPercent").innerHTML = res.data?.answerPercent + "%";
          if (res.data?.answerPercent >= 80) {
            document.getElementById('gotPercent').classList.remove("text-danger");
            document.getElementById('gotPercent').classList.add("text-success");
          } else {
            document.getElementById('failH4').classList.remove("d-none");
            document.getElementById('passPercent').classList.remove("d-none");
          }
        }
        if (res.data?.incorrectQues) {
          res.data.incorrectQues.map((item) => {
            var wrong = document.getElementsByClassName(item + "-questionAlloption");
            for (var i = 0; i < wrong.length; i++) {
              if (wrong.item(i).checked) {
                let curDataId = wrong.item(i).getAttribute("data-id");
                document.getElementById(curDataId + "-div").classList.add("wrong");
              }
            }
          });
        }
        if (res.data?.correctQues) {
          res.data.correctQues.map((item) => {
            var correct = document.getElementsByClassName(item + "-questionAlloption");
            for (var i = 0; i < correct.length; i++) {
              if (correct.item(i).checked) {
                let curDataId = correct.item(i).getAttribute("data-id");
                document.getElementById(curDataId + "-div").classList.add("correct");
              }
            }
          });
        }
        helper.sweetalert.toast("Assignment Submitted");
      }
      //router.push("/dashboard");
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })

  };

  const assignSubmitButton = function (btnStatus) {
    setSubmitButton(btnStatus);
  }
  var optionType = "radio";
  var isChecked = '';
  return (
    <>
      <form onSubmit={onSubmit}>
        {/* <form> */}
        <input type="hidden" {...register(`course_id`)} value={courseId} />
        <div className="header-breadcrumb" style={{ '--bs-breadcrumb-divider': '>' }} aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: '#F5F6F8', padding: '.75rem 1rem' }}>
            <li className="breadcrumb-item"><Link href="/dashboard">Home</Link></li>
            <li className="breadcrumb-item"><Link href="/courses">Courses</Link></li>
            <li className="breadcrumb-item"><Link href="#">{courseName}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Quizzes</li>
          </ol>
        </div>

        <div className="content-header" style={{ marginTop: 'unset', marginLeft: 'unset', marginBottom: 'unset' }}>
          <h4 id='quizTextHead'>To Boost Your Understanding</h4>
          <div className='d-none' id="resultDiv">
            <h4 id='failH4' className='d-none'><img src="/trainee-images/trainee-quiz-images/carbon_warning-filled.png"
              alt="warning symbol" class="icon" /> Try again once you are ready</h4>
            <div class="header-content">
              <h6>Your Received <span class="text-danger pr-2" id='gotPercent'>70%</span> <span className='d-none' id='passPercent'>To Pass <span
                style={{ color: "#007CC2" }}>80% or Above</span></span>
              </h6>
              <a class="try-again" href={`/courses/${courseId}/quizzes`}>
                <button type="button" class="try-again-btn">Try Again</button>
              </a>
            </div>
          </div>
        </div>
        <div className="trainee-body">
          <div className="trainee-list d-flex flex-column" style={{ margin: '0rem 3rem -2.5rem 3rem', padding: 'unset', height: 'unset' }}>
            <div className="box-container-1">
              <div className="box-1"></div>
              <div className="box-2"></div>

              <div className="trainee-tag">
                <p style={{ zIndex: '1' }}>Quizzes</p>
              </div>
            </div>

            <div className="quiz-heading">
              <h5>Questions</h5>
            </div>

            <div className="quiz-container">
              {questions?.map((item, index) => {
                if (item.question_type == "single") {
                  optionType = "radio";
                } else {
                  optionType = "checkbox";
                }
                return (
                  <div className="question-1">
                    <div className="question">
                      <span>{index + 1}. {item.question}</span>
                      <input type="hidden" {...register(`questions[${index}][question]`)} defaultValue={item.id} />
                      <div className="points">1 point</div>
                    </div>
                    <div className="question-options" id="group1">
                      {item?.options?.map((optionitem, optionindex) => {
                        isChecked = '';
                        if (checkedInput.length > 0) {
                          const isFound = checkedInput.some(element => {
                            if (element == optionitem.id) {
                              isChecked = 'checked';
                            }
                          });
                          //console.log(isFound);
                        }
                        return (
                          <div className="d-flex justify-content-between option" id={`${item.id}-option-${optionindex}-div`}>
                            <div>
                              {
                                (() => {
                                  if (isChecked == "checked") {
                                    return (
                                      <><input type={optionType} className={`${item.id}-questionAlloption`}
                                        id={`${item.id}-option`} data-id={`${item.id}-option-${optionindex}`}
                                        {...register(`questions[${index}][answer]`)} value={optionitem.id} checked /></>
                                    );
                                  } else {
                                    return (
                                      <><input type={optionType} className={`${item.id}-questionAlloption`}
                                        id={`${item.id}-option`} data-id={`${item.id}-option-${optionindex}`}
                                        {...register(`questions[${index}][answer]`)} value={optionitem.id} /></>
                                    );
                                  }
                                })()
                              }
                              <label htmlFor={`${index}-option-${optionindex}`} style={{ paddingLeft: '5px' }}> {String.fromCharCode(('A').charCodeAt(0) + optionindex)}. {optionitem?.option}</label><br />
                            </div>
                            <img className="wrong-icon"
                              src="/trainee-images/trainee-quiz-images/akar-icons_circle-x.png"
                              alt="wrong" />

                            <img className="correct-icon"
                              src="/trainee-images/trainee-quiz-images/akar-icons_circle-x (1).png"
                              alt="correct" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {showSubmitButton &&
              <>
                <div className="alert-box">
                  <input className="checkbox-box" type="checkbox" required id="checkmark" />
                  <label for="checkmark"><span>Make sure that all the answers are marked</span></label>
                </div>
                <div className="button-container d-flex">
                  <button type="submit" className="submit-btn"
                    style={{ backgroundColor: "#008bd6" }} name="submitbtn1" onClick={() => assignSubmitButton("submitted")}>Submit</button>
                  <button type="submit" className="draft-btn" name="submitbtn2" onClick={() => assignSubmitButton("drafted")}>Save Draft</button>
                </div>
              </>
            }
          </div>

        </div>
      </form>
    </>
  );
}

export default Page;

