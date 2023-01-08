import { useEffect, useState } from "react";
import useSWR, { mutate } from 'swr';
import auth from "../../model/auth.model";
import category from "../../model/category.model";
import courseModel from "../../model/course.model";
import { useRouter } from "next/router";
import { config } from '../../lib/config';
import { useForm } from 'react-hook-form';
import { helper } from '../../lib/helper';
import Link from "next/link";
const editCourse = () => {
    const router = useRouter();
    console.log(router.query);
    const [formErrors, setFormErrors] = useState([]);
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const { data: categories } = useSWR('categoryList', async () => await category.list(QueryParam), config.swrConfig);
    const { data:course, error, isLoading } = useSWR (router.query?.id, async ()=>await courseModel.detail(router.query.id),config.swrConfig);
    const onSubmit = handleSubmit(async (data) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(data, formData);
        await courseModel.update(course.id, formData).then((res) => {
            helper.sweetalert.toast("course Updated");
            router.push("/courses");
        }).catch((error) => {
            setFormErrors(error.response?.data?.errors);
        })
    });
    useEffect(()=>{
        console.log(course);
        reset(course?.data)
    },[router.query?.id])

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
                                                         {categories?.data.map((item) => {
                                                            return (<option value={item.id}>{item.category_name}</option>)
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="course-completion">
                                                    <h6>Number of Modules</h6>
                                                    <input type="number" {...register("total_modules")} />
                                                </div>
                                                <div className="launch-date">
                                                    <h6>Course Launch Date</h6>
                                                    <input className="min-date" type="date" {...register("course_launch_date")} />
                                                </div>
                                            </div>

                                            <div className="edit-thumbnail d-flex flex-column justify-content-between">
                                                <div>

                                                    <h6>Upload Thumbnail image</h6>
                                                    <div className="img-container-btns d-flex">
                                                        <div className="pic-container" style={{ width: '100%', height: '161px' }}>
                                                            {/* <img className="thumbnail-pic"
                                                                src="/trainer-images/dashboard images/thumbnail.png" alt="" /> */}
                                                            <p>Drag and Drop here</p>
                                                        </div>
                                                        <div className="btns d-flex flex-column gap-4">

                                                            <div className="right-col-btns d-flex flex-column gap-4">
                                                                <a href="#!">
                                                                    <button type="button"
                                                                        className="upload-btn btn d-flex justify-content-center gap-2">
                                                                        <img className="btn-icon"
                                                                            src="/trainer-images/dashboard images/Vector.png"
                                                                            alt="" />
                                                                        <span>Browse</span>
                                                                    </button>
                                                                    <input className="file-input" type="file" hidden />
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
                                                        <Link href={`/courses/${course?.data?.id}/module`} className="btn"
                                                            style={{ backgroundColor: "#008bd6" }}><span>Edit
                                                                Module</span></Link>
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
export default editCourse;