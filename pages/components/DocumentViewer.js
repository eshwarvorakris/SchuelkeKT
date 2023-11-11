import React, { useRef, useEffect } from "react";
import Viewer from "viewerjs";

const DocumentViewer = ({ fileUrl }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const viewer = new Viewer(document.getElementById('viewer'), {
      url: fileUrl,
      title: true,
      toolbar: true,
      navbar: true,
      shown: function () {
        // console.log('Viewer shown');
      }
    });
    
  }, []);
  // console.log("loaded", fileUrl);
  return <div id="viewer"></div>;
};

export default DocumentViewer;