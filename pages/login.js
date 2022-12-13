import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import auth from "../model/auth.model";
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
    <Form onSubmit={handleSubmit(onSubmit)} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register("email")} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register("password")} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;