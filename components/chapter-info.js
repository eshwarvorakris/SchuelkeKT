import readChapterLayout from "./readChapterLayout";
import Chapternavbar from "./chapternavbar";
import Chaptersidebar from "./chaptersidebar";
import Imageplayer from "./imageplayer";
import Documentviewer from "../pages/admin/component/documentsviewer";
import Script from "next/script";
import { useState } from "react";
import Image from "next/image";
function ChapterInfo() {
  const [modal, setModal] = useState('')
  function handleModalSwitch(event,data){
    modal == '' ? setModal('active') : setModal('');
  }
  return (
    <>
      <div>
        <Chaptersidebar />
          <main class="course-page-main-content">

          <div className={'player-modal ' + modal }>
      
            {modal == 'active' ? <Documentviewer modalSwitch={handleModalSwitch}/> : ''}
          </div>
          <a className="course-page-main-content__header d-flex gap-3 align-items-center">
          <img  src="data:image/svg+xml,%3Csvg width='39' height='39' viewBox='0 0 39 39' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='19.5' cy='19.5' r='19.5' fill='%23F4F4F4'/%3E%3Cpath d='M18 13L14.5 16.5L11 20H27' stroke='%23565656' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18 27L14.5 23.5L11 20H27' stroke='%23565656' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A" alt="" />
           
              
                    <h4>Course Outcome</h4>
           
          </a>


          <div className="main-content_banner">
            <div className="main-content_banner__overlay">
              <h3>What is cardiology?</h3>
            </div>
            <img alt="" src="/admin-images/banner.png"  />
          </div>

          <div className="chapter-content-area">

          <h2 className="title">Cardio Vascular Diseases</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, optio! Laboriosam, voluptatem nesciunt molestiae fugit alias tenetur cum saepe commodi excepturi temporibus nostrum aspernatur error dignissimos ut illo officia accusamus.
          In, culpa deserunt, voluptatum consequuntur quas autem at vel deleniti qui excepturi impedit veritatis tenetur architecto, quam tempore rem molestiae labore minus! Consectetur et illo beatae iusto accusamus laudantium minus?
          Impedit minima enim sequi iure tenetur accusantium facilis laboriosam mollitia. Quis error adipisci facere, officia iure, omnis doloribus recusandae sint consectetur porro cum maiores quidem perferendis at iste culpa quos?
          Minus fugiat tempora harum ducimus assumenda nobis aperiam, modi molestiae accusamus itaque, maiores corrupti labore autem officia excepturi ad nostrum, sint beatae. Blanditiis accusamus repellendus minima minus praesentium doloribus esse?
          Ullam excepturi expedita corporis omn error similique eveniet incidunt! Dolor explicabo dicta quibusdam asperiores dolores et.
        </p>
          
        {/* <img alt=""player modalSwitch={handleModalSwitch}/> */}
        <div>
        {/* <Documentviewer modalSwitch={handleModalSwitch}/> */}
        <iframe src="https://docs.google.com/gview?url=https://betaschulke.s3.ap-south-1.amazonaws.com/demo.pptx&embedded=true"  frameborder="0">
        </iframe>

        </div>
        <div className="footerNavigation-buttons">
            <div className="footer-buttons-container">
              <span className="doc-controls-button">
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
              <div>
                <span className="btn-type">previous</span>  <br />
                <span className="btn-value">Chaspanter 1 - Introduction</span>
              </div>
            </div>
            <div className="footer-buttons-container next">
              <span className="doc-controls-button ">
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
              <div>
                <span className="btn-type">previous</span>  <br />
                <span className="btn-value">Chaspanter 1 - Introduction</span>
              </div>
            </div>
         </div>
          </div>
         
         

          </main>
        <Chapternavbar />
      </div>
    </>
  );
}

ChapterInfo.getLayout = function getLayout(page) {
  return <readChapterLayout>{page}</readChapterLayout>;
};
export default ChapterInfo;
