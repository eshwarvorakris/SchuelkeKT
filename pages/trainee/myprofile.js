import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Router from "next/router";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
const traineelist = () => {
    const router = useRouter();
    const [proName, setProName] = useState("");
    const { data, error, isLoading } = useSWR('/', async () => await auth.profile());
    if (error) {
        console.log(error);
        Router.replace("login");
    }
    useEffect(() => {
        let curCookie = Cookies.get('loggedInUser');
        if (curCookie !== undefined) {
            Cookies.set('loggedInUser', curCookie, { expires: 1 / 1440 });
        }
        else
        {
            router.push('login');
        }
        setInterval(() => {
            let curCookie = Cookies.get('loggedInUser');
            //console.log(curCookie);
            if (curCookie === undefined) {
            router.push('login');
            }
        }, 5000);
    }, []);
    return (
        <>
            <div>
                <div className="trainee_section1">
                    <div className="blank-class"></div>
                    <Sidebar />
                    <div className="container-2">
                        <div className="col-12 trainee-right">

                        <Navbar />

                        </div>
                        <section className=" container-profile" style={{ marginTop: '170px', position: 'relative', marginLeft: '20px', paddingRight: '50px', padding: '50px', border: ' 1px solid rgba(0, 0, 0, 0.192)', backgroundColor: 'white' }}>
                            <div className="box-1" style={{ textAlign: 'center' }}>
                                <p className="small" style={{ padding: '10px', color: '#008bd6', marginRight: '10px' }}>My Info</p>
                            </div>
                            <div className="box-2"></div>
                            <div className="container">
                                <div className="img"><img src="/trainer-images/dashboard images/thumbnails/thumbnailc.png" alt="" style={{ height: '100px', width: '100px' }} /></div>
                                <div className="data">
                                    <table>
                                        <tbody><tr>
                                            <th>Traine ID</th>
                                            <td style={{ color: '#008bd6', fontWeight: ' 600' }}> 388343</td>
                                        </tr>
                                            <tr>
                                                <th>Full Name</th>
                                                <td> Thomas</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td> Kumar@gmail.com</td>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <td> Bhopal</td>
                                            </tr>

                                            <tr>
                                                <th>Date-of-Birth</th>
                                                <td> 09-08-1998</td>
                                            </tr>
                                            <tr>
                                                <th>Contact Number</th>
                                                <td> 988887243</td>
                                            </tr>
                                            <tr>
                                                <th>Education</th>
                                                <td> PHD in geology</td>
                                            </tr>
                                            <tr>
                                                <th>Background</th>
                                                <td></td>
                                            </tr>
                                        </tbody></table>
                                </div>
                                <div className="btn"><button>Edit Profile<i className="fa-solid fa-pen" style={{ marginLeft: ' 5px' }}></i></button></div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
export default traineelist;