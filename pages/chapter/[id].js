import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import moduleModel from "../../model/module.model";
import contentModel from "../../model/content.model";
import Link from 'next/link';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import AppContext from '../../lib/appContext';
import Checktimer from '../../components/checkTimer';
import CourseViewModel from "../../model/cource_view.model";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { Player } from 'video-react';
const topicpage = () => {
    const [nextContent, setNextContent] = useState([]);
    const [prevContent, setPrevContent] = useState([]);
    const [curContent, setCurContent] = useState([]);
    const [moduleId, setModuleId] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [contentUrl, setContentUrl] = useState(null);
    const [chapterId, setChapterId] = useState(null);
    const [curExt, setCurExt] = useState("");
    const router = useRouter();
    const layoutValues = useContext(AppContext);
    const QueryParam = router.query;
    QueryParam.page = router.query.page || 1;
    //const { data: contentData, mutate: loadContent, error, isLoading } = useSWR("contentData", async () => await contentModel.detail(QueryParam?.id), config.swrConfig);
    const [contentData, setContentData] = useState([]);
    const loadContent = function () {
        setContentData([]);
        if (QueryParam.id !== undefined) {
            contentModel.detail(QueryParam?.id).then((res) => {
                console.log(res)
                setContentData(res);
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    useEffect(() => {
        loadContent();
    }, [QueryParam?.id])
    const [showDocs, setShowDocs] = useState("d-none");
    const [showNextChapter, setShowNextChapter] = useState(false);
    useEffect(() => {
        setShowDocs("d-none");
        setNextContent([]);
        setPrevContent([]);
        setContentUrl(null);
        if (contentData?.data !== undefined) {
            //console.log("contentData?.data", contentData?.data);
            setModuleId(contentData?.data?.module_id);
            setCurContent(contentData?.data);
            //setContentUrl("https://qrstaff.s3.ap-south-1.amazonaws.com/1/Courses/1674902660851.pdf");
            setContentUrl(contentData?.data?.file_url);
            if (contentData?.data?.file_url) {
                const fileNameAr = contentData?.data?.file_url.split('.');
                const fileExt = fileNameAr[fileNameAr.length - 1];
                setCurExt(fileExt)
                if (fileExt != "mp4") {
                    setShowDocs("");
                }
            }
            //console.log(contentData?.data?.file_url);
            contentModel.list({ module_id: contentData?.data?.module_id }).then((res) => {
                //console.log("contents - ", res.data);
                if ((res?.data).length > 1) {
                    var i = 0;
                    res?.data.map((item, index) => {
                        if (item.id == QueryParam?.id) {
                            setChapterId(item.id);
                            if (i > 0) {
                                //console.log("prev");
                                setPrevContent({ id: res?.data?.[i - 1]?.id, sequence_no: res?.data?.[i - 1]?.sequence_no, title: res?.data?.[i - 1]?.title });
                            }
                            if (typeof res?.data?.[i + 1] !== 'undefined') {
                                //console.log("sequece = ", res?.data?.[i + 1]?.sequence_no)
                                setNextContent({ id: res?.data?.[i + 1]?.id, sequence_no: res?.data?.[i + 1]?.sequence_no, title: res?.data?.[i + 1]?.title });
                            }
                        }
                        i++;
                    });
                }
            }).catch((error) => {
                console.log(error);
            });


            //document.getElementById("video1").muted = false; 

            moduleModel.detail(contentData?.data?.module_id).then((res) => {
                //console.log("module", res.data);
                setCourseId(res?.data?.course_id);
                //console.log("prev=", prevContent.length);
                //console.log("next=", nextContent.length);
            }).catch((error) => {
                console.log("module error", error);
            });
            const chapterForm = new FormData();
            //console.log("chapter id", contentData?.data?.id)
            if (layoutValues?.profile?.role == 'trainee') {
                chapterForm.append("chapter_id", contentData?.data?.id);
                CourseViewModel.getChapterViewData(chapterForm).then((chapterRes) => {
                    if (chapterRes !== null) {
                        if (chapterRes?.data?.status === "completed") {
                            setShowNextChapter(true);
                        }
                    }
                    //console.log("chapterRes", chapterRes);
                });
            } else {
                setShowNextChapter(true);
            }

        }
    }, [contentData, QueryParam?.id]);

    const contentLink = function () {
        helper.sweetalert.warningToast("Please complete current chapters.");
    }

    useEffect(() => {
        setChapterId(QueryParam?.id);
        //console.clear();
        let apiUpdateCounter = 1;
        // console.log("CourseId = ", courseId);
        // console.log("moduleId = ", moduleId);
        // console.log("chapterId = ", chapterId);
        const handleExit = function () {
            clearInterval(myTimer);
        }
        //console.log("inside");
        const myTimer = setInterval(function () {
            //console.log("inside sec");
            if ((apiUpdateCounter % process.env.NEXT_PUBLIC_TIMEOUT_UPDATE_SECOND) == 0) {
                // console.log("inside tim");
                // console.log("CourseId = ", courseId);
                // console.log("moduleId = ", moduleId);
                // console.log("chapterId = ", chapterId);
                if (courseId != null && moduleId != null && chapterId != null) {
                    const courseFormData = new FormData();
                    courseFormData.append("course_id", courseId);
                    courseFormData.append("module_id", moduleId);
                    courseFormData.append("chapter_id", chapterId);
                    courseFormData.append("viewed_seconds", process.env.NEXT_PUBLIC_TIMEOUT_UPDATE_SECOND);
                    CourseViewModel.create(courseFormData).then((res) => {
                        console.log("course view create result", res.data);
                        if (res?.data?.curChapterViewSeconds >= res?.data?.perContentSecond) {
                            setShowNextChapter(true);
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            }
            apiUpdateCounter++;
        }, 1000);
        return () => handleExit();

    }, [courseId, moduleId, chapterId]);
    return (
        <>
            {/* {courseId &&
                <Checktimer startTimer={true} courseId={courseId} moduleId={moduleId} chapterId={QueryParam?.id} />
            } */}

            <div className="content-header d-flex gap-3 align-items-center">
                {(layoutValues?.profile?.role == 'trainee') &&
                    <Link href={`/courses/${courseId}`}>
                        <div className="left-icon">
                            <i className="fa fa-chevron-left go-left-icon" aria-hidden="true"></i>
                        </div>
                    </Link>
                }

                {(layoutValues?.profile?.role != 'trainee') &&
                    <Link href={`/courses/${courseId}/update_status`}>
                        <div className="left-icon">
                            <i className="fa fa-chevron-left go-left-icon" aria-hidden="true"></i>
                        </div>
                    </Link>
                }
                <div className="icon-detail">
                    <h6>Course Outcome</h6>
                </div>
            </div>

            <div className="body-content">
                <div className="body-heading" style={{ padding: 'unset', textShadow: 'unset' }}>
                    <span style={{ padding: 'unset', fontWeight: '400' }}>{curContent?.title}</span>
                </div>

                <div className="body-paragraph">
                    <p>{curContent?.paragraph1}
                    </p>

                    <p>{curContent?.paragraph2}</p>
                </div>

                <div className="presentation">
                    {
                        (() => {
                            if (curExt != "") {
                                if (curExt == "mp4") {
                                    return (
                                        <div key={Math.random()}>
                                            <Player>
                                                <source src={curContent?.file_url} />
                                            </Player>
                                        </div>
                                        // <video controls muted autoplay id='video1' style={{ height: '500px', width:'56vw' }}><source src={curContent?.file_url} /></video>
                                    );
                                }
                            }
                        })()
                    }
                    {curContent?.file_url &&
                        <div key={Math.random()} className={showDocs}>
                            <DocViewer
                                pluginRenderers={DocViewerRenderers}
                                documents={
                                    [
                                        { uri: contentUrl }
                                    ]
                                }
                                config={{
                                    header: {
                                        disableHeader: true,
                                        disableFileName: true,
                                        retainURLParams: false
                                    }
                                }}
                                style={{ height: 500 }}
                            />
                        </div>
                    }
                </div>

                <div className="body-paragraph">
                    <p>{curContent?.paragraph3}</p>
                </div>
            </div>

            <div className="section2topic" style={{ border: '1px solid rgba(0, 0, 0, 0.212)' }}>
                <div className="blank"></div>
                <div className="trainee-footer">
                    <div className="trainee-footer-left d-flex">
                        {prevContent?.title &&
                            <>
                                <a href={`/chapter/${prevContent?.id}`}>
                                    <i className="fa fa-arrow-left footer-icon text-light" aria-hidden="true"></i>
                                </a>

                                <div className="icon-content-1">
                                    <a href={`/chapter/${prevContent?.id}`}>
                                        <p>PREVIOUS</p>
                                    </a>
                                    <span>Chapter {prevContent?.sequence_no} - {prevContent?.title}</span>
                                </div>
                            </>
                        }
                    </div>
                    <div className="trainee-footer-right d-flex">
                        {nextContent?.title &&
                            <>
                                {showNextChapter ?
                                    (
                                        <>
                                            <div className="icon-content-2">
                                                <a href={`/chapter/${nextContent?.id}`}>
                                                    <p>NEXT</p>
                                                </a>
                                                <span>Chapter {nextContent?.sequence_no} - {nextContent?.title}</span>
                                            </div>
                                            <a href={`/chapter/${nextContent?.id}`}>
                                                <i className="fa fa-arrow-right footer-icon text-light" aria-hidden="true"></i>
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <div className="icon-content-2" onClick={() => contentLink()}>
                                                <a>
                                                    <p>NEXT</p>
                                                </a>
                                                <span>Chapter {nextContent?.sequence_no} - {nextContent?.title}</span>
                                            </div>
                                            <a onClick={() => contentLink()}>
                                                <i className="fa fa-arrow-right footer-icon text-light" aria-hidden="true"></i>
                                            </a>
                                        </>
                                    )

                                }

                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default topicpage;