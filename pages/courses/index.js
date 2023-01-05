import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR, { mutate } from 'swr';
import courseModel from "../../model/course.model";
import DataTable from 'react-data-table-component';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import authModel from "../../model/auth.model";

const admincoursemanagement = () => {
    const router = useRouter();
    
    const QueryParam = router.query;
    QueryParam.page = router.query.page || 1;
    QueryParam.order_by = router.query?.order_by || "created_at";
    QueryParam.order_in = router.query?.order_in || "desc";

    const { data: courses, error, isLoading } = useSWR(QueryParam, async () => await courseModel.list(QueryParam), config.swrConfig);

    const courseDelete = function (id) {
        helper.sweetalert.confirm("Delete Course", "info").then((result) => {
            if (result.isConfirmed) {
                courseModel.delete(id).then((res) => {
                    helper.sweetalert.toast(res.data?.message);
                   // mutate('courseList');
                })
            }
        })

    }
    const columns = [
        {
            name: '#',
            cell: row => {
                return (
                    <p>#</p>
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
                    <span>{row.status == 'active' ? <span>Approved</span> : <span>Pending</span>}</span>
                )
            },
        },
        {
            name: 'Action',
            cell: row => {
                return (
                    <div className='btn-group  text-nowrap'>
                        <Link className='btn btn-outline-primary btn-sm' href={`/courses/${row.id}`}>Edit</Link>
                        <button className='btn btn-outline-danger btn-sm' type='button' onClick={() => courseDelete(row.id)}>Delete</button>
                    </div>)
            },

        },
    ];

    const pagginationHandler = (page) => {
        QueryParam.page = page.selected + 1;
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


    return (
        <>
                            {(authModel.user()?.role == 'trainer') &&
                                <div class=" SearchandSort ">
                                    <div class=" search-button-mycourse d-flex ">
                                        <ion-icon name=" search-outline " class=" search-icon "></ion-icon>
                                        <div class=" search-trainer "><input class=" search-mycourse" type=" text " placeholder=" Search " /></div>
                                    </div>

                                    <div class=" category d-flex gap-3 align-items-center ">
                                        <select name=" category " id=" cars " className="select-mycourse">
                                            <option value=" Product ">Filter</option>
                                            <option value=" Country ">Trainee ID</option>
                                            <option value=" Country ">Trainee Name</option>
                                            <option value=" Blanket ">No. of Courses Enrolled</option>
                                        </select>
                                    </div>

                                    <div class=" create-course ">
                                        <a href="./courses/create">
                                            <button class=" btn btn-primary create-course-btn " style={{ backgroundColor: '#008bd6' }}>Create
                                                Course <strong>+</strong></button>
                                        </a>
                                    </div>
                                </div>
                            }
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