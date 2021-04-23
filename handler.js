const AWS = require("aws-sdk");
const { transcode } = require("./transcode");
const BUCKET_NAME = "resource-platform-vod";
const IAMKEY = process.env.IAMKEY;
const IAMSECRET = process.env.IAMSECRET;
const API = "https://backerly.herokuapp.com";
const jwt = "";

const { downloadFile } = require("./downloadfile");

module.exports.hello = async (event) => {
  try {
    await downloadImage(
      "https://filesamples.com/samples/video/mp4/sample_1280x720.mp4",
      "/tmp/vidoe2.mp4"
    );

    transcode("/tmp/vidoe2.mp4");
    
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
