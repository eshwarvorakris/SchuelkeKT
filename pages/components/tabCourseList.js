import categoryModel from "../../model/category.model";
import courseModel from "../../model/course.model";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR, { mutate } from 'swr';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';
import CourseCard from './courseVerticalCard';
import ReactPaginate from 'react-paginate';
export default function TabCourseList() {
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "created_at";
  QueryParam.order_in = router.query?.order_in || "desc";
QueryParam.category_id = router.query?.category_id || 1
  const { data: categoryData, error: categoryerror, isLoading: categoryisLoading } = useSWR("categorylist", async () => await categoryModel.list(), config.swrConfig);
  const { data: courses, error: courseerror, isLoading: courseisLoading, mutate: loadCourse } = useSWR(QueryParam ? "courseList" : null, async () => await courseModel.list(QueryParam), config.swrConfig);

  const pagginationHandler = (page) => {
    QueryParam.page = page.selected + 1;
    router.push({
      pathname: router.pathname,
      query: QueryParam,
    });
  };

  const [activeTab, setActiveTab] = useState("");
  const fetchCourse = function (indexId, catId) {
    console.log(catId);
    console.log(indexId);
    QueryParam.category_id = catId;
    console.log(QueryParam);
    let activeTabId = "tab" + indexId
    console.log(activeTabId);
    setActiveTab(activeTabId);
    router.push({
      pathname: router.pathname,
      query: QueryParam,
    });
    loadCourse();
  }

  useEffect(() => {
    // QueryParam.category_id = categoryData?.data?.[0]["id"];
    router.push({
      pathname: router.pathname,
      query: QueryParam,
    });
    loadCourse();
  }, [categoryData]);

  useEffect(() => {
    console.log(QueryParam);
  setActiveTab('tab'+QueryParam.category_id);
 
  }, [QueryParam])
  
  
  return (
    <>
      <div className="pc-tab">

        <div className="tab-container">
          <ul>
            {categoryData?.data?.map((item, index) => {
              return (
                <>
                  <li key={`cate${item.id}`} className={`tab${index + 1} tab-${index + 1} ${activeTab === ("tab" + (index + 1)) ? 'active-tab' : ''}`} onClick={() => fetchCourse(index + 1, item.id)}>
                    <label className={`tab-label-${index + 1} container-heading`} htmlFor={`tab${index + 1}`}>{item.category_name}</label>
                  </li>
                </>
              )
            })}
          </ul>
        </div>
        <section>
          <div className="tab1" style={{ display: 'block' }}>
            <div className="trainee-cards">
              <div className="container">
                <div className="row d-flex flex-column gap-5">
                  <div className="row">
                    {courses?.data?.map((item, index) => {
                      return (
                        <CourseCard key={`course${item.id}`} courseData={item} courseIndex={index} />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}