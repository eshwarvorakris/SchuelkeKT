import Image from "next/image";
import auth from "../../model/auth.model";
import Sidebar from "./component/sidebar";
import Topnavbar from "./component/topnavbar";
const index = () => {
  return (
    <>
        <div>
            <div class="trainee_section1">
                <div class="blank-class"></div>
                <Sidebar/>
                <div class="container-2">
                    <div class="col-md-12 trainee-right">
                        <div class="blank-nav-class"></div>
                        <Topnavbar/>
                        <form>
                            <div class="dashboard-info">
                                <div class="total-courses">
                                    <div class="left-info">
                                        <div class="numeric-info text-light">
                                            <h1 className="text-light">10</h1>
                                        </div>
                                        <div class="explicit-info text-light">
                                            <p>Total Courses</p>
                                        </div>
                                    </div>
                                    <div class="right-icon">
                                        <img src="/trainee-images/trainee-dashboard/Union.png" alt="" class="icon-info"/>
                                    </div>
                                </div>
                                <div class="enrolled-trainees">
                                    <div class="left-info">
                                        <div class="numeric-info text-light">
                                            <h1 className="text-light">5</h1>
                                        </div>
                                        <div class="explicit-info text-light">
                                            <p>Courses Pending</p>
                                        </div>
                                    </div>
                                    <div class="right-icon">
                                        <img src="/trainee-images/trainee-dashboard/Union.png" alt=""
                                            class="icon-info mr-1"/>
                                    </div>
                                </div>
                                <div class="training-hours">
                                    <div class="left-info">
                                        <div class="numeric-info text-light">
                                            <h1 className="text-light">5</h1>
                                        </div>
                                        <div class="explicit-info text-light">
                                            <p>Courses Completed</p>
                                        </div>
                                    </div>
                                    <div class="right-icon">
                                        <img src="/trainee-images/trainee-dashboard/Union.png" alt="" class="icon-info"/>
                                        <img src="/trainee-images/dashboard images/icon-3(2).png" class="vector-fig"
                                            alt=""/>
                                    </div>
                                </div>
                                <div class="courses-completion">
                                    <div class="left-info">
                                        <div class="numeric-info text-light">
                                            <h1 className="text-light">150</h1>
                                        </div>
                                        <div class="explicit-info text-light">
                                            <p>Total Learing Hours</p>
                                        </div>
                                    </div>
                                    <div class="right-icon">
                                        <img src="/trainee-images/trainee-dashboard/Union.png" alt="" class="icon-info"/>
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
                                                        <a href="/trainee/new-trainee-course-page.html" className="cardspan">
                                                            <div class="trainee-card card" style={{width: "14rem"}}>
                                                                <div class="card-thumbnail">
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/2.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
                                                                    <div class="card-text-tag">
                                                                        <span
                                                                            class="success-text-tag text-success">Completed</span>
                                                                    </div>
                                                                </div>
                                                                <div class="card-body">
                                                                    <div class="card-topic-heading cardspan">
                                                                        Gastroestrology
                                                                    </div>
                                                                    <div class="card-topic-info d-flex justify-content-between">
                                                                        <div class="card-chapters-info d-flex gap-1">
                                                                            <div class="card-icon-traniee-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span className="cardspan">54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
                                                                        </div>
                                                                        <div class="card-date-info">
                                                                            <span>14 Apr 22, 12:00 AM</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>


                                                        <a href="/trainee/new-trainee-course-page.html" className="cardspan">
                                                            <div class="trainee-card card" style={{width: "14rem"}}>
                                                                <div class="card-thumbnail">
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/1.png"
                                                                        alt="Card image cap"/>
                                                                        {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
                                                                        </div>
                                                                        <div class="card-date-info">
                                                                            <span>14 Apr 22, 12:00 AM</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>


                                                        <a href="/trainee/new-trainee-course-page.html" className="cardspan">
                                                            <div class="trainee-card card" style={{width: "14rem"}}>
                                                                <div class="card-thumbnail">
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/4.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png"
                                                                alt=""> --> */}
                                                                    <i class="card-tag bi bi-lock" >
                                                                    </i>
                                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                                                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                                                        </svg> */}
                                                                </div>
                                                                <div class="card-body">
                                                                    <div class="card-topic-heading">
                                                                        Neurology
                                                                    </div>
                                                                    <div class="card-topic-info d-flex justify-content-between">
                                                                        <div class="card-chapters-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
                                                                        </div>
                                                                        <div class="card-date-info">
                                                                            <span>14 Apr 22, 12:00 AM</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>


                                                        <a href="/trainee/new-trainee-course-page.html" className="cardspan">
                                                            <div class="trainee-card card" style={{width: "14rem"}}>
                                                                <div class="card-thumbnail">
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/4.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png"
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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

                                                        <a href="/trainee/new-trainee-course-page.html" className="cardspan">
                                                            <div class="trainee-card card" style={{width: "14rem"}}>
                                                                <div class="card-thumbnail">
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/1.png"
                                                                        alt="Card image cap"/>
                                                                    <ion-icon class="card-tag" name="lock-closed-outline">
                                                                    </ion-icon>
                                                                </div>
                                                                <div class="card-body">
                                                                    <div class="card-topic-heading">
                                                                        Gastroestrology
                                                                    </div>
                                                                    <div class="card-topic-info d-flex justify-content-between">
                                                                        <div class="card-chapters-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
                                                                        </div>
                                                                        <div class="card-date-info">
                                                                            <span>14 Apr 22, 12:00 AM</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>


                                                        <a href="/trainee/new-trainee-course-page.html" className="cardspan">
                                                            <div class="trainee-card card" style={{width: "14rem"}}>
                                                                <div class="card-thumbnail">
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
                                                                        </div>
                                                                        <div class="card-date-info">
                                                                            <span>14 Apr 22, 12:00 AM</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>


                                                        <a href="/trainee/new-trainee-course-page.html"className="cardspan">
                                                            <div class="trainee-card card" style={{width: "14rem"}}>
                                                                <div class="card-thumbnail">
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                        alt="Card image cap"/>


                                                                    <ion-icon class="card-tag" name="lock-closed-outline">
                                                                    </ion-icon>
                                                                </div>
                                                                <div class="card-body">
                                                                    <div class="card-topic-heading">
                                                                        Pulmonlogy
                                                                    </div>
                                                                    <div class="card-topic-info d-flex justify-content-between">
                                                                        <div class="card-chapters-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
                                                                        </div>
                                                                        <div class="card-date-info">
                                                                            <span>14 Apr 22, 12:00 AM</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>


                                                        <a href="/trainee/new-trainee-course-page.html" className="cardspan">
                                                            <div class="trainee-card card" style={{width: "14rem"}}>
                                                                <div class="card-thumbnail">
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png"
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/2.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/1.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/4.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png"
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/4.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="s/image/trainee-images/trainee-dashboard/tags/Group.png"
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/1.png"
                                                                        alt="Card image cap"/>
                                                                    <ion-icon class="card-tag" name="lock-closed-outline">
                                                                    </ion-icon>
                                                                </div>
                                                                <div class="card-body">
                                                                    <div class="card-topic-heading">
                                                                        Gastroestrology
                                                                    </div>
                                                                    <div class="card-topic-info d-flex justify-content-between">
                                                                        <div class="card-chapters-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
                                                                        </div>
                                                                        <div class="card-date-info">
                                                                            <span>14 Apr 22, 12:00 AM</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>


                                                        <a href="/trainee/new-trainee-course-page.html">
                                                            <div class="trainee-card card"style={{width: "14rem"}}>
                                                                <div class="card-thumbnail"> 
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="s/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                        alt="Card image cap"/>


                                                                    <ion-icon class="card-tag" name="lock-closed-outline">
                                                                    </ion-icon>
                                                                </div>
                                                                <div class="card-body">
                                                                    <div class="card-topic-heading">
                                                                        Pulmonlogy
                                                                    </div>
                                                                    <div class="card-topic-info d-flex justify-content-between">
                                                                        <div class="card-chapters-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png"
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/2.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/1.png"
                                                                        alt="Card image cap"/>
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/4.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png"
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/4.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png"
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                            <div class="trainee-card card"style={{width: "14rem"}}>
                                                                <div class="card-thumbnail">
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/1.png"
                                                                        alt="Card image cap"/>
                                                                    <ion-icon class="card-tag" name="lock-closed-outline">
                                                                    </ion-icon>
                                                                </div>
                                                                <div class="card-body">
                                                                    <div class="card-topic-heading">
                                                                        Gastroestrology
                                                                    </div>
                                                                    <div class="card-topic-info d-flex justify-content-between">
                                                                        <div class="card-chapters-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png" alt=""> --> */}
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                        alt="Card image cap"/>


                                                                    <ion-icon class="card-tag" name="lock-closed-outline">
                                                                    </ion-icon>
                                                                </div>
                                                                <div class="card-body">
                                                                    <div class="card-topic-heading">
                                                                        Pulmonlogy
                                                                    </div>
                                                                    <div class="card-topic-info d-flex justify-content-between">
                                                                        <div class="card-chapters-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
                                                                        </div>
                                                                        <div class="card-date-info">
                                                                            <span>14 Apr 22, 12:00 AM</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>


                                                        <a href="/trainee/new-trainee-course-page.html">
                                                            <div class="trainee-card card"style={{width: "14rem"}}>
                                                                <div class="card-thumbnail">
                                                                    <img class="card-imgg card-img-topp"
                                                                        src="/trainee-images/trainee-dashboard/card-thumbnails/3.png"
                                                                        alt="Card image cap"/>
                                                                    {/* <!-- <img class="card-tag" src="/images/trainee-images/trainee-dashboard/tags/Group.png"
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
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/book 7.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="chapter-info">
                                                                                <span>54 Chapters</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="card-time-info d-flex gap-1">
                                                                            <div class="card-icon-traniee">
                                                                                <img src="/trainee-images/trainee-dashboard/logos/Vector.png"
                                                                                    alt="icon"/>
                                                                            </div>
                                                                            <div class="card-time-info">
                                                                                <span>6hrs 45mins</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="enrolled-info d-flex gap-1">
                                                                        <div class="card-icon-traniee">
                                                                            <img src="/trainee-images/trainee-dashboard/logos/calendar 7.png"
                                                                                alt="icon"/>
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
export default index;