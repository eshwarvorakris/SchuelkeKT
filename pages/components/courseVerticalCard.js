import moment from 'moment';
import Link from 'next/link';
export default function courseVerticalCard({ courseData, courseIndex }) {
  let courseImg = "/site_img/elearning_def.svg";
  if (courseData?.course_thumbnail !== null && courseData?.course_thumbnail != "") {
    courseImg = courseData?.course_thumbnail;
  }
  let marginTop = "mt-0";
  if (courseIndex > 3) {
    marginTop = "mt-3"
  }
  let courseStatus = "locked";

  let time = courseData?.week_duration * 7 * 24;
  var Hours = Math.floor(time / 60);
  var minutes = time % 60;
  var hourOut = Hours + "hrs " + minutes + "mins";
  return (
    <>
      <Link href={`/courses/${courseData?.id}`} className={`cardspan col-3 ${marginTop}`} >
        <div className="trainee-card card" style={{ width: "14rem" }}>
          <div className="card-thumbnail">
            <img className="card-img card-img-top"
              src={courseImg}
              style={{maxHeight:'145px'}}
              alt="Card image cap" />
            {courseStatus == "locked" &&
              <>
                <div className="card-tagupdate" style={{zIndex:'1'}}><i className=" fa fa-lock" aria-hidden="true"></i></div>
              </>
            }

            {courseStatus != "locked" &&
              <>
                <div className="card-text-tag" style={{zIndex:'1'}}>
                  <span
                    className="success-text-tag text-success">Completed</span>
                </div>
              </>
            }
          </div>
          <div className="card-body">
            <div className="card-topic-heading cardspan">
              {courseData?.course_name}
            </div>
            <div className="card-topic-info d-flex justify-content-between">
              <div className="card-chapters-info d-flex gap-1">
                <div className="card-icon-traniee-traniee">
                  <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                    alt="icon" />
                </div>
                <div className="chapter-info">
                  <span className="cardspan">{courseData?.total_modules} Chapters</span>
                </div>
              </div>
              <div className="card-time-info d-flex gap-1">
                <div className="card-icon-traniee">
                  <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                    alt="icon" />
                </div>
                <div className="card-time-info">
                  <span>{hourOut}</span>
                </div>
              </div>
            </div>
            <div className="enrolled-info d-flex gap-1">
              <div className="card-icon-traniee">
                <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                  alt="icon" />
              </div>
              <div className="card-date-info">
                <span>{moment(courseData?.course_launch_date).format("Do MMM YY")}, 12:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}