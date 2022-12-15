import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Router from "next/router";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
const traineelist = () => {
  const router = useRouter();
  const [proName, setProName] = useState("");
  const { data, error, isLoading } = useSWR('/', async () => await auth.profile());
  if (error) {
    console.log(error);
    Router.replace("login");
  }
  useEffect(() => {
    let curCookie = Cookies.get('loggedInUser');
    if (curCookie !== undefined) {
      Cookies.set('loggedInUser', curCookie, { expires: 1 / 1440 });
    }
    else
    {
      router.push('login');
    }
    setInterval(() => {
      let curCookie = Cookies.get('loggedInUser');
      //console.log(curCookie);
      if (curCookie === undefined) {
        router.push('login');
      }
    }, 5000);
  }, []);
  return (
    <>
      <div>
        <div className="trainee_section1">
          <div className="blank-class"></div>
          <Sidebar />
          <div className="container-2">
            <div className="col-12 trainee-right">

            <Navbar />

            </div>
            <section className="container" style={{ marginTop: '170px', position: 'relative', marginLeft: '20px', paddingRight: '50px', padding: '50px', border: ' 1px solid rgba(0, 0, 0, 0.192)', backgroundColor: 'white' }}>
              <div className="box-1" style={{ textAlign: 'center' }}>
                <p className="small" style={{ padding: '5px', color: '#008bd6', marginRight: '10px' }}>Trainee List</p>
              </div>
              <div className="box-2"></div>
              <table>
                <tbody><tr>
                  <th>S.No</th>
                  <th>Trainee ID</th>
                  <th>Trainee Name</th>
                  <th> Email</th>
                  <th> No. of Courses Enrolled</th>
                  <th></th>
                </tr>
                  <tr className="odd">
                    <td>1</td>
                    <td><i className="fa fa-user-circle-o" aria-hidden="true"></i>348334</td>
                    <td>Thomas</td>
                    <td> Thomas@gmail.com</td>
                    <td> 6</td>
                    <td><button className="Create-button">Check Status</button></td>
                  </tr>
                  <tr className="even">
                    <td>2</td>
                    <td><i className="fa fa-user-circle-o" aria-hidden="true"></i>348334</td>
                    <td>Thomas</td>
                    <td> Thomas@gmail.com</td>
                    <td> 6</td>
                    <td><button className="Create-button">Check Status</button></td>
                  </tr>
                  <tr className="odd">
                    <td>3</td>
                    <td><i className="fa fa-user-circle-o" aria-hidden="true"></i>348334</td>
                    <td>Thomas</td>
                    <td> Thomas@gmail.com</td>
                    <td> 6</td>
                    <td><button className="Create-button">Check Status</button></td>
                  </tr>
                  <tr className="even">
                    <td>4</td>
                    <td><i className="fa fa-user-circle-o" aria-hidden="true"></i>348334</td>
                    <td>Thomas</td>
                    <td> Thomas@gmail.com</td>
                    <td> 6</td>
                    <td><button className="Create-button">Check Status</button></td>
                  </tr>
                  <tr className="odd">
                    <td>5</td>
                    <td><i className="fa fa-user-circle-o" aria-hidden="true"></i>348334</td>
                    <td>Thomas</td>
                    <td> Thomas@gmail.com</td>
                    <td> 6</td>
                    <td><button className="Create-button">Check Status</button></td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
export default traineelist;