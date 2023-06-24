const sharp = require('sharp');
const path = require('path');

async function slicePNG(imagePath, coordinates) {
    try {
        const outputFolder = path.dirname(imagePath);

        for (let i = 0; i < coordinates.length; i++) {
            const image = sharp(imagePath);
            const { hImageHandle, x0, y0, x1, y1 } = coordinates[i];
            const outputFilePath = path.join(outputFolder, `${hImageHandle}.png`);
            await image.extract({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 }).toFile(outputFilePath);
        }
    } catch (error) {
        console.error('Error occurred while slicing PNG:', error);
    }
}

module.exports = slicePNG;
