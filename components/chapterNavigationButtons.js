import React, { useState } from "react";
import contentModel from "../model/content.model";
import CourseViewModel from "../model/cource_view.model";
import moduleModel from "../model/module.model";
import { useEffect } from "react";
import cource_viewModel from "../model/cource_view.model";
import Link from "next/link";

const ChapterNavigationButtons = ({ content }) => {
  const [chapterList, setChapterList] = useState([]);
  const [showNextChapter, setShowNextChapter] = useState(false);
  const [secondsPerModule, setsecondsPerModule] = useState(0);
  const [nextContent, setNextContent] = useState(null);
  const [prevContent, setPrevContent] = useState(null);
  const [nextContentSTatus, setnextContentSTatus] = useState(false)
  const [isLastChapter, setisLastChapter] = useState(false);
  const [prevModule, setPrevModule] = useState(null);
  const [nextModule, setNextModule] = useState(null);
  const [isLastModule, setisLastModule] = useState(false);
  const [profile, setprofile] = useState(null);
  const [assesmentStatus, setassesmentStatus] = useState(false)

  async function getModules(course_id, order, module_id) {
    try {
      // const response = await courseModel.modules(course_id,'order_by=sequence_no&order_in=asc');
      const response = await contentModel.list();
      //   setChapterList(response.data);

      if ((response?.data).length > 1) {
        var i = 0;
        let nextPageStatus = false;
        let previousPageStatus = false;
        response?.data.map((item, index) => {

          if (item.module_id === content.module_id) {
            // if (item.sequence_no < order && previousPageStatus == false) {
            //   setPrevContent(item);
            //   previousPageStatus = true;
            // }
            // if (item.sequence_no > order && nextPageStatus == false) {
            //   setNextContent(item);
            //   nextPageStatus = false;
            // }

            if (item.sequence_no == content.sequence_no - 1) {
              setPrevContent(item);
            }
            if (item.sequence_no == content.sequence_no + 1) {
              setNextContent(item);
            }
          
          }
          i++;
        });
      }
    } catch (error) {}
  }

  useEffect(() => {
    // const response = await courseModel.modules(course_id,'order_by=sequence_no&order_in=asc');

    const callingasyncfunction = async () => {
      const response = await contentModel.list();
      setChapterList(response.data);
      let countChapter = 0;
      if ((response?.data).length > 1) {
        var i = 0;
        let nextPageStatus = false;
        let previousPageStatus = false;

        response?.data.map(async (item, index) => {

          if (item.module_id === content?.module_id) {
            // if (item.sequence_no < order && previousPageStatus == false) {
            //   setPrevContent(item);
            //   previousPageStatus = true;
            // }
            // if (item.sequence_no > order && nextPageStatus == false) {
            //   setNextContent(item);
            //   nextPageStatus = false;
            // }

            if (item.sequence_no == content?.order - 1) {
              setPrevContent(item);
            }
                
            if (item.sequence_no == content?.order + 1) {

   
                
             
                    
                    setNextContent(item);

               
            }

            if (content.module_id == item.module_id) {
              countChapter++;
            }

          
          }
          i++;
        });
      }


      if(content.sequence_no <= 1)
      {
        const modulesList = await moduleModel.list();
        const currentModule = await moduleModel.detail(content.module_id);
        let moduleCount = 0;
        if(currentModule.data.sequence_no > 1)
        {
            modulesList?.data.map((result, index) => {
                if (result.course_id == content.course_id) {
                  
                  if (result.sequence_no == currentModule?.data.sequence_no - 1) {
                
                    response?.data.map((chapter) => {
                      if (
                        chapter.module_id == result.id &&
                        chapter.sequence_no >= 1
                      ) {
                        setPrevModule(chapter);
                      }
                    });
                  }
      
                  moduleCount++;
                }
              });
        }
        
      }


    //   condition for last chapter of modules
      if (content.sequence_no >= countChapter) {
        setisLastChapter(true);
        const modulesList = await moduleModel.list();
        const currentModule = await moduleModel.detail(content.module_id);
        let moduleCount = 0;
        modulesList?.data.map(async (result, index) => {
          if (result.course_id == content.course_id) {
            if (result.sequence_no >= currentModule?.data.sequence_no + 1) {
              response?.data.map(async (chapter) => {
                if (
                  chapter.module_id == result.id &&
                  chapter.sequence_no <= 1
                ) {
                    const chapterForm = new FormData();
                chapterForm.append("chapter_id", content?.id);
                const contentStatus = await cource_viewModel.getChapterViewData(chapterForm);


                if(contentStatus.data.status == 'completed' || profile?.role == 'admin' || profile?.role == 'trainer')
                {
                    setNextModule(chapter);

                }
        
                else
                {
                  setNextModule(null);

                }
                }
              });
            }

            moduleCount++;
          }
        });

        if (currentModule.data.sequence_no >= moduleCount || moduleCount == 1) {

            const contentStatus = 
          setisLastModule(true);


        }
      }



      const chapterForm = new FormData();

      if (profile?.role == "trainee") {
        chapterForm.append("chapter_id", content.id);

        CourseViewModel.getChapterViewData(chapterForm).then((chapterRes) => {
          if (chapterRes !== null) {
            if (chapterRes?.data?.status === "completed") {
              setShowNextChapter(true);
            }
          }
   
        });
      }
    };
    callingasyncfunction();

    return () => {};
  }, [content,profile]);

  useEffect(() => {
   const asyncFunction = async()=>{
    if(nextContent != null)
    {
        const chapterForm = new FormData();
        chapterForm.append("module_id", nextContent.module_id);
        chapterForm.append("course_id", nextContent.course_id);
        chapterForm.append("chapter_id", nextContent.id);
        chapterForm.append("chapter_order", nextContent.sequence_no);
        const response = await CourseViewModel.getChapterView(chapterForm);
        if(response.data.isCurrentChapterLocked == false)
        {
            setnextContentSTatus(true);
        }
    }
    
   }

   asyncFunction()
   
  }, [nextContent])
  
  
  

  useEffect(() => {
    let tempProfile = JSON.parse(sessionStorage.getItem("userinfo"));
    setprofile(tempProfile);

    return () => {};
  }, []);

  useEffect(() => {
    const asyncFunction = async () =>{
        if(isLastChapter ==  true && isLastModule == true)
        {
            const chapterForm = new FormData();
        chapterForm.append("module_id", content.module_id);
        chapterForm.append("course_id", content.course_id);
        chapterForm.append("chapter_id", content.id);
        chapterForm.append("chapter_order", content.sequence_no);
            let courseStatus = await cource_viewModel.getCourseViewData(chapterForm);

            if(courseStatus.data.totalCourseView?.status == 'completed')
            {
                setassesmentStatus(true)
            }
        
        }
    }
    asyncFunction()
    
  }, [content, isLastChapter,isLastModule])



  
  return (
    <div>
      {chapterList.length > 1 ? (
        <div className="footerNavigation-buttons">
          {prevContent != null ? (
            <Link className="links" href={"/chapter/" + prevContent.id}>
              <div className="footer-buttons-container">
                <span className="doc-controls-button">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.999 5L7.49902 8.5L3.99902 12H19.999"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.999 19L7.49902 15.5L3.99902 12H19.999"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <span className="btn-type">previous</span> <br />
                  <span className="btn-value">{prevContent.title}</span>
                </div>
              </div>
            </Link>
          ) : (prevModule != null ?  <Link className="links" href={"/chapter/" + prevModule.id}>
          <div className="footer-buttons-container">
            <span className="doc-controls-button">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.999 5L7.49902 8.5L3.99902 12H19.999"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.999 19L7.49902 15.5L3.99902 12H19.999"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <div>
              <span className="btn-type">previous</span> <br />
              <span className="btn-value">Module</span>
            </div>
          </div>
        </Link> :
            <div></div>
          )}

          {
          (profile.role == "trainer" && nextContent != null) ||
          (profile.role == "admin" && nextContent != null) ? (
            <Link className="links" href={"/chapter/" + nextContent.id}>
              <div className="footer-buttons-container next">
                <span className="doc-controls-button ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.001 5L16.501 8.5L20.001 12H4.00098"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.001 19L16.501 15.5L20.001 12H4.00098"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <span className="btn-type">Next</span> <br />
                  <span className="btn-value">{nextContent.title}</span>
                </div>
              </div>
            </Link>
          ) : (nextContent != null && isLastChapter == false && nextContentSTatus == true) ? (
            <Link href={"/chapter/" + nextContent.id} className="links">
              <div className="footer-buttons-container next">
                <span className="doc-controls-button ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.001 5L16.501 8.5L20.001 12H4.00098"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.001 19L16.501 15.5L20.001 12H4.00098"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <span className="btn-type">Next</span> <br />
                  <span className="btn-value">{nextContent.title}</span>
                </div>
              </div>
            </Link>
          ) : nextModule != null ? (<Link  href={"/chapter/" + nextModule.id}             
              className="links text-muted"
            >
              <div  className="footer-buttons-container next">
                <span className="doc-controls-button ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.001 5L16.501 8.5L20.001 12H4.00098"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.001 19L16.501 15.5L20.001 12H4.00098"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <span className="btn-type">Next</span> <br />
                  <span className="btn-value">Module</span>
                </div>
              </div>
            </Link>
          ) : (profile.role == 'trainer' || profile.role == 'admin' ? 
            <Link href={"/courses/"+content.course_id+"/quizzes"} className="links">
              <div className="footer-buttons-container next">
                <span className="doc-controls-button ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.001 5L16.501 8.5L20.001 12H4.00098"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.001 19L16.501 15.5L20.001 12H4.00098"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <span className="btn-type">Course</span> <br />
                  <span className="btn-value">Assesment</span>
                </div>
              </div>
            </Link> : (isLastChapter && isLastModule && assesmentStatus ==  true ? <Link href={"/courses/"+content.course_id+"/quizzes"} className="links">
              <div className="footer-buttons-container next">
                <span className="doc-controls-button ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.001 5L16.501 8.5L20.001 12H4.00098"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.001 19L16.501 15.5L20.001 12H4.00098"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <span className="btn-type">Course</span> <br />
                  <span className="btn-value">Assesment</span>
                </div>
              </div>
            </Link> : <div  className="links text-muted">
              <div className="footer-buttons-container next">
                <span className="doc-controls-button ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.001 5L16.501 8.5L20.001 12H4.00098"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.001 19L16.501 15.5L20.001 12H4.00098"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <span className="btn-type">Next</span> <br />
                  <span className="btn-value">Chapter</span>
                </div>
              </div>
            </div> )
          )}
        </div>
      ) : (
        "Next "
      )}
    </div>
  );
};

export default ChapterNavigationButtons;
