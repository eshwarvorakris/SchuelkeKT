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
const topicpage = () => {
    const [nextContent, setNextContent] = useState([]);
    const [prevContent, setPrevContent] = useState([]);
    const [curContent, setCurContent] = useState([]);
    const router = useRouter();
    const QueryParam = router.query;
    QueryParam.page = router.query.page || 1;
    const { data: contents, mutate: contentList, error, isLoading } = useSWR(QueryParam?.module, async () => await contentModel.list({ module_id: QueryParam?.module }), config.swrConfig);
    useEffect(() => {
        setNextContent([]);
        setPrevContent([]);
        if (contents?.data !== undefined) {
            setCurContent(contents?.data?.[0]);
            if ((contents?.data).length > 1) {
                var i = 0;
                contents?.data.map((item, index) => {
                    if (item.id == QueryParam?.id) {
                        setCurContent(item);
                        if (i > 0) {
                            setPrevContent({ id: contents?.data?.[i - 1]?.id, sequence_no: contents?.data?.[i - 1]?.sequence_no, title: contents?.data?.[i - 1]?.title });
                        }
                        if (typeof contents?.data?.[i + 1] !== 'undefined') {
                            console.log("sequece = ", contents?.data?.[i + 1]?.sequence_no)
                            setNextContent({ id: contents?.data?.[i + 1]?.id, sequence_no: contents?.data?.[i + 1]?.sequence_no, title: contents?.data?.[i + 1]?.title });
                        }
                    }
                    i++;
                });
            }
        }
    }, [contents, QueryParam?.id]);
    return (
        <>
            <form>
                <div class="content-header d-flex gap-3 align-items-center">
                    <Link href={`/courses/${QueryParam?.course}`}>
                        <div class="left-icon">
                            <i class="fa fa-chevron-left go-left-icon" aria-hidden="true"></i>
                        </div>
                    </Link>
                    <div class="icon-detail">
                        <h6>Course Outcome</h6>
                    </div>
                </div>

                <div class="body-content">
                    <div class="body-heading" style={{ padding: 'unset', textShadow: 'unset' }}>
                        <span style={{ padding: 'unset', fontWeight: '400' }}>{curContent?.title}</span>
                    </div>

                    <div class="body-paragraph">
                        <p>{curContent?.paragraph1}
                        </p>

                        <p>{curContent?.paragraph2}</p>
                    </div>

                    <div class="presentation">
                        <img src="/trainee-images/topic-page/Rectangle 721.png" alt="" />
                    </div>

                    <div class="body-paragraph">
                        <p>{curContent?.paragraph3}</p>
                    </div>
                </div>

                <div class="section2topic" style={{ border: '1px solid rgba(0, 0, 0, 0.212)' }}>
                    <div class="blank"></div>
                    <div class="trainee-footer">
                        <div class="trainee-footer-left d-flex">
                            {prevContent?.title &&
                                <>
                                    <Link href={`/chapter/${prevContent?.id}?course=${QueryParam?.course}&module=${QueryParam?.module}`}>
                                        <i className="fa fa-arrow-left footer-icon text-light" aria-hidden="true"></i>
                                    </Link>

                                    <div class="icon-content-1">
                                        <Link href={`/chapter/${prevContent?.id}?course=${QueryParam?.course}&module=${QueryParam?.module}`}>
                                            <p>PREVIOUS</p>
                                        </Link>
                                        <span>Chapter {prevContent?.sequence_no} - {prevContent?.title}</span>
                                    </div>
                                </>
                            }
                        </div>
                        <div class="trainee-footer-right d-flex">
                            {nextContent?.title &&
                                <>
                                    <div class="icon-content-2">
                                        <Link href={`/chapter/${nextContent?.id}?course=${QueryParam?.course}&module=${QueryParam?.module}`}>
                                            <p>NEXT</p>
                                        </Link>
                                        <span>Chapter {nextContent?.sequence_no} - {nextContent?.title}</span>
                                    </div>
                                    <Link href={`/chapter/${nextContent?.id}?course=${QueryParam?.course}&module=${QueryParam?.module}`}>
                                        <i className="fa fa-arrow-right footer-icon text-light" aria-hidden="true"></i>
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
export default topicpage;