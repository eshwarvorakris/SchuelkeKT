async storeModuleContent(req, res) {
    var allContentCount = 0;
    var addedContentCount = 0;
    let fileUploadQueue = [];
    let allPromises = [];

    



    const allContentUpload = req.body.content.map(async (element, index) => {
      let content_id = "";
      allContentCount++;
      element.order = index + 1;

      let filesToUpload = [...req.files];

       fileUploadQueue = filesToUpload.map(async (uploadedFile)=>{

        if(uploadedFile.fieldname === `carousel_image_one_${index}`)
        {
          if(uploadedFile != undefined)
          {
            const fileNameAr =
            uploadedFile.originalname.split(".");
              const fileExt = fileNameAr[fileNameAr.length - 1];
              const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
              const random = (
                "abcdefghijklmnopqrstuvwxyz" + Math.round(Math.random() * 5000)
              ).substring(2, 8);
              const fileName = timestamp + random + "." + fileExt;
    
              try {
                const uploadResponse = await uploadToS3(
                  uploadedFile.buffer,
                  fileName,
                  uploadedFile.mimeType
                )
                console.log(uploadResponse);
                element[uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2)] = uploadResponse.Location;
                console.log('column-name');
      
                  console.log(uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2));
                allPromises.push(uploadResponse);   
                // return uploadResponse;
              } catch (error) {
                console.log(error);
                return error;
              }
              
              }  
        }
        if(uploadedFile.fieldname === `carousel_image_two_${index}`)
        {
          if(uploadedFile != undefined)
          {
            const fileNameAr =
            uploadedFile.originalname.split(".");
              const fileExt = fileNameAr[fileNameAr.length - 1];
              const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
              const random = (
                "abcdefghijklmnopqrstuvwxyz" + Math.round(Math.random() * 5000)
              ).substring(2, 8);
              const fileName = timestamp + random + "." + fileExt;
    
              try {
                const uploadResponse = await uploadToS3(
                  uploadedFile.buffer,
                  fileName,
                  uploadedFile.mimeType
                )
                console.log(uploadResponse);
                element[uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2)] = uploadResponse.Location;
                console.log('column-name');
      
                  console.log(uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2));
                allPromises.push(uploadResponse);   
                // return uploadResponse;
              } catch (error) {
                console.log(error);
                return error;
              }
              
              }  
        }
        if(uploadedFile.fieldname === `carousel_image_three_${index}`)
        {
          if(uploadedFile != undefined)
          {
            const fileNameAr =
            uploadedFile.originalname.split(".");
              const fileExt = fileNameAr[fileNameAr.length - 1];
              const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
              const random = (
                "abcdefghijklmnopqrstuvwxyz" + Math.round(Math.random() * 5000)
              ).substring(2, 8);
              const fileName = timestamp + random + "." + fileExt;
    
              try {
                const uploadResponse = await uploadToS3(
                  uploadedFile.buffer,
                  fileName,
                  uploadedFile.mimeType
                )
                console.log(uploadResponse);
                element[uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2)] = uploadResponse.Location;
                console.log('column-name');
      
                  console.log(uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2));
                allPromises.push(uploadResponse);   
                // return uploadResponse;
              } catch (error) {
                console.log(error);
                return error;
              }
              
              }  
        }
        if(uploadedFile.fieldname === `carousel_image_four_${index}`)
        {
          if(uploadedFile != undefined)
          {
            const fileNameAr =
            uploadedFile.originalname.split(".");
              const fileExt = fileNameAr[fileNameAr.length - 1];
              const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
              const random = (
                "abcdefghijklmnopqrstuvwxyz" + Math.round(Math.random() * 5000)
              ).substring(2, 8);
              const fileName = timestamp + random + "." + fileExt;
    
              try {
                const uploadResponse = await uploadToS3(
                  uploadedFile.buffer,
                  fileName,
                  uploadedFile.mimeType
                )
                console.log(uploadResponse);
                element[uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2)] = uploadResponse.Location;
                console.log('column-name');
      
                  console.log(uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2));
                allPromises.push(uploadResponse);   
                // return uploadResponse;
              } catch (error) {
                console.log(error);
                return error;
              }
              
              }  
        }
        if(uploadedFile.fieldname === `carousel_image_five_${index}`)
        {
          if(uploadedFile != undefined)
          {
            const fileNameAr =
            uploadedFile.originalname.split(".");
              const fileExt = fileNameAr[fileNameAr.length - 1];
              const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
              const random = (
                "abcdefghijklmnopqrstuvwxyz" + Math.round(Math.random() * 5000)
              ).substring(2, 8);
              const fileName = timestamp + random + "." + fileExt;
    
              try {
                const uploadResponse = await uploadToS3(
                  uploadedFile.buffer,
                  fileName,
                  uploadedFile.mimeType
                )
                console.log(uploadResponse);
                element[uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2)] = uploadResponse.Location;
                console.log('column-name');
      
                  console.log(uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2));
                allPromises.push(uploadResponse);   
                // return uploadResponse;
              } catch (error) {
                console.log(error);
                return error;
              }
              
              }  
        }
        if(uploadedFile.fieldname === `content_video_${index}`)
        {
          if(uploadedFile != undefined)
          {
            const fileNameAr =
            uploadedFile.originalname.split(".");
              const fileExt = fileNameAr[fileNameAr.length - 1];
              const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
              const random = (
                "abcdefghijklmnopqrstuvwxyz" + Math.round(Math.random() * 5000)
              ).substring(2, 8);
              const fileName = timestamp + random + "." + fileExt;
    
              try {
                const uploadResponse = await uploadToS3(
                  uploadedFile.buffer,
                  fileName,
                  uploadedFile.mimeType
                )
                console.log(uploadResponse);
                element[uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2)] = uploadResponse.Location;
                console.log('column-name');
      
                  console.log(uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2));
                allPromises.push(uploadResponse);   
                // return uploadResponse;
              } catch (error) {
                console.log(error);
                return error;
              }
              
              }  
        }
        if(uploadedFile.fieldname === `file_url_${index}`)
        {
          if(uploadedFile != undefined)
          {
            const fileNameAr =
              uploadedFile.originalname.split(".");
              const fileExt = fileNameAr[fileNameAr.length - 1];
              
              // const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
              // const random = (
              //   "abcdefghijklmnopqrstuvwxyz" + Math.round(Math.random() * 5000)
              // ).substring(2, 8);
              const fileName = generateUploadFileName() +  "6." + fileExt;
    
              try {
                const uploadResponse = await uploadToS3(
                  uploadedFile.buffer,
                  fileName,
                  uploadedFile.mimeType
                )
                console.log(uploadResponse);
                element[uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2)] = uploadResponse.Location;
                console.log('column-name');
      
                  console.log(uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2));
                allPromises.push(uploadResponse);   
                // // return uploadResponse;
              } catch (error) {
                console.log(error);
                return error;
              }
              
              }  
        }
        if(uploadedFile.fieldname === `banner_url_${index}`)
        {
          if(uploadedFile != undefined)
          {
            const fileNameAr =
              uploadedFile.originalname.split(".");
              const fileExt = fileNameAr[fileNameAr.length - 1];
              
              // const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
              // const random = (
              //   "abcdefghijklmnopqrstuvwxyz" + Math.round(Math.random() * 5000)
              // ).substring(2, 8);
              const fileName = generateUploadFileName() +  "6." + fileExt;
    
              try {
                const uploadResponse = await uploadToS3(
                  uploadedFile.buffer,
                  fileName,
                  uploadedFile.mimeType
                )
                console.log(uploadResponse);
                element[uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2)] = uploadResponse.Location;
                console.log('column-name');
      
                  console.log(uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2));
                allPromises.push(uploadResponse);   
                // // return uploadResponse;
              } catch (error) {
                console.log(error);
                return error;
              }
              
              }  
        }
      });

      if(element?.id != "") {
        console.log('upload-queue');
        console.log(fileUploadQueue);
         Promise.allSettled(fileUploadQueue).then(async(result)=>{
          const contentDet = await Content.findByPk(element.id);
          content_id = element.id;
  
          await Do.destroy({
            where: {
              content_id: element.id,
            },
          });
          await Dont.destroy({
            where: {
              content_id: element.id,
            },
          });
  
          if (contentDet) {
            Promise.allSettled(fileUploadQueue).then(async (result) => {
              const updateResponse = await contentDet.update(element);
  
              if (element.do != undefined) {
                element.do.forEach(async (value) => {
                  if (value != "" && value != null) {
                    let data = {
                      content_id: element.id,
                      title: value,
                    };
                    const res = await Do.create(data);
                    console.log(res);
                  }
                });
              }
              if (element.dont != undefined) {
                element.dont.forEach(async (value) => {
                  if (value != "" && value != null) {
                    let data = {
                      content_id: element.id,
                      title: value,
                    };
                    const res = await Dont.create(data);
                    console.log(res);
                  }
                });
              }
                  
            });
            
          } else {
            delete element.id; 
  
            Promise.allSettled(fileUploadQueue).then(async (result) => {
              await Content.create(element).then((result) => {
                addedContentCount++;
                if (element.do != undefined) {
                  element.do.forEach(async (value) => {
                    if (value != "" && value != null) {
                      let data = {
                        content_id: result.dataValues.id,
                        title: value,
                      };
                      const res = await Do.create(data);
                      console.log(res);
                    }
                  });
                }
                if (element.dont != undefined) {
                  element.dont.forEach(async (value) => {
                    if (value != "" && value != null) {
                      let data = {
                        content_id: result.dataValues.id,
                        title: value,
                      };
                      const res = await Dont.create(data);
                      console.log(res);
                    }
                  });
                }
                
              });
            });
          }
        });
        
      } else {
        delete element.id;
       
         Promise.allSettled(fileUploadQueue).then(async (result) => {
          Content.create(element).then((result) => {
            addedContentCount++;

            if (element.do != undefined) {
              element.do.forEach(async (value) => {
                if (value != "" && value != null) {
                  let data = {
                    content_id: result.dataValues.id,
                    title: value,
                  };
                  const res = await Do.create(data);
                  console.log(res);
                }
              });
            }

            if (element.dont != undefined) {
              element.dont.forEach(async (value) => {
                if (value != "" && value != null) {
                  let data = {
                    content_id: result.dataValues.id,
                    title: value,
                  };
                  const res = await Dont.create(data);
                  console.log(res);
                }
              });
            }

          });
        });
      }

    });
    console.log('promises');
    console.log(fileUploadQueue);
    Promise.allSettled(fileUploadQueue).then(async (result) =>{
      // Promise.al
      res.send(
        "allcontents = " +
          allContentCount +
          " added content = " +
          addedContentCount
      );
    })

    //console.clear();
    //console.log("allcontents = " + allContentCount + " added content = " + addedContentCount);
  }