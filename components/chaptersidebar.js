import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import Chaptersidebarlist from "./chaptersidebarlist";
import CourseViewModel from "../model/cource_view.model";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

function Chaptersidebar({
  chapters,
  moduleId,
  secondsPerModule,
  courseId,
  profile,
  chapterOrder,
  bannerUrl
}) {

  // // console.log(moduleId);
  const [totalTimeLeft, settotalTimeLeft] = useState(1);
  const [moduleName, setmoduleName] = useState("");

  const couresDetail = function () {
    if (router?.query?.id !== undefined) {
      courseModel
        .detail(router?.query?.id)
        .then((res) => {
          setCourseData(res);
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  };

  function calculateTimeLeftforCurrentModule() {
    chapters.forEach((element) => {
      if (element.module.id == moduleId) {
        setmoduleName(element.module.module_name);
      }
    });
  }

  useEffect(() => {
    const moduleViewData = new FormData();
    moduleViewData.append("course_id", courseId);
    moduleViewData.append("module_id", moduleId);

    CourseViewModel.getModuleView(moduleViewData).then((res) => {
      //// console.log("module view = ",res);
      let percontentsec = 0;

      let courseTimeInHour = res?.data?.courseData?.total_training_hour;
      let courseTimeInSec = courseTimeInHour * 60 * 60;
      let percentage = 0;
      let currentModuleMaxSec = 0;
      if (res?.data?.allContentInModule > 0) {
        percontentsec = parseInt(
          courseTimeInSec / res?.data?.allContentInCourse
        );
        currentModuleMaxSec = percontentsec * res?.data?.allContentInModule;
        // let curModuleViewSec = res?.data?.moduleViewesCount;
        let curModuleViewSec = res?.data?.curModuleViews;
        percentage = 0;
        console.log(curModuleViewSec);
        console.log(currentModuleMaxSec);
        if (currentModuleMaxSec > curModuleViewSec) {
          percentage = parseInt((curModuleViewSec / currentModuleMaxSec) * 100);
          console.log(percentage);
        } else {
          percentage = 100;
          settotalTimeLeft(0);
        }
        settotalTimeLeft(100 - percentage);

        // setPercentCompleted(percentage);
      }
    });
    calculateTimeLeftforCurrentModule();
  }, [courseId,moduleId]);
  
  useEffect(() => {
    console.log(totalTimeLeft);
  
   
  }, [totalTimeLeft])
  

  return (
    <div class="container-1 sticky-side-bar course-chapter-sidebar">
      <div className="sidebar__logo">
        <img alt="" src="/admin-images/logo.png"  />
        <small>Knowledge Transfer</small>
      </div>
      <div className="sidebar_thumnail">
        {profile.role != "trainer" && profile.role != "admin"  ? (
          <div className="image-overlay">
            <p className="overlay-text">{moduleName}</p>
            <div class="overlay-progress-bar">
              <div
                style={{
                  width: "60%",
                  border: "1px solid #fff",
                  borderRadius: "12px",
                }}
              >
                <span style={{ width: 100 - totalTimeLeft + "%" }}></span>
              </div>
              <small>{totalTimeLeft}% Left</small>
            </div>
          </div>
        ) : (
          ""
        )}

        <img alt="" style={{width:"100%",height:"8rem"}} src={bannerUrl != null ? bannerUrl :"/trainee-images/course-bannner.png"}  />
      </div>
      <div className="chapter-list-container">
        <ul className="chapter-list-root">
          {chapters.map((element, index) => {
            return element.module?.id == moduleId ? (
              <Chaptersidebarlist
                moduleId={moduleId}
                name={element.title}
                courseId={element.course_id}
                chapterId={element.id}
                status={element.status}
                profile={profile}
                chapterOrder={element.order}
              />
            ) : (
              ""
            );
          })}
          {/* <li class="chapter-name active">Anatomy of Heart</li>
                <li class="chapter-name active">Cardiac Diseases</li>
                <li class="chapter-name">Cardiac Diseases</li>
                <li class="chapter-name">Diagnostic Procedures
</li> */}
        </ul>
      </div>
    </div>
  );
}

export default Chaptersidebar;
