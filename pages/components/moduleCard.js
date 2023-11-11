import moment from 'moment';
import Link from 'next/link';
import AppContext from "../../lib/appContext";
import CourseViewModel from "../../model/cource_view.model";
import { useContext, useState } from "react";
import { useEffect } from 'react';
import Image from "next/image";
export default function ModuleCard({ moduleData, moduleIndex }) {
  //const rand = 1 + Math.random() * (100 - 1);
  const rand = 0;
  const [percentCompleted, setPercentCompleted] = useState(0);
  const layoutValues = useContext(AppContext);
  useEffect(() => {
    const moduleViewData = new FormData();
    moduleViewData.append("course_id", moduleData?.course_id);
    moduleViewData.append("module_id", moduleData?.id);
    
    CourseViewModel.getModuleView(moduleViewData).then((res) => {
      //// console.log("module view = ",res);
      let percontentsec = 0;
      
      let courseTimeInHour = res?.data?.courseData?.total_training_hour;
      let courseTimeInSec = courseTimeInHour * 60 * 60;
      let percentage = 0;
      let currentModuleMaxSec = 0;
      if (res?.data?.allContentInModule > 0) {
        percontentsec = parseInt(courseTimeInSec / res?.data?.allContentInCourse);
        currentModuleMaxSec = percontentsec * res?.data?.allContentInModule; 
        // let curModuleViewSec = res?.data?.curModuleViews;
        let curModuleViewSec = res?.data?.moduleViewesCount;
        percentage = 0;
        if (currentModuleMaxSec > curModuleViewSec) {
          percentage = parseInt((curModuleViewSec / currentModuleMaxSec) * 100);
        } else {
          percentage = 100;
        }
        setPercentCompleted(percentage);
      }
    });
  },[])
    
  return (
    <>
      <div>
        <div>
          <a href="#" className="module-anchor" style={{ textDecoration: 'none' }}>
            <div className="module-card card-1" style={{ backgroundColor: '#F3F3F3' }}>
              <span>{moduleIndex + 1} . {moduleData?.module_name}</span>
            </div>
          </a>
        </div>
        {
          (() => {
            if (layoutValues?.profile?.role == 'trainee') {
              return (
                <div className="" style={{ padding: '1rem 0rem 0rem 0rem' }}>
                  <div className="card-1-progress">
                    <div className="progress" style={{ width: '100%' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: `${percentCompleted}%` }} aria-valuenow="0"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>);
            }
          })()
        }
      </div>
    </>
  );
}