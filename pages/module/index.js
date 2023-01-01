import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import moduleModel from "../../model/module.model";
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
  
  const { data:modules, error, isLoading } = useSWR (QueryParam?"moduleList":null, async ()=>await moduleModel.list(QueryParam),config.swrConfig);

  const moduleDelete=function(id)
  {
    helper.sweetalert.confirm("Delete module","info").then((result) => {
      if(result.isConfirmed)
      {
        moduleModel.delete(id).then((res)=>{
          helper.sweetalert.toast(res.data?.message);
          mutate('moduleList');
        })
      }
    })
  }
  const columns = [
    {
        name: 'Module',
        selector: row => row.name,
        sortable:true,
        sortField:"name"
    },
    {
        name: 'Course',
        selector: row => row.course?.name,
        sortable:true,
        sortField:"module.name"
    },
    {
        name: 'Approval Status',
        selector: row => row.status        
    },
    {
        name: 'Action',
        cell: row => {return (
        <div className='btn-group  text-nowrap'><Link className='btn btn-primary btn-sm' href={`/module/${row.id}`}><i className='bi bi-eye'></i></Link>
        <button className='btn btn-danger btn-sm' type='button' onClick={()=>moduleDelete(row.id)}><i className='bi bi-trash'></i></button></div>)},
        
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
    <Link className='btn btn-primary float-end' href={'/module/create'}>Create</Link>
      <h3>Module</h3>
      </div>
    
    <DataTable
            columns={columns}
            data={modules?.data}
            progressPending={isLoading}
            sortServer
            onSort={handleSort}
            pagination
            paginationServer
            paginationComponentOptions={config.paginationComponent}
            paginationTotalRows={modules?.meta?.total}
      			//onChangeRowsPerPage={()=>function(){ return 1}}
			      onChangePage={pagginationHandler}
            paginationPerPage="15"
            className='table'
            
            />
    </div>
  );
}

export default Page;