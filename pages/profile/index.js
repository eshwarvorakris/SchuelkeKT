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
                        <div class="col-md-12 trainee-right" style={{ backgroundColor: '#fff' }}>
                            <Topnavbar profile={profile} />

                        </div>
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
                                {/* <table className="table-myprofile">
                                    <tbody>
                                        {(profile?.role == 'trainer' || profile?.role == 'trainee') &&
                                            <tr>
                                                <td style={{ width: "125px" }}>Trainer ID</td>
                                                <td style={{ width: "500px", color: "#008bd6" }}>
                                                    <strong>{100000 + profile?.id}</strong>
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
                                </table> */}
                                <table className="table-myprofile" style={{height: 'min-content'}}>
                                    <tbody>
                                        {(profile?.role == 'trainer' || profile?.role == 'trainee') &&
                                            <tr style={{lineHeight:'1px'}}>
                                                <td style={{ width: "125px" }}>Trainer ID</td>
                                                <td style={{ width: "500px", color: "#008bd6" }}>
                                                    <strong>{100000 + profile?.id}</strong>
                                                </td>
                                            </tr>
                                        }
                                        <tr style={{lineHeight:'1px'}}>
                                            <td style={{ width: "125px" }}>Full Name</td>
                                            <td style={{ width: "500px", color: "#008bd6" }}><strong>{profile?.full_name}</strong></td>
                                        </tr>
                                        <tr style={{lineHeight:'1px'}}>
                                            <td>Email</td>
                                            <td><strong>{profile?.email}</strong></td>
                                        </tr>
                                        <tr style={{lineHeight:'1px'}}>
                                            <td>Address</td>
                                            <td>
                                                <strong>
                                                    {profile?.address}
                                                </strong>
                                            </td>
                                        </tr>
                                        <tr style={{lineHeight:'1px'}}>
                                            <td>Date-of-Birth</td>
                                            <td><strong>{profile?.dob}</strong></td>
                                        </tr>
                                        <tr style={{lineHeight:'1px'}}>
                                            <td>Contact Number</td>
                                            <td><strong>{profile?.contact_no}</strong></td>
                                        </tr>
                                        {(profile?.role == 'trainer' || profile?.role == 'trainee') &&
                                            <tr style={{lineHeight:'1px'}}>
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
        </>
    )
}
export default myprofile;