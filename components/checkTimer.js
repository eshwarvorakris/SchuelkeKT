import { useEffect } from "react"
import Swal from "sweetalert2";
import CourseViewModel from "../model/cource_view.model"
let counts = 0;
let apiUpdateCounter = 1;
export default function checkTimer({ startTimer = false, courseId = null, moduleId = null, chapterId = null }) {
  useEffect(() => {
    const handleCursor = (e) => {
      counts = 0;
      Swal.close();
    }
    
    document.addEventListener("mousemove", handleCursor);
    console.clear();
    console.log("CourseId = ", courseId);
    console.log("moduleId = ", moduleId);
    console.log("chapterId = ", chapterId);
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
            showConfirmButton: false

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
        if ((apiUpdateCounter % process.env.NEXT_PUBLIC_TIMEOUT_UPDATE_SECOND) == 0) {
          if (courseId != null && moduleId != null && chapterId != null) {
            const courseFormData = new FormData();
            courseFormData.append("course_id",courseId);
            courseFormData.append("module_id",moduleId);
            courseFormData.append("chapter_id",chapterId);
            courseFormData.append("viewed_seconds",process.env.NEXT_PUBLIC_TIMEOUT_UPDATE_SECOND);
            CourseViewModel.create(courseFormData).then((res) => {
              console.log("course view create result", res.data);
            }).catch((error) => {
              console.log(error);
            });
          }
        }
        //console.log(apiUpdateCounter, apiUpdateCounter % process.env.NEXT_PUBLIC_TIMEOUT_UPDATE_SECOND);
        counts++;
        apiUpdateCounter++;
        //console.log(counts);
      }, 1000);
      return () => handleExit();
    }
  }, [startTimer]);

  return (<></>)
}