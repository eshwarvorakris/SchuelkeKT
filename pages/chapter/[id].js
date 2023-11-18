import ReadChapterLayout from "../../components/readChapterLayout";
import useSWR, { mutate } from "swr";
import Chapternavbar from "../../components/chapternavbar";
import Chaptersidebar from "../../components/chaptersidebar";
// import Imageplayer from "./component/imageplayer";
import Documentviewer from "../admin/component/documentsviewer";
// import DocumentViewer from "../components/DocumentViewer";
import contentModel from "../../model/content.model";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CourseViewModel from "../../model/cource_view.model";
import Link from "next/link";
import courseModel from "../../model/course.model";
import AppContext from "../../lib/appContext";
import { Player } from "video-react";
function ChapterInfo() {
  const layoutValues = useContext(AppContext);
  const [modal, setModal] = useState("");
  const [carouselModal, setCarouselModal] = useState("");
  const [content, setContent] = useState(null);
  const [extension, setExtension] = useState("");
  const [chapterList, setChapterList] = useState([]);
  const [chapterStatus, setChapterStatus] = useState(null);
  const [courseData, setcourseData] = useState(null);
  const [moduleId, setmoduleId] = useState(null);
  const [courseId, setcourseId] = useState(null);
  const [showNextChapter, setShowNextChapter] = useState(false);
  const [secondsPerModule, setsecondsPerModule] = useState(0);
  const [nextContent, setNextContent] = useState(null);
  const [prevContent, setPrevContent] = useState(null);
  const [moduleName, setmoduleName] = useState("");
  const [profile, setprofile] = useState(null);
  const [timer, settimer] = useState(null);
  const router = useRouter();
  const chapterId = router.query?.id || 1;
  function handleModalSwitch(event, data) {
    modal == "" ? setModal("active") : setModal("");
  }

  function handleCarouselModalSwitch(event, data) {
    carouselModal == "" ? setCarouselModal("active") : setCarouselModal("");
  }

  async function getModuleStatus(moduleId, courseId, chapterId) {
    const chapterForm = new FormData();
    chapterForm.append("module_id", moduleId);
    chapterForm.append("course_id", courseId);
    chapterForm.append("chapter_id", chapterId);
    const response = await CourseViewModel.getChapterView(chapterForm);
    return response.data;
  }

  function getUserProfile() {
    let tempProfile = JSON.parse(sessionStorage.getItem("userinfo"));
    setprofile(tempProfile);
    return tempProfile;
  }
  async function getChapterInfo() {
    try {
      const response = await contentModel.detail(chapterId);

      if (response?.data != undefined) {
        const chapterStatus = await getModuleStatus(
          response.data.module_id,
          response.data.course_id,
          chapterId
        );
        setChapterStatus(chapterStatus);

        if (
          chapterStatus.isCurrentChapterLocked == false ||
          profile.role == "trainer"
        ) {
          setContent(response.data);

          setExtension(
            response.data.file_url.split(".")[
              response.data.file_url.split(".").length - 1
            ]
          );

          
          setViewsSeconds(
            response.data.course_id,
            response.data.module_id,
            chapterId
          );
          getChapterViewData(chapterId);

          setmoduleId(response.data.module_id);
          setcourseId(response.data.course_id);
        } else {
          setContent(null);
          // router.back();
        }

        return response.data.course_id;
      }
    } catch (error) {}
  }

  async function getModules(course_id, order, module_id) {
    try {
      // const response = await courseModel.modules(course_id,'order_by=sequence_no&order_in=asc');
      const response = await contentModel.list();
      setChapterList(response.data);

      if ((response?.data).length > 1) {
        var i = 0;
        let nextPageStatus = false;
        let previousPageStatus = false;
        response?.data.map((item, index) => {
          // console.log(module_id);
          if (item.module_id === module_id) {
            // if (item.sequence_no < order && previousPageStatus == false) {
            //   setPrevContent(item);
            //   previousPageStatus = true;
            // }
            // if (item.sequence_no > order && nextPageStatus == false) {
            //   setNextContent(item);
            //   nextPageStatus = false;
            // }

            if (item.sequence_no == order - 1) {
              setPrevContent(item);
            
            }
            if (item.sequence_no == order + 1) {
              setNextContent(item);
           
            }
            // if (typeof response?.data?.[i + 1] !== 'undefined') {
            //     //// console.log("sequece = ", response?.data?.[i + 1]?.sequence_no)
            //     setNextContent(response?.data?.[i + 1]?.id);
            // }
          }
          i++;
        });
      }
    } catch (error) {}
  }

  function setViewsSeconds(course_id, module_id, chapter_id) {
    const apiTimer = setInterval(async () => {
      const courseFormData = new FormData();
      courseFormData.append("course_id", course_id);
      courseFormData.append("module_id", module_id);
      courseFormData.append("chapter_id", chapter_id);
      courseFormData.append(
        "viewed_seconds",
        process.env.NEXT_PUBLIC_TIMEOUT_UPDATE_SECOND
      );
      await CourseViewModel.create(courseFormData);
    }, 30000);

    settimer(apiTimer);
  }

  async function courseDetail(course_id) {
    try {
      const response = await courseModel.detail(course_id);
      // setcourseData(response.data);
      calculatetimePermodule(
        response.data.total_training_hour,
        response.data.total_modules
      );
    } catch (error) {
      // console.log(error);
    }
  }

  async function getChapterViewData(chapterId) {
    const chapterForm = new FormData();
    if (profile?.role == "trainee") {
      chapterForm.append("chapter_id", chapterId);
      CourseViewModel.getChapterViewData(chapterForm).then((chapterRes) => {
        if (chapterRes !== null) {
          if (chapterRes?.data?.status === "completed") {
            setShowNextChapter(true);
          }
        }
        //// console.log("chapterRes", chapterRes);
      });
    } else {
      // setShowNextChapter(true);
    }
  }

  async function calculatetimePermodule(totalCourseTime, totalModules) {
    const totalcourseSeconds = Math.floor(totalCourseTime * 3600);
    setsecondsPerModule(totalcourseSeconds / totalModules);
  }

  useEffect(() => {
    const user = getUserProfile();

    return () => {};
  }, []);

  useEffect(() => {
    // console.log(timer);

    return () => {
      clearInterval(timer);
    };
  }, [timer]);


  useEffect(() => {
    
    if(content != null)
    {
      getModules(
        content.course_id,
        content.sequence_no,
        content.module_id
      );
    }
  
    return () => {
      
    }
  }, [content])
  

  useEffect(() => {
    getChapterInfo().then((res) => {
      // console.log(res);
      if (res != undefined) {
        courseDetail(res);
      }
    });
  }, [chapterId,  profile]);

  return content == null ? (
    <>Loading..</>
  ) : (
    <>
      <div>
        <Chaptersidebar
          chapters={chapterList}
          moduleId={content.module_id}
          secondsPerModule={secondsPerModule}
          courseId={content.course_id}
          profile={profile}
          chapterOrder={content.order}
          bannerUrl={content.banner_url}
        />
        <main class="course-page-main-content">
          <div className={"player-modal " + modal}>
            {modal == "active" ? (
              <Documentviewer
                modalSwitch={handleModalSwitch}
                file={content.file_url}
              />
         
            ) : (
              ""
            )}
          </div>
          <div className={"player-modal " + carouselModal}>
            {carouselModal == "active" ? (
              <img alt=""player
                modalSwitch={handleCarouselModalSwitch}
                images={[
                  content.carousel_image_one,
                  content.carousel_image_two,
                  content.carousel_image_three,
                  content.carousel_image_four,
                  content.carousel_image_five,
                ]}
              />
            ) : (
              ""
            )}
          </div>
          <Link
            href={"/courses/" + content.course_id}
            className="course-page-main-content__header d-flex gap-3 align-items-center links"
          >
            <img
              src="data:image/svg+xml,%3Csvg width='39' height='39' viewBox='0 0 39 39' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='19.5' cy='19.5' r='19.5' fill='%23F4F4F4'/%3E%3Cpath d='M18 13L14.5 16.5L11 20H27' stroke='%23565656' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18 27L14.5 23.5L11 20H27' stroke='%23565656' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A"
              alt=""
            />

            <h4>Course Outcome</h4>
          </Link>

          <div className="main-content_banner">
            <div className="main-content_banner__overlay">
              <h3 class="w-75">{content.title}</h3>
            </div>
            <img src={content.banner_url != null ? content.banner_url : "/trainee-images/course-bannner.png"} height="250" alt="" />
          </div>

          <div className="chapter-content-area">
            <h2 className="title">{content.title}</h2>
            <p>{content.paragraph1}</p>
            <p>{content.paragraph2}</p>
            <br />

            {/* <img alt=""player modalSwitch={handleModalSwitch}/> */}
            {content.file_url != "" && content.file_url != null  ? (
              <div>
                {/* {extension == "ppt" || extension == "pptx" ? <iframe src={"https://docs.google.com/gview?url="+content.file_url+"&embedded=true"}  frameborder="0">
        </iframe> : <Documentviewer modalSwitch={handleModalSwitch} file={content.file_url}/>} */}
                {extension == "mp4" ? (
                  <Player>
                    <source src={content?.file_url} />
                  </Player>
                ) : (
                  <Documentviewer
                    modalSwitch={handleModalSwitch}
                    file={content?.file_url}
                  />
                  // <object
                  // <iframe />
                  // <DocViewer documents={[
                  //   { uri:content?.file_url  }]} pluginRenderers={DocViewerRenderers} />
                )}
                {/* <Documentviewer modalSwitch={handleModalSwitch} file={content.file_url}/> */}
                {/* <iframe src="https://docs.google.com/gview?url=https://betaschulke.s3.ap-south-1.amazonaws.com/demo.pptx&embedded=true"  frameborder="0">
        </iframe> */}
              </div>
            ) : (
              ""
            )}
            <br />
            {content.content_video != null ? (
              <div>
                <Player>
                  <source src={content?.content_video} />
                </Player>
              </div>
            ) : (
              ""
            )}
            <br />

            <p>{content.paragraph3}</p>

            {content.carousel_image_one != null ||
            content.carousel_image_two != null ||
            content.carousel_image_three != null ||
            content.carousel_image_four != null ||
            content.carousel_image_five != null ? (
              <>
                <img alt=""player
                  modalSwitch={handleCarouselModalSwitch}
                  images={[
                    content.carousel_image_one,
                    content.carousel_image_two,
                    content.carousel_image_three,
                    content.carousel_image_four,
                    content.carousel_image_five,
                  ]}
                />
              </>
            ) : (
              ""
            )}

            <div className="row my-5">
              <div className="col-lg-12">
                {content.dos.length > 0 ?<ul class="list-group list-group-flush">
                  <li class="list-group-item text-primary">
                    Do's
                  </li>
                  {
                    content.dos.map((result,index)=>{
                      return <li key={`dos${index}`} class="list-group-item border-0"><img src="data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_24_214)'%3E%3Cpath d='M9 0C4.0372 0 0 4.0372 0 9C0 13.9628 4.0372 18 9 18C13.9628 18 18 13.9628 18 9C18 4.0372 13.9628 0 9 0Z' fill='%23007CC2'/%3E%3Cpath d='M13.5615 7.09296L8.68642 11.9679C8.54016 12.1141 8.34818 12.1877 8.15619 12.1877C7.9642 12.1877 7.77222 12.1141 7.62596 11.9679L5.18851 9.53041C4.89517 9.23721 4.89517 8.76315 5.18851 8.46996C5.4817 8.17662 5.95563 8.17662 6.24896 8.46996L8.15619 10.3772L12.501 6.0325C12.7942 5.73917 13.2681 5.73917 13.5615 6.0325C13.8547 6.3257 13.8547 6.79962 13.5615 7.09296Z' fill='%23FAFAFA'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_24_214'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A" alt="" /> {result.title}</li>

                    })
                  }
                  
                </ul> : ''}
              </div>
              <div className="col-lg-12 mt-5">
                {content.donts.length > 0 ? <ul class="list-group list-group-flush">
                  <li class="list-group-item text-primary">
                    Don'ts
                  </li>
                  {
                    content.donts.map((result,index)=>{
                      return <li key={`donts${index}`} class="list-group-item border-0"> <img src="data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_24_214)'%3E%3Cpath d='M9 0C4.0372 0 0 4.0372 0 9C0 13.9628 4.0372 18 9 18C13.9628 18 18 13.9628 18 9C18 4.0372 13.9628 0 9 0Z' fill='%23007CC2'/%3E%3Cpath d='M13.5615 7.09296L8.68642 11.9679C8.54016 12.1141 8.34818 12.1877 8.15619 12.1877C7.9642 12.1877 7.77222 12.1141 7.62596 11.9679L5.18851 9.53041C4.89517 9.23721 4.89517 8.76315 5.18851 8.46996C5.4817 8.17662 5.95563 8.17662 6.24896 8.46996L8.15619 10.3772L12.501 6.0325C12.7942 5.73917 13.2681 5.73917 13.5615 6.0325C13.8547 6.3257 13.8547 6.79962 13.5615 7.09296Z' fill='%23FAFAFA'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_24_214'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A" alt="" /> {result.title}</li>

                    })
                  }
                </ul> : ''}
              </div>
            </div>

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
                        <span className="btn-value">
                          {prevContent.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  ""
                )}

                {(nextContent != null && showNextChapter != false) || (profile.role == 'trainer' && nextContent != null) ? (
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
                        <span className="btn-value">
                          {nextContent.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </main>
        <Chapternavbar profile={profile} />
      </div>
    </>
  );
}

ChapterInfo.getLayout = function getLayout(page) {
  return <ReadChapterLayout>{page}</ReadChapterLayout>;
};
export default ChapterInfo;
