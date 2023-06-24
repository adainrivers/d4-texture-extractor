const fs = require('fs');

function moveFile(sourcePath, destinationPath) {
  return new Promise((resolve, reject) => {
    fs.copyFile(sourcePath, destinationPath, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = moveFile;