const config = require('../config');
const fs = require('fs/promises');
const path = require('path');
const readJsonFileAsync = require('./readJsonFileAsync');
const calculateSliceCoords = require('./calculateSliceCoords');
const sliceImageAsync = require('./sliceImageAsync');
const cropImageAsync = require('./cropImageAsync');
const runCommand = require('./runCommand');

async function processTextureAsync(dataFile) {
    const key = path.basename(dataFile).slice(0, -9);
    const data = await readJsonFileAsync(path.join(config.textureDataFolder, dataFile));

    // const formats = ['BC1', 'BC2', 'BC3', 'BC4', 'BC5U', 'BC5S', 'BC6', 'BC7', 'DXT1', 'DXT3', 'DXT5'];
    //const formats = ['BC1', 'BC3'];
    try {
        if (data.eTexFormat == 49) {
            await processTextureInternal(key, data, 'BC3', 64);
        }
        if (data.eTexFormat == 47) {
            await processTextureInternal(key, data, 'BC1', 128);
        }
    } catch (error) {
        console.log('error', error);
    }
}

async function processTextureInternal(key, data, format, base) {
    const textureFilePath = path.join(config.textureFolder, `${key}.tex`);
    const ddsSourceFilePath = path.join(config.textureFolder, `${key}.dds`);
    const outputFolder = path.resolve(`./${config.outputFormat}`);

    await fs.mkdir(outputFolder, { recursive: true });

    const rawTexCommand = buildCommandLine(config.rawTexCommandLine, [`"${textureFilePath}"`, format, '0', roundUp(data.dwWidth, base), roundUp(data.dwHeight, base)]);
    console.log('converting tex:', textureFilePath)
    runCommand(rawTexCommand);
    const texconvCommand = buildCommandLine(config.texconvCommandLine, [`"${ddsSourceFilePath}"`, '-ft png', '-y', `-o "${outputFolder}"`]);
    try {
        console.log('converting dds:', ddsSourceFilePath)
        runCommand(texconvCommand);
    } catch (error) {
        await delay(100);
        runCommand(texconvCommand);
    }

    let croppedFilePath;
    const sliceCoords = calculateSliceCoords(data.ptFrame, data.dwWidth, data.dwHeight);
    const pngFilePath = path.join(outputFolder, `${key}.png`);
    const finalFilePath = path.join(outputFolder, `${key}.${config.outputFormat}`);
    if (sliceCoords.length > 0) {
        croppedFilePath = await cropImageAsync(pngFilePath, data.dwWidth, data.dwHeight, config.outputFormat);
        await sliceImageAsync(pngFilePath, sliceCoords, config.outputFormat);
    } else {
        croppedFilePath = await cropImageAsync(pngFilePath, data.dwWidth, data.dwHeight, config.outputFormat);
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