const { spawnSync } = require("child_process");

/**
 * present working directory
 */

function pwd() {
  let pwd = spawnSync("pwd", {
    encoding: "utf8",
  });
  console.log("stdout here: \n" + pwd.stdout);
  console.log(pwd);
}

// pwd();
module.exports.pwd = pwd;
