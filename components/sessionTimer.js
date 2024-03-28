import { useEffect, useState } from "react"
import Swal from "sweetalert2";
let counts = 0;
export default function CheckTimer({ sessionTimer = false}) {

  useEffect(() => {
    var isSwalFired = false;
    const handleCursor = (e) => {

      counts = 0;
      // console.log("isSwalFired", isSwalFired);
      if(isSwalFired) {
        Swal.close();
      }
    }
    
    document.addEventListener("mousemove", handleCursor);
    if (sessionTimer) {

      const handleExit = function () {
        sessionTimer = false;
        clearInterval(allSession);
      }
      const allSession = setInterval(function () {
       

        if (counts == process.env.NEXT_PUBLIC_TIMEOUT_SECOND) {
          isSwalFired = true;
          Swal.fire({
            title: 'Please move your mouse to continue',
            timer: 30000,
            timerProgressBar: true,
            showCloseButton: false,
            showConfirmButton: false

          }).then((result) => {
            isSwalFired = false;
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              sessionStorage.removeItem("access_token");
              window.location.assign("/login");
            }
            else {
              counts = 0;
            }
          })
        }

        if (counts === 900) {
          sessionStorage.removeItem("access_token");
          window.location.assign("/login");
        }
        counts++;
      }, 1000);
      return () => handleExit();
    }
  }, [sessionTimer]);

  return (<></>)
}