import { useRouter } from 'next/router'
import { useContext } from 'react';
import useSWR from 'swr';
import AppContext from '../lib/appContext';
function Profile() {
  const layoutValues = useContext(AppContext);
  { layoutValues.setPageHeading("Profile") }
  if (!layoutValues?.profile) {
    return (<>Please Login</>)
  }
  return (
    <>
      <div className="trainee-body">
        <div className="trainee-admincoursemanagement d-flex flex-column">
          <div className="box-1-admincoursemanagement"></div>
          <div className="box-2-admincoursemanagement"></div>
          <div className="trainee-tag-admincoursemanagement">
            <p>{layoutValues?.profile?.full_name}</p>
          </div>
        </div>
      </div>

    </>
  );
}

export default Profile;