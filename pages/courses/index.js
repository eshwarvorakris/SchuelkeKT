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
import TabCourseList from "../components/tabCourseList"
import RecentLearningCard from "../components/recentLearningCard"
import baseModel from "../../model/base.model";
import Select from 'react-select';
import _ from 'lodash';
import moment from 'moment';
import YearDropdown from "../components/yearDropdown";

const admincoursemanagement = () => {
    const layoutValues = useContext(AppContext);
    { layoutValues.setPageHeading("Courses List") }
    const router = useRouter();

    const QueryParam = router.query;
    const curTime = moment();
    QueryParam.page = router.query.page || 1;
    QueryParam.order_by = router.query?.order_by || "created_at";
    QueryParam.order_in = router.query?.order_in || "desc";
    const { data: countryLists, countryerror, countryisLoading, mutate: countryListMutate } = useSWR('countryList', async () => await baseModel.countrylist());
    //const { data: courses, mutate: couresList1, error, isLoading } = useSWR(QueryParam ? "couresList" : null, async () => await courseModel.list(QueryParam), config.swrConfig);
    const [courses, setCourses] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const couresList = async () => {
        setisLoading(true);
        await courseModel.list(QueryParam).then((result) => {
            //console.log("data", result);
            setCourses(result);
            setisLoading(false);
        });
    }

    useEffect(() => {
        couresList();
    }, [QueryParam]);

    const courseDelete = function (id) {
        helper.sweetalert.confirm("Are you sure you want to delete this course", "info", "true").then((result) => {
            if (result.isConfirmed) {
                courseModel.delete(id).then((res) => {
                    couresList();
                    helper.sweetalert.toast(res.data?.message);
                })
            }
        })

    }

    const courseUnapprove = function (id) {
        helper.sweetalert.confirm("Are you sure you want to undo the status of this course", "info", "true").then((result) => {
            if (result.isConfirmed) {
                const updateCourse = new FormData();
                updateCourse.append('status', 'pending');
                courseModel.update(id, updateCourse).then((res) => {
                    couresList();
                    helper.sweetalert.toast("Course Status Updated.");
                })
            }
        })

    }
    const currentDate = new Date();
    const columns = [
        {
            name: 'S.No',
            cell: (row, index) => {
                const curIndex = (((QueryParam.page - 1) * 15) + (index + 1));
                return (
                    <p>{curIndex}</p>
                )
            },
            width: '7%',
        },
        {
            name: 'Course',
            selector: row => row.course_name,
            cell: (row, index) => {
                const dateToCheck = new Date(row.created_at);
                const isCurrentMonth = dateToCheck.getMonth() === currentDate.getMonth() &&
                    dateToCheck.getFullYear() === currentDate.getFullYear();
                if(isCurrentMonth) {
                    return (
                        <><p><img src="/admin-images/new.png" height={20} /><br /> {row.course_name}</p></>
                    );
                } else {
                    return (
                        <p>{row.course_name}</p>
                    );
                }
            },
            sortable: true,
            sortField: "course_name",
            wrap: true,
        },
        {
            name: 'Topic',
            selector: row => row.category?.category_name,
            sortable: true,
            sortField: "category.category_name",
            width: '8%',
            wrap: true,
        },
        {
            name: 'Quiz Added',
            selector: row => row.question_added,
            sortable: true,
            sortField: "row.question_added",
            cell: (row, index) => {
                return (
                    <span className="text-capitalize">{row.question_added}</span>
                )
            },
            width: '8%',
        },
        {
            name: 'No. of Module',
            selector: row => row?.total_modules,
            width: '5%',
        },
        {
            name: 'Training time',
            selector: row => row?.week_duration,
            width: '8%',
        },
        // {
        //     name: 'Trainee enroll',
        //     selector: row => row?.trainee_count,
        // },
        {
            name: 'Published By',
            selector: row => row?.trainer?.full_name,
            cell: (row, index) => {
                return (
                    <>
                        <div style={{ display: 'block' }}>
                            <label>{row?.trainer?.full_name}</label>
                        </div>
                    </>
                )
            },
            wrap: false,
            width: '15%',
        },
        {
            name: 'Published By Email',
            selector: row => row?.trainer?.full_name,
            cell: (row, index) => {
                return (
                    <>
                        <div style={{ display: 'block' }}>
                            <label>{row?.trainer?.email}</label>
                        </div>
                    </>
                )
            },
            wrap: false,
            width: '15%',
        },
        {
            name: 'Passing Rate(%)',
            selector: row => row?.passing_rate,
            wrap: true,
        },
        {
            name: 'Average Score',
            selector: row => row?.average_score,
            wrap: true,
        },
        {
            name: 'Country',
            selector: row => row?.trainer?.country,
            wrap: true,
            width: '8%',
        },
        {
            name: 'Approval Status',
            selector: row => {
                return (
                    <>
                        {
                            (() => {
                                if (row.status == 'active' || row.status == 'approved') {
                                    return (
                                        <><span className="text-success">Approved</span></>
                                    );
                                }
                                else if (row.status == 'pending' && layoutValues?.profile?.role == 'admin') {
                                    return (
                                        <>
                                            <span><Link href={`/courses/${row.id}/update_status`} draggable="false"><button type="button" className="approve-btn p-1" title="Approve Course">To be Approved</button></Link></span>
                                        </>
                                    );
                                }
                                else if (row.status == 'rejected') {
                                    return (
                                        <><span className="text-danger">Rejected</span></>
                                    );
                                }
                                else {
                                    return (
                                        <><span className="text-danger text-capitalize">{row.status}</span></>
                                    );
                                }
                            })()
                        }
                    </>

                )
            },
            width: '15%',
        },
        {
            name: 'Action',
            cell: row => {
                //console.log(cell);
                if (layoutValues?.profile?.role == 'admin' || layoutValues?.profile?.role == 'trainer') {
                    return (
                        <>
                            <div style={{ flexWrap: 'wrap' }}>
                                <div className='btn-group  text-nowrap'>
                                    <Link className='btn btn-outline-primary btn-sm' href={`/courses/${row.id}/edit`} title="Edit"><i class="fa fa-pencil" aria-hidden="true"></i></Link>
                                    <button className='btn btn-outline-danger btn-sm' type='button' onClick={() => courseDelete(row.id)} title="Delete"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                    {(() => {

                                        if (layoutValues?.profile?.role == 'admin') {
                                            if (row.status === "approved") {
                                                let updateLate = moment(row?.status_update_on).add(process.env.NEXT_PUBLIC_MAXIMUM_MIN_UNDU_ALLOWED, 'minutes');
                                                if (curTime.isBefore(updateLate)) {
                                                    return (
                                                        <>
                                                            <button className='btn btn-outline-warning btn-sm' type='button' onClick={() => courseUnapprove(row.id)} title="Undu"><i class="fa fa-undo" aria-hidden="true"></i></button>
                                                        </>
                                                    );
                                                }
                                            } else if (row.status !== "pending") {
                                                return (
                                                    <>
                                                        <button className='btn btn-outline-warning btn-sm' type='button' onClick={() => courseUnapprove(row.id)} title="Undu"><i class="fa fa-undo" aria-hidden="true"></i></button>
                                                    </>
                                                );
                                            }
                                        }
                                    })()}
                                </div>
                                {(() => {
                                    if (row.status === "approved") {
                                        return (
                                            <>
                                                <br />
                                                <div className='text-nowrap'><Link href={`/courses/${row.id}/assign_course`} className="btn btn-outline-info btn-sm p-1">Assign Course</Link></div>

                                                <div className='text-nowrap'><Link href={`/courses/${row.id}/assigned_trainee`} className="btn btn-outline-info btn-sm p-1">Assigned Trainees</Link></div>
                                            </>
                                        );
                                    }
                                })()}

                            </div>
                        </>
                    )
                }

            },

        },
    ];

    const pagginationHandler = (page) => {
        page.selected++;
        console.log("page : ", page)
        QueryParam.page = page.selected;
        router.push({
            pathname: router.pathname,
            query: QueryParam,
        });
        couresList();
    };
    const handleSort = function (column, sortDirection) {
        QueryParam.order_by = column.sortField;
        QueryParam.order_in = sortDirection;
        /* router.push({
            pathname: router.pathname,
            query: QueryParam,
        }); */
        couresList();
    }

    const [selectCountry, setSelectCountry] = useState(null);
    const [countryOptions, setCountryOptions] = useState([]);
    useEffect(() => {
        const opt = [];
        let countries = _.orderBy(countryLists, [function (o) { return o.name.common; }], ['asc']);

        countries?.map((item, index) => {
            opt.push({ value: item.name.common, label: item.name.common })
        });
        if (opt.length > 0) {
            setCountryOptions(opt);
        }
    }, [countryLists]);

    const [hideStatusDropdown, setHideStatusDropdown] = useState(true);
    const [hideTopicDropdown, setHideTopicDropdown] = useState(true);
    const [hideCountryDropdown, setHideCountryDropdown] = useState(true);
    const handleFilterChange = (async (e) => {
        QueryParam.filter = e.target.value;
        QueryParam.search = "";
        QueryParam.filterParam = "all";
        if (e.target.value == "all") {
            delete (QueryParam.filter)
            delete (QueryParam.search)
            delete (QueryParam.filterParam)
        }

        setHideStatusDropdown(true);
        setHideTopicDropdown(true);
        setHideCountryDropdown(true);
        if (e.target.value == "category") {
            setHideTopicDropdown(false)
        } else if (e.target.value == "status") {
            setHideStatusDropdown(false)
        }
        else if (e.target.value == "country") {
            setHideCountryDropdown(false)
        }
        couresList()
    });
    const onCountrySelect = (e) => {
        //console.log(e.value);
        QueryParam.filterParam = e.value;
        couresList();
        setSelectCountry(e);
    };

    const countryStyles = {
        control: base => ({
            ...base,
            height: 35,
            minHeight: 35,
            width: '10rem',
        })
    };

    // useEffect(() => {
    //     console.clear();
    //     console.log(courses);
    // }, [courses]);
    const handleYearChange = (e) => {
        QueryParam.year = e.target.value;
        router.push({
            pathname: router.pathname,
            query: QueryParam,
        });
    }
    return (
        <>
            {
                (() => {
                    if (layoutValues?.profile?.role == 'trainer' || layoutValues?.profile?.role == 'admin') {
                        return (
                            <>
                                <div className=" SearchandSort ">
                                    <div className=" search-button-mycourse d-flex ">
                                        <ion-icon name=" search-outline " className=" search-icon "></ion-icon>
                                        <div className=" search-trainer "><input className=" search-mycourse" type=" text " name="search" onChange={(event) => { QueryParam.search = event.target.value; couresList() }} placeholder=" Search " /></div>
                                    </div>

                                    <div className=" category d-flex gap-3 align-items-center " style={{ marginRight: '2rem' }}>
                                        <select name="category"
                                            className="select-mycourse" style={{ padding: '1px', width: '8.5rem' }}
                                            onChange={handleFilterChange}>
                                            <option value="all">All</option>
                                            {/* <option value="course_name">Course Name</option> */}
                                            <option value="country">Country Name</option>
                                            <option value="category">Topic</option>
                                            <option value="status">Approval Status</option>
                                        </select>
                                    </div>

                                    {!hideStatusDropdown &&
                                        <div className=" category d-flex gap-3 align-items-center " style={{ marginRight: '2rem' }}>
                                            <select name="statusChange"
                                                className="select-mycourse" style={{ padding: '1px', width: '8.5rem' }}
                                                onChange={(event) => { QueryParam.filterParam = event.target.value; couresList() }}>
                                                <option value="all">All Status</option>
                                                <option value="approved">Approved</option>
                                                <option value="pending">Pending</option>
                                                {
                                                    (() => {
                                                        if (layoutValues?.profile?.role == 'admin') {
                                                            return (
                                                                <>
                                                                    <option value="rejected">Rejected</option>
                                                                </>);
                                                        }
                                                    })()
                                                }
                                            </select>
                                        </div>
                                    }

                                    {!hideTopicDropdown &&
                                        <div className=" category d-flex gap-3 align-items-center " style={{ marginRight: '2rem' }}>
                                            <select name="topicChange"
                                                className="select-mycourse" style={{ padding: '1px', width: '8.5rem' }}
                                                onChange={(event) => { QueryParam.filterParam = event.target.value; couresList() }}>
                                                <option value="all">All Topics</option>
                                                <option value="country">Country</option>
                                                <option value="product">Product</option>
                                                <option value="blanket">Blanket</option>
                                            </select>
                                        </div>
                                    }
                                    {!hideCountryDropdown &&
                                        <div className=" category d-flex gap-3 align-items-center " style={{ marginRight: '2rem' }}>
                                            {/* <select name="topicChange"
                                                className="select-mycourse" style={{ padding: '1px', width: '8.5rem' }}
                                                onChange={(event) => { QueryParam.filterParam = event.target.value; couresList() }}>

                                                <option value="country">Country</option>
                                                <option value="product">Product</option>
                                                <option value="blanket">Blanket</option>
                                            </select> */}
                                            <Select
                                                isSearchable
                                                options={countryOptions}
                                                name={"country"}
                                                placeholder="Select Country"
                                                value={selectCountry}
                                                onChange={onCountrySelect}
                                                styles={countryStyles}
                                            />
                                        </div>
                                    }
                                    <div style={{width:'10rem'}}><YearDropdown handleYear={handleYearChange} /></div>
                                    {(layoutValues?.profile?.role == 'trainer') &&
                                        <div className=" create-course ">
                                            <Link href="/courses/create" className=" btn btn-primary create-course-btn " style={{ backgroundColor: '#008bd6' }}>
                                                Create Course <strong>+</strong>
                                            </Link>
                                        </div>
                                    }
                                </div>
                                <div className="trainee-body">
                                    <div className="trainee-admincoursemanagement d-flex flex-column" style={{ minHeight: '70vh', height: 'unset' }}>
                                        <div className="box-1-admincoursemanagement"></div>
                                        <div className="box-2-admincoursemanagement"></div>
                                        <div className="trainee-tag-admincoursemanagement">
                                            <p>Courses</p>
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
                    else {
                        return (
                            <>
                                <form style={{ marginTop: '12%' }}>
                                    <RecentLearningCard />
                                    <TabCourseList />
                                </form>
                            </>
                        );

                    }
                })()
            }

        </>
    )
}
export default admincoursemanagement;