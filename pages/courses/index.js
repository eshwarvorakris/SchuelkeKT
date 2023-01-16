import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import useSWR, { mutate } from 'swr';
import courseModel from "../../model/course.model";
import DataTable from 'react-data-table-component';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import authModel from "../../model/auth.model";
import AppContext from "../../lib/appContext";

const admincoursemanagement = () => {
    const layoutValues=useContext(AppContext);
    {layoutValues.setPageHeading("Courses List")}
    const router = useRouter();
    const { data: profile, profileerror, profileisLoading } = useSWR('userDetail', async () => await authModel.profile());
    const QueryParam = router.query;
    QueryParam.page = router.query.page || 1;
    QueryParam.order_by = router.query?.order_by || "created_at";
    QueryParam.order_in = router.query?.order_in || "desc";

    const { data: courses, mutate: couresList, error, isLoading } = useSWR(QueryParam ? "couresList" : null, async () => await courseModel.list(QueryParam), config.swrConfig);

    const courseDelete = function (id) {
        helper.sweetalert.confirm("Are you sure you want to delete this course", "info", "true").then((result) => {
            if (result.isConfirmed) {
                courseModel.delete(id).then((res) => {
                    mutate('couresList');
                    helper.sweetalert.toast(res.data?.message);
                })
            }
        })

    }
    const columns = [
        {
            name: 'S.No',
            cell: (row, index) => {
                return (
                    <p>{index + 1}</p>
                )
            },
        },
        {
            name: 'Course',
            selector: row => row.course_name,
            sortable: true,
            sortField: "course_name"
        },
        {
            name: 'Topic',
            selector: row => row.category?.category_name,
            sortable: true,
            sortField: "category.category_name"
        },
        {
            name: 'No. of Module',
            selector: row => row?.total_modules,
        },
        {
            name: 'Training time',
            selector: row => row?.week_duration,
        },
        {
            name: 'Trainee enroll',
            selector: row => row?.trainee_count,
        },
        {
            name: 'Published By',
            selector: row => row?.trainer?.full_name,
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
                                else if (row.status == 'pending' && profile?.role == 'admin') {
                                    return (
                                        <>
                                            <span><a href={`/courses/${row.id}/update_status`} draggable="false"><button type="button" className="approve-btn">Approve</button></a></span>
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
                                        <><span className="text-danger">{row.status}</span></>
                                    );
                                }
                            })()
                        }
                    </>

                )
            },
        },
        {
            name: 'Action',
            cell: row => {
                //console.log(cell);
                if (profile?.role == 'admin' || profile?.role == 'trainer') {
                    return (
                        <div className='btn-group  text-nowrap'>
                            <Link className='btn btn-outline-primary btn-sm' href={`/courses/${row.id}/edit`}>Edit</Link>
                            <button className='btn btn-outline-danger btn-sm' type='button' onClick={() => courseDelete(row.id)}>Delete</button>
                        </div>)
                }

            },

        },
    ];

    const pagginationHandler = (page) => {
        QueryParam.page = page.selected;
        router.push({
            pathname: router.pathname,
            query: QueryParam,
        });
    };
    const handleSort = function (column, sortDirection) {
        QueryParam.order_by = column.sortField;
        QueryParam.order_in = sortDirection;
        router.push({
            pathname: router.pathname,
            query: QueryParam,
        });
    }

    { console.log(QueryParam) }
    return (
        <>
            
                <div className=" SearchandSort ">
                    <div className=" search-button-mycourse d-flex ">
                        <ion-icon name=" search-outline " className=" search-icon "></ion-icon>
                        <div className=" search-trainer "><input className=" search-mycourse" type=" text " name="search" onChange={(event) => { QueryParam.search = event.target.value; couresList() }} placeholder=" Search " /></div>
                    </div>

                    <div className=" category d-flex gap-3 align-items-center ">
                        <select name=" category " id=" cars " className="select-mycourse">
                            <option value=" Product ">Filter</option>
                            <option value=" Country ">Trainee ID</option>
                            <option value=" Country ">Trainee Name</option>
                            <option value=" Blanket ">No. of Courses Enrolled</option>
                        </select>
                    </div>
                    {(profile?.role == 'trainer') &&
                        <div className=" create-course ">
                            <a href="./courses/create">
                                <button className=" btn btn-primary create-course-btn " style={{ backgroundColor: '#008bd6' }}>Create
                                    Course <strong>+</strong></button>
                            </a>
                        </div>
                    }
                </div>
            <div className="trainee-body">
                <div className="trainee-admincoursemanagement d-flex flex-column">
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
    )
}
export default admincoursemanagement;