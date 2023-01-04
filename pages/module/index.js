import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import Sidebar from "../components/sidebar";
import Topnavbar from '../components/topnavbar';
import moduleModel from "../../model/module.model";
import auth from "../../model/auth.model";
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Page() {
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "created_at";
  QueryParam.order_in = router.query?.order_in || "desc";

  const { data: profile, profile_error, profile_isLoading } = useSWR('/', async () => await auth.profile());

  const { data: modules, error, isLoading } = useSWR(QueryParam ? "moduleList" : null, async () => await moduleModel.list(QueryParam), config.swrConfig);

  const moduleDelete = function (id) {
    helper.sweetalert.confirm("Delete module", "info").then((result) => {
      if (result.isConfirmed) {
        moduleModel.delete(id).then((res) => {
          helper.sweetalert.toast(res.data?.message);
          mutate('moduleList');
        })
      }
    })
  }
  const columns = React.useMemo(() =>[
    {
      name: 'Module',
      selector: row => row.name,
      sortable: true,
      sortField: "name"
    },
    {
      name: 'Course',
      selector: row => row.course?.name,
      sortable: true,
      sortField: "module.name"
    },
    {
      name: 'Approval Status',
      selector: row => row.status
    },
    {
      name: 'Action',
      cell: row => {
        return (
          <div className='btn-group  text-nowrap'><Link className='btn btn-primary btn-sm' href={`/module/${row.id}`}><FontAwesomeIcon icon={"edit"} /></Link>
            <button className='btn btn-danger btn-sm' type='button' onClick={() => moduleDelete(row.id)}><FontAwesomeIcon icon={"trash"} /></button></div>)
      },

    },
  ]);

  //const [brands,setBrands]=useState([]);
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
      <div>
        <div className="section1-enrolledtrainer">
          <div className="blank-class"></div>
          <div className="container-2">
            <div className="col-md-12 trainee-right" style={{ backgroundColor: 'unset' }}>
              <div className="blank-nav-class"></div>

              <div className="trainee-body">
                <div className="trainee-admincoursemanagement d-flex flex-column">
                  <div className="box-1-admincoursemanagement"></div>
                  <div className="box-2-admincoursemanagement"></div>
                  <div className="trainee-tag-admincoursemanagement">
                    <p>Module</p>
                  </div>

                  <DataTable
                    columns={columns}
                    data={modules?.data}
                    progressPending={isLoading}
                  />
                </div>
                </div>
                </div>
                <div className="trainer-pagination ">
                  <nav className="pagination-container d-flex justify-content-end">
                    <ReactPaginate
                      threeDots={true}
                      pageCount={modules?.meta?.total_page}
                      initialPage={modules?.meta?.current_page}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;