import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./components/sidebar";
import Topnavbar from "./components/topnavbar";
import Router from "next/router";
import thumbnaila from "../../public/trainer-images/dashboard images/thumbnails/thumbnaila.png"
const addcourse = () => {
  return (
    <>
      <div>
      <div class="section1-addcourse">


<div class="blank-class"></div>

<Sidebar/>

<div class="container-2">
    <div class="col-md-12 trainee-right">
        <div class="blank-nav-class"></div>
        <Topnavbar/>

        <form>

            <div class="trainee-body">
                <div class="trainee-list-createcourse d-flex flex-column">
                    <div class="box-1-enrolledtrainers"></div>
                    <div class="box-2-enrolledtrainers"></div>

                    <div class="trainee-tag-enrolledtrainers">
                        <p>Create Course</p>
                    </div>

                    <div class="trainee-course-form d-grid">
                        <div class="course-form d-flex flex-column justify-content-between">
                            <div class="course-name">
                                <h6>Course Name</h6>
                                <input type="text" placeholder="Gastroentrology"/>
                            </div>
                            <div class="category">
                                <h6 for="category">Category</h6>
                                <select name="category" id="cars" className="selectaddcourse">
                                    <option value="Country">Country</option>
                                    <option value="Blanket">Blanket</option>
                                    <option value="Product">Product</option>
                                </select>
                            </div>
                            <div class="course-completion">
                                <h6>Number of Modules</h6>
                                <input type="number"/>
                            </div>
                            <div class="launch-date">
                                <h6>Course Launch Date</h6>
                                <input class="min-date" type="date"/>
                            </div>
                        </div>

                        <div class="edit-thumbnail d-flex flex-column justify-content-between">
                            <div>

                                <h6>Upload Thumbnail image</h6>
                                <div class="img-container-btns d-flex">
                                    <div class="pic-container">
                                        <img class="thumbnail-pic"
                                            src="/trainer-images/dashboard images/thumbnail.png" alt=""/>
                                    </div>
                                    <div class="btns d-flex flex-column gap-4">

                                        <div class="right-col-btns d-flex flex-column gap-4">
                                            <a href="#!">
                                                <button type="button"
                                                    class="upload-btn btn d-flex justify-content-center gap-2">
                                                    <img class="btn-icon"
                                                        src="/trainer-images/dashboard images/Vector.png"
                                                        alt=""/>
                                                    <span>Browse</span>
                                                </button>
                                                <input class="file-input" type="file" hidden/>
                                            </a>
                                        </div>

                                        {/* <!-- <div class="right-col-btns d-flex flex-column gap-4">
                                        <a href="#!">
                                            <button class="btn d-flex justify-content-center gap-2">
                                                <img class="btn-icon"
                                                    src="/images/trainer-images/dashboard images/Vector (1).png" alt="">
                                                <span>Upload</span>
                                            </button>
                                        </a>
                                    </div> --> */}

                                        <div class="right-col-btns black-border d-flex flex-column gap-4">
                                            <a href="#!">
                                                <button class="btn d-flex justify-content-center gap-2">
                                                    <img class="btn-icon"
                                                        src="/trainer-images/dashboard images/Vector (2).png"
                                                        alt=""/>
                                                    <span style={{color: 'rgba(0, 0, 0, 0.568)'}}>Remove</span>
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="course-completion">
                                <h6>Weeks Required for Completion</h6>
                                <input type="number"/>
                            </div>
                        </div>
                    </div>
                    <div class="text-box">
                        <div class="text-heading">
                            <h6>Course Description</h6>
                        </div>
                        <textarea name="description box" cols="30" rows="30" class="text-type-box"></textarea>


                        <div class="btn-container d-flex justify-content-between mt-5">
                            <div class="left-col">
                                <div class="edit-modules-btn">
                                    <a href="./editcourse"><button type="button" class="btn"
                                            style={{backgroundColor: "#008bd6"}}><span>Edit
                                                Module</span></button></a>
                                </div>
                            </div>
                            <div class="right-col d-flex gap-4">
                                <div class="back-btn">
                                    <a href="./mycourse">
                                        <button type="button" class="btn" data-toggle="modal"
                                            data-target="#myModal"><span
                                                style={{color: "rgba(0, 0, 0, 0.61)"}}>Back</span>
                                        </button>
                                    </a>
                                </div>

                                <div class="save-btn">
                                    <a href="#!"><button type="submit" class="btn"
                                            style={{backgroundColor: "#008bd6"}}><span>Save</span></button></a>
                                </div>
                            </div>
                        </div>
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
export default addcourse;