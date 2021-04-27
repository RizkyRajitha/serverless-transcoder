const { spawnSync } = require("child_process");

/**
 * remove all the contetns inside directory
 * path
 */

function rm(path) {
  let rm = spawnSync(`rm -r ${path}`, {
    encoding: "utf8",
  });

  console.log(`rm ${path} : \n ${rm.stdout}`);

  // console.log(rm);
}

// rm();
module.exports.rm = rm;
