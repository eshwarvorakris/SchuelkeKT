import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import Link from 'next/link';

import { Modal } from 'react-bootstrap';
import DocViewer, { DocViewerRenderers , PDFRenderer, PNGRenderer } from "@cyntler/react-doc-viewer";
  
import { Player } from 'video-react';
import Script from 'next/script';
import { useEffect } from 'react';


  function Documentviewer ({modalSwitch,file}){
    // const docData = [{ uri: "" }];
    function handleExpandClick(event){
      modalSwitch(event,'Hello Modal')
    }


    useEffect(() => {
     
    }, [])
    
 
    const docs = [
      // { uri: "https://betaschulke.s3.ap-south-1.amazonaws.com/103/Courses/1696823682828.pdf" }, // Remote file
      { uri: file }, // Remote file
      // { uri: 'https://betaschulke.s3.ap-south-1.amazonaws.com/This+is+a+test+pdf.docx' }, // Local File
      // { uri: 'https://betaschulke.s3.ap-south-1.amazonaws.com/JmNyDWh5KOQDmi46bvnP20231116T064012707Z6.pdf' }, // Local File
      // { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/250px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg' }, // Local File
    ];
  return (
    <>
      <div className="course-chapter-image-player">
     
      <DocViewer
         pluginRenderers={DocViewerRenderers}
        documents={docs}
        prefetchMethod="GET"
        config={{
          header: {
            disableHeader:true,
            disableFileName: true,
            retainURLParams: false,
          },
        }}
        style={{ width: "500px", height: "50px" }}
        className='documents-viewer'
      
      /> 
         <button onClick={handleExpandClick} class="expand-react-player-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.3843 13.1843L4.8671 16.8215L2.3999 13.9067V21.5999H10.0643L7.1483 19.1027L10.7843 15.5843L8.3843 13.1843ZM13.9355 2.3999L16.8515 4.8971L13.2155 8.4155L15.6155 10.8155L19.1327 7.1783L21.5999 10.0931V2.3999H13.9355Z" fill="white"/>
</svg>
</button>
      </div>
      

    </>
  );
}

export default Documentviewer;