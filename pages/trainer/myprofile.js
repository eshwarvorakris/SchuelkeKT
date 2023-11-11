import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./components/sidebar";
import Topnavbar from "./components/topnavbar";
import Router from "next/router";
import Image from "next/image";
const myprofile = () => {
    return (
        <>
            <div>
                <div class="section1">
                    <div class="blank-class"></div>
                    <Sidebar />
                    <div class="container-2 myprofilee">
                        <div class="col-md-12 trainee-right" style={{ backgrounColor: '#fff' }}>
                            <div class="blank-nav-class"></div>
                            <Topnavbar/>
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
                                        <tr>
                                            <td style={{width: "125px"}}>Traine ID</td>
                                            <td style={{width: "500px", color: "#008bd6"}}>
                                                <strong>348334</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Full Name</td>
                                            <td><strong>Thomas</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td><strong>Thomas@gmail.com</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>
                                                <strong>
                                                    #1234, Lorem ipsum dolor sit amet consectetur, adipisicing
                                                    elit. Ullam placeat asperiores voluptatem quo eligendi!
                                                    Fugit ipsum repellendus culpa molestias, veniam sunt beatae,
                                                    nostrum tempora odio excepturi expedita iste voluptas. Quos?
                                                </strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Date-of-Birth</td>
                                            <td><strong>May 24, 1995</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Contact Number</td>
                                            <td><strong>+01 010 3453</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Education Background</td>
                                            <td>
                                                <strong>PhD, Zoology from xyz Institute, City, Country</strong>
                                            </td>
                                        </tr>
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

                                    <a href="./profile-edit">
                                        <button type="button" class="btn edit-btn-profile text-light" style={{backgroundColor: "#008bd6"}}>
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