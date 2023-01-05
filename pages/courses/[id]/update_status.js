import auth from "../../../model/auth.model";
import Sidebar from "../../components/sidebar";
import Topnavbar from '../../components/topnavbar';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR, { mutate } from 'swr';
import courseModel from "../../../model/course.model";
import DataTable from 'react-data-table-component';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import Link from 'next/link';
const updateStatus = () => {
  const router = useRouter();
  const { data: profile, error, isLoading } = useSWR('/', async () => await auth.profile());
  if (error) {
    //console.log(error);
    router.replace("login");
  }
  const { data:course, courseerror, courseisLoading, mutate:loadCourse } = useSWR (router.query?.id||null, async ()=>await courseModel.detail(router.query.id),config.swrConfig);
  const approveBtn = async () => {
    helper.sweetalert.confirm(`Are you confirm to approve this course`).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('status', 'approved');
        const updateRes = await courseModel.update(router.query.id, formData).then((res) => {
          helper.sweetalert.toast('Course Approved');
          router.push("/courses");
        }).catch((error) => {
          console.log(error)
          return {};
        });
      }
    })
  }

  const rejectBtn = async () => {
    helper.sweetalert.confirm(`Are you confirm to reject this course`).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('status', 'rejected');
        const updateRes = await courseModel.update(router.query.id, formData).then((res) => {
          helper.sweetalert.toast('Course Rejected');
          router.push("/courses");
        }).catch((error) => {
          console.log(error)
          return {};
        });
      }
    })
  }
  return (
    <>
      <div>
        <form>
          <div className="header-heading">
            <h5>Update Course Status</h5>
          </div>
          <div className="progress-card" style={{ backgroundColor: '#007fc4' }}>
            <div className="info">
              <div className="progress-card-heading">
                <span className="text-capitalize">{course?.data?.course_name}</span>
              </div>
              <div className="remaining-info-card" style={{ color: '#fff' }}>
                <span>{course?.data?.total_modules} Modules</span>
              </div>
              <div className="date-assessment-info d-flex gap-2">
                <div className="date-label-1">
                  <span>Launch Date: {course?.data?.course_launch_date}</span>
                </div>
                {/* <div className="assessment-label">
                  <span>Assessment Submissions: none</span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="modules-heading">
            <h5>Modules</h5>
          </div>
          <div>
            <div className="module-cards">
              <a href="#" className="module-anchor" style={{ textDecoration: 'none' }}>
                <div className="module-card card-1" style={{ backgroundColor: '#F3F3F3' }}>
                  <span>1 . Introduction to Cardiology</span>
                </div>
              </a>

              <a href="#" className="module-anchor" style={{ textDecoration: 'none' }}>
                <div className="module-card card-2" style={{ backgroundColor: '#F3F3F3' }}>
                  <span>2 . Cardio Vascular Diseases</span>
                </div>
              </a>

              <a href="#" className="module-anchor" style={{ textDecoration: 'none' }}>
                <div className="module-card card-3" style={{ backgroundColor: '#F3F3F3' }}>
                  <span>3 . Medical Cardiology</span>
                </div>
              </a>

              <a href="#" className="module-anchor" style={{ textDecoration: 'none' }}>
                <div className="module-card card-4" style={{ backgroundColor: '#F3F3F3' }}>
                  <span>4. Cardiothoracic Surgery</span>
                </div>
              </a>
            </div>
          </div>
          <div className="module-1">
            <div className="module-1-heading">
              <h5>Module 1</h5>
            </div>

            <div className="body-heading">
              <span>Introduction to Cardiology</span>
            </div>

            <div className="heading-content">
              <span>Pulmonology is a medical speciality that deals with diseases involving the respiratory
                tract
              </span>
            </div>

            <div className="accordions">

              <div className="accordion accordion-flush d-flex flex-column gap-2" id="accordionFlushExample">
                <div className="accordion-container">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button className="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapse-1-One"
                        aria-expanded="false" aria-controls="flush-collapse-1-One">
                        <strong>Chapter 1: Introduction to Cardiology</strong>
                      </button>
                    </h2>
                    <div id="flush-collapse-1-One" className="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body one">
                        <div className="topic">
                          <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                            className="topic-icon" alt="" />
                          <div className="topic-name">
                            <span>Fundamentals of Cardiology For the USMLE and
                              General Medics
                            </span>
                          </div>
                          <div className="topic-duration"><span>20mins</span></div>
                        </div>
                        <hr className="divider" />
                        <div className="topic">
                          <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                            className="topic-icon" alt="" />
                          <div className="topic-name">
                            <span>Clinical Cardiology: Current Practice
                              Guidelines</span>
                          </div>
                          <div className="topic-duration"><span>20mins</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-container">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                      <button className="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapse-2-Two"
                        aria-expanded="false" aria-controls="flush-collapse-2-Two">
                        <strong>Chapter 2: Introduction to Cardiology</strong>
                      </button>
                    </h2>
                    <div id="flush-collapse-2-Two" className="accordion-collapse collapse"
                      aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body one">
                        <div className="topic">
                          <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                            className="topic-icon" alt="" />
                          <div className="topic-name">
                            <span>Fundamentals of Cardiology For the USMLE and
                              General Medics
                            </span>
                          </div>
                          <div className="topic-duration"><span>20mins</span></div>
                        </div>
                        <hr className="divider" />
                        <div className="topic">
                          <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                            className="topic-icon" alt="" />
                          <div className="topic-name">
                            <span>Clinical Cardiology: Current Practice
                              Guidelines</span>
                          </div>
                          <div className="topic-duration"><span>20mins</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-container">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThree">
                      <button className="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapse-3-Three"
                        aria-expanded="false" aria-controls="flush-collapse-3-Three">
                        <strong>Chapter 3: Introduction to Cardiology</strong>
                      </button>
                    </h2>
                    <div id="flush-collapse-3-Three" className="accordion-collapse collapse"
                      aria-labelledby="flush-headingThree"
                      data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body one">
                        <div className="topic">
                          <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                            className="topic-icon" alt="" />
                          <div className="topic-name">
                            <span>Fundamentals of Cardiology For the USMLE and
                              General Medics
                            </span>
                          </div>
                          <div className="topic-duration"><span>20mins</span></div>
                        </div>
                        <hr className="divider" />
                        <div className="topic">
                          <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                            className="topic-icon" alt="" />
                          <div className="topic-name">
                            <span>Clinical Cardiology: Current Practice
                              Guidelines</span>
                          </div>
                          <div className="topic-duration"><span>20mins</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="module-2">
            <div className="module-2-heading">
              <h5>Module 2</h5>
            </div>
            <div className="body-heading">
              <span>Cardio Vascular Diseases</span>
            </div>
            <div className="heading-content">
              <span>Pulmonology is a medical speciality that deals with diseases involving the respiratory
                tract
              </span>
            </div>

            <div className="accordions">
              <div className="accordion accordion-flush d-flex flex-column gap-2" id="accordionFlushExample">
                <div className="accordion-container">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button className="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                        aria-expanded="false" aria-controls="flush-collapseOne">
                        <strong>Chapter 1: Introduction to Cardiology</strong>
                      </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body one">
                        <div className="topic">
                          <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                            className="topic-icon" alt="" />
                          <div className="topic-name">
                            <span>Fundamentals of Cardiology For the USMLE and
                              General Medics
                            </span>
                          </div>
                          <div className="topic-duration"><span>20mins</span></div>
                        </div>
                        <hr className="divider" />
                        <div className="topic">
                          <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                            className="topic-icon" alt="" />
                          <div className="topic-name">
                            <span>Clinical Cardiology: Current Practice
                              Guidelines</span>
                          </div>
                          <div className="topic-duration"><span>20mins</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-container">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                      <button className="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                        aria-expanded="false" aria-controls="flush-collapseTwo">
                        <strong>Chapter 2: Introduction to Cardiology</strong>
                      </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse"
                      aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body one">
                        <div className="topic">
                          <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                            className="topic-icon" alt="" />
                          <div className="topic-name">
                            <span>Fundamentals of Cardiology For the USMLE and
                              General Medics
                            </span>
                          </div>
                          <div className="topic-duration"><span>20mins</span></div>
                        </div>
                        <hr className="divider" />
                        <div className="topic">
                          <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                            className="topic-icon" alt="" />
                          <div className="topic-name">
                            <span>Clinical Cardiology: Current Practice
                              Guidelines</span>
                          </div>
                          <div className="topic-duration"><span>20mins</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-container">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThree">
                      <button className="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                        aria-expanded="false" aria-controls="flush-collapseThree">
                        <strong>Chapter 3: Introduction to Cardiology</strong>
                      </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse"
                      aria-labelledby="flush-headingThree"
                      data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body one">
                        <div className="topic">
                          <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                            className="topic-icon" alt="" />
                          <div className="topic-name">
                            <span>Fundamentals of Cardiology For the USMLE and
                              General Medics
                            </span>
                          </div>
                          <div className="topic-duration"><span>20mins</span></div>
                        </div>
                        <hr className="divider" />
                        <div className="topic">
                          <img src="/images/admin-images/course-approval/accordian-topic-icon.png"
                            className="topic-icon" alt="" />
                          <div className="topic-name">
                            <span>Clinical Cardiology: Current Practice
                              Guidelines</span>
                          </div>
                          <div className="topic-duration"><span>20mins</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="btn-containers">
              <button type="button" onClick={() => approveBtn()} className="footer-btn approve-btn"
                style={{ backgroundColor: "#008bd6", padding: '5px 15px' }}>Approve</button>
              <button type="button" onClick={() => rejectBtn()} className="footer-btn reject-btn" style={{ padding: '5px 15px' }}>Reject</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
export default updateStatus;