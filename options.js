const config = require('./config');

const options = {};

function setOptions(opts) {
    options.concurrencyLimit = opts.concurrency || config.concurrencyLimit;
    options.rawTexCommandLine = opts.rawtex || config.rawTexCommandLine;
    options.texconvCommandLine = opts.texconv || config.texconvCommandLine;
    options.textureFolder = opts.textures || config.textureFolder;
    options.textureDataFolder = opts.texturedata || config.textureDataFolder;
    options.outputFormat = opts.outputformat || config.outputFormat;
    options.filter = opts.filter || config.filter;
    options.nocrop = opts.nocrop || config.nocrop;
    options.noslice = opts.noslice || config.noslice;
    options.noslicefolders = opts.noslicefolders || config.noslicefolders;
    options.outputpath = opts.outputpath;
}

module.exports = { options, setOptions };