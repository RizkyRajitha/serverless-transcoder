const fsp = require("fs").promises;
const fs = require("fs");
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

/**
 * upload Folder to s3 bucket
 * @param {*} folderPath
 * @param {*} fileName
 * @returns
 */
function uploadFolder(folderPath, fileName) {
  let datenow = new Date();

  let fileprefix = `${datenow.getDate()}${datenow.getMonth()}${datenow.getFullYear()}${datenow.getHours()}${datenow.getMinutes()}${datenow.getSeconds()}${datenow.getMilliseconds()}`;
  let proarr = [];

  return new Promise((resolve, reject) => {
    fs.readdirSync(folderPath).map(async (file) => {
      console.log(file);
      let key = `${fileName}-${fileprefix}/${file}`;
      let uploadPromise = uploadFile(key, folderPath, file);
      try {
        let uploads = await Promise.all(proarr);
        console.log("s3");
        console.log(uploads);
        resolve(uploads);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

    // console.log(redda);
    // proarr.push(redda);
  });
}

/**
 * upload file to s3
 * @param {*} key
 * @param {*} filePath
 * @param {*} fileName
 * @returns <promise>
 */
function uploadFile(key, filePath, fileName) {
  return new Promise(async (resolve, reject) => {
    // Read content from the file

    console.log(key, filePath, fileName);
    try {
      const fileContent = await fsp.readFile(`${filePath}${fileName}`);

      // const fileContent = fs.readFileSync(`/tmp/${fileName}`);
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
    } catch (error) {
      console.log(error);
    }
  });
}
// uploadFolder("", "adda");
module.exports.uploadFolder = uploadFolder;
