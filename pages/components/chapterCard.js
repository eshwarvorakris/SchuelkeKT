import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CourseViewModel from "../../model/cource_view.model";
import { helper } from '../../lib/helper';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import AppContext from "../../lib/appContext";
export default function ChapterCard({ chapterData, chapterIndex, perContentMin, moduleData, firstChapterId }) {
  const router = useRouter();
  const layoutValues = useContext(AppContext);
  const QueryParam = router.query;
  const rand = 1 + Math.random() * (100 - 1);
  
  const [chapterStatus, setchapterStatus] = useState("ongoing"); // ongoing / completed / locked
  var linkOut = '#';
  
  linkOut = '/chapter/'+chapterData?.id;
  const [percent, setPercent] = useState(0);
  var curChapterViewSeconds = 0;
  useEffect(() => {
    //// console.log("chapterData.isLocked", chapterData.isLocked)
    if(layoutValues.profile.role == "trainee") {
      const chapterForm = new FormData();
      chapterForm.append("chapter_id", chapterData.id);
      chapterForm.append("course_id", chapterData.course_id);
      chapterForm.append("module_id", chapterData.module_id);
      chapterForm.append("module_sequence_no", moduleData.sequence_no);
      chapterForm.append("chapter_order", chapterData.order);
      let isModuleFirstChapter = false;
      if(firstChapterId == chapterData.id) {
        isModuleFirstChapter = true;
      }
      chapterForm.append("module_first_chapter_id", firstChapterId);
      chapterForm.append("isModuleFirstChapter", isModuleFirstChapter);
      CourseViewModel.getChapterView(chapterForm).then((res) => {
        //// console.log("cur course view chapter id ->"+chapterData.id+" = ", res.data)
        if(res?.data !== null || res?.data !== "") {
          if(res?.data?.curChapterViews !== undefined) {
            let courseTotalSec = (res?.data?.courseData?.total_training_hour * 60 * 60);
            let perContentSec = courseTotalSec / res?.data?.allContentInCourse;
            let currentChapterView = res?.data?.curChapterViews;
            let percentage = 0;
            if(currentChapterView >= perContentSec) {
              percentage = 100;
              setPercent(percentage);
              setchapterStatus("completed");
            } else {
              percentage = parseInt((currentChapterView / perContentSec) * 100);
              if(percentage > 0) {
                
                setchapterStatus("ongoing");
                if(percentage == 100) {
                  setchapterStatus("completed")
                }
                setPercent(percentage);
              } else if(res?.data?.isCurrentChapterLocked){
                setchapterStatus("locked");
              }
              
            }
          }
        }
      }).catch((error) => {
        // console.log("module error", error);
      });
    }
  },[]);
  
  
  const contentLink = function () {
    //router.push(`/chapter/${chapterData?.id}`);
    if(chapterStatus == "ongoing" || chapterStatus == "completed") {
      //window.location.assign(`/chapter/${chapterData?.id}`);
      router.push(`/chapter/${chapterData?.id}`);
    } else {
      helper.sweetalert.warningToast("Please complete previous chapters.");
    }
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

            {(chapterStatus == "ongoing" && layoutValues?.profile?.role == 'trainee') &&
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