import auth from "../../model/auth.model";
import Sidebar from "./component/sidebar";
import Topnavbar from "./component/topnavbar";
import Image from "next/image";
const adminquiz = () => {
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
                        <div class="trainee-body">
                            <div class="trainee-list d-flex flex-column">
                                <div class="box-1"></div>
                                <div class="box-2"></div>
                                <div class="trainee-tag-admincoursemanagement">
                                    <p>My Grades</p>
                                </div>
                                <div class="table-data">
                                        <div class="wrapper-class-header" style={{color: "rgba(0, 0, 0, 0.555)"}}>
                                            <span class="pl-3">#</span>
                                            <span>Course Name</span>
                                            <span>Topic</span>
                                            <span>No. of Modules</span>
                                            <span>Training Time</span>
                                            <span>Trainees Enrolled</span>
                                            <span>Published By</span>
                                            <span>Approval Status</span>
                                            <span>Edit/Remove</span>

                                        </div>
                                        <div class="wrapper">

                                            <div class="wrapper-class">

                                                <span class="d-flex align-items-center gap-2">
                                                    <img class="drag-icon" src="/admin-images/drag.png" alt="drag-icon"/>
                                                    <span>1</span>
                                                </span>
                                                <span>Gastroentrology</span>
                                                <span>Product</span>
                                                <span>6</span>
                                                <span>4</span>
                                                <span>604</span>
                                                <span>Thomas</span>
                                                <span class="text-success">Approved</span>
                                                <span>
                                                    <div class="editRemove-btns d-flex gap-4">
                                                        <a href="/admin/edit-course.html">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                                class="w-6 h-6 edit-btn text-primary">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                            </svg>
                                                        </a>

                                                        <div data-toggle="modal" data-target="#myModal">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                                class="w-6 h-6 delete-btn text-danger">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </div>

                                                    </div>
                                                </span>

                                            </div>

                                            <div class="wrapper-class">

                                                <span class="d-flex align-items-center gap-2">
                                                    <img class="drag-icon" src="/admin-images/drag.png" alt="drag-icon"/>
                                                    <span>2</span>
                                                </span>
                                                <span>Pulmonlogy</span>
                                                <span>Blanket</span>
                                                <span>6</span>
                                                <span>4</span>
                                                <span>-</span>
                                                <span>Thomas</span>
                                                <span><a href="/admin/admin-new-trainee-course-page.html"><button type="button"
                                                            class="approve-btn">Approve</button></a></span>
                                                <span>
                                                    <div class="editRemove-btns d-flex gap-4">
                                                        <a href="/admin/edit-course.html">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                                class="w-6 h-6 edit-btn text-primary">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                            </svg>
                                                        </a>

                                                        <div data-toggle="modal" data-target="#myModal">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                                class="w-6 h-6 delete-btn text-danger">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </div>

                                                    </div>
                                                </span>

                                            </div>

                                            <div class="wrapper-class">

                                                <span class="d-flex align-items-center gap-2">
                                                    <img class="drag-icon" src="/admin-images/drag.png" alt="drag-icon"/>
                                                    <span>3</span>
                                                </span>
                                                <span>Nephrology</span>
                                                <span>Country</span>
                                                <span>6</span>
                                                <span>4</span>
                                                <span>-</span>
                                                <span>Thomas</span>
                                                <span class="text-danger">Rejected</span>
                                                <span>
                                                    <div class="editRemove-btns d-flex gap-4">
                                                        <a href="/admin/edit-course.html">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                                class="w-6 h-6 edit-btn text-primary">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                            </svg>
                                                        </a>

                                                        <div data-toggle="modal" data-target="#myModal">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                                class="w-6 h-6 delete-btn text-danger">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </div>

                                                    </div>
                                                </span>

                                            </div>

                                            <div class="wrapper-class">

                                                <span class="d-flex align-items-center gap-2">
                                                    <img class="drag-icon" src="/admin-images/drag.png" alt="drag-icon"/>
                                                    <span>4</span>
                                                </span>
                                                <span>Gastroentrology</span>
                                                <span>Product</span>
                                                <span>6</span>
                                                <span>4</span>
                                                <span>604</span>
                                                <span>Thomas</span>
                                                <span class="text-success">Approved</span>
                                                <span>
                                                    <div class="editRemove-btns d-flex gap-4">
                                                        <a href="/admin/edit-course.html">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                                class="w-6 h-6 edit-btn text-primary">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                            </svg>
                                                        </a>

                                                        <div data-toggle="modal" data-target="#myModal">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                                class="w-6 h-6 delete-btn text-danger">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </div>

                                                    </div>
                                                </span>

                                            </div>
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
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
export default adminquiz;