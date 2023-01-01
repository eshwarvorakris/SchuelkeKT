import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import contentModel from "../../model/content.model";
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
  
  const { data:contents, error, isLoading } = useSWR (QueryParam?"contentList":null, async ()=>await contentModel.list(QueryParam),config.swrConfig);

  const contentDelete=function(id)
  {
    helper.sweetalert.confirm("Delete content","info").then((result) => {
      if(result.isConfirmed)
      {
        contentModel.delete(id).then((res)=>{
          helper.sweetalert.toast(res.data?.message);
          mutate('contentList');
        })
      }
    })
  }
  const columns = [
    {
        name: 'content',
        selector: row => row.name,
        sortable:true,
        sortField:"name"
    },
    {
        name: 'Type',
        selector: row => row.type,
        sortable:true,
        sortField:"content_type"
    },
    {
        name: 'Approval Status',
        selector: row => row.status        
    },
    {
        name: 'Action',
        cell: row => {return (
        <div className='btn-group  text-nowrap'><Link className='btn btn-primary btn-sm' href={`/content/${row.id}`}><i className='bi bi-eye'></i></Link>
        <button className='btn btn-danger btn-sm' type='button' onClick={()=>contentDelete(row.id)}><i className='bi bi-trash'></i></button></div>)},
        
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
    <Link className='btn btn-primary float-end' href={'/content/create'}>Create</Link>
      <h3>content</h3>
      </div>
    
    <DataTable
            columns={columns}
            data={contents?.data}
            progressPending={isLoading}
            sortServer
            onSort={handleSort}
            pagination
            paginationServer
            paginationComponentOptions={config.paginationComponent}
            paginationTotalRows={contents?.meta?.total}
      			//onChangeRowsPerPage={()=>function(){ return 1}}
			      onChangePage={pagginationHandler}
            paginationPerPage="15"
            className='table'
            
            />
    </div>
  );
}

export default Page;