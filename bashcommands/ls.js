const { spawnSync } = require("child_process");

/**
 * list directory
 * @param {String} path
 */
function ls(path) {
  let ls = spawnSync("ls", ["-l", `${path}`], {
    encoding: "utf8",
  });
  console.log("stdout here: \n" + ls.stdout);
}

module.exports.ls = ls;
