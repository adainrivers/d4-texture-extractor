const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function slice(sourceImage, coordinates, outputFolder) {
    try {
        for (let i = 0; i < coordinates.length; i++) {
            const { hImageHandle, x0, y0, x1, y1 } = coordinates[i];
            if(hImageHandle === 0) continue;
            const outputFilePath = path.join(outputFolder, `${hImageHandle}.webp`);
            await sharp(sourceImage).extract({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 }).toFormat("webp").toFile(outputFilePath);
            const originalFolder = path.dirname(sourceImage);
            fs.copyFileSync(outputFilePath, path.join(originalFolder, `${hImageHandle}.webp`));
        }
    } catch (error) {
        console.error('Error occurred while slicing image:', error);
    }
}

async function crop(sourceImage, width, height) {
    try {
        const outputFolder = path.dirname(sourceImage);
        const outputFileName = path.parse(sourceImage).name + '_cropped.png';
        const outputFilePath = path.join(outputFolder, outputFileName);
        await sharp(sourceImage).extract({ left: 0, top: 0, width, height }).toFile(outputFilePath);
    } catch (error) {
        console.error('Error occurred while cropping image:', error);
    }
}

module.exports = {slice, crop};