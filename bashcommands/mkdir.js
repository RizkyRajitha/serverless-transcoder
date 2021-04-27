const { spawnSync } = require("child_process");

/**
 * list directory
 * @param {String} path
 */
function mkdir(path) {
  let mkdir = spawnSync("mkdir ", [`${path}`], {
    encoding: "utf8",
  });

  // mkdir.
  console.log("mkdir here: \n" + mkdir.stdout);
  console.log(mkdir);
  // console.log(mkdir.error);

  return new Promise((resolve, reject) => {
    if (mkdir.stderr) {
      reject(mkdir.stderr);
      return;
    }

    resolve(mkdir.stdout);
  });
}

// mkdir("layer/adadd");
module.exports.mkdir = mkdir;
