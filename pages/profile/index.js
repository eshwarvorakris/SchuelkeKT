import { useState, useEffect } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "../components/sidebar";
import Topnavbar from "../components/topnavbar";
import Router from "next/router";

const myprofile = () => {

    const { data: profile, error, isLoading } = useSWR('/', async () => await auth.profile());
    if (error) {
        Router.replace("login");
    }

    return (
        <>
            <div>
                <div class="section1">
                    <div class="blank-class"></div>
                    <Sidebar profile={profile} />
                    <div class="container-2 myprofilee">
                        <div class="col-md-12 trainee-right" style={{ backgrounColor: '#fff' }}>
                            <div class="blank-nav-class"></div>
                            <Topnavbar profile={profile}/>
                            <div class="trainee-right-body-profile">
                                <div class="trainee-profile-pic">
                                    <div class="box-1"></div>
                                    <div class="box-2"></div>
                                    <div class="text-tag">
                                        <h6>My Info</h6>
                                    </div>
                                    <img class="profile-picture-profile" src="/trainer-images/trainer.jpg" alt="" />
                                </div>
                                <div class="trainee-info">
                                    <table className="table-myprofile">
                                        <tbody>
                                            {(profile?.role == 'trainer' || profile?.role == 'trainee') &&
                                                <tr>
                                                    <td style={{ width: "125px" }}>Trainer ID</td>
                                                    <td style={{ width: "500px", color: "#008bd6" }}>
                                                        <strong>{100000+profile?.id}</strong>
                                                    </td>
                                                </tr>
                                            }

                                            <tr>
                                                <td>Full Name</td>
                                                <td><strong>{profile?.full_name}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td><strong>{profile?.email}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td>
                                                    <strong>
                                                        {profile?.address}
                                                    </strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Date-of-Birth</td>
                                                <td><strong>{profile?.dob}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Contact Number</td>
                                                <td><strong>{profile?.contact_no}</strong></td>
                                            </tr>
                                            {(profile?.role == 'trainer' || profile?.role == 'trainee') &&
                                                <tr>
                                                    <td>Education Background</td>
                                                    <td>
                                                        <strong>{profile?.edu_background}</strong>
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>

                                    </table>
                                </div>
                                <div class="edit-profile-btn">
                                    <div class="notify-popup hide-popup custom-scroll">
                                        <div class="arrow-up-popup"></div>
                                        <div class="notifications-header d-flex p-3">
                                            <div class="main-heading">Notifications</div>
                                            <div class="mark-as-read">
                                                <a href="#">Mark as read</a>
                                            </div>
                                        </div>
                                        <div class="notifications-body">
                                            <div class="notify d-flex p-3">
                                                <div class="profile-face">
                                                    <ion-icon class="notify-icon" name="person-circle-outline"></ion-icon>
                                                </div>
                                                <div class="message d-flex">
                                                    <p class="message-content">Thomas added a new course on</p>
                                                    <p class="profession">Cardiology</p>
                                                    <span class="message-time">3 mins ago</span>
                                                </div>
                                            </div>

                                            <div class="notify d-flex p-3">
                                                <div class="profile-face">
                                                    <ion-icon class="notify-icon" name="person-circle-outline"></ion-icon>
                                                </div>
                                                <div class="message d-flex">
                                                    <p class="message-content">Thomas added a new course on</p>
                                                    <p class="profession">Cardiology</p>
                                                    <span class="message-time">3 mins ago</span>
                                                </div>
                                            </div>

                                            <div class="notify d-flex p-3">
                                                <div class="profile-face">
                                                    <ion-icon class="notify-icon" name="person-circle-outline"></ion-icon>
                                                </div>
                                                <div class="message d-flex">
                                                    <p class="message-content">Thomas added a new course on</p>
                                                    <p class="profession">Cardiology</p>
                                                    <span class="message-time">3 mins ago</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="notifications-footer p-3 d-flex">
                                            <a href="#">View all</a>
                                        </div>
                                    </div>

                                    <a href="/profile/edit">
                                        <button type="button" class="btn edit-btn-profile text-light" style={{ backgroundColor: "#008bd6" }}>
                                            Edit Profile 🖋
                                        </button>
                                    </a>
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