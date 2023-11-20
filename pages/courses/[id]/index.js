import { useState, useEffect, useRef, useContext } from "react";
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import courseModel from "../../../model/course.model";
import ModuleCard from "../../components/moduleCard";
import ModuleDetailCard from "../../components/moduleDetailCard"
import assignmentModel from "../../../model/assignment.model";
import CourseViewModel from "../../../model/cource_view.model"
import { useRouter } from "next/router";
import moment from 'moment';
import Link from "next/link";
import AppContext from "../../../lib/appContext";
const Page = () => {
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "sequence_no";
  QueryParam.order_in = router.query?.order_in || "asc";
  const layoutValues = useContext(AppContext);
  { layoutValues.setPageHeading("Course Modules") }
  const [per_module_hour, setper_module_hour] = useState("0hrs 0mins");
  const [perModuleMin, setPerModuleMin] = useState(0);
  const [moduleCount, setModuleCount] = useState(0);
  const [showAssignmentButton, setShowAssignmentButton] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [coursePercent, setCoursePercent] = useState(0);
  const [profile, setprofile] = useState(layoutValues.profile)
  
  const [modules, setModules] = useState([]);
  const [courseData, setCourseData] = useState([]);

  const [lastChapterViewData, setLastChapterViewData] = useState(0);
  const [assignmentSubmitCount, setassignmentSubmitCount] = useState(0);

  const [moduleLeft, setModuleLeft] = useState(0);
  
  const moduleList = function () {
    if(router?.query?.id !== undefined) {
      courseModel.modules(QueryParam?.id, QueryParam).then((res) => {
        setModules(res);
      }).catch((error) => {
        // console.log(error);
      });
    }
  }

  const couresDetail = function () {
    if(router?.query?.id !== undefined) {
      courseModel.detail(router?.query?.id).then((res) => {
        setCourseData(res);
      }).catch((error) => {
        // console.log(error);
      });
    }
  }

  useEffect(() => {
    moduleList();
    couresDetail();
  }, [router])
  
  useEffect(() => {
    if (courseData?.data) {
      setModuleCount(courseData?.data?.total_modules);
      var total_training_hour = courseData?.data?.total_training_hour;
      let totalminutes = total_training_hour * 60;
      var Hours = Math.floor(totalminutes / 60);
      var minutes = totalminutes % 60;
      var hourOut = Hours + "hrs " + minutes + "mins left";
      //setTimeLeft(hourOut);
    }
    
    if (router?.query?.id !== undefined) {
      const countAttemptForm = new FormData();
      countAttemptForm.append("course_id", router?.query?.id);
      assignmentModel.countAttempt(countAttemptForm).then((submittedRes) => {
        //console.clear();
        //// console.log("attempt result",submittedRes?.data);
        setassignmentSubmitCount(submittedRes?.data?.assignmentAttempt)
        if (submittedRes?.data?.assignmentAttempt < process.env.NEXT_PUBLIC_MAXIMUM_ASSIGNMENT_ATTEMPT_LIMIT) {
          setShowAssignmentButton(true);
        }
      });
      
      CourseViewModel.getAnyCourseChapterViewed(countAttemptForm).then((res) => {
        let maxAttempt = 0;
        /* console.clear();
        // console.log("view data => ", res?.data); */
        let allmoduleLeft = res?.data?.moduleTotalCount - res?.data?.moduleCompletedCount;
        if(allmoduleLeft > 0 ) {
          setModuleLeft(allmoduleLeft);
        }
        if(res?.data?.courseReDoneCount?.re_done_count) {
          maxAttempt = res?.data?.courseReDoneCount?.re_done_count * process.env.NEXT_PUBLIC_MAXIMUM_ASSIGNMENT_ATTEMPT_LIMIT;
          if(assignmentSubmitCount < maxAttempt) {
            setShowAssignmentButton(true);
          }
        }
        //// console.log("course view", res.data.courseReDoneCount.re_done_count);

        let maxcoursemin = Math.floor(courseData?.data?.total_training_hour * 60);
        let maxcoursesec = maxcoursemin * 60;
        let courseViewSec = 0;
        if(res?.data?.courseViewData) {
          let perContentSec = 0;
          perContentSec = maxcoursesec / res?.data?.totalCourseContent;

          res?.data?.courseViewData.forEach(viewedElement => {
            if(viewedElement.viewed_seconds > perContentSec) {
              courseViewSec += perContentSec;
            } else {
              courseViewSec += viewedElement.viewed_seconds;
            }
            //// console.log("id = "+viewedElement.id+" view = "+viewedElement.viewed_seconds+" courseView = "+courseViewSec)
          });
          //courseViewSec = res?.data?.courseViewSec;
        }
        if(!isNaN(+courseViewSec) && !isNaN(+maxcoursesec)) {
          if(courseViewSec > maxcoursesec) {
            hourOut = "0 hrs 0 mins left";
            setCoursePercent(100);
            setTimeLeft(hourOut)
          } else  {
            let percentage = parseInt((courseViewSec / maxcoursesec) * 100);
            setCoursePercent(percentage);
            let diff = maxcoursesec - courseViewSec;
            let diffmin = Math.floor(diff / 60);
            Hours = Math.floor(diffmin / 60);
            minutes = diffmin % 60;
            hourOut = Hours + "hrs " + minutes + "mins left";
            setTimeLeft(hourOut)
          }
        }
        if(res?.data !== null && res?.data !== "") {
          //isAnyChapterViewed = true;
          setLastChapterViewData(res.data);
        }
        
      }).catch((error) => {
        // console.log("module error", error);
      });
    }
    if (modules?.data && total_training_hour != undefined) {
      setModuleCount(modules.data.length);
      const totalMin = total_training_hour * 60;
      const perCourseMin = totalMin / modules.data.length;
      setPerModuleMin(perCourseMin);
      const hours = Math.floor(perCourseMin / 60);
      const minutes = perCourseMin % 60;
      setper_module_hour(hours + "hrs " + minutes + "mins");
    }
  }, [router, courseData, modules]);
  
  return (
    <>
      <form style={{ backgroundColor: 'white' }}>

      {profile?.role == 'trainee' ? <div className="header-heading">
          <h5>My Progress {profile?.role} </h5>
        </div>  :'' }

        {profile?.role == 'trainee' ?  <div className="progress-card">

          <div className="info">
            <div className="progress-card-heading">
              <span style={{ color: '#212529' }}>{courseData?.data?.course_name}</span>
            </div>
            {profile?.role != 'trainer' || profile?.role != 'admin' ?<div className="remaining-info-card">
              <span>
                {moduleLeft > 0 ? (
                  <>{moduleLeft} Module Remaining</>
                ):(
                  <>All Modules Completed</>
                )}
              </span>
            </div> : ''}
            <div className="date-assessment-info d-flex gap-2">
              <div className="date-label-1">
                <span style={{ color: '#212529' }}>Due Date: {moment(courseData?.data?.course_launch_date).add(courseData?.week_duration, 'weeks').format("Do MMM YY")}, 12:00 AM</span>
              </div>
              <div className="assessment-label">
                <span style={{ color: '#212529' }}>
                  Assessment Submissions : 
                  {assignmentSubmitCount > 0 ? (<> Done</>):(<> None</>)}
                </span>
              </div>
            </div>
          </div>

          <div className="progress-bar-info">
            <div className="progress-circle over0 p0">
              <span>{coursePercent}%</span>
              <div className="left-half-clipper">
                <div className="first50-bar"></div>
                <div className="value-bar"></div>
              </div>
            </div>
            <div className="time-info">
              <span style={{ color: '#212529' }}>{timeLeft}</span>
            </div>
          </div>
        </div> : ''}
        
        <div className="modules-heading">
          <h5>Modules </h5>
        </div>

        {profile?.role == 'trainee' ? <div>
        
          <div className="module-cards">
            {modules?.data?.map((item, index) => {
              return (
                <ModuleCard key={`module${item.id}`} moduleData={item} moduleIndex={index} />
              )
            })}
          </div>

        </div> : ''}

        {modules?.data?.map((item, index) => {
          return (
            <ModuleDetailCard key={`moduleDetail${item.id}`} moduleData={item} moduleIndex={index} moduleHourLeft={per_module_hour} perModuleMin={perModuleMin} />
          )
        })}

        {(showAssignmentButton && coursePercent == 100) &&
          <div className="p-4" style={{ marginLeft: '3rem' }}>
            <Link href={`/courses/${router?.query?.id}/quizzes`} type="button" className="btn btn-primary">Course Assignment</Link>
          </div>
        }

      </form>
    </>
  )
}
export default Page;