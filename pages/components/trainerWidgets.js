import widgetModel from "../../model/widget.model";
import useSWR from 'swr';
export default function adminWidgets() {
  const { data: courseCount, mutate: loadTotal } = useSWR('courseCount', async () => await widgetModel.courseCount());

  const { data: courseWeek, mutate: loadWeek } = useSWR('courseWeek', async () => await widgetModel.courseWeek());

  const { data: totalTrainee, mutate: loadtrainee } = useSWR('totalTrainee', async () => await widgetModel.traineeCount());
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
          <img src="/admin-images/1.png" alt="" className="icon-info" />
        </div>
      </div>
      <div className="training-hours">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
            <h1 className="text-light">{totalTrainee?.data?.total}</h1>
          </div>
          <div className="explicit-info text-light">
            <p>Enrolled Trainees</p>
          </div>
        </div>
        <div className="right-icon">
          <img src="/trainer-images/dashboard images/icon-2.png" alt="" className="icon-info mr-1" />
        </div>
      </div>
      <div className="training-hours">
        <div className="left-info" style={{ justifySelf: 'unset' }}>
          <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
            <h1 className="text-light">{7*24*courseWeek?.data?.total}</h1>
          </div>
          <div className="explicit-info text-light">
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
          <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
            <h1 className="text-light">60%</h1>
          </div>
          <div className="explicit-info text-light">
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