import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import useSWR, { mutate } from 'swr';
import courseModel from "../../model/course.model";
import DataTable from 'react-data-table-component';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import AppContext from "../../lib/appContext";


import CategoryList from "../components/categoryListDropdown";
import CountryList from "../components/countryListDropdown";
import ExportToExcel from "../components/ExportToExcel";

const analytics = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(true);
  const [country, setCountry] = useState("all");
  const [topic, setTopic] = useState("all");
  const [exportData, setExportData] = useState(null);

  const [courses, setCourses] = useState(null);

  const handleCountryChange = (country) => {
    //onCountryChangeParent(country)
    setCountry(country.value);
    console.log(country);
  };
  const handleSelectChange = (option) => {
    //onTopicChanged(option)
    setTopic(option.value);
    console.log("category option = ", option);
  };

  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "created_at";
  QueryParam.order_in = router.query?.order_in || "desc";

  const pagginationHandler = (page) => {
    page.selected++;
    console.log("page : ", page)
    QueryParam.page = page.selected;
    router.push({
      pathname: router.pathname,
      query: QueryParam,
    });
  };

  const handleSort = function (column, sortDirection) {
    QueryParam.order_by = column.sortField;
    QueryParam.order_in = sortDirection;
    /* router.push({
        pathname: router.pathname,
        query: QueryParam,
    }); */
  }

  const getAnalytics = async () => {
    const formData = new FormData();
    formData.append("country", country);
    formData.append("category", topic);
    await courseModel.getCourseAnalytics(formData, QueryParam).then((result) => {
      console.log("data", result?.data);
      setCourses(result?.data);

      if (result?.data) {
        //console.log("here10");
        if (result?.data?.data?.length > 0) {
          //console.log("here20");
          var tempData = [];
          result?.data?.data.map((item, index) => {
            tempData.push({
              'Course Namw': item.course_name,
              'Trainees Enrolled': item.trainee_enrolled,
              'Average Course Completion Time': item.average_course_completion_time,
              'Passing Rate': item.passing_rate,
              'Average Score': item.average_score,
              'Average No. Of Attempts': item.average_no_of_attempt,
            })
          })
          setExportData(tempData);
        }
      }

      setisLoading(false);
    });
  }

  useEffect(() => {
    getAnalytics();
  }, [QueryParam, country, topic])

  const columns = [
    {
      name: 'S.No',
      cell: (row, index) => {
        const curIndex = (((QueryParam.page - 1) * 15) + (index + 1));
        return (
          <p>{curIndex}</p>
        )
      },
    },
    {
      name: 'Course',
      selector: row => row.course_name,
      sortable: true,
      sortField: "row.course_name",
      wrap: true,
    },
    {
      name: 'Trainees Enrolled',
      selector: row => row.trainee_enrolled,
      sortable: true,
      sortField: "row.trainee_enrolled",
      cell: (row, index) => {
        if(row.trainee_enrolled > 0) {
          return (
            <Link href={`/courses/${row.id}/assigned_trainee`}>{row.trainee_enrolled}</Link>
          )
        } else {
          return (
            <p>{row.trainee_enrolled}</p>
          )
        }
      },
      wrap: true,
    },
    {
      name: 'Average Course Completion Time',
      selector: row => row.average_course_completion_time,
      sortable: true,
      sortField: "row.average_course_completion_time",
    },
    {
      name: 'Passing Rate',
      selector: row => row?.passing_rate,
    },
    {
      name: 'Average Score',
      selector: row => row?.average_score,
    },
    {
      name: 'Average No. Of Attempts',
      selector: row => row?.average_no_of_attempt,
    }
  ];
  return (
    <>
      <div className=" SearchandSort ">

        <div className=" category d-flex gap-3 align-items-center " style={{ marginRight: '2rem' }}>
          <CategoryList onCategoryChange={handleSelectChange} addAll={true} />
          <CountryList onCountryChange={handleCountryChange} addAll={true} />
          <ExportToExcel exportExcelData={exportData} excelName={"Course Analytics"} />
        </div>

      </div>
      <div className="trainee-body">
        <div className="trainee-admincoursemanagement d-flex flex-column" style={{ minHeight: '70vh', height: 'unset' }}>
          <div className="box-1-admincoursemanagement"></div>
          <div className="box-2-admincoursemanagement"></div>
          <div className="trainee-tag-admincoursemanagement">
            <p>Analytics</p>
          </div>
          {isLoading ||
            <DataTable
              columns={columns}
              data={courses?.data}
              progressPending={isLoading}
              sortServer
              onSort={handleSort}
              className='table'
              customStyles={config.dataTableStyle}
            />
          }
        </div>
      </div>
      <div className="trainer-pagination ">
        <nav className="pagination-container d-flex justify-content-end">
          <ReactPaginate
            threeDots={true}
            pageCount={courses?.meta?.total_page}
            disableInitialCallback={true}
            initialPage={courses?.meta?.current_page}
            pageRangeDisplayed={10}
            prevNext
            breakLabel="..."
            onPageChange={pagginationHandler}
            className="pagination float-end float-right"
            pageLinkClassName='page-link pagination-link'
            pageClassName="page-item border-0"
            renderOnZeroPageCount={null}
          />
        </nav>
      </div>
    </>
  );
}
export default analytics;