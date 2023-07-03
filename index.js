const { options, setOptions } = require('./options');
const { program } = require('commander');
const { minimatch } = require('minimatch')
const logger = require('./functions/logger');
const fs = require('fs/promises');
const path = require('path');
const extractGameFilesAsync = require('./functions/extractGameFilesAsync');
const getTextureDataFilesAsync = require('./functions/getTextureDataFilesAsync');
const processTextureAsync = require('./functions/processTextureAsync');
const TaskQueue = require('./functions/taskQueue');

async function main() {
  if (options.outputpath) {
    try {
      const outputFolder = path.resolve(options.outputpath);
      await fs.mkdir(outputFolder, { recursive: true });
    } catch (error) {
      logger.error(`Output Path \'${options.outputpath} is not valid.`);
      logger.error(error);
      return;
    }
  }
  if (options.extract) {
    await extractGameFilesAsync();
  }
  const taskQueue = TaskQueue(options.concurrencyLimit);
  const dataFiles = await getTextureDataFilesAsync();
  for (let i = 0; i < dataFiles.length; i++) {

    const dataFile = dataFiles[i];
    const key = dataFile.slice(0, -4);

    if (!minimatch(key, options.filter)) {
      continue;
    }

    taskQueue(async () => processTextureAsync(key));
  }
}

program
  .option('-e, --extract', 'Automatically extract game files before processing')
  .option('-g, --gameFolder <path>', 'Path to Diablo IV folder, for example \"C:\\Program Files (x86)\\Diablo IV\\\"')
  .option('-c, --concurrency <number>', 'number of concurrent tasks')
  .option('-o, --outputformat <format>', 'png, jpg or webp')
  .option('-p, --outputpath <path>', 'Full or relative path to output folder, default is \'./{outputformat}\'')
  .option('-f, --filter <wildcard>', 'Wildcard to filter files to process, for example \'2DUI*\', no need to include .json extension, default is \'*\'')
  .option('-nc, --nocrop', 'Do not crop images to the size of the texture, useful for map textures')
  .option('-ns, --noslice', 'Do not slice the images, useful for map textures')
  .option('-nsf, --noslicefolders', 'Do not use slice folders, instead save slicers to the output folder, prefixed with the file name');

program.parse(process.argv);
const opts = program.opts();
logger.debug(opts);
setOptions(opts);

main();
  //.catch(error => logger.error('Error occurred:', error));
