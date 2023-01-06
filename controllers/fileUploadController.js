const AWS = require("aws-sdk");
let multer = require("multer");

const bucketName = process.env.AWS_BUCKETNAME;

const awsConfig = {
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
};

const S3 = new AWS.S3(awsConfig);
//Specify the multer config
let upload = multer({
  // storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, done) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      done(null, true);
    } else {
      //prevent the upload
      var newError = new Error("File type is incorrect");
      newError.name = "MulterError";
      done(newError, false);
    }
  },
});

//upload to s3
const uploadToS3 = (fileData, fileName) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileData,
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
  //console.log(req.file.originalname);

  if (req.file) {
    const fileNameAr = req.file.originalname.split('.');
    const fileExt = fileNameAr[fileNameAr.length - 1];

    let fileType = "other";
    let fileName = Date.now().toString() + '.' + fileExt;
    if (req.body?.filetype) {
      fileType = req.body.filetype;
    }

    if (req.body?.filename) {
      fileName = req.userId + '/' + req.body?.filename + '.' + fileExt;
    }
    else {
      fileName = req.userId + '/' + fileType + '/' + fileName;
    }
    console.log(fileName);
    const s3out = await uploadToS3(req.file.buffer, fileName);
    res.send(s3out);
  }
  else {
    res.send({
      msg: "Image uploaded succesfully",
    });
  }
};