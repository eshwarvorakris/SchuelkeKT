import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./component/sidebar";
import Topnavbar from "./component/topnavbar";
import Router from "next/router";
const topicpage = () => {
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
                            <div class="content-header d-flex gap-3 align-items-center">
                                <a href="#!">
                                <div class="left-icon">
                                    <ion-icon class="go-left-icon" name="arrow-back-outline"></ion-icon>
                                </div>
                                </a>
                                <div class="icon-detail">
                                <h6>Course Outcome</h6>
                                </div>
                            </div>

                            <div class="body-content">
                                <div class="body-heading">
                                <span>What is Cardiology?</span>
                                </div>

                                <div class="body-paragraph">
                                <p>Cardiology is a medical specialty and a branch of internal medicine concerned with disorders of the
                                    heart. It deals with the diagnosis and treatment of such conditions as congenital heart defects,
                                    coronary artery disease, electrophysiology, heart failure and valvular heart disease. Subspecialties of
                                    the cardiology field include cardiac electrophysiology, echocardiography, interventional cardiology and
                                    nuclear cardiology.
                                </p>

                                <p>The basic functioning of the cardiovascular system includes the way the heart processes oxygen and
                                    nutrients in the blood, which is called coronary circulation. The circulation system consists of
                                    coronary
                                    arteries and coronary veins.</p>
                                </div>

                                <div class="presentation">
                                <img class="thumbnail" src="/trainee-images/topic-page/Rectangle 721.png" alt=""/>
                                </div>

                                <div class="body-paragraph">
                                <p>The basic functioning or the cardiovascular system includes the way the heart processes oxygen and
                                    nutrients in the blood, which is called coronary circulation. The circulation system consists of
                                    coronary
                                    arteries and coronary veins.</p>
                                </div>
                            </div>

                            <div class="section2topic">
                                <div class="blank"></div>
                                <div class="trainee-footer">
                                <div class="trainee-footer-left d-flex">
                                    <a href="#!">
                                    <ion-icon name="arrow-back-outline" class="footer-icon text-light"></ion-icon>
                                    </a>

                                    <div class="icon-content-1">
                                    <a href="#">
                                        <p>PREVIOUS</p>
                                    </a>
                                    <span>Chapter 1 - introduction</span>
                                    </div>
                                </div>
                                <div class="trainee-footer-right d-flex">
                                    <div class="icon-content-2">
                                    <a href="./topic-page-2">
                                        <p>NEXT</p>
                                    </a>
                                    <span>Chapter 2 - Components of Cardiology</span>
                                    </div>
                                    <a href="./topic-page-2">
                                    <ion-icon name="arrow-forward-outline" class="footer-icon text-light"></ion-icon>
                                    </a>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
export default topicpage;