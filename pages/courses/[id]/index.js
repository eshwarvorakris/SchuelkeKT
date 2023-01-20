import { useState, useEffect, useRef, useContext } from "react";
import useSWR, { mutate } from 'swr';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import category from "../../../model/category.model";
import courseModel from "../../../model/course.model";
import courseModule from "../../../model/course.model";
import ModuleCard from "../../components/moduleCard";
import ModuleDetailCard from "../../components/moduleDetailCard"
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
  const [categories, setCategories] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const { data: courseData, mutate: couresDetail, error, isLoading } = useSWR("coursedetail", async () => await courseModel.detail(QueryParam?.id), config.swrConfig);
  const { data: modules, mutate: moduleList, error:moduleError, isLoading:moduleLoading } = useSWR("modulelist", async () => await courseModule.modules(QueryParam?.id), config.swrConfig);
  useEffect(() => {
    
    let time = courseData?.data?.week_duration * 7 * 24;
    var Hours = Math.floor(time / 60);
    var minutes = time % 60;
    var hourOut = Hours + "hrs " + minutes + "mins left";
    setTimeLeft(hourOut)
    console.log("courseData ", courseData);
    console.log("module ", modules);
  }, [router, courseData]);

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
              <span>{courseData?.total_modules} Module Remaining</span>
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
            <div className="progress-circle over50 p60">
              <span>60%</span>
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
          {/* <div className="module-cards">
            <a href="/trainee/topic-page.html" className="module-anchor" style={{textDecoration:'none'}}>
              <div className="module-card card-1" style={{backgroundColor:'#F3F3F3'}}>
                <span>1 . Introduction to Cardiology</span>
              </div>
            </a>

            <a href="/trainee/topic-page.html" className="module-anchor" style={{textDecoration:'none'}}>
              <div className="module-card card-2" style={{backgroundColor:'#F3F3F3'}}>
                <span>2 . Cardio Vascular Diseases</span>
              </div>
            </a>

            <a href="/trainee/topic-page.html" className="module-anchor" style={{textDecoration:'none'}}>
              <div className="module-card card-3" style={{backgroundColor:'#F3F3F3'}}>
                <span>3 . Medical Cardiology</span>
              </div>
            </a>

            <a href="/trainee/topic-page.html" className="module-anchor" style={{textDecoration:'none'}}>
              <div className="module-card card-4" style={{backgroundColor:'#F3F3F3'}}>
                <span>4. Cardiothoracic Surgery</span>
              </div>
            </a>
          </div>

          <div className="progress-bars">
            <div className="card-1-progress">
              <div className="progress" style={{width:'100%'}}>
                <div className="progress-bar" role="progressbar" style={{width: '0%'}} aria-valuenow="0"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div className="card-2-progress">
              <div className="progress" style={{width:'100%'}}>
                <div className="progress-bar" role="progressbar" style={{width: '50%'}} aria-valuenow="50"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div className="card-3-progress">
              <div className="progress" style={{width:'100%'}}>
                <div className="progress-bar" role="progressbar" style={{width: '75%'}} aria-valuenow="75"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div className="card-4-progress">
              <div className="progress" style={{width:'100%'}}>
                <div className="progress-bar" role="progressbar" style={{width: '100%'}} aria-valuenow="100"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>

          </div> */}
        </div>

        {modules?.data?.map((item, index) => {
          return (
            <ModuleDetailCard key={`moduleDetail${item.id}`} moduleData={item} moduleIndex={index} />
          )
        })}
        {/* <div className="module-1">
          <div className="module-1-heading">
            <h5>Module 1</h5>
          </div>

          <div className="body-heading" style={{textShadow:'unset', padding:'0rem 0rem 1rem 2rem', marginBottom:'unset'}}>
            <span style={{fontSize:'25px', padding:'unset', fontWeight:'600', fontFamily:'myriad-regular'}}>Introduction to Cardiology</span>
          </div>

          <div className="heading-content">
            <span>Pulmonology is a medical speciality that deals with diseases involving the respiratory
              tract
            </span>
          </div>

          <div className="button-progress-container">
            <a className="topic-link" href="/trainee/topic-page.html">
              <button type="button" className="start-learning-btn d-flex gap-2">
                <div className="blank-class">
                  
                  <i className="fa fa-play play-icon" aria-hidden="true"></i>
                </div>
                <span>Continue Learning</span>

              </button>
            </a>

            <div className="learning-progress-bar d-flex flex-column gap-2">
              <div className="d-flex justify-content-between">
                <span>61% Completed</span>
                <span>9hrs 45mins left</span>
              </div>
              <div className="progress" style={{width:'100%'}}>
                <div className="progress-bar" role="progressbar" style={{width: '50%'}} aria-valuenow="50"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>

          <div className="topic-chapter-container">

            <a className="topic-link" href="#" style={{textDecoration:'none'}}>
              <div className="chapter-1">
                <span>Chapter 1: What Is Pulmonlogy</span>

                <span className="remaining-info">2hrs 30mins
                  <i className="fa fa-solid fa-chevron-down " style={{paddingLeft:'0.5rem'}}></i>
                </span>

                <div className="lastcol">
                  <div className="chapter-completed-icon circle-icon">
                    <span>
                      <i className="completed-icon fa fa-solid fa-check"></i>
                    </span>
                  </div>
                </div>

              </div>
            </a>

            <a className="topic-link" href="#" style={{textDecoration:'none'}}>
              <div className="chapter-2">
                <span>Chapter 2: The Skull (Facial bones, Skeletal structures</span>

                <span className="remaining-info">2hrs 34mins
                  <i className="fa fa-solid fa-chevron-down " style={{paddingLeft:'0.5rem'}}></i>
                </span>

                <div className="lastcol">
                  
                  <div className="progress-bar-info">
                    <div className="progress-circle progress-size over50 p90" style={{fontSize:'6px', margin:'unset'}}>
                      <span style={{fontSize:'10px', left:'-30%', top:'-30%'}}>90%</span>
                      <div className="left-half-clipper">
                        <div className="first50-bar"></div>
                        <div className="value-bar"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <a className="topic-link" href="#" style={{textDecoration:'none'}}>
              <div className="chapter-3">
                <span>Chapter 3: Appendicular Skeleton-Girdles</span>

                <span className="remaining-info">2hrs 34mins
                  <i className="fa fa-solid fa-chevron-down " style={{paddingLeft:'0.5rem'}}></i>
                </span>

                <div className="lastcol">
                  <div className="chapter-locked-icon">
                    <span>
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="module-2">
          <div className="module-2-heading">
            <h5>Module 2</h5>
          </div>

          <div className="body-heading">
            <span>Cardio Vascular Diseases</span>
          </div>

          <div className="heading-content">
            <span>Pulmonology is a medical speciality that deals with diseases involving the respiratory
              tract
            </span>
          </div>

          <div className="button-progress-container">
            <button type="button" className="start-learning-btn">
              Start Learning
            </button>
          </div>

          <div className="topic-chapter-container">
            <a className="topic-link" href="/trainee/topic-page.html">
              <div className="chapter-1">
                <span>Chapter 1: What Is Pulmonlogy</span>

                <span className="remaining-info">2hrs 30mins
                  <i className="fa-solid fa-chevron-down pl-2"></i>
                </span>

                <div className="lastcol">
                  <div className="chapter-locked-icon">
                    <span>
                      <ion-icon name="lock-closed-outline"></ion-icon>
                    </span>
                  </div>
                </div>
              </div>
            </a>
            <a className="topic-link" href="/trainee/topic-page.html">
              <div className="chapter-2">
                <span>Chapter 2: The Skull (Facial bones, Skeletal structures</span>
                <span className="remaining-info">2hrs 34mins
                  <i className="fa-solid fa-chevron-down pl-2"></i>
                </span>

                <div className="lastcol">
                  <div className="chapter-locked-icon">
                    <span>
                      <ion-icon name="lock-closed-outline"></ion-icon>
                    </span>
                  </div>
                </div>
              </div>
            </a>
            <a className="topic-link" href="/trainee/topic-page.html">
              <div className="chapter-3">
                <span>Chapter 3: Appendicular Skeleton-Girdles</span>

                <span className="remaining-info">2hrs 34mins
                  <i className="fa-solid fa-chevron-down pl-2"></i>
                </span>

                <div className="lastcol">
                  <div className="chapter-locked-icon">
                    <span>
                      <ion-icon name="lock-closed-outline"></ion-icon>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div> */}
      </form>
    </>
  )
}
export default Page;