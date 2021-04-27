const { spawnSync } = require("child_process");
// const { unlink, unlinkSync } = require("fs");

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

  // unlinkSync()

  //Backup
  //   const fs = require('fs').promises;

  // const directory = 'test';

  // fs.rmdir(directory, { recursive: true })
  //   .then(() => console.log('directory removed!'));

  console.log(`rm ${path} : \n ${rm.stdout}`);
  console.log(rm);
}

// rm("/home/dealwithit/redda/*");
module.exports.rm = rm;
