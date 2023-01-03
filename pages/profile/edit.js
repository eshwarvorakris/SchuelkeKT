import { useState, useEffect } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "../components/sidebar";
import Topnavbar from "../components/topnavbar";
import { useRouter } from "next/router";
import { config } from '../../lib/config';
import { useForm } from 'react-hook-form';
import { helper } from '../../lib/helper';

const myprofile = () => {
    const router = useRouter();
    const { data: profile, error, isLoading } = useSWR('/', async () => await auth.profile());
    if (error) {
        router.replace("login");
    }

    const [formErrors, setFormErrors] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: profile });
    return (
        <>
            <div>
                <div className="section1">
                    <div className="blank-class"></div>
                    <Sidebar profile={profile} />
                    <div className="container-2 myprofilee">
                        <div className="col-md-12 trainee-right" style={{ backgrounColor: '#fff' }}>
                            <div className="blank-nav-class"></div>
                            <Topnavbar profile={profile} />
                            <div className="trainee-right-edit">
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
                                            <div className="trainer-Name">
                                                <h6>Full Name</h6>
                                                <input type="text" placeholder="Thomas" />
                                            </div>

                                            <div className="trainer-Email">
                                                <h6>Email</h6>
                                                <input type="text" placeholder="Thomas@gmail.com" />
                                            </div>

                                            <div className="trainer-DOB">
                                                <h6>Date of Birth</h6>
                                                <input type="date" />
                                            </div>

                                            <div className="trainer-address">
                                                <h6>Address</h6>
                                                <textarea className="address-box"
                                                    placeholder="1234, Lorem ipsum dolor sit amet, consectetur" cols="30"
                                                    rows="3"></textarea>
                                            </div>

                                            <div className="trainer-contact-no">
                                                <h6>Contact Number</h6>
                                                <input type="number" placeholder="+01 345 3345" />
                                            </div>

                                            <div className="trainer-background">
                                                <h6>Education Background</h6>
                                                <input type="number" placeholder="PhD. Zoology from XYZ Instiute, City, Country" />
                                            </div>

                                            <div className="trainer-designation">
                                                <h6>Designation</h6>
                                                <input type="text" placeholder="Product Devolopment Head" />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="edit-profile-btn">
                                        <div className="notify-popup hide-popup custom-scroll">
                                            <div className="arrow-up-popup"></div>
                                            <div className="notifications-header d-flex p-3">
                                                <div className="main-heading">Notifications</div>
                                                <div className="mark-as-read">
                                                    <a href="#">Mark as read</a>
                                                </div>
                                            </div>
                                            <div className="notifications-body">
                                                <div className="notify d-flex p-3">
                                                    <div className="profile-face">
                                                        <ion-icon className="notify-icon" name="person-circle-outline"></ion-icon>
                                                    </div>
                                                    <div className="message d-flex">
                                                        <p className="message-content">Thomas added a new course on</p>
                                                        <p className="profession">Cardiology</p>
                                                        <span className="message-time">3 mins ago</span>
                                                    </div>
                                                </div>

                                                <div className="notify d-flex p-3">
                                                    <div className="profile-face">
                                                        <ion-icon className="notify-icon" name="person-circle-outline"></ion-icon>
                                                    </div>
                                                    <div className="message d-flex">
                                                        <p className="message-content">Thomas added a new course on</p>
                                                        <p className="profession">Cardiology</p>
                                                        <span className="message-time">3 mins ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="notifications-footer p-3 d-flex">
                                                <a href="#">View all</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="button-footer d-flex justify-content-end gap-3">
                                    <div className="cancel-btn-proflie">
                                        <a href="#!"><button type="reset" className="btn btn-light">Cancel</button></a>
                                    </div>

                                    <div className="save-btn-proflie">
                                        <a href="#!"><button type="submit" className="btn btn-primary">Save</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default myprofile;