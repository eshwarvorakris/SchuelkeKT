import auth from "../../model/auth.model";
import Sidebar from "./components/sidebar";
import Topnavbar from "./components/topnavbar";
import Image from "next/image";
const adminprofileedit = () => {
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
                            <div class="trainee-right-edit">
                                <div class="edit-container">
                                    <div class="trainee-profile-pic">
                                        <div class="box-1"></div>
                                        <div class="box-2"></div>
                                        <div class=" text-tag">
                                            <h6>Edit Info</h6>
                                        </div>
                                        <img class="profile-picture" src="/trainee-images/trainer.jpg" alt="" />

                                        <div class="btn-container d-flex flex-column gap-3">
                                            <div>
                                                <button type="button" class="btn upload-btn">
                                                    <img class="btn-icon" src="/images/trainee-images/edit profile/icon-1.png"
                                                        alt=""/>
                                                    <span class="text-primary">Upload</span>
                                                </button>
                                                <input class="file-input" type="file" hidden/>
                                            </div>

                                            <div>
                                                <button type="button" class="btn remove-btn">
                                                    <img class="btn-icon" src="/images/trainee-images/edit profile/icon-2.png"
                                                        alt=""/>
                                                    <span style={{color: "rgba(0, 0, 0, 0.534)"}}>Remove</span>
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="trainee-info">
                                        <div class="trainer-form">
                                            <div class="trainer-Name">
                                                <h6>Full Name</h6>
                                                <input type="text" placeholder="Thomas"/>
                                            </div>

                                            <div class="trainer-Email">
                                                <h6>Email</h6>
                                                <input type="text" placeholder="Thomas@gmail.com"/>
                                            </div>

                                            <div class="trainer-DOB">
                                                <h6>Date of Birth</h6>
                                                <input type="date"/>
                                            </div>

                                            <div class="trainer-address">
                                                <h6>Address</h6>
                                                <textarea class="address-box"
                                                    placeholder="1234, Lorem ipsum dolor sit amet, consectetur" cols="30"
                                                    rows="3"></textarea>
                                            </div>

                                            <div class="trainer-contact-no">
                                                <h6>Contact Number</h6>
                                                <input type="number" placeholder="+01 345 3345"/>
                                            </div>

                                            <div class="trainer-background">
                                                <h6>Education Background</h6>
                                                <input type="number" placeholder="PhD. Zoology from XYZ Instiute, City, Country"/>
                                            </div>

                                            <div class="trainer-designation">
                                                <h6>Designation</h6>
                                                <input type="text" placeholder="Product Devolopment Head"/>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="edit-profile-btn">
                                        <div class="notify-popup hide-popup custom-scroll">
                                            <div class="arrow-up-popup"></div>
                                            <div class="notifications-header d-flex p-3">
                                                <div class="main-heading">Notifications</div>
                                                <div class="mark-as-read">
                                                    <a href="#">Mark as read</a>
                                                </div>
                                            </div>
                                            <div class="notifications-body">
                                                <div class="notify d-flex p-3">
                                                    <div class="profile-face">
                                                        <ion-icon class="notify-icon" name="person-circle-outline"></ion-icon>
                                                    </div>
                                                    <div class="message d-flex">
                                                        <p class="message-content">Thomas added a new course on</p>
                                                        <p class="profession">Cardiology</p>
                                                        <span class="message-time">3 mins ago</span>
                                                    </div>
                                                </div>

                                                <div class="notify d-flex p-3">
                                                    <div class="profile-face">
                                                        <ion-icon class="notify-icon" name="person-circle-outline"></ion-icon>
                                                    </div>
                                                    <div class="message d-flex">
                                                        <p class="message-content">Thomas added a new course on</p>
                                                        <p class="profession">Cardiology</p>
                                                        <span class="message-time">3 mins ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="notifications-footer p-3 d-flex">
                                                <a href="#">View all</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="button-footer d-flex justify-content-end gap-3">
                                    <div class="cancel-btn-proflie">
                                        <a href="#!"><button type="reset" class="btn btn-light">Cancel</button></a>
                                    </div>

                                    <div class="save-btn-proflie">
                                        <a href="#!"><button type="submit" class="btn btn-primary">Save</button></a>
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
export default adminprofileedit;