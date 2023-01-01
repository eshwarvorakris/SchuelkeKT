import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import useSWR, { mutate } from 'swr';
import courseModel from "../../model/course.model";
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { config } from '../../lib/config';
import { helper } from '../../lib/helper';

function Page() {
  const router=useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "created_at";
  QueryParam.order_in = router.query?.order_in || "desc";
  
  const { data:courses, error, isLoading } = useSWR (QueryParam?"courseList":null, async ()=>await courseModel.list(QueryParam),config.swrConfig);

  const courseDelete=function(id)
  {
    helper.sweetalert.confirm("Delete Course","info").then((result) => {
      if(result.isConfirmed)
      {
        courseModel.delete(id).then((res)=>{
          helper.sweetalert.toast(res.data?.message);
          mutate('courseList');
        })
      }
    })
  }
  const columns = [
    {
        name: 'Course',
        selector: row => row.name,
        sortable:true,
        sortField:"name"
    },
    {
        name: 'Topic',
        selector: row => row.category?.name,
        sortable:true,
        sortField:"category.name"
    },
    {
        name: 'No. of Module',
        selector: row => row?.module_numbers,
    },
    {
        name: 'Training time',
        selector: row => row?.timing,
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
        selector: row => row.status,
    },
    {
        name: 'Action',
        cell: row => {return (
        <div className='btn-group  text-nowrap'><Link className='btn btn-primary btn-sm' href={`/course/${row.id}`}><i className='bi bi-eye'></i></Link>
        <button className='btn btn-danger btn-sm' type='button' onClick={()=>courseDelete(row.id)}><i className='bi bi-trash'></i></button></div>)},
        
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
const handleSort=function(column, sortDirection){
  QueryParam.order_by = column.sortField;
  QueryParam.order_in = sortDirection;
  router.push({
    pathname: router.pathname,
    query: QueryParam,
  }); 
}
  return (
    <div className=''>
      <div className=''>
    <Link className='btn btn-primary float-end' href={'/course/create'}>Create</Link>
      <h3>Course</h3>
      </div>
    
    <DataTable
            columns={columns}
            data={courses?.data}
            progressPending={isLoading}
            sortServer
            onSort={handleSort}
            pagination
            paginationServer
            paginationComponentOptions={config.paginationComponent}
            paginationTotalRows={courses?.meta?.total}
      			//onChangeRowsPerPage={()=>function(){ return 1}}
			      onChangePage={pagginationHandler}
            paginationPerPage="15"
            className='table'
            
            />
    </div>
  );
}

export default Page;