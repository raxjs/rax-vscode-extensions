const vscode = require('vscode');
const Explorer = require('./Explorer');
const openPageConfig = require('./openPageConfig');

function activate(context) {
  const { window, commands } = vscode;
  const explorer = new Explorer(context);
  window.registerTreeDataProvider('raxViewExplorer', explorer);
  //  registerCommand
  commands.registerCommand('rax.view.explorer.refresh', function() {
    explorer.refresh();
  });
  commands.registerCommand('rax.view.explorer.addComponent', function() {
    commands.executeCommand('rax.create.component');
  });
  commands.registerCommand('rax.view.explorer.addPage', function() {
    commands.executeCommand('rax.create.page');
  });
  commands.registerCommand('rax.view.explorer.editPageConfig', function(args) {
    openPageConfig(args);
  });
}

exports.activate = activate;

