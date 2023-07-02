const { execSync } = require("child_process");

function runCommand(command) {
  execSync(command, { windowsHide: true, stdio: "ignore" });
}

module.exports = runCommand;
