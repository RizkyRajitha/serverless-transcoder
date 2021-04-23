const { spawnSync } = require("child_process");

/**
 * ffmpeg commands to transocde a fole 480p
 * @param {*} path
 */
function transcode(path) {
  var ff = spawnSync(
    "/opt/ffmpeg/ffmpeg",
    [
      "-i",
      // "-hide_banner ",
      `${path}`,
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
      "/tmp/720p_%03d.ts",
      "/tmp/720pasasasa.m3u8",
    ],
    { encoding: "utf8" }
  );
  console.log("stdout here: \n" + ff.stdout);
  console.log(ff);
}

module.exports.transcode = transcode;
