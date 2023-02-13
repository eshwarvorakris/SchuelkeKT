import { useState, useEffect, useRef, useContext } from "react";
import useSWR, { mutate } from 'swr';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import category from "../../../model/category.model";
import courseModel from "../../../model/course.model";
import ModuleCard from "../../components/moduleCard";
import ModuleDetailCard from "../../components/moduleDetailCard"
import assignmentModel from "../../../model/assignment.model";
import { useRouter } from "next/router";
import moment from 'moment';
import Link from "next/link";
import AppContext from "../../../lib/appContext";
const Page = () => {
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "id";
  QueryParam.order_in = router.query?.order_in || "asc";
  const layoutValues = useContext(AppContext);
  { layoutValues.setPageHeading("Trainee Center") }
  const [image, setImage] = useState("");
  //const [courseData, setcourseData] = useState([]);
  const [per_module_hour, setper_module_hour] = useState(0);
  const [moduleCount, setModuleCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [showAssignmentButton, setShowAssignmentButton] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const { data: courseData, mutate: couresDetail, error, isLoading } = useSWR("coursedetail", async () => await courseModel.detail(router?.query?.id), config.swrConfig);
  const { data: modules, mutate: moduleList, error:moduleError, isLoading:moduleLoading } = useSWR("modulelist", async () => await courseModel.modules(router?.query?.id), config.swrConfig);
  useEffect(() => {
    if(courseData?.data) {
      setModuleCount(courseData?.data?.total_modules);
      var total_training_hour = courseData?.data?.total_training_hour;
      let time = courseData?.data?.week_duration * 7 * 24;
      var Hours = Math.floor(time / 60);
      var minutes = time % 60;
      var hourOut = total_training_hour + "hrs " + 0 + "mins left";
      setTimeLeft(hourOut);
    }
    // console.log("courseData ", courseData);
    // console.log("module ", modules);
    if(router?.query?.id !== undefined) {
      const countAttemptForm = new FormData();
      countAttemptForm.append("course_id", router?.query?.id);
      assignmentModel.countAttempt(countAttemptForm).then((submittedRes) => {
        //console.log("attempt result",process.env.NEXT_PUBLIC_MAXIMUM_ASSIGNMENT_ATTEMPT_LIMIT);
        if(submittedRes?.data?.assignmentAttempt < process.env.NEXT_PUBLIC_MAXIMUM_ASSIGNMENT_ATTEMPT_LIMIT) {
          setShowAssignmentButton(true);
        }
      });
    }
    if(modules?.data && total_training_hour != undefined){
      setModuleCount(modules.data.length);
      setper_module_hour(total_training_hour / modules.data.length);
      //console.log("module count => ", per_module_hour);
    }
  }, [router, courseData, modules]);

  return (
    <>
      <form style={{backgroundColor:'white'}}>

        <div className="header-heading">
          <h5>My Progress</h5>
        </div>

        <div className="progress-card">

          <div className="info">
            <div className="progress-card-heading">
              <span style={{color:'#212529'}}>{courseData?.data?.course_name}</span>
            </div>
            <div className="remaining-info-card">
              <span>{moduleCount} Module Remaining</span>
            </div>
            <div className="date-assessment-info d-flex gap-2">
              <div className="date-label-1">
                <span style={{color:'#212529'}}>Due Date: {moment(courseData?.data?.course_launch_date).add(courseData?.week_duration, 'weeks').format("Do MMM YY")}, 12:00 AM</span>
              </div>
              <div className="assessment-label">
                <span style={{color:'#212529'}}>Assessment Submissions: none</span>
              </div>
            </div>
          </div>

          <div className="progress-bar-info">
            {/* <div className="progress-circle over50 p60"> */}
            <div className="progress-circle over0 p0">
              <span>0%</span>
              <div className="left-half-clipper">
                <div className="first50-bar"></div>
                <div className="value-bar"></div>
              </div>
            </div>
            <div className="time-info">
              <span style={{color:'#212529'}}>{timeLeft}</span>
            </div>
          </div>
        </div>

        <div className="modules-heading">
          <h5>Modules</h5>
        </div>

        <div>
          <div className="module-cards">
            {modules?.data?.map((item, index) => {
              return (
                <ModuleCard key={`module${item.id}`} moduleData={item} moduleIndex={index} />
              )
            })}
          </div>
          
        </div>

        {modules?.data?.map((item, index) => {
          return (
            <ModuleDetailCard key={`moduleDetail${item.id}`} moduleData={item} moduleIndex={index} moduleHourLeft={per_module_hour} />
          )
        })}
        
        {showAssignmentButton &&
          <div className="p-4" style={{marginLeft:'3rem'}}>
            <Link href={`/courses/${router?.query?.id}/quizzes`} type="button" className="btn btn-primary">Course Assignment</Link>
          </div>
        }
        
      </form>
    </>
  )
}
export default Page;