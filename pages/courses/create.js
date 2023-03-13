import { useContext, useState, useRef, useCallback } from "react";
import useSWR, { mutate } from 'swr';
import auth from "../../model/auth.model";
import { useDropzone } from 'react-dropzone'
import courseModel from "../../model/course.model";
import categoryModel from "../../model/category.model";
import uploader from "../../model/fileupload.model";
import { useRouter } from "next/router";
import { config } from '../../lib/config';
import { useForm } from 'react-hook-form';
import { helper } from '../../lib/helper';
import AppContext from "../../lib/appContext";
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import moment from 'moment';
import Link from "next/link";
const addcourse = ({ categories }) => {
    const layoutValues = useContext(AppContext);
    { layoutValues.setPageHeading("Create Course") }
    const router = useRouter();

    const { data: categoryData, error: categoryerror, isLoading: categoryisLoading } = useSWR("categorylist", async () => await categoryModel.list(), config.swrConfig);
    const [formErrors, setFormErrors] = useState([]);

    const [moduleLink, setModuleLink] = useState("");
    const [assigmentLink, setAssignmentLink] = useState("");
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        event.preventDefault();
        console.log(event.target.course_name.value);
        if (event.target.course_name.value != "" && event.target.total_modules.value != "" && event.target.course_launch_date.value != "" && event.target.week_duration.value != "" && event.target.total_training_hour.value != "") {
            const formData = new FormData(event.target);
            //console.log(data, formData);
            await courseModel.create(formData).then((res) => {
                console.clear();
                console.log(res.data.id)
                setModuleLink(`/courses/${res.data.id}/module`);
                setAssignmentLink(`/courses/${res.data.id}/assignments`);
                helper.sweetalert.toast("course Created");
                //router.push("/courses");
            }).catch((error) => {
                setFormErrors(error.response?.data?.errors);
            })
        } else {
            helper.sweetalert.toast("NOT ALL FIELDS are filled.", "warning");
        }

    });
    const inputFileRef = useRef();
    const [image, setImage] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const fileClick = () => {
        inputFileRef.current.click();
    };

    const fileDropped = () => {
        console.log("dropped");
    };
    const handleChangeImage = (async (e) => {
        //setValue("uploadfile", e.target.files);
        var data = new FormData();
        var imagedata = await e.target.files[0];
        data.append("uploadFile", imagedata);
        data.append("filefolder", "course");
        setIsUploaded(true);
        await uploader.upload(data).then((res) => {
            helper.sweetalert.toast("File Uploaded Successfully");

            console.log(res?.data);
            setImage(res?.data?.data?.Location);
        }).catch((error) => {
            helper.sweetalert.warningToast("Unable To Upload File Try Again Later");
            console.error(error.response)
        })
        //setImage(URL.createObjectURL(e.target.files[0]))
    });
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: async files => {
            console.log(files[0]);
            var data = new FormData();
            var imagedata = files[0];
            data.append("uploadFile", imagedata);
            data.append("filefolder", "course");
            setIsUploaded(true);
            await uploader.upload(data).then((res) => {
                helper.sweetalert.toast("File Uploaded Successfully");

                console.log(res?.data);
                setImage(res?.data?.data?.Location);
            }).catch((error) => {
                helper.sweetalert.warningToast("Unable To Upload File Try Again Later");
                console.error(error.response)
            })
        }
    });
    return (
        <>

            <div className="trainee-body">
                <form onSubmit={onSubmit} encType="multipart/form-data" >
                    <div className="trainee-list-createcourse d-flex flex-column">
                        <div className="box-1-enrolledtrainers"></div>
                        <div className="box-2-enrolledtrainers"></div>
                        <div className="trainee-tag-enrolledtrainers">
                            <p>Create Course</p>
                        </div>
                        <div className="trainee-course-form d-grid">
                            <div className="course-form d-flex flex-column justify-content-between">
                                <div className="course-name">
                                    <h6>
                                        Course Name <span><OverlayTrigger
                                            delay={{ hide: 450, show: 300 }}
                                            overlay={(props) => (
                                                <Tooltip {...props}>
                                                    Course Name
                                                </Tooltip>
                                            )}
                                            placement="bottom"
                                        ><span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                        </OverlayTrigger>
                                        </span>
                                    </h6>

                                    <input type="text" {...register("course_name")} placeholder="Gastroentrology" required />
                                </div>
                                <div className="category">
                                    <h6 htmlFor="category">
                                        Category <span><OverlayTrigger
                                            delay={{ hide: 450, show: 300 }}
                                            overlay={(props) => (
                                                <Tooltip {...props}>
                                                    Course Category
                                                </Tooltip>
                                            )}
                                            placement="bottom"
                                        ><span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                        </OverlayTrigger>
                                        </span>
                                    </h6>
                                    <select {...register("category_id")} className="selectaddcourse" required>
                                        {categoryData?.data?.map((item) => {
                                            return (<option key={item.id} value={item.id}>{item.category_name}</option>)
                                        })}
                                    </select>
                                </div>
                                <div className="course-completion">
                                    <h6>Number of Modules <span><OverlayTrigger
                                            delay={{ hide: 450, show: 300 }}
                                            overlay={(props) => (
                                                <Tooltip {...props}>
                                                    Number of Modules
                                                </Tooltip>
                                            )}
                                            placement="bottom"
                                        ><span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                        </OverlayTrigger>
                                        </span>
                                    </h6>
                                    <input type="number" {...register("total_modules")} min="1" required />
                                </div>
                                <div className="launch-date">
                                    <h6>
                                        Course Launch Date <span><OverlayTrigger
                                            delay={{ hide: 450, show: 300 }}
                                            overlay={(props) => (
                                                <Tooltip {...props}>
                                                    Course Launch Date
                                                </Tooltip>
                                            )}
                                            placement="bottom"
                                        ><span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                        </OverlayTrigger>
                                        </span>
                                    </h6>
                                    <input className="min-date" type="date" {...register("course_launch_date")} min={moment().format("YYYY-MM-DD")} required />
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
                                                        <img className="thumbnail-pic" src={image} style={{ width: '10rem', height: '95%' }} alt="" />
                                                    );
                                                } else {
                                                    return (
                                                        <div {...getRootProps({ className: '' })}>
                                                            <div className="pic-container" style={{ width: '10rem', height: '95%' }}>

                                                                <p>Drag and Drop here</p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            })()
                                        }


                                        <div className="btns d-flex flex-column gap-4">

                                            <div className="right-col-btns d-flex flex-column gap-4">
                                                <a href="#!">
                                                    <button type="button" onClick={fileClick}
                                                        className="upload-btn btn d-flex justify-content-center gap-2">
                                                        <img className="btn-icon"
                                                            src="/trainer-images/dashboard images/Vector.png"
                                                            alt="" />
                                                        <span>Browse</span>
                                                    </button>
                                                    <input className="file-input" type="file" onChange={handleChangeImage} ref={inputFileRef} hidden />
                                                    <input type="hidden" name="course_thumbnail" value={image} />
                                                </a>
                                            </div>

                                            <div className="right-col-btns black-border d-flex flex-column gap-4">

                                                <button type="button" className="remove_button btn d-flex justify-content-center gap-2">
                                                    <img className="btn-icon"
                                                        src="/trainer-images/dashboard images/Vector (2).png"
                                                        alt="" />
                                                    <span style={{ color: 'rgba(0, 0, 0, 0.568)' }}>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="course-completion">
                                    <h6>Weeks Required for Completion</h6>
                                    <input type="number" {...register("week_duration")} min="1" required />
                                </div>
                                <div className="course-completion">
                                    <h6>Total Training Hour</h6>
                                    <input type="number" {...register("total_training_hour")} min="0.1" required step="any" />
                                </div>
                            </div >
                        </div >
                        <div className="text-box">
                            <div className="text-heading">
                                <h6>
                                    Course Description <span><OverlayTrigger
                                        delay={{ hide: 450, show: 300 }}
                                        overlay={(props) => (
                                            <Tooltip {...props}>
                                                Course Description
                                            </Tooltip>
                                        )}
                                        placement="bottom"
                                    ><span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                    </OverlayTrigger>
                                    </span>
                                </h6>
                            </div>
                            <textarea {...register("course_description")} cols="30" rows="30" className="text-type-box"></textarea>


                            <div className="btn-container d-flex justify-content-between mt-5" style={{ padding: 'unset' }}>
                                <div className="left-col d-flex gap-4">
                                    <div className="edit-modules-btn">
                                        {moduleLink &&
                                            <Link href={moduleLink} className="btn"
                                                style={{ backgroundColor: "#008bd6" }}><span>Edit
                                                    Module</span></Link>
                                        }
                                    </div>
                                    <div className="edit-modules-btn">
                                        {assigmentLink &&
                                            <Link href={assigmentLink} className="btn"
                                                style={{ backgroundColor: "#008bd6" }}><span>Edit Assignment</span></Link>

                                        }
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
                    </div >
                </form >
            </div >


        </>
    )
}
export default addcourse;