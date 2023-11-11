import { useEffect, useState } from "react";
import { imagePlayerData } from "../lib/helper";
import Script from "next/script";
import Image from "next/image";

function Imageplayer({modalSwitch,images}) {
  let [image, setImage] = useState(0);
  const [imageArray, setimageArray] = useState(images)


  // console.log(images);
  function handleExpandClick(event){
    modalSwitch(event,'Hello Modal')
  }


  useEffect(() => {
    const result = images.filter(element => {
      return element !== null && element !== undefined;
    });
    setimageArray(result);

  }, [images])
  
  return (
    <>
      <div className="course-chapter-image-player">
        <div className="image">
          <img alt="" src={ imageArray[image]} />
        </div>
        <div className="action-buttons">
          <div className="action-buttons-container">
            <span onClick={() => {
                image >= 1 && image < imageArray.length
                  ? setImage(image - 1)
                  : setImage(imageArray.length - 1);
              }}
              
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.999 5L7.49902 8.5L3.99902 12H19.999"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.999 19L7.49902 15.5L3.99902 12H19.999"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span>{image + 1}</span>
            <span>/</span>
            <span>{imageArray.length}</span>

            <span
              onClick={() => {
                image < imageArray.length -1
                  ? setImage(image + 1)
                  : setImage(0);
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.001 5L16.501 8.5L20.001 12H4.00098"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.001 19L16.501 15.5L20.001 12H4.00098"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>

          <div className="expand-player-button">
            <img alt="" onClick={handleExpandClick}
              className=""
              src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.3843 11.1843L2.8671 14.8215L0.399902 11.9067V19.5999H8.0643L5.1483 17.1027L8.7843 13.5843L6.3843 11.1843ZM11.9355 0.399902L14.8515 2.8971L11.2155 6.4155L13.6155 8.8155L17.1327 5.1783L19.5999 8.0931V0.399902H11.9355Z' fill='white'/%3E%3C/svg%3E%0A"
              
            />
          </div>
        </div>
      </div>

      
    </>
  );
}

export default Imageplayer;
