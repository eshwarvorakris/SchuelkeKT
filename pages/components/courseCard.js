import Link from "next/link";

export default function courseCard({ courseData }) {
  let courseImg = "/trainer-images/dashboard images/thumbnails/thumbnaila.png";
  if(courseData?.course_thumbnail !== null && courseData?.course_thumbnail != "")
  {
    courseImg = courseData?.course_thumbnail;
  }
  return (
    <>
      <div className="course-info-card-1 course-card">
        <div className="course-details">
          <div className="course-thumbnail">
            <img className="thumbnail"
              src={courseImg} alt="" />
          </div>
          <div className="title">
            <div className="course-title">
              <h6>{courseData?.course_name}</h6>
            </div>
            <div className="badge-detail text-dark"><span>{courseData?.category?.category_name}</span></div>
          </div>
        </div>
        <div className="statistical-details">
          <div className="enrolled-detail">
            <p>Enrolled : </p>
            <span>604 Trainees</span>
          </div>
          <div className="meter-detail">
            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-label="Basic example"
                style={{ width: "75%", ariaValuenow: "75", ariaValuemin: "0", ariaValuemax: "100" }}>

              </div>
            </div>
          </div>
          <div className="percentage-detail">
            <p>80% Trainees Completed</p>
          </div>
        </div>
        <div className="duration-details">
          <div className="duration-detail">
            <p>Duration : </p>
            <span>{courseData?.week_duration} Weeks</span>
          </div>
          <div className="average-time-detail">
            <p>Average Time Spent: 5 weeks</p>
          </div>
        </div>
        <div className="edit-btn">
          <Link href={`/courses/${courseData?.id}/edit`}>
            <button className="btn edit">Edit Course</button>
          </Link>
        </div>
      </div>
    </>
  );
}