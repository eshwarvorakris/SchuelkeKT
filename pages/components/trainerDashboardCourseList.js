import categoryModel from "../../model/category.model";
import courseModel from "../../model/course.model";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR, { mutate } from 'swr';
import DataTable from 'react-data-table-component';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';
import CourseCard from './courseCard';
import ReactPaginate from 'react-paginate';
import Link from "next/link";
import TrainerGraph1 from "./chart/trainerGraph1";
export default function adminDashboardGraph() {
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "created_at";
  QueryParam.order_in = router.query?.order_in || "desc";
  const { data: courses, error: courseerror, isLoading: courseisLoading, mutate:loadCourse } = useSWR(QueryParam ? "courseList" : null, async () => await courseModel.list(QueryParam), config.swrConfig);
  const { data: categoryData, error: categoryerror, isLoading: categoryisLoading } = useSWR(QueryParam ? "categorylist" : null, async () => await categoryModel.list(), config.swrConfig);
  const pagginationHandler = (page) => {
    //console.log("clicked");
    page.selected++;
    QueryParam.page = page.selected ;
    router.push({
      pathname: router.pathname,
      query: QueryParam,
    });
    loadCourse();
  };

  const changeCategory = (value) => {
    //console.log(value);
    QueryParam.page = 1 ;
    QueryParam.category_id = value;
    if(value == "all") {
      delete(QueryParam.category_id);
    }
    
    router.push({
      pathname: router.pathname,
      query: QueryParam,
    });
    loadCourse();
  }
  useEffect(() => {
    const curPage = {};
    curPage.selected = 0;
    pagginationHandler(curPage)
  }, [])
  return (
    <>
      <div className="graph-container">
        <TrainerGraph1 />
      </div>
      <div className="category-create-btn d-flex justify-content-between">

        <div className="category d-flex gap-3 align-items-center">
          <h6 htmlFor="category" style={{ color: "#7E878C", fontFamily: "Co-text" }}>Category: </h6>
          <select name="category" id="cars" className='select-dashboard' onChange={() => { changeCategory(event.target.value) }}>
            <option value="all">All</option>
            {categoryData?.data?.map((item) => {
              return (<option key={item.id} value={item.id}>{item.category_name}</option>)
            })}
          </select>
        </div>
        <div className="create-course-btnn">
          <div className="create-course">
            <Link href="/courses/create">
              <button className="btn btn-primary create-course-btnn"
                style={{ backgroundColor: "#008bd6" }}>Create
                Course <strong>+</strong></button>
            </Link>
          </div>
        </div>
      </div>
      <div className="course-info-cards">
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
            renderOnZeroPageCount={null}
          />
        </nav>
      </div>
    </>
  );
}