import auth from "../../../model/auth.model";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import useSWR, { mutate } from 'swr';
import userModal from "../../../model/user.model";
import DataTable from 'react-data-table-component';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import AppContext from "../../../lib/appContext";

const trainee = () => {
    const router = useRouter();
    const layoutValues=useContext(AppContext);
    {layoutValues.setPageHeading("Trainee List")}

    const QueryParam = router.query;
    QueryParam.page = router.query.page || 1;
    QueryParam.order_by = router.query?.order_by || "created_at";
    QueryParam.order_in = router.query?.order_in || "desc";

    const { data: trainee, mutate: traineeList, error: traineeerror, isLoading: traineeisLoading } = useSWR(QueryParam ? "traineeList" : null, async () => await userModal.traineeList(QueryParam), config.swrConfig);

    const userDelete = function (id) {
        //console.log(id);
        helper.sweetalert.confirm("Are you sure you want to delete this trainee", "info", true).then((result) => {
            if (result.isConfirmed) {
                userModal.delete(id).then((res) => {
                    helper.sweetalert.toast(res.data?.message);
                    //console.log(res);
                    mutate('traineeList');
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
            name: 'Trainee Id',
            cell: row => {
                return (
                    <p>
                        {
                            (() => {
                                if(row.profile_img === null || row.profile_img == ""){
                                    return (
                                        <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                    );
                                }
                                else {
                                    return (
                                        <img src={row.profile_img} style={{height:'25px', width:'25px', borderRadius:'50%'}} />
                                    );
                                }
                            })()
                        }
                        <span> {row.user_id}</span>
                    </p>
                )
            },
        },
        {
            name: 'Trainee Name',
            selector: row => row.full_name,
            sortable: true,
            sortField: "full_name"
        },
        {
            name: 'Email',
            selector: row => row?.email,
        },
        {
            name: 'No. of Courses Enrolled',
            cell: row => {
                return (
                    <p>0</p>
                )
            },
        },
        {
            name: '',
            cell: row => {
                return (
                    <>
                    <div className='btn-group  text-nowrap p-1'>
                        <Link className='btn btn-outline-primary btn-sm' href={`/users/trainee/${row.id}/status`}>Check Status</Link>
                        <Link className='btn btn-outline-primary btn-sm' href={`/users/trainee/${row.id}/`}><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                        <button className='btn btn-outline-danger btn-sm' type='button' onClick={() => userDelete(row.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </div>
                    </>
                )
            },
        },
    ];

    //const [brands,setBrands]=useState([]);
    const pagginationHandler = (page) => {
        QueryParam.page = page;
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
            <div className=" SearchandSort ">
                {
                    (() => {
                        if (layoutValues?.profile?.role == 'admin') {
                            return (
                                <div className=" create-course ">
                                    <Link href="/users/trainee/add" className=" btn btn-primary create-course-btn " style={{ backgroundColor: '#008bd6' }}>
                                        Add Trainee <strong>+</strong>
                                    </Link>
                                </div>
                            );
                        }
                    })()
                }
            </div>
            <div className="trainee-body">
                <div className="trainee-admincoursemanagement d-flex flex-column">
                    <div className="box-1-admincoursemanagement"></div>
                    <div className="box-2-admincoursemanagement"></div>
                    <div className="trainee-tag-admincoursemanagement">
                        <p>Trainee List</p>
                    </div>
                    <DataTable
                        columns={columns}
                        data={trainee?.data}
                        progressPending={traineeisLoading}
                        sortServer
                        onSort={handleSort}
                        className='table'
                        customStyles={config.dataTableStyle}
                    />

                </div>
            </div>
            <div className="trainer-pagination ">
                <nav className="pagination-container d-flex justify-content-end">
                    <ReactPaginate
                        threeDots={true}
                        pageCount={trainee?.meta?.total_page}
                        initialPage={trainee?.meta?.current_page}
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
export default trainee;