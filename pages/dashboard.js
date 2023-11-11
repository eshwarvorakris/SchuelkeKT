import useSWR from 'swr';
import widgetModel from "../model/widget.model";
import AdminGraph from "./components/adminDashboardGraph";
import TrainerCourse from "./components/trainerDashboardCourseList";
import AdminWidgets from './components/adminWidgets';
import TrainerWidgets from './components/trainerWidgets';
import TraineeWidgets from './components/traineeWidgets';
import TabCourseList from './components/tabCourseList';
import AppContext from '../lib/appContext';
import _ from 'lodash';
import { useContext } from 'react';
function Index() {
  const layoutValues = useContext(AppContext);
  { layoutValues.setPageHeading(_.capitalize(layoutValues?.profile?.role) + " Dashboard") }
  const { data: courseCount } = useSWR('courseCount', async () => await widgetModel.courseCount());
 // console.log(layoutValues?.profile?.role);
  return (
    <>
      <div style={{minHeight:'90vh'}}>
        <div className="dashboard-info">
          {(layoutValues?.profile?.role == 'admin') && <AdminWidgets />}
          {(layoutValues?.profile?.role == 'trainer') && <TrainerWidgets />}
          {(layoutValues?.profile?.role == 'trainee') && <TraineeWidgets />}
        </div>
        {(layoutValues?.profile?.role == 'admin') && <AdminGraph />}

        {(layoutValues?.profile?.role == 'trainer') && <TrainerCourse />}

        {(layoutValues?.profile?.role == 'trainee') && <TabCourseList />}
      </div>
    </>
  );
}

export default Index;