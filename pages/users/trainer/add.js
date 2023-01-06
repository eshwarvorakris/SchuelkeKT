import { useState } from "react";
import useSWR, { mutate } from 'swr';
import auth from "../../../model/auth.model";
import category from "../../../model/category.modal";
import userModal from "../../../model/user.model";
import Sidebar from "../../components/sidebar";
import Topnavbar from "../../components/topnavbar";
import { useRouter } from "next/router";
import { config } from '../../../lib/config';
import { useForm } from 'react-hook-form';
import { helper } from '../../../lib/helper';
const addTrainer = () => {
    const router = useRouter();
    const { data: profile, error, isLoading } = useSWR('/', async () => await auth.profile());
    if (error) {
        //console.log(error);
        router.replace("/login");
    }
    const { data: userId, userIderror, userIdisLoading } = useSWR('nextUserId', async () => await userModal.getNextUserId());
    const [formErrors, setFormErrors] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        //console.log(data, formData);
        formData.append('role', 'trainer');
        await userModal.addUser(formData).then((res) => {
            helper.sweetalert.toast("Trainer Added");
            router.push("/users/trainer");
        }).catch((error) => {
            setFormErrors(error.response?.data?.errors);
        })
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
                            <h6>Comform Password</h6>
                            <input type="password" {...register("password_confirmation", { required: "Fill Confirm Password" })} placeholder="Re-enter your password" />
                        </div>

                        <div className="btn-container">
                            <a href="/users/trainer" className="cancel-btn" style={{ textDecoration: 'none' }}>Cancel</a>
                            <a href="#!">
                                <button type="submit" data-toggle="modal" data-target="#myModal"
                                    className="create-btn">Create
                                    Account</button>
                            </a>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
export default addTrainer;