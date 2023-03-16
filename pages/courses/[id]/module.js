import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import courseModule from "../../../model/course.model";
import moduleModel from "../../../model/module.model";
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import ReactPaginate from 'react-paginate';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import AppContext from "../../../lib/appContext";
import { useForm } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
function Page() {
  const [modalStatus, setModalStatus] = useState(false);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(false);
  const layoutValues = useContext(AppContext);
  { layoutValues.setPageHeading("Course Modules") }
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "sequence_no";
  QueryParam.order_in = router.query?.order_in || "asc";
  const [formErrors, setFormErrors] = useState([]);
  const [moduleData, setModuleData] = useState([]);

  const [updateId, setupdateId] = useState(null);
  const [updateName, setupdateName] = useState(null);
  const [updateDesc, setupdateDesc] = useState(null);
  const [dataUpdated, setdataUpdated] = useState(null);

  const [moduleAddBtn, setModuleAddBtn] = useState(false);
  const [moduleUpdateBtn, setModuleUpdateBtn] = useState(false);
  //const { data: modules, mutate: moduleList, error, isLoading } = useSWR(QueryParam?.id || null, async () => await courseModule.modules(QueryParam?.id), config.swrConfig);

  // useEffect(() => {
  //   console.log("moduleData",moduleData);
  // }, []);

  const updateList = function () {
    setModuleData([]);
    courseModule.modules(QueryParam?.id, QueryParam).then((res) => {
      setModuleData(res?.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    if (QueryParam?.id !== undefined) {
      updateList();
    }
  }, [QueryParam?.id]);

  const moduleDelete = function (id) {
    helper.sweetalert.confirm("Are you sure you want to delete this module", "info", "true").then((result) => {
      if (result.isConfirmed) {
        moduleModel.delete(id).then((res) => {
          helper.sweetalert.toast(res.data?.message);
          //moduleList();
          updateList();
        })
      }
    })
  }

  const moduleUpdate = function (id) {
    //console.log(document.getElementById('description' + id).value);
    setupdateId(id);
    setupdateName(document.getElementById('name' + id).value);
    setupdateDesc(document.getElementById('description' + id).value);
    setModalUpdateStatus(true);
  }

  const updateModule = async (event) => {
    event.preventDefault();
    setModuleUpdateBtn(true);
    const formData = new FormData(event.target);
    //console.log(event.target)
    await moduleModel.update(formData.get("id"), formData).then((res) => {
      helper.sweetalert.toast("Module Updated");
      moduleHide();
      setModuleUpdateBtn(false);
      updateList();
    }).catch((error) => {
      setModuleUpdateBtn(false);
      setFormErrors(error.response?.data?.errors);
    })
  };

  const handleModuleSumit = async (event) => {
    event.preventDefault();
    setModuleAddBtn(true);
    const formData = new FormData(event.target);
    await moduleModel.create(formData).then((res) => {
      helper.sweetalert.toast("Module Added");
      setModalStatus(false);
      setModuleAddBtn(false);
      updateList();
    }).catch((error) => {
      setModuleAddBtn(false);
      setFormErrors(error.response?.data?.errors);
    })
  };

  const moduleHide = function () {
    setModalUpdateStatus(false)
    setupdateId(null);
    setupdateName(null);
    setupdateDesc(null);
  }

  const saveModuleButton= useRef(null);
  const saveForm= useRef(null);
  function handleDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(moduleData);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    let seq = 0;
    
    newItems?.map((item, index) => {
      seq++;
      item.sequence_no = seq;
    });
    console.log("reorder", newItems);
    updateAllModule(newItems)
    //setModuleData(newItems);
    //saveModuleButton.current.click()
    
  }

  const updateAllModule = async (newItems) => {
    //event.preventDefault();
    let moduleForm = new FormData();
    let i = 0;
    newItems?.map((item, index) => {
      moduleForm.append('modules['+i+'][id]', item.id);
      moduleForm.append('modules['+i+'][sequence_no]', item.sequence_no);
      i++;
    });
    //moduleForm.append('modules', JSON.stringify(newItems));
    await moduleModel.updateAll(moduleForm).then((res) => {
      //console.log("check update res", res.data);
      helper.sweetalert.toast("Modules Updated");
      setModuleData(newItems);
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })
  }

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

      <div className="trainee-body" style={{marginTop:'2rem'}}>
        <div className="trainee-list-createcourse d-flex flex-column" style={{ padding: '2.5rem', minHeight:'75vh', height:'fit-content', marginTop:'10rem' }}>
          <div className="box-1-enrolledtrainers"></div>
          <div className="box-2-enrolledtrainers"></div>

          <div className="trainee-tag-enrolledtrainers">
            <p>Edit Module</p>
          </div>

          <div className="module-heading">
            <h6>Modules Name</h6>
          </div>
          
            <div className="wrapper custom-scroll" style={{ padding: 'unset', height: 'fit-content' }}>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="itemList">
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {moduleData?.map((item, index) => {
                        return (
                          <Draggable key={item.id} draggableId={`${item.module_name}-${item.id}`} index={index}>
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              className="module-card module-card-1 d-flex">
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

                                      <div className="module-input d-flex">
                                        <div className="search-wrap">
                                          <input type="hidden" name={`module[${index}][id]`} value={item.id} />
                                          <input type="hidden" name={`module[${index}][sequence_no]`} value={item.sequence_no} />
                                          <input type="text" placeholder="Lorem ipsum dolor sit amet" id={`name${item.id}`} defaultValue={item.module_name} />
                                          <input type="hidden" id={`description${item.id}`} defaultValue={item.description} />
                                        </div>
                                        <button type='button' style={{ border: 'none' }} onClick={() => moduleUpdate(item.id)}>
                                          <div className="edit" style={{ backgroundColor: '#fff' }}><span style={{ color: '#1a86d0' }}>Update</span></div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="right-side-card d-flex">
                                    <div className="edit-btn" style={{ padding: 'unset', alignSelf: 'unset', height: 'unset' }}>
                                      <Link href={`/module/${item.id}/content?course=${QueryParam?.id}`}><button type="button" className="btn edit_btn"><span>Edit Content
                                        🖊</span></button></Link>
                                    </div>
                                    <div className="delete-btn" style={{ height: 'unset' }}>
                                      <a href="#!">
                                        <img className="delete-icon" src="/trainer-images/edit-module/Vector.png" alt="delete button" onClick={() => moduleDelete(item.id)} />
                                      </a>
                                    </div>
                                  </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            {/* <DataTable
              columns={columns}
              data={modules?.data}
              progressPending={isLoading}
              className="wrapper custom-scroll"
            /> */}
            <div className='btn-container d-flex justify-content-between gap-3' style={{padding:'2rem 0rem 2rem 0rem'}}>
              <div>
                <button type="button" className="add-module-btn" onClick={() => setModalStatus(true)}>Add Module +</button>
              </div>
              <div className="back-save-btn d-flex gap-4">
                <Link href={`/courses/${router.query.id}/edit`}><button type="button" className="back-btn remove_button">Back</button></Link>
                {/* <button type="submit" className="save-btn" ref={saveModuleButton}>Save</button> */}
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
            <div className='mb-3'>
              <input type='text' placeholder='Create Module' className='form-control' name="module_name" />
            </div>
            <div className=''>
              <textarea placeholder='Module Description' className='form-control' name="description" maxLength={380}></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className='btn btn-primary' disabled={moduleAddBtn}>Save</button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal show={modalUpdateStatus} onHide={() => moduleHide()}>
        <form onSubmit={updateModule}>
          <Modal.Header>Update Module</Modal.Header>
          <Modal.Body>
            <input type='hidden' name="id" value={updateId} />
            <div className='mb-3'>
              <input type='text' placeholder='Create Module' className='form-control' name="module_name" defaultValue={updateName} />
            </div>
            <div className=''>
              <textarea placeholder='Module Description' className='form-control' name="description" maxLength={380} defaultValue={updateDesc}></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className='btn btn-primary' disabled={moduleUpdateBtn}>Update</button>
          </Modal.Footer>
        </form>
      </Modal>

    </>
  );
}

export default Page;

