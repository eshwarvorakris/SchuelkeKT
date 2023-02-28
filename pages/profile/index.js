import { useState, useEffect, useContext } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import { useRouter } from "next/router";
import Link from "next/link";
import AppContext from "../../lib/appContext";
const myprofile = () => {
    const layoutValues = useContext(AppContext);
    { layoutValues.setPageHeading("Profile") }
    const router = useRouter();
    // const { data: profile, error, isLoading } = useSWR('/', async () => await auth.profile());
    // if (error) {
    //     Router.replace("login");
    // }
    const [profile, setprofileData] = useState([]);
    const [image, setImage] = useState("/trainee-images/trainer.jpg");
    useEffect(() => {
        auth.profile().then((res) => {
            if (res.profile_img !== null && res.profile_img != "") {
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
            <div className="trainee-right-body-profile" style={{height:'fit-content'}}>
                <div className="trainee-profile-pic">
                    <div className="box-1"></div>
                    <div className="box-2"></div>
                    <div className="text-tag" style={{ zIndex: '1' }}>
                        <h6>My Info</h6>
                    </div>
                    <img className="profile-picture-profile" src={image} alt="" />
                </div>
                <div className="trainee-info">

                    {/* <table className="table-myprofile" style={{ height: 'min-content' }}>
                        <tbody>
                            {(profile?.role == 'trainer' || profile?.role == 'trainee') &&
                                <tr style={{ lineHeight: '1px' }}>
                                    <td style={{ width: "125px" }}>Trainer ID</td>
                                    <td style={{ width: "500px", color: "#008bd6" }}>
                                        <strong>{profile?.user_id}</strong>
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
                                <>
                                    <tr >
                                        <td>Education Background</td>
                                        <td>
                                            <strong>{profile?.edu_background}</strong>
                                        </td>
                                    </tr>
                                </>
                            }
                            <tr >
                                <td>Country</td>
                                <td>
                                    <strong>{profile?.country}</strong>
                                </td>
                            </tr>
                            <tr >
                                <td>Year Of Joining</td>
                                <td>
                                    <strong>{profile?.joining_year}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table> */}
                    <div className="trainer-form">
                        <div className="trainer-Name">
                            <h6>Full Name</h6>
                            <input type="text" value={profile.full_name} readOnly />
                        </div>

                        <div className="trainer-Email">
                            <h6>Email</h6>
                            <input type="text" value={profile.email} readOnly />
                        </div>

                        <div className="trainer-DOB">
                            <h6>Date of Birth</h6>
                            <input type="date" value={profile.dob} readOnly />
                        </div>

                        <div className="trainer-address">
                            <h6>Address</h6>
                            <textarea className="address-box"
                                cols="30"
                                rows="3" value={profile.address} readOnly ></textarea>
                        </div>

                        <div className="trainer-Name">
                            <h6>Contact Number</h6>
                            <input type="text" value={profile.contact_no} readOnly />
                        </div>
                        {
                            (() => {
                                if (profile?.role != 'admin') {
                                    return (
                                        <div className="trainer-Name">
                                            <h6>Education Background</h6>
                                            <input type="text" value={profile.edu_background} readOnly />
                                        </div>
                                    );
                                }
                            })()
                        }
                        <div className="trainer-Name ">
                            <h6 style={{ marginRight: '5px' }}>Country Of Origin</h6>
                            <input type="text" value={profile.country} readOnly />
                        </div>
                        <div className="trainer-Name">
                            <h6>Year Of Joining</h6>
                            <input type="text" value={profile.joining_year} readOnly />
                        </div>
                    </div>
                </div>
                <div className="edit-profile-btn">
                    <Link href="/profile/edit">
                        <button type="button" className="btn edit-btn-profile text-light" style={{ backgroundColor: "#008bd6" }}>
                            Edit Profile 🖋
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default myprofile;