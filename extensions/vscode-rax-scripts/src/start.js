
const vscode = require('vscode');
const setTerminal = require('./setTerminal');

module.exports = function() {
  const { commands, workspace } = vscode;
  const configuration = workspace.getConfiguration();
  console.log(configuration);

  setTerminal('npm run start');

  setTimeout(() => {
    // Can't use onDidWriteTerminalData, see: https://github.com/microsoft/vscode/issues/83224
    // Use config to get preview info.
    if (configuration.get('raxScripts.showPreview')) {
      commands.executeCommand('browser-preview.openPreview', configuration.get('raxScripts.previewUrl'));
    }
    // Wait for compile
  }, 10000);
};