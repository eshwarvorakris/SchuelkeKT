import categoryModel from "../../model/category.modal";
import courseModel from "../../model/course.model";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR, { mutate } from 'swr';
import DataTable from 'react-data-table-component';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';
import CourseCard from './courseCard';
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
            <a href="/courses/create">
              <button class="btn btn-primary create-course-btnn"
                style={{ backgroundColor: "#008bd6" }}>Create
                Course <strong>+</strong></button>
            </a>
          </div>
        </div>
      </div>
      <div class="course-info-cards">
        {courses?.data?.map((item) => {
          return (<CourseCard key={item.id} courseData={item} />)
        })}
      </div>
      <div class="all-trainer-pagination">
        <nav class="all-pagination-container d-flex justify-content-end">
          <div class="all-pagination">
            <a class="all-pagination-newer" href="#">
              <ion-icon name="chevron-back-outline" role="img" class="md hydrated" aria-label="chevron back outline"></ion-icon>
            </a>
            <span class="all-pagination-inner">
              <a href="#">1</a>
              <a class="all-pagination-active" href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a href="#">6</a>
            </span>
            <a class="all-pagination-older" href="#">
              <ion-icon name="chevron-forward-outline" role="img" class="md hydrated" aria-label="chevron forward outline"></ion-icon>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}