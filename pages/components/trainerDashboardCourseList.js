import categoryModel from "../../model/category.modal";
import courseModel from "../../model/course.model";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR, { mutate } from 'swr';
import DataTable from 'react-data-table-component';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';
import CourseCard from './courseCard';
import ReactPaginate from 'react-paginate';
export default function adminDashboardGraph() {
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "created_at";
  QueryParam.order_in = router.query?.order_in || "desc";
  const { data: courses, error: courseerror, isLoading: courseisLoading, mutate:loadCourse } = useSWR(QueryParam ? "courseList" : null, async () => await courseModel.list(QueryParam), config.swrConfig);
  const { data: categoryData, error: categoryerror, isLoading: categoryisLoading } = useSWR(QueryParam ? "categorylist" : null, async () => await categoryModel.list(), config.swrConfig);
  const pagginationHandler = (page) => {
    QueryParam.page = page.selected + 1;
    router.push({
      pathname: router.pathname,
      query: QueryParam,
    });
  };

  const changeCategory = (value) => {
    //console.log(value);
    QueryParam.category_id = value;
    router.push({
      pathname: router.pathname,
      query: QueryParam,
    });
    loadCourse();
  }
  return (
    <>
      <div class="category-create-btn d-flex justify-content-between">

        <div class="category d-flex gap-3 align-items-center">
          <h6 for="category" style={{ color: "#7E878C", fontFamily: "Co-text" }}>Category: </h6>
          <select name="category" id="cars" className='select-dashboard' onChange={() => { changeCategory(event.target.value) }}>
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
      <div className="trainer-pagination ">
        <nav className="pagination-container d-flex justify-content-end">
          <ReactPaginate
            threeDots={true}
            pageCount={courses?.meta?.total_page}
            initialPage={courses?.meta?.current_page}
            pageRangeDisplayed={10}
            prevNext
            breakLabel="..."
            onPageChange={pagginationHandler}
            className="pagination float-end float-right"
            pageLinkClassName='page-link rounded-circle'
            pageClassName="page-item border-0"
          />
        </nav>
      </div>
    </>
  );
}