import moment from 'moment';
import Link from 'next/link';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import ChapterCard from "./chapterCard"
import contentModel from "../../model/content.model";
import CourseViewModel from "../../model/cource_view.model"
import AppContext from "../../lib/appContext";
export default function moduleDetailCard({ moduleData, moduleIndex, moduleHourLeft = 0, perModuleMin }) {
  const router = useRouter();
  const layoutValues = useContext(AppContext);
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "sequence_no";
  QueryParam.order_in = router.query?.order_in || "title";
  //QueryParam.content_type = "asc";
  const rand = 1 + Math.random() * (100 - 1);
  const moduleStatus = moduleData.chapterView;  // 1 : completed, 2: ongoing, 3:all locked
  const [contents, setContent] = useState([]);
  const [perContentMin, setPerContentMin] = useState(0);
  const [learnButtonText, setLearnButtonText] = useState("");
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const [moduleLeftHour, setModuleLeftHour] = useState("");
  //const { data: contents, mutate: contentList, error, isLoading } = useSWR(moduleData?.id || null, async () => await contentModel.list({ module_id: moduleData?.id }), config.swrConfig);
  //console.log(chapters);
  useEffect(() => {
    if(moduleData?.id !== undefined)
    {
      const moduleViewData = new FormData();
      moduleViewData.append("course_id", moduleData?.course_id);
      moduleViewData.append("module_id", moduleData?.id);

      CourseViewModel.getModuleView(moduleViewData).then((res) => {
        //console.log("module view = ",res);
        let percontentsec = 0;
        let courseTimeInHour = res?.data?.courseData?.total_training_hour;
        let courseTimeInSec = courseTimeInHour * 60 * 60;
        let percentage = 0;
        let currentModuleMaxSec = 0;
        if(res?.data?.allContentInModule > 0) {
          percontentsec = parseInt(courseTimeInSec / res?.data?.allContentInCourse);
          currentModuleMaxSec = percontentsec * res?.data?.allContentInModule;
          let curModuleViewSec = res?.data?.curModuleViews;
          if(curModuleViewSec > 0) {
            percentage = parseInt((curModuleViewSec / currentModuleMaxSec) * 100);
            if(percentage == 100) {
              let maxmodulemin = Math.floor(currentModuleMaxSec / 60);
              var Hours = Math.floor(maxmodulemin / 60);
              var minutes = maxmodulemin % 60;
              var hourOut = Hours + "hrs " + minutes + "mins left";
              
              setModuleLeftHour(hourOut)
            } else  {
              let maxmodulemin = Math.floor(curModuleViewSec / 60);
              var Hours = Math.floor(maxmodulemin / 60);
              var minutes = maxmodulemin % 60;
              var hourOut = Hours + "hrs " + minutes + "mins left";
              setModuleLeftHour(hourOut)
            }
          } else {
            let maxmodulemin = Math.floor(currentModuleMaxSec / 60);
            var Hours = Math.floor(maxmodulemin / 60);
            var minutes = maxmodulemin % 60;
            var hourOut = Hours + "hrs " + minutes + "mins left";
            setModuleLeftHour(hourOut)
          }
          setPercentCompleted(percentage);
        }
      });

      contentModel.list({ module_id: moduleData?.id }).then((res) => {
        console.log("perModuleMin = ",perModuleMin);
        if(perModuleMin > 0 && res?.data?.length > 0) {
          setPerContentMin(perModuleMin / res?.data?.length);
        }
        setContent(res);
      }).catch((error) => {
        console.log(error);
      });
    }
    console.log("all contents1111 => ", contents?.data)
  }, []);
  return (
    <>
    {(contents?.data?.length > 0) &&
      <div className="module-1">
        <div className="module-1-heading">
          <h5>Module {moduleIndex + 1}</h5>
        </div>

        <div className="body-heading" style={{ textShadow: 'unset', padding: '0rem 0rem 1rem 2rem', marginBottom: 'unset' }}>
          <span style={{ fontSize: '25px', padding: 'unset', fontWeight: '600', fontFamily: 'myriad-regular' }}>{moduleData?.module_name}</span>
        </div>

        <div className="heading-content">
          <span>{moduleData?.description}</span>
        </div>
        {
          (() => {
            if (layoutValues?.profile?.role == 'trainee') {
              return (
                <div className="button-progress-container">
                  {(moduleStatus == 2 || moduleStatus == 1) &&
                    <>
                      <Link className="topic-link" href="#">
                        <button type="button" className="start-learning-btn d-flex gap-2">
                          <div className="blank-class">

                            <i className="fa fa-play play-icon" aria-hidden="true"></i>
                          </div>
                          <span>Continue Learning</span>

                        </button>
                      </Link>

                      <div className="learning-progress-bar d-flex flex-column gap-2">
                        <div className="d-flex justify-content-between">
                          <span>{percentCompleted}% Completed</span>
                          <span>{moduleLeftHour}</span>
                        </div>
                        <div className="progress" style={{ width: '100%' }}>
                          <div className="progress-bar" role="progressbar" style={{ width: percentCompleted+'%' }} aria-valuenow="0"
                            aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </>
                  }

                  {moduleStatus == 3 &&
                    <>
                      <button type="button" className="start-learning-btn">
                        Start Learning
                      </button>
                    </>
                  }
                </div>
              );
            }
          })()
        }

        <div className="topic-chapter-container">
          {
            (() => {
              if (contents?.data?.length > 0) {
                return (
                  <>
                    {contents?.data?.map((item, index) => {
                      item.isLocked = true;
                      item.isFirst = false;
                      if(moduleData.chapterViewId !== undefined) {
                        if(moduleData.chapterViewId == 0 && index == 0) {
                          item.isLocked = false;
                          item.isFirst = true;
                        } else if (moduleData.chapterViewId == item.id) {
                          item.isLocked = false;
                        }
                      }
                      return (
                        <ChapterCard key={`module${item.id}`} chapterData={item} chapterIndex={index} perContentMin={perContentMin} />
                      )
                    })}
                  </>
                );
              }
            })()
          }
          {/* {contents?.data?.map((item, index) => {
              return (
                <ChapterCard key={`module${item.id}`} chapterData={item} chapterIndex={index} />
              )
            })} */}
        </div>
      </div>
    }
    </>
  );
}