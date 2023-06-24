const { execSync } = require("child_process");

function runCommand(command) {
  execSync(command, { stdio: "inherit" });
}

module.exports = runCommand;
