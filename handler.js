// const AWS = require("aws-sdk");
const { transcode } = require("./transcode");
const { ls } = require("./ls");
// const BUCKET_NAME = "resource-platform-vod";
// const IAMKEY = process.env.IAMKEY;
// const IAMSECRET = process.env.IAMSECRET;
// const API = "https://backerly.herokuapp.com";
// const jwt = "";

const { downloadFile } = require("./downloadfile");
const { mkdir } = require("./mkdir");

module.exports.hello = async (event) => {
  try {
    // await downloadFile(
    //   "https://filesamples.com/samples/video/mp4/sample_1280x720.mp4",
    //   "/tmp/vidoe2.mp4"
    // );
    ls("/tmp");
    mkdir("~/tmp/video1");
    ls("/tmp");
    ls("/opt/ffmpeg");
    ls("/opt");
    // ls("/opt/ffmpeg");
    // transcode("/tmp/vidoe2.mp4");
    // ls("/tmp");
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
