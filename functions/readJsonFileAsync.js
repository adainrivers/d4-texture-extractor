const fs = require('fs').promises;

async function readJsonFileAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    throw error;
  }
}

module.exports = readJsonFileAsync;
