import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import useSWR from 'swr';
import moduleModel from "../../model/module.model";
import contentModel from "../../model/content.model";
import { helper } from '../../lib/helper';
import { config } from '../../lib/config';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import Link from 'next/link';



function Page() {
  const [formErrors, setFormErrors] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const { data: modules, error, isLoading } = useSWR('contentList', async () => await moduleModel.list(), config.swrConfig);
  const onSubmit = handleSubmit(async (data) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(data, formData);
    await contentModel.create(formData).then((res) => {
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
          <Form.Label>Content Type</Form.Label>
          <Form.Select {...register("content_id")} isInvalid={formErrors?.content_id}>
            {contents?.data.map((item) => {
              return (<option value={item.id}>{item.name}</option>)
            })}
          </Form.Select>
          {formErrors?.content_id && <p className="invalid-feedback">{formErrors?.content_id}</p>}
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Module</Form.Label>
          <Form.Select {...register("content_id")} isInvalid={formErrors?.content_id}>
            {modules?.data.map((item) => {
              return (<option value={item.id}>{item.name}</option>)
            })}
          </Form.Select>
          {formErrors?.content_id && <p className="invalid-feedback">{formErrors?.content_id}</p>}
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