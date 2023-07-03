const config = require('./config');
const path = require('path');

const options = {};

function setOptions(opts) {
    options.extract = opts.extract;
    options.cascConsolePath = path.resolve('./CASCConsole/CASCConsole.exe');
    options.gameDataFolder = path.resolve('./gamedata');
    options.textureDataFolder = path.resolve('./gamedata/Base/meta/Texture');
    options.textureFolder = path.resolve('./gamedata/Base/payload/Texture');
    options.gameFolder = opts.gameFolder || config.gameFolder;
    options.concurrencyLimit = opts.concurrency || config.concurrencyLimit;
    options.outputFormat = opts.outputformat || config.outputFormat;
    options.filter = opts.filter || config.filter;
    options.nocrop = opts.nocrop || config.nocrop;
    options.noslice = opts.noslice || config.noslice;
    options.noslicefolders = opts.noslicefolders || config.noslicefolders;
    options.outputpath = opts.outputpath;
}

module.exports = { options, setOptions };