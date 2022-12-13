import { useState } from "react";
import useSWR from 'swr';
import auth from "../model/auth.model";
function Profile() {
  //const [profile,setProfile]=useState([]);

  const { data:profile, error, isLoading } = useSWR ('/', auth.profile());
  return (
    <>
    {console.log(profile)}
      Profile
    </>
  );
}

export default Profile;