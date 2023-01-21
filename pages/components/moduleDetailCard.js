import moment from 'moment';
import Link from 'next/link';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import ChapterCard from "./chapterCard"
import contentModel from "../../model/content.model";
export default function moduleDetailCard({ moduleData, moduleIndex }) {
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "sequence_no";
  QueryParam.order_in = router.query?.order_in || "title";
  //QueryParam.content_type = "asc";
  const rand = 1 + Math.random() * (100 - 1);
  const moduleStatus = "ongoing";
  const { data: contents, mutate: contentList, error, isLoading } = useSWR(moduleData?.id, async () => await contentModel.list({ module_id: moduleData?.id}), config.swrConfig);
  //console.log(chapters);
  useEffect(() => {
    console.log("all chapters => ", contents?.data)
  }, [contents]);
  return (
    <>
      <div className="module-1">
        <div className="module-1-heading">
          <h5>Module {moduleIndex + 1}</h5>
        </div>

        <div className="body-heading" style={{ textShadow: 'unset', padding: '0rem 0rem 1rem 2rem', marginBottom: 'unset' }}>
          <span style={{ fontSize: '25px', padding: 'unset', fontWeight: '600', fontFamily: 'myriad-regular' }}>{moduleData?.module_name}</span>
        </div>

        <div className="heading-content">
          <span>Pulmonology is a medical speciality that deals with diseases involving the respiratory
            tract
          </span>
        </div>

        <div className="button-progress-container">
          {moduleStatus == "ongoing" &&
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
                  <span>61% Completed</span>
                  <span>9hrs 45mins left</span>
                </div>
                <div className="progress" style={{ width: '100%' }}>
                  <div className="progress-bar" role="progressbar" style={{ width: '50%' }} aria-valuenow="50"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </>
          }

          {moduleStatus == "locked" &&
            <>
              <button type="button" className="start-learning-btn">
                Start Learning
              </button>
            </>
          }
        </div>

        <div className="topic-chapter-container">

          {contents?.data?.map((item, index) => {
            return (
              <ChapterCard key={`module${item.id}`} chapterData={item} chapterIndex={index} />
            )
          })}
        </div>
      </div>
    </>
  );
}