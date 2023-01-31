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
      questionModel.traineelist({ course_id: router?.query?.id, order_by: "sequence_no", order_in: "asc" }).then((res) => {
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
    //console.log(event.target);
    const formData = new FormData(event.target);
    //console.log('data',data.questions);
    await assignmentModel.create(formData).then((res) => {
      console.log(res)
      helper.sweetalert.toast("Assignment Submitted");
      //router.push("/dashboard");
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })

  });
  var optionType = "radio";
  return (
    <>
      <form onSubmit={onSubmit}>
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
                      <input type="hidden" {...register(`questions[${index}][question]`)} defaultValue={item.id} />
                      <div className="points">1 point</div>
                    </div>
                    <div className="question-options" id="group1">
                      {item?.options?.map((optionitem, optionindex) => {
                        return (
                          <div className="d-flex option">
                            <input type={optionType} id={`${index}-option-${optionindex}`} {...register(`questions[${index}][answer]`)} value={optionitem.id} />
                            <label htmlFor={`${index}-option-${optionindex}`}>{String.fromCharCode(('A').charCodeAt(0) + optionindex)}. {optionitem?.option}</label><br />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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
              <button type="submit" className="draft-btn">Save Draft</button>
            </div>
          </div>

        </div>
      </form>
    </>
  );
}

export default Page;

