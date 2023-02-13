import { useState, useContext } from "react";
import useSWR from 'swr';
import auth from "../model/auth.model";
import Router from "next/router";
import TraineeWidgets from './components/traineeWidgets';
import TabCourseList from "./components/tabCourseList"
import RecentLearningCard from "./components/recentLearningCard"
import AppContext from '../lib/appContext';
const mygrade = () => {
    const layoutValues = useContext(AppContext);
    { layoutValues.setPageHeading("Trainee Dashboard") }
    return (
        <>
            <div>
                <div className="dashboard-info">
                    <TraineeWidgets />
                </div>
                {/* <div className="content-heading" style={{ padding: 'unset' }}>
                    <h5 style={{marginTop:'unset'}}>Recent Learning</h5>
                </div>
                <RecentLearningCard /> */}
                <TabCourseList />
            </div>
        </>
    )
}
export default mygrade;