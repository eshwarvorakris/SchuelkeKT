const AWS = require("aws-sdk");
const { deleteFileFromS3 } = require("../lib/helpers");

const bucketName = process.env.AWS_BUCKETNAME;

const awsConfig = {
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
};

const S3 = new AWS.S3(awsConfig);

//upload to s3
const uploadToS3 = (fileData, fileName, mimetype) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileData,
      ContentType: mimetype
    };
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(data);
      return resolve(data);
    });
  });
};

exports.uploadFile = async function (req, res) {
  console.log(req.file);

  if (req.file) {
    const fileNameAr = req.file.originalname.split('.');
    const fileExt = fileNameAr[fileNameAr.length - 1];
    var fileNameFull = "";
    let fileName = "";
    if(req.body?.fileKey)
    {
      fileNameFull = req.body?.fileKey;
    }
    else {
      let fileFolder = "other";
      if (req.body?.filefolder) {
        fileFolder = req.body.filefolder;
      }
      fileName = Date.now().toString() + '.' + fileExt;
      if (req.body?.filename) {
        fileName = req.body?.filename + '.' + fileExt;
      }
      fileNameFull = req.userId + '/' + fileFolder + '/' + fileName;
    }
    
    // if (req.body?.filename) {
    //   fileName = req.userId + '/' + req.body?.filename + '.' + fileExt;
    // }
    // else {
    //   fileName = req.userId + '/' + fileType + '/' + fileName;
    // }
    console.log("file full-> ", fileNameFull);
    const s3out = await uploadToS3(req.file.buffer, fileNameFull, req.file.mimetype);
    s3out.fileExt = fileExt;
    s3out.fileName = fileName;
    res.send({data:s3out});
  }
  else {
    res.status(422).send({
      msg: "Image Not uploaded",
    });
  }
};


exports.deleteFile = async function(req,res){
  const file = req.body.file;
  deleteFileFromS3(file,(error,data)=>{
    if(error){
        return res.send({error:"Can not delete file, Please try again later"});
    }
    return res.send({message:"File has been deleted successfully"});
})
}