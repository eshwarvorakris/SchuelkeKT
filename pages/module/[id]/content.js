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
import _ from 'lodash';

const Page=()=> {
  const layoutValues = useContext(AppContext);
  const [formErrors, setFormErrors] = useState([]);
  { layoutValues.setPageHeading("Edit Module Content") }
  const [modalStatus, setModalStatus] = useState(false);
  const [moduleContent, setModuleContent] = useState([{ content_type: "title" }, { content_type: "paragraph" }, { content_type: "file" }, { content_type: "paragraph" }, { content_type: "paragraph" }]);

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
    await moduleModel.createContent(formData).then((res) => {
      helper.sweetalert.toast("Content Created");
      //router.push("/dashboard");
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

  const addContent =function () {
    let tempComponent=_.merge(moduleContent,{});
    //console.log(tempComponent);
    tempComponent.push({ content_type: "title" });
    tempComponent.push({ content_type: "paragraph" });
    tempComponent.push({ content_type: "file" });
    tempComponent.push({ content_type: "paragraph" });
    tempComponent.push({ content_type: "paragraph" });

    setModuleContent([...moduleContent,tempComponent]);
    //await setModuleContent([...moduleContent, { content_type: "title" }]);
    //await setModuleContent([...moduleContent, { content_type: "file" }]);
    //setModuleContent([...moduleContent, { content_type: "paragraph" }]);
    //await setModuleContent([...moduleContent, { content_type: "paragraph" }]);
    console.log(moduleContent);
  }
  return (
    <>
      <div className="trainer-body">
        <div className="trainer-list d-flex flex-column">
          <form onSubmit={onSubmit}>
            <div className="box-1"></div>
            <div className="box-2"></div>

            <div className="trainer-tag">
              <p>Edit Module Content</p>
            </div>
            <div className="header">
                                <div className="trainer-header">
                                    <div className="trainer-header-left d-flex">
                                        <a href="#">
                                            
                                        </a>

                                        <div className="icon-content-1">
                                            <a href="#">
                                                <p>PREVIOUS</p>
                                            </a>
                                            <span>Module 1 - introduction</span>
                                        </div>
                                    </div>
                                    <div className="trainer-header-right d-flex">
                                        <div className="icon-content-2">
                                            <a href="#">
                                                <p>NEXT</p>
                                            </a>
                                            <span>Module 2</span>
                                        </div>
                                        <a href="#">
                                            
                                        </a>
                                    </div>
                                </div>
                            </div>
            <div className="wrapper d-flex flex-column gap-5">

              {moduleContent.map((item, index) => {
                return (<>
                <input type="hidden" {...register(`content[${index}][module_id]`)} defaultValue={QueryParam?.id} />
          
                 <input type="hidden" {...register("content["+{index}+"][content_type]")} defaultValue={item.content_type} />
           
                  {item.content_type == "title" &&
            <div className="module-title">
              <div className="draggable-area">
                <img src="/images/trainer-images/edit-module/Vector (Stroke).png" className="drag-icon" alt="" />
              </div>

              <div className="module-title">
                <span className="content-title">Title -</span>
              </div>

              <div className="input-container">
                <input className="input-box" {...register(`content[${index}][content]`)}  type="text" placeholder="" />
                <div className="edit-box edit-text-remove">
                  <div className="edit-text">
                    <button type="button" className="edit-button bold-btn">
                      <i className="fa-solid fa-bold edit-icon"></i>
                    </button>
                    <button type="button" className="edit-button italic-btn">
                      <i className="fa-solid fa-italic edit-icon"></i>
                    </button>
                    <button type="button" className="edit-button underline-btn">
                      <i className="fa-solid fa-underline edit-icon"></i>
                    </button>
                    <button type="button" className="edit-button left-btn">
                      <i className="fa-solid fa-align-left edit-icon"></i>
                    </button>
                    <button type="button" className="edit-button jcenter-btn">
                      <i className="fa-solid fa-align-justify edit-icon"></i>
                    </button>
                    <button type="button" className="edit-button right-btn">
                      <i className="fa-solid fa-align-right edit-icon"></i>
                    </button>
                    <button type="button" className="edit-button center-btn">
                      <i className="fa-solid fa-align-center edit-icon"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }

          {item.content_type == 'paragraph' &&  <div className="module-paragraph-1">

              <div className="draggable-area">
                <img src="/images/trainer-images/edit-module/Vector (Stroke).png" className="drag-icon" alt="" />
                <button type="button" className="delete-icon"><img className="delete" src="/images/trainer-images/edit-module/Vector delete black.png" alt="" /></button>
              </div>

              <span className="content-title">Paragraph 1 -</span>

              <div className="input-container">
                <textarea {...register(`content[${index}][content]`)} className="content-paragraph" cols="100" rows="5" placeholder=""></textarea>
              </div>
            </div> }

 {item.content_type == 'file' &&

            <div className="module-upload">

              <div className="draggable-area">
                <img src="/images/trainer-images/edit-module/Vector (Stroke).png" className="drag-icon" alt="" />
                <button type="button" className="delete-icon"><img className="delete" src="/images/trainer-images/edit-module/Vector delete black.png" alt="" /></button>
              </div>

              <span className="content-title">Upload PPT/PDF</span>

              <div className="upload-container">
                <p className="drag-text">Drag and Drop here</p>

              </div>

              <div className="btns d-flex flex-column gap-2">

                <div className="right-col-btns d-flex flex-column gap-4">

                  <button type="button" className="upload-btn btn d-flex justify-content-center gap-2">
                    <img className="btn-icon" src="/images/trainer-images/dashboard images/Vector (1).png" alt="" />
                    <span>Upload</span>
                  </button>
                  <input className="file-input" {...register(`content[${index}][content]`)} type="file" hidden="" />

                </div>

                <div className="right-col-btns black-border d-flex flex-column gap-4">
                  <a href="#!">
                    <button type="button" className="btn d-flex justify-content-center gap-2">
                      <img className="btn-icon" src="./images/trainer-images/dashboard images/Vector (2).png" alt="" />
                      <span style={{ color: "rgba(0, 0, 0, 0.568)" }}>Remove</span>
                    </button>
                  </a>
                </div>
          
              </div>
            </div>
          }
          </>) })}

          </div>
           
            {/* <!-- add module --> */ }

            <div className="add-module d-flex gap-3">
              <div className="add-btn">
                <button type="button" className="btn btn-light" onClick={addContent}>
                  <img src="/trainer-images/edit-module/+.png" alt="" />
                </button>
              </div>
              <hr className="line" />
            </div>

            <div className="footer-btn-container d-flex justify-content-end gap-4">
            
            <div className="back-btn">
                <button type="button" className="btn btn-light"
                  style={{ backgroundColor: "#efefef" }}>Back</button>
              </div>

            <div className="Save-btn">
                <button type="submit" className="btn btn-primary"
                  style={{ backgroundColor: "#008bd6" }}>Save</button>
             
            </div>

                                </div>

          </form>
        </div>
      </div>


    </>
  );
}

export default Page;

