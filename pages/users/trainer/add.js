import { useState, useEffect, useContext } from "react";
import AppContext from "../../../lib/appContext";
import useSWR, { mutate } from 'swr';
import auth from "../../../model/auth.model";
import userModal from "../../../model/user.model";
import { useRouter } from "next/router";
import { config } from '../../../lib/config';
import { useForm } from 'react-hook-form';
import { helper } from '../../../lib/helper';
import Link from 'next/link';
const addTrainer = () => {
    const router = useRouter();
    const layoutValues = useContext(AppContext);
    { layoutValues.setPageHeading("Add Trainer") }
    const [errorMessage, seterrorMessage] = useState("");

    const { data: userId, userIderror, userIdisLoading } = useSWR('nextUserId', async () => await userModal.getNextUserId());
    const [formErrors, setFormErrors] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        event.preventDefault();
        seterrorMessage("");
        if (data.password === data.password_confirmation) {
            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(data.password)) {
                const formData = new FormData(event.target);
                //console.log(data, formData);
                formData.append('role', 'trainer');
                //console.log(data.password);
                await userModal.addUser(formData).then((res) => {
                    helper.sweetalert.toast("Trainer Added");
                    router.push("/users/trainer");
                }).catch((error) => {
                    seterrorMessage(error.response?.data?.errors?.[0]?.message);
                    console.error(error.response?.data)
                    setFormErrors(error.response?.data?.errors);
                })
            } else {
                helper.sweetalert.toast("Password must be at least 8 characters consisting of numbers, uppercase and lowercase letters", "warning");
                seterrorMessage("Password must be at least 8 characters consisting of numbers, uppercase and lowercase letters");
            }
        } else {
            helper.sweetalert.toast("Passwords Not Matched", "warning");
            seterrorMessage("Passwords Not Matched");
        }
    });

    return (
        <>
            <form onSubmit={onSubmit} encType="multipart/form-data" >

                <div className="trainee-body">
                    <div className="trainee-list-createcourse d-flex flex-column">
                        <div className="box-1-enrolledtrainers"></div>
                        <div className="box-2-enrolledtrainers"></div>

                        <div className="trainee-tag-enrolledtrainers">
                            <p>Register Trainer</p>
                        </div>
                        <div className="trainer-ID">
                            <span>Trainer ID -</span>
                            <span style={{ fontWeight: '600', color: '#008bd6' }}> {100000 + userId?.data} </span>
                            <span style={{ color: '#008bd6', fontWeight: '100', fontSize: '12px' }}
                                className="pl-2">(Auto-generated)</span>
                        </div>
                        <b className='text-danger'>{errorMessage}</b>
                        <div className="trainer-name" style={{ display: 'block' }}>
                            <h6>Trainer Name</h6>
                            <input type="text" {...register("full_name", { required: "Fill Name" })} placeholder="Enter Trainer's full name" />
                        </div>

                        <div className="trainer-email">
                            <h6>Trainer Email</h6>
                            <input type="email" {...register("email", { required: "Fill Email Address" })} placeholder="Enter Trainer's email address" />
                        </div>

                        <div className="trainer-name" style={{ display: 'block' }}>
                            <h6>Trainer Contact</h6>
                            <input type="text" {...register("contact_no", { required: "Fill Contact Number" })} placeholder="Enter Trainer's full name" />
                        </div>

                        <div className="trainer-email-password">
                            <div className="d-flex gap-2 text-info">
                                <h6>Create password</h6>
                                <span style={{ 'color': '#008bd6' }}>ⓘ</span>
                                <span style={{ color: '#008bd6', fontSize: '12px' }}>password strength -
                                    <strong>strong</strong></span>
                            </div>
                            <input type="password" {...register("password", { required: "Fill Password" })} placeholder="Enter a Password" />
                        </div>

                        <div className="trainer-email-password-comform">
                            <h6>Confirm Password</h6>
                            <input type="password" {...register("password_confirmation", { required: "Fill Confirm Password" })} placeholder="Re-enter your password" />
                        </div>

                        <div className="btn-container">
                            <Link href="/users/trainer" className="cancel-btn" style={{ textDecoration: 'none' }}>Cancel</Link>

                            <button type="submit" data-toggle="modal" data-target="#myModal"
                                className="create-btn">Create
                                Account</button>

                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
export default addTrainer;