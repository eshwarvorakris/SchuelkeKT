import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CourseViewModel from "../../model/cource_view.model";
import { helper } from '../../lib/helper';
import { useState } from 'react';
import { useEffect } from 'react';
export default function chapterCard({ chapterData, chapterIndex, perContentMin }) {
  const router = useRouter();
  const QueryParam = router.query;
  const rand = 1 + Math.random() * (100 - 1);
  var chapterStatus = "locked"; // ongoing / completed / locked
  var linkOut = '#';
  chapterStatus = "ongoing";
  linkOut = '/chapter/'+chapterData?.id;
  const [percent, setPercent] = useState(0);
  var curChapterViewSeconds = 0;
  useEffect(() => {
    const chapterForm = new FormData();
    chapterForm.append("chapter_id", chapterData.id);
    chapterForm.append("course_id", chapterData.course_id);
    chapterForm.append("module_id", chapterData.module_id);
    CourseViewModel.getChapterView(chapterForm).then((res) => {
      //console.log("cur course view", res.data)
      if(res?.data !== null || res?.data !== "") {
        if(res?.data?.curChapterViews !== undefined) {
          let courseTotalSec = (res?.data?.courseData?.total_training_hour * 60 * 60);
          let perContentSec = courseTotalSec / res?.data?.allContentInCourse;
          let currentChapterView = res?.data?.curChapterViews;
          let percentage = parseInt((currentChapterView / perContentSec) * 100);
          if(percentage > 0) {
            
            chapterStatus = "ongoing";
            if(percentage == 100) {
              chapterStatus = "completed";
            }
            setPercent(percentage);
          }
        }
      }
    }).catch((error) => {
      console.log("module error", error);
    });
  },[]);
  
  
  const contentLink = function () {
    router.push(`/chapter/${chapterData?.id}`);
    // if(chapterStatus == "ongoing" || chapterStatus == "completed") {
    //   router.push(`/chapter/${chapterData?.id}`);
    // } else {
    //   helper.sweetalert.warningToast("Please complete previous chapters.");
    // }
  }
  
  return (
    <>
      <div className={`topic-link ${chapterStatus}`} style={{ textDecoration: 'none' }} onClick={() => contentLink()}>
        <div className="chapter-1">
          <span>Chapter {chapterIndex + 1}: {chapterData?.title}</span>

          {/* <span className="remaining-info">2hrs 30mins
            <i className="fa fa-solid fa-chevron-down " style={{ paddingLeft: '0.5rem' }}></i>
          </span> */}

          <div className="lastcol">
            {chapterStatus == "completed" &&
              <>
                <div className="chapter-completed-icon circle-icon">
                  <span>
                    <i className="completed-icon fa fa-solid fa-check"></i>
                  </span>
                </div>
              </>
            }

            {chapterStatus == "ongoing" &&
              <>
                <div className="progress-bar-info">
                  <div className="progress-circle progress-size over50" style={{ fontSize: '6px', margin: 'unset' }}>
                    <span style={{ fontSize: '10px', left: '-30%', top: '-30%' }}>{percent}%</span>
                    <div className="left-half-clipper">
                      <div className="first50-bar"></div>
                      <div className="value-bar"></div>
                    </div>
                  </div>
                </div>
              </>
            }

            {chapterStatus == "locked" &&
              <>
                <div className="chapter-locked-icon">
                  <span>
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                </div>
              </>
            }
          </div>

        </div>
      </div>
    </>
  );
}