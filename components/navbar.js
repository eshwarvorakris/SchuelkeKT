import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";
import { useContext, useEffect, useState } from 'react';
import AppContext from '../lib/appContext';

function navbar() {
    const layoutValues = useContext(AppContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light sticky-nav" style={{ width: 'inherit', border: "none" }}>
            <a className="navbar-brand" style={{ fontWeight: "700", color: 'black' }} href="#">
                {layoutValues?.pageHeading}
            </a>
            {console.log("profile data",layoutValues?.profile?.role)}
            <div className="collapse navbar-collapse flex-row-reverse">
                <ul className="navbar-nav align-content-center">
                    <li className="notify-btn nav-item active" style={{marginTop:'0.5rem'}}>
                        <Link className="nav-link" href="#"  style={{ backgroundColor: 'transparent', border: '1px solid rgba(60, 64, 67, 0.226)', borderRadius: '10px', padding: '0.5rem', color:'black' }}>
                            <i className="fa fa-bell" aria-hidden="true"></i>
                        </Link>
                        <span className="icon-badgeadmin">10+</span>
                    </li>
                    <li className="nav-item active face-tag">
                        <Link href="/profile" className="face-name text-light">
                            <button type="button" className="btn text-light profile-btn"
                                style={{ backgroundColor: "#008bd6", padding: '7px 10px 7px 10px' }}>
                                {
                                    (() => {
                                        if (layoutValues?.profile?.profile_img == '' || layoutValues?.profile?.profile_img === null) {
                                            return (
                                                <img className="img-tag" src="/trainer-images/trainer.jpg" alt="" />);
                                        }
                                        else {
                                            return (
                                                <img className="img-tag" src={layoutValues?.profile?.profile_img} alt="" />);
                                        }
                                    })()
                                }
                                <strong>{layoutValues?.profile?.full_name}</strong>
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>

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
                            <p className="message-content">Thomas enrolled a new course on</p>
                            <p className="profession">Cardiology</p>
                            <span className="message-time">3 mins ago</span>
                        </div>
                    </div>

                    <div className="notify d-flex p-3">
                        <div className="profile-face">
                            <ion-icon className="notify-icon" name="person-circle-outline"></ion-icon>
                        </div>
                        <div className="message d-flex">
                            <p className="message-content">Thomas enrolled a new course on</p>
                            <p className="profession">Cardiology</p>
                            <span className="message-time">3 mins ago</span>
                        </div>
                    </div>

                    <div className="notify d-flex p-3">
                        <div className="profile-face">
                            <ion-icon className="notify-icon" name="person-circle-outline"></ion-icon>
                        </div>
                        <div className="message d-flex">
                            <p className="message-content">Thomas enrolled a new course on</p>
                            <p className="profession">Cardiology</p>
                            <span className="message-time">3 mins ago</span>
                        </div>
                    </div>

                    <div className="notify d-flex p-3">
                        <div className="profile-face">
                            <ion-icon className="notify-icon" name="person-circle-outline"></ion-icon>
                        </div>
                        <div className="message d-flex">
                            <p className="message-content">Thomas enrolled a new course on</p>
                            <p className="profession">Cardiology</p>
                            <span className="message-time">3 mins ago</span>
                        </div>
                    </div>
                </div>
                <div className="notifications-footer p-3 d-flex">
                    <a href="#">View all</a>
                </div>
            </div>
        </nav>
    );
}

export default navbar;