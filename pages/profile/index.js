import { useState, useEffect } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "../components/sidebar";
import Topnavbar from "../components/topnavbar";
import { useRouter } from "next/router";

const myprofile = () => {
    const router = useRouter();
    // const { data: profile, error, isLoading } = useSWR('/', async () => await auth.profile());
    // if (error) {
    //     Router.replace("login");
    // }
    const [profile, setprofileData] = useState([]);
    const [image, setImage] = useState("/trainee-images/trainer.jpg");
    useEffect(() => {
        auth.profile().then((res) => {
            if(res.profile_img !== null) {
                setImage(res.profile_img);
            }
            setprofileData(res);
            console.log(res);
        }).catch((error) => {
            router.replace("/login");
            console.log(error);
        });
    }, [router]);
    return (
        <>
            <div className="trainee-right-body-profile">
                <div className="trainee-profile-pic">
                    <div className="box-1"></div>
                    <div className="box-2"></div>
                    <div className="text-tag">
                        <h6>My Info</h6>
                    </div>
                    <img className="profile-picture-profile" src={image} alt="" />
                </div>
                <div className="trainee-info">
                    
                    <table className="table-myprofile" style={{ height: 'min-content' }}>
                        <tbody>
                            {(profile?.role == 'trainer' || profile?.role == 'trainee') &&
                                <tr style={{ lineHeight: '1px' }}>
                                    <td style={{ width: "125px" }}>Trainer ID</td>
                                    <td style={{ width: "500px", color: "#008bd6" }}>
                                        <strong>{100000 + profile?.id}</strong>
                                    </td>
                                </tr>
                            }
                            <tr style={{ lineHeight: '1px' }}>
                                <td style={{ width: "125px" }}>Full Name</td>
                                <td style={{ width: "500px", color: "#008bd6" }}><strong>{profile?.full_name}</strong></td>
                            </tr>
                            <tr style={{ lineHeight: '1px' }}>
                                <td>Email</td>
                                <td><strong>{profile?.email}</strong></td>
                            </tr>
                            <tr style={{ lineHeight: '1px' }}>
                                <td>Address</td>
                                <td>
                                    <strong>
                                        {profile?.address}
                                    </strong>
                                </td>
                            </tr>
                            <tr style={{ lineHeight: '1px' }}>
                                <td>Date-of-Birth</td>
                                <td><strong>{profile?.dob}</strong></td>
                            </tr>
                            <tr style={{ lineHeight: '1px' }}>
                                <td>Contact Number</td>
                                <td><strong>{profile?.contact_no}</strong></td>
                            </tr>
                            {(profile?.role == 'trainer' || profile?.role == 'trainee') &&
                                <tr >
                                    <td>Education Background</td>
                                    <td>
                                        <strong>{profile?.edu_background}</strong>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>

                </div>
                <div className="edit-profile-btn">
                    <a href="/profile/edit">
                        <button type="button" className="btn edit-btn-profile text-light" style={{ backgroundColor: "#008bd6" }}>
                            Edit Profile 🖋
                        </button>
                    </a>
                </div>
            </div>
        </>
    )
}
export default myprofile;