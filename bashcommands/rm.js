const { spawnSync } = require("child_process");

/**
 * remove all the contetns inside directory
 * path
 */

function rm(path) {
  // "mkdir", [`${path}`],
  let rm = spawnSync("rm", ["-rf", `${path}`], {
    encoding: "utf8",
  });

  console.log(`rm ${path} : \n ${rm.stdout}`);
  console.log(rm);
}

// rm();
module.exports.rm = rm;
