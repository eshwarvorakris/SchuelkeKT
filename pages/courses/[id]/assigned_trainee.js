import auth from "../../../model/auth.model";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import useSWR, { mutate } from 'swr';
import userModel from "../../../model/user.model";
import courseModel from "../../../model/course.model";
import assignCourseModel from "../../../model/assign_course.model";
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import AppContext from "../../../lib/appContext";
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import moment from 'moment';
import Image from "next/image";
const AssignCourse = () => {
  const router = useRouter();
  const [courseName, setCourseName] = useState("");
  const [trainees, setTrainees] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [course, setCourse] = useState(null);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const layoutValues = useContext(AppContext);
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = "created_at";
  QueryParam.order_in = "asc";
  { layoutValues.setPageHeading("Assigned Trainees in " + courseName) }

  const [isLoading, setIsLoading] = useState(true);

  const loadCourse = async () => {
    if (router?.query?.id) {
      await courseModel.detail(router?.query?.id).then((res) => {
        if (res?.data !== undefined) {
          setCourse(res);
          setCourseName("(" + res?.data.course_name + ")");
          setCourseId(res?.data?.id);
        }
      }).catch((error) => {
        // console.log(error);
      });
    }
  }
  const [checkedState, setCheckedState] = useState(
    new Array(20).fill(false)
  );
  const getTrainees = function () {

    assignCourseModel.list(QueryParam).then((res) => {
      if (res?.data) {
        setTrainees(res?.data)
        setIsLoading(false);
      }
    }).catch((error) => {
      // console.log(error);
    });
  }

  const handleFilterChange = (async (e) => {
    QueryParam.filter = e.target.value;
    if (e.target.value == "all") {
      delete (QueryParam.filter)
      delete (QueryParam.search)
    }
    getTrainees();
  });



  const handleOnChange = (position, assignId) => {
    if (checkedState[position] === true && assignId !== 0) {
      helper.sweetalert.confirm("Are you sure to unassign", "info", true).then((result) => {
        if (result.isConfirmed) {

          assignCourseModel.delete(assignId).then((res) => {
            //// console.log(res.data)
            helper.sweetalert.toast(res.data?.message);
            getTrainees();
          })

          const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
          );
          setCheckedState(updatedCheckedState);
        }
      })
    } else {
      const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
      );
      setCheckedState(updatedCheckedState);
    }

  }

  useEffect(() => {
    loadCourse();
    getTrainees();
    const loginUser = JSON.parse(sessionStorage.getItem("userinfo"));
    //// console.log("loginUser", loginUser);
    if (loginUser !== undefined) {
      setLoggedUserId(loginUser["id"]);
    }
  }, [router]);

  const columns = [
    {
      name: 'S.No',
      cell: (row, index) => {
        return (
          <>
            <p>{index + 1}</p>
          </>
        )
      },
    },
    {
      name: '',
      selector: row => row.profile_img,
      cell: (row, index) => {
        if (row.profile_img != "") {
          return (
            <>
              <img src={row.profile_img} height="50" className="" alt="User Image" />
            </>
          )
        }
      },
    },
    {
      name: 'Name',
      selector: row => row.full_name,
      wrap: true,
    },
    {
      name: 'Contact No.',
      selector: row => row.contact_no,
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
  ];

  const pagginationHandler = (page) => {
    QueryParam.page = page.selected;
    router.push({
      pathname: router.pathname,
      query: QueryParam,
    });
  };

  const assignCourse = async e => {
    e.preventDefault();
    // console.clear();
    // // console.log(e.target);
    // // console.log(sessionStorage.getItem("userinfo"))
    const formData = new FormData(e.target);
    await assignCourseModel.create(formData).then((res) => {
      //// console.log(res);
      helper.sweetalert.toast("Course Assignment to trainees updated");
      getTrainees();
    }).catch((error) => {
      // console.log(error.response?.data?.errors);
    })
  }

  return (
    <>
      <div className="trainee-body">
        <div className="trainee-admincoursemanagement d-flex flex-column" style={{ minHeight: '70vh', height: 'unset' }}>
          <div className="box-1-admincoursemanagement"></div>
          <div className="box-2-admincoursemanagement"></div>
          <div className="trainee-tag-admincoursemanagement">
            <p>Assigned Trainees</p>
          </div>
          {isLoading ||
            <>
              <input type="hidden" name="course_id" value={courseId} />
              <DataTable
                columns={columns}
                data={trainees}
                progressPending={isLoading}
                sortServer
                className='table'
                customStyles={config.dataTableStyle}
              />
            </>
          }

          {isLoading &&
            <><center>No trainees assigned in this course.</center></>
          }

        </div>
      </div>
      <div className="trainer-pagination ">
        <nav className="pagination-container d-flex justify-content-end">

        </nav>
      </div>
    </>
  )
}
export default AssignCourse;