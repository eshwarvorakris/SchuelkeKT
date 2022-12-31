import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import useSWR from 'swr';
import courseModel from "../../model/course.model";
import DataTable from 'react-data-table-component';
import Link from 'next/link';
function Page() {
  const router=useRouter();
  console.log(router.query.id);
  const { data:course, error, isLoading } = useSWR ('/', async ()=>await courseModel.detail(router.query.id));

 

  return (
    <>
    {console.log(course)}
    <p>{course?.data?.name}</p>
    <p>{course?.data?.description}</p>
    <p>{course?.data?.category?.name}</p>
    </>
  );
}

export default Page;