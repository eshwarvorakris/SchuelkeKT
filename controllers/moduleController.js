const validator = require("Validator");
const _ = require("lodash");
const { getPaginate, uploadToS3, generateUploadFileName } = require("../lib/helpers");
const Module = require("../models/Module.model");
const Course = require("../models/Course.model");
const Content = require("../models/Module_content.model");
const { promises } = require("nodemailer/lib/xoauth2");
const Do = require("../models/Do");
const Dont = require("../models/Dont");
const { request } = require("express");
const moduleController = class {
  async index(req, res) {
    await Module.findAndCountAll({
      include: ["course"],
      offset: pageNumber * pageLimit,
      limit: pageLimit,
      where: req.query,
      order: [orderByColumn],
    })
      .then((result) => {
        res.send(getPaginate(result, pageNumber, pageLimit));
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async store(req, res) {
    let sequence_no = await Module.max("sequence_no", {
      where: { course_id: req.body.course_id },
    });
    if (sequence_no === null || sequence_no == 0) {
      sequence_no = 0;
    }
    sequence_no++;
    req.body.sequence_no = sequence_no;
    //console.log("module sequence", sequence_no);
    const data = req.body;
    const rules = {
      module_name: "required",
      //description: "required"
    };
    const validation = validator.make(data, rules);
    if (validation.fails()) {
      return res.status(422).send({
        message: _.chain(validation.getErrors()).flatMap().head(),
        errors: validation.getErrors(),
      });
    }
    await Module.create(req.body)
      .then(async (result) => {
        const moduleCount = await Module.count({
          where: { course_id: req.body.course_id },
        });
        await Course.update(
          { total_modules: moduleCount },
          { where: { id: req.body.course_id } }
        );
        res.send(result);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  }
  async show(req, res) {
    const module = await Module.findByPk(req.params.id);
    if (module) {
      return res.send({ data: module });
    }
    return res.status(422).send({
      message: "Module not Found",
    });
  }
  async update(req, res) {
    const module = await Module.findByPk(req.params.id);
    if (module) {
      module.update(req.body);
      return res.send({ data: module });
    }
    return res.status(422).send({
      message: "Module not update",
    });
  }

  async updateAll(req, res) {
    //console.log(req.body);
    let updated = 0;
    let notUpdated = 0;
    req.body.modules.forEach(async (curModule) => {
      const module = await Module.findByPk(curModule.id);
      if (module) {
        module.update(curModule);
        updated++;
      } else {
        notUpdated++;
      }
      //console.log("curmodule = ", curModule);
    });
    res.send({ updated: updated, notUpdated: notUpdated });
  }

  async destroy(req, res) {
    const moduleData = await Module.findByPk(req.params.id);
    //console.log("moduleData", moduleData.course_id);
    const module = await Module.destroy({ where: { id: req.params.id } }).then(
      async (result) => {
        const moduleCount = await Module.count({
          where: { course_id: moduleData.course_id },
        });
        await Course.update(
          { total_modules: moduleCount },
          { where: { id: moduleData.course_id } }
        );
        return { message: "Module Deleted" };
      }
    );
    res.send(module);
  }

  async storeModuleContent(req, res) {
    var allContentCount = 0;
    var addedContentCount = 0;
    let fileUploadQueue = [];
    let allPromises = [];
    let uploadStatus = false;

    const allContentUpload = req.body.content.map(async (element, index) => {
      let content_id = "";
      allContentCount++;
      element.order = index + 1;

      let filesToUpload = [...req.files];

      fileUploadQueue = filesToUpload.map(async (uploadedFile)=>{
        // let uploadedFile = filesToUpload.reverse().find(x => { 
        //   return x.fieldname === `carousel_image_one_${index}` || 
        //    x.fieldname === `carousel_image_two_${index}` || 
        //    x.fieldname === `carousel_image_three_${index}` || 
        //    x.fieldname === `carousel_image_four_${index}` ||
        //    x.fieldname === `carousel_image_five_${index}` ||
        //    x.fieldname === `content_video_${index}`
         
        //  })
        uploadStatus = false;
        
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
                // allPromises.push(uploadResponse);   
                return uploadResponse;
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
                // allPromises.push(uploadResponse);   
                return uploadResponse;
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
                // allPromises.push(uploadResponse);   
                return uploadResponse;
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
                // allPromises.push(uploadResponse);   
                return uploadResponse;
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
                // allPromises.push(uploadResponse);   
                return uploadResponse;
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
                element[uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2)] = uploadResponse.Location;
                console.log('column-name');
      
                  console.log(uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2));
                // allPromises.push(uploadResponse);  
                console.log('upload-response'); 
                console.log(uploadResponse);
                uploadStatus = true;
                return uploadResponse;
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
    

              console.log('file-url-mimetype ');
              console.log(uploadedFile);
              try {
                const uploadResponse = await uploadToS3(
                  uploadedFile.buffer,
                  fileName,
                  uploadedFile.mimetype
                )
                console.log(uploadResponse);
                element[uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2)] = uploadResponse.Location;
                console.log('column-name');
      
                  console.log(uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2));
                // allPromises.push(uploadResponse);   
                return uploadResponse;
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
                // // allPromises.push(uploadResponse);   
                uploadStatus = true;
                return uploadResponse;
              } catch (error) {
                console.log(error);
                return error;
              }
              
              }  
        }
        // const indexOfFile =  filesToUpload.indexOf(uploadedFile);
        // filesToUpload = filesToUpload.splice(indexOfFile,1);
      
      //    if(uploadedFile != undefined)
      // {
      //   const fileNameAr =
      //   uploadedFile.originalname.split(".");
      //     const fileExt = fileNameAr[fileNameAr.length - 1];
      //     const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
      //     const random = (
      //       "abcdefghijklmnopqrstuvwxyz" + Math.round(Math.random() * 5000)
      //     ).substring(2, 8);
      //     const fileName = timestamp + random + "." + fileExt;

      //     try {
      //       const uploadResponse = await uploadToS3(
      //         uploadedFile.buffer,
      //         fileName,
      //         uploadedFile.mimeType
      //       )
      //       console.log(uploadResponse);
      //       element[uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2)] = uploadResponse.Location;
      //       console.log('column-name');
  
      //         console.log(uploadedFile.fieldname.substring(0, uploadedFile.fieldname.length - 2));
      // //       allPromises.push(uploadResponse);   
      //       return uploadResponse;
      //     } catch (error) {
      //       console.log(error);
      //       return error;
      //     }
          
      //     }
      });

      if (element?.id != "") {
        
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
                
              allPromises.push(true);
              if(allPromises.length == req.body.content.length)
              {
                res.send(
                        "allcontents = " +
                          allContentCount +
                          " added content = " +
                          addedContentCount
                      );
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

              allPromises.push(true);
          if(allPromises.length == req.body.content.length)
          {
            res.send(
                    "allcontents = " +
                      allContentCount +
                      " added content = " +
                      addedContentCount
                  );
          }
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
          allPromises.push(true);
          if(allPromises.length == req.body.content.length)
          {
            res.send(
                    "allcontents = " +
                      allContentCount +
                      " added content = " +
                      addedContentCount
                  );
          }
        });


      }


    });

    // if(uploadStatus == true)
    // {
    //   Promise.allSettled(fileUploadQueue).then(async (result) =>{
    //     res.send(
    //       "allcontents = " +
    //         allContentCount +
    //         " added content = " +
    //         addedContentCount
    //     );
    //   })
    // }
    
  }
};

module.exports = new moduleController();
