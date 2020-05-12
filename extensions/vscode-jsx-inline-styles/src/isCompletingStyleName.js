const vscode = require('vscode');

// The JSX style attribute accepts a JavaScript object.
// If the active word is in an object, it seems like to completing style name.
// EXP-1: style={ p|
// EXP-2: style={ \n p|
// EXP-3: position: 'relative', \n p|

module.exports = function isCompletingStyleName(word, line) {
  let isCompletingStyleName = false;

  const { document } = vscode.window.activeTextEditor;
  const currentLineText = line.text;

  const previousLine = document.lineAt(line.lineNumber - 1);
  const previousLineText = document.getText(
    new vscode.Range(
      previousLine.range.start,
      previousLine.range.end
    )
  ).trim();

  if (
    // EXP: marginLeft, margin-left
    /^[a-zA-Z-]+$/.test(word) && (
      // The JSX style attribute accepts a JavaScript object 
      currentLineText.indexOf('{') > -1 ||
      previousLineText.endsWith('{') ||
      previousLineText.endsWith(',')
    )
  ) {
    isCompletingStyleName = true;
  }

  return isCompletingStyleName;
}

