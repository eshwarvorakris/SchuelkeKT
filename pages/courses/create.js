import { useState, useRef } from "react";
import useSWR, { mutate } from 'swr';
import auth from "../../model/auth.model";
import categoryModel from "../../model/category.modal";
import courseModel from "../../model/course.model";
import uploader from "../../model/fileupload.model";
import { useRouter } from "next/router";
import { config } from '../../lib/config';
import { useForm } from 'react-hook-form';
import { helper } from '../../lib/helper';
import moment from 'moment';
const addcourse = () => {
    const router = useRouter();
    const { data: profile, error, isLoading } = useSWR('/', async () => await auth.profile());
    if (error) {
        //console.log(error);
        router.replace("login");
    }
    const { data: categoryData, error: categoryerror, isLoading: categoryisLoading } = useSWR("categorylist", async () => await categoryModel.list(), config.swrConfig);
    const [formErrors, setFormErrors] = useState([]);
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        //console.log(data, formData);
        await courseModel.create(formData).then((res) => {
            helper.sweetalert.toast("course Created");
            router.push("/courses");
        }).catch((error) => {
            setFormErrors(error.response?.data?.errors);
        })
    });
    const inputFileRef = useRef();
    const [image, setImage] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const fileClick = () => {
        inputFileRef.current.click();
    };
    const handleChangeImage = (async (e) => {
        //setValue("uploadfile", e.target.files);
        var data = new FormData();
        var imagedata = await e.target.files[0];
        data.append("uploadFile", imagedata);
        data.append("filefolder", "course");
        setIsUploaded(true);
        await uploader.upload(data).then((res) => {
            helper.sweetalert.toast("File Uploaded");

            console.log(res?.data);
            setImage(res?.data?.data?.Location);
        }).catch((error) => {
            helper.sweetalert.warningToast("Unable To Upload File Try Again Later");
            console.error(error.response)
        })
        //setImage(URL.createObjectURL(e.target.files[0]))
    });
    return (
        <>
            <form onSubmit={onSubmit} encType="multipart/form-data" >
                <div className="trainee-body">
                    <div className="trainee-list-createcourse d-flex flex-column">
                        <div className="box-1-enrolledtrainers"></div>
                        <div className="box-2-enrolledtrainers"></div>

                        <div className="trainee-tag-enrolledtrainers">
                            <p>Create Course</p>
                        </div>

                        <div className="trainee-course-form d-grid">
                            <div className="course-form d-flex flex-column justify-content-between">
                                <div className="course-name">
                                    <h6>Course Name</h6>
                                    <input type="text" {...register("course_name")} placeholder="Gastroentrology" />
                                </div>
                                <div className="category">
                                    <h6 htmlFor="category">Category</h6>
                                    <select {...register("category_id")} className="selectaddcourse">
                                        {categoryData?.data?.map((item) => {
                                            return (<option key={item.id} value={item.id}>{item.category_name}</option>)
                                        })}
                                    </select>
                                </div>
                                <div className="course-completion">
                                    <h6>Number of Modules</h6>
                                    <input type="number" {...register("total_modules")} />
                                </div>
                                <div className="launch-date">
                                    <h6>Course Launch Date</h6>
                                    <input className="min-date" type="date" {...register("course_launch_date")} max={moment().format("YYYY-MM-DD")} />
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
                                                        <img className="thumbnail-pic" src={image} style={{ width: '100%', height: '161px' }} alt="" />
                                                    );
                                                } else {
                                                    return (
                                                        <div className="pic-container" style={{ width: '100%', height: '161px' }}>
                                                            <p>Drag and Drop here</p>
                                                        </div>
                                                    );
                                                }
                                            })()
                                        }


                                        <div className="btns d-flex flex-column gap-4">

                                            <div className="right-col-btns d-flex flex-column gap-4">
                                                <a href="#!">
                                                    <button type="button"  onClick={fileClick}
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

                                            {/* <!-- <div className="right-col-btns d-flex flex-column gap-4">
                                        <a href="#!">
                                            <button className="btn d-flex justify-content-center gap-2">
                                                <img className="btn-icon"
                                                    src="/images/trainer-images/dashboard images/Vector (1).png" alt="">
                                                <span>Upload</span>
                                            </button>
                                        </a>
                                    </div> --> */}

                                            <div className="right-col-btns black-border d-flex flex-column gap-4">
                                                <a href="#!">
                                                    <button className="btn d-flex justify-content-center gap-2">
                                                        <img className="btn-icon"
                                                            src="/trainer-images/dashboard images/Vector (2).png"
                                                            alt="" />
                                                        <span style={{ color: 'rgba(0, 0, 0, 0.568)' }}>Remove</span>
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="course-completion">
                                    <h6>Weeks Required for Completion</h6>
                                    <input type="number" {...register("week_duration")} />
                                </div>
                            </div>
                        </div>
                        <div className="text-box">
                            <div className="text-heading">
                                <h6>Course Description</h6>
                            </div>
                            <textarea {...register("course_description")} cols="30" rows="30" className="text-type-box"></textarea>


                            <div className="btn-container d-flex justify-content-between mt-5">
                                <div className="left-col">
                                    <div className="edit-modules-btn">
                                        <a href="./editcourse"><button type="button" className="btn"
                                            style={{ backgroundColor: "#008bd6" }}><span>Edit
                                                Module</span></button></a>
                                    </div>
                                </div>
                                <div className="right-col d-flex gap-4">
                                    <div className="back-btn">
                                        <a href="./mycourse">
                                            <button type="button" className="btn" data-toggle="modal"
                                                data-target="#myModal"><span
                                                    style={{ color: "rgba(0, 0, 0, 0.61)" }}>Back</span>
                                            </button>
                                        </a>
                                    </div>

                                    <div className="save-btn">
                                        <button type="submit" className="btn"
                                            style={{ backgroundColor: "#008bd6" }}><span>Save</span></button>
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
export default addcourse;