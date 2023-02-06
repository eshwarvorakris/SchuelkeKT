import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import courseModule from "../../../model/course.model";
import moduleModel from "../../../model/module.model";
import contentModel from "../../../model/content.model";
import uploader from "../../../model/fileupload.model";
import Link from 'next/link';
import { config } from '../../../lib/config';
import { helper } from '../../../lib/helper';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import AppContext from '../../../lib/appContext';
import { useForm } from 'react-hook-form';
import _ from 'lodash';

const Page = () => {
  const layoutValues = useContext(AppContext);
  const [formErrors, setFormErrors] = useState([]);
  { layoutValues.setPageHeading("Edit Module Content") }
  const inputFileRef = useRef();
  const [contentUrl, setcontentUrl] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [nextModule, setNextModule] = useState([]);
  const [prevModule, setPrevModule] = useState([]);
  const initialContent = [{ id: "", sequence_no: "1", title: "", paragraph1: "", paragraph2: "", file_url: "", paragraph3: "" }];
  const [moduleContent, setModuleContent] = useState(initialContent);
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "sequence_no";
  QueryParam.order_in = router.query?.order_in || "desc";
  //console.log(QueryParam);
  const { data: contents, mutate: contentList, error, isLoading } = useSWR(QueryParam?.id || null, async () => await contentModel.list({ module_id: QueryParam?.id }), config.swrConfig);
  const { data: modules, mutate: moduleList, error: moduleError, isLoading: moduleLoading } = useSWR("moduleList", async () => await courseModule.modules(QueryParam?.course), config.swrConfig);
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (isUploaded) {
      formData.delete("uploadfile");
    }
    //console.log(data, formData);
    await moduleModel.createContent(formData).then((res) => {
      helper.sweetalert.toast("Content Created");
      //console.log(res);
      router.push("/courses/"+QueryParam?.course+"/module");
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })
  });

  useEffect(() => {
    reset();
    contentList();
    moduleList();
    setModuleContent(initialContent);
  }, [QueryParam?.id]);

  useEffect(() => {
    //console.log("fetched contents = ", moduleContent);
    if (contents?.data !== undefined) {
      if ((contents?.data).length > 0) {
        setModuleContent(contents?.data);
        reset(contents?.data);
      }
    }
  }, [contents, QueryParam?.id]);

  useEffect(() => {
    setPrevModule([]);
    setNextModule([]);
    if (modules?.data !== undefined) {
      if ((modules?.data).length > 0) {
        if ((modules?.data).length > 1) {
          var i = 0;
          var temp = [];
          modules?.data.map((item, index) => {
            if (item.id == QueryParam?.id) {
              if (i > 0) {
                temp["id"] = modules?.data?.[i - 1]?.id;
                temp["module_name"] = modules?.data?.[i - 1]?.module_name;
                setPrevModule({ id: modules?.data?.[i - 1]?.id, module_name: modules?.data?.[i - 1]?.module_name });
              }
              if (typeof modules?.data?.[i + 1] !== 'undefined') {
                temp["id"] = modules?.data?.[i + 1]?.id;
                temp["module_name"] = modules?.data?.[i + 1]?.module_name;
                setNextModule({ id: modules?.data?.[i + 1]?.id, module_name: modules?.data?.[i + 1]?.module_name });
              }
            }
            i++;
          });
        }
      }
    }
  }, [modules, QueryParam?.id]);

  const addContent = function () {
    setModuleContent([...moduleContent, initialContent]);
  }

  const fileClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };
  const handleChangeImage = (async (e) => {
    let curId = e?.target?.attributes?.dataid?.value;
    let fileKey = getValues('content[' + curId + '][file_key]');
    //console.log("fileFkey", fileKey);
    //setValue('content['+curId+'][file_url]', "checking");
    //console.log(e.target.files[0].name);
    var data = new FormData();
    var imagedata = await e.target.files[0];
    data.append("uploadFile", imagedata);
    data.append("filefolder", "Courses");
    if(fileKey != "" && fileKey != undefined) {
      data.append("fileKey", fileKey);
    }
    setIsUploaded(true);
    await uploader.upload(data).then((res) => {
      helper.sweetalert.toast("File Uploaded");
      setValue('content[' + curId + '][file_url]', res?.data?.data?.Location);

      setValue('content[' + curId + '][file_ext]', res?.data?.data?.fileExt);
      if(res?.data?.data?.fileName != "" && res?.data?.data?.fileName != undefined) {
        setValue('content[' + curId + '][file_name]', res?.data?.data?.fileName);
      }
      setValue('content[' + curId + '][file_key]', res?.data?.data?.key);
      //setcontentUrl(res?.data?.data?.Location);
      console.log(res?.data);
    }).catch((error) => {
      helper.sweetalert.warningToast("Unable To Upload File Try Again Later");
      console.error(error.response)
    })
    //setImage(URL.createObjectURL(e.target.files[0]))
  });

  useEffect(() => {
    const subscription = watch((data) => {
      console.log(data.content);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const contentDelete = function (indexid, itemid) {
    helper.sweetalert.confirm("Are you sure you want to delete this content?","info", "true").then((result) => {
      if (result.isConfirmed) {
        console.log("indexid => ",indexid);
        console.log("itemid => ",itemid);
        if(itemid) {
          contentModel.delete(itemid).then((res) => {
            helper.sweetalert.toast(res.data?.message);
            contentList();
          });
        } else if(indexid) {
          var array = [...moduleContent];
          array.splice(indexid, 1);
          setModuleContent(array);
        }
      }
    })
  }
  return (
    <>
      <div className="trainer-body">
        <div className="trainer-list d-flex flex-column" style={{ height: 'fit-content' }}>
          <form onSubmit={onSubmit}>
            <div className="box-1" style={{ width: '180px' }}></div>
            <div className="box-2" style={{ left: '150px' }}></div>

            <div className="trainer-tag">
              <p style={{ zIndex: '1' }}>Edit Module Content</p>
            </div>
            <div className="headerContent">
              <div className="trainer-header">

                <div className="trainer-header-left d-flex">
                  {prevModule?.module_name &&
                    <>
                      <Link href={`/module/${prevModule.id}/content?course=${QueryParam?.course}`}>
                        <i className="fa fa-arrow-left header-icon" aria-hidden="true"></i>
                      </Link>
                      <div className="icon-content-1">
                        <Link href={`/module/${prevModule.id}/content?course=${QueryParam?.course}`}>
                          <p>PREVIOUS</p>
                        </Link>
                        <span>Module - {prevModule.module_name}</span>
                      </div>
                    </>
                  }
                </div>

                <div className="trainer-header-right d-flex">
                  {nextModule?.module_name &&
                    <>
                      <div className="icon-content-2">
                        <Link href={`/module/${nextModule.id}/content?course=${QueryParam?.course}`}>
                          <p>NEXT</p>
                        </Link>
                        <span>Module - {nextModule.module_name}</span>
                      </div>
                      <Link href={`/module/${nextModule.id}/content?course=${QueryParam?.course}`}>
                        <i className="fa fa-arrow-right header-icon" aria-hidden="true"></i>
                      </Link>
                    </>
                  }
                </div>
              </div>
            </div>
            {moduleContent.map((item, index) => {
              return (
                <div className="wrapper d-flex flex-column gap-5" key={`form${index}`} style={{ height: 'unset', width: 'unset', marginBottom: 'unset', overflow: 'unset' }}>
                  <input type="hidden" {...register(`content[${index}][module_id]`)} defaultValue={QueryParam?.id} />
                  <input type="hidden" {...register(`content[${index}][sequence_no]`)} defaultValue={index + 1} />
                  <input type="hidden" {...register(`content[${index}][id]`)} defaultValue={item.id} />

                  <div className="module-title">
                    <div className="draggable-area">
                      {/* <img src="/trainer-images/edit-module/Vector (Stroke).png" className="drag-icon" alt="" /> */}
                      {
                        (() => {
                          if(index > 0) {
                            return (<button type="button" className="delete-icon"><img className="delete" src="/trainer-images/edit-module/Vector delete black.png" alt="Delete This Chapter" onClick={() => contentDelete(index, item.id)} /></button>);
                          }
                        })()
                      }
                    </div>
                    <div className="module-title">
                      <span className="content-title">Title -</span>
                    </div>
                    <div className="input-container">
                      <input className="input-box" {...register(`content[${index}][title]`)} defaultValue={item.title} type="text" placeholder="" />
                    </div>
                  </div>

                  <div className="module-paragraph-1">
                    <div className="draggable-area">
                      {/* <img src="/trainer-images/edit-module/Vector (Stroke).png" className="drag-icon" alt="" /> */}
                      {/* <button type="button" className="delete-icon"><img className="delete" src="/trainer-images/edit-module/Vector delete black.png" alt="" /></button> */}
                    </div>
                    <span className="content-title">Paragraph 1 -</span>
                    <div className="input-container">
                      <textarea {...register(`content[${index}][paragraph1]`)} defaultValue={item.paragraph1} className="content-paragraph" cols="100" rows="5" placeholder=""></textarea>
                    </div>
                  </div>
                  <div className="module-paragraph-1">
                    <div className="draggable-area">
                      {/* <img src="/trainer-images/edit-module/Vector (Stroke).png" className="drag-icon" alt="" /> */}
                      {/* <button type="button" className="delete-icon"><img className="delete" src="/trainer-images/edit-module/Vector delete black.png" alt="" /></button> */}
                    </div>
                    <span className="content-title">Paragraph 2 -</span>
                    <div className="input-container">
                      <textarea {...register(`content[${index}][paragraph2]`)} defaultValue={item.paragraph2} className="content-paragraph" cols="100" rows="5" placeholder=""></textarea>
                    </div>
                  </div>
                  <div className="module-upload">
                    <div className="draggable-area">
                      {/* <img src="/trainer-images/edit-module/Vector (Stroke).png" className="drag-icon" alt="" /> */}
                      {/* <button type="button" className="delete-icon"><img className="delete" src="/trainer-images/edit-module/Vector delete black.png" alt="" /></button> */}
                    </div>
                    <span className="content-title">Upload PPT/PDF</span>
                    <div className="upload-container">
                      <p className="drag-text">Drag and Drop here</p>
                    </div>
                    <div className="btns d-flex flex-column gap-2" style={{ width: 'unset' }}>
                      <input type={"file"} ref={inputFileRef} name="uploadfile" onChange={handleChangeImage} hidden={true} dataId={index} id={`inputGroupFile0${index}`} />
                      <div className="right-col-btns d-flex flex-column gap-4">
                        <button type="button" className="upload-btn btn d-flex justify-content-center gap-2">
                          <label style={{ width: '100%' }} htmlFor={`inputGroupFile0${index}`}>
                            <img className="btn-icon" src="/trainer-images/dashboard images/Vector (1).png" alt="" />
                            <span>Upload</span>
                          </label>
                        </button>
                        <input type="hidden" {...register(`content[${index}][file_ext]`)} defaultValue={item?.file_ext} />
                        <input type="hidden" {...register(`content[${index}][file_name]`)} defaultValue={item?.file_name} />
                        <input type="hidden" {...register(`content[${index}][file_key]`)} defaultValue={item?.file_key} />
                        <input className="file-input" {...register(`content[${index}][file_url]`)} defaultValue={item.file_url} type="text" hidden={true} />
                      </div>
                      <div className="right-col-btns black-border d-flex flex-column gap-4" style={{ width: 'unset', marginLeft: 'unset' }}>
                        <a href="#!">
                          <button type="button" className="btn d-flex justify-content-center gap-2">
                            <img className="btn-icon" src="/trainer-images/dashboard images/Vector (2).png" alt="" />
                            <span style={{ color: "rgba(0, 0, 0, 0.568)" }}>Remove</span>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="module-paragraph-1">
                    <div className="draggable-area">
                      {/* <img src="/trainer-images/edit-module/Vector (Stroke).png" className="drag-icon" alt="" /> */}
                      {/* <button type="button" className="delete-icon"><img className="delete" src="/trainer-images/edit-module/Vector delete black.png" alt="" /></button> */}
                    </div>
                    <span className="content-title">Paragraph 3 -</span>
                    <div className="input-container">
                      <textarea {...register(`content[${index}][paragraph3]`)} defaultValue={item.paragraph3} className="content-paragraph" cols="100" rows="5" placeholder=""></textarea>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <!-- add module --> */}

            <div className="add-module d-flex gap-3">
              <div className="add-btn">
                <button type="button" className="btn btn-light" onClick={addContent}>
                  <img src="/trainer-images/edit-module/+.png" alt="" />
                </button>
              </div>
              <hr className="line" />
            </div>

            <div className="footer-btn-container d-flex justify-content-end gap-4">

              <div className="back-btn" style={{ padding: 'unset' }}>
                <Link href={`/courses/${QueryParam?.course}/module`} type="button" className="btn btn-light"
                  style={{ backgroundColor: "#efefef" }}>Back</Link>
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

