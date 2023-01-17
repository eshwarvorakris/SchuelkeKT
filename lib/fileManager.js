const AWS = require("aws-sdk");
const _ = require("lodash");

const bucketName = process.env.AWS_BUCKETNAME;

const awsConfig = {
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
};

const S3 = new AWS.S3(awsConfig);

const fileManager = class {
  upload = async function (file) {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: bucketName,
        Key: file.name,
        Body: _.toArray(file),
      };
      console.log(params);
      S3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(data);
        return resolve(data);
      });
    });
  }
}
module.exports = new fileManager()