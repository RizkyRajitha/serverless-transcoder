const AWS = require("aws-sdk");
const IAMKEY = process.env.IAMKEY;
const IAMSECRET = process.env.IAMSECRET;
const BUCKET_NAME = "resource-platform-vod";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: IAMKEY,
  secretAccessKey: IAMSECRET,
});

let s3bucket = new AWS.S3({
  accessKeyId: IAMKEY,
  secretAccessKey: IAMSECRET,
});

function uploadFile(key, fileName) {
  return new Promise((resolve, reject) => {
    // Read content from the file
    console.log(key, fileName);
    const fileContent = fs.readFileSync(`/tmp/${fileName}`);
    // Setting up S3 upload parameters
    const params = {
      Bucket: BUCKET_NAME,
      Key: key, // File name you want to save as in S3
      Body: fileContent,
    };
    // Uploading files to the bucket
    s3bucket
      .upload(params)
      .promise()
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

module.exports.uploadFile = uploadFile;
