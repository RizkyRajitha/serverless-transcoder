const { spawnSync } = require("child_process");

/**
 * list directory
 * @param {String} path
 */
function mkdir(path) {
  let mkdir = spawnSync("mkdir", [`${path}`], {
    encoding: "utf8",
  });
  console.log("stdout here: \n" + mkdir.stdout);
  console.log(mkdir);
}

// mkdir("layer/adadd");
module.exports.mkdir = mkdir;
