import moment from 'moment';
import Link from 'next/link';
import CourseViewModel from "../../model/cource_view.model";
import { useEffect, useState } from 'react';
import AppContext from "../../lib/appContext";
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
export default function adminCourseCard({ courseData, courseIndex, revisit }) {
  const router = useRouter();
  const [showRevisitModal, setShowRevisitModal] = useState(false);
  let courseImg = "/site_img/elearning_def.svg";
  if (courseData?.course_thumbnail !== null && courseData?.course_thumbnail != "") {
    courseImg = courseData?.course_thumbnail;
  }
  let marginTop = "mt-0";
  if (courseIndex > 3) {
    marginTop = "mt-3"
  }
  //let courseStatus = "locked";
  const [coursePercent, setCoursePercent] = useState(0);
  const [totalContent, setTotalContent] = useState(0);
  const [contentCompleted, setCompletedContent] = useState(0);
  const [courseStatus, setCourseStatus] = useState("Not Started");
  const [statusColor, setStatusColor] = useState("#ff0000")
  const rand = Math.floor(1 + Math.random() * (100 - 1));
  useEffect(() => {
    if (router.query.id !== undefined) {
      const moduleViewData = new FormData();
      moduleViewData.append("trainee_id", router.query.id);
      moduleViewData.append("course_id", courseData?.id);
      CourseViewModel.getCourseViewData(moduleViewData).then((res) => {
        //console.log("current course data", res.data);
        if (res?.data) {
          setCompletedContent(res?.data?.courseContentCompletedCount);
          setTotalContent(res?.data?.allContentInCourse);
          let percentage = 0
          if (res?.data?.allContentInCourse > 0) {
            percentage = parseInt((res?.data?.courseContentCompletedCount / res?.data?.allContentInCourse) * 100);
          }

          setCoursePercent(percentage);
          if (res?.data?.totalCourseView !== null) {
            setCourseStatus("In Progress");
            setStatusColor("#ffc50f");
            //console.log("courseData", courseData);
            let week_duration = courseData.week_duration;
            var date = moment(courseData?.course_launch_date).add(courseData?.week_duration, 'weeks').format("Do MMM YY");
            var now = moment();
            if (now > date) {
              setCourseStatus("Due date is over");
              setStatusColor("#ff0000");
            } else {
              if (res?.data?.courseContentCompletedCount == res?.data?.allContentInCourse) {
                setCourseStatus("completed");
                setStatusColor("#2fa86f");
              }
            }
          }
        }
      });
    }
  }, [router.query.id])
  const [revisitData, setRevisitData] = useState(null);
  useEffect(() => {
    //console.log("got in here", courseData?.revisit)

  }, [])
  return (

    <>
      {(courseData?.status == "approved") &&
        <div className={`col-3 ${marginTop}`}>
          <div className="card trainee-cards" style={{ width: '13.5rem', padding: 'unset' }}>
            <img className="card-img-top card-picture" src={courseImg}
              alt="Card image cap" style={{ maxHeight: '142px' }} />
            <div className="card-body">
              <div className="card-heading">{courseData?.course_name}</div>
              <div className="card-topic">Topic-{courseData?.category?.category_name}</div>
              <div className="card-topic-info d-flex flex-column">
                <div className="numeric-info">{coursePercent}% completed</div>
                <div className="meter-info">
                  <div className="progress" style={{ height: '4px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: coursePercent + '%' }}
                      aria-valuenow={coursePercent} aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="explicit-info">
                  <span className="text-primary">{contentCompleted}</span> Out of {totalContent} Modules Completed
                </div>
              </div>
              <div className="card-footer-part d-flex justify-content-between">
                <div className="label-info d-flex text-success gap-2">
                  <div className="blank-dot-class"></div>
                  <div className="dot-label" style={{ backgroundColor: statusColor }}></div>
                  <span style={{ fontSize: '10px', color: statusColor }}>{courseStatus}</span>
                </div>
                <div className="time-left-info" style={{cursor:'pointer'}} onClick={() => setShowRevisitModal(true)}>Revisited {revisit.count} times</div>
                {revisit.count > 0 &&
                  <Modal
                    show={showRevisitModal}
                    onHide={() => setShowRevisitModal(false)}
                    size="sm"
                    centered>
                    <Modal.Body>
                      <h5 className="align-middle" style={{ textAlign: 'center' }}>Course Re-Visit </h5>
                      <div className="table-responsive">
                        <table className='table table-sm table-bordered' style={{ width: '100%' }}>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Time Spent</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              revisit?.rows?.map((item, index) => {
                                let min = Math.round(item.viewed_seconds / 60);
                                return (
                                  <>
                                    <tr>
                                      <td>{item.visit_date}</td>
                                      <td>{min} min</td>
                                    </tr>
                                  </>
                                );
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    </Modal.Body>
                  </Modal>
                }

              </div>
            </div>
          </div>
        </div>
      }
    </>

  );
}