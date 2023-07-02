const { options, setOptions } = require('./options');
const { program } = require('commander');
const { minimatch } = require('minimatch')

const processTextureAsync = require('./functions/processTextureAsync');
const getTextureDataFiles = require('./functions/getTextureDataFilesAsync');
const RateLimitedTaskRunner = require('./classes/RateLimitedTaskRunner');

async function main() {

  const taskRunner = new RateLimitedTaskRunner(options.concurrencyLimit);
  const dataFiles = await getTextureDataFiles();
  for (let i = 0; i < dataFiles.length; i++) {
    const dataFile = dataFiles[i];
    const key = dataFile.slice(0, -9);
    if (!minimatch(key, options.filter)) {
      continue;
    }
    taskRunner.addTask(() => processTextureAsync(dataFile))
  }
  await taskRunner.runTasks();
}

program
  .option('-c, --concurrency <number>', 'number of concurrent tasks')
  .option('-rt, --rawtex <path>', 'path to RawTexCmd.exe')
  .option('-tc, --texconv <path>', 'path to texconv.exe')
  .option('-t, --textures <path>', 'path to folder containing textures extracted with CASCExplorer')
  .option('-d, --texturedata <path>', 'path to \'d4data\\json\\base\\meta\\Texture\' folder')
  .option('-o, --outputformat <format>', 'png, jpg or webp')
  .option('-f, --filter <wildcard>', 'Wildcard to filter files to process, for example \'2DUI*\', no need to include .json extension, default is \'*\'');

program.parse(process.argv);
const opts = program.opts();
setOptions(opts);

main()
  .then(() => console.log('Done!'))
  .catch(error => console.log('Error occurred:', error));
