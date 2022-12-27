import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./component/sidebar";
import Topnavbar from "./component/topnavbar";
import Router from "next/router";
const mycourse = () => {
  return (
    <>
        <div>
            <div class="section1-edit">
                <div class="blank-class"></div>
                <Sidebar/>
                <div class="container-2">
                    <div class="col-md-12 trainee-right">
                        <div class="blank-nav-class"></div>
                        <Topnavbar/>
                        <form>

                    <div class="content-heading">
                        <h5>Recent Learning</h5>
                    </div>

                    <div class="learning-card">
                        <div class="thumbnail-container">
                            <img class="thumbnail-img" src="/trainee-images/trainee-dashboard/card-thumbnail.png"
                                alt=""/>
                        </div>
                        <div class="topic-info d-flex flex-column">
                            <div class="topic-heading-container">
                                <div class="topic-heading">
                                    <h5>Gastroestrology</h5>
                                </div>
                                <div class="time-left-info" style={{color: "#030303"}}><span>9hrs 41mins left</span></div>
                            </div>

                            <div class="progress-info">
                                <div class="d-flex flex-column gap-1">
                                    <div class="percentage-info">
                                        <span>80% Employees Completed</span>
                                    </div>
                                    <div class="progress-bar-info">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style={{width: "75%",
                                                ariaValuenow:"75", ariaValuemin:"0", ariaValuemax:"100"}}>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="completed-info">
                                        <span><span class="text-primary">67 </span>Out of 90 Completed</span>
                                    </div>
                                </div>
                                <div class="button-container-myprofile">
                                    <a href="./topic-page">
                                        <button type="button" class="learning-btn">Continue Learning</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pc-tab">
                        <input checked="checked" id="tab1" type="radio" name="pct" />
                        <input id="tab2" type="radio" name="pct" />
                        <input id="tab3" type="radio" name="pct" />
                        <div class="tab-container">
                            <ul>
                                <li class="tab1 tab-1">
                                    <label class="tab-label-1 container-heading" for="tab1">Blanket</label>
                                </li>
                                <li class="tab2">
                                    <label class="tab-label-2 container-heading" for="tab2">Country</label>
                                </li>
                                <li class="tab3">
                                    <label class="tab-label-3 container-heading" for="tab3">Product</label>
                                </li>
                            </ul>
                        </div>
                        <section>
                            <div class="tab1">
                                <div class="trainee-cards">
                                    <div class="container">
                                        <div class="row d-flex flex-column gap-5">
                                            <div class="col-12 d-flex justify-content-around">
                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/2.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
                                                            <div class="card-text-tag">
                                                                <span
                                                                    class="success-text-tag text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Gastroestrology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/1.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
                                                            <div class="card-text-tag">
                                                                <span class="on-going-text-tag text-danger">On
                                                                    Going</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Gastroestrology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/4.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png"
                                                        alt=""> --> */}
                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Neurology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/4.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png"
                                                        alt=""> --> */}

                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Neurology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                            </div>
                                            <div class="col-12 d-flex justify-content-around">

                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/1.png"
                                                                alt="Card image cap" />
                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Gastroestrology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
                                                            <div class="card-text-tag">
                                                                <span class="not-started-text-tag">Not Yet
                                                                    Started</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Pulmonlogy
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                alt="Card image cap" />


                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Pulmonlogy
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png"
                                                         alt=""> --> */}

                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>

                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Pulmonlogy
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab2">
                                <div class="trainee-cards">
                                    <div class="container">
                                        <div class="row d-flex flex-column gap-5">
                                            <div class="col-12 d-flex justify-content-around">
                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/2.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
                                                            <div class="card-text-tag">
                                                                <span
                                                                    class="success-text-tag text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Gastroestrology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/1.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
                                                            <div class="card-text-tag">
                                                                <span class="on-going-text-tag text-danger">On
                                                                    Going</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Gastroestrology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/4.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png"
                                                        alt=""> --> */}
                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Neurology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/4.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png"
                                                        alt=""> --> */}

                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Neurology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                            </div>
                                            <div class="col-12 d-flex justify-content-around">

                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/1.png"
                                                                alt="Card image cap" />
                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Gastroestrology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
                                                            <div class="card-text-tag">
                                                                <span class="not-started-text-tag">Not Yet
                                                                    Started</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Pulmonlogy
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                alt="Card image cap" />


                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Pulmonlogy
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png"
                                                         alt=""> --> */}

                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>

                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Pulmonlogy
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab3">
                                <div class="trainee-cards">
                                    <div class="container">
                                        <div class="row d-flex flex-column gap-5">
                                            <div class="col-12 d-flex justify-content-around">
                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/2.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
                                                            <div class="card-text-tag">
                                                                <span
                                                                    class="success-text-tag text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Gastroestrology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/1.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
                                                            <div class="card-text-tag">
                                                                <span class="on-going-text-tag text-danger">On
                                                                    Going</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Gastroestrology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/4.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png"
                                                        alt=""> --> */}
                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Neurology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/4.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png"
                                                        alt=""> --> */}

                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Neurology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                            </div>
                                            <div class="col-12 d-flex justify-content-around">

                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/1.png"
                                                                alt="Card image cap" />
                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Gastroestrology
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
                                                            <div class="card-text-tag">
                                                                <span class="not-started-text-tag">Not Yet
                                                                    Started</span>
                                                            </div>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Pulmonlogy
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                alt="Card image cap" />


                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Pulmonlogy
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                                <a href="/trainee/new-trainee-course-page.html">
                                                    <div class="trainee-card card" style={{width: "14rem"}}>
                                                        <div class="card-thumbnail">
                                                            <img class="card-img card-img-top"
                                                                src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                alt="Card image cap" />
                                                            {/* <!-- <img class="card-tag" src="/trainee-images/trainee-dashboard/tags/Group.png"
                                                         alt=""> --> */}

                                                            <ion-icon class="card-tag" name="lock-closed-outline">
                                                            </ion-icon>

                                                        </div>
                                                        <div class="card-body">
                                                            <div class="card-topic-heading">
                                                                Pulmonlogy
                                                            </div>
                                                            <div class="card-topic-info d-flex justify-content-between">
                                                                <div class="card-chapters-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="chapter-info">
                                                                        <span>54 Chapters</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-time-info d-flex gap-1">
                                                                    <div class="card-icon-mycourse">
                                                                        <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                            alt="icon" />
                                                                    </div>
                                                                    <div class="card-time-info">
                                                                        <span>6hrs 45mins</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="enrolled-info d-flex gap-1">
                                                                <div class="card-icon-mycourse">
                                                                    <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                        alt="icon" />
                                                                </div>
                                                                <div class="card-date-info">
                                                                    <span>14 Apr 22, 12:00 AM</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
export default mycourse;