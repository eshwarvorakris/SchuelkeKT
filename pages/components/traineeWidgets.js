import widgetModel from "../../model/widget.model";
import useSWR from 'swr';
export default function adminWidgets() {
  const { data: courseCount, mutate: loadTotal } = useSWR('courseCount', async () => await widgetModel.courseCount());
  return (
    <>
      <div className="total-courses">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
            <h1 className="text-light" >{courseCount?.data?.total}</h1>
          </div>
          <div className="explicit-info text-light">
            <p>Total Courses</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/trainee-images/trainee-dashboard/Union.png" alt="" className="icon-info"/>
        </div>
      </div>
      <div className="enrolled-trainees">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
            <h1 className="text-light">{courseCount?.data?.total}</h1>
          </div>
          <div className="explicit-info text-light">
            <p>Courses Pending</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/trainee-images/trainee-dashboard/Union.png" alt="" className="icon-info"/>
        </div>
      </div>
      <div className="training-hours">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
            <h1 className="text-light">0</h1>
          </div>
          <div className="explicit-info text-light">
            <p>Courses Completed</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/trainee-images/trainee-dashboard/Union.png" alt="" className="icon-info"/>
        </div>
      </div>
      <div className="courses-completion">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
            <h1 className="text-light">0</h1>
          </div>
          <div className="explicit-info text-light">
            <p>Total Learing Hourss</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/trainee-images/trainee-dashboard/Union.png" alt="" className="icon-info"/>
        </div>
      </div>
    </>
  );
}