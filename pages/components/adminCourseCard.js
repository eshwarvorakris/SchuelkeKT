import moment from 'moment';
import Link from 'next/link';
export default function adminCourseCard({ courseData, courseIndex }) {
  let courseImg = "/trainer-images/card-1.png";
  if (courseData?.course_thumbnail !== null && courseData?.course_thumbnail != "") {
    courseImg = courseData?.course_thumbnail;
  }
  let marginTop = "mt-0";
  if (courseIndex > 3) {
    marginTop = "mt-3"
  }
  let courseStatus = "locked";

  const rand = Math.floor(1 + Math.random() * (100 - 1));
  return (
    <>
      <div className={`col-3 ${marginTop}`}>
        <div class="card trainee-cards" style={{ width: '13.5rem', padding: 'unset' }}>
          <img class="card-img-top card-picture" src={courseImg}
            alt="Card image cap" />
          <div class="card-body">
            <div class="card-heading">{courseData?.course_name}</div>
            <div class="card-topic">Topic-{courseData?.category?.category_name}</div>
            <div class="card-topic-info d-flex flex-column">
              <div class="numeric-info">{rand}% completed</div>
              <div class="meter-info">
                <div class="progress" style={{ height: '4px' }}>
                  <div class="progress-bar" role="progressbar" style={{ width: rand+'%' }}
                    aria-valuenow={rand} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div class="explicit-info"><span class="text-primary">90</span> Out of 90
                Modules Completed</div>
            </div>
            <div class="card-footer-part d-flex justify-content-between">
              <div class="label-info d-flex text-success gap-2">
                <div class="blank-dot-class"></div>
                <div class="dot-label" style={{ backgroundColor: '#2fa86f' }}></div>
                <span style={{ fontSize: '10px', color: 'unset' }}>Completed</span>
              </div>
              <div class="time-left-info">Revisited 2 times</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}