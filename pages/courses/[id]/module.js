import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import courseModule from "../../../model/course.model";
import moduleModel from "../../../model/module.model";
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Page() {
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "created_at";
  QueryParam.order_in = router.query?.order_in || "desc";

  const { data: modules, error, isLoading } = useSWR(QueryParam?.id, async () => await courseModule.modules(QueryParam?.id), config.swrConfig);

  const moduleDelete = function (id) {
    helper.sweetalert.confirm("Delete module", "info").then((result) => {
      if (result.isConfirmed) {
        moduleModel.delete(id).then((res) => {
          helper.sweetalert.toast(res.data?.message);
          //mutate('moduleList');
          window.location.reload();
        })
      }
    })
  }
  const updateModule = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);    
    await moduleModel.update(formData.get("id"),formData).then((res) => {
        helper.sweetalert.toast("module Updated");
        //router.push("/courses");
    }).catch((error) => {
        setFormErrors(error.response?.data?.errors);
    })
};

  const columns = React.useMemo(() => [
    {
      name: 'Module',
      cell: (row,index) => {
        return (
            <>Module {index+1}</>
        )
      },
    },
    {
      name: 'Title',
      cell: row => {
        return (
          <form onSubmit={updateModule} className="form-inline">
            <input type="hidden" name="id" value={row.id}/>
            <input type="text" className='form-control' name="module_name"  defaultValue={row.module_name}/>
            <button type="submit" className='btn btn-sm btn-primary'>Edit</button>
            </form>)
      },
    },
    {
      name: 'Approval Status',
      cell: row => {
        return (
          <div className='btn-group  text-nowrap'>
            <a href={`/module${row.id}/content`} className='btn btn-primary btn-sm' type='button' >Edit Content</a></div>)
      },
    },
    {
      name: 'Action',
      cell: row => {
        return (
          <div className='btn-group  text-nowrap'>
            <button className='btn btn-danger btn-sm' type='button' onClick={() => moduleDelete(row.id)}>Delete</button></div>)
      },

    },
  ]);
  const addModuleRow=function(){
    modules.data.push({module_name:''});
  }
  return (
    <>

      <div className="trainee-admincoursemanagement">
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
        <button type='button' className='btn btn-primary' onClick={addModuleRow}>Add Module</button>
      
    </>
  );
}

export default Page;

