const config = require('../config');
const { options } = require('../options');
const logger = require('./logger');
const sharp = require('sharp');
const path = require('path');

async function cropImageAsync(sourceImage, width, height, outputFormat = 'png') {
    if(outputFormat == 'webp' && (width > 16383 || height > 16383)){
        outputFormat = 'png';
    }
    if(config.debug) logger.log('croppping:', sourceImage);
    try {
        const outputFolder = path.dirname(sourceImage);
        const outputFileName = `${path.parse(sourceImage).name}_cropped.${outputFormat}`;
        const outputFilePath = path.join(outputFolder, outputFileName);
        if(options.nocrop){
            await sharp(sourceImage).toFormat(outputFormat).toFile(outputFilePath);
        } else {
            await sharp(sourceImage).extract({ left: 0, top: 0, width, height }).toFormat(outputFormat).toFile(outputFilePath);
        }
        return outputFilePath;
    } catch (error) {
        logger.error('Error occurred while cropping image:', sourceImage, error);
    }
}

module.exports = cropImageAsync;