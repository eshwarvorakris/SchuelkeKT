import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
const DosAndDontsTab = ({position , item}) => {
  // console.log(item);
  // const [doFields, setDoFields] = useState(itme != null ? [...item.dos,{ firstName: "", lastName: "" }] : [...item.dos,{ firstName: "", lastName: "" }]);
  // const [dontFields, setDontFields] = useState([{ firstName: "", lastName: "" }]);
  // const [inputs, setInputs] = useState([{ title: "", lastName: "" }]);
  const { register, control, handleSubmit, reset, watch, setValue} = useForm({
    defaultValues: {
      do:  [{
        "content_id": "",
        "title": "",
        "created_at": "",
        "updated_at": "",
        "deleted_at": null
    }],
    dont:[{
      "content_id": "",
      "title": "",
      "created_at": "",
      "updated_at": "",
      "deleted_at": null
  }]
  
    }
  });
  const {
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    replace
  } = useFieldArray({
    control,
    name: "do"
  });

  const {
    fields:dontFields,
    append:dontAppend,
    remove:dontRemove,

  } = useFieldArray({
    control,
    name: "dont"
  });

  




  useEffect(() => {
    if(item.dos != undefined)
    {
      setValue('do',[...item.dos]);

    }
    if(item.donts != undefined)
    {
      setValue('dont',[...item.donts]);

    }
    
  
    return () => {
     
    }
  }, [item])
  
 



  return (
    <div>
    <div className="row my-3">
      <div className="col-lg-6">
        <h4 class="mb-5">Do's</h4>
     
       
        {fields.map((item, index) => {
          // console.log(item);
          return (
            <div key={`dos${index}`}>
              
                  <div class="d-flex my-2 gap-2" key={item.id}>
              {/* <input class="form-control me-auto"
                {...register(`do.${index}.title`, { required: true })}
              /> */}
              
              <Controller
                render={({ field }) => <input class="form-control me-auto" {...field}   name={`content[${position}][do][${index}]`} />}
                name={`do.${index}.title`}
                control={control}
              />
              <span  class="text-nowrap text-muted verticla-align-center d-flex align-items-center" onClick={() => remove(index)}>
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
              </span>
            </div>
               
              
            
           

            </div>
          );
        })}
        <span className="btn btn-primary w-75 rounded-0" style={{backgroundColor:'#008bd6'}}  onClick={() => {
            append({ title: ""});
          }}>Add more content</span>
        
      
      
      </div>
      <div className="col-lg-6">
        <h4 class="mb-5">Don'ts</h4>
        {dontFields.map((item, index) => {
          // console.log(item);
          return (
            <div key={`donts${index}`}>
              
                  <div class="d-flex my-2 gap-2" key={item.id}>
              {/* <input class="form-control me-auto"
                {...register(`do.${index}.title`, { required: true })}
nt              /> */}
              
              <Controller
                render={({ field }) => <input class="form-control me-auto" {...field}   name={`content[${position}][dont][${index}]`} />}
                name={`dont.${index}.title`}
                control={control}
              />
              <span  class="text-nowrap text-muted verticla-align-center d-flex align-items-center" onClick={() => dontRemove(index)}>
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
              </span>
            </div>
               
              
            
           

            </div>
          );
        })}
        <span className="btn btn-primary w-75 rounded-0" style={{backgroundColor:'#008bd6'}} onClick={() => {
            dontAppend({ title: ""});
          }}>Add more content</span>
      
      </div>
    </div>
    </div>
  );
}





export default DosAndDontsTab;
