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
const addTrainer = ({ categories }) => {
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
            <div>
                <div className="section1-addcourse">
                    <div className="blank-class"></div>
                    <Sidebar profile={profile} />
                    <div className="container-2">
                        <div className="col-md-12 trainee-right">
                            <div className="blank-nav-class"></div>
                            <Topnavbar profile={profile} />

                            <form onSubmit={onSubmit} encType="multipart/form-data" >
                                
                                <div className="trainee-body">
                                    <div className="trainee-list-createcourse d-flex flex-column">
                                        <div className="box-1-enrolledtrainers"></div>
                                        <div className="box-2-enrolledtrainers"></div>

                                        <div className="trainee-tag-enrolledtrainers">
                                            <p>Register Trainer</p>
                                        </div>
                                        <div class="trainer-ID">
                                            <span>Trainer ID -</span>
                                            <span style={{fontWeight: '600',color: '#008bd6'}}> {100000 + userId?.data} </span>
                                            <span style={{color: '#008bd6', fontWeight: '100', fontSize: '12px'}}
                                                class="pl-2">(Auto-generated)</span>
                                        </div>

                                        <div class="trainer-name" style={{display:'block'}}>
                                            <h6>Trainer Name</h6>
                                            <input type="text" {...register("full_name", { required: "Fill Name" })} placeholder="Enter Trainer's full name" />
                                        </div>

                                        <div class="trainer-email">
                                            <h6>Trainer Email</h6>
                                            <input type="email" {...register("email", { required: "Fill Email Address" })} placeholder="Enter Trainer's email address" />
                                        </div>

                                        <div class="trainer-name" style={{display:'block'}}>
                                            <h6>Trainer Contact</h6>
                                            <input type="text" {...register("contact_no", { required: "Fill Contact Number" })} placeholder="Enter Trainer's full name" />
                                        </div>

                                        <div class="trainer-email-password">
                                            <div class="d-flex gap-2 text-info">
                                                <h6>Create password</h6>
                                                <span style={{'color': '#008bd6'}}>ⓘ</span>
                                                <span style={{color: '#008bd6', fontSize: '12px'}}>password strength -
                                                    <strong>strong</strong></span>
                                            </div>
                                            <input type="password" {...register("password", { required: "Fill Password" })} placeholder="Enter a Password" />
                                        </div>

                                        <div class="trainer-email-password-comform">
                                            <h6>Comform Password</h6>
                                            <input type="password" {...register("password_confirmation", { required: "Fill Confirm Password" })} placeholder="Re-enter your password" />
                                        </div>

                                        <div class="btn-container">
                                            <a href="/users/trainer" className="cancel-btn" style={{textDecoration:'none'}}>Cancel</a>
                                            <a href="#!">
                                                <button type="submit" data-toggle="modal" data-target="#myModal"
                                                    class="create-btn">Create
                                                    Account</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default addTrainer;

export async function getServerSideProps(req, res) {
    const categories = (await category.list()).data;
    //console.log(categories);
    return {
        props: {
            categories
        },
    }
}