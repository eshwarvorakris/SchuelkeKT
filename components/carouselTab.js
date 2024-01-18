import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import contentModel from "../model/content.model";
import { helper } from "../lib/helper"; 
import Image from "next/image";


const CarouselTab = ({position , item}) => {
  const [cards, setCards] = useState(["0"]);
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } = useForm();


  const addCard = (e) => {
    setCards([...cards, "1"]);
  };

  const resetField = async (e,file) => {
    // http://localhost:5000/upload/delete
    // console.log(file);
    if(file != null)
    {
      const answer = await helper.sweetalert.confirm('Are you sure you want to remove this image','warning',true,'It will delete the selected images permanently')
      if(answer.isConfirmed == true)
      {
        const response = await contentModel.deleteCarousel(file,e.target.parentElement.querySelector('input').name,item.id);
        e.target.parentElement.querySelector('input').value = "";
        e.target.parentElement.querySelector('img').src = "/trainer-images/upload.svg";
        e.target.parentElement.querySelector('img').setAttribute('width','30');
      }
    
    }
    else
    {
      e.target.parentElement.querySelector('input').value = "";
    e.target.parentElement.querySelector('img').src = "/trainer-images/upload.svg";
    e.target.parentElement.querySelector('img').setAttribute('width','30');
    }

    

  };

  const handleImageUpload = (e) => {
    // console.log();
    e.target.parentElement.querySelector("input")?.click();
  };

  const handleFileChange = (e) => {
    // console.log(e.target.parentElement.querySelector('img').width);
    const reader = new FileReader();
    // Gettting Selected File (user can select multiple but we are choosing only one)
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    // As the File loaded then set the stage as per the file type
    reader.onload = (readerEvent) => {
      e.target.parentElement.querySelector('img').src = readerEvent.target.result

      // setVideoPreview();
      
    };
      e.target.parentElement.querySelector('img').setAttribute('width','100%');


  }
  return (
    <div>
      <div className="row my-5 w-100 gap-3">
        {/* {
            cards.map(element=>{
              return 
            })
          } */}
        {/* <div className="col-lg-2 d-flex flex-column justify-content-center align-items-center gap-2">
                <span>
                        <img src="/trainer-images/upload.svg"  width={50} />
                </span>
                <h6>Upload Image</h6>
                <span class="text-muted d-flex align-items-center">
                    <img src="/trainer-images/trash.svg"  /> Remove
                </span>
                <input type="file" {...register(`banner_url]_${position}`)} name="carousel_image" class="d-none" id="" />
            </div> */}
        <div className="col-lg-2 d-flex flex-column justify-content-center align-items-center gap-2 mb-5 border border-primary rounded p-2  py-3">
          <img alt="" 
            src={item.carousel_image_one != null ? item.carousel_image_one : "/trainer-images/upload.svg"}
            
            width={item.carousel_image_one != null ? "100%" : 30}
            onClick={handleImageUpload}
          />
          <h6 onClick={handleImageUpload}>Upload Image</h6>

          <span
            class="text-muted d-flex align-items-center"
            onClick={e=>resetField(e,item.carousel_image_one)}
          >
            <img alt=""  src="/trainer-images/trash.svg"  /> Remove
          </span>
          <input type="file"  {...register(`carousel_image_one_${position}`)}  onChange={handleFileChange}  class="d-none" id="" accept="image/*"/>
        </div>
        <div className="col-lg-2 d-flex flex-column justify-content-center align-items-center gap-2 mb-5 border border-primary rounded p-2  py-3">
          <img alt="" 
            src={item.carousel_image_two != null ? item.carousel_image_two : "/trainer-images/upload.svg"}
            
            width={item.carousel_image_two != null ? "100%" : 30}
            onClick={handleImageUpload}
          />
          <h6 onClick={handleImageUpload}>Upload Image</h6>

          <span
            class="text-muted d-flex align-items-center"
            onClick={e=>resetField(e,item.carousel_image_two)}
          >
            <img alt=""  src="/trainer-images/trash.svg"  /> Remove
          </span>
          <input {...register(`carousel_image_two_${position}`)}type="file"  onChange={handleFileChange}   class="d-none" id="" accept="image/*"/>
        </div>
        <div className="col-lg-2 d-flex flex-column justify-content-center align-items-center gap-2 mb-5 border border-primary rounded p-2  py-3">
          <img alt="" 
            src={item.carousel_image_three != null ? item.carousel_image_three : "/trainer-images/upload.svg"}
            
            width={item.carousel_image_three != null ? "100%" : 30}
            onClick={handleImageUpload}
          />
          <h6 onClick={handleImageUpload}>Upload Image</h6>

          <span
            class="text-muted d-flex align-items-center"
            onClick={e=>resetField(e,item.carousel_image_three)}
          >
            <img alt=""  src="/trainer-images/trash.svg"  /> Remove
          </span>
          <input {...register(`carousel_image_three_${position}`)} type="file" onChange={handleFileChange}   class="d-none" id="" accept="image/*"/>
        </div>
        <div className="col-lg-2 d-flex flex-column justify-content-center align-items-center gap-2 mb-5 border border-primary rounded p-2  py-3">
          <img alt="" 
            src={item.carousel_image_four != null ? item.carousel_image_four : "/trainer-images/upload.svg"}
           
            width={item.carousel_image_four != null ? "100%" : 30}
            onClick={handleImageUpload}
          />
          <h6 onClick={handleImageUpload}>Upload Image</h6>

          <span
            class="text-muted d-flex align-items-center"
            onClick={e=>resetField(e,item.carousel_image_four)}
          >
            <img alt=""  src="/trainer-images/trash.svg"  /> Remove
          </span>
          <input {...register(`carousel_image_four_${position}`)} type="file" onChange={handleFileChange}  class="d-none" id="" accept="image/*"/>
        </div>
        <div className="col-lg-2 d-flex flex-column justify-content-center align-items-center gap-2 mb-5 border border-primary rounded p-2  py-3 border">
        <img alt="" 
            src={item.carousel_image_five != null ? item.carousel_image_five : "/trainer-images/upload.svg"}
            
            width={item.carousel_image_five != null ? "100%" : 30}
            onClick={handleImageUpload}
          />
          <h6 onClick={handleImageUpload}>Upload Image</h6>

          <span
            class="text-muted d-flex align-items-center"
            onClick={e=>resetField(e,item.carousel_image_five)}
          >
            <img alt=""  src="/trainer-images/trash.svg"  /> Remove
          </span>
          <input {...register(`carousel_image_five_${position}`)} type="file" onChange={handleFileChange}   class="d-none" id="" accept="image/*"/>
        </div>
        <p>Note: Please upload images of 1600 x 900 dimension for better visibility of the photo.</p>
        
      </div>
    </div>
  );
};

export default CarouselTab;
