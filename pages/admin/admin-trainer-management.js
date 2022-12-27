import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./component/sidebar";
import Topnavbar from "./component/topnavbar";
import Router from "next/router";

const admintrainermanagement = () => {
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
                <div class="trainee-list d-flex flex-column">
                  <div class="box-1-enrolledtrainers"></div>
                  <div class="box-2-enrolledtrainers"></div>

                  <div class="trainee-tag-enrolledtrainers">
                    <p>Trainer List</p>
                  </div>

                  <div class="table-data-trainermange">
                    <table className="table-trainermangee">
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
                          <ion-icon class="person-icon" name="person-circle-outline"></ion-icon>
                          <span>348334</span>
                        </td>
                        <td>Thomas</td>
                        <td>Thomas@gmail.com</td>
                        <td>6</td>
                        <td><a href="./admin-trainer-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td class="d-flex gap-2 profile-icon">
                          <ion-icon class="person-icon" name="person-circle-outline"></ion-icon>
                          <span>348335</span>
                        </td>
                        <td>Pearleen</td>
                        <td>sameple@gmail.com</td>
                        <td>3</td>
                        <td><a href="./admin-trainer-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td class="d-flex gap-2 profile-icon">
                          <ion-icon class="person-icon" name="person-circle-outline"></ion-icon>
                          <span>348336</span>
                        </td>
                        <td>Thomas</td>
                        <td>sameple@gmail.com</td>
                        <td>5</td>
                        <td><a href="./admin-trainer-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td class="d-flex gap-2 profile-icon">
                          <ion-icon class="person-icon" name="person-circle-outline"></ion-icon>
                          <span>348337</span>
                        </td>
                        <td>Pearleen</td>
                        <td>sameple@gmail.com</td>
                        <td>6</td>
                        <td><a href="./admin-trainer-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td class="d-flex gap-2 profile-icon">
                          <ion-icon class="person-icon" name="person-circle-outline"></ion-icon>
                          <span>348338</span>
                        </td>
                        <td>Thomas</td>
                        <td>sameple@gmail.com</td>
                        <td>3</td>
                        <td><a href="./admin-trainer-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
                        </td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td class="d-flex gap-2 profile-icon">
                          <ion-icon class="person-icon" name="person-circle-outline"></ion-icon>
                          <span>348339</span>
                        </td>
                        <td>Pearleen</td>
                        <td>sameple@gmail.com</td>
                        <td>2</td>
                        <td><a href="./admin-trainer-status">
                          <button class="btn text-light" style={{backgroundColor: '#1a86d0'}}>Check
                            Status</button>
                        </a>
                        </td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td class="d-flex gap-2 profile-icon">
                          <ion-icon class="person-icon" name="person-circle-outline"></ion-icon>
                          <span>348340</span>
                        </td>
                        <td>Pearleen</td>
                        <td>sameple@gmail.com</td>
                        <td>2</td>
                        <td><a href="./admin-trainer-status">
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


    </>
  )
}
export default admintrainermanagement;