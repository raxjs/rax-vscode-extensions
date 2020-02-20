
const vscode = require('vscode');
const setTerminal = require('./setTerminal');
const isRaxProject = require('./isRaxProject');

module.exports = function() {
  const { commands, window, workspace } = vscode;

  if (!isRaxProject()) {
    window.showErrorMessage('Please open Rax project!');
    return false;
  }

  const configuration = workspace.getConfiguration();

  setTerminal('npm run start');

  setTimeout(() => {
    // Can't use onDidWriteTerminalData, see: https://github.com/microsoft/vscode/issues/83224
    // Use config to get preview info.
    if (configuration.get('raxScripts.showPreview')) {
      commands.executeCommand('browser-preview.openPreview', configuration.get('raxScripts.previewUrl'));
    }
    // Wait for compile. About 30s.
  }, 30000);
};