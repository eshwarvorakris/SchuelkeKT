import { useState } from "react";
import useSWR from 'swr';
import auth from "../../model/auth.model";
function Index() {
  //const [profile,setProfile]=useState([]);

  //const { data:profile, error, isLoading } = useSWR ('/', auth.profile());
  return (
    <>
      <p>hello</p>
    </>
  );
}

export default Index;