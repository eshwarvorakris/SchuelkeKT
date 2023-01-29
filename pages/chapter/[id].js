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
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
const topicpage = () => {
    const [nextContent, setNextContent] = useState([]);
    const [prevContent, setPrevContent] = useState([]);
    const [curContent, setCurContent] = useState([]);
    const [moduleId, setModuleId] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [contentUrl, setContentUrl] = useState(null);

    const router = useRouter();
    const QueryParam = router.query;
    QueryParam.page = router.query.page || 1;
    const { data: contentData, mutate: loadContent, error, isLoading } = useSWR(QueryParam?.id, async () => await contentModel.detail(QueryParam?.id), config.swrConfig);

    useEffect(() => {
        setNextContent([]);
        setPrevContent([]);
        setContentUrl(null);
        if (contentData?.data !== undefined) {
            setModuleId(contentData?.data?.module_id);
            setCurContent(contentData?.data);
            //setContentUrl("https://qrstaff.s3.ap-south-1.amazonaws.com/1/Courses/1674902660851.pdf");
            setContentUrl(contentData?.data?.file_url);
            contentModel.list({ module_id: contentData?.data?.module_id }).then((res) => {
                //console.log("contents - ", res.data);
                if ((res?.data).length > 1) {
                    var i = 0;
                    res?.data.map((item, index) => {
                        if (item.id == QueryParam?.id) {
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

            moduleModel.detail(contentData?.data?.module_id).then((res) => {
                console.log("module", res.data);
                setCourseId(res?.data?.course_id)
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [contentData, QueryParam?.id]);
    return (
        <>

            <div className="content-header d-flex gap-3 align-items-center">
                <Link href={`/courses/${courseId}`}>
                    <div className="left-icon">
                        <i className="fa fa-chevron-left go-left-icon" aria-hidden="true"></i>
                    </div>
                </Link>
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

                <div className="presentation" style={{marginLeft:'-9rem', marginRight:'-9rem'}}>
                    {/* <img src="/trainee-images/topic-page/Rectangle 721.png" alt="" /> */}
                    {curContent?.file_url &&
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
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default topicpage;