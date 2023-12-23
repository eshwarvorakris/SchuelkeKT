import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import questionsModel from "../model/questions.model";
const AssessmentOptions = ({position , item, inputType, handleAnswerChange,setInputType}) => {
  // console.log(item);
  // const [doFields, setDoFields] = useState(itme != null ? [...item.dos,{ firstName: "", lastName: "" }] : [...item.dos,{ firstName: "", lastName: "" }]);
  // const [dontFields, setDontFields] = useState([{ firstName: "", lastName: "" }]);
  const [selectedOption, setSelectedOptions] = useState([]);

  const { register, control, handleSubmit, reset, watch, setValue} = useForm({
    defaultValues: {
      option:  [{
        id: "",
        question_id: "",
        option: "",
        is_answer: "no"
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
    name: "optionslist"
  });



  




  useEffect(() => {
    if(item.options != undefined)
    {
      setValue('optionslist',[...item.options]);

    }

    item.question_type == 'single' ? setInputType('radio') : setInputType('checkbox');

  }, [item])
  
 
  



    const handleOptionRemove = async (index, id) => {

      
      try {
        if(id != undefined)
        {
          await questionsModel.deleteOption(id);
        }
        remove(index);
      } catch (error) {
        console.log(error);
      }
     

    }

  return (
    <div>
    <div className="row my-3">
      <div className="col-lg-12" style={{paddingLeft:0}}>
        <h4 class="mb-5">Options</h4>
     
       
        {fields.map((option, index) => {
       
          let input_type = "checkbox";

          if (item?.question_type == "single") {
            input_type = "radio";
          }
          return (
            <div key={option.id}>
              
                  <div class="d-flex my-2 gap-2" >
              {/* <input class="form-control me-auto"
                {...register(`do.${index}.title`, { required: true })}
              /> */}
              
              <Controller
                render={({ field }) => 
                {
                  return (<>
                        <div class="d-flex">
                           <input type="text" name={`questions[${position}][options][${index}][id]`} defaultValue={item.options !=undefined ? item.options[index]?.id : ''} hidden/> 
                          {/* name={`questions[${position}][options][${index}][option]`} */}
                          <input type="text" name={`questions[${position}][options][${index}][option]`}  defaultValue={fields[index].option} required/>
                          <input type="text" name={`questions[${position}][options][${index}][question_id]`} value={item.id} hidden/>
                          {/* <input type="text" name={`questions[${position}][options][${index}][is_answer]`} value={selectedOption.includes(index)} hidden/> */}
                          <input type={input_type} name={`questions[${position}][options_answer]`}  value={index}  class="mx-2" defaultChecked={fields[index]?.is_answer === true ? "true" : ''} />
                          
                        </div>
                  </>)
                }
              }
                name={`optionslist[${index}].option`}
                
                control={control}
              />
              <span  class="text-nowrap text-muted verticla-align-center d-flex align-items-center" onClick={() => handleOptionRemove(index,item.options !=undefined ? item.options[index]?.id : undefined)}>
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
          }}>Add Options</span>
        
      
      
      </div>
 
    </div>
    </div>
  );
}





export default AssessmentOptions ;
