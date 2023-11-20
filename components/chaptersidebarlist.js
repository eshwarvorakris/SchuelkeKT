import { useEffect } from "react";
import CourseViewModel from "../model/cource_view.model"
import { useState } from "react";
import Link from "next/link";


const Chaptersidebarlist = ({moduleId , name , courseId, chapterId, status,profile,chapterOrder}) => {

    const [moduleStatus, setmoduleStatus] = useState(0)
    const [chapterStatus, setchapterStatus] = useState(false);

    async function getModuleStatus(){
        const chapterForm = new FormData();
        chapterForm.append("module_id", moduleId);
        chapterForm.append("course_id", courseId);
        chapterForm.append("chapter_id", chapterId);
        chapterForm.append("chapter_order", chapterOrder);
        const response = await CourseViewModel.getChapterView(chapterForm);
        setmoduleStatus(response.data);
      }

      useEffect(() => {
        getModuleStatus()
       
        return () => {
          
        }
      }, [])
      
    if(moduleStatus.isCurrentChapterLocked == false || profile.role == 'trainer' || profile.role == 'admin'){
      return (
        <li class="chapter-name active"> <Link className="links" href={"/chapter/"+chapterId}>{name}</Link> </li>
      )
    }
    else
    {
      return <li class="chapter-name"> {name} </li>
    }
  // return (

  
  //   // moduleStatus.moduleStatus == 1 || moduleStatus.moduleStatus ==  2 ? moduleStatus.moduleStatus == 1 ? <li class="chapter-name active"> <Link href={"/chapter/"+chapterId}>{name}</Link> </li> : <li class="chapter-name"> <Link href={"/chapter/"+chapterId}>{name}</Link> </li> : <li class="chapter-name">{name}</li>
      
  // )
}

export default Chaptersidebarlist