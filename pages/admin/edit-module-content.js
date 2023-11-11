import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./component/sidebar";
import Topnavbar from "./component/topnavbar";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";

const editmodulecontent = () => {
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
                <div class="trainer-body">
                    <div class="trainer-list d-flex flex-column">
                        <form>
                            <div class="box-1"></div>
                            <div class="box-2"></div>

                            <div class="trainer-tag">
                                <p>Edit Module Content</p>
                            </div>

                          

                            <div class="header">
                                {/* <!-- <div class="blank"></div> --> */}
                                <div class="trainer-header">
                                    <div class="trainer-header-left d-flex">
                                        <Link href="#">
                                            <ion-icon name="arrow-back-outline" class="header-icon"></ion-icon>
                                        </Link>

                                        <div class="icon-content-1">
                                            <Link href="#">
                                                <p>PREVIOUS</p>
                                            </Link>
                                            <span>Module 1 - introduction</span>
                                        </div>
                                    </div>
                                    <div class="trainer-header-right d-flex">
                                        <div class="icon-content-2">
                                            <Link href="#">
                                                <p>NEXT</p>
                                            </Link>
                                            <span>Module 2</span>
                                        </div>
                                        <Link href="#">
                                            <ion-icon name="arrow-forward-outline" class="header-icon"></ion-icon>
                                        </Link>
                                    </div>
                                </div>
                            </div>


                            <div class="wrapper d-flex flex-column gap-5">


                                <div class="module-title">
                                    <div class="draggable-area">
                                        <img src="/trainer-images/edit-module/Vector (Stroke).png"
                                            class="drag-icon" alt=""/>
                                    </div>

                                    <div class="module-title">
                                        <span class="content-title">Title -</span>
                                    </div>

                                    <div class="input-container">
                                        <input class="input-box" type="text" placeholder="What is Cardiology"/>
                                        <div class="edit-box edit-text-remove">
                                            <div class="edit-text">
                                                <button type="button"  class="edit-button bold-btn">
                                                    <i class="fa-solid fa-bold edit-icon"></i>
                                                </button>
                                                <button type="button"  class="edit-button italic-btn">
                                                    <i class="fa-solid fa-italic edit-icon"></i>
                                                </button>
                                                <button type="button"  class="edit-button underline-btn">
                                                    <i class="fa-solid fa-underline edit-icon"></i>
                                                </button>
                                                <button type="button"  class="edit-button left-btn">
                                                    <i class="fa-solid fa-align-left edit-icon"></i>
                                                </button>
                                                <button type="button"  class="edit-button jcenter-btn">
                                                    <i class="fa-solid fa-align-justify edit-icon"></i>
                                                </button>
                                                <button type="button"  class="edit-button right-btn">
                                                    <i class="fa-solid fa-align-right edit-icon"></i>
                                                </button>
                                                <button type="button"  class="edit-button center-btn">
                                                    <i class="fa-solid fa-align-center edit-icon"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="module-paragraph-1">

                                    <div class="draggable-area">
                                        <img src="/trainer-images/edit-module/Vector (Stroke).png"
                                            class="drag-icon" alt=""/>
                                        <button type="button"  class="delete-icon"><img class="delete"
                                                src="/trainer-images/edit-module/Vector delete black.png"
                                                alt=""/></button>
                                    </div>

                                    <span class="content-title">Paragraph 1 -</span>

                                    <div class="input-container">
                                        <textarea name="paragraph 1" class="content-paragraph" cols="100" rows="5"
                                            placeholder="Lorem ipstum dolor sit amet, consectetur aaipiscing eint. Integer mattis purus eu semper l0Dortis lacus, tristique et er. Eu ductor rusceodio enim morbi turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis purus eu semper lobortis lacus, tristique eteros. Eu auctor fusce ultrices viverra arcu purus viverra vitae, aliquet. Sollicitudin ipsum mi condimentum orci tincidunt pretiumel. Magna ultrices odio enim morbi turpis.es"></textarea>
                                    </div>
                                </div>

                                <div class="module-paragraph-2">

                                    <div class="draggable-area">
                                        <img src="/trainer-images/edit-module/Vector (Stroke).png"
                                            class="drag-icon" alt=""/>
                                        <button type="button"  class="delete-icon"><img class="delete"
                                                src="/trainer-images/edit-module/Vector delete black.png"
                                                alt=""/></button>
                                    </div>

                                    <span class="content-title">Paragraph 2 -</span>

                                    <div class="input-container">
                                        <textarea name="paragraph 1" class="content-paragraph" cols="100" rows="5"
                                            placeholder="Lorem ipstum dolor sit amet, consectetur aaipiscing eint. Integer mattis purus eu semper l0Dortis lacus, tristique et er. Eu ductor rusceodio enim morbi turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis purus eu semper lobortis lacus, tristique eteros. Eu auctor fusce ultrices viverra arcu purus viverra vitae, aliquet. Sollicitudin ipsum mi condimentum orci tincidunt pretiumel. Magna ultrices odio enim morbi turpis.es"></textarea>
                                    </div>
                                </div>

                                <div class="module-upload">

                                    <div class="draggable-area">
                                        <img src="/trainer-images/edit-module/Vector (Stroke).png"
                                            class="drag-icon" alt=""/>
                                        <button type="button"  class="delete-icon"><img class="delete"
                                                src="/trainer-images/edit-module/Vector delete black.png"
                                                alt=""/></button>
                                    </div>

                                    <span class="content-title">Upload PPT/PDF</span>

                                    <div class="upload-container">
                                        <p class="drag-text">Drag and Drop here</p>
                                        {/* <!-- <input type="file"> --> */}
                                    </div>

                                    <div class="btns d-flex flex-column gap-2">

                                        <div class="right-col-btns d-flex flex-column gap-4">

                                            <button type="button" 
                                                class="upload-btn btn d-flex justify-content-center gap-2">
                                                <img class="btn-icon"
                                                    src="/trainer-images/dashboard images/Vector (1).png" alt=""/>
                                                <span>Upload</span>
                                            </button>
                                            <input class="file-input" type="file" hidden/>

                                        </div>

                                        <div class="right-col-btns black-border d-flex flex-column gap-4">
                                            <Link href="#!">
                                                <button type="button" 
                                                    class="btn d-flex justify-content-center gap-2">
                                                    <img class="btn-icon"
                                                        src="/trainer-images/dashboard images/Vector (2).png"
                                                        alt=""/>
                                                    <span style={{color: "rgba(0, 0, 0, 0.568)"}}>Remove</span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div class="module-paragraph-3">

                                    <div class="draggable-area">
                                        <img src="/trainer-images/edit-module/Vector (Stroke).png"
                                            class="drag-icon" alt=""/>
                                        <button type="button"  class="delete-icon"><img class="delete"
                                                src="/trainer-images/edit-module/Vector delete black.png"
                                                alt=""/></button>
                                    </div>

                                    <span class="content-title" style={{color: "#5A656B"}}>Paragraph 3 -</span>

                                    <div class="input-container">
                                        <textarea name="paragraph 1" class="content-paragraph" cols="100" rows="5"
                                            placeholder="Lorem ipstum dolor sit amet, consectetur aaipiscing eint. Integer mattis purus eu semper l0Dortis lacus, tristique et er. Eu ductor rusceodio enim morbi turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis purus eu semper lobortis lacus, tristique eteros. Eu auctor fusce ultrices viverra arcu purus viverra vitae, aliquet. Sollicitudin ipsum mi condimentum orci tincidunt pretiumel. Magna ultrices odio enim morbi turpis.es"></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- add module --> */}

                            <div class="add-module d-flex gap-3">
                                <div class="add-btn">
                                    <button type="button"  class="btn btn-light">
                                        <img src="/trainer-images/edit-module/+.png" alt=""/>
                                    </button>
                                </div>
                                <hr class="line"/>
                            </div>

                            {/* <!-- exercise module --> */}

                            <div class="exercise-module">
                                <div class="module-heading">
                                    <p>Module Exercise</p>
                                </div>

                                <div class="wrapper-exercise d-flex flex-column gap-3">

                                    <div class="exercise-question-1">
                                        <div class="draggable-area">
                                            <img src="/trainer-images/edit-module/Vector (Stroke).png"
                                                class="drag-icon" alt=""/>
                                            <button type="button"  class="delete-icon"><img class="delete"
                                                    src="/trainer-images/edit-module/Vector delete black.png"
                                                    alt=""/></button>
                                        </div>

                                        <span class="content-title">Question 1 -</span>

                                        <div class="input-container d-flex flex-column gap-4">
                                            <textarea name="paragraph 1" class="content-paragraph" cols="45" rows="0"
                                                placeholder="Lorem ipstum dolor sit amet, consectetur aaipiscing eint. Integer mattis purus eu semper l0Dortis lacus, tristique et er. Eu ductor rusceodio enim morbi turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis purus eu semper lobortis lacus, tristique eteros. Eu auctor fusce ultrices viverra arcu purus viverra vitae, aliquet. Sollicitudin ipsum mi condimentum orci tincidunt pretiumel. Magna ultrices odio enim morbi turpis.es"></textarea>

                                            <div class="checkbox-options d-flex flex-column gap-3">
                                                <div class="option-1 d-flex justify-content-between">
                                                    <label for="vehicle1">Option 1 -</label>

                                                    <div class="input-container">
                                                        <input class="input-box" type="text"
                                                            placeholder="Add the content here"/>
                                                    </div>

                                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                                </div>
                                                <div class="option-2 d-flex justify-content-between">
                                                    <label for="vehicle2">Option 2 -</label>

                                                    <div class="input-container">
                                                        <input class="input-box" type="text"
                                                            placeholder="Add the content here"/>
                                                    </div>

                                                    <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"/>
                                                </div>
                                                <div class="option-3 d-flex justify-content-between">
                                                    <label for="vehicle3">Option 3 -</label>

                                                    <div class="input-container">
                                                        <input class="input-box" type="text"
                                                            placeholder="Add the content here"/>
                                                    </div>

                                                    <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"/>
                                                </div>
                                                <div class="option-4 d-flex justify-content-between">
                                                    <label for="vehicle4">Option 4 -</label>

                                                    <div class="input-container">
                                                        <input class="input-box" type="text"
                                                            placeholder="Add the content here"/>
                                                    </div>

                                                    <input type="checkbox" id="vehicle4" name="vehicle4" value="Boat"/>
                                                </div>
                                            </div>
                                        </div>

                                        <span class="drop-box-question">Type of Question -</span>

                                        <div class="category">
                                            <select name="category" id="cars">
                                                <option value="Product">Multiple Options Correct</option>
                                                <option value="Blanket">Single Option Correct</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="exercise-question-2">
                                        <div class="draggable-area">
                                            <img src="/trainer-images/edit-module/Vector (Stroke).png"
                                                class="drag-icon" alt=""/>
                                            <button type="button"  class="delete-icon"><img class="delete"
                                                    src="/trainer-images/edit-module/Vector delete black.png"
                                                    alt=""/></button>
                                        </div>

                                        <span class="content-title">Question 2 -</span>

                                        <div class="input-container d-flex flex-column gap-4">
                                            <textarea name="paragraph 1" class="content-paragraph" cols="45" rows="0"
                                                placeholder="Lorem ipstum dolor sit amet, consectetur aaipiscing eint. Integer mattis purus eu semper l0Dortis lacus, tristique et er. Eu ductor rusceodio enim morbi turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis purus eu semper lobortis lacus, tristique eteros. Eu auctor fusce ultrices viverra arcu purus viverra vitae, aliquet. Sollicitudin ipsum mi condimentum orci tincidunt pretiumel. Magna ultrices odio enim morbi turpis.es"></textarea>

                                            <div class="checkbox-options d-flex flex-column gap-3">
                                                <div class="option-1 d-flex justify-content-between">
                                                    <label for="huey">Option 1 -</label>

                                                    <div class="input-container">
                                                        <input class="input-box" type="text"
                                                            placeholder="Add the content here"/>
                                                    </div>

                                                    <input type="radio" id="huey" name="drone" value="huey" checked/>
                                                </div>


                                                <div class="option-2 d-flex justify-content-between">
                                                    <label for="dewey">Option 2 -</label>

                                                    <div class="input-container">
                                                        <input class="input-box" type="text"
                                                            placeholder="Add the content here"/>
                                                    </div>

                                                    <input type="radio" id="dewey" name="drone" value="dewey"/>
                                                </div>


                                                <div class="option-3 d-flex justify-content-between">
                                                    <label for="louie">Option 3 -</label>

                                                    <div class="input-container">
                                                        <input class="input-box" type="text"
                                                            placeholder="Add the content here"/>
                                                    </div>

                                                    <input type="radio" id="louie" name="drone" value="louie"/>
                                                </div>


                                                <div class="option-4 d-flex justify-content-between">
                                                    <label for="louie">Option 4 -</label>

                                                    <div class="input-container">
                                                        <input class="input-box" type="text"
                                                            placeholder="Add the content here"/>
                                                    </div>

                                                    <input type="radio" id="louie" name="drone" value="louie"/>
                                                </div>
                                            </div>
                                        </div>

                                        <span class="drop-box-question">Type of Question -</span>

                                        <div class="category">
                                            <select name="category" id="cars">
                                                <option value="Product">Multiple Options Correct</option>
                                                <option value="Blanket">Single Option Correct</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
{/* 
                            <!-- add module --> */}

                            <div class="add-module d-flex gap-3">
                                <div class="add-btn">
                                    <button type="button"  class="btn btn-light">
                                        <img src="/trainer-images/edit-module/+.png" alt=""/>
                                    </button>
                                </div>
                                <hr class="line"/>
                            </div>

                            {/* <!-- footer buttons --> */}

                            <div class="footer-btn-container d-flex justify-content-end gap-4">
                                <div class="back-btn">
                                    <Link href="prepare-modules.html">
                                        <button type="button"  class="btn btn-light" 
                                            style={{backgroundColor: "#efefef"}}>Back</button>
                                    </Link>
                                </div>

                                <div class="Save-btn">
                                    <Link href="final-assessment.html">
                                        <button type="button" class="btn btn-primary" 
                                            style={{backgroundColor: "#008bd6"}}>Save</button>
                                    </Link>
                                </div>
                            </div>
                        </form>
            </div>
          </div>
        </div>
      </div>
    </div>

</div>
    </>
  )
}
export default editmodulecontent;