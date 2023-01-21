import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import courseModule from "../../../model/course.model";
import moduleModel from "../../../model/module.model";
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import ReactPaginate from 'react-paginate';
import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import AppContext from "../../../lib/appContext";
function Page() {
  const [modalStatus, setModalStatus] = useState(false);
  const layoutValues = useContext(AppContext);
  { layoutValues.setPageHeading("Course Modules") }
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "id";
  QueryParam.order_in = router.query?.order_in || "asc";

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
      helper.sweetalert.toast("Module Updated");
      moduleList();
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })
  };

  const handleModuleSumit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await moduleModel.create(formData).then((res) => {
      helper.sweetalert.toast("Module Added");
      setModalStatus(false);
      moduleList();
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })
  };
  const columns = React.useMemo(() => [
    {
      name: 'Module',
      className: 'col-1',
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
      name: 'Edit Content',
      right: true,
      cell: row => {
        return (
          <div className='btn-group  text-nowrap'>
            <Link href={`/module/${row.id}/content`} className='btn btn-primary btn-sm' type='button' >Edit Content</Link></div>)
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

      <div className="trainee-body">
        <div className="trainee-list-createcourse d-flex flex-column" style={{ padding: '2.5rem' }}>
          <div className="box-1-enrolledtrainers"></div>
          <div className="box-2-enrolledtrainers"></div>

          <div className="trainee-tag-enrolledtrainers">
            <p>Edit Module</p>
          </div>

          <div className="module-heading">
            <h6>Modules Name</h6>
          </div>

          <div className="wrapper custom-scroll" style={{ padding: 'unset', height: 'fit-content' }}>
            {modules?.data?.map((item, index) => {
              return (
                <>
                  <div key={item.id} className="module-card module-card-1 d-flex">
                    <div className="left-side-card d-flex">
                      <div className="drag-container">
                        <img className=""
                          src="/trainer-images/edit-module/Vector (Stroke).png"
                          alt="drag here" />
                      </div>
                      <div className="input-container d-flex gap-2">
                        <div className="module-card-name">
                          <span>Module {index + 1} -</span>
                        </div>
                        <form onSubmit={updateModule}>
                          <div className="module-input d-flex">
                            <div className="search-wrap">
                              <input type="hidden" name="id" value={item.id} />
                              <input type="text" placeholder="Lorem ipsum dolor sit amet" name="module_name" defaultValue={item.module_name} />
                            </div>
                            <button type='submit' style={{ border: 'none' }}>
                              <div className="edit" style={{ backgroundColor: '#fff' }}><span style={{ color: '#1a86d0' }}>Update</span></div>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="right-side-card d-flex">
                      <div className="edit-btn" style={{ padding: 'unset', alignSelf: 'unset', height: 'unset' }}>
                        <Link href={`/module/${item.id}/content?course=${QueryParam?.id}`}><button type="button" className="btn"><span>Edit Content
                          🖊</span></button></Link>
                      </div>
                      <div className="delete-btn" style={{ height: 'unset' }}>
                        <a href="#!">
                          <img className="delete-icon" src="/trainer-images/edit-module/Vector.png" alt="delete button" onClick={() => moduleDelete(item.id)} />
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}

          </div>

          {/* <DataTable
            columns={columns}
            data={modules?.data}
            progressPending={isLoading}
            className="wrapper custom-scroll"
          /> */}
          <div className='btn-container d-flex justify-content-between gap-3'>
            <div>
              <button type="button" className="add-module-btn" onClick={() => setModalStatus(true)}>Add Module +</button>
            </div>
            <div className="back-save-btn d-flex gap-4">
              <Link href={`/courses/${router.query.id}/edit`}><button type="button" className="back-btn">Back</button></Link>
              <a href="#!"><button type="submit" className="save-btn">Save</button></a>
            </div>
            {/* <button type='button' className='btn btn-primary' onClick={() => setModalStatus(true)}>Add Module</button> */}
          </div>
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

