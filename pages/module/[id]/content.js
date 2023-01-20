import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import courseModule from "../../../model/course.model";
import moduleModel from "../../../model/module.model";
import contentModel from "../../../model/content.model";
import Link from 'next/link';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import AppContext from '../../../lib/appContext';
import { useForm } from 'react-hook-form';

function Page() {
  const layoutValues = useContext(AppContext);
  { layoutValues.setPageHeading("Edit Module Content") }
  const [modalStatus, setModalStatus] = useState(false);
  const [moduleContent, setModuleContent] = useState([]);

  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "created_at";
  QueryParam.order_in = router.query?.order_in || "desc";

  const { data: modules, mutate: moduleList, } = useSWR(QueryParam?.id, async () => await courseModule.modules(QueryParam?.id), config.swrConfig);
  const { data: contents, mutate: contentList, error, isLoading } = useSWR(QueryParam?.id, async () => await courseModule.modules({ module_id: QueryParam?.id }), config.swrConfig);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(data, formData);
    await courseModule.create(formData).then((res) => {
      helper.sweetalert.toast("Content Created");
      router.push("/dashboard");
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })
  });

  const contentDelete = function (id) {
    helper.sweetalert.confirm("Delete module", "info").then((result) => {
      if (result.isConfirmed) {
        moduleModel.delete(id).then((res) => {
          helper.sweetalert.toast(res.data?.message);
          contentList();
        })
      }
    })
  }

  const addContent=function()
  {
    setModuleContent([...moduleContent,{content_type:"paragraph"}]);
  }
  return (
    <>
      <div className="trainer-body">
        <div className="trainer-list d-flex flex-column">
          <form onSubmit={handleSubmit}>
            <input type="hidden" {...register("module_id")} defaultValue={QueryParam?.id} />
            <div className="box-1"></div>
            <div className="box-2"></div>

            <div className="trainer-tag">
              <p>Edit Module Content</p>
            </div>




            <div className="wrapper d-flex flex-column">


              <div className="module-title">
                <div className="draggable-area">
                  <img src="/trainer-images/edit-module/Vector (Stroke).png"
                    className="drag-icon" alt="" />
                </div>

                <div className="module-title">
                  <span className="content-title">Title -</span>
                </div>

                <div className="input-container">
                  <input className="input-box" {...register("content[content_type][title]", { required: true })} type="text" placeholder="Content Title" />
                  <div class="edit-box edit-text-remove">
                                            <div class="edit-text">
                                                <button type="button"  class="edit-button bold-btn">
                                                    <i class="fa-solid fa-bold edit-icon"></i>
                                                </button>
                                                <button type="button"  class="edit-button italic-btn">
                                                    <i class="fa-solid fa-italic edit-icon"></i>
                                                </button>
                                                <button type="button"  class="edit-button underline-btn">
                                                    <i class="fa-solid fa-underline edit-icon"></i>
                                                </button>
                                                <button type="button"  class="edit-button left-btn">
                                                    <i class="fa-solid fa-align-left edit-icon"></i>
                                                </button>
                                                <button type="button"  class="edit-button jcenter-btn">
                                                    <i class="fa-solid fa-align-justify edit-icon"></i>
                                                </button>
                                                <button type="button"  class="edit-button right-btn">
                                                    <i class="fa-solid fa-align-right edit-icon"></i>
                                                </button>
                                                <button type="button"  class="edit-button center-btn">
                                                    <i class="fa-solid fa-align-center edit-icon"></i>
                                                </button>
                                            </div>
                                        </div>
                </div>
              </div>
              {console.log(moduleContent)}
              {moduleContent.map((item) => {
                return (<>
                {item.content_type=='paragraph' &&
                  <div className="module-paragraph-1">

                    <div className="draggable-area">
                      <img src="/trainer-images/edit-module/Vector (Stroke).png"
                        className="drag-icon" alt="" />
                      <button type="button" className="delete-icon"><img className="delete"
                        src="/trainer-images/edit-module/Vector delete black.png"
                        alt="" /></button>
                    </div>

                    <span className="content-title"></span>

                    <div className="input-container">
                      <textarea name="paragraph 1" className="content-paragraph" cols="100" rows="5"
                        placeholder=""></textarea>
                    </div>
                  </div>
                  }
                  {item.content_type=='file' &&
                
                  <div className="module-upload">

                    <div className="draggable-area">
                      <img src="/trainer-images/edit-module/Vector (Stroke).png"
                        className="drag-icon" alt="" />
                      <button type="button" className="delete-icon"><img className="delete"
                        src="/trainer-images/edit-module/Vector delete black.png"
                        alt="" /></button>
                    </div>

                    <span className="content-title">Upload PPT/PDF</span>

                    <div className="upload-container">
                      <p className="drag-text">Drag and Drop here</p>
                      {/* <!-- <input type="file"> --> */}
                    </div>

                    <div className="btns d-flex flex-column gap-2">

                      <div className="right-col-btns d-flex flex-column gap-4">

                        <button type="button"
                          className="upload-btn btn d-flex justify-content-center gap-2">
                          <img className="btn-icon"
                            src="/trainer-images/dashboard images/Vector (1).png" alt="" />
                          <span>Upload</span>
                        </button>
                        <input className="file-input" type="file" hidden />

                      </div>

                      <div className="right-col-btns black-border d-flex flex-column gap-4">
                        <a href="#!">
                          <button type="button"
                            className="btn d-flex justify-content-center gap-2">
                            <img className="btn-icon"
                              src="/trainer-images/dashboard images/Vector (2).png"
                              alt="" />
                            <span style={{ color: "rgba(0, 0, 0, 0.568)" }}>Remove</span>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
              }
                </>)
              })}

            </div>

            {/* <!-- add module --> */}

            <div className="add-module d-flex gap-3">
              <div className="add-btn">
                <button type="button" className="btn btn-light" onClick={addContent}>
                  <img src="/trainer-images/edit-module/+.png" alt="" />
                </button>
              </div>
              <hr className="line" />
            </div>

           
            {/* 
                            <!-- add module --> */}

            <div className="add-module d-flex gap-3">
              <div className="add-btn">
                <button type="button" className="btn btn-light">
                  <img src="/trainer-images/edit-module/+.png" alt="" />
                </button>
              </div>
              <hr className="line" />
            </div>

            {/* <!-- footer buttons --> */}

            <div className="footer-btn-container d-flex justify-content-end gap-4">
              <div className="back-btn">
                <a href="prepare-modules.html">
                  <button type="button" className="btn btn-light"
                    style={{ backgroundColor: "#efefef" }}>Back</button>
                </a>
              </div>

              <div className="Save-btn">
                <a href="final-assessment.html">
                  <button type="button" className="btn btn-primary"
                    style={{ backgroundColor: "#008bd6" }}>Save</button>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>


    </>
  );
}

export default Page;

