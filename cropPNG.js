const sharp = require('sharp');

async function cropPNG(imagePath, width, height) {
    try {
        const image = sharp(imagePath);
        await image.extract({ left: 0, top: 0, width, height }).toFile(imagePath);
    } catch (error) {
        console.error('Error occurred while slicing PNG:', error);
    }
}

module.exports = cropPNG;
