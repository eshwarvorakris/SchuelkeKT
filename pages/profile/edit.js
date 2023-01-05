import { useState, useEffect } from "react";
import useSWR, { mutate } from 'swr';
import auth from "../../model/auth.model";
import user from "../../model/user.model";
import Sidebar from "../components/sidebar";
import Topnavbar from "../components/topnavbar";
import { useRouter } from "next/router";
import { config } from '../../lib/config';
import { useForm } from 'react-hook-form';
import { helper } from '../../lib/helper';
import Form from 'react-bootstrap/Form';
const myprofile = () => {
    const router = useRouter();
    const [profileData, setprofileData] = useState([]);
    // const { data: profile, error, isLoading } = useSWR('/', async () => await auth.profile());
    // if (error) {
    //     router.replace("./login");
    // }

    const [formErrors, setFormErrors] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: profileData });

    useEffect(() => {
        auth.profile().then((res) => {
            setprofileData(res);
            //console.log(res);
            reset(res);
        }).catch((error) => {
            router.replace("/login");
            console.log(error);
        });
    }, [reset]);
    const onSubmit = handleSubmit(async (data) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(data, formData);
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
    return (
        <>
            <div className="trainee-right-edit" style={{ backgroundColor: 'unset', marginTop: '10rem' }}>
                <Form onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="edit-container">
                        <div className="trainee-profile-pic">
                            <div className="box-1"></div>
                            <div className="box-2"></div>
                            <div className=" text-tag">
                                <h6>Edit Info</h6>
                            </div>
                            <img className="profile-picture" src="/trainee-images/trainer.jpg" alt="" />

                            <div className="btn-container d-flex flex-column gap-3">
                                <div>
                                    <button type="button" className="btn upload-btn">
                                        <img className="btn-icon" src="/images/trainee-images/edit profile/icon-1.png"
                                            alt="" />
                                        <span className="text-primary">Upload</span>
                                    </button>
                                    <input className="file-input" type="file" hidden />
                                </div>

                                <div>
                                    <button type="button" className="btn remove-btn">
                                        <img className="btn-icon" src="/images/trainee-images/edit profile/icon-2.png"
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
                                    <input type="date"  {...register("dob", { required: "Fill Date Of Birth" })} />
                                    {formErrors?.dob && <p className="invalid-feedback">{formErrors?.dob}</p>}
                                </div>

                                <div className="trainer-address">
                                    <h6>Address</h6>
                                    <textarea className="address-box"
                                        placeholder="1234, Lorem ipsum dolor sit amet, consectetur" cols="30"
                                        rows="3" {...register("address")}></textarea>
                                </div>

                                <div className="trainer-contact-no">
                                    <h6>Contact Number</h6>
                                    <input type="number" placeholder="+01 345 3345" {...register("contact_no")} />
                                </div>
                                {
                                    (() => {
                                        if (profileData?.role != 'admin') {
                                            return (
                                                <div className="trainer-background">
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