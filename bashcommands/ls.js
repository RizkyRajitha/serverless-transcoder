const { spawnSync } = require("child_process");

/**
 * list directory
 * @param {String} path
 */
function ls(path) {
  let ls = spawnSync("ls", ["-l", `${path}`], {
    encoding: "utf8",
  });
  console.log(`ls (${path}): \n ${ls.stdout}`);
}

module.exports.ls = ls;
