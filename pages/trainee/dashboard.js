import useSWR from 'swr';
import React, { useEffect, useState } from 'react';
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { useRouter } from "next/router";
import auth from "../../model/auth.model";
import Cookies from 'js-cookie';
import thumbnaila from "../../public/trainer-images/dashboard images/thumbnails/thumbnaila.png"
function Index() {
  //const [profile,setProfile]=useState([]);
  const router = useRouter();
  
  const { data, error, isLoading } = useSWR('/', async () => await auth.profile());
  
  return (
    <>
      <div className="trainee_section1">
        <div className="blank-class"></div>
        <Sidebar />
        <div className="container-2">
          <div className="col-12 trainee-right">
            <div className="blank-nav-class"></div>

            <Navbar />
            <form>
              <div className="dashboard-info">
                <div className="total-courses">
                  <div className="left-info">
                    <div className="numeric-info text-light">
                      <h1 className="text-light" style={{ marginLeft: '-90px' }}>46</h1>
                    </div>
                    <div className="explicit-info text-light">
                      <p>Total Courses</p>
                    </div>
                  </div>
                  <div className="right-icon">
                    <img src="/trainee-images/trainee-dashboard/icon-1.png" alt="" className="icon-info" />
                  </div>
                </div>
                <div className="total-courses">
                  <div className="left-info">
                    <div className="numeric-info text-light">
                      <h1 className="text-light" style={{ marginLeft: '-70px' }}>1284</h1>
                    </div>
                    <div className="explicit-info text-light">
                      <p>Enrolled Trainees</p>
                    </div>
                  </div>
                  <div className="right-icon">
                    <img src="/trainee-images/trainee-dashboard/icon-2.png" alt="" className="icon-info" />
                  </div>
                </div>
                <div className="total-courses">
                  <div className="left-info">
                    <div className="numeric-info text-light">
                      <h1 className="text-light" style={{ marginLeft: '-80px' }}>700</h1>
                    </div>
                    <div className="explicit-info text-light">
                      <p>Training Hours</p>
                    </div>
                  </div>
                  <div className="right-icon">
                    <img src="/trainee-images/trainee-dashboard/icon-3.png" alt="" className="icon-info" />
                  </div>
                </div>
                <div className="total-courses">
                  <div className="left-info">
                    <div className="numeric-info text-light">
                      <h1 className="text-light" style={{ marginLeft: '-90px' }}>60</h1>
                    </div>
                    <div className="explicit-info text-light">
                      <p>Course Completion %</p>
                    </div>
                  </div>
                  <div className="right-icon">
                    <img src="/trainee-images/trainee-dashboard/icon-4.png" alt="" className="icon-info" />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="category-create-btn d-flex justify-content-between">

            <div className="category d-flex gap-3 align-items-center mt-5 mb-5">
              <h6 htmlFor="category" style={{ marginLeft: '35px' }} ><b>Category:</b> </h6>
              <select name="category" id="cars" style={{ borderRadius: 5, width: '150px', height: 30, padding: '5px 1rem 5px 1rem', background: 'white', border: '1px solid rgba(0, 0, 0, 0.192)', color: `rgba(0, 0, 0, 0.596)` }}>
                <option value="Country">-Select-</option>
                <option value="Country">Country</option>
                <option value="Blanket">Blanket</option>
                <option value="Product">Product</option>
              </select>
            </div>

            <div className="create-btn mb-5 mt-5">
              <div className="create-course">
                <a href="./addcourse">
                  <button className="Create-button">Create Course <strong>+</strong></button>
                </a>
              </div>
            </div>
          </div>
          <div className="card mb-3" style={{ marginLeft: '20px', marginRight: '20px', border: 'none' }}>

            <div className="card-body">
              <div className="container">
                <div className="row">
                  <p><img src="/trainer-images/dashboard images/thumbnails/1-thumbnail.png" alt="" style={{ height: '100px', width: '100px' }} />

                    <img src="/trainee-images/Card.png" alt="" style={{ width: "600px", marginTop: '10px' }} />
                    <button className="conatct-button "><a href="./editcourse" className='text-light' style={{ textDecoration: 'none' }} >Edit Course</a></button>
                  </p>

                  <div className="col">

                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="card mb-3" style={{ marginLeft: '20px', marginRight: '20px', border: 'none' }}>

            <div className="card-body">
              <div className="container">
                <div className="row">
                  <p><img src="/trainer-images/dashboard images/thumbnails/2-thumbnail.png" alt="" style={{ height: '100px', width: '100px' }} />

                    <img src="/trainee-images/Card.png" alt="" style={{ width: "600px", marginTop: '10px' }} />
                    <button className="conatct-button  ">Edit Course</button>
                  </p>

                  <div className="col">

                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="card mb-3" style={{ marginLeft: '20px', marginRight: '20px', border: 'none' }}>

            <div className="card-body">
              <div className="container">
                <div className="row">
                  <p><img src="/trainer-images/dashboard images/thumbnails/1-thumbnail.png" alt="" style={{ height: '100px', width: '100px' }} />

                    <img src="/trainee-images/Card.png" alt="" style={{ width: "600px", marginTop: '10px' }} />
                    <button className="conatct-button  ">Edit Course</button>
                  </p>

                  <div className="col">

                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="card mb-3" style={{ marginLeft: '20px', marginRight: '20px', border: 'none' }}>

            <div className="card-body">
              <div className="container">
                <div className="row">
                  <p><img src="/trainer-images/dashboard images/thumbnails/3-thumbnail.png" alt="" style={{ height: '100px', width: '100px' }} />

                    <img src="/trainee-images/Card.png" alt="" style={{ width: "600px", marginTop: '10px' }} />
                    <button className="conatct-button  ">Edit Course</button>
                  </p>

                  <div className="col">

                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="card mb-3" style={{ marginLeft: '20px', marginRight: '20px', border: 'none' }}>

            <div className="card-body">
              <div className="container">
                <div className="row">
                  <p><img src="/trainer-images/dashboard images/thumbnails/4-thumbnail.png" alt="" style={{ height: '100px', width: '100px' }} />

                    <img src="/trainee-images/Card.png" alt="" style={{ width: "600px", marginTop: '10px' }} />
                    <button className="conatct-button  ">Edit Course</button>
                  </p>

                  <div className="col">

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Index;