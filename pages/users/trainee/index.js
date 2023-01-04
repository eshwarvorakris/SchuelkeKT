import auth from "../../../model/auth.model";
import Sidebar from "../../components/sidebar";
import Topnavbar from '../../components/topnavbar';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR, { mutate } from 'swr';
import userModal from "../../../model/user.model";
import DataTable from 'react-data-table-component';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import Link from 'next/link';

const trainee = () => {
    const router = useRouter();
    const { data: profile, error, isLoading } = useSWR('/', async () => await auth.profile());
    if (error) {
        //console.log(error);
        router.replace("/login");
    }

    const QueryParam = router.query;
    QueryParam.page = router.query.page || 1;
    QueryParam.order_by = router.query?.order_by || "created_at";
    QueryParam.order_in = router.query?.order_in || "desc";

    const { data: trainee, error: traineeerror, isLoading: traineeisLoading } = useSWR(QueryParam ? "traineeList" : null, async () => await userModal.traineeList(QueryParam), config.swrConfig);

    const courseDelete = function (id) {
        helper.sweetalert.confirm("Delete Course", "info").then((result) => {
            if (result.isConfirmed) {
                courseModel.delete(id).then((res) => {
                    helper.sweetalert.toast(res.data?.message);
                    mutate('courseList');
                })
            }
        })

    }
    const columns = [
        {
            name: 'S.No',
            cell: row => {
                return (
                    <p>#</p>
                )
            },
        },
        {
            name: 'Trainee Id',
            selector: row => 100000 + row.id,
            sortable: true,
            sortField: "id"
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
            name: 'No. of Courses Published',
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
                    <Link className='btn btn-outline-primary btn-sm' href={`/${row.id}`}>Check Status</Link>
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
            <div>
                <div className="section1-enrolledtrainer">
                    <div className="blank-class"></div>
                    <Sidebar profile={profile} />
                    <div className="container-2">
                        <div className="col-md-12 trainee-right" style={{ backgroundColor: 'unset' }}>
                            <div className="blank-nav-class"></div>
                            <Topnavbar profile={profile} />
                            <div class=" SearchandSort ">
                                {
                                    (() => {
                                        if (profile?.role == 'admin') {
                                            return (
                                                <div class=" create-course ">
                                                    <a href="/users/trainee/add">
                                                        <button class=" btn btn-primary create-course-btn " style={{ backgroundColor: '#008bd6' }}>Add Trainee <strong>+</strong></button>
                                                    </a>
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
                                        progressPending={isLoading}
                                        sortServer
                                        onSort={handleSort}
                                        pagination
                                        paginationServer
                                        paginationComponentOptions={config.paginationComponent}
                                        paginationTotalRows={trainee?.meta?.total}
                                        //onChangeRowsPerPage={()=>function(){ return 1}}
                                        onChangePage={pagginationHandler}
                                        paginationPerPage="15"
                                        className='table'
                                        customStyles={config.dataTableStyle}
                                    />

                                </div>
                            </div>
                            <div className="trainer-pagination ">
                                <nav className="pagination-container d-flex justify-content-end">
                                    <div className="pagination">
                                        <a className="pagination-newer" href="#">
                                            <ion-icon name="chevron-back-outline"></ion-icon>
                                        </a>
                                        <span className="pagination-inner">
                                            <a href="#">1</a>
                                            <a className="pagination-active" href="#">2</a>
                                            <a href="#">3</a>
                                            <a href="#">4</a>
                                            <a href="#">5</a>
                                            <a href="#">6</a>
                                        </span>
                                        <a className="pagination-older" href="#">
                                            <ion-icon name="chevron-forward-outline"></ion-icon>
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default trainee;