const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function sliceImageAsync(sourceImage, coordinates, outputFormat = 'png') {
    const sliceFolderName = path.basename(sourceImage, path.extname(sourceImage));
    const outputFolder = path.join(path.dirname(sourceImage), 'slices', sliceFolderName);
    fs.mkdirSync(outputFolder, { recursive: true });
    console.log('slicing:', sourceImage);
    try {
        for (let i = 0; i < coordinates.length; i++) {
            const { hImageHandle, x0, y0, x1, y1 } = coordinates[i];
            if (hImageHandle === 0) continue;
            const outputFilePath = path.join(outputFolder, `${hImageHandle}.${outputFormat}`);
            await sharp(sourceImage).extract({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 }).toFormat(outputFormat).toFile(outputFilePath);
        }
    } catch (error) {
        console.log('Error occurred while slicing image:', error);
    }
}

module.exports = sliceImageAsync;