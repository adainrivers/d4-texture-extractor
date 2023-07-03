const config = require('../config');
const { options } = require('../options');
const logger = require('./logger');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function sliceImageAsync(sourceImage, outputFolder, coordinates, outputFormat = 'png') {
    logger.debug('sliceImageAsync', sourceImage, outputFormat);
    const sliceFolderName = path.basename(sourceImage, path.extname(sourceImage));
    const slicesOutputFolder = path.join(outputFolder, 'slices', sliceFolderName);
    if(!options.noslicefolders){
        fs.mkdirSync(slicesOutputFolder, { recursive: true });
    }
    logger.debug('slicing:', sourceImage);
    try {
        for (let i = 0; i < coordinates.length; i++) {
            logger.debug('slicing coords:', sourceImage, JSON.stringify(coordinates[i]));
            const { hImageHandle, x0, y0, x1, y1 } = coordinates[i];
            let outputFilePath;
            if(options.noslicefolders){
                outputFilePath = path.join(outputFolder, `${sliceFolderName}_${hImageHandle}.${outputFormat}`);
            } else {
                outputFilePath = path.join(slicesOutputFolder, `${hImageHandle}.${outputFormat}`);
            }
            await sharp(sourceImage).extract({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 }).toFormat(outputFormat).toFile(outputFilePath);
            logger.debug('sliced coords:', outputFilePath, JSON.stringify(coordinates[i]));
        }
    } catch (error) {
        logger.error('Error occurred while slicing image:', sourceImage, error);
    }
}

module.exports = sliceImageAsync;