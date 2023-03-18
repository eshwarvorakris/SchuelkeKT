import auth from "../../../model/auth.model";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import AppContext from "../../../lib/appContext";
import useSWR, { mutate } from 'swr';
import userModal from "../../../model/user.model";
import DataTable from 'react-data-table-component';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import baseModel from "../../../model/base.model";
import Select from 'react-select';
import _ from 'lodash';

const trainer = () => {
    const router = useRouter();
    const layoutValues = useContext(AppContext);
    { layoutValues.setPageHeading("Trainer Lists") }

    const QueryParam = router.query;
    QueryParam.page = router.query.page || 1;
    QueryParam.order_by = router.query?.order_by || "id";
    QueryParam.order_in = router.query?.order_in || "desc";

    const { data: trainer, mutate: trainerList, error: trainererror, isLoading: trainerisLoading } = useSWR(QueryParam ? "trainerList" : null, async () => await userModal.trainerList(QueryParam), config.swrConfig);
    const userDelete = function (id) {
        //console.log(id);
        helper.sweetalert.confirm("Are you sure you want to delete this trainer", "info", true).then((result) => {
            if (result.isConfirmed) {
                userModal.delete(id).then((res) => {
                    helper.sweetalert.toast(res.data?.message);
                    //console.log(res);
                    mutate('trainerList');
                })
            }
        })

    }
    useEffect(() => {
        console.clear();
        console.log("trainers : ", trainer);
    }, [trainer]);

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
            name: 'Trainer Id',
            selector: row => row.user_id,
            cell: row => {
                return (
                    <p className="d-flex gap-2 profile-icon">
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
            name: 'Trainer Name',
            selector: row => row.full_name,
            sortable: true,
            wrap: true,
            sortField: "full_name"
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
            name: 'No. of Courses Published',
            selector: row => row?.course_count,
            cell: row => {
                return (
                    <p>{row?.course_count}</p>
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
                            <Link className='btn btn-outline-primary btn-sm' href={`/users/trainer/${row.id}/status`}>Check Status</Link>
                            <Link className='btn btn-outline-primary btn-sm' href={`/users/trainer/${row.id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                            <button className='btn btn-outline-danger btn-sm' type='button' onClick={() => userDelete(row.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                        </div>
                    </>

                )
            }
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
        //console.log(rows)
        QueryParam.order_by = column.sortField;
        QueryParam.order_in = sortDirection;
        /* router.push({
            pathname: router.pathname,
            query: QueryParam,
        }); */
        trainerList();
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

    const [hideStatusDropdown, setHideStatusDropdown] = useState(true);
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
        if (e.target.value == "status") {
            setHideStatusDropdown(false)
        } else if (e.target.value == "country") {
            setHideCountryDropdown(false)
        }
        trainerList()
    });

    const onCountrySelect = (e) => {
        //console.log(e.value);
        QueryParam.filterParam = e.value;
        trainerList();
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

    return (
        <>
            <div className=" SearchandSort ">
                <div className=" search-button-mycourse d-flex ">
                    <ion-icon name=" search-outline " className=" search-icon "></ion-icon>
                    <div className=" search-trainer "><input className=" search-mycourse" type=" text " name="search" onChange={(event) => { QueryParam.search = event.target.value; trainerList() }} placeholder=" Search " /></div>
                </div>

                <div className=" category d-flex gap-3 align-items-center " style={{ marginRight: '2rem' }}>
                    <select name=" category "
                        className="select-mycourse" style={{ padding: '1px', width: '8.5rem' }}
                        onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="country">Country Name</option>
                        <option value="status">Trainer Status</option>
                    </select>
                </div>
                {!hideStatusDropdown &&
                    <div className=" category d-flex gap-3 align-items-center " style={{ marginRight: '2rem' }}>
                        <select name="statusChange"
                            className="select-mycourse" style={{ padding: '1px', width: '8.5rem' }}
                            onChange={(event) => { QueryParam.filterParam = event.target.value; trainerList() }}>
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
                                <div className=" create-course ">
                                    <Link href="/users/trainer/add" className=" btn btn-primary create-course-btn " style={{ backgroundColor: '#008bd6' }}>
                                        Add Trainer <strong>+</strong>
                                    </Link>
                                </div>
                            );
                        }
                    })()
                }
            </div>
            <div className="trainee-body">
                <div className="trainee-admincoursemanagement d-flex flex-column" style={{ height: 'fit-content' }}>
                    <div className="box-1-admincoursemanagement"></div>
                    <div className="box-2-admincoursemanagement"></div>
                    <div className="trainee-tag-admincoursemanagement">
                        <p>Trainer List</p>
                    </div>
                    <DataTable
                        columns={columns}
                        data={trainer?.data}
                        progressPending={trainerisLoading}
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
                        pageCount={trainer?.meta?.total_page}
                        initialPage={trainer?.meta?.current_page}
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
export default trainer;