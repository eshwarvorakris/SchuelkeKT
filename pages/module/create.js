import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import useSWR from 'swr';
import moduleModel from "../../model/module.model";
import courseModel from "../../model/course.model";
import { helper } from '../../lib/helper';
import { config } from '../../lib/config';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import Link from 'next/link';



function Page() {
  const [formErrors, setFormErrors] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const { data: courses, error, isLoading } = useSWR('courseList', async () => await courseModel.list(), config.swrConfig);
  const onSubmit = handleSubmit(async (data) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(data, formData);
    await moduleModel.create(formData).then((res) => {
      helper.sweetalert.toast("module Created");
      router.push("/module");
    }).catch((error) => {
      setFormErrors(error.response?.data?.errors);
    })
  });


  return (
    <div>
     <div className=''>
    <Link className='btn btn-primary float-end' href={'/module'}>List</Link>
      <h3>Create module</h3>
      </div>
      <Form onSubmit={onSubmit} encType="multipart/form-data" >
        <Form.Group className="mb-3">
          <Form.Label>Courses</Form.Label>
          <Form.Select {...register("course_id")} isInvalid={formErrors?.course_id}>
            {courses?.data.map((item) => {
              return (<option value={item.id}>{item.name}</option>)
            })}
          </Form.Select>
          {formErrors?.course_id && <p className="invalid-feedback">{formErrors?.course_id}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control {...register("name")} isInvalid={formErrors?.name} type="text" placeholder="Name" />
          {formErrors?.name && <p className="invalid-feedback">{formErrors?.name}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" {...register("description")} isInvalid={formErrors?.description} type="text" placeholder="Description" />
          {formErrors?.description && <p className="invalid-feedback">{formErrors?.description}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Page;