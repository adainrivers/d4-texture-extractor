const runCommand = require('./runCommand');
const { options } = require('../options');
const logger = require('./logger');
const fs = require('fs-extra');
const path = require('path');

async function extractGameFilesAsync() {
    const baseFolder = path.join(options.gameDataFolder, 'Base');
    if(fs.existsSync(baseFolder))
        await fs.remove(baseFolder);

    logger.log('extracting game texture definitions: ' + options.filter);
    runCommand(`\"${options.cascConsolePath}\" -m Pattern -e \"Base\\meta\\Texture\\${options.filter}.tex\" -d ${options.gameDataFolder} -l All -p fenris -s \"${options.gameFolder}\"`);
    logger.log('extracting game textures: ' + options.filter);
    runCommand(`\"${options.cascConsolePath}\" -m Pattern -e \"Base\\payload\\Texture\\${options.filter}.tex\" -d ${options.gameDataFolder} -l All -p fenris -s \"${options.gameFolder}\"`);
}

module.exports = extractGameFilesAsync;