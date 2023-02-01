import { useEffect } from "react"
import Swal from "sweetalert2";
let counts = 0;
export default function checkTimer({ startTimer = false }) {
  useEffect(() => {
    if(startTimer)
    {
    setInterval(function () { 
      if (counts == process.env.NEXT_PUBLIC_TIMEOUT_SECOND) {
        Swal.fire({
          title: 'Please Click on Continue',
          timer: 10000,
          timerProgressBar: true,
          showCloseButton: true,
          confirmButtonText:"Continue"
          
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            window.location.assign("login");
          }
          else{
            counts=0;
          }
        })
      }
      counts++;
      
    }, 1000); 
  }
  }, [startTimer]);
  return (<></>)
}