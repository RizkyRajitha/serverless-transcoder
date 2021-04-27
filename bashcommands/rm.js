const { spawnSync } = require("child_process");

/**
 * remove all the contetns inside directory
 * @param {Sting} path
 */
function rm(path) {
  // "mkdir", [`${path}`],

  // let ls = spawnSync("ls", ["-l", `${path}`], {
  //   encoding: "utf8",
  // });

  let rm = spawnSync("rm", ["-r", `${path}`], {
    encoding: "utf8",
    shell: true,
  });

  console.log(`rm ${path} : \n ${rm.stdout}`);
  console.log(rm);
}

// rm("/home/dealwithit/redda/*");
module.exports.rm = rm;
