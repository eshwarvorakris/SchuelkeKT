import { useState, useEffect, useRef } from "react";
import useSWR, { mutate } from 'swr';
import auth from "../../model/auth.model";
import uploader from "../../model/fileupload.model";
import user from "../../model/user.model";
import Sidebar from "../components/sidebar";
import Topnavbar from "../components/topnavbar";
import { useRouter } from "next/router";
import { config } from '../../lib/config';
import { useForm } from 'react-hook-form';
import { helper } from '../../lib/helper';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
const myprofile = () => {
    const router = useRouter();
    const [profileData, setprofileData] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const inputFileRef = useRef();
    const [image, setImage] = useState("/trainee-images/trainer.jpg");
    const [profileUrl, setprofileUrl] = useState("");
    // const { data: profile, error, isLoading } = useSWR('/', async () => await auth.profile());
    // if (error) {
    //     router.replace("./login");
    // }

    const [formErrors, setFormErrors] = useState([]);
    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: profileData });

    useEffect(() => {
        auth.profile().then((res) => {
            if(res.profile_img !== null && res.profile_img != "") {
                setImage(res.profile_img);
                setprofileUrl(res.profile_img);
            }
            setprofileData(res);
            console.log(res);
            reset(res);
        }).catch((error) => {
            router.replace("/login");
            console.log(error);
        });
    }, [router, reset]);
    const onSubmit = handleSubmit(async (data) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.clear();
        if(isUploaded) {
            formData.delete("uploadfile");
        }
        console.log("data ", formData);
        await user.updateProfile(formData).then((res) => {
            helper.sweetalert.toast("Profile Updated");
            console.log(res);
            router.push("/profile");
        }).catch((error) => {
            helper.sweetalert.warningToast("Unable To Update Profile");
            console.error(error.response?.data)
            setFormErrors(error.response?.data?.errors);
        })
    });
    const fileClick = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    };
    const handleChangeImage = (async (e) => {
        //setValue("uploadfile", e.target.files);
        var data = new FormData();
        var imagedata = await e.target.files[0];
        data.append("uploadFile", imagedata);
        data.append("filefolder", "profile");
        setIsUploaded(true);
        await uploader.upload(data).then((res) => {
            helper.sweetalert.toast("File Uploaded");
            
            console.log(res?.data);
            setprofileUrl(res?.data?.data?.Location);
            setImage(res?.data?.data?.Location);
        }).catch((error) => {
            helper.sweetalert.warningToast("Unable To Upload File Try Again Later");
            console.error(error.response)
        })
        //setImage(URL.createObjectURL(e.target.files[0]))
    });
    return (
        <>
            <div className="trainee-right-edit" style={{ marginTop: '10rem' }}>
                <Form onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="edit-container">
                        <div className="trainee-profile-pic">
                            <div className="box-1"></div>
                            <div className="box-2"></div>
                            <div className=" text-tag">
                                <h6>Edit Info</h6>
                            </div>
                            <img className="profile-picture" src={image} alt="" />

                            <div className="btn-container d-flex flex-column gap-3">
                                <div>
                                    <button type="button" className="btn upload-btn" onClick={fileClick}>
                                        <img className="btn-icon" src="/trainee-images/edit profile/icon-1.png"
                                            alt="" />
                                        <span className="text-primary">Upload</span>
                                    </button>
                                    <input className="file-input" type="file" ref={inputFileRef} onChange={handleChangeImage} name="uploadfile" hidden />
                                    <input type="hidden" name="profile_img" value={profileUrl} />
                                </div>

                                <div>
                                    <button type="button" className="btn remove-btn">
                                        <img className="btn-icon" src="/trainee-images/edit profile/icon-2.png"
                                            alt="" />
                                        <span style={{ color: "rgba(0, 0, 0, 0.534)" }}>Remove</span>
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className="trainee-info">
                            <div className="trainer-form">
                                <Form.Group className="trainer-Name">
                                    <h6>Full Name</h6>
                                    <input type="text" placeholder="Thomas" {...register("full_name", { required: "Fill Name" })} />
                                    {formErrors?.full_name && <p className="invalid-feedback">{formErrors?.full_name}</p>}
                                </Form.Group>

                                <div className="trainer-Email">
                                    <h6>Email</h6>
                                    <input type="text" placeholder="Thomas@gmail.com" {...register("email", { required: "Fill Email Address" })} />
                                    {formErrors?.email && <p className="invalid-feedback">{formErrors?.email}</p>}
                                </div>

                                <div className="trainer-DOB">
                                    <h6>Date of Birth</h6>
                                    <input type="date"  {...register("dob", { required: "Fill Date Of Birth" })} max={moment().format("YYYY-MM-DD")}  />
                                    {formErrors?.dob && <p className="invalid-feedback">{formErrors?.dob}</p>}
                                </div>

                                <div className="trainer-address">
                                    <h6>Address</h6>
                                    <textarea className="address-box"
                                        placeholder="1234, Lorem ipsum dolor sit amet, consectetur" cols="30"
                                        rows="3" {...register("address")}></textarea>
                                </div>

                                <div className="trainer-Name">
                                    <h6>Contact Number</h6>
                                    <input type="text" pattern="\d*" placeholder="+01 345 3345" maxLength={15} {...register("contact_no")} />
                                </div>
                                {
                                    (() => {
                                        if (profileData?.role != 'admin') {
                                            return (
                                                <div className="trainer-Name">
                                                    <h6>Education Background</h6>
                                                    <input type="text" {...register("edu_background")} placeholder="PhD. Zoology from XYZ Instiute, City, Country" />
                                                </div>
                                            );
                                        }
                                    })()
                                }


                                {/* <div className="trainer-designation">
                                                    <h6>Designation</h6>
                                                    <input type="text" placeholder="Product Devolopment Head" />
                                                </div> */}
                            </div>

                        </div>

                    </div>
                    <div className="button-footer d-flex justify-content-end gap-3">
                        <div className="cancel-btn-proflie">
                            <a href="/profile" className="btn btn-light">Cancel</a>
                        </div>

                        <div className="save-btn-proflie">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default myprofile;