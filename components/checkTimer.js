import { useEffect } from "react"
import Swal from "sweetalert2";
let counts = 0;
export default function checkTimer({ startTimer = false }) {
  useEffect(() => {
    const handleCursor = (e) => {
      counts = 0;
      Swal.close();
    }
    document.addEventListener("mousemove", handleCursor);

    if (startTimer) {

      const handleExit = function () {
        startTimer = false;
        clearInterval(myTimer);
      }
      const myTimer = setInterval(function () {
        if (counts == process.env.NEXT_PUBLIC_TIMEOUT_SECOND) {
          Swal.fire({
            title: 'Please move your mouse to continue',
            timer: 30000,
            timerProgressBar: true,
            showCloseButton: false,
            confirmButtonText: "Continue"

          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              window.location.assign("/login");
            }
            else {
              counts = 0;
            }
          })
        }
        counts++;
        //console.log(counts);
      }, 1000);
      return () => handleExit();
    }
  }, [startTimer]);

  return (<></>)
}