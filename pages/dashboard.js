import useSWR from 'swr';
import Sidebar from "./components/sidebar";
import AdminWidgets from './components/adminWidgets';
import TrainerWidgets from './components/trainerWidgets';
import TraineeWidgets from './components/traineeWidgets';
import Router from "next/router";
import { useState, useEffect } from "react";
import auth from "../model/auth.model";
import AdminGraph from "./components/adminDashboardGraph";
import TrainerCourse from "./components/trainerDashboardCourseList";
import { helper } from '../lib/helper';

function Index() {
  const { data: profile, error, isLoading } = useSWR('/', async () => await auth.profile());
  if (error) {
    //console.log(error);
    Router.replace("login");
  }
  return (
    <>
      <div className="dashboard-info">
        {
          (() => {
            if (profile?.role == 'admin') {
              return (<AdminWidgets />)
            }
            if (profile?.role == 'trainer') {
              return (<TrainerWidgets />)
            }
            if (profile?.role == 'trainee') {
              return (<TraineeWidgets />)
            }
          })()
        }
      </div>
      {
        (() => {
          if (profile?.role == 'admin') {
            console.log("admin");
            return (<AdminGraph />)
          }
          if (profile?.role == 'trainer') {
            return (<TrainerCourse />)
          }
        })()
      }

    </>
  );
}

export default Index;