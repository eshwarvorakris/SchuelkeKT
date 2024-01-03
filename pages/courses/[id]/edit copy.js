import { useState, useEffect, useRef, useContext } from "react";
import useSWR, { mutate } from 'swr';
import auth from "../../../model/auth.model";
import category from "../../../model/category.model";
import courseModel from "../../../model/course.model";
import uploader from "../../../model/fileupload.model";
import { useDropzone } from 'react-dropzone'
import { useRouter } from "next/router";
import { config } from '../../../lib/config';
import { useForm } from 'react-hook-form';
import { helper } from '../../../lib/helper';
import moment from 'moment';
import Link from "next/link";
import AppContext from "../../../lib/appContext";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Image from "next/image";
const EditCourse = () => {
    const router = useRouter();
    const layoutValues = useContext(AppContext);
    { layoutValues.setPageHeading("Edit Course") }
    const queryid = router.query.id;
    const [image, setImage] = useState("");
    const [courseData, setcourseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({ defaultValues: courseData });
    //const { data: categories, error: categoryerror, isLoading: categoryisLoading } = useSWR('categoryList', async () => await category.list(QueryParam), config.swrConfig);
    //const { data:course, courseerror, courseisLoading, mutate:loadCourse } = useSWR (router.query?.id||null, async ()=>await courseModel.detail(router.query.id),config.swrConfig);

    useEffect(() => {
        courseModel.detail(router.query.id).then((res) => {
            if (res.data.course_thumbnail !== null) {
                setImage(res.data.course_thumbnail);
            }
            setcourseData(res.data)
            // console.log(res.data);
            reset(res.data);
        }).catch((error) => {
            // console.log(error.response);
        });
        category.list().then((res) => {
            setCategories(res);
        }).catch((error) => {
            // console.log(error);
        });
    }, [router, reset]);

    const onSubmit = handleSubmit(async (data) => {
        event.preventDefault();
        if(event.target.total_training_hour.value > 0) {
            const formData = new FormData(event.target);
            //// console.log(data, formData);
            await courseModel.update(router.query.id, formData).then((res) => {
                helper.sweetalert.toast("course Updated");
                router.push("/courses");
            }).catch((error) => {
                setFormErrors(error.response?.data?.errors);
            })
        } else {
            helper.sweetalert.warningToast("Total training hour must be greater than 0");
        }
    });

    const inputFileRef = useRef();

    const [isUploaded, setIsUploaded] = useState(false);
    const fileClick = () => {
        inputFileRef.current.click();
    };
    useEffect(() => {
        window.addEventListener('wheel', { passive: false })
    
      return () => {
      
      }
    }, [])
    
    const handleChangeImage = (async (e) => {
        //setValue("uploadfile", e.target.files);
        var data = new FormData();
        var imagedata = await e.target.files[0];
        data.append("uploadFile", imagedata);
        data.append("filefolder", "course");
        setIsUploaded(true);
        await uploader.upload(data).then((res) => {
            helper.sweetalert.toast("File Uploaded Successfully");
            document.getElementById("thumbnail-pic").classList.remove("d-none");
            document.getElementById("pic-container").classList.add("d-none");
            // console.log(res?.data);
            setImage(res?.data?.data?.Location);
        }).catch((error) => {
            helper.sweetalert.warningToast("Unable To Upload File Try Again Later");
            console.error(error.response)
        })
        //setImage(URL.createObjectURL(e.target.files[0]))
    });

    const removeFile = () => {
        //setValue('course_thumbnail', "");
        document.getElementById("course_thumbnail").value = "";
        document.getElementById("thumbnail-pic").classList.add("d-none");
        document.getElementById("pic-container").classList.remove("d-none");
    }

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: async files => {
            //// console.log(files[0]);
            var data = new FormData();
            var imagedata = files[0];
            data.append("uploadFile", imagedata);
            data.append("filefolder", "course");
            setIsUploaded(true);
            await uploader.upload(data).then((res) => {
                helper.sweetalert.toast("File Uploaded Successfully");
                document.getElementById("thumbnail-pic").classList.remove("d-none");
                document.getElementById("pic-container").classList.add("d-none");
                // console.log(res?.data);
                setImage(res?.data?.data?.Location);
            }).catch((error) => {
                helper.sweetalert.warningToast("Unable To Upload File Try Again Later");
                console.error(error.response)
            })
        }
    });



    const handleWheel = (e) => {
        e.preventDefault()
        console.log(e);
    }

    return (
        <>
            <form onSubmit={onSubmit} encType="multipart/form-data" >
                <div className="trainee-body">
                    <div className="trainee-list-createcourse d-flex flex-column">
                        <div className="box-1-enrolledtrainers"></div>
                        <div className="box-2-enrolledtrainers"></div>

                        <div className="trainee-tag-enrolledtrainers">
                            <p>Edit Course</p>
                        </div>

                        <div className="trainee-course-form">

                            
                            <div className="course-form d-flex flex-column justify-content-between">
                                <div className="course-name">
                                    <h6>
                                        Course Name <span><OverlayTrigger
                                            delay={{ hide: 450, show: 300 }}
                                            overlay={(props) => (
                                                <Tooltip {...props}>
                                                    A name that best describe your course
                                                </Tooltip>
                                            )}
                                            placement="bottom"
                                        ><span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                        </OverlayTrigger>
                                        </span>
                                    </h6>
                                    <input type="text" {...register("course_name")} placeholder="Gastroentrology" required/>
                                </div>
                                <div className="category">
                                    <h6 htmlFor="category">
                                        Category <span><OverlayTrigger
                                            delay={{ hide: 450, show: 300 }}
                                            overlay={(props) => (
                                                <Tooltip {...props}>
                                                    Blanket, Country-specific or Product-specific
                                                </Tooltip>
                                            )}
                                            placement="bottom"
                                        ><span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                        </OverlayTrigger>
                                        </span>
                                    </h6>
                                    <select {...register("category_id")} className="selectaddcourse">
                                        {categories?.data?.map((item) => {
                                            return (<option key={item.id} value={item.id}>{item.category_name}</option>)
                                        })}
                                    </select>
                                </div>
                                <div className="course-completion">
                                    <h6>Number of Modules <span><OverlayTrigger
                                            delay={{ hide: 450, show: 300 }}
                                            overlay={(props) => (
                                                <Tooltip {...props}>
                                                    Number of modules to attend within the course
                                                </Tooltip>
                                            )}
                                            placement="bottom"
                                        ><span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                        </OverlayTrigger>
                                        </span></h6>
                                    <input type="number" onWheel={(e) => e.target.blur()}  {...register("total_modules")} required/>
                                </div>
                                <div className="launch-date">
                                    <h6>Course Launch Date <span><OverlayTrigger
                                            delay={{ hide: 450, show: 300 }}
                                            overlay={(props) => (
                                                <Tooltip {...props}>
                                                    The proposed ‘go live’ date
                                                </Tooltip>
                                            )}
                                            placement="bottom"
                                        ><span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                        </OverlayTrigger>
                                        </span></h6>
                                    <input className="min-date" type="date" {...register("course_launch_date")} min={moment(courseData.course_launch_date).format("YYYY-MM-DD")} required/>
                                </div>
                            </div>

                            <div className="edit-thumbnail d-flex flex-column justify-content-between">
                                <div>

                                    <h6>Upload Thumbnail image</h6>
                                    <div className="img-container-btns d-flex">
                                        {
                                            (() => {
                                                if (image.length > 0) {
                                                    return (
                                                        <>
                                                            <img className="thumbnail-pic" id="thumbnail-pic" src={image} style={{ width: '10rem', height: 'auto' }} alt="" />
                                                            <div {...getRootProps({className: ''})}>
                                                                <div className="pic-container d-none" id="pic-container" style={{ width: '10rem', height: '95%' }}>
                                                                    <p>Drag and Drop here</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    );
                                                } else {
                                                    return (
                                                        <>
                                                            <img className="thumbnail-pic d-none" id="thumbnail-pic" src={image} style={{ width: '10rem', height: 'auto' }} alt="" />
                                                            <div {...getRootProps({className: ''})}>
                                                                <div className="pic-container" id="pic-container" style={{ width: '10rem', height: '95%' }}>
                                                                    <p>Drag and Drop here</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    );
                                                }
                                            })()
                                        }
                                        <div className="btns d-flex flex-column gap-4">

                                            <div className="right-col-btns d-flex flex-column gap-4">
                                                <button type="button" onClick={fileClick}
                                                    className="upload-btn btn d-flex justify-content-center gap-2">
                                                    <img className="btn-icon"
                                                        src="/trainer-images/dashboard images/Vector.png"
                                                        alt="" />
                                                    <span>Browse</span>
                                                </button>
                                                <input className="file-input" type="file" onChange={handleChangeImage} ref={inputFileRef} hidden />
                                                <input type="hidden" id="course_thumbnail" name="course_thumbnail" value={image} />
                                            </div>
                                            <div className="right-col-btns black-border d-flex flex-column gap-4">

                                                <button onClick={removeFile} type="button" className="remove_button btn d-flex justify-content-center gap-2">
                                                    <img className="btn-icon"
                                                        src="/trainer-images/dashboard images/Vector (2).png"
                                                        alt="" />
                                                    <span style={{ color: 'rgba(0, 0, 0, 0.568)' }}>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="course-completion">
                                    <h6>Weeks Required for Completion  <span><OverlayTrigger
                                            delay={{ hide: 450, show: 300 }}
                                            overlay={(props) => (
                                                <Tooltip {...props}>
                                                    Deadline in week(s) required for to complete the course
                                                </Tooltip>
                                            )}
                                            placement="bottom"
                                        ><span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                        </OverlayTrigger>
                                        </span></h6>
                                    <input type="number" onWheel={(e) => e.target.blur()}  {...register("week_duration")} required/>
                                </div>
                                <div className="course-completion">
                                    <h6>Total Training Hour <span><OverlayTrigger
                                            delay={{ hide: 450, show: 300 }}
                                            overlay={(props) => (
                                                <Tooltip {...props}>
                                                    Approximate no. of hours that the trainee has to spent doing this course (so as to give the trainee an approximate timing to plan their schedule accordingly)
                                                </Tooltip>
                                            )}
                                            placement="bottom"
                                        ><span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                        </OverlayTrigger>
                                        </span></h6>
                                    <input type="number" onWheel={(e) => e.target.blur()}  {...register("total_training_hour")}     min="1" required/>
                                </div>
                            </div>
                        </div>
                        <div className="text-box">
                            <div className="text-heading">
                                <h6>Course Description <span><OverlayTrigger
                                        delay={{ hide: 450, show: 300 }}
                                        overlay={(props) => (
                                            <Tooltip {...props} className="descTooltip">
                                                A short but informative description on what the course encompassed. Include:
                                                <ul>
                                                    <li>Background of the course</li>
                                                    <li>Objectives to achieve for the trainees</li>
                                                </ul>
                                            </Tooltip>
                                        )}
                                        placement="bottom"
                                    ><span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                    </OverlayTrigger>
                                    </span></h6>
                            </div>
                            <textarea {...register("course_description")} cols="30" rows="30" className="text-type-box" required></textarea>


                            <div className="btn-container d-flex justify-content-between mt-5" style={{ padding: 'unset' }}>
                                <div className="left-col d-flex gap-4">
                                    <div className="edit-modules-btn">
                                        <Link href={`/courses/${queryid}/module`} className="btn"
                                            style={{ backgroundColor: "#008bd6" }}><span>Edit
                                                Module</span></Link>
                                    </div>

                                    <div className="edit-modules-btn">
                                        <Link href={`/courses/${queryid}/assessment`} className="btn"
                                            style={{ backgroundColor: "#008bd6" }}><span>Edit Assessment</span></Link>
                                    </div>
                                </div>
                                <div className="right-col d-flex gap-4">
                                    <div className="back-btn" style={{ padding: 'unset' }}>
                                        <Link href="/courses" style={{ textDecoration: 'none' }} className="btn">
                                            <span style={{ color: "rgba(0, 0, 0, 0.61)", fontSize: '15px' }}>Back</span>
                                        </Link>
                                    </div>

                                    <div className="save-btn" style={{ padding: 'unset' }}>
                                        <button type="submit" className="btn save_button"
                                            style={{ backgroundColor: "#008bd6" }}><span style={{ fontSize: '15px' }}>Save</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </>
    )
}
export default EditCourse;