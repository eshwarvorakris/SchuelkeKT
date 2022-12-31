import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import useSWR from 'swr';
import courseModel from "../../model/course.model";
import categoryModel from "../../model/category.model";
import { helper } from '../../lib/helper';
import { useForm } from 'react-hook-form';
import {Form,Button} from 'react-bootstrap';



function Page() {
  const [formErrors,setFormErrors]=useState([]);
  const {register,handleSubmit,formState:{errors}}=useForm();
  const router=useRouter();
  const { data:categories, error, isLoading } = useSWR ('categoryList', async ()=>await categoryModel.list());
  const onSubmit=handleSubmit(async (data)=>{
    event.preventDefault();
    const formData=new FormData(event.target);
    console.log(data,formData);
      await courseModel.create(formData).then((res)=>{
        helper.sweetalert.toast("course Created");
        router.push("/course");
      }).catch((error)=>{
        setFormErrors(error.response?.data?.errors);
      })
  });


  return (
    <>
    <Form onSubmit={onSubmit} encType="multipart/form-data" >
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select {...register("category_id")} isInvalid={formErrors?.category_id}>
        {categories?.data.map((item)=>{
         return (<option value={item.id}>{item.name}</option>)
})}
      </Form.Select>
        {formErrors?.name && <p className="invalid-feedback">{formErrors?.name}</p>}
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
    </>
  );
}

export default Page;