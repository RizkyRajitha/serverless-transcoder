const fsp = require("fs").promises;
const fs = require("fs");
const AWS = require("aws-sdk");
const IAMKEY = process.env.S3INPUTIAMKEY;
const IAMSECRET = process.env.S3INPUTIAMSECRET;
const BUCKET_NAME = "resource-platform-vod-input";

AWS.config.update({
    region: "us-east-1",
  accessKeyId: IAMKEY,
  secretAccessKey: IAMSECRET,
});

let s3bucket = new AWS.S3({
  accessKeyId: IAMKEY,
  secretAccessKey: IAMSECRET,
});

/**
 * download Object from s3 bucket
 * @param {*} key
 * @param {*} downloadPath
 * @returns
 */
function downloadObject(key, downloadPath) {
  return new Promise(async (resolve, reject) => {
    try {
      const s3Object = await s3bucket
        .getObject({ Bucket: BUCKET_NAME, Key: key })
        .promise();
      let writeFiles = await fsp.writeFile(
        `${downloadPath}/${key}`,
        s3Object.Body
      );
      console.log(writeFiles);
      resolve({ done: "done" });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

module.exports.downloadObject = downloadObject;
