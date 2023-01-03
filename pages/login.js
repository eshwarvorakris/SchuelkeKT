import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import auth from "../model/auth.model";
import Link from 'next/link';
function Login() {
  const [loading, setLoading] = useState(false);
  const errorMessage = "Please Check Login Detail";
  const [formErrors, setFormErrors] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    //console.log(data, formData);
    await auth.login(formData).then((res) => {
      sessionStorage.setItem("access_token", res.data.access_token);
      window.location.assign("dashboard");
    }).catch((error) => {
      console.error(error)
      setFormErrors(error.response?.data?.errors);
    })
  });
  return (
    <div>
      <div className="section-form">
        <div className="section-picturee">
          <div className="floting-element-loginn">
            <img src="/trainee-images/Schuelke_Logo 5.png" className="big-logo-loginn" style={{ marginLeft: '350px' }} alt="" />
          </div>

          <div className="floting-element-2-login">
            <div className="small-pattern">
              <img className="dot-pattern" src="/trainee-images/Group 758.png" alt="" />
            </div>
          </div>

          <div className="brand-infoo" style={{ marginTop: '-219px' }}>
            <img className="brand-header-logoo" src="/trainee-images/Schuelke_Logo 1 (1).png" alt="" />
            <span className='span'>Knowledge Transfer</span>
            <p className='brandp'>Acquire and Apply to Achieve</p>

            <img src="/trainee-images/rafiki.png" className="traineeLogin-2-illustration" alt="" />

            <p className='brandp'>
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing
            </p>

            <div className="social-logos d-flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="section-login">

          <Form className="form d-flex flex-column" onSubmit={onSubmit} encType="multipart/form-data" >
            <Form.Group className="form-group">
              <h1 style={{ fontFamily: `Co-bold-2` }}>Your Journey starts here</h1>
              <Form.Label htmlFor="email" style={{ fontFamily: `Co-bold-2` }}><b>Email</b></Form.Label>
              <Form.Control type="email" className="form-control mt-1" {...register("email")} isInvalid={formErrors?.email}
                placeholder="thomas@schulke.com" />
              {formErrors?.email && <p className="invalid-feedback">{formErrors?.email}</p>}
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label htmlFor="password" style={{ fontFamily: `Co-light-2` }}><b>Password</b></Form.Label>
              <Form.Control type="password" className="form-control mt-1" placeholder="Enter Your Password" {...register("password")} isInvalid={formErrors?.password} />
              {formErrors?.password && <p className="invalid-feedback">{formErrors?.password}</p>}
            </Form.Group>

            <div className="danger-message hide-danger-label">
              <div className="arrow-up-1"></div>
              <label className="danger-label">Your email or password is incorrect.</label>
            </div>
            <Button type='submit' className="log-into-btn mt-3" >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;