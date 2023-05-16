import auth from "../../../model/auth.model";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import useSWR, { mutate } from 'swr';
import courseModel from "../../../model/course.model";
import userModel from "../../../model/user.model";
import assignCourseModel from "../../../model/assign_course.model";
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import AppContext from "../../../lib/appContext";
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import moment from 'moment';
const AssignCourse = () => {
  const router = useRouter();
  const [courseName, setCourseName] = useState("");
  const [trainees, setTrainees] = useState([]);
  const [traineesMeta, setTraineesMeta] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [course, setCourse] = useState(null);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const layoutValues = useContext(AppContext);
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = "created_at";
  QueryParam.order_in = "asc";
  { layoutValues.setPageHeading("Assign Course " + courseName) }

  const [isLoading, setIsLoading] = useState(true);

  const loadCourse = async () => {
    if (router?.query?.id) {
      await courseModel.detail(router?.query?.id).then((res) => {
        //console.log("course",res);
        setCourse(res);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  const [checkedState, setCheckedState] = useState(
    new Array(20).fill(false)
  );
  const getTrainees = function () {
    delete (QueryParam.id)
    setIsLoading(true);
    QueryParam.searchCourse = courseId;
    if (!QueryParam.filter) {
      QueryParam.filter = "all";
    }
    userModel.traineeList(QueryParam).then((res) => {
      if (res?.data) {
        if ((res?.data).length > 0) {
          console.log(res)
          setTraineesMeta(res.meta)
          let tempAr = checkedState;
          res?.data.map((item, index) => {
            tempAr[index] = false;
            if (item.assigned_course !== 0) {
              tempAr[index] = true;
            }
          })
          setCheckedState(tempAr);
          setIsLoading(false);
          setTrainees(res?.data)
        }
      }
    }).catch((error) => {
      console.log(error);
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
            //console.log(res.data)
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
    //console.log("course",course?.data?.status_update_on);
    if (course?.data !== undefined) {
      setCourseName("(" + course?.data.course_name + ")");
      setCourseId(course?.data?.id);
    }
  }, [course]);

  useEffect(() => {
    loadCourse();
    const loginUser = JSON.parse(sessionStorage.getItem("userinfo"));
    console.log("loginUser", loginUser);
    if (loginUser !== undefined) {
      setLoggedUserId(loginUser["id"]);
    }
  }, [router]);

  useEffect(() => {
    if (courseId !== null) {
      getTrainees();
    }
  }, [courseId]);

  const columns = [
    {
      name: 'S.No',
      cell: (row, index) => {
        return (
          <>
            <p><input type="checkbox" name="trainee_ids[]" value={row.id} checked={checkedState[index]} onChange={() => handleOnChange(index, row.assigned_course)} /> {index + 1}</p>
          </>
        )
      },
      allowOverflow: true,
      button: true,
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
    page.selected++;
    QueryParam.page = page.selected;
    router.push({
      pathname: router.pathname,
      query: QueryParam,
    });
  };



  const assignCourse = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    helper.sweetalert.confirm("Are you sure you want to assign this course?", "info", true).then(async (result) => {
      if (result.isConfirmed) {
        await assignCourseModel.create(formData).then((res) => {
          //console.log(res);
          helper.sweetalert.toast("Course Assignment to trainees updated");
          getTrainees();
        }).catch((error) => {
          console.log(error.response?.data?.errors);
        })
      }
    })
    
  }

  const handleCheckAll = (async (e) => {
    if (e.target.checked) {
      const updatedCheckedState = checkedState.map((item, index) =>
        true
      );
      setCheckedState(updatedCheckedState);
    } else {
      var inputs = document.getElementsByClassName('traineeCheck');
      var assign_ids = [];
      for (var i = 0, l = inputs.length; i < l; ++i) {
        if (inputs[i].checked) {
          if (inputs[i].getAttribute("data-assignId") != 0) {
            assign_ids.push(inputs[i].getAttribute("data-assignId"))
          }
        }
      }
      if (assign_ids != "") {
        helper.sweetalert.confirm("Are you sure to unassign", "info", true).then((result) => {
          if (result.isConfirmed) {
            const formData = new FormData();
            formData.append("ids", assign_ids);
            assignCourseModel.deleteAll(formData).then((res) => {
              //console.log(res.data)
              helper.sweetalert.toast(res.data?.message);
              getTrainees();
            })
          }
        })
      } else {
        const updatedCheckedState = checkedState.map((item, index) =>
          false
        );
        setCheckedState(updatedCheckedState);
      }
    }
  });
  return (
    <>
      <div className=" SearchandSort ">
        <div className=" search-button-mycourse d-flex ">
          <ion-icon name=" search-outline " className=" search-icon "></ion-icon>
          <div className=" search-trainer "><input className=" search-mycourse" type=" text " name="search" onChange={(event) => { QueryParam.search = event.target.value; getTrainees(); }} placeholder=" Search " /></div>
        </div>

        <div className=" category d-flex gap-3 align-items-center " style={{ marginRight: '2rem' }}>
          <select name="search_type"
            className="select-mycourse" style={{ padding: '1px', width: '8.5rem' }}
            onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="full_name">Name</option>
            <option value="email">Email</option>
            <option value="contact_no">Contact Number</option>
            <option value="country">Country</option>
          </select>
        </div>

      </div>
      <div className="trainee-body">
        <div className="trainee-admincoursemanagement d-flex flex-column" style={{ minHeight: '70vh', height: 'unset' }}>
          <div className="box-1-admincoursemanagement"></div>
          <div className="box-2-admincoursemanagement"></div>
          <div className="trainee-tag-admincoursemanagement">
            <p>Trainees</p>
          </div>
          {isLoading ||
            <>
              <form onSubmit={assignCourse}>
                <input type="hidden" name="course_id" value={courseId} />
                <div className="table-responsive">
                  <table className="table w-100 ">
                    <thead>
                      <tr style={{ height: '52px', padding: '.5rem' }}>
                        <th><input type="checkbox" name="checkAll" onChange={handleCheckAll} /> S.No</th>
                        <th></th>
                        <th>Name</th>
                        <th>Contact No.</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainees?.map((item, index) => {
                        return (
                          <>
                            <tr style={{ color: 'black', padding: '.5rem', borderBottomWidth: '1px', minHeight: '48px', backgroundColor: 'white' }}>
                              <td style={{ fontSize: '13px', fontWeight: '400' }}>
                                <p><input type="checkbox" className="traineeCheck" name="trainee_ids[]" data-assignId={item.assigned_course} value={item.id} checked={checkedState[index]} onChange={() => handleOnChange(index, item.assigned_course)} /> {index + 1}</p>
                              </td>
                              <td style={{ fontSize: '13px', fontWeight: '400' }}><img src={item.profile_img} height="50" className="" alt="User Image" /></td>
                              <td style={{ fontSize: '13px', fontWeight: '400' }}>{item.full_name}</td>
                              <td style={{ fontSize: '13px', fontWeight: '400' }}>{item.contact_no}</td>
                              <td style={{ fontSize: '13px', fontWeight: '400' }}>{item.email}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <center><button type="submit" className="btn btn-outline-success ">Assign Course</button></center>
              </form>
            </>
          }

          {isLoading &&
            <><center><p style={{ paddingTop: '3rem' }}>Search for trainee first to assign / unassign Course</p></center></>
          }

        </div>
      </div>
      <div className="trainer-pagination ">
        <nav className="pagination-container d-flex justify-content-end">
          {!isLoading &&
            <ReactPaginate
              threeDots={true}
              pageCount={traineesMeta?.total_page}
              disableInitialCallback={true}
              initialPage={traineesMeta?.current_page}
              pageRangeDisplayed={10}
              prevNext
              breakLabel="..."
              onPageChange={pagginationHandler}
              className="pagination float-end float-right"
              pageLinkClassName='page-link pagination-link'
              pageClassName="page-item border-0"
              renderOnZeroPageCount={null}
            />
          }
        </nav>
      </div>
    </>
  )
}
export default AssignCourse;