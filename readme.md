## Serverless video transcoder using AWS lambda function and FFmpeg triggered on s3 bucket event


AWS lambda function is written in javascript using serverless framework
lambda function uses a FFmpeg layer for the ffmpeg library

1. in an s3 bucket upload file invocation this lambda function will run
2. lambda function will download the file and store it in `/tmp` directory
3. pass the video to the [transcode](./transcode.js) file, for ffmpeg library to transcode
4. ffmpeg will save all the transcoded files in the destination directory
5. after transcoding all the files inside the destination directory will be uploaded to another AWS s3 bucket (to avoid self invocation)

bash commands are in `bashcommands` directory
aws functions (upload to s3 bucket and download from s3 bucket) are in `s3` directory
