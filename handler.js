const { transcode } = require("./transcode");
const { ls } = require("./bashcommands/ls");
const env = process.env.NODE_ENV || "dev";
const { mkdir } = require("./bashcommands/mkdir");
const { uploadFolder } = require("./s3/uploadtos3");
const { downloadObject } = require("./s3/downloadFromS3");
const { rm } = require("./bashcommands/rm");
let transcodeInProgress = false;

module.exports.hello = async (event, context) => {
  console.log(event);
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

  console.log(event.Records[0].s3.object.key)

  let sourceFileName = event.Records[0].s3.object.key 
  // decodeURIComponent(
  //   event.Records[0].s3.object.key.replace(/\+/g, " ")
  // );

  console.log("source filename - "+sourceFileName);

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

  try {
    console.log(env);
    if (env === "dev") {
      // await mkdir("video720p");
      // await transcode("video1080p.mp4", "video720p", "reansoc");
    } else {
      console.log("initializing download object from s3");
      console.log("transcoding status - " + transcodeInProgress);

      await downloadObject(sourceFileName, `/tmp`);
      console.log("downloaded object from s3");
      console.log("ls temp");

      ls("/tmp");
      console.log("create dir");
      await mkdir("/tmp/video720p");
      console.log("ls temp");
      ls("/tmp");

      console.log("start transcoding");

      let outfilename = sourceFileName.replace(/\s/g, "");

      transcodeInProgress = true;
      
      transcode(`/tmp/${sourceFileName}`, "/tmp/video720p", outfilename);
      transcodeInProgress = false;

      console.log("end transcoding");

      ls("/tmp");
      ls("/tmp/video720p");
      await uploadFolder("/tmp/video720p", outfilename);
      console.log("cleanup tmp folder");
      rm("/tmp/*");
      console.log("ls temp");
      ls("/tmp");

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
    console.log("cleanup tmp folder");
    rm("/tmp/*");
    console.log("ls temp");
    ls("/tmp");

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
