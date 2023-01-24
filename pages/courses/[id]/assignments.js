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
function Page() {
  const layoutValues = useContext(AppContext);
  { layoutValues.setPageHeading("Course Assignment") }
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "id";
  QueryParam.order_in = router.query?.order_in || "asc";
  const { data: assignment, mutate: assignmentList, error, isLoading } = useSWR("assignmentList", async () => await questionModel.list({ course_id: router?.query?.id }), config.swrConfig);
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue  } = useForm();
  const [formErrors, setFormErrors] = useState([]);
  const watchAllFields = watch();
  //console.log(watch());
  const initialQuestion = {
    id: "",
    course_id: QueryParam?.id,
    question: "",
    sequence_no: "",
    question_type: "multiple",
    options: [
      {
        id: "",
        question_id: "",
        option: "",
        is_answer: "no"
      },
      {
        id: "",
        question_id: "",
        option: "",
        is_answer: "no"
      },
      {
        id: "",
        question_id: "",
        option: "",
        is_answer: "no"
      },
      {
        id: "",
        question_id: "",
        option: "",
        is_answer: "no"
      }
    ]
  };
  //console.clear();
  const [questions, setQuestions] = useState([initialQuestion]);
  const [courseId, setCourseId] = useState(QueryParam?.id);
  const addQuestion = function () {
    setQuestions([...questions, initialQuestion]);
  }

  const deleteQuestion = function (index) {
    //console.log("delete = ", index);
    questions.splice(index, 1);
    reset();
    //console.log("questions :", questions);
  }

  useEffect(() => {
    const subscription = watch((data) => {
      //console.log(data.questions);
      if(data.questions !== undefined) {
        setQuestions(data.questions);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setCourseId(QueryParam?.id);
    assignmentList();
    //console.log("assignmnets ", assignment?.data);
    if(assignment?.data !== undefined) {
      setQuestions(assignment?.data);
      reset(assignment?.data);
    }
  }, [router]);

  const onSubmit = handleSubmit(async (data) => {
    event.preventDefault();
    console.clear();
    const formData = new FormData(event.target);
    console.log('data',data.questions);
    await questionModel.create(formData).then((res) => {
      console.log(res)
      //helper.sweetalert.toast("Content Created");
      //router.push("/dashboard");
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })

  });
  return (
    <>
      <div className="trainer-body">
        <div className="trainer-list d-flex flex-column" style={{ height: 'fit-content' }}>
          <form onSubmit={onSubmit}>
            <div className="box-1" style={{ width: '180px' }}></div>
            <div className="box-2" style={{ left: '150px' }}></div>

            <div className="trainer-tag">
              <p style={{ zIndex: '1' }}>Assignments</p>
            </div>
            <div className="exercise-module" style={{ paddingTop: '2rem' }}>
              <div className="module-heading">
                <p>Module Exercise</p>
              </div>

              <div className="wrapper-exercise d-flex flex-column gap-3">
                {questions?.map((item, index) => {
                  console.log("question - ", item?.question_type)
                  return (
                    <>
                      <section key={`question${index}`}>
                        <div className="exercise-question-1">
                          <div className="draggable-area">
                            {(questions.length > 1) &&
                              <>
                                <img src="/trainer-images/edit-module/Vector (Stroke).png"
                                  className="drag-icon" alt="" />
                                <button type="button" className="delete-icon" onClick={() => deleteQuestion(index)}><img className="delete"
                                  src="/trainer-images/edit-module/Vector delete black.png"
                                  alt="" /></button>
                              </>
                            }
                          </div>

                          <span className="content-title">Question {index + 1} -</span>
                          <input type="hidden" {...register(`questions[${index}][course_id]`)} defaultValue={courseId} />
                          <input type="hidden" {...register(`questions[${index}][sequence_no]`)} defaultValue={index+1} />
                          <div className="input-container d-flex flex-column gap-4">
                            <textarea {...register(`questions[${index}][question]`)} defaultValue={item?.question} required className="content-paragraph" cols="45" rows="0"
                              placeholder="Lorem ipstum dolor sit amet, consectetur aaipiscing eint. Integer mattis purus eu semper l0Dortis lacus, tristique et er. Eu ductor rusceodio enim morbi turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis purus eu semper lobortis lacus, tristique eteros. Eu auctor fusce ultrices viverra arcu purus viverra vitae, aliquet. Sollicitudin ipsum mi condimentum orci tincidunt pretiumel. Magna ultrices odio enim morbi turpis.es"></textarea>

                            <div className="checkbox-options d-flex flex-column gap-3" style={{ width: '100%' }}>
                              {item?.options?.map((optionitem, optionindex) => {
                                return (
                                  <div className="option-1 d-flex justify-content-between" key={`q${index}o${optionindex}`}>
                                    <label htmlFor="vehicle1">Option {optionindex + 1} -</label>
                                    <div className="input-container">
                                      <input className="input-box" type="text" {...register(`questions[${index}][options][${optionindex}][option]`)} required defaultValue={optionitem?.option}
                                        placeholder="Add the content here" />
                                    </div>
                                    {
                                      (() => {
                                          if(optionitem?.is_answer == "true" || optionitem?.is_answer === true) {
                                            return (
                                              <><input type="checkbox" {...register(`questions[${index}][options][${optionindex}][is_answer]`)} 
                                              defaultValue={optionitem?.is_answer} checked /></>
                                            );
                                          } else {
                                            return (
                                              <><input type="checkbox" {...register(`questions[${index}][options][${optionindex}][is_answer]`)} 
                                              defaultValue={optionitem?.is_answer} /></>
                                            );
                                          }
                                      })()  
                                    }
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <span className="drop-box-question">Type of Question -</span>

                          <div className={`category ${item?.question_type}`} >
                            <select {...register(`questions[${index}][question_type]`)} defaultValue={item?.question_type}>
                              <option value="multiple">Multiple Options Correct</option>
                              <option value="single">Single Option Correct</option>
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
                  style={{ backgroundColor: "#008bd6" }}>Save</button>

              </div>

            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default Page;

