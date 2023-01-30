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
  const [courseId, setCourseId] = useState(router?.id);

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
        console.log("course Name = ",res.data);
        setCourseName(res?.data?.course_name);
      }).catch((error) => {
        console.log(error);
      });
      setCourseId(router?.query?.id)
      questionModel.list({ course_id: router?.query?.id, order_by: "sequence_no", order_in: "asc" }).then((res) => {
        if (res.data.length > 0) {
          setQuestions(res.data);
          //console.log("course Name = ",res.data?.[0]?.course?.course_name);
          reset(res.data);
        }
        //console.log(res.data)
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [router]);

  const onSubmit = handleSubmit(async (data) => {
    event.preventDefault();
    console.clear();
    const formData = new FormData(event.target);
    //console.log('data',data.questions);
    await questionModel.create(formData).then((res) => {
      //console.log(res)
      helper.sweetalert.toast("Assignment Added");
      //router.push("/dashboard");
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })

  });
  var optionType = "radio";
  return (
    <>
      <form>
        <div className="header-breadcrumb" style={{ '--bs-breadcrumb-divider': '>' }} aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: '#F5F6F8', padding: '.75rem 1rem' }}>
            <li className="breadcrumb-item"><Link href="/dashboard">Home</Link></li>
            <li className="breadcrumb-item"><Link href="/courses">Courses</Link></li>
            <li className="breadcrumb-item"><Link href="#">{courseName}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Quizzes</li>
          </ol>
        </div>

        <div className="content-header" style={{ marginTop: 'unset', marginLeft: 'unset', marginBottom: 'unset' }}>
          <h4>To Boost Your Understanding</h4>
        </div>
        <div className="trainee-body">
          <div className="trainee-list d-flex flex-column" style={{ margin: '0rem 3rem -2.5rem 3rem', padding: 'unset', height: 'unset' }}>
            <div className="box-container-1">
              <div className="box-1"></div>
              <div className="box-2"></div>

              <div className="trainee-tag">
                <p style={{zIndex:'1'}}>Quizzes</p>
              </div>
            </div>

            <div className="quiz-heading">
              <h5>Questions</h5>
            </div>

            <div className="quiz-container">
              {questions?.map((item, index) => {
                if(item.question_type == "single") {
                  optionType = "radio";
                } else {
                  optionType = "checkbox";
                }
                return (
                  <div className="question-1">
                    <div className="question">
                      <span>{index + 1}. {item.question}</span>

                      <div className="points">1 point</div>
                    </div>
                    <div className="question-options" id="group1">
                      {item?.options?.map((optionitem, optionindex) => {
                        return (
                          <div className="d-flex option">
                            <input type={optionType} id={`${index}-option-${optionindex}`} {...register(`questions[${index}][answer]`)} />
                            <label htmlFor={`${index}-option-${optionindex}`}>{String.fromCharCode(('A').charCodeAt(0) + optionindex)}. {optionitem?.option}</label><br />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {/* <div className="question-2">
                <div className="question">
                  <span>2. The record used to detect electrical changes in the heart muscle as the
                    heart is beating is called a</span>

                  <div className="points">1 point</div>
                </div>
                <div className="question-options" id="group2">
                  <div className="d-flex option">
                    <input type="radio" id="2-option-1" name="group2" />
                    <label for="2-option-1">A. Echocardiogram</label><br />
                  </div>
                  <div className="d-flex option">
                    <input type="radio" id="2-option-2" name="group2" />
                    <label for="2-option-2">B. Electrocardiogram</label><br />
                  </div>
                  <div className="d-flex option">
                    <input type="radio" id="2-option-3" name="group2" />
                    <label for="2-option-3">C. Electroencephalogram</label><br />
                  </div>
                  <div className="d-flex option">
                    <input type="radio" id="2-option-4" name="group2" />
                    <label for="2-option-4">D. Sphygmomanometer</label>
                  </div>
                </div>
              </div>

              <div className="question-3">
                <div className="question">
                  <span>3. A patient comes in with trouble breating,
                    and sweling in the lower legs. The provider suspects</span>

                  <div className="points">1 point</div>
                </div>
                <div className="question-options" id="group3">
                  <div className="d-flex option">
                    <input type="radio" id="3-option-1" name="group3" />
                    <label for="3-option-1">A. Congestive heart failure</label><br />
                  </div>
                  <div className="d-flex option">
                    <input type="radio" id="3-option-2" name="group3" />
                    <label for="3-option-2">B. A heart murmur</label><br />
                  </div>
                  <div className="d-flex option">
                    <input type="radio" id="3-option-3" name="group3" />
                    <label for="3-option-3">C. Myocardial infarction</label><br />
                  </div>
                  <div className="d-flex option">
                    <input type="radio" id="3-option-4" name="group3" />
                    <label for="3-option-4">D. Aneurysm</label>
                  </div>
                </div>
              </div>

              <div className="question-4">
                <div className="question">
                  <span>4. Which of the following risk factors for cardiac disease can be
                    modified?</span>

                  <div className="points">1 point</div>
                </div>
                <div className="question-options" id="group4">
                  <div className="d-flex option">
                    <input type="radio" id="4-option-1" name="group4" />
                    <label for="4-option-1">A. Age</label><br />
                  </div>
                  <div className="d-flex option">
                    <input type="radio" id="4-option-2" name="group4" />
                    <label for="4-option-2">B. Diabetes mellitus</label><br />
                  </div>
                  <div className="d-flex option">
                    <input type="radio" id="4-option-3" name="group4" />
                    <label for="4-option-3">C. Family history</label><br />
                  </div>
                  <div className="d-flex option">
                    <input type="radio" id="4-option-4" name="group4" />
                    <label for="4-option-4">D. Gender</label>
                  </div>
                </div>
              </div>

              <div className="question-5">
                <div className="question">
                  <span>5. Which of the following risk factors for cardiac disease can be
                    modified?</span>

                  <div className="points">1 point</div>
                </div>
                <div className="question-options" id="group5">
                  <div className="d-flex option">
                    <input type="radio" id="5-option-1" name="group5" />
                    <label for="5-option-1">A. Age</label><br />
                  </div>
                  <div className="d-flex option">
                    <input type="radio" id="5-option-2" name="group5" />
                    <label for="5-option-2">B. Diabetes mellitus</label><br />
                  </div>
                  <div className="d-flex option">
                    <input type="radio" id="5-option-3" name="group5" />
                    <label for="5-option-3">C. Family history</label><br />
                  </div>
                  <div className="d-flex option">
                    <input type="radio" id="5-option-4" name="group5" />
                    <label for="5-option-4">D. Gender</label>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="alert-box">
              <input className="checkbox-box" type="checkbox" required id="checkmark" />
              <label for="checkmark"><span>Make sure that all the answers are marked</span></label>
            </div>

            <div className="button-container d-flex">
              <a href="#">
                <button type="button" className="submit-btn"
                  style={{ backgroundColor: "#008bd6" }}>Submit</button>
              </a>
              <button type="button" className="draft-btn">Save Draft</button>
            </div>
          </div>

        </div>
      </form>
    </>
  );
}

export default Page;

