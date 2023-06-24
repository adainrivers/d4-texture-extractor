const fs = require('fs');
const path = require('path');

const readJsonFileAsync = require('./readJsonFile');
const runCommand = require('./runCommand');
const moveFile = require('./moveFile');
const createFolder = require('./createFolder');
const calculateSliceCoords = require('./calculateSliceCoords');
const { slice, crop } = require('./imageProcessing');
const slicePNG = require('./slicePNG');
const cropPNG = require('./cropPNG');

const rawTexCommandLine = "F:\\D4\\Extraction\\Rawtex\\RawtexCmd.exe";
const texconvCommandLine = "texconv.exe";
const textureFolder = "F:\\D4\\Extraction\\Textures\\Base\\payload\\Texture";

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

async function processTexture(key, data, format, base) {
  const textureFilePath = path.join(textureFolder, `${key}.tex`);
  const ddsSourceFilePath = path.join(textureFolder, `${key}.dds`);
  const ddsFilePath = path.resolve(`./dds/${key}-${format}-${base}.dds`);
  const pngFilePath = path.resolve(`./png/${key}`);
  const iconsPath = path.resolve(`./icons`);
  // const pngFilePath = path.resolve(`./png`);

  await createFolder(pngFilePath);

  const rawTexCommand = buildCommandLine(rawTexCommandLine, [`"${textureFilePath}"`, format, '0', roundUp(data.dwWidth, base), roundUp(data.dwHeight, base)]);
  runCommand(rawTexCommand);
  // await delay(100);
  try {
    await moveFile(ddsSourceFilePath, ddsFilePath);
  } catch (error) {
    await delay(100);
    await moveFile(ddsSourceFilePath, ddsFilePath);
  }
  const texconvCommand = buildCommandLine(texconvCommandLine, [`"${ddsFilePath}"`, '-ft png', '-y', `-o "${pngFilePath}"`]);
  try {
    runCommand(texconvCommand);
  } catch (error) {
    await delay(100);
    runCommand(texconvCommand);
  }

  const sliceCoords = calculateSliceCoords(data.ptFrame, data.dwWidth, data.dwHeight);
  const pngOutputPath = path.join(pngFilePath, `${key}-${format}-${base}.png`);
  if (sliceCoords.length > 0) {
    crop(pngOutputPath, data.dwWidth, data.dwHeight);
    slice(pngOutputPath, sliceCoords, iconsPath);
  } else {
    crop(pngOutputPath, data.dwWidth, data.dwHeight);
  }
}

(async () => {
  const textureJsonPath = path.resolve('../database-builder/data/Texture.json');
  const textureData = await readJsonFileAsync(textureJsonPath);

  const textureDataEntries = Object.entries(textureData);
  let count = 0;
  for (let i = 0; i < textureDataEntries.length; i++) {
    const [key, data] = textureDataEntries[i];

    if (key.indexOf("2D") === -1) {
      continue;
    }

    // const formats = ['BC1', 'BC2', 'BC3', 'BC4', 'BC5U', 'BC5S', 'BC6', 'BC7', 'DXT1', 'DXT3', 'DXT5'];
    //const formats = ['BC1', 'BC3'];
    try {
      if (data.eTexFormat == 49) {
        await processTexture(key, data, 'BC3', 64);
      }
      if (data.eTexFormat == 47) {
        await processTexture(key, data, 'BC1', 128);
      }
        
    } catch (error) {
      
    }


    count++;
    // if (count === 5) {
    //   break;
    // }
  }

})();
