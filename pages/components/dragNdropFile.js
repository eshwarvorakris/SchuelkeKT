import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import uploader from "../../model/fileupload.model";
import { helper } from '../../lib/helper';

function MyDropzone(props) {
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } = useForm();
  const handleDisButtonChange = (buttonChange) => {
    //console.log("buttonChange", buttonChange)
    props.onDisableButtonChange(buttonChange);
  };

  const handlefileChange = (fileId, fileData) => {
    //console.log("buttonChange", buttonChange)
    props.onFileChanged(fileId, fileData);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      file.id = props.props.id;
    });
    console.log("drop triggered");
    var curId = acceptedFiles[0].id;
    let fileKey = getValues('content[' + curId + '][file_key]');
    const fileNameAr = acceptedFiles[0].name.split('.');
    const fileExt = fileNameAr[fileNameAr.length - 1];
    const curFileExt = getValues('content[' + curId + '][file_ext]');
    document.getElementById("uploadOutFileName" + curId).innerHTML = "File Selected : <b>" + acceptedFiles[0].name + "</b>";
    handleDisButtonChange(true);
    var data = new FormData();
    var imagedata = await acceptedFiles[0];
    data.append("uploadFile", imagedata);
    data.append("filefolder", "Courses");
    if (fileKey != "" && fileKey != undefined && curFileExt === fileExt) {
      data.append("fileKey", fileKey);
    }
    await uploader.upload(data).then((res) => {
      handleDisButtonChange(false);
      //console.log(res?.data?.data?.Location);
      helper.sweetalert.toast("File Uploaded Successfully");
      
      handlefileChange(curId, res?.data?.data);
      console.log(res?.data);
    }).catch((error) => {
      handleDisButtonChange(false);
      helper.sweetalert.warningToast("Unable To Upload File Try Again Later");
      console.error(error.response)
    })
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps({ className: '' })}>
        <div className="upload-container">
          <p className="drag-text" id={`uploadOutFileName${props?.props?.id}`}>
            {(() => {
              if (props?.props?.file_name?.length != 0 && props?.props?.file_name?.length !== undefined) {
                return (<>{props?.props?.file_name}</>);
              } else {
                return (<>Drag and Drop here </>);
              }
            })()}
          </p>
        </div>
      </div>
    </>
  );
}

export default MyDropzone;
