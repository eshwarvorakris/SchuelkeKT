import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import courseModule from "../../../model/course.model";
import moduleModel from "../../../model/module.model";
import contentModel from "../../../model/content.model";
import uploader from "../../../model/fileupload.model";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Link from "next/link";
import TextEditor from "../../../components/textEditor";
import { config } from "../../../lib/config";
import { helper } from "../../../lib/helper";
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Modal } from "react-bootstrap";
import AppContext from "../../../lib/appContext";
import { useForm } from "react-hook-form";
import _ from "lodash";
import DragNDrop from "../../components/dragNdropFile";
import TabComponent from "../../../components/tabComponent";

const Page = () => {
  const layoutValues = useContext(AppContext);
  const [formErrors, setFormErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  {
    layoutValues.setPageHeading("Edit Module Content");
  }
  const inputFileRef = useRef();
  const [contentUrl, setcontentUrl] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [nextModule, setNextModule] = useState([]);
  const [prevModule, setPrevModule] = useState([]);
  const initialContent = [
    {
      id: "",
      sequence_no: "1",
      title: "",
      paragraph1: "",
      paragraph2: "",
      file_url: "",
      banner_url: "",
      paragraph3: "",
      content_video: "",
      carousel_image_one: "",
      carousel_image_two: "",
      carousel_image_three: "",
      carousel_image_four: "",
      carousel_image_five: "",
      dos: [],
      donts: [],
    },
  ];
  const [moduleContent, setModuleContent] = useState(initialContent);
  const router = useRouter();
  const QueryParam = router.query;
  QueryParam.page = router.query.page || 1;
  QueryParam.order_by = router.query?.order_by || "sequence_no";
  QueryParam.order_in = router.query?.order_in || "asc";
  const {
    data: contents,
    mutate: contentList,
    error,
    isLoading,
  } = useSWR(
    QueryParam?.id || null,
    async () =>
      await contentModel.list({
        module_id: QueryParam?.id,
        course_id: QueryParam?.course,
      }),
    config.swrConfig
  );
  //const { data: modules, mutate: moduleList, error: moduleError, isLoading: moduleLoading } = useSWR("moduleList", async () => await courseModule.modules(QueryParam?.course, QueryParam), config.swrConfig);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm();

  const [modules, setModules] = useState(null);
  const moduleList = async function () {
    await courseModule
      .modules(QueryParam?.course, QueryParam)
      .then((result) => {
        if (result?.data) {
          if (result?.data.length > 0) {
            setModules(result);
          } else {
            window.location.href = "/courses";
          }
        } else {
          window.location.href = "/courses";
        }
      })
      .catch((error) => {});
  };

  

  const validateForm = async(event) => {
    let formStatus = true;
    Array.from(event.target).forEach((result,index)=>{
      if(result.type == "text" || result.type == "textarea")
      {
        // console.log(result.nextElementSibling);
        // console.log(result.type , result.required);
        if((result.value == "" || result.value == null) && result.name != "")
        {
          // console.log(result);
          result.nextElementSibling.nextElementSibling != null ? result.nextElementSibling.nextElementSibling.innerHTML = "Field is required" : ''
          formStatus = false
        }
        else
        {
          result.nextElementSibling.nextElementSibling != null ? result.nextElementSibling.nextElementSibling.innerHTML = "" : ''
          

        }
          
          
        
      }
    })
    return formStatus;
  }

  const onSubmit = handleSubmit(async (data) => {
    event.preventDefault();

    const status = await validateForm(event);
    console.log('shibli', status);

    if(status == false)
    {
      return;
    }
    setLoading(true);

    const formData = new FormData(event.target);
    if (isUploaded) {
      formData.delete("uploadfile");
    }
    await moduleModel
      .createContent(formData)
      .then((res) => {
        helper.sweetalert.toast("Content Created");
        setLoading(false)
        router.push("/courses/" + QueryParam?.course + "/module");
      })
      .catch((error) => {
        setLoading(false)
        setFormErrors(error.response?.data?.errors);
      });
  });

  useEffect(() => {
    reset();
    contentList();
    moduleList();
    setModuleContent(initialContent);
  }, [QueryParam?.id]);

  useEffect(() => {
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
                setPrevModule({
                  id: modules?.data?.[i - 1]?.id,
                  module_name: modules?.data?.[i - 1]?.module_name,
                });
              }
              if (typeof modules?.data?.[i + 1] !== "undefined") {
                temp["id"] = modules?.data?.[i + 1]?.id;
                temp["module_name"] = modules?.data?.[i + 1]?.module_name;
                setNextModule({
                  id: modules?.data?.[i + 1]?.id,
                  module_name: modules?.data?.[i + 1]?.module_name,
                });
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
  };

  const fileClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };
  const handleChangeImage = async (e) => {
    let curId = e?.target?.attributes?.dataid?.value;
    let position = e?.target?.attributes?.dataPosition?.value;
    let elementId = e?.target?.attributes?.id?.value;
    let fileKey = getValues("content[" + curId + "][file_key]");
    setDisableButton(true);
    //setValue('content['+curId+'][file_url]', "checking");
    const fileNameAr = e.target.files[0].name.split(".");
    const fileExt = fileNameAr[fileNameAr.length - 1];
    const curFileExt = getValues("content[" + curId + "][file_ext]");
    document.getElementById("uploadOutFileName" + curId).innerHTML =
      "File Selected : <b>" + e.target.files[0].name + "</b>";
    var data = new FormData();
    var imagedata = await e.target.files[0];
    data.append("uploadFile", imagedata);
    data.append("filefolder", "Courses");
    if (fileKey != "" && fileKey != undefined && curFileExt === fileExt) {
      data.append("fileKey", fileKey);
    }
    setIsUploaded(true);
    await uploader
      .upload(data)
      .then((res) => {
        setDisableButton(false);
        handlefileChanged(position, res?.data?.data, elementId);
        helper.sweetalert.toast("File Uploaded Successfully");
      })
      .catch((error) => {
        setDisableButton(false);
        helper.sweetalert.warningToast("Unable To Upload File Try Again Later");
        console.error(error.response);
      });
    // setImage(URL.createObjectURL(e.target.files[0]))
  };
  const handleDisableButtonChange = (buttonChange) => {
    setDisableButton(buttonChange);
  };

  const handlefileChanged = (fileId, fileData, elementId = null) => {
    if (elementId == "inputGroupFile0" + fileId) {
      setValue("content[" + fileId + "][file_url]", fileData?.Location);
      setValue("content[" + fileId + "][file_ext]", fileData?.fileExt);
      if (fileData?.fileName != "" && fileData?.fileName != undefined) {
        setValue("content[" + fileId + "][file_name]", fileData?.fileName);
      }
      setValue("content[" + fileId + "][file_key]", fileData?.key);
    }
    if (elementId == "inputGroupFile1" + fileId) {
      setValue("content[" + fileId + "][banner_url]", fileData?.Location);
    }

  };
  /* const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: async files => {
      setDisableButton(true);
    }
  }); */
  useEffect(() => {
    const subscription = watch((data) => {
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
  }, [QueryParam]);

  const contentDelete = function (indexid, itemid) {
    helper.sweetalert
      .confirm("Are you sure you want to delete this content?", "info", "true")
      .then((result) => {
        if (result.isConfirmed) {
          if (itemid) {
            contentModel.delete(itemid).then((res) => {
              helper.sweetalert.toast(res.data?.message);
              contentList();
            });
          } else if (indexid) {
            var array = [...moduleContent];
            array.splice(indexid, 1);
            setModuleContent(array);
          }
        }
      });
  };

  const removeFile = (removeId) => {
    document.getElementById("file_ext" + removeId).value = "";
    document.getElementById("file_name" + removeId).value = "";
    document.getElementById("file_key" + removeId).value = "";
    document.getElementById("file_format" + removeId).value = "";
    document.getElementById("file_url" + removeId).value = "";
    document.getElementById("uploadOutFileName" + removeId).innerHTML =
      "<b>Drag and Drop here </b>";
  };
  return loading ? (
    <>
      <div class="d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>{" "}
    </>
  ) : (
    <>
      <div className="trainer-body">
        <div
          className="trainer-list d-flex flex-column"
          style={{ height: "fit-content" }}
        >
          <form onSubmit={onSubmit}>
            <div className="box-1" style={{ width: "180px" }}></div>
            <div className="box-2" style={{ left: "150px" }}></div>

            <div className="trainer-tag">
              <p style={{ zIndex: "1" }}>Edit Module Content</p>
            </div>
            <div className="headerContent">
              <div className="trainer-header">
                <div className="trainer-header-left d-flex">
                  {prevModule?.module_name && (
                    <>
                      <Link
                        href={`/module/${prevModule.id}/content?course=${QueryParam?.course}`}
                      >
                        <i
                          className="fa fa-arrow-left header-icon"
                          aria-hidden="true"
                        ></i>
                      </Link>
                      <div className="icon-content-1">
                        <Link
                          href={`/module/${prevModule.id}/content?course=${QueryParam?.course}`}
                        >
                          <p>PREVIOUS</p>
                        </Link>
                        <span>Module - {prevModule.module_name}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="trainer-header-right d-flex">
                  {nextModule?.module_name && (
                    <>
                      <div className="icon-content-2">
                        <Link
                          href={`/module/${nextModule.id}/content?course=${QueryParam?.course}`}
                        >
                          <p>NEXT</p>
                        </Link>
                        <span>Module - {nextModule.module_name}</span>
                      </div>
                      <Link
                        href={`/module/${nextModule.id}/content?course=${QueryParam?.course}`}
                      >
                        <i
                          className="fa fa-arrow-right header-icon"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            {moduleContent.map((item, index) => {
              var fileData = {};
              // if (index == 5)
              //   fileData = {
              //     file_name: item?.file_name,
              //     id: "file-url" + index,
              //   };
              // if (index == 6) {
              //   fileData = {
              //     file_name: item?.file_name,
              //     id: "banner-url" + index,
              //   };
              // }
              return (
                <div
                  className="wrapper d-flex flex-column gap-5"
                  key={`form${index}`}
                  style={{
                    height: "unset",
                    width: "unset",
                    marginBottom: "unset",
                    overflow: "unset",
                  }}
                >
                  <input
                    type="hidden"
                    {...register(`content[${index}][module_id]`)}
                    defaultValue={QueryParam?.id}
                  />
                  <input
                    type="hidden"
                    {...register(`content[${index}][course_id]`)}
                    defaultValue={QueryParam?.course}
                  />
                  <input
                    type="hidden"
                    {...register(`content[${index}][sequence_no]`)}
                    defaultValue={index + 1}
                  />
                  <input
                    type="hidden"
                    {...register(`content[${index}][id]`)}
                    defaultValue={item.id}
                  />

                  <div className="module-title">
                    <div className="draggable-area">
                      {/* <img src="/trainer-images/edit-module/Vector (Stroke).png" className="drag-icon" alt="" /> */}
                      {(() => {
                        if (index > 0) {
                          return (
                            <button type="button" className="delete-icon">
                              <img
                                className="delete"
                                src="/trainer-images/edit-module/Vector delete black.png"
                                alt="Delete This Chapter"
                                onClick={() => contentDelete(index, item.id)}
                              />
                            </button>
                          );
                        }
                      })()}
                    </div>
                    <div className="module-title">
                      <span className="content-title">Title - </span>
                    </div>
                    <div className="input-container">
                      <input
                        className="input-box"
                        {...register(`content[${index}][title]`)}
                        defaultValue={item.title}
                        type="text"
                        placeholder=""
                        
                      /> <br></br>
                      <small className="text-danger" id={`title-error`+index}></small>
                    </div>
                  </div>

                  <div className="module-paragraph-1">
                    <div className="draggable-area">
                      {/* <img src="/trainer-images/edit-module/Vector (Stroke).png" className="drag-icon" alt="" /> */}
                      {/* <button type="button" className="delete-icon"><img className="delete" src="/trainer-images/edit-module/Vector delete black.png" alt="" /></button> */}
                    </div>
                    <span className="content-title">Paragraph 1 - </span>
                    <div className="input-container">
                      {/* <textarea
                        {...register(`content[${index}][paragraph1]`)}
                        defaultValue={item.paragraph1}
                        className="content-paragraph"
                        cols="100"
                        rows="5"
                        placeholder=""
                      ></textarea> */}
                      <TextEditor name={`content[${index}][paragraph1]`} defaultValue={item.paragraph1}/>
                    </div>
                  </div>
                  <div className="module-paragraph-1">
                    <div className="draggable-area">
                      {/* <img src="/trainer-images/edit-module/Vector (Stroke).png" className="drag-icon" alt="" /> */}
                      {/* <button type="button" className="delete-icon"><img className="delete" src="/trainer-images/edit-module/Vector delete black.png" alt="" /></button> */}
                    </div>
                    <span className="content-title">Paragraph 2 - </span>
                    <div className="input-container">
                      {/* <textarea
                        {...register(`content[${index}][paragraph2]`)}
                        defaultValue={item.paragraph2}
                        className="content-paragraph"
                        cols="100"
                        rows="5"
                        placeholder=""
                      ></textarea> */}
                      <TextEditor name={`content[${index}][paragraph2]`} defaultValue={item.paragraph2}/>

                    </div>
                  </div>
                
                  <div className="module-paragraph-1">
                    <div className="draggable-area">
                      {/* <img src="/trainer-images/edit-module/Vector (Stroke).png" className="drag-icon" alt="" /> */}
                      {/* <button type="button" className="delete-icon"><img className="delete" src="/trainer-images/edit-module/Vector delete black.png" alt="" /></button> */}
                    </div>
                    <span className="content-title">Paragraph 3 - </span>
                    <div className="input-container">
                      {/* <textarea
                        {...register(`content[${index}][paragraph3]`)}
                        defaultValue={item.paragraph3}
                        className="content-paragraph"
                        cols="100"
                        rows="5"
                        placeholder=""
                      ></textarea> */}

                    <TextEditor name={`content[${index}][paragraph3]`} defaultValue={item.paragraph3}/>

                    </div>
                  </div>

                  <TabComponent position={index} item={item} />
                </div>
              );
            })}
            {/* <!-- add module --> */}

            {/* -------------------------------------------------------------- Upload images and docs -------------------------------------------- */}

            <div className="add-module d-flex gap-3">
              <div className="add-btn">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={addContent}
                >
                  <img src="/trainer-images/edit-module/+.png" alt="" />
                </button>
              </div>
              <hr className="line" />
            </div>

            <div className="footer-btn-container d-flex justify-content-end gap-4">
              <div className="back-btn" style={{ padding: "unset" }}>
                <Link
                  href={`/courses/${QueryParam?.course}/module`}
                  type="button"
                  className="btn btn-light"
                  style={{ backgroundColor: "#efefef" }}
                >
                  Back
                </Link>
              </div>

              <div className="Save-btn">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={disableButton}
                  style={{ backgroundColor: "#008bd6" }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
