import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./components/sidebar";
import Topnavbar from "./components/topnavbar";
import Router from "next/router";
import Image from "next/image";
const editmodule = () => {
  return (
    <>
      <div>
        <div class=" section1 ">


          <div class=" blank-class "></div>

          <Sidebar />

          <div class=" container-2 ">
            <div class=" col-md-12 trainee-right ">
                <div class=" blank-nav-class "></div>
                <Topnavbar/>
                <form>
                    <div class="trainee-body">
                        <div class="trainee-list d-flex flex-column">
                            <div class="box-1-enrolledtrainers"></div>
                            <div class="box-2-enrolledtrainers"></div>

                            <div class="trainee-tag-enrolledtrainers">
                                <p>Edit Modules</p>
                            </div>

                            <div class="module-heading">
                                <h6>Modules Name</h6>
                            </div>
                            <div class="wrapper custom-scroll">
                                <div class="module-card module-card-1 d-flex">
                                    <div class="left-side-card d-flex">
                                        <div class="drag-icon drag-container">
                                            <img class="drag-icon"
                                                src="/trainer-images/edit-module/Vector (Stroke).png"
                                                alt="drag here"/>
                                        </div>
                                        <div class="input-container-edit d-flex gap-2">
                                            <div class="module-card-name">
                                                <span>Module 1 -</span>
                                            </div>
                                            <div class="module-input d-flex">
                                                <div class="search-wrap">
                                                    <input type="text" placeholder="Lorem ipsum dolor sit amet"/>
                                                </div>
                                                <a href="#!">
                                                    <div class="edit-edit"><span>Edit</span></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right-side-card d-flex">
                                        <div class="edit-btn mb-4">
                                            <a href="./editmodulecontent"><button type="button"
                                                    class="btn"><span>Edit Content
                                                        🖊</span></button></a>
                                        </div>
                                        <div class="delete-btn">
                                            {/* <!-- <button class="delete-btn-press"> --> */}
                                            <a href="#!">
                                                <img class="delete-icon"
                                                    src="/trainer-images/edit-module/Vector.png"
                                                    alt="delete button"/>
                                            </a>
                                            {/* <!-- </button> --> */}
                                        </div>
                                    </div>
                                </div>
                                <div class="module-card module-card-2 d-flex">
                                    <div class="left-side-card d-flex">
                                        <div class="drag-icon drag-container">
                                            <img class="drag-icon"
                                                src="/trainer-images/edit-module/Vector (Stroke).png"
                                                alt="drag here"/>
                                        </div>
                                        <div class="input-container-edit d-flex gap-2">
                                            <div class="module-card-name">
                                                <span>Module 2 -</span>
                                            </div>
                                            <div class="module-input d-flex">
                                                <div class="search-wrap">
                                                    <input type="text" placeholder="Lorem ipsum dolor sit amet"/>
                                                </div>
                                                <a href="#!">
                                                    <div class="edit-edit"><span>Edit</span></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right-side-card d-flex">
                                        <div class="edit-btn mb-4">
                                            <a href="./editmodulecontent"><button type="button"
                                                    class="btn"><span>Edit Content
                                                        🖊</span></button></a>
                                        </div>
                                        <div class="delete-btn">
                                            {/* <!-- <button class="delete-btn-press"> --> */}
                                            <a href="#!">
                                                <img class="delete-icon"
                                                    src="/trainer-images/edit-module/Vector.png"
                                                    alt="delete button"/>
                                            </a>
                                            {/* <!-- </button> --> */}
                                        </div>
                                    </div>
                                </div>
                                <div class="module-card module-card-3 d-flex">
                                    <div class="left-side-card d-flex">
                                        <div class="drag-icon drag-container">
                                            <img class="drag-icon"
                                                src="/trainer-images/edit-module/Vector (Stroke).png"
                                                alt="drag here"/>
                                        </div>
                                        <div class="input-container-edit d-flex gap-2">
                                            <div class="module-card-name">
                                                <span>Module 3 -</span>
                                            </div>
                                            <div class="module-input d-flex">
                                                <div class="search-wrap">
                                                    <input type="text" placeholder="Lorem ipsum dolor sit amet"/>
                                                </div>
                                                <a href="#!">
                                                    <div class="edit-edit"><span>Edit</span></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right-side-card d-flex">
                                        <div class="edit-btn mb-4">
                                            <a href="./editmodulecontent"><button type="button"
                                                    class="btn"><span>Edit Content
                                                        🖊</span></button></a>
                                        </div>
                                        <div class="delete-btn">
                                            {/* <!-- <button class="delete-btn-press"> --> */}
                                            <a href="#!">
                                                <img class="delete-icon"
                                                    src="/trainer-images/edit-module/Vector.png"
                                                    alt="delete button"/>
                                            </a>
                                            {/* <!-- </button> --> */}
                                        </div>
                                    </div>
                                </div>
                                <div class="module-card module-card-4 d-flex">
                                    <div class="left-side-card d-flex">
                                        <div class="drag-icon drag-container">
                                            <img class="drag-icon"
                                                src="/trainer-images/edit-module/Vector (Stroke).png"
                                                alt="drag here"/>
                                        </div>
                                        <div class="input-container-edit d-flex gap-2">
                                            <div class="module-card-name">
                                                <span>Module 4 -</span>
                                            </div>
                                            <div class="module-input d-flex">
                                                <div class="search-wrap">
                                                    <input type="text" placeholder="Lorem ipsum dolor sit amet"/>
                                                </div>
                                                <a href="#!">
                                                    <div class="edit-edit"><span>Edit</span></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right-side-card d-flex">
                                        <div class="edit-btn mb-4">
                                            <a href="./editmodulecontent"><button type="button"
                                                    class="btn"><span>Edit Content
                                                        🖊</span></button></a>
                                        </div>
                                        <div class="delete-btn">
                                            {/* <!-- <button class="delete-btn-press"> --> */}
                                            <a href="#!">
                                                <img class="delete-icon"
                                                    src="/trainer-images/edit-module/Vector.png"
                                                    alt="delete button"/>
                                            </a>
                                            {/* <!-- </button> --> */}
                                        </div>
                                    </div>
                                </div>
                                <div class="module-card module-card-5 d-flex">
                                    <div class="left-side-card d-flex">
                                        <div class="drag-icon drag-container">
                                            <img class="drag-icon"
                                                src="/trainer-images/edit-module/Vector (Stroke).png"
                                                alt="drag here"/>
                                        </div>
                                        <div class="input-container-edit d-flex gap-2">
                                            <div class="module-card-name">
                                                <span>Module 5 -</span>
                                            </div>
                                            <div class="module-input d-flex">
                                                <div class="search-wrap">
                                                    <input type="text" placeholder="Lorem ipsum dolor sit amet"/>
                                                </div>
                                                <a href="#!">
                                                    <div class="edit-edit"><span>Edit</span></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right-side-card d-flex">
                                        <div class="edit-btn mb-4">
                                            <a href="./editmodulecontent"><button type="button"
                                                    class="btn"><span>Edit Content
                                                        🖊</span></button></a>
                                        </div>
                                        <div class="delete-btn">
                                            {/* <!-- <button class="delete-btn-press"> --> */}
                                            <a href="#!">
                                                <img class="delete-icon"
                                                    src="/trainer-images/edit-module/Vector.png"
                                                    alt="delete button"/>
                                            </a>
                                            {/* <!-- </button> --> */}
                                        </div>
                                    </div>
                                </div>
                                <div class="module-card module-card-6 d-flex">
                                    <div class="left-side-card d-flex">
                                        <div class="drag-icon drag-container">
                                            <img class="drag-icon"
                                                src="/trainer-images/edit-module/Vector (Stroke).png"
                                                alt="drag here"/>
                                        </div>
                                        <div class="input-container-edit d-flex gap-2">
                                            <div class="module-card-name">
                                                <span>Module 6 -</span>
                                            </div>
                                            <div class="module-input d-flex">
                                                <div class="search-wrap">
                                                    <input type="text" placeholder="Lorem ipsum dolor sit amet"/>
                                                </div>
                                                <a href="#!">
                                                    <div class="edit-edit"><span>Edit</span></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right-side-card d-flex">
                                        <div class="edit-btn mb-4 ">
                                            <a href="./editmodulecontent"><button type="button"
                                                    class="btn"><span>Edit Content
                                                        🖊</span></button></a>
                                        </div>
                                        <div class="delete-btn">
                                            {/* <!-- <button class="delete-btn-press"> --> */}
                                            <a href="#!">
                                                <img class="delete-icon"
                                                    src="/trainer-images/edit-module/Vector.png"
                                                    alt="delete button"/>
                                            </a>
                                            {/* <!-- </button> --> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="btn-container d-flex justify-content-between gap-3">
                                <div>
                                    <a href="./editmodulecontent"><button type="button" class="add-module-btn">Add Module +</button></a>
                                </div>
                                <div class="back-save-btn d-flex gap-4">
                                    <a href="Edit-course.html"><button type="button" class="back-btn">Back</button></a>
                                    <a href="#!"><button type="submit" class="save-btn">Save</button></a>
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
export default editmodule;