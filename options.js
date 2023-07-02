const config = require('./config');

const options = {};

function setOptions(opts) {
    options.concurrencyLimit = opts.concurrency || config.concurrencyLimit;
    options.rawTexCommandLine = opts.rawtex || config.rawTexCommandLine;
    options.texconvCommandLine = opts.texconv || config.texconvCommandLine;
    options.textureFolder = opts.textureFolder || config.textureFolder;
    options.textureDataFolder = opts.textureDataFolder || config.textureDataFolder;
    options.outputFormat = opts.outputFormat || config.outputFormat;
    options.filter = opts.filter || config.filter;
}

module.exports = { options, setOptions };