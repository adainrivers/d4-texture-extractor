const config = require('./config');

const processTextureAsync = require('./functions/processTextureAsync');
const getTextureDataFiles = require('./functions/getTextureDataFilesAsync');
const RateLimitedTaskRunner = require('./classes/RateLimitedTaskRunner');

async function main() {

  const taskRunner = new RateLimitedTaskRunner(config.concurrencyLimit);
  const dataFiles = await getTextureDataFiles();
  for (let i = 0; i < dataFiles.length; i++) {
    const dataFile = dataFiles[i];
    if (dataFile.indexOf("Paragon") === -1) {
      continue;
    }
    taskRunner.addTask(()=>processTextureAsync(dataFile))
  }
  await taskRunner.runTasks();
}

main()
  .then(() => console.log('Done!'))
  .catch(error => console.log('Error occurred:', error));
