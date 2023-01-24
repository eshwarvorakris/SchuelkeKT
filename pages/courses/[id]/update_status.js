import auth from "../../../model/auth.model";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR, { mutate } from 'swr';
import courseModel from "../../../model/course.model";
import ModuleCard from "../../components/moduleCard";
import ModuleDetailCard from "../../components/moduleDetailCard"
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import Link from 'next/link';
const updateStatus = () => {
  const router = useRouter();
  
  const { data: course, courseerror, courseisLoading, mutate: loadCourse } = useSWR(router.query?.id || null, async () => await courseModel.detail(router?.query?.id), config.swrConfig);
  const { data: modules, mutate: loadModule, error: moduleError, isLoading: moduleLoading } = useSWR("modulelist", async () => await courseModel.modules(router?.query?.id), config.swrConfig);
  const approveBtn = async () => {
    helper.sweetalert.confirm(`Are you sure you want to approve this course`, "info", "true").then(async (result) => {
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
    helper.sweetalert.confirm(`Are you sure you want to reject this course`, "info", "true").then(async (result) => {
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

  useEffect(() => {
    console.log("called");
    loadModule();
    console.log("modules = ", modules);
  }, [router, course]);
  return (
    <>
      <div style={{ backgroundColor: 'white' }}>
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
              {modules?.data?.map((item, index) => {
                return (
                  <ModuleCard key={`module${item.id}`} moduleData={item} moduleIndex={index} />
                )
              })}
            </div>
          </div>
          {modules?.data?.map((item, index) => {
            return (
              <ModuleDetailCard key={`moduleDetail${item.id}`} moduleData={item} moduleIndex={index} />
            )
          })}
          <div className="btn-containers">
            <button type="button" onClick={() => approveBtn()} className="footer-btn approve-btn"
              style={{ backgroundColor: "#008bd6", padding: '5px 15px' }}>Approve</button>
            <button type="button" onClick={() => rejectBtn()} className="footer-btn reject-btn" style={{ padding: '5px 15px' }}>Reject</button>
          </div>
        </form>
      </div>
    </>
  )
}
export default updateStatus;