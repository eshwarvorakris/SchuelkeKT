import useSWR from 'swr';
import widgetModel from "../model/widget.model";
import AdminGraph from "./components/adminDashboardGraph";
import TrainerCourse from "./components/trainerDashboardCourseList";
import AppContext from '../lib/appContext';
import _ from 'lodash';
import { useContext } from 'react';
function Index() {
  const layoutValues=useContext(AppContext);
  {layoutValues.setPageHeading(_.capitalize(layoutValues?.profile?.role)+" Dashboard")}
  const { data: courseCount } = useSWR('courseCount', async () => await widgetModel.courseCount());
  return (
    <>        <div className="dashboard-info">
                <div className="total-courses">
                  <div className="left-info" style={{ justifySelf: 'unset' }}>
                    <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
                      <h1 className="text-light" >{courseCount?.total}</h1>
                    </div>
                    <div className="explicit-info text-light">
                      <p>Total Courses</p>
                    </div>
                  </div>
                  <div className="right-icon">
                    <img src="/admin-images/1.png" alt="" className="icon-info" />
                  </div>
                </div>
                <div className="enrolled-trainees">
                  <div className="left-info" style={{ justifySelf: 'unset' }}>
                    <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
                      <h1 className="text-light">96</h1>
                    </div>
                    <div className="explicit-info text-light">
                      <p>Total Trainees</p>
                    </div>
                  </div>
                  <div className="right-icon">
                    <svg className="chalkboard-icon icon-info" style={{ color: "white" }}
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="300" height="300" fill="none"></rect>
                      <path
                        d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H53.4a7.9,7.9,0,0,0,7.2-4.6,48.1,48.1,0,0,1,86.8,0,7.9,7.9,0,0,0,7.2,4.6H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM104,168a32,32,0,1,1,32-32A32.1,32.1,0,0,1,104,168Zm112,32H159.4a63.7,63.7,0,0,0-13.1-16H192a8,8,0,0,0,8-8V80a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8v96a8,8,0,0,0,6,7.7A64.2,64.2,0,0,0,48.6,200H40V56H216Z"
                        fill="white"></path>
                    </svg>
                  </div>
                </div>
                <div className="training-hours">
                  <div className="left-info" style={{ justifySelf: 'unset' }}>
                    <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
                      <h1 className="text-light">1284</h1>
                    </div>
                    <div className="explicit-info text-light">
                      <p>Enrolled Training</p>
                    </div>
                  </div>
                  <div className="right-icon">
                    <img src="/admin-images/3.png" alt="" className="icon-info" />
                  </div>
                </div>
                <div className="courses-completion">
                  <div className="left-info" style={{ justifySelf: 'unset' }}>
                    <div className="numeric-info text-light" style={{ marginTop: 'unset' }}>
                      <h1 className="text-light">700</h1>
                    </div>
                    <div className="explicit-info text-light">
                      <p>Training Hours</p>
                    </div>
                  </div>
                  <div className="right-icon">
                    <img src="/trainer-images/dashboard images/icon-3.png" alt="" className="icon-info" />
                    <img src="/trainer-images/dashboard images/icon-3(2).png" className="vector-fig"
                      alt="" />
                  </div>
                </div>
              </div>
              {(layoutValues?.profile?.role == 'admin') && <AdminGraph />}
              
              {(layoutValues?.profile?.role == 'trainer') && <TrainerCourse />}

           
    </>
  );
}

export default Index;