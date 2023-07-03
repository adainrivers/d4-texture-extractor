const { options } = require('../options');
const fs = require('fs/promises');
const path = require('path');

async function getTextureDataFilesAsync(){
    const files = await fs.readdir(options.textureDataFolder);
    return files.filter(file => path.extname(file) === '.tex');
}

module.exports = getTextureDataFilesAsync;