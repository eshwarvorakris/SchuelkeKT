import { useEffect } from "react"
import CourseViewModel from "../model/cource_view.model"
let apiUpdateCounter = 1;
export default function checkTimer({ startTimer = false, courseId = null, moduleId = null, chapterId = null }) {
  useEffect(() => {
    //console.clear();
    console.log("CourseId = ", courseId);
    console.log("moduleId = ", moduleId);
    console.log("chapterId = ", chapterId);
    if (startTimer) {
      const handleExit = function () {
        startTimer = false;
        clearInterval(myTimer);
      }
      const myTimer = setInterval(function () {
        if ((apiUpdateCounter % process.env.NEXT_PUBLIC_TIMEOUT_UPDATE_SECOND) == 0) {
          if (courseId != null && moduleId != null && chapterId != null) {
            const courseFormData = new FormData();
            courseFormData.append("course_id",courseId);
            courseFormData.append("module_id",moduleId);
            courseFormData.append("chapter_id",chapterId);
            courseFormData.append("viewed_seconds",process.env.NEXT_PUBLIC_TIMEOUT_UPDATE_SECOND);
            CourseViewModel.create(courseFormData).then((res) => {
              //console.log("course view create result", res.data);
            }).catch((error) => {
              console.log(error);
            });
          }
        }
        apiUpdateCounter++;
      }, 1000);
      return () => handleExit();
    }
  }, [startTimer]);

  return (<></>)
}