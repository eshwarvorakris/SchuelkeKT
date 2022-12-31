import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import useSWR from 'swr';
import auth from "../model/auth.model";
function Profile() {
  const router=useRouter();

  
  const { data:profile, error, isLoading } = useSWR ('/', async ()=>await auth.profile());
  console.log(error);
  if(error)
  {
    return (<>Please Login</>)
  }
  return (
    <>
    {console.log(profile)}
      Profile:{profile?.email}
    </>
  );
}

export default Profile;