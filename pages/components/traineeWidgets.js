import widgetModel from "../../model/widget.model";
import useSWR from 'swr';
import { useEffect } from "react";
export default function adminWidgets() {
  const { data: traineeKpi, mutate: loadTraineeKpi } = useSWR('traineeKapi', async () => await widgetModel.traineeKpis());
  
  useEffect(() => {
    console.log("traineeKpi", traineeKpi);
  }, [traineeKpi]);
  return (
    <>
      <div className="total-courses">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
            <h1 className="text-light" >{traineeKpi?.totalCourse}</h1>
          </div>
          <div className="explicit-info text-light" style={{fontSize:'14px'}}>
            <p>Total Courses</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/trainee-images/trainee-dashboard/Union.png" alt="" className="icon-info"/>
        </div>
      </div>
      <div className="enrolled-trainees">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light" style={{ marginTop: 'unset', position:'relative' }}>
            <h1 className="text-light widgetText">{traineeKpi?.totalCourse - traineeKpi?.totalCourseCompleted}</h1>
          </div>
          <div className="explicit-info text-light" style={{fontSize:'14px'}}>
            <p>Courses Pending</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/trainee-images/trainee-dashboard/Union.png" alt="" className="icon-info"/>
        </div>
      </div>
      <div className="training-hours">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light"  style={{ marginTop: 'unset', position:'relative' }}>
            <h1 className="text-light widgetText">{traineeKpi?.totalCourseCompleted}</h1>
          </div>
          <div className="explicit-info text-light" style={{fontSize:'14px'}}>
            <p>Courses Completed</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/trainee-images/trainee-dashboard/Union.png" alt="" className="icon-info"/>
        </div>
      </div>
      <div className="courses-completion">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light"  style={{ marginTop: 'unset', position:'relative' }}>
            <h1 className="text-light widgetText">{traineeKpi?.totalTrainingHour}</h1>
          </div>
          <div className="explicit-info text-light" style={{fontSize:'14px'}}>
            <p>Total Learing Time</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/trainee-images/trainee-dashboard/Union.png" alt="" className="icon-info"/>
        </div>
      </div>
    </>
  );
}