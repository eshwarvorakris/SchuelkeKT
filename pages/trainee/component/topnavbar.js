import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";
import Image from "next/image";
function topnavbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light sticky-nav" style={{ width: '79.5vw', border: "none" }}>
            <a class="navbar-brand d-flex flex-column" style={{ fontWeight: " 500" }} href="#">
                <p className='text-dark'>Traniee Dashboard</p> 
            </a>
            <div class="collapse navbar-collapse flex-row-reverse">
                <ul class="navbar-nav align-content-center">
                    {/* <li>
                        <div class="SearchandSort-topnav">
                            <div class="search-button-topnav d-flex">
                                <ion-icon name="search-outline" class="search-icon"></ion-icon>
                                <div class="search-trainer"><input class="search" type="text"
                                    placeholder="Search" /></div>
                            </div>
                        </div>
                    </li> */}
                    {/* <li class="notify-btn nav-item active">
                    <a class="nav-link" href="#">
                      <ion-icon class="trainee-nav-icon" name="notifications"></ion-icon>
                    </a>
                    <span class="icon-badge">10+</span>
                  </li> */}
                    <li class="nav-item active face-tag">
                        <a href="my-profile.html" class="face-name text-light">
                            <button type="button" class="btn text-light profile-btn"
                                style={{ backgroundColor: "#008bd6" }}>
                                <img class="img-tag" src="/trainer-images/trainer.jpg" alt="" />
                                <strong>Thomas</strong>
                            </button>
                        </a>
                    </li>
                </ul>
            </div>

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
                            <p class="message-content">Thomas enrolled a new course on</p>
                            <p class="profession">Cardiology</p>
                            <span class="message-time">3 mins ago</span>
                        </div>
                    </div>

                    <div class="notify d-flex p-3">
                        <div class="profile-face">
                            <ion-icon class="notify-icon" name="person-circle-outline"></ion-icon>
                        </div>
                        <div class="message d-flex">
                            <p class="message-content">Thomas enrolled a new course on</p>
                            <p class="profession">Cardiology</p>
                            <span class="message-time">3 mins ago</span>
                        </div>
                    </div>

                    <div class="notify d-flex p-3">
                        <div class="profile-face">
                            <ion-icon class="notify-icon" name="person-circle-outline"></ion-icon>
                        </div>
                        <div class="message d-flex">
                            <p class="message-content">Thomas enrolled a new course on</p>
                            <p class="profession">Cardiology</p>
                            <span class="message-time">3 mins ago</span>
                        </div>
                    </div>

                    <div class="notify d-flex p-3">
                        <div class="profile-face">
                            <ion-icon class="notify-icon" name="person-circle-outline"></ion-icon>
                        </div>
                        <div class="message d-flex">
                            <p class="message-content">Thomas enrolled a new course on</p>
                            <p class="profession">Cardiology</p>
                            <span class="message-time">3 mins ago</span>
                        </div>
                    </div>
                </div>
                <div class="notifications-footer p-3 d-flex">
                    <a href="#">View all</a>
                </div>
            </div>
        </nav>
    );
}

export default topnavbar;