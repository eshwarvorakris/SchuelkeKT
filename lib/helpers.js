const AWS = require("aws-sdk");

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

const deleteFileFromS3 = (key,next) =>{
  const deleteParams = {
      Bucket: bucketName,
      Key:key,
  };
  S3.deleteObject(deleteParams,(error,data)=>{

      next(error,data);
  });
}

const getPaginate = function (queryData, page = 0, limit = 15) {
    const { count: total, rows: data } = queryData;
    const current_page = page + 1;
    const total_page = Math.ceil(total / limit);

    return { data, meta: { total, current_page, total_page, from: (page * limit) + 1, to: (total > (page * limit)) ? total : (current_page * limit) } };
}

const generateUploadFileName = () => {
  const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  return result + new Date().toISOString().replace(/[-:.]/g, "");
}

async function sendMail(emailTo, mailSubject, mailHtml) {
    const nodemailer = require('nodemailer');
    //console.log("====================================mail triggered===============================");
    // let config = {
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     secure: process.env.EMAIL_SECURE, // true for 465, false for other ports
    //     auth: {
    //         user: process.env.EMAIL_USER, // generated ethereal user
    //         pass: process.env.EMAIL_PASS, // generated ethereal password
    //     },
    // }
    let config = {
        service: "Outlook365",
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASS, // generated ethereal password
        },
    }
    let transporter = nodemailer.createTransport(config);


    let message = {
        from: process.env.EMAIL_FROM, // sender address
        to: emailTo, // list of receivers
        subject: mailSubject, // Subject line
        html: mailHtml, // html body
    }


    transporter.sendMail(message).then((info) => {
        console.log("====================================mail sent===============================", info);
        return {
            msg: "message sent"
        }
    }).catch(error => {
        console.log("====================================mailerroor===============================");
        console.log(error)
        return {
            msg: "message not sent",
            error: error
        }
    })
}
module.exports = { getPaginate, sendMail , uploadToS3 ,deleteFileFromS3, generateUploadFileName}