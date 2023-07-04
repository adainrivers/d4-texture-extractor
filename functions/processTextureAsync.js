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
const convertRawTexture = require('./convertRawTexture');
const readTextureDefinition = require('./readTextureDefinition');

async function processTextureAsync(key) {
    const textureDefinitionFile = path.join(options.textureDataFolder, `${key}.tex`);
    const data = readTextureDefinition(textureDefinitionFile);
    try {
        await processTextureInternal(key, data);
    } catch (error) {
        logger.error('error processing texture', key, error);
    }
}

async function processTextureInternal(key, data) {
    logger.log('processing texture:', key);
    const textureFilePath = path.join(options.textureFolder, `${key}.tex`);
    const tempFolder = path.resolve('./temp');
    const ddsSourceFilePath = path.join(tempFolder, `${key}.dds`);
    const outputFolder = options.outputpath ? path.resolve(options.outputpath) : path.resolve(`./${options.outputFormat}`);
    const texconvCommandLine = path.resolve('./texconv/texconv.exe')

    await fs.mkdir(tempFolder, { recursive: true });
    await fs.mkdir(outputFolder, { recursive: true });

    convertRawTexture(textureFilePath, ddsSourceFilePath, data);

    const texconvCommand = buildCommandLine(texconvCommandLine, [`"${ddsSourceFilePath}"`, '-ft png', '-f R8G8B8A8_UNORM', '-y', `-o "${tempFolder}"`]);
    try {
        logger.debug('converting dds:', ddsSourceFilePath)
        runCommand(texconvCommand);
    } catch (error) {
        await delay(100);
        runCommand(texconvCommand);
    }

    const pngFilePath = path.join(tempFolder, `${key}.png`);

    if(options.noslice){
        const croppedFilePath = await cropImageAsync(pngFilePath, data.dwWidth, data.dwHeight, options.outputFormat);
        const finalFilePath = path.join(outputFolder, `${key}.${options.outputFormat}`);
        await fs.copyFile(croppedFilePath, finalFilePath);
        await fs.rm(croppedFilePath);
    } else {
        if(!options.noslicefolders){
            const croppedFilePath = await cropImageAsync(pngFilePath, data.dwWidth, data.dwHeight, options.outputFormat);
            const finalFilePath = path.join(outputFolder, `${key}.${options.outputFormat}`);
            await fs.copyFile(croppedFilePath, finalFilePath);
            await fs.rm(croppedFilePath);
        }
        const sliceCoords = calculateSliceCoords(data.ptFrame, data.dwWidth, data.dwHeight);
        await sliceImageAsync(pngFilePath, outputFolder, sliceCoords, options.outputFormat);
    }
    // let croppedFilePath;
    // if (sliceCoords.length > 0) {
    // } else {
    //     croppedFilePath = await cropImageAsync(pngFilePath, data.dwWidth, data.dwHeight, options.outputFormat);
    // }
    await fs.rm(pngFilePath);
    await fs.rm(ddsSourceFilePath);
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