// const AWS = require("aws-sdk");
const { transcode } = require("./transcode");
const { ls } = require("./bashcommands/ls");
// const BUCKET_NAME = "resource-platform-vod";
// const IAMKEY = process.env.IAMKEY;
// const IAMSECRET = process.env.IAMSECRET;
// const API = "https://backerly.herokuapp.com";
// const jwt = "";
const env = process.env.NODE_ENV || "dev";

const { downloadFile } = require("./downloadfile");
const { mkdir } = require("./bashcommands/mkdir");
const { pwd } = require("./bashcommands/pwd");

module.exports.hello = async (event) => {
  try {
    if (env === "dev") {
      await mkdir("video720p");
      await transcode("video1080p.mp4", "video720p", "reansoc");
    } else {
      await downloadFile(
        "https://filesamples.com/samples/video/mp4/sample_1280x720.mp4",
        "/tmp/vidoe2.mp4"
      );
      pwd();
      ls("/tmp");
      await mkdir("/tmp/video720p");
      ls("/tmp");
      ls("/opt/ffmpeg");
      ls("/opt");
      ls("/opt/ffmpeg");
      await transcode("/tmp/vidoe2.mp4", "/tmp/video720p", "reansoc");
      // transcode("/tmp/vidoe2.mp4");
      ls("/tmp");
      ls("/tmp/video720p");
    }
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
