const path = require('path');

module.exports = function getFocusCodeInfo(document, position) {

  return {
    // Code info
    line: document.lineAt(position),
    word: document.getText(document.getWordRangeAtPosition(position)),

    // File info
    fileName: document.fileName,
    directory: path.dirname(document.fileName),
  };
}
