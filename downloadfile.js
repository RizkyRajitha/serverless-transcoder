const fs = require("fs");
const axios = require("axios").default;
// exam-ple
// // await downloadFile(
// //   // "https://filesamples.com/samples/video/mp4/sample_1280x720.mp4",
// //   // "https://filesamples.com/samples/video/mp4/sample_1280x720_surfing_with_audio.mp4",
// //   "/tmp/vidoe2.mp4"
// // );

/**
 * download a File from URL
 * @param {String} url
 * @param {String} path
 * @returns
 */
async function downloadFile(url, path) {
  const writer = fs.createWriteStream(path);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

module.exports.downloadFile = downloadFile;
