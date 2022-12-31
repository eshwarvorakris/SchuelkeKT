import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import useSWR from 'swr';
import courseModel from "../../model/course.model";
import DataTable from 'react-data-table-component';
import Link from 'next/link';
function Page() {
  const router=useRouter();

  const { data:courses, error, isLoading } = useSWR ('/', async ()=>await courseModel.list());

  const courseDelete=function(id)
  {
    courseModel.delete(id).then((res)=>{
        console.log(res);
    })
  }
  const columns = [
    {
        name: 'Title',
        selector: row => row.name,
        sortable:true
    },
    {
        name: 'Category',
        selector: row => row.category.name,
    },
    {
        name: 'Category',
        selector: row => row.category.name,
    },
    {
        name: 'Action',
        cell: row => {return (
        <><a href={`/course/${row.id}`} className="btn">View</a>
        <button type='button' onClick={()=>courseDelete(row.id)} >Delete</button></>)},
        
    },
];

  return (
    <>
    <a  href="/course/create">Create Course</a>
    <DataTable
            columns={columns}
            data={courses?.data}
        />
    </>
  );
}

export default Page;