const sharp = require('sharp');
const path = require('path');

async function cropImageAsync(sourceImage, width, height, outputFormat = 'png') {
    console.log('croppping:', sourceImage);
    try {
        const outputFolder = path.dirname(sourceImage);
        const outputFileName = `${path.parse(sourceImage).name}_cropped.${outputFormat}`;
        const outputFilePath = path.join(outputFolder, outputFileName);
        await sharp(sourceImage).extract({ left: 0, top: 0, width, height }).toFormat(outputFormat).toFile(outputFilePath);
        return outputFilePath;
    } catch (error) {
        console.log('Error occurred while cropping image:', error);
    }
}

module.exports = cropImageAsync;