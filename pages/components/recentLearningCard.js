import moment from 'moment';
import Link from 'next/link';
import CourseViewModel from "../../model/cource_view.model";
import { helper } from '../../lib/helper';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import AppContext from "../../lib/appContext";
import { useRouter } from 'next/router';
export default function recentLearningCard() {
  const router = useRouter();
  const rand = 1 + Math.random() * (100 - 1);
  const [isRecent, setIsRecent] = useState(false);
  const [courseImg, setCourseImg] = useState("/trainee-images/trainee-dashboard/card-thumbnail.png");
  const [courseName, setCourseName] = useState("");
  const [completePercent, setCompletePercent] = useState(0);
  const [timeLeft, setTimeLeft] = useState("0hrs 0mins");
  const [totalChapterInCourse, setTotalChapterInCourse] = useState(0);
  const [completedChapter, setCompletedChapter] = useState(0);
  const [lastChapterId, setLastChapterId] = useState(0);
  const [totalModule, setTotalModule] = useState(0);
  const [completedModule, setCompletedModule] = useState(0);
  useEffect(() => {
    CourseViewModel.getRecentLearning().then((res) => {
      console.log("recent", res?.data?.moduleCompletedCount);
      setTotalModule(res?.data?.moduleTotalCount);
      setCompletedModule(res?.data?.moduleCompletedCount);
      if (res?.data?.lastChapter !== null && res?.data?.lastChapter != "") {
        setCourseName(res?.data?.lastChapter?.course?.course_name);
        setCourseImg(res?.data?.lastChapter?.course?.course_thumbnail);
        let courseMaxSec = res?.data?.lastChapter?.course?.total_training_hour * 60 * 60;
        let courseViewSec = res?.data?.totalCourseView;
        if (courseViewSec > courseMaxSec) {
          setCompletePercent(100);
        } else {
          let percentage = parseInt((courseViewSec / courseMaxSec) * 100);
          setCompletePercent(percentage);
          let diff = courseMaxSec - courseViewSec;
          let diffMin = Math.floor(diff / 60);
          var Hours = Math.floor(diffMin / 60);
          var minutes = diffMin % 60;
          var hourOut = Hours + "hrs " + minutes + "mins";
          setTimeLeft(hourOut);
        }
        setTotalChapterInCourse(res?.data?.allContentInCourse);
        setCompletedChapter(res?.data?.courseContentCompletedCount);
        setLastChapterId(res?.data?.lastChapter?.chapter_id)
        setIsRecent(true);
      }
    });
  }, [])
  return (
    <>
      {isRecent &&
        <>
          <div className="content-heading" style={{ padding: 'unset' }}>
            <h5 style={{ marginTop: 'unset' }}>Recent Learning</h5>
          </div>
          <div className="learning-card cardleaern">
            <div className="thumbnail-container">
              <img className="thumbnail-img" src={courseImg}
                alt="" />
            </div>
            <div className="topic-info d-flex flex-column">
              <div className="topic-heading-container">
                <div className="topic-heading">
                  <h5>{courseName}</h5>
                </div>
                <div className="time-left-info" style={{ color: "#030303" }}><span>{timeLeft} left</span></div>
              </div>

              <div className="progress-info" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <div className="d-flex flex-column gap-1">
                  <div className="percentage-info" style={{ padding: '0px' }}>
                    <span>{completePercent}% Completed</span>
                  </div>
                  <div className="progress-bar-info">
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" style={{
                        width: completePercent+"%",
                        ariaValuenow: completePercent, ariaValuemin: "0", ariaValuemax: "100"
                      }}>
                      </div>
                    </div>
                  </div>
                  <div className="completed-info">
                    <span><span className="text-primary">{completedModule} </span>Out of {totalModule} Completed</span>
                  </div>
                </div>
                <div className="button-container" style={{ padding: 'unset' }}>
                  <a href={`/chapter/${lastChapterId}`}>
                    <button type="button" className="learning-btn">Continue Learning</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}