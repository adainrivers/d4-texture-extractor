const config = require('./config');

const options = {};

function setOptions(opts) {
    options.concurrencyLimit = opts.concurrency || config.concurrencyLimit;
    options.rawTexCommandLine = config.rawTexCommandLine;
    options.texconvCommandLine = config.texconvCommandLine;
    options.textureFolder = config.textureFolder;
    options.textureDataFolder = config.textureDataFolder;
    options.outputFormat = opts.outputformat || config.outputFormat;
    options.filter = opts.filter || config.filter;
    options.nocrop = opts.nocrop || config.nocrop;
    options.noslicefolders = opts.noslicefolders || config.noslicefolders;
}

module.exports = { options, setOptions };