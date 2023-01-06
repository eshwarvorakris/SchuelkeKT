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
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

function Page() {
  const [modalStatus, setModalStatus] = useState(false);

  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "created_at";
  QueryParam.order_in = router.query?.order_in || "desc";

  const { data: modules, mutate: moduleList, error, isLoading } = useSWR(QueryParam?.id, async () => await courseModule.modules(QueryParam?.id), config.swrConfig);

  const moduleDelete = function (id) {
    helper.sweetalert.confirm("Delete module", "info").then((result) => {
      if (result.isConfirmed) {
        moduleModel.delete(id).then((res) => {
          helper.sweetalert.toast(res.data?.message);
          moduleList();
        })
      }
    })
  }
  const updateModule = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await moduleModel.update(formData.get("id"), formData).then((res) => {
      helper.sweetalert.toast("module Updated");
      moduleList();
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })
  };

  const handleModuleSumit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await moduleModel.create(formData).then((res) => {
      helper.sweetalert.toast("module Created");
      setModalStatus(false);
      moduleList();
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })
  };
  const columns = React.useMemo(() => [
    {
      name: 'Module',
      className:'col-1',
      cell: (row, index) => {
        return (
          <>Module {index + 1}</>
        )
      },
    },
    {
      name: 'Title',
      cell: row => {
        return (

          <form onSubmit={updateModule} className="row g-1">
            <div className="col">
              <input type="hidden" name="id" value={row.id} />
              <input type="text" className='form-control form-control-sm' name="module_name" defaultValue={row.module_name} />
            </div>
            <div className="col-auto">
              <button type="submit" className='btn btn-sm btn-primary'>Edit</button>
            </div>
          </form>)
      },
    },
    {
      name: 'Approval Status',
      right: true,
      cell: row => {
        return (
          <div className='btn-group  text-nowrap'>
            <a href={`#`} className='btn btn-primary btn-sm' type='button' >Edit Content</a></div>)
      },
    },
    {
      name: 'Action',
      right: true,
      cell: row => {
        return (
          <div className='btn-group  text-nowrap'>
            <button className='btn btn-danger btn-sm' type='button' onClick={() => moduleDelete(row.id)}>Delete</button></div>)
      },

    },
  ]);
  return (
    <>

      <div className="trainee-admincoursemanagement">
        <div className="box-1-admincoursemanagement"></div>
        <div className="box-2-admincoursemanagement"></div>
        <div className="trainee-tag-admincoursemanagement">
          <p>Module</p>
        

        <DataTable
          columns={columns}
          data={modules?.data}
          progressPending={isLoading}
          className="wrapper custom-scroll"          
        />
        </div>
      <div className='btn-container d-flex justify-content-between gap-3'>

      <button type='button' className='btn btn-primary' onClick={() => setModalStatus(true)}>Add Module</button>
      </div>
      </div>
      <Modal show={modalStatus} onHide={() => setModalStatus(false)}>
        <form onSubmit={handleModuleSumit}>
          <Modal.Header>Add Module</Modal.Header>
          <Modal.Body>
            <input type='hidden' name="course_id" value={QueryParam?.id} />
            <input type='text' placeholder='Create Module' className='form-control' name="module_name" />
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className='btn btn-primary'>Save</button>
          </Modal.Footer>
        </form>
      </Modal>


    </>
  );
}

export default Page;

