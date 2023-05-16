import auth from "../../../model/auth.model";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import useSWR, { mutate } from 'swr';
import userModal from "../../../model/user.model";
import widgetModal from "../../../model/widget.model";
import DataTable from 'react-data-table-component';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import AppContext from "../../../lib/appContext";
import baseModel from "../../../model/base.model";
import Select from 'react-select';
import _ from 'lodash';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const trainee = () => {
    const router = useRouter();
    const layoutValues = useContext(AppContext);
    const [courseCount, setCourseCount] = useState(0);
    const [traineeData, setTraineeData] = useState(null);
    { layoutValues.setPageHeading("Trainee List") }

    const QueryParam = router.query;
    QueryParam.page = router.query.page || 1;
    QueryParam.order_by = router.query?.order_by || "created_at";
    QueryParam.order_in = router.query?.order_in || "desc";

    const { data: trainee, mutate: traineeList, error: traineeerror, isLoading: traineeisLoading } = useSWR(QueryParam ? "traineeList" : null, async () => await userModal.traineeList(QueryParam), config.swrConfig);

    useEffect(() => {
        widgetModal.approvedCourseCount().then((reswidget) => {
            //console.log("reswidget", reswidget?.data);
            setCourseCount(reswidget?.data?.total);
        }).catch((error) => {
            console.log(error);
        });
    }, [])

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
            width: "6%"
        },
        {
            name: 'Trainee Id',
            selector: row => row.user_id,
            cell: row => {
                return (
                    <p>
                        {
                            (() => {
                                if (row.profile_img === null || row.profile_img == "") {
                                    return (
                                        <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                    );
                                }
                                else {
                                    return (
                                        <img src={row.profile_img} style={{ height: '25px', width: '25px', borderRadius: '50%' }} />
                                    );
                                }
                            })()
                        }
                        <span> {row.user_id}</span>
                    </p>
                )
            },
            sortable: true,
            sortField: "user_id",
            width: "11%"
        },
        {
            name: 'Trainee Name',
            selector: row => row.full_name,
            sortable: true,
            sortField: "full_name",
            wrap: true
        },
        {
            name: 'Email',
            selector: row => row?.email,
            wrap: true
        },
        {
            name: 'Country',
            selector: row => row?.country,
            wrap: true,
            width: "10%"
        },
        {
            name: 'No. of Courses Enrolled',
            selector: row => row?.course_count,
            cell: row => {
                return (
                    <p>{courseCount}</p>
                )
            },
            sortable: true,
            sortField: "course_count",
            width: "8%"
        },
        {
            name: 'Year Of Joining',
            cell: row => {
                return (
                    <p>{row?.joining_year}</p>
                )
            },
            width: "7%"
        },
        {
            name: 'Status',
            cell: row => {
                return (
                    <p className="text-capitalize">{row?.status}</p>
                )
            },
            width: "8%"
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
        traineeList();
    }

    const { data: countryLists, countryerror, countryisLoading, mutate: countryListMutate } = useSWR('countryList', async () => await baseModel.countrylist());
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
    const [hideCountryDropdown, setHideCountryDropdown] = useState(true);

    const [hideStatusDropdown, setHideStatusDropdown] = useState(true);
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
        if (e.target.value == "status") {
            setHideStatusDropdown(false)
        } else if (e.target.value == "country") {
            setHideCountryDropdown(false)
        }
        traineeList()
    });

    const onCountrySelect = (e) => {
        //console.log(e.value);
        QueryParam.filterParam = e.value;
        traineeList();
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
    var curDate = new Date().toISOString().slice(0,10);
    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(traineeData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, curDate+'-trainees.xlsx');
    };

    useEffect(() => {
        if (trainee?.data) {
            if (trainee?.data.length > 0) {
                var tempData = [];
                trainee?.data.map((item, index) => {
                    tempData.push({ 
                        'Trainee Id': item.user_id, 
                        'Trainee Name': item.full_name,
                        'Email': item.email,
                        'Country': item.country,
                        'No. Of Courses Enrolled': item.course_count,
                        'Year Of Joining': item.joining_year,
                        'Status': item.status,
                    })
                })
                setTraineeData(tempData);
            }
        }
    }, [trainee])

    return (
        <>
            <div className=" SearchandSort ">
                <div className=" search-button-mycourse d-flex ">
                    <ion-icon name=" search-outline " className=" search-icon "></ion-icon>
                    <div className=" search-trainer "><input className=" search-mycourse" type=" text " name="search" onChange={(event) => { QueryParam.search = event.target.value; traineeList() }} placeholder=" Search " /></div>
                </div>

                <div className=" category d-flex gap-3 align-items-center " style={{ marginRight: '2rem' }}>
                    <select name=" category "
                        className="select-mycourse" style={{ padding: '1px', width: '8.5rem' }}
                        onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="country">Country Name</option>
                        <option value="status">Trainee Status</option>
                    </select>
                </div>
                {!hideStatusDropdown &&
                    <div className=" category d-flex gap-3 align-items-center " style={{ marginRight: '2rem' }}>
                        <select name="statusChange"
                            className="select-mycourse" style={{ padding: '1px', width: '8.5rem' }}
                            onChange={(event) => { QueryParam.filterParam = event.target.value; traineeList() }}>
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">In-Active</option>
                        </select>
                    </div>
                }
                {!hideCountryDropdown &&
                    <div className=" category d-flex gap-3 align-items-center " style={{ marginRight: '2rem' }}>

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

                {
                    (() => {
                        if (layoutValues?.profile?.role == 'admin') {
                            return (
                                <div className=" create-course " style={{ display: 'flex', gap: '.5rem' }}>
                                    <Link href="/users/trainee/add" className=" btn btn-primary create-course-btn " style={{ backgroundColor: '#008bd6' }}>
                                        Add Trainee <strong>+</strong>
                                    </Link>
                                    <button onClick={handleExport} className=" btn create-course-btn " style={{ backgroundColor: '#10793F', color: 'white' }}>
                                        Export Excel
                                    </button>
                                </div>
                            );
                        }
                    })()
                }
            </div>
            <div className="trainee-body">
                <div className="trainee-admincoursemanagement d-flex flex-column" style={{ minHeight: '85vh', height: 'unset' }}>
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
                        pageLinkClassName='page-link  pagination-link'
                        pageClassName="page-item border-0"
                    />
                </nav>
            </div>
        </>
    )
}
export default trainee;