import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Router from "next/router";
import thumbnaila from "../../public/trainer-images/dashboard images/thumbnails/thumbnaila.png"
const editcourse = () => {
  const [proName, setProName] = useState("");
    const { data, error, isLoading } = useSWR('/', async () => await auth.profile());
    if (error) {
        console.log(error);
        Router.replace("login");
    }
  return (
    <>
      <div>
        <div class="trainee_section1">
          <div class="blank-class"></div>
          <Sidebar />
          <div class="container-2">
            <div class="col-12 trainee-right">

            <Navbar />

            </div>
            <section class=" editcourse" style={{ marginTop: '170px', position: 'relative', marginLeft: '20px', paddingRight: '50px', padding: '50px', border: ' 1px solid rgba(0, 0, 0, 0.192)', backgroundColor: 'white' }}>
              <div class="box-1" style={{ textAlign: 'center' }}>
                <p className="small" style={{ padding: '5px', color: '#008bd6', marginRight: '5px' }}>Create Course</p>
              </div>
              <div class="box-2"></div>
              <form style={{ marginTop: '5px' }}>
                <div class="form-group" style={{ display: 'flex' }}>
                  <div class="box1" style={{ width: '50%' }}>
                    <h6 for="exampleFormControlInput1">
                      <p>Course Name</p>
                    </h6>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Gastroentrology" style={{ width: '100%', fontSize: '15px' }} />
                  </div>
                  <div class="box1" style={{ display: 'flex', width: '50%' }}>
                    <div class="img"> <img class="" src="/trainer-images/dashboard images/thumbnails/thumbnailc.png" alt="" height={150} /></div>
                    <div class="bttn" style={{ width: '50%', marginLeft: '30px' }}>
                      <button class="editbutton" >
                        <p ><img src="/trainer-images/Vector.png" alt="" /> Browse</p>
                      </button>
                      <button class="editbutton1 mt-2" >
                        <p ><img src="/trainer-images/Vector(2).png" alt="" />  Remove</p>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="form-group" style={{ width: '100%' }}>
                  <h6 for="exampleFormControlSelect1" style={{ width: '100%' }}>Category</h6>
                  <select class="form-control input" style={{ width: '50%', height: '40px' }}>
                    <option>Country</option>
                    <option>Blanket</option>
                    <option>Product</option>
                  </select>
                </div>
                <div class="form-group mt-5">
                  <h6 for="exampleFormControlInput1" style={{ width: '50%' }}>Number of Modules</h6>
                  <input type="number" class="form-control input" placeholder="" style={{ width: '50%' }} />
                </div>
                <div class="form-group mt-5" style={{ display: 'flex' }}>
                  <div class="box1" style={{ width: '50%' }}>
                    <h6 for="exampleFormControlInput1" style={{ width: '100%' }}>Course Launch Date</h6>
                    <input type="date" class="form-control input" id="exampleFormControlInput1" placeholder="" style={{ width: '100%' }} />
                  </div>
                  <div class="box2" style={{ width: '50%', paddingLeft: '10px', marginLeft: '30px' }}>
                    <h6 for="exampleFormControlInput1" style={{ width: '50%' }}>Weeks Required for Completion</h6>
                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="" style={{ width: '100%' }} />
                  </div>
                </div>
                <div class="form-group mt-5" style={{ width: '100%' }}>
                  <h6 for="exampleFormControlTextarea1" style={{ width: '100%' }}>Course Description</h6>
                  <textarea class="form-control input" id="exampleFormControlTextarea1" rows="3" style={{ width: '100%' }}></textarea>
                </div>
                <div class="button" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                  <button type="button" class="btn btn-primary" style={{ marginLeft: '10px', background: '#0589f2', border: '1px solid rgba(0, 0, 0, 0.192)', borderRadius: '3px', color: 'white' }}>Edit Module</button>
                  <div class="rtbtn" style={{ display: 'flex' }}>
                    <button type="button" class="btn btn-light" style={{ marginLeft: '10px', background: '#3334', border: '1px solid rgba(0, 0, 0, 0.192)', borderRadius: '3px', color: 'white' }}>Back</button>
                    <button type="button" class="btn btn-primary" style={{ marginLeft: '10px', background: '#0589f2', border: '1px solid rgba(0, 0, 0, 0.192)', borderRadius: '3px', color: 'white' }}>Save</button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
export default editcourse;