import categoryModel from "../../model/category.modal";
import courseModel from "../../model/course.model";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR, { mutate } from 'swr';
import DataTable from 'react-data-table-component';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';
export default function adminDashboardGraph() {
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "created_at";
  QueryParam.order_in = router.query?.order_in || "desc";
  const { data: courses, error: courseerror, isLoading: courseisLoading } = useSWR(QueryParam ? "courseList" : null, async () => await courseModel.list(QueryParam), config.swrConfig);
  const { data: categoryData, error: categoryerror, isLoading: categoryisLoading } = useSWR(QueryParam ? "categorylist" : null, async () => await categoryModel.list(), config.swrConfig);
  return (
    <>
      <div class="category-create-btn d-flex justify-content-between">

        <div class="category d-flex gap-3 align-items-center">
          <h6 for="category" style={{ color: "#7E878C", fontFamily: "Co-text" }}>Category: </h6>
          <select name="category" id="cars" className='select-dashboard'>
            <option value="Country">-Select-</option>
            {categoryData?.data?.map((item) => {
              return (<option key={item.id} value={item.id}>{item.category_name}</option>)
            })}
          </select>
        </div>
        <div class="create-course-btnn">
          <div class="create-course">
            <a href="./courses/create">
              <button class="btn btn-primary create-course-btnn"
                style={{ backgroundColor: "#008bd6" }}>Create
                Course <strong>+</strong></button>
            </a>
          </div>
        </div>
      </div>
      <div class="course-info-cards">
        <div class="course-info-card-1 course-card">
          <div class="course-details">
            <div class="course-thumbnail">
              <img class="thumbnail"
                src="/trainer-images/dashboard images/thumbnails/thumbnaila.png" alt="" />
            </div>
            <div class="title">
              <div class="course-title">
                <h6>Gastroentrology</h6>
              </div>
              <div class="badge-detail text-dark"><span>Country</span></div>
            </div>
          </div>
          <div class="statistical-details">
            <div class="enrolled-detail">
              <p>Enrolled : </p>
              <span>604 Trainees</span>
            </div>
            <div class="meter-detail">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Basic example"
                  style={{ width: "75%", ariaValuenow: "75", ariaValuemin: "0", ariaValuemax: "100" }}>

                </div>
              </div>
            </div>
            <div class="percentage-detail">
              <p>80% Trainees Completed</p>
            </div>
          </div>
          <div class="duration-details">
            <div class="duration-detail">
              <p>Duration : </p>
              <span>4 Weeks</span>
            </div>
            <div class="average-time-detail">
              <p>Average Time Spent: 5 weeks</p>
            </div>
          </div>
          <div class="edit-btn">
            <a href="./editcourse">
              <button class="btn edit">Edit Course</button>
            </a>
          </div>
        </div>

        <div class="course-info-card-2 course-card">
          <div class="course-details">
            <div class="course-thumbnail">
              <img class="thumbnail"
                src="/trainer-images/dashboard images/thumbnails/thumbnailb.png" alt="" />
            </div>
            <div class="title">
              <div class="course-title">
                <h6>Gastroentrology</h6>
              </div>
              <div class="badge-detail text-dark"><span>Blanket</span></div>
            </div>
          </div>
          <div class="statistical-details">
            <div class="enrolled-detail">
              <p>Enrolled : </p>
              <span>604 Trainees</span>
            </div>
            <div class="meter-detail">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Basic example"
                  style={{ width: "75%", ariaValuenow: "75", ariaValuemin: "0", ariaValuemax: "100" }}>

                </div>
              </div>
            </div>
            <div class="percentage-detail">
              <p>80% Trainees Completed</p>
            </div>
          </div>
          <div class="duration-details">
            <div class="duration-detail">
              <p>Duration : </p>
              <span>4 Weeks</span>
            </div>
            <div class="average-time-detail">
              <p>Average Time Spent: 5 weeks</p>
            </div>
          </div>
          <div class="edit-btn">
            <a href="./editcourse">
              <button class="btn edit">Edit Course</button>
            </a>
          </div>
        </div>

        <div class="course-info-card-3 course-card">
          <div class="course-details">
            <div class="course-thumbnail">
              <img class="thumbnail"
                src="/trainer-images/dashboard images/thumbnails/3-thumbnail.png" alt="" />
            </div>
            <div class="title">
              <div class="course-title">
                <h6>Gastroentrology</h6>
              </div>
              <div class="badge-detail text-dark"><span>Country</span></div>
            </div>
          </div>
          <div class="statistical-details">
            <div class="enrolled-detail">
              <p>Enrolled : </p>
              <span>604 Trainees</span>
            </div>
            <div class="meter-detail">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Basic example"
                  style={{ width: "75%", ariaValuenow: "75", ariaValuemin: "0", ariaValuemax: "100" }}>
                </div>
              </div>
            </div>
            <div class="percentage-detail">
              <p>80% Trainees Completed</p>
            </div>
          </div>
          <div class="duration-details">
            <div class="duration-detail">
              <p>Duration : </p>
              <span>4 Weeks</span>
            </div>
            <div class="average-time-detail">
              <p>Average Time Spent: 5 weeks</p>
            </div>
          </div>
          <div class="edit-btn">
            <a href="./editcourse">
              <button class="btn edit">Edit Course</button>
            </a>
          </div>
        </div>

        <div class="course-info-card-4 course-card">
          <div class="course-details">
            <div class="course-thumbnail">
              <img class="thumbnail"
                src="/trainer-images/dashboard images/thumbnails/thumbnaila.png" alt="" />
            </div>
            <div class="title">
              <div class="course-title">
                <h6>Gastroentrology</h6>
              </div>
              <div class="badge-detail text-dark"><span>Product</span></div>
            </div>
          </div>
          <div class="statistical-details">
            <div class="enrolled-detail">
              <p>Enrolled : </p>
              <span>604 Trainees</span>
            </div>
            <div class="meter-detail">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Basic example"
                  style={{ width: ' 75%', ariaValuenow: '75', ariaValuemin: "0", ariaValuemax: "100" }}>
                </div>
              </div>
            </div>
            <div class="percentage-detail">
              <p>80% Trainees Completed</p>
            </div>
          </div>
          <div class="duration-details">
            <div class="duration-detail">
              <p>Duration : </p>
              <span>4 Weeks</span>
            </div>
            <div class="average-time-detail">
              <p>Average Time Spent: 5 weeks</p>
            </div>
          </div>
          <div class="edit-btn">
            <a href="./editcourse">
              <button class="btn edit">Edit Course</button>
            </a>
          </div>
        </div>

        <div class="course-info-card-5 course-card">
          <div class="course-details">
            <div class="course-thumbnail">
              <img class="thumbnail"
                src="/trainer-images/dashboard images/thumbnails/thumbnailc.png" alt="" />
            </div>
            <div class="title">
              <div class="course-title">
                <h6>Gastroentrology</h6>
              </div>
              <div class="badge-detail text-dark"><span>Country</span></div>
            </div>
          </div>
          <div class="statistical-details">
            <div class="enrolled-detail">
              <p>Enrolled : </p>
              <span>604 Trainees</span>
            </div>
            <div class="meter-detail">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Basic example"
                  style={{ width: ' 75%', ariaValuenow: "75", ariAluemin: "0", ariaValuemax: "100" }}>
                </div>
              </div>
            </div>
            <div class="percentage-detail">
              <p>80% Trainees Completed</p>
            </div>
          </div>
          <div class="duration-details">
            <div class="duration-detail">
              <p>Duration : </p>
              <span>4 Weeks</span>
            </div>
            <div class="average-time-detail">
              <p>Average Time Spent: 5 weeks</p>
            </div>
          </div>
          <div class="edit-btn">
            <a href="./editcourse">
              <button class="btn edit">Edit Course</button>
            </a>
          </div>
        </div>
      </div>
      <div class="trainer-pagination">
        <nav class="pagination-container-dashboard d-flex justify-content-end">
          <div class="pagination">
            <a class="pagination-newer" href="#">
              <ion-icon name="chevron-back-outline"></ion-icon>
            </a>
            <span class="pagination-inner">
              <a href="#">1</a>
              <a class="pagination-active" href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a href="#">6</a>
            </span>
            <a class="pagination-older" href="#">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}