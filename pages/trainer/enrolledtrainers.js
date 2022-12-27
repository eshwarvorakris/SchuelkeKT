import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./components/sidebar";
import Topnavbar from "./components/topnavbar";
import Router from "next/router";

const enrolledtrainer = () => {
  return (
    <>
      <div>
        <div class=" section1-enrolledtrainer ">


          <div class=" blank-class "></div>

          <Sidebar />

          <div class=" container-2 ">
            <div class=" col-md-12 trainee-right ">
              <div class=" blank-nav-class "></div>

              <Topnavbar/>

              <div class="SearchandSort">
                <div class="search-button d-flex">
                  <ion-icon name="search-outline" class="search-icon"></ion-icon>
                  <div class="search-trainer"><input class="search" type="text" placeholder="Search" /></div>
                </div>

                <div class="category d-flex gap-3 align-items-center">
                  <select name="category" id="cars" className="select-enrolledtrainers">
                    <option value="Country">Sort By</option>
                    <option value="Country">Trainee ID</option>
                    <option value="Blanket">Trainee Name</option>
                    <option value="Product">No. of Courses Enrolled</option>
                  </select>
                </div>
              </div>

              <div class="trainee-body">
                <div class="trainee-enrolledtrainers d-flex flex-column">
                  <div class="box-1-enrolledtrainers"></div>
                  <div class="box-2-enrolledtrainers"></div>

                  <div class="trainee-tag-enrolledtrainers">
                    <p>Trainer List</p>
                  </div>

                  <div class="table-data-trainermange">
                    <table className="table-enrolledtrainer">
                      <tbody>
                      <tr>
                        <td style={{width: '5%'}}>S.No</td>
                        <td style={{width: '10%'}}>Trainee ID</td>
                        <td style={{width: '15%'}}>Trainee Name</td>
                        <td style={{width: '17%'}}>Email</td>
                        <td style={{width: '20%'}}>No. of Courses Enrolled</td>
                        <td style={{width: '10%'}}>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td class="d-flex gap-2 profile-icon">
                          {/* <ion-icon class="person-icon" name="person-circle-outline"></ion-icon> */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(136, 135, 135)" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                          </svg>
                          <span>348334</span>
                        </td>
                        <td>Thomas</td>
                        <td>Thomas@gmail.com</td>
                        <td>6</td>
                        <td><a href="./trainee-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td class="d-flex gap-2 profile-icon">
                            {/* <ion-icon class="person-icon" name="person-circle-outline"></ion-icon> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(136, 135, 135)" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                          </svg>                          
                          <span>348335</span>
                        </td>
                        <td>Pearleen</td>
                        <td>sameple@gmail.com</td>
                        <td>3</td>
                        <td><a href="./trainee-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td class="d-flex gap-2 profile-icon">
                            {/* <ion-icon class="person-icon" name="person-circle-outline"></ion-icon> */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(136, 135, 135)" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                          </svg>                           <span>348336</span>
                        </td>
                        <td>Thomas</td>
                        <td>sameple@gmail.com</td>
                        <td>5</td>
                        <td><a href="./trainee-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td class="d-flex gap-2 profile-icon">
                            {/* <ion-icon class="person-icon" name="person-circle-outline"></ion-icon> */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(136, 135, 135)" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                          </svg>                           <span>348337</span>
                        </td>
                        <td>Pearleen</td>
                        <td>sameple@gmail.com</td>
                        <td>6</td>
                        <td><a href="./trainee-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td class="d-flex gap-2 profile-icon">
                              {/* <ion-icon class="person-icon" name="person-circle-outline"></ion-icon> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(136, 135, 135)" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                          </svg>                           <span>348338</span>
                        </td>
                        <td>Thomas</td>
                        <td>sameple@gmail.com</td>
                        <td>3</td>
                        <td><a href="./trainee-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
                        </td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td class="d-flex gap-2 profile-icon">
                            {/* <ion-icon class="person-icon" name="person-circle-outline"></ion-icon> */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(136, 135, 135)" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                          </svg>                           <span>348339</span>
                        </td>
                        <td>Pearleen</td>
                        <td>sameple@gmail.com</td>
                        <td>2</td>
                        <td><a href="./trainee-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
                        </td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td class="d-flex gap-2 profile-icon">
                          {/* <ion-icon class="person-icon" name="person-circle-outline"></ion-icon> */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(136, 135, 135)" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                          </svg> 
                          <span>348340</span>
                        </td>
                        <td>Pearleen</td>
                        <td>sameple@gmail.com</td>
                        <td>2</td>
                        <td><a href="./trainee-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
                      <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                    </svg>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                      </svg>
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
export default enrolledtrainer;