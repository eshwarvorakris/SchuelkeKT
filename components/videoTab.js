import { imageConfigDefault } from 'next/dist/shared/lib/image-config';
import React, { useRef, useState } from 'react'
import contentModel from "../model/content.model";
import { helper } from "../lib/helper"; 
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

const VideoTab = ({item,position}) => {

  const [videoPreview, setVideoPreview] = useState(item.content_video != "" ? item.content_video : null);
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [selectedBanner, setSelectedBanner] = useState(null)
  const filePicekerRef = useRef(null);
  const docPickerRef = useRef(null);
  const bannerPickerRef = useRef(null);
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } = useForm();
  

  function previewFile(e) {
    // Reading New File (open file Picker Box)
    const reader = new FileReader();
    // Gettting Selected File (user can select multiple but we are choosing only one)
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    // As the File loaded then set the stage as per the file type
    reader.onload = (readerEvent) => {
       if (selectedFile.type.includes("video")) {
        setVideoPreview(readerEvent.target.result);
      }
    };
  }

  async function clearFiles() {
    // console.log();

    if(videoPreview != null){
      const answer = await helper.sweetalert.confirm('Are you sure you want to remove this file','warning',true,'It will delete the selected file permanently')
      if(answer.isConfirmed == true)
      {
        const response = await contentModel.deleteCarousel(videoPreview,filePicekerRef.current.name,item.id);
        filePicekerRef.current.value = ""
        setVideoPreview(null);
      }
      
    }
    else
      {
        filePicekerRef.current.value = ""
        setVideoPreview(null);
      }
    
  }

  function previewDocument(e){
    
    setSelectedDocument(e.target.files[0].name)
  }

  async function clearDocument(){
    if(selectedDocument != null){
      const answer = await helper.sweetalert.confirm('Are you sure you want to remove this file','warning',true,'It will delete the selected file permanently.')
      if(answer.isConfirmed == true)
      {
        const response = await contentModel.deleteCarousel(selectedDocument,docPickerRef.current.name,item.id);
        docPickerRef.current.value = ""
        setSelectedDocument(null);
      }
      
    }
    else
      {
        docPickerRef.current.value = ""
        setSelectedDocument(null);
      }
  }

  function previewBanner(e) {
    // Reading New File (open file Picker Box)
    const reader = new FileReader();
    // Gettting Selected File (user can select multiple but we are choosing only one)
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    // As the File loaded then set the stage as per the file type
    reader.onload = (readerEvent) => {
       
      setSelectedBanner(readerEvent.target.result);
      
      
    };
  }

  async function clearBanner(){
    if(selectedBanner != null && item.file_url != null){
      const answer = await helper.sweetalert.confirm('Are you sure you want to remove this file','warning',true,'It will delete the selected file permanently.')
      if(answer.isConfirmed == true)
      {
        const response = await contentModel.deleteCarousel(selectedBanner,bannerPickerRef.current.name,item.id);
        docPickerRef.current.value = ""
        setSelectedBanner(null);
      }
      
    }
    else
      {
        docPickerRef.current.value = ""
        setSelectedBanner(null);
      }
  }
  useEffect(() => {
    setVideoPreview(item.content_video != "" ? item.content_video : null)
    setSelectedBanner(item.banner_url != null ? item.banner_url : null)
    setSelectedDocument(item.file_url != null ? item.file_url.split('/')[item.file_url.split('/').length -1] : null)
  
  
  }, [item])
  
  return (
    <div>
      <input {...register(`content_video_${position}`)} ref={filePicekerRef}  accept="video/*" onChange={previewFile} type="file" hidden/>
      <input {...register(`file_url_${position}`)} ref={docPickerRef}   onChange={previewDocument} type="file" hidden/>
      <input {...register(`banner_url_${position}`)} ref={bannerPickerRef}   onChange={previewBanner} type="file" hidden/>
      <div className="row gap-3">
        <div className="col-lg-3 d-flex flex-column  justify-content-start border-primary border rounded p-2">
          <label htmlFor="" class="mb-3">Select video</label>
        {videoPreview != null ? <video width={"100%"} controls src={videoPreview}></video> : <img alt="" onClick={() => filePicekerRef.current.click()} width="30%" className='m-auto ' src="/trainer-images/upload.svg" />}
        
        {videoPreview != null && <span
                  className="text-nowrap text-muted verticla-align-center d-flex align-items-center mt-1"
                  
                  onClick={e=>clearFiles()}
                >
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.66797 6.83236H18.3346"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.66797 6.83236H18.3346"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.16536 10.499V15.999"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.16536 10.499V15.999"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.8333 10.499V15.999"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.8333 10.499V15.999"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.58203 6.83301L5.4987 17.833C5.4987 18.8455 6.31951 19.6663 7.33203 19.6663H14.6654C15.6779 19.6663 16.4987 18.8455 16.4987 17.833L17.4154 6.83301"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.58203 6.83301L5.4987 17.833C5.4987 18.8455 6.31951 19.6663 7.33203 19.6663H14.6654C15.6779 19.6663 16.4987 18.8455 16.4987 17.833L17.4154 6.83301"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.25 6.83268V4.08268C8.25 3.57642 8.66041 3.16602 9.16667 3.16602H12.8333C13.3396 3.16602 13.75 3.57642 13.75 4.08268V6.83268"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.25 6.83268V4.08268C8.25 3.57642 8.66041 3.16602 9.16667 3.16602H12.8333C13.3396 3.16602 13.75 3.57642 13.75 4.08268V6.83268"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Remove
                </span>}
        </div>
        <div className="col-lg-3 d-flex flex-column  justify-content-start border-primary border rounded p-2">
        <label htmlFor="" class="mb-3">Select Document</label>

        { <img alt="" onClick={() => docPickerRef.current.click()} width={"30%"} className='m-auto' src="/trainer-images/upload.svg" />}
        <p className='text-break text-center'>{selectedDocument}</p>
        {selectedDocument != null  && <span
                  className="text-nowrap text-muted verticla-align-center d-flex align-items-center mt-2"
                  
                  onClick={e=>clearDocument()}
                >
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.66797 6.83236H18.3346"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.66797 6.83236H18.3346"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.16536 10.499V15.999"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.16536 10.499V15.999"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.8333 10.499V15.999"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.8333 10.499V15.999"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.58203 6.83301L5.4987 17.833C5.4987 18.8455 6.31951 19.6663 7.33203 19.6663H14.6654C15.6779 19.6663 16.4987 18.8455 16.4987 17.833L17.4154 6.83301"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.58203 6.83301L5.4987 17.833C5.4987 18.8455 6.31951 19.6663 7.33203 19.6663H14.6654C15.6779 19.6663 16.4987 18.8455 16.4987 17.833L17.4154 6.83301"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.25 6.83268V4.08268C8.25 3.57642 8.66041 3.16602 9.16667 3.16602H12.8333C13.3396 3.16602 13.75 3.57642 13.75 4.08268V6.83268"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.25 6.83268V4.08268C8.25 3.57642 8.66041 3.16602 9.16667 3.16602H12.8333C13.3396 3.16602 13.75 3.57642 13.75 4.08268V6.83268"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Remove
                </span>}
        </div>
        <div className="col-lg-3 d-flex flex-column  justify-content-start border-primary border rounded p-2 ">
        <label htmlFor="" class="mb-3">Select Banner</label>

        { <img alt="" onClick={() => bannerPickerRef.current.click()} width={selectedBanner != null && selectedBanner != "" ? "100%" : "30%"} className={`m-auto ${selectedBanner != null ? `mt-0` : ``}`} src={selectedBanner != null && selectedBanner != "" ? selectedBanner : "/trainer-images/upload.svg"} />}
        {/* <p className='text-break text-center'>{selectedBanner != null ? selectedBanner : item.banner_url != "" ? item.banner_url.split('/')[item.banner_url.split('/').length -1] : ''}</p> */}
        
        {selectedBanner != null  && <span
                  className="text-nowrap text-muted verticla-align-center d-flex align-items-center mt-2"
                  
                  onClick={e=>clearBanner()}
                >
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.66797 6.83236H18.3346"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.66797 6.83236H18.3346"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.16536 10.499V15.999"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.16536 10.499V15.999"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.8333 10.499V15.999"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.8333 10.499V15.999"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.58203 6.83301L5.4987 17.833C5.4987 18.8455 6.31951 19.6663 7.33203 19.6663H14.6654C15.6779 19.6663 16.4987 18.8455 16.4987 17.833L17.4154 6.83301"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.58203 6.83301L5.4987 17.833C5.4987 18.8455 6.31951 19.6663 7.33203 19.6663H14.6654C15.6779 19.6663 16.4987 18.8455 16.4987 17.833L17.4154 6.83301"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.25 6.83268V4.08268C8.25 3.57642 8.66041 3.16602 9.16667 3.16602H12.8333C13.3396 3.16602 13.75 3.57642 13.75 4.08268V6.83268"
                      stroke="#4B465C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.25 6.83268V4.08268C8.25 3.57642 8.66041 3.16602 9.16667 3.16602H12.8333C13.3396 3.16602 13.75 3.57642 13.75 4.08268V6.83268"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Remove
                </span>}
        </div>
      </div>
    </div>
  )
}

export default VideoTab