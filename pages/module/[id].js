import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import useSWR from 'swr';
import courseModel from "../../model/course.model";
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { config } from '../../lib/config';
function Page() {
  const router=useRouter();
  const { data:course, error, isLoading } = useSWR (router.query?.id||null, async ()=>await courseModel.detail(router.query.id),config.swrConfig);

 

  return (
    <>
    <p>{course?.data?.name}</p>
    <p>{course?.data?.description}</p>
    <p>{course?.data?.category?.name}</p>
    </>
  );
}

export default Page;