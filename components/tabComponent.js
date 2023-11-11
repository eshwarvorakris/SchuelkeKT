import { useState } from "react";
import VideoTab from "./videoTab";
import CarouselTab from "./carouselTab";
import DosAndDontsTab from "./dosAndDontsTab";
export default function TabComponent({position,item})  {

  const [tab, setTab] = useState('video')
  return (
    <>
      <div class="tab-container ">
        <div className="row">
        <div className="col-lg-4">
          <span  onClick={()=>setTab('video')} className={`tabs d-flex align-items-center justify-content-center gap-1 ${tab == 'video' ? 'active' :''}`}>
            Upload Video / Document / Banner
          </span>
        </div>
        <div className="col-lg-4 ">
          <span onClick={()=>setTab('carousel')} className={`tabs d-flex align-items-center justify-content-center gap-1 ${tab == 'carousel' ? 'active' :''}`}>Upload Carousel</span>
        </div>
        <div className="col-lg-4">
          <span  onClick={()=>setTab('dos')} className={`tabs d-flex align-items-center justify-content-center gap-1 ${tab == 'dos' ? 'active' :''}`}>Do's & Don'ts</span>
        </div>
        </div>
        

        <div className="row tab-content">

          <div className={tab == 'video' ? 'd-block' : 'd-none'}>
          <VideoTab item={item} position={position}/>
          </div>
          <div className={tab == 'carousel' ? 'd-block' : 'd-none'}>
          <CarouselTab position={position} item={item}/>
          </div>
          <div className={tab == 'dos' ? 'd-block' : 'd-none'}>
          <DosAndDontsTab position={position} item={item}/>
          </div>


              {/* {
                 ?  : ''
              }
              {
                tab == 'carousel' ?  : ''
              }
              {
                tab == 'dos' ?  : ''
              } */}
        </div>
      </div>

      
    </>
  );
};

// export default tabComponent;
