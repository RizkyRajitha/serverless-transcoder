// const AWS = require("aws-sdk");
const { transcode } = require("./transcode");
const { ls } = require("./bashcommands/ls");
const env = process.env.NODE_ENV || "dev";
// const { downloadFile } = require("./downloadfile");
const { mkdir } = require("./bashcommands/mkdir");
const { pwd } = require("./bashcommands/pwd");
const { uploadFolder } = require("./uploadtos3");
const { downloadObject } = require("./downloadFromS3");

module.exports.hello = async (event, context) => {
  console.log(event);
  console.log("contetx");
  // console.log(context);
  console.log(event.s3);
  console.log(JSON.stringify(event));

  if (!event.Records) {
    console.log("not an s3 invocation!");
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "not an s3 invocation!",
          input: event,
        },
        null,
        2
      ),
    };
  }

  if (event.Records.length !== 1) {
    console.log("record error");
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Error : record error",
          input: event,
        },
        null,
        2
      ),
    };
  }

  let sourceFileName = event.Records[0].s3.object.key;
  console.log(sourceFileName);
  console.log(sourceFileName.endsWith(".mp4"));

  if (!sourceFileName.endsWith(".mp4")) {
    console.log("file format error");
    console.log(String(sourceFileName).split(".").pop());
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Error : file format error",
          input: event,
        },
        null,
        2
      ),
    };
  }

  // s3_source_bucket = event["Records"][0]["s3"]["bucket"]["name"];
  // s3_source_key = event["Records"][0]["s3"]["object"]["key"];

  // return;

  try {
    console.log(env);
    if (env === "dev") {
      // await mkdir("video720p");
      // await transcode("video1080p.mp4", "video720p", "reansoc");
    } else {
      console.log("initializing download object from s3");

      await downloadObject(sourceFileName, `/tmp`);
      console.log("downloaded object from s3");

      console.log("ls temp");

      // // await downloadFile(
      // //   // "https://filesamples.com/samples/video/mp4/sample_1280x720.mp4",
      // //   // "https://filesamples.com/samples/video/mp4/sample_1280x720_surfing_with_audio.mp4",
      // //   "/tmp/vidoe2.mp4"
      // // );
      // // pwd();
      ls("/tmp");
      console.log("create dir");
      await mkdir("/tmp/video720p");
      console.log("ls temp");
      ls("/tmp");
      // // ls("/opt/ffmpeg");
      // // ls("/opt");
      // // ls("/opt/ffmpeg");
      console.log("start transcoding");
      transcode(`/tmp/${sourceFileName}`, "/tmp/video720p", "reansoc");
      console.log("end transcoding");
      // await transcode("/tmp/vidoe2.mp4", "/tmp/video720p", "reansoc");
      // // transcode("/tmp/vidoe2.mp4");
      // ls("/tmp");
      // ls("/tmp/video720p");
      // await uploadFolder("/tmp/video720p", "ultralegendpro");

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
    }
  } catch (error) {
    console.log(error);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Error",
          input: event,
          error,
        },
        null,
        2
      ),
    };
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

  // Use this code if you don't use the http ,context with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', ,context };
};
