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
import Image from "next/image";
import AssessmentOptions from '../../../components/AssessmentOptions';
function Page() {
  const layoutValues = useContext(AppContext);
  { layoutValues.setPageHeading("Course Assessment") }
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "id";
  QueryParam.order_in = router.query?.order_in || "asc";
  const [assignment, setAssignment] = useState([]);
  //const { data: assignment, mutate: loadassignment, error, isLoading } = useSWR(QueryParam?"assignmentList":null, async () => await questionModel.list({ course_id: router?.query?.id }), config.swrConfig);
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();
  const [formErrors, setFormErrors] = useState([]);
  const watchAllFields = watch();
  //// console.log(watch());
  const initialQuestion = {
    id: "",
    course_id: QueryParam?.id,
    question: "",
    sequence_no: "",
    question_type: "multiple",
    options: [
      // {
      //   id: "",
      //   question_id: "",
      //   option: "",
      //   is_answer: "no"
      // },
      // {
      //   id: "",
      //   question_id: "",
      //   option: "",
      //   is_answer: "no"
      // },
      // {
      //   id: "",
      //   question_id: "",
      //   option: "",
      //   is_answer: "no"
      // },
      // {
      //   id: "",
      //   question_id: "",
      //   option: "",
      //   is_answer: "no"
      // }
    ]
  };
  //console.clear();
  const [questions, setQuestions] = useState([initialQuestion]);
  const [courseId, setCourseId] = useState(router?.id);
  const [questionUpdated, setQuestionUpdated] = useState(0);
  const [inputType , setInputType] = useState('checkbox');
  const addQuestion = function () {
    setQuestions([...questions, initialQuestion]);
  }

  const deleteQuestion = async function (index,id) {
    //// console.log("delete = ", index);
    if(id != "" && id != undefined)
    {
      await questionModel.delete(id)

    }
    questions.splice(index, 1);
    reset();
    //// console.log("questions :", questions);
  }

  useEffect(() => {
    const subscription = watch((data) => {
      //// console.log(data.questions);
      if (data.questions !== undefined) {
        setQuestions(data.questions);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (router?.query?.id !== undefined) {
      setCourseId(router?.query?.id)
      questionModel.list({ course_id: router?.query?.id, order_by: "sequence_no", order_in: "asc" }).then((res) => {
        if (res.data.length > 0) {
          setQuestions(res.data);
          reset(res.data);
        }
        //// console.log(res.data)
      }).catch((error) => {
        // console.log(error);
      });
    }
  }, [router, questionUpdated]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    console.clear();
    const formData = new FormData(event.target);
    //// console.log('data',data.questions);
    await questionModel.create(formData).then((res) => {
      //// console.log(res)
      helper.sweetalert.toast("Assessment Added");
      window.location.reload()
      setIsButtonDisabled(false);
      //setQuestionUpdated(Math.random());
      //router.push("/courses/"+router?.query?.id);

    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
      setIsButtonDisabled(false);
    })

  });

  const handleTypeChange = (async (e,index) => {
    let type = e.target.value;
    let questionId = e.target.id;
    // let inputType = "checkbox";
    if (type == "single") {
      // inputType = "radio";
      setInputType('radio')
      questions[index].question_type = 'single'
    }
    else
    {
      setInputType('checkbox')
      questions[index].question_type = 'multiple'
    }

    setQuestions(questions);
    // let tempAr = questions;
    // tempAr[questionId]["question_type"] = type;
    // for (let i = 0; i < 4; i++) {
    //   let curId = "answer" + questionId + "-" + i;
    //   document.getElementById(curId).type = inputType;
    //   if(inputType == "radio") {
    //     document.getElementById(curId).checked = false;
    //     //// console.log("questionId = "+questionId,tempAr[questionId]["options"]);
    //     tempAr[questionId]["options"][i]["is_answer"] = false;
    //   }
    // }
    // reset(tempAr);
    // setQuestions(tempAr);
  });

  const handleAnswerChange = (async (e) => {
    let type = e.target.type;
    if (type == "radio") {
      let isChecked = e.target.checked;
      if (isChecked) {
        let qid = e.target.attributes["data-qid"].nodeValue;
        let aqsid = e.target.attributes["data-ansid"].nodeValue;
        //// console.log("aqsid", aqsid);
        let tempAr = questions;
        for (let i = 0; i < 4; i++) {
          let curId = "answer" + qid + "-" + i;
          tempAr[qid]["options"][i]["is_answer"] = true;
          //// console.log(curId)
          if (i != aqsid) {
            // console.log("false = ",curId)
            document.getElementById(curId).checked = false;
            tempAr[qid]["options"][i]["is_answer"] = false;
          }
        }
        reset(tempAr);
        setQuestions(tempAr);
      }
    }
  });

  const removeOption = (questionIndex,optionIndex) =>{
    console.log('clicked');
       const updatedQuestions =  questions.map((question,index) => {
              if(index == questionIndex)
              {
                let filteredOption = question.options.filter((option,index)=>index != optionIndex);
                // console.log(filteredOption);
                return {...question,options:filteredOption} 
              }

            return question;
        })

        setQuestions(updatedQuestions);
        // console.log(updatedQuestions);
  }



  return (
    <>
      <div className="trainer-body">
        <div className="trainer-list d-flex flex-column" style={{ height: 'fit-content' }}>
          <form onSubmit={onSubmit}>
            <div className="box-1" style={{ width: '180px' }}></div>
            <div className="box-2" style={{ left: '150px' }}></div>

            <div className="trainer-tag">
              <p style={{ zIndex: '1' }}>Assessment</p>
            </div>
            <div className="exercise-module" style={{ paddingTop: '2rem' }}>
              <div className="module-heading">
                <p>Module Exercise</p>
              </div>

              <div className="wrapper-exercise d-flex flex-column gap-3">
                {questions?.map((item, index) => {
                  //// console.log("question - ", item);
                  // let input_type = "checkbox";
                  // if (item?.question_type == "single") {
                  //   input_type = "radio";
                  // }
                  return (
                    <>
                      <section key={`question${index}`}>
                        <div className="exercise-question-1">
                          <div className="draggable-area">
                            {(questions.length > 1) &&
                              <>
                                <img src="/trainer-images/edit-module/Vector (Stroke).png"
                                  className="drag-icon" alt="" />
                                <button type="button" className="delete-icon" onClick={() => deleteQuestion(index,item.id)}><img className="delete"
                                  src="/trainer-images/edit-module/Vector delete black.png"
                                  alt="" /></button>
                              </>
                            }
                          </div>

                          <span className="content-title">Question {index + 1} -</span>
                          <input type="hidden" {...register(`questions[${index}][id]`)} defaultValue={item.id} />
                          <input type="hidden" {...register(`questions[${index}][course_id]`)} defaultValue={courseId} />
                          <input type="hidden" {...register(`questions[${index}][sequence_no]`)} defaultValue={index + 1} />
                          <div className="input-container d-flex flex-column gap-4">
                            <textarea {...register(`questions[${index}][question]`)} defaultValue={item?.question} required className="content-paragraph" cols="45" rows="0"
                              placeholder="Lorem ipstum dolor sit amet, consectetur aaipiscing eint. Integer mattis purus eu semper l0Dortis lacus, tristique et er. Eu ductor rusceodio enim morbi turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis purus eu semper lobortis lacus, tristique eteros. Eu auctor fusce ultrices viverra arcu purus viverra vitae, aliquet. Sollicitudin ipsum mi condimentum orci tincidunt pretiumel. Magna ultrices odio enim morbi turpis.es"></textarea>

                            <div className="checkbox-options d-flex flex-column gap-3" style={{ width: '100%' }}>
                              {/* {item?.options?.map((optionitem, optionindex) => {

                                return (
                                  <div className="option-1 d-flex justify-content-between" key={`q${index}o${optionindex}`}>
                                    <label htmlFor="vehicle1">Option {optionindex + 1} -</label>
                                    <div className="input-container">
                                      <input className="input-box" type="text" {...register(`questions[${index}][options][${optionindex}][option]`)} required defaultValue={optionitem?.option}
                                        placeholder="Add the content here" />
                                      <input type="hidden" {...register(`questions[${index}][options][${optionindex}][id]`)} defaultValue={optionitem?.id}
                                        placeholder="Add the content here" />
                                    </div>

                                    {
                                      (() => {
                                        if (optionitem?.is_answer == "true" || optionitem?.is_answer === true) {
                                          return (
                                            <><input type={input_type} onClick={handleAnswerChange} data-qid={index} data-ansid={optionindex} id={`answer${index}-${optionindex}`} {...register(`questions[${index}][options][${optionindex}][is_answer]`)}
                                              defaultValue={optionitem?.is_answer} checked /></>
                                          );
                                        } else {
                                          return (
                                            <><input type={input_type} onClick={handleAnswerChange} data-qid={index} data-ansid={optionindex} id={`answer${index}-${optionindex}`} {...register(`questions[${index}][options][${optionindex}][is_answer]`)}
                                              defaultValue={optionitem?.is_answer} /></>
                                          );
                                        }
                                      })()
                                    }


                                    {
                                      item?.options.length > 1 ? <span className="text-dark" onClick={()=>removeOption(index,optionindex)}>Remove</span> : ''
                                    }
                                  </div>
                                );
                              })} */}


                              <AssessmentOptions position={index} item={item} inputType={inputType} handleAnswerChange={handleAnswerChange} setInputType={setInputType}/>
                            </div>
                          </div>

                          <span className="drop-box-question">Type of Question -</span>

                          <div className={`category ${item?.question_type}`} >
                            <select {...register(`questions[${index}][question_type]`)} id={index} onChange={(e)=>handleTypeChange(e,index)} defaultValue={item.question_type}>
                              {
                                (() => {
                                  if (item?.question_type == 'multiple') {
                                    return (
                                      <>
                                        <option value="multiple" selected>Multiple Options Correct</option>
                                        <option value="single">Single Option Correct</option>
                                      </>
                                    );
                                  } else {
                                    return (
                                      <>
                                        <option value="multiple">Multiple Options Correct</option>
                                        <option value="single" selected>Single Option Correct</option>
                                      </>
                                    );
                                  }
                                })()
                              }
                              {/* <option value="multiple">Multiple Options Correct</option>
                              <option value="single">Single Option Correct</option> */}
                            </select>
                          </div>
                        </div>
                      </section>
                    </>
                  );
                })}


                {/* <div className="exercise-question-2">
                  <div className="draggable-area">
                    <img src="/trainer-images/edit-module/Vector (Stroke).png"
                      className="drag-icon" alt="" />
                    <button type="button" className="delete-icon"><img className="delete"
                      src="/trainer-images/edit-module/Vector delete black.png"
                      alt="" /></button>
                  </div>

                  <span className="content-title">Question 2 -</span>

                  <div className="input-container d-flex flex-column gap-4">
                    <textarea name="paragraph 1" className="content-paragraph" cols="45" rows="0"
                      placeholder="Lorem ipstum dolor sit amet, consectetur aaipiscing eint. Integer mattis purus eu semper l0Dortis lacus, tristique et er. Eu ductor rusceodio enim morbi turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis purus eu semper lobortis lacus, tristique eteros. Eu auctor fusce ultrices viverra arcu purus viverra vitae, aliquet. Sollicitudin ipsum mi condimentum orci tincidunt pretiumel. Magna ultrices odio enim morbi turpis.es"></textarea>

                    <div className="checkbox-options d-flex flex-column gap-3">
                      <div className="option-1 d-flex justify-content-between">
                        <label for="huey">Option 1 -</label>

                        <div className="input-container">
                          <input className="input-box" type="text"
                            placeholder="Add the content here" />
                        </div>

                        <input type="radio" id="huey" name="drone" value="huey" checked />
                      </div>


                      <div className="option-2 d-flex justify-content-between">
                        <label for="dewey">Option 2 -</label>

                        <div className="input-container">
                          <input className="input-box" type="text"
                            placeholder="Add the content here" />
                        </div>

                        <input type="radio" id="dewey" name="drone" value="dewey" />
                      </div>


                      <div className="option-3 d-flex justify-content-between">
                        <label for="louie">Option 3 -</label>

                        <div className="input-container">
                          <input className="input-box" type="text"
                            placeholder="Add the content here" />
                        </div>

                        <input type="radio" id="louie" name="drone" value="louie" />
                      </div>


                      <div className="option-4 d-flex justify-content-between">
                        <label for="louie">Option 4 -</label>

                        <div className="input-container">
                          <input className="input-box" type="text"
                            placeholder="Add the content here" />
                        </div>

                        <input type="radio" id="louie" name="drone" value="louie" />
                      </div>
                    </div>
                  </div>

                  <span className="drop-box-question">Type of Question -</span>

                  <div className="category">
                    <select name="category" id="cars">
                      <option value="Product">Multiple Options Correct</option>
                      <option value="Blanket">Single Option Correct</option>
                    </select>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="add-module d-flex gap-3">
              <div className="add-btn">
                <button type="button" className="btn btn-light" onClick={addQuestion}>
                  <img src="/trainer-images/edit-module/+.png" alt="" />
                </button>
              </div>
              <hr className="line" />
            </div>

            <div className="footer-btn-container d-flex justify-content-end gap-4">

              <div className="back-btn" style={{ padding: 'unset' }}>
                <Link href={`/courses/${QueryParam?.id}/edit`} type="button" className="btn btn-light"
                  style={{ backgroundColor: "#efefef" }}>Back</Link>
              </div>

              <div className="Save-btn">
                <button type="submit" className="btn btn-primary"
                  style={{ backgroundColor: "#008bd6" }} disabled={isButtonDisabled}>Save</button>

              </div>

            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default Page;

