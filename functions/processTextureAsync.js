const { options } = require('../options');
const config = require('../config');
const logger = require('./logger');
const fs = require('fs/promises');
const path = require('path');
const readJsonFileAsync = require('./readJsonFileAsync');
const calculateSliceCoords = require('./calculateSliceCoords');
const sliceImageAsync = require('./sliceImageAsync');
const cropImageAsync = require('./cropImageAsync');
const runCommand = require('./runCommand');

async function processTextureAsync(dataFile) {
    const key = path.basename(dataFile).slice(0, -9);
    const data = await readJsonFileAsync(path.join(options.textureDataFolder, dataFile));
    // if(data.eTexFormat !== 43) return;
    // const formats = ['BC1', 'BC2', 'BC3', 'BC4', 'BC5U', 'BC5S', 'BC6', 'BC7', 'DXT1', 'DXT3', 'DXT5'];
    //const formats = ['BC1', 'BC3'];
    try {
        const parameters = config.textureFormats[data.eTexFormat];
        if(!parameters || !parameters.rawtexFormat) {
            logger.error('unknown format', key, data.eTexFormat);
            return;
        }
        await processTextureInternal(key, data, parameters.rawtexFormat, parameters.alignment);
        
    } catch (error) {
        logger.error('error processing texture', key, error);
    }
}

async function processTextureInternal(key, data, format, base) {
    logger.log('processing texture:', key);
    const textureFilePath = path.join(options.textureFolder, `${key}.tex`);
    const ddsSourceFilePath = path.join(options.textureFolder, `${key}.dds`);
    const outputFolder = path.resolve(`./${options.outputFormat}`);

    await fs.mkdir(outputFolder, { recursive: true });

    const rawTexCommand = buildCommandLine(options.rawTexCommandLine, [`"${textureFilePath}"`, format, '0', roundUp(data.dwWidth, base), roundUp(data.dwHeight, base)]);
    try {
        logger.debug('converting tex:', textureFilePath)
        runCommand(rawTexCommand);
    } catch (error) {
        await delay(100);
        runCommand(rawTexCommand);
    }
    const texconvCommand = buildCommandLine(options.texconvCommandLine, [`"${ddsSourceFilePath}"`, '-ft png', '-y', `-o "${outputFolder}"`]);
    try {
        logger.debug('converting dds:', ddsSourceFilePath)
        runCommand(texconvCommand);
    } catch (error) {
        await delay(100);
        runCommand(texconvCommand);
    }

    let croppedFilePath;
    const sliceCoords = calculateSliceCoords(data.ptFrame, data.dwWidth, data.dwHeight);
    const pngFilePath = path.join(outputFolder, `${key}.png`);
    const finalFilePath = path.join(outputFolder, `${key}.${options.outputFormat}`);
    if (sliceCoords.length > 0) {
        croppedFilePath = await cropImageAsync(pngFilePath, data.dwWidth, data.dwHeight, options.outputFormat);
        await sliceImageAsync(pngFilePath, sliceCoords, options.outputFormat);
    } else {
        croppedFilePath = await cropImageAsync(pngFilePath, data.dwWidth, data.dwHeight, options.outputFormat);
    }
    await fs.rm(pngFilePath);
    await fs.rm(ddsSourceFilePath);
    await fs.rename(croppedFilePath, finalFilePath);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function buildCommandLine(command, args) {
    const commandLine = [command, ...args].join(' ');
    return commandLine;
}

function roundUp(number, base) {
    const remainder = number % base;
    if (remainder === 0) {
        return number; // Already divisible by 128
    }
    const difference = base - remainder;
    const roundedUpNumber = number + difference;
    return roundedUpNumber;
}

module.exports = processTextureAsync;