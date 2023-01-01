import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import auth from "../model/auth.model";
import authLayout from "../components/authLayout";
import Layout from "../components/layout";
function Login() {
  const [formErrors, setFormErrors] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(data, formData);
    await auth.login(formData).then((res) => {
      sessionStorage.setItem("access_token", res.data.access_token);
      window.location.assign("profile");
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })
  });
  return (

          <Form onSubmit={onSubmit} encType="multipart/form-data" >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control {...register("email")} isInvalid={formErrors?.email} type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              {formErrors?.email && <p className="invalid-feedback">{formErrors?.email}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control {...register("password")} isInvalid={formErrors?.password} type="password" placeholder="Password" />
              {formErrors?.password && <p className="invalid-feedback">{formErrors?.password}</p>}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

  );
}


Login.getLayout = function getLayout(page){
  return (
    <div className='container'>
    <authLayout>{page}</authLayout>
    </div>
  )
}
export default Login;