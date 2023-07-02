const config = require('../config');
const fs = require('fs/promises');
const path = require('path');

async function getTextureDataFilesAsync(){
    const files = await fs.readdir(config.textureDataFolder);
    return files.filter(file => path.extname(file) === '.json');
}

module.exports = getTextureDataFilesAsync;