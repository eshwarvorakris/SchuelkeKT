import { useEffect } from "react";
import widgetModel from "../../model/widget.model";
import useSWR from 'swr';

export default function adminWidgets() {
  const { data: courseCount, mutate: loadTotal } = useSWR('courseCount', async () => await widgetModel.courseCount());

  const { data: courseWeek, mutate: loadWeek } = useSWR('courseWeek', async () => await widgetModel.courseWeek());

  const { data: totalTrainee, mutate: loadtrainee } = useSWR('totalTrainee', async () => await widgetModel.traineeCount());

  const { data: trainerWidget, mutate: loadtrainerWidget } = useSWR('trainerWidget', async () => await widgetModel.trainerKpis());
  useEffect (() => {
    //console.log("trainerWidget", trainerWidget)
  }, [])
  return (
    <>
      <div className="total-courses">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light"  style={{ marginTop: 'unset', position:'relative' }}>
            <h1 className="text-light widgetText">{courseCount?.data?.total}</h1>
          </div>
          <div className="explicit-info text-light"  style={{fontSize:'14px'}}>
            <p>Total Courses</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/admin-images/1.png" alt="" className="icon-info" />
        </div>
      </div>
      <div className="training-hours">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light"  style={{ marginTop: 'unset', position:'relative' }}>
            <h1 className="text-light widgetText">{totalTrainee?.data?.total}</h1>
          </div>
          <div className="explicit-info text-light" style={{fontSize:'14px'}}>
            <p>Enrolled Trainees</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/trainer-images/dashboard images/icon-2.png" alt="" className="icon-info mr-1" />
        </div>
      </div>
      <div className="training-hours">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light"  style={{ marginTop: 'unset', position:'relative' }}>
            <h1 className="text-light widgetText">{7*24*courseWeek?.data?.total}</h1>
          </div>
          <div className="explicit-info text-light" style={{fontSize:'14px'}}>
            <p>Training Hours</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/trainer-images/dashboard images/icon-3.png" alt="" className="icon-info" />
          <img src="/trainer-images/dashboard images/icon-3(2).png" className="vector-fig" alt="" />
        </div>
      </div>
      <div className="courses-completion">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light"  style={{ marginTop: 'unset', position:'relative' }}>
            <h1 className="text-light widgetText">{trainerWidget?.course_completion}%</h1>
          </div>
          <div className="explicit-info text-light" style={{fontSize:'14px'}}>
            <p>Course Completion %</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/trainer-images/dashboard images/icon-4.png" alt="" className="icon-info" />
        </div>
      </div>
    </>
  );
}