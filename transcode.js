const { spawnSync } = require("child_process");
const env = process.env.NODE_ENV || "dev";

const ffmpegPath =
  env === "dev" ? __dirname + "/layer/ffmpeg/ffmpeg" : "/opt/ffmpeg/ffmpeg";

/**
 * ffmpeg commands to transocde a fole 360p
 * @param {String} filePath
 * @param {String} outputPath
 * @param {String} outputFilename
 */
function transcode(filePath, outputPath, outputFilename) {
  console.log("starting transcoding..");
  let ff = spawnSync(
    ffmpegPath,
    [
      "-i",
      // "-hide_banner ",
      `${filePath}`,
      "-vf",
      "scale=w=640:h=360:force_original_aspect_ratio=decrease",
      "-c:a",
      "aac",
      "-ar",
      "48000",
      "-b:a",
      "128k",
      "-c:v",
      "h264",
      "-profile:v",
      "main",
      "-crf",
      "20",
      "-g",
      "48",
      "-keyint_min",
      "48",
      "-sc_threshold",
      "0",
      "-b:v",
      "2500k",
      "-maxrate",
      "2675k",
      "-bufsize",
      "3750k",
      "-hls_time",
      "4",
      "-hls_playlist_type",
      "vod",
      "-hls_segment_filename",
      `${outputPath}/${outputFilename}360p_%03d.ts`,
      `${outputPath}/${outputFilename}360p.m3u8`,
      // "/tmp/720p_%03d.ts",
      // "/tmp/720pasasasa.m3u8",
    ],
    { encoding: "utf8" }
  );
  console.log(" transcoding compleated");
  console.log("stdout here: \n" + ff.stdout);
  console.log(ff);
  // return new Promise((resolve, reject) => {
  //   if (ff.stderr) {
  //     reject(ff.stderr);
  //     return;
  //   }

  //   resolve(ff.stdout);
  // });
}

module.exports.transcode = transcode;
