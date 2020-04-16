const fs = require('fs');
const path = require('path');

const extnameList = ['.jsx', '.tsx', '.js'];

module.exports = function(targetDir) {
  let indexFile = '';
  let indexFilePath = '';

  try {
    if (fs.statSync(targetDir).isDirectory()) {
      indexFile = path.join(targetDir, 'index');
    } else {
      indexFile = targetDir;
    }
  } catch (e) {
    indexFile = targetDir;
  }

  for (let i = 0, l = extnameList.length; i < l; i++) {
    if (fs.existsSync(indexFile + extnameList[i])) {
      indexFilePath = indexFile + extnameList[i];
      break;
    }
  }

  return indexFilePath;
};

