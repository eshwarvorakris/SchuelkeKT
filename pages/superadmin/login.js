import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import auth from "../../model/auth.model";
function Login() {
    const {register,handleSubmit,formState:{errors}}=useForm();

    const onSubmit=(data)=>{
        console.log(data);
        auth.login(data).then((res)=>{
            console.log(res.data.access_token);
            localStorage.setItem("access_token",res.data.access_token);
            window.location.assign("profile");
        })
    }
  return (
    <div>
      <div className="section-form">
        <div className="section-picture">
          <div className="floting-element">
            <img src="/trainee-images/Schuelke_Logo 5.png" className="big-logo" alt="" />
          </div>

          <div className="floting-element-2-login">
            <div className="small-pattern">
              <img className="dot-pattern" src="/trainee-images/Group 758.png" alt="" />
            </div>
          </div>

          <div className="brand-info">
            <img className="brand-header-logo" src="/trainee-images/Schuelke_Logo 1 (1).png" alt="" />
            <span>Knowledge Transfer</span>
            <p>Acquire and Apply to Achieve</p>

            <img src="/trainee-images/rafiki.png" className="traineeLogin-2-illustration" alt="" />

            <p>
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing
            </p>

            <div className="social-logos d-flex">
              <ion-icon className="social-logo" name="logo-facebook"></ion-icon>
              <ion-icon className="social-logo" name="logo-twitter"></ion-icon>
              <ion-icon className="social-logo" name="logo-linkedin"></ion-icon>
            </div>
          </div>
        </div>

        <div className="section-login">
          <form className="form d-flex flex-column">
            <div className="form-group">
              <h1>Your Journey starts here</h1>
              <label for="exampleInputEmail1" style={{fontFamily: `Co-bold-2`}}>Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="thomas@schulke.com" required />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1" style={{fontFamily: `Co-bold-2`}}>Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Your Password"
                required />
            </div>

            <div className="danger-message hide-danger-label">
              <div className="arrow-up-1"></div>
              <label className="danger-label">Your email or password is incorrect.</label>
            </div>
            <a className="log-into-btn" href="trainer/index.html">Login</a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;