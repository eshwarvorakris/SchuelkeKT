import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import { useEffect } from "react";
import CourseViewModel from "../../model/cource_view.model";
export default function courseCard({ courseData }) {
  let courseImg = "/trainer-images/dashboard images/thumbnails/thumbnaila.png";
  if(courseData?.course_thumbnail !== null && courseData?.course_thumbnail != "")
  {
    courseImg = courseData?.course_thumbnail;
  }
  const [statData, setStatData] = useState([]);
  useEffect (()=> {
    const form = new FormData();
    form.append("course_id", courseData.id);
    CourseViewModel.getEachCourseStat(form).then((res)=> {
      //console.log("resonse each", res.data);
      setStatData(res?.data)
    })
  },[])
  return (
    <>
      <div className="course-info-card-1 course-card">
        <div className="course-details">
          <div className="course-thumbnail">
            <img className="thumbnail"
              src={courseImg} alt="" />
          </div>
          <div className="title">
            <div className="course-title" style={{paddingTop:'0'}}>
              <h6>{courseData?.course_name}</h6>
            </div>
            <div className="badge-detail text-dark"><span>{courseData?.category?.category_name}</span></div>
          </div>
        </div>
        <div className="statistical-details" style={{paddingTop:'0'}}>
          <div className="enrolled-detail">
            <p>Enrolled : </p>
            <span>{statData?.traineeEnrolled} Trainees</span>
          </div>
          <div className="meter-detail">
            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-label="Basic example"
                style={{ width: statData?.userCompletePercent+"%", ariaValuenow: statData?.userCompletePercent, ariaValuemin: "0", ariaValuemax: "100" }}>

              </div>
            </div>
          </div>
          <div className="percentage-detail">
            <p style={{fontSize:'13px'}}>{statData?.userCompletePercent}% Trainees Completed</p>
          </div>
        </div>
        <div className="duration-details" style={{paddingTop:'0'}}>
          <div style={{marginTop:'-1.4rem'}}>
            <div className="duration-detail">
              <p>Duration : </p>
              <span>{courseData?.week_duration} Weeks</span>
            </div>
            <div className="average-time-detail">
              <p>Average Time Spent: {statData?.weeksSpent} weeks</p>
            </div>
            <div className="average-time-detail">
              <p>Average Score: {courseData?.average_score}</p>
            </div>
          </div>
        </div>
        <div className="edit-btn" style={{height:'unset', paddingTop:'0', marginTop:'-1.4rem'}}>
          <Link href={`/courses/${courseData?.id}/edit`}>
            <button className="btn edit">Edit Course</button>
          </Link>
        </div>
      </div>
    </>
  );
}