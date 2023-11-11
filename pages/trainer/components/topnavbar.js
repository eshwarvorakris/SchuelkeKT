import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";
import Image from "next/image";
function topnavbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light sticky-nav topnavbarr" style={{ width: '79.5vw', border: "none" }}>
            <a class="navbar-brand d-flex flex-column" style={{ fontWeight: " 500" }} href="#">
                <p className='text-dark'>Dashboard</p> <span className='text-dark'>Welcome Back!</span>
            </a>
            <div class="collapse navbar-collapse flex-row-reverse">
                <ul class="navbar-nav align-content-center">
                    <li>
                        <div class="SearchandSort-topnav">
                            <div class="search-button-topnav d-flex">
                                {/* <ion-icon name="search-outline" class="search-icon"></ion-icon> */}
                                <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" fill="currentColor" class="bi bi-search " viewBox="-2 0 20 10">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                                <div class="search-trainer"><input class="search" type="text"
                                    placeholder="Search" /></div>
                            </div>
                        </div>
                    </li>
                    {/* <li class="notify-btn nav-item active">
                    <a class="nav-link" href="#">
                      {/* <ion-icon class="trainee-nav-icon" name="notifications"></ion-icon> */}
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                      </svg>
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