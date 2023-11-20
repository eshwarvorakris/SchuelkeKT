
import React, { useState,useMemo, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
const {Quill} = dynamic(import('react-quill'), { ssr: false });

function TextEditor({name,defaultValue}) {
  const [value, setValue] = useState('');

  useEffect(() => {
    
    setValue(defaultValue);

  }, [defaultValue])



  
  function handleHtmlChange(e) {
    setValue(e);
  }
  return <>
  <ReactQuill theme="snow"  value={value} onChange={handleHtmlChange} style={{height:"10rem",marginBottom:"3rem",borderRadius:"12px"}} modules={{toolbar:[
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ]}} />
  <textarea name={name} id="" value={value} cols="30" rows="10" hidden></textarea>
  <br></br>
  <small className="text-danger"></small>
  </>;
}

export default TextEditor