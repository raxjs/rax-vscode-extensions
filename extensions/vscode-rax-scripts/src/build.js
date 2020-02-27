
const vscode = require('vscode');
const setTerminal = require('./setTerminal');
const isRaxProject = require('./isRaxProject');

module.exports = function() {
  if (!isRaxProject()) {
    vscode.window.showErrorMessage('Please open Rax project!');
    return false;
  }

  setTerminal('npm run build');
};