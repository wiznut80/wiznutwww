const util = require('util');
const fs = require('fs');
const path = require('path');
const streamPipeline = util.promisify(require('stream').pipeline);
const decompress = require('decompress');


const downloadURL =
  'http://xlt-api.wiznut.com/downloadXLT/wiznut/SERVER/v1.0.nhn?limit=10&format=json';
const XLT_ZIP_FILENAME = './xlt.zip';
const XLT_PATH = './src/utils/localization/locales';

(async () => {
  console.log(`DOWNLOADING ${XLT_ZIP_FILENAME}...`);
  const nodeFetch = await import('node-fetch');
  const response = await nodeFetch.default(downloadURL);

  if (response.ok) {
    await streamPipeline(response.body, fs.createWriteStream(XLT_ZIP_FILENAME));
    console.log(`Extracting ${XLT_ZIP_FILENAME}`);

    // Temporarily decompress to determine the required folder structure
    const files = await decompress(XLT_ZIP_FILENAME, ".");
    const neededDirs = new Set(files.map(file => path.join(XLT_PATH, file.path.split('_')[1].toLowerCase())));

    console.info(neededDirs.length);
    // Create necessary folders
    neededDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`[Created directory at ${dir}]`);
      }
    });

    // Move decompressed files to the correct locations without decompressing again
    files.forEach(file => {
      const finalPath = path.join(XLT_PATH, file.path.split('_')[1].toLowerCase(), 'common.json');
      fs.renameSync(file.path, finalPath);
    });

    // Delete the ZIP file after extraction
    fs.unlinkSync(XLT_ZIP_FILENAME);
    console.log('DONE');
  } else {
    throw new Error(`unexpected response ${response.statusText}`);
  }
})();
