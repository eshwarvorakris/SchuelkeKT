import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./components/sidebar";
import Topnavbar from "./components/topnavbar";
import Router from "next/router";

const mycourse = () => {
  return (
    <>
        <div>
            <div class=" section1-mycoures ">
                <div class=" blank-class "></div>
                <Sidebar/>
                <div class=" container-2 ">
                <div class=" col-md-12 trainee-right ">
                <div class=" blank-nav-class "></div>
                <Topnavbar/>
                <div class=" SearchandSort ">
                <div class=" search-button-mycourse d-flex ">
                  <ion-icon name=" search-outline " class=" search-icon "></ion-icon>
                  <div class=" search-trainer "><input class=" search-mycourse" type=" text " placeholder=" Search " /></div>
                </div>

                <div class=" category d-flex gap-3 align-items-center ">
                  <select name=" category " id=" cars " className="select-mycourse">
                    <option value=" Product ">Filter</option>
                    <option value=" Country ">Trainee ID</option>
                    <option value=" Country ">Trainee Name</option>
                    <option value=" Blanket ">No. of Courses Enrolled</option>
                  </select>
                </div>

                <div class=" create-course ">
                  <a href="./editcourse">
                    <button class=" btn btn-primary create-course-btn " style={{ backgroundColor: '#008bd6' }}>Create
                      Course <strong>+</strong></button>
                  </a>
                </div>
              </div>

              <div class="trainee-body">
                    <div class="trainee-course d-flex flex-column">
                        <div class="box-1-mycourse"></div>
                        <div class="box-2-mycourse"></div>

                        <div class="trainee-tag-mycourse">
                            <p>Course List</p>
                        </div>

                        <div class="table-data-mycourse">
                            <table className="table-mycourse">
                              <tbody>
                                <tr class="first-row" >
                                    <td style={{width: "5%"}}>#</td>
                                    <td style={{width: "10%"}}>Course Name</td>
                                    <td style={{width: "10%"}}>Topic</td>
                                    <td style={{width: "10%"}}>No. of Modules</td>
                                    <td style={{width: "10%"}}>No. of Weeks</td>
                                    <td style={{width: "10%"}}>Trainees Enrolled</td>
                                    <td style={{width: "10%"}}>Status</td>
                                    <td style={{width: "10%"}}>Edit/Remove</td>
                                </tr>
                                <tr>
                                    <td >1</td>
                                    <td>Gastroentrology</td>
                                    <td>Product</td>
                                    <td>6</td>
                                    <td>4</td>
                                    <td>604</td>
                                    <td class="text-success">Approved</td>
                                    <td>
                                        <div class="editRemove-btns d-flex gap-4">
                                            <a href="edit-course.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="2" stroke="currentColor"
                                                    class="w-6 h-6 edit-btn text-primary">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            </a>

                                            <div data-toggle="modal" data-target="#myModal">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="2" stroke="currentColor"
                                                    class="w-6 h-6 delete-btn text-danger">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td >2</td>
                                    <td>Pulmonlogy</td>
                                    <td>Blanket</td>
                                    <td>6</td>
                                    <td>4</td>
                                    <td>604</td>
                                    <td>Pending</td>
                                    <td>
                                        <div class="editRemove-btns d-flex gap-4">
                                            <a href="edit-course.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="2" stroke="currentColor"
                                                    class="w-6 h-6 edit-btn text-primary">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            </a>

                                            <div data-toggle="modal" data-target="#myModal">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="2" stroke="currentColor"
                                                    class="w-6 h-6 delete-btn text-danger">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td >3</td>
                                    <td>Nephrology</td>
                                    <td>Country</td>
                                    <td>6</td>
                                    <td>4</td>
                                    <td>604</td>
                                    <td class="text-success">Approved</td>
                                    <td>
                                        <div class="editRemove-btns d-flex gap-4">
                                            <a href="edit-course.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="2" stroke="currentColor"
                                                    class="w-6 h-6 edit-btn text-primary">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            </a>

                                            <div data-toggle="modal" data-target="#myModal">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="2" stroke="currentColor"
                                                    class="w-6 h-6 delete-btn text-danger">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td >4</td>
                                    <td>Gastroentrology</td>
                                    <td>Product</td>
                                    <td>6</td>
                                    <td>4</td>
                                    <td>604</td>
                                    <td class="text-success">Approved</td>
                                    <td>
                                        <div class="editRemove-btns d-flex gap-4">
                                            <a href="edit-course.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="2" stroke="currentColor"
                                                    class="w-6 h-6 edit-btn text-primary">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            </a>

                                            <div data-toggle="modal" data-target="#myModal">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="2" stroke="currentColor"
                                                    class="w-6 h-6 delete-btn text-danger">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                              </tbody>
                            </table>
                        </div>

                        
            </div>
          </div>
          <div class="trainer-pagination ">
                            <nav class="pagination-container d-flex justify-content-end">
                                <div class="pagination">
                                    <a class="pagination-newer" href="#">
                                        <ion-icon name="chevron-back-outline"></ion-icon>
                                    </a>
                                    <span class="pagination-inner">
                                        <a href="#">1</a>
                                        <a class="pagination-active" href="#">2</a>
                                        <a href="#">3</a>
                                        <a href="#">4</a>
                                        <a href="#">5</a>
                                        <a href="#">6</a>
                                    </span>
                                    <a class="pagination-older" href="#">
                                        <ion-icon name="chevron-forward-outline"></ion-icon>
                                    </a>
                                </div>
                            </nav>
                        </div>
        </div>
        </div>
      </div>
      </div>


    </>
  )
}
export default mycourse;